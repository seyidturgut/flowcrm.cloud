import prisma from "@/lib/prisma";

export async function getSalesRepsWithUsers(company_id: string) {
  return prisma.salesRep.findMany({
    where: { company_id },
    include: {
      user: true,
      _count: {
        select: { leads: true }
      }
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAvailableUsers(company_id: string) {
  // Satış temsilcisi olmayan kullanıcıları bul
  return prisma.user.findMany({
    where: {
      company_id,
      salesRep: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}
