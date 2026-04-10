import prisma from "@/lib/prisma";

/**
 * Fetches all companies in the system.
 * ONLY for Super Admins.
 */
export async function getAllCompanies() {
  return prisma.company.findMany({
    include: {
      _count: {
        select: {
          users: true,
          leads: true,
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}
