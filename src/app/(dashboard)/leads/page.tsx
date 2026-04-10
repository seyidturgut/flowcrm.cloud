import { getLeads, getSalesReps } from "@/lib/data/leads";
import { getTenantId } from "@/lib/tenant";
import { LeadsTable } from "@/components/leads/leads-table";
import { LeadsFilters } from "@/components/leads/leads-filters";
import { LeadStatus } from "@prisma/client";

export default async function LeadsPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await searchParamsPromise;
  const company_id = await getTenantId();
  
  // Extract and validate searchParams
  const page = typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const searchTerm = typeof searchParams.search === "string" ? searchParams.search : undefined;
  const status = typeof searchParams.status === "string" && searchParams.status !== "all" 
    ? searchParams.status as LeadStatus 
    : undefined;
  const salesRepId = typeof searchParams.rep === "string" && searchParams.rep !== "all" 
    ? searchParams.rep 
    : undefined;

  // Parallel data fetching
  const [leadsData, salesReps] = await Promise.all([
    getLeads({
      company_id,
      searchTerm,
      status,
      salesRepId,
      page,
      pageSize: 10,
    }),
    getSalesReps(company_id),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
      </div>

      <div className="space-y-4">
        <LeadsFilters salesReps={salesReps} />
        <LeadsTable leads={leadsData.leads} meta={leadsData.meta} />
      </div>
    </div>
  );
}
