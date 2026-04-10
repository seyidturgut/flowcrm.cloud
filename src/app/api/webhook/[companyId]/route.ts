import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { analyzeLeadQuality, extractLeadDataFromPayload, matchLeadToSalesRep } from "@/lib/ai";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  const { companyId } = await params;
  let rawBody: any;

  try {
    rawBody = await req.json();
  } catch (e) {
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
      payload: rawBody,
      company_id: companyId,
      status: "received",
    },
  });

  try {
    // 3. AI Veri Ayıklama
    const extracted = await extractLeadDataFromPayload(rawBody);
    
    const firstName = extracted?.firstName || rawBody.firstName || rawBody.name || rawBody.ad || "Unknown";
    const lastName = extracted?.lastName || rawBody.lastName || rawBody.soyad || "";
    const email = extracted?.email || rawBody.email || rawBody.eposta || rawBody.mail || null;
    const phone = extracted?.phone || rawBody.phone || rawBody.tel || rawBody.telefon || null;
    const message = extracted?.message || rawBody.message || rawBody.not || rawBody.mesaj || "";
    const source = rawBody.source || "AI Extracted Webhook";

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
        utm_source: extracted?.utm_source || rawBody.utm_source || rawBody.source || null,
        utm_medium: extracted?.utm_medium || rawBody.utm_medium || rawBody.medium || null,
        utm_campaign: extracted?.utm_campaign || rawBody.utm_campaign || rawBody.campaign || null,
        utm_term: extracted?.utm_term || rawBody.utm_term || rawBody.term || null,
        utm_content: extracted?.utm_content || rawBody.utm_content || rawBody.content || null,
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

    return NextResponse.json({ 
      error: "Processing failed", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

