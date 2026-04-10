import { getWebhookLogs } from "@/lib/data/webhook-logs";
import { getTenantId } from "@/lib/tenant";
import { LogTable } from "@/components/webhook-logs/log-table";
import { Webhook, RefreshCcw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function WebhookLogsPage() {
  const company_id = await getTenantId();
  const logs = await getWebhookLogs(company_id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Webhook className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Webhook Logs</h1>
            <p className="text-sm text-muted-foreground italic">
              Track and debug the data flow from your external lead sources.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm" className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Refresh
           </Button>
        </div>
      </div>

      <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-4 flex gap-3 items-start">
        <Info className="h-5 w-5 text-blue-500 mt-0.5" />
        <div className="text-sm text-blue-700/80 leading-relaxed">
          <strong>Pro Tip:</strong> All incoming data from your webhook endpoint is logged here. If a lead isn't appearing in your dashboard, check the 
          <span className="font-bold underline decoration-dotted ml-1 text-blue-700">Failed</span> logs to see the validation errors.
        </div>
      </div>

      <div className="grid gap-6">
        <LogTable logs={logs} />
      </div>
    </div>
  );
}
