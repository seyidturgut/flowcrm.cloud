import prisma from "@/lib/prisma";
import { LeadStatus } from "@prisma/client";

export interface GetLeadsParams {
  company_id: string;
  searchTerm?: string;
  status?: LeadStatus;
  salesRepId?: string;
  page?: number;
  pageSize?: number;
}

export async function getLeads({
  company_id,
  searchTerm,
  status,
  salesRepId,
  page = 1,
  pageSize = 10,
}: GetLeadsParams) {
  const skip = (page - 1) * pageSize;

  // Build filters
  const where: any = {
    company_id,
  };

  if (status) {
    where.status = status;
  }

  if (salesRepId) {
    where.sales_rep_id = salesRepId;
  }

  if (searchTerm) {
    where.OR = [
      { contact: { firstName: { contains: searchTerm } } },
      { contact: { lastName: { contains: searchTerm } } },
      { contact: { email: { contains: searchTerm } } },
    ];
  }

  // Fetch data and count in parallel
  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      include: {
        contact: true,
        salesRep: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.lead.count({ where }),
  ]);

  return {
    leads,
    meta: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  };
}

export async function getSalesReps(company_id: string) {
  return prisma.salesRep.findMany({
    where: { company_id },
    include: {
      user: true,
    },
  });
}

export async function getLeadById(id: string, company_id: string) {
  return prisma.lead.findUnique({
    where: {
      id,
      company_id,
    },
    include: {
      contact: true,
      salesRep: {
        include: {
          user: true,
        },
      },
      notes: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}
