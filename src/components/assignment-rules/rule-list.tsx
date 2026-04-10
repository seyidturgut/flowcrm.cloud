"use client";

import { useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowRight } from "lucide-react";
import { toggleRuleStatus, deleteAssignmentRule } from "@/actions/assignment-rules";

interface RuleListProps {
  rules: any[];
}

export function RuleList({ rules }: RuleListProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (ruleId: string, currentStatus: boolean) => {
    startTransition(async () => {
      await toggleRuleStatus(ruleId, !currentStatus);
    });
  };

  const handleDelete = (ruleId: string) => {
    if (confirm("Are you sure you want to delete this rule?")) {
      startTransition(async () => {
        await deleteAssignmentRule(ruleId);
      });
    }
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rule Name</TableHead>
            <TableHead>Criteria</TableHead>
            <TableHead>Assign To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rules.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No assignment rules defined.
              </TableCell>
            </TableRow>
          ) : (
            rules.map((rule) => {
              const criteria = rule.criteria as any;
              return (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="secondary" className="capitalize">
                        {criteria.field}
                      </Badge>
                      <span className="text-muted-foreground">{criteria.operator}</span>
                      <code className="px-1.5 py-0.5 bg-muted rounded text-xs">
                        "{criteria.value}"
                      </code>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">
                        {rule.salesRep.user.name || rule.salesRep.user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={rule.isActive ? "default" : "outline"}>
                      {rule.isActive ? "Active" : "Paused"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Switch
                      checked={rule.isActive}
                      onCheckedChange={() => handleToggle(rule.id, rule.isActive)}
                      disabled={isPending}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(rule.id)}
                      disabled={isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
