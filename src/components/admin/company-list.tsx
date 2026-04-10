"use client";

import { useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toggleCompanyStatus, deleteCompany } from "@/actions/admin-actions";

interface CompanyListProps {
  companies: any[];
}

export function CompanyList({ companies }: CompanyListProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = (companyId: string, currentStatus: boolean) => {
    startTransition(async () => {
      await toggleCompanyStatus(companyId, !currentStatus);
    });
  };

  const handleDelete = (companyId: string) => {
    if (confirm("Bu şirketi silmek istediğinizden emin misiniz? Bu işlem şirkete ait tüm verileri (kullanıcılar, leadler vb.) kalıcı olarak silecektir!")) {
      startTransition(async () => {
        await deleteCompany(companyId);
      });
    }
  };

  const planColors: Record<string, string> = {
    STARTER: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    PRO: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    ENTERPRISE: "bg-red-500/10 text-red-500 border-red-500/20"
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/[0.02]">
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Müşteri Şirket</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Plan</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Veri Hacmi</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Durum</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">İşlemler</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {companies.map((company) => (
            <tr key={company.id} className={`hover:bg-white/[0.03] transition-colors group ${!company.isActive ? 'opacity-60 grayscale-[0.5]' : ''}`}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                   <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-black text-xs italic ${company.isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                     {company.name[0]}
                   </div>
                   <div className="flex flex-col">
                     <span className="text-sm font-black">{company.name}</span>
                     <span className="text-[9px] font-medium text-muted-foreground opacity-50 italic">Kayıt: {new Date(company.createdAt).toLocaleDateString()}</span>
                   </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge variant="outline" className={`font-black text-[9px] px-3 py-1 ${planColors[company.plan]}`}>
                  {company.plan}
                </Badge>
              </td>
              <td className="px-6 py-4 text-center">
                 <span className="text-xs font-bold text-muted-foreground italic">{company._count?.leads?.toLocaleString() || "0"} Lead</span>
              </td>
              <td className="px-6 py-4 text-center">
                 <Badge className={`text-[9px] font-black leading-none py-1 border ${company.isActive ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                    {company.isActive ? 'AKTİF' : 'DONDURULDU'}
                 </Badge>
              </td>
              <td className="px-6 py-4 text-right">
                 <div className="flex items-center justify-end gap-3">
                   <Switch
                     checked={company.isActive}
                     onCheckedChange={() => handleToggle(company.id, company.isActive)}
                     disabled={isPending}
                     className="data-[state=checked]:bg-emerald-500"
                   />
                   <Button 
                     variant="ghost" 
                     size="icon" 
                     disabled={isPending}
                     onClick={() => handleDelete(company.id)}
                     className="h-8 w-8 text-red-500 hover:bg-red-500/10 hover:text-red-500"
                   >
                     <Trash2 className="h-4 w-4" />
                   </Button>
                 </div>
              </td>
            </tr>
          ))}
          {companies.length === 0 && (
             <tr>
               <td colSpan={5} className="py-8 text-center text-xs text-muted-foreground italic">
                 Henüz platformda kayıtlı müşteri (tenant) bulunmuyor.
               </td>
             </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
