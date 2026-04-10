import { getAllCompanies } from "@/lib/data/admin";
import { AddCompanyDialog } from "@/components/admin/add-company-dialog";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { 
  Building2, 
  Users, 
  Target, 
  ExternalLink,
  ShieldCheck,
  Calendar,
  Briefcase,
  Zap,
  Flame,
  Cloud
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminCompaniesPage() {
  const companies = await getAllCompanies();

  const planIcons: Record<string, any> = {
    STARTER: <Cloud className="h-3 w-3" />,
    PRO: <Zap className="h-3 w-3" />,
    ENTERPRISE: <Flame className="h-3 w-3" />,
  };

  const planColors: Record<string, string> = {
    STARTER: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    PRO: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    ENTERPRISE: "bg-red-500/10 text-red-500 border-red-500/20"
  };

  return (
    <div className="flex flex-col gap-10 p-8 max-w-[1400px] mx-auto pb-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/10 rounded-3xl shadow-lg">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-gradient leading-none">
              Müşteri Yönetimi <span className="text-primary">.</span>
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-1 italic">FlowCRM.cloud tüm ekosistem tenant dökümü</p>
          </div>
        </div>
        <AddCompanyDialog />
      </div>

      <Card className="glass border-white/10 shadow-2xl overflow-hidden rounded-[2rem]">
        <CardHeader className="bg-white/5 border-b border-white/5 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-black italic">Global Şirket Listesi</CardTitle>
              <CardDescription className="text-xs font-medium italic opacity-70">Tüm tenant aktivitelerini ve paket durumlarını buradan izleyin.</CardDescription>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/20 font-black px-4 py-1.5 rounded-full">{companies.length} Kayıtlı Şirket</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/[0.02]">
              <TableRow className="border-white/5">
                <TableHead className="font-black text-[10px] uppercase tracking-widest pl-8 py-5">Şirket Kimliği / ID</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest">Abonelik Paketi</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-center">Temsilci / Lead</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest">Kayıt Tarihi</TableHead>
                <TableHead className="text-right font-black text-[10px] uppercase tracking-widest pr-8">Aksiyon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id} className="group hover:bg-white/[0.03] border-white/5 transition-all">
                  <TableCell className="font-bold text-foreground flex items-center gap-4 py-6 pl-8">
                    <div className="h-10 w-10 bg-primary/10 rounded-2xl flex items-center justify-center text-xs font-black text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                      {company.name[0]}
                    </div>
                    <div className="flex flex-col">
                       <span className="text-sm font-black">{company.name}</span>
                       <span className="text-[10px] font-mono text-muted-foreground opacity-50 truncate max-w-[150px]">{company.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`gap-2 px-3 py-1 font-black text-[10px] rounded-full border shadow-sm ${planColors[company.plan]}`}>
                      {planIcons[company.plan]}
                      {company.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-5">
                       <div className="flex flex-col items-center">
                          <span className="text-xs font-black text-indigo-400 leading-none">{company._count.users}</span>
                          <span className="text-[9px] font-bold uppercase opacity-40 mt-1">Ekip</span>
                       </div>
                       <div className="h-6 w-px bg-white/5" />
                       <div className="flex flex-col items-center">
                          <span className="text-xs font-black text-orange-400 leading-none">{company._count.leads}</span>
                          <span className="text-[9px] font-bold uppercase opacity-40 mt-1">Lead</span>
                       </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs font-bold italic">
                    {format(new Date(company.createdAt), "d MMM yyyy", { locale: tr })}
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <button className="h-10 w-10 bg-white/5 hover:bg-primary/20 hover:text-primary rounded-xl transition-all flex items-center justify-center group/btn">
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
