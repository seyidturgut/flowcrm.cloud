import prisma from "@/lib/prisma";

export async function getWebhookLogs(company_id: string, limit = 50) {
  return prisma.webhookLog.findMany({
    where: { company_id },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
