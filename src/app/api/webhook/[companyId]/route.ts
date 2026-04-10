import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { NotificationEntityType, NotificationPriority, NotificationType } from "@prisma/client";
import prisma from "@/lib/prisma";
import { analyzeLeadQuality, extractLeadDataFromPayload, matchLeadToSalesRep } from "@/lib/ai";
import { normalizeLeadSource, normalizeLeadSourceUrl } from "@/lib/lead-source";
import { createNotificationsForCompanyAdmins } from "@/lib/notifications/service";

function asOptionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const { companyId } = await params;
  let rawPayload: Prisma.InputJsonValue;
  let rawBody: Record<string, unknown>;

  try {
    const parsedPayload = await req.json();
    if (!parsedPayload || typeof parsedPayload !== "object" || Array.isArray(parsedPayload)) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    rawPayload = parsedPayload as Prisma.InputJsonValue;
    rawBody = parsedPayload as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // 1. Şirket varlığını kontrol et
  const company = await prisma.company.findUnique({
    where: { id: companyId },
  });

  if (!company) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
  }

  // 2. Ham veriyi logla
  const log = await prisma.webhookLog.create({
    data: {
      payload: rawPayload,
      company_id: companyId,
      status: "received",
    },
  });

  try {
    // 3. AI Veri Ayıklama
    const extracted = await extractLeadDataFromPayload(rawBody);
    
    const firstName =
      extracted?.firstName ||
      asOptionalString(rawBody.firstName) ||
      asOptionalString(rawBody.name) ||
      asOptionalString(rawBody.ad) ||
      "Unknown";
    const lastName =
      extracted?.lastName ||
      asOptionalString(rawBody.lastName) ||
      asOptionalString(rawBody.soyad) ||
      "";
    const email =
      extracted?.email ||
      asOptionalString(rawBody.email) ||
      asOptionalString(rawBody.eposta) ||
      asOptionalString(rawBody.mail) ||
      null;
    const phone =
      extracted?.phone ||
      asOptionalString(rawBody.phone) ||
      asOptionalString(rawBody.tel) ||
      asOptionalString(rawBody.telefon) ||
      null;
    const message =
      extracted?.message ||
      asOptionalString(rawBody.message) ||
      asOptionalString(rawBody.not) ||
      asOptionalString(rawBody.mesaj) ||
      "";
    const normalizedSource = normalizeLeadSource(rawBody);
    const normalizedSourceUrl = normalizeLeadSourceUrl(rawBody);
    const source = normalizedSource || extracted?.utm_source || asOptionalString(rawBody.utm_source) || null;

    // 4. Contact Bul veya Oluştur
    let contact = await prisma.contact.findFirst({
      where: {
        company_id: companyId,
        OR: [
          email ? { email: email } : {},
          phone ? { phone: phone } : {},
        ].filter((cond) => Object.keys(cond).length > 0),
      },
    });

    if (!contact) {
      contact = await prisma.contact.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          company_id: companyId,
        },
      });
    }

    // 5. Satış Temsilcisi Seç (Smart Matchmaking)
    const activeReps = await prisma.salesRep.findMany({
      where: { company_id: companyId, isActive: true },
      include: { user: true }
    });

    const repsForAi = activeReps.map(r => ({
      id: r.id,
      name: r.user.name || r.user.email,
      specialties: r.specialties
    }));

    const bestMatchRepId = await matchLeadToSalesRep({ firstName, message }, repsForAi);

    // 6. Yeni Lead oluştur
    const lead = await prisma.lead.create({
      data: {
        contact_id: contact.id,
        company_id: companyId,
        status: "NEW",
        source: source,
        sourceUrl: normalizedSourceUrl,
        utm_source: extracted?.utm_source || asOptionalString(rawBody.utm_source) || asOptionalString(rawBody.source) || null,
        utm_medium: extracted?.utm_medium || asOptionalString(rawBody.utm_medium) || asOptionalString(rawBody.medium) || null,
        utm_campaign: extracted?.utm_campaign || asOptionalString(rawBody.utm_campaign) || asOptionalString(rawBody.campaign) || null,
        utm_term: extracted?.utm_term || asOptionalString(rawBody.utm_term) || asOptionalString(rawBody.term) || null,
        utm_content: extracted?.utm_content || asOptionalString(rawBody.utm_content) || asOptionalString(rawBody.content) || null,
        sales_rep_id: bestMatchRepId, // AI'nın seçtiği temsilci
        notes: message ? {
          create: {
            content: `Webhook Message: ${message}`,
            company_id: companyId,
            author_id: "system_webhook",
          }
        } : undefined,
      },
      include: { contact: true }
    });

    // 7. AI Analizi Tetikle
    const aiAnalysis = await analyzeLeadQuality(lead);
    
    if (aiAnalysis) {
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          aiScore: aiAnalysis.score,
          aiLabel: aiAnalysis.label,
          aiReasoning: aiAnalysis.reasoning,
          aiTags: aiAnalysis.tags.join(", "),
        }
      });
    }

    // 8. Logu güncelle
    await prisma.webhookLog.update({
      where: { id: log.id },
      data: { status: "processed" },
    });

    const leadName = `${lead.contact.firstName} ${lead.contact.lastName}`.trim();

    try {
      await createNotificationsForCompanyAdmins(companyId, {
        type: NotificationType.LEAD_CREATED,
        title: "New lead received",
        message: leadName ? `${leadName} was captured from a webhook source.` : "A new lead was captured from a webhook source.",
        entityType: NotificationEntityType.LEAD,
        entityId: lead.id,
        priority: NotificationPriority.MEDIUM,
      });
    } catch (notificationError) {
      console.error("Failed to create new lead notifications", notificationError);
    }

    return NextResponse.json({
      success: true,
      message: "Lead processed via AI extraction",
      leadId: lead.id,
      aiLabel: aiAnalysis?.label || "None"
    }, { status: 201 });

  } catch (error) {
    console.error("Webhook processing error:", error);
    
    await prisma.webhookLog.update({
      where: { id: log.id },
      data: { 
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error"
      },
    });

    try {
      await createNotificationsForCompanyAdmins(companyId, {
        type: NotificationType.WEBHOOK_ERROR,
        title: "Webhook error",
        message: error instanceof Error ? error.message : "An unknown webhook processing error occurred.",
        entityType: NotificationEntityType.WEBHOOK,
        entityId: log.id,
        priority: NotificationPriority.HIGH,
      });
    } catch (notificationError) {
      console.error("Failed to create webhook error notifications", notificationError);
    }

    return NextResponse.json({ 
      error: "Processing failed", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
