"use client";

import { useTransition, useState, useEffect } from "react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toggleRepStatus, updateRepSpecialties } from "@/actions/sales-reps";
import { Users, BarChart3, Fingerprint, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface RepListProps {
  reps: any[];
}

export function RepList({ reps }: RepListProps) {
  const [isPending, startTransition] = useTransition();
  // Local state to manage input values and avoid uncontrolled warnings
  const [localSpecialties, setLocalSpecialties] = useState<Record<string, string>>(
    Object.fromEntries(reps.map(r => [r.id, r.specialties || ""]))
  );

  // Sync state if reps change from parents (e.g. after revalidation)
  useEffect(() => {
    setLocalSpecialties(Object.fromEntries(reps.map(r => [r.id, r.specialties || ""])));
  }, [reps]);

  const handleToggle = (repId: string, currentStatus: boolean) => {
    startTransition(async () => {
      await toggleRepStatus(repId, !currentStatus);
    });
  };

  const handleUpdateSpecialties = async (repId: string) => {
    const value = localSpecialties[repId];
    // Only update if it actually changed from the prop value
    const originalValue = reps.find(r => r.id === repId)?.specialties || "";
    if (value === originalValue) return;

    startTransition(async () => {
      await updateRepSpecialties(repId, value);
    });
  };

  const handleInputChange = (repId: string, value: string) => {
    setLocalSpecialties(prev => ({ ...prev, [repId]: value }));
  };

  return (
    <div className="rounded-2xl border bg-card/50 glass overflow-hidden shadow-xl">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="hover:bg-transparent border-white/5">
            <TableHead className="w-[250px] font-black uppercase tracking-widest text-[10px]">Temsilci Bilgisi</TableHead>
            <TableHead className="w-[300px] font-black uppercase tracking-widest text-[10px]">AI Uzmanlık Alanları (Otomatik Atama)</TableHead>
            <TableHead className="font-black uppercase tracking-widest text-[10px]">Toplam Kayıt</TableHead>
            <TableHead className="font-black uppercase tracking-widest text-[10px]">Durum</TableHead>
            <TableHead className="text-right font-black uppercase tracking-widest text-[10px]">İşlem</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reps.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-muted-foreground italic">
                Henüz kayıtlı bir satış temsilcisi bulunamadı. Ekibinizi davet ederek başlayın.
              </TableCell>
            </TableRow>
          ) : (
            reps.map((rep) => (
              <TableRow 
                key={rep.id} 
                className={cn(
                  "hover:bg-white/[0.02] border-white/5 transition-colors",
                  !rep.isActive && "opacity-50 grayscale-[0.8]"
                )}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-white/10 shadow-lg">
                      <AvatarFallback className="bg-primary/20 text-primary font-bold">
                        {rep.user.name?.[0] || rep.user.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold tracking-tight">{rep.user.name || "İsimsiz"}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">SATIŞ TEMSİLCİSİ</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="relative group">
                    <Input 
                      value={localSpecialties[rep.id] || ""}
                      onChange={(e) => handleInputChange(rep.id, e.target.value)}
                      placeholder="Örn: Vergi İndirimi, Gayrimenkul, Kurumsal Satış..."
                      className="h-9 rounded-lg bg-white/5 border-white/5 text-xs italic focus:bg-white/10 transition-all pr-8"
                      onBlur={() => handleUpdateSpecialties(rep.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          (e.target as HTMLInputElement).blur();
                        }
                      }}
                    />
                    <Fingerprint className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                       <BarChart3 className="h-4 w-4" />
                    </div>
                    <span className="font-black text-lg">{rep._count.leads}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={rep.isActive ? "default" : "outline"}
                    className={cn(
                      "rounded-md px-2 py-0 text-[10px] uppercase font-black tracking-tighter",
                      rep.isActive && "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20"
                    )}
                  >
                    {rep.isActive ? "AKTİF" : "PASİF"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Switch
                    checked={rep.isActive}
                    onCheckedChange={() => handleToggle(rep.id, rep.isActive)}
                    disabled={isPending}
                    className="data-[state=checked]:bg-green-500"
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
