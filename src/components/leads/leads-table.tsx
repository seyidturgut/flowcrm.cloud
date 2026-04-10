import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Sparkles, Flame, Zap, Cloud, MoreHorizontal, Mail, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LeadsTableProps {
  leads: any[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export function LeadsTable({ leads, meta }: LeadsTableProps) {
  const statusColors: Record<string, string> = {
    NEW: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    CONTACTED: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    YENİ: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    GÖRÜŞÜLDÜ: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    QUALIFIED: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    PROPOSAL: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    WON: "bg-green-500/10 text-green-500 border-green-500/20",
    LOST: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/5 glass overflow-hidden shadow-2xl">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="hover:bg-transparent border-white/5">
              <TableHead className="font-bold text-xs uppercase tracking-widest py-5 px-6">Müşteri</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-widest py-5">Durum</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-widest py-5">Temsilci</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-widest py-5">AI Analizi</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-widest py-5">Kaynak</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-widest py-5">Oluşturulma</TableHead>
              <TableHead className="text-right py-5 px-6"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-40 text-center italic text-muted-foreground">
                  No leads found in the ledger.
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-white/5 transition-colors border-white/5 group">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center font-black text-sm group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                        {lead.contact.firstName[0]}{lead.contact.lastName[0]}
                      </div>
                      <div className="flex flex-col">
                        <Link 
                          href={`/leads/${lead.id}`} 
                          className="font-black text-sm hover:text-primary transition-colors underline decoration-transparent hover:decoration-primary/30 underline-offset-4"
                        >
                          {lead.contact.firstName} {lead.contact.lastName}
                        </Link>
                        <span className="text-[11px] text-muted-foreground italic flex items-center gap-1">
                          <Mail className="h-2.5 w-2.5" /> {lead.contact.email || "Confidential"}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${statusColors[lead.status]}`}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-bold">
                        {(lead.salesRep?.user?.name || lead.salesRep?.user?.email || "U")[0]}
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">
                        {lead.salesRep?.user?.name || lead.salesRep?.user?.email || "Unassigned"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {lead.aiScore !== null ? (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg border border-white/5 group-hover:border-primary/20 transition-all">
                           {lead.aiLabel === 'Çok Sıcak' ? <Flame className="h-3 w-3 text-red-500 fill-current" /> : 
                            lead.aiLabel === 'Orta' ? <Zap className="h-3 w-3 text-orange-500 fill-current" /> : 
                            <Cloud className="h-3 w-3 text-blue-400 fill-current" />}
                           <span className="font-black text-xs">{lead.aiScore}</span>
                        </div>
                      </div>
                    ) : (
                      <Badge variant="secondary" className="text-[9px] uppercase font-black tracking-widest animate-pulse bg-muted/50 border-white/5">
                        Analiz ediliyor...
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="ghost" className="text-[10px] font-bold text-muted-foreground capitalize bg-white/5 border border-white/5">
                      {lead.source || "Manual"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-[11px] font-medium italic">
                    {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true, locale: tr })}
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/10">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {meta.totalPages > 1 && (
        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={meta.page > 1 ? `?page=${meta.page - 1}` : "#"}
                className={cn(
                  "rounded-xl border-white/5 glass text-xs font-bold px-4",
                  meta.page <= 1 && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
            <PaginationItem>
               <span className="text-xs font-black px-4 text-muted-foreground tracking-widest uppercase italic">
                 Page {meta.page} of {meta.totalPages}
               </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={meta.page < meta.totalPages ? `?page=${meta.page + 1}` : "#"}
                className={cn(
                  "rounded-xl border-white/5 glass text-xs font-bold px-4",
                  meta.page >= meta.totalPages && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
