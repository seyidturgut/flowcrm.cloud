"use client";

import { useTransition, useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { reassignLead } from "@/actions/leads";
import { UserPlus, Loader2 } from "lucide-react";

export function RepSelect({ 
  leadId, 
  currentRepId, 
  salesReps 
}: { 
  leadId: string;
  currentRepId: string | null;
  salesReps: { id: string; name: string }[];
}) {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(currentRepId || "unassigned");

  // If the currentRepId is not in the salesReps list, we should still show something readable
  const currentRepExists = currentRepId ? salesReps.some(r => r.id === currentRepId) : true;
  const displayReps = [...salesReps];
  
  if (currentRepId && !currentRepExists) {
    displayReps.push({ id: currentRepId, name: "Bilinmeyen/Eski Temsilci" });
  }

  // Sync state if prop changes
  useEffect(() => {
    setValue(currentRepId || "unassigned");
  }, [currentRepId]);

  const handleValueChange = (newValue: string | null) => {
    if (!newValue) return;
    setValue(newValue);
    startTransition(async () => {
      await reassignLead(leadId, newValue === "unassigned" ? null : newValue);
    });
  };

  return (
    <Select 
      value={value} 
      onValueChange={handleValueChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-full h-11 bg-white/5 border-white/10 rounded-xl focus:ring-primary/20 transition-all px-4">
        <SelectValue placeholder="Temsilci Seçin...">
          {value === "unassigned" ? "Atanmamış (Boşta)" : (displayReps.find(r => r.id === value)?.name || "Temsilci Seçin...")}
        </SelectValue>
        {isPending && <Loader2 className="h-4 w-4 animate-spin text-primary ml-auto" />}
      </SelectTrigger>
      <SelectContent className="glass border-white/10 rounded-xl shadow-2xl">
        <SelectItem value="unassigned" className="text-xs font-medium italic text-muted-foreground cursor-pointer">
          Atanmamış (Boşta)
        </SelectItem>
        {displayReps.map((rep) => (
          <SelectItem key={rep.id} value={rep.id} className="text-xs font-bold cursor-pointer">
            {rep.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

