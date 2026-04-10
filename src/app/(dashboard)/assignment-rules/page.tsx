import { getAssignmentRules } from "@/lib/data/assignment-rules";
import { getSalesReps } from "@/lib/data/leads";
import { getTenantId } from "@/lib/tenant";
import { RuleList } from "@/components/assignment-rules/rule-list";
import { AddRuleDialog } from "@/components/assignment-rules/add-rule-dialog";
import { GitBranch } from "lucide-react";

export default async function AssignmentRulesPage() {
  const company_id = await getTenantId();

  const [rules, salesReps] = await Promise.all([
    getAssignmentRules(company_id),
    getSalesReps(company_id),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <GitBranch className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Assignment Rules</h1>
            <p className="text-sm text-muted-foreground">
              Define logic to automatically route incoming leads to specific sales reps.
            </p>
          </div>
        </div>
        <AddRuleDialog 
          salesReps={salesReps.map(r => ({ 
            id: r.id, 
            name: r.user.name, 
            email: r.user.email 
          }))} 
        />
      </div>

      <div className="grid gap-6">
        <RuleList rules={rules} />
      </div>
    </div>
  );
}
