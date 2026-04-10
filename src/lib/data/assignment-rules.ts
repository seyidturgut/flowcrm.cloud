import prisma from "@/lib/prisma";

export async function getAssignmentRules(company_id: string) {
  return prisma.assignmentRule.findMany({
    where: { company_id },
    include: {
      salesRep: {
        include: {
          user: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
