"use server";

import prisma from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";
import { getLeadSourceLabel } from "@/lib/lead-source";

export async function getMarketingAnalytics() {
  const companyId = await getTenantId();

  if (!companyId) {
    throw new Error("Company ID not found");
  }

  // Fetch and group in JS so source labels follow the same normalization order everywhere.
  const leads = await prisma.lead.findMany({
    where: { company_id: companyId },
    select: {
      utm_source: true,
      utm_campaign: true,
      status: true,
      aiScore: true,
      source: true,
      createdAt: true
    }
  });

  // Process data for charts
  const campaignData: Record<string, { total: number; won: number; lost: number; avgScore: number; sumScore: number }> = {};
  const sourceData: Record<string, { name: string; value: number; avgScore: number }> = {};

  leads.forEach(lead => {
    const campaign = lead.utm_campaign || "Diğer / Tanımsız";
    const source = getLeadSourceLabel(lead);

    // Campaign aggregation
    if (!campaignData[campaign]) {
      campaignData[campaign] = { total: 0, won: 0, lost: 0, avgScore: 0, sumScore: 0 };
    }
    campaignData[campaign].total++;
    if (lead.status === "WON") campaignData[campaign].won++;
    if (lead.status === "LOST") campaignData[campaign].lost++;
    if (lead.aiScore) {
      campaignData[campaign].sumScore += lead.aiScore;
    }

    // Source aggregation
    if (!sourceData[source]) {
      sourceData[source] = { name: source, value: 0, avgScore: 0 };
    }
    sourceData[source].value++;
  });

  // Finalize data
  const campaignCharts = Object.entries(campaignData).map(([name, stats]) => ({
    name: name,
    total: stats.total,
    won: stats.won,
    lost: stats.lost,
    winRate: stats.total > 0 ? (stats.won / stats.total) * 100 : 0,
    avgScore: stats.total > 0 ? stats.sumScore / stats.total : 0
  }));

  const sourceCharts = Object.values(sourceData);

  // Time based growth (Last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  const growthData = last7Days.map(date => {
    const count = leads.filter(l => l.createdAt.toISOString().split('T')[0] === date).length;
    return { date, count };
  });

  return {
    sourceDistribution: sourceCharts,
    campaignPerformance: campaignCharts,
    growthData,
    summary: {
      totalLeads: leads.length,
      averageAiScore: leads.reduce((acc, curr) => acc + (curr.aiScore || 0), 0) / (leads.length || 1),
      hotLeadsCount: leads.filter(l => (l.aiScore || 0) >= 80).length
    }
  };
}
