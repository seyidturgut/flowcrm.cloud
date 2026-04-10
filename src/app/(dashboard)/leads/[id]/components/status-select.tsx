"use client";

import { useTransition } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { updateLeadStatus } from "@/actions/leads";
import { LeadStatus } from "@prisma/client";

export function StatusSelect({ 
  leadId, 
  currentStatus 
}: { 
  leadId: string, 
  currentStatus: LeadStatus 
}) {
  const [isPending, startTransition] = useTransition();

  const handleValueChange = (value: LeadStatus | null) => {
    if (!value) return;
    startTransition(async () => {
      await updateLeadStatus(leadId, value);
    });
  };

  return (
    <Select 
      defaultValue={currentStatus} 
      onValueChange={handleValueChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-full h-11 bg-background border-primary/20">
        <SelectValue placeholder="Change Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="NEW">New</SelectItem>
        <SelectItem value="CONTACTED">Contacted</SelectItem>
        <SelectItem value="QUALIFIED">Qualified</SelectItem>
        <SelectItem value="PROPOSAL">Proposal</SelectItem>
        <SelectItem value="WON">Won</SelectItem>
        <SelectItem value="LOST">Lost</SelectItem>
      </SelectContent>
    </Select>
  );
}
