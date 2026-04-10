"use server";

import prisma from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";
import { LeadStatus, NotificationEntityType, NotificationPriority, NotificationType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createNotificationForUser } from "@/lib/notifications/service";

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  const company_id = await getTenantId();

  await prisma.lead.update({
    where: { id: leadId, company_id },
    data: { status },
  });

  // Log system note
  await prisma.leadNote.create({
    data: {
      lead_id: leadId,
      company_id,
      content: `System: Status changed to ${status}`,
      author_id: "system",
    },
  });

  revalidatePath(`/leads/${leadId}`);
}

export async function reassignLead(leadId: string, salesRepId: string | null) {
  const company_id = await getTenantId();

  const updatedLead = await prisma.lead.update({
    where: { id: leadId, company_id },
    data: { sales_rep_id: salesRepId },
    include: {
      contact: true,
    },
  });

  // Log system note
  const repName = salesRepId 
    ? await prisma.salesRep.findUnique({ where: { id: salesRepId }, include: { user: true } }).then(r => r?.user.name || r?.user.email)
    : "Unassigned";

  await prisma.leadNote.create({
    data: {
      lead_id: leadId,
      company_id,
      content: `System: Assigned to ${repName}`,
      author_id: "system",
    },
  });

  if (salesRepId) {
    const assignedRep = await prisma.salesRep.findFirst({
      where: {
        id: salesRepId,
        company_id,
      },
      select: {
        userId: true,
      },
    });

    if (assignedRep) {
      const leadName = `${updatedLead.contact.firstName} ${updatedLead.contact.lastName}`.trim();

      try {
        await createNotificationForUser({
          companyId: company_id,
          userId: assignedRep.userId,
          type: NotificationType.LEAD_ASSIGNED,
          title: "A new lead was assigned to you",
          message: leadName ? `${leadName} was added to your queue.` : "A new lead was added to your queue.",
          entityType: NotificationEntityType.LEAD,
          entityId: leadId,
          priority: NotificationPriority.MEDIUM,
        });
      } catch (error) {
        console.error("Failed to create lead assignment notification", error);
      }
    }
  }

  revalidatePath(`/leads/${leadId}`);
}

export async function addLeadNote(leadId: string, content: string) {
  const company_id = await getTenantId();

  await prisma.leadNote.create({
    data: {
      lead_id: leadId,
      company_id: company_id,
      content,
      author_id: "user", // In a real app, this would be the session user ID
    },
  });

  revalidatePath(`/leads/${leadId}`);
}

export async function updateLeadInfo(leadId: string, data: { firstName: string, lastName: string, email?: string, phone?: string }) {
  const company_id = await getTenantId();

  // Fine lead to get contact_id
  const lead = await prisma.lead.findUnique({
    where: { id: leadId, company_id },
    select: { contact_id: true }
  });

  if (!lead) throw new Error("Lead bulunamadı.");

  await prisma.contact.update({
    where: { id: lead.contact_id },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    }
  });

  // Log system note
  await prisma.leadNote.create({
    data: {
      lead_id: leadId,
      company_id,
      content: `System: İletişim bilgileri güncellendi.`,
      author_id: "system",
    },
  });

  revalidatePath(`/leads/${leadId}`);
  return { success: true };
}
