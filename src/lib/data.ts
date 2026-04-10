import prisma from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";
import { startOfDay } from "date-fns";

/**
 * Fetches dashboard statistics scoped to the current tenant.
 */
export async function getDashboardStats() {
  const company_id = await getTenantId();
  const today = startOfDay(new Date());

  const [
    totalLeads,
    todayLeads,
    unassignedLeads,
    leadsByRep,
    recentLeads
  ] = await Promise.all([
    // Toplam Lead Sayısı
    prisma.lead.count({ where: { company_id } }),
    
    // Bugünkü Leadler
    prisma.lead.count({ 
      where: { 
        company_id,
        createdAt: { gte: today }
      } 
    }),
    
    // Atanmamış Leadler
    prisma.lead.count({ 
      where: { 
        company_id,
        sales_rep_id: null
      } 
    }),
    
    // Temsilci Bazlı Dağılım
    prisma.salesRep.findMany({
      where: { company_id },
      include: {
        user: { select: { name: true, email: true } },
        _count: { select: { leads: true } }
      }
    }),

    // Son Gelen Leadler
    prisma.lead.findMany({
      where: { company_id },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        contact: { select: { firstName: true, lastName: true, email: true } }
      }
    })
  ]);

  return {
    totalLeads,
    todayLeads,
    unassignedLeads,
    leadsByRep: leadsByRep.map((rep) => ({
      name: rep.user?.name || rep.user?.email || "Temsilci",
      count: rep._count.leads
    })),
    recentLeads: recentLeads.map((lead) => ({
      id: lead.id,
      customer: lead.contact
        ? `${lead.contact.firstName} ${lead.contact.lastName}`.trim() || "İsimsiz Lead"
        : "İsimsiz Lead",
      email: lead.contact?.email || null,
      createdAt: lead.createdAt
    }))
  };
}
