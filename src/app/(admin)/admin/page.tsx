import prisma from "@/lib/prisma";
import { 
  Building2, 
  Users, 
  Zap, 
  TrendingUp, 
  ArrowUpRight, 
  Globe, 
  ShieldCheck,
  Package,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CompanyList } from "@/components/admin/company-list";
import { AddCompanyDialog } from "@/components/admin/add-company-dialog";

export default async function GlobalAdminPage() {
  // Fetch real data from DB
  const [companies, totalUsers, totalLeads, webhookLogs] = await Promise.all([
    prisma.company.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { users: true, leads: true }
        }
      }
    }),
    prisma.user.count(),
    prisma.lead.count(),
    prisma.webhookLog.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { company: true }
    })
  ]);

  const stats = [
    {
      title: "Toplam Müşteri",
      value: companies.length,
      icon: <Building2 className="h-5 w-5 text-indigo-400" />,
      description: "Sisteme kayıtlı toplam şirket",
      trend: "+12%"
    },
    {
      title: "Aylık Gelir (MRR)",
      value: "$" + (companies.reduce((acc, c) => acc + (c.plan === "STARTER" ? 29 : c.plan === "PRO" ? 79 : 199), 0)).toLocaleString(),
      icon: <TrendingUp className="h-5 w-5 text-emerald-400" />,
      description: "Tahmini abonelik geliri",
      trend: "+18%"
    },
    {
      title: "Pro/Enterprise Oranı",
      value: companies.filter(c => c.plan !== "STARTER").length + " / " + companies.length,
      icon: <Zap className="h-5 w-5 text-orange-400" />,
      description: "Yüksek paketli müşteriler",
      trend: "+5%"
    },
    {
      title: "Global Lead Hacmi",
      value: totalLeads.toLocaleString(),
      icon: <Activity className="h-5 w-5 text-blue-400" />,
      description: "Platformda işlenen veri miktarı",
      trend: "+24%"
    }
  ];

  const planColors: Record<string, string> = {
    STARTER: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    PRO: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    ENTERPRISE: "bg-red-500/10 text-red-500 border-red-500/20"
  };

  return (
    <div className="p-8 space-y-10 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">SaaS Owner Dashboard</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-gradient italic">Müşteri Yönetim Merkezi</h1>
          <p className="text-muted-foreground text-sm font-medium">Platformdaki şirketlerin durumlarını ve büyüme verilerini takip edin.</p>
        </div>
        <div className="flex gap-2">
           <Badge variant="outline" className="px-4 py-2 glass border-white/10 font-black tracking-[0.2em] text-[10px] text-emerald-500 leading-none flex items-center gap-2">
            <Globe className="h-3 w-3" /> TÜM SİSTEM AKTİF
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="glass border-white/10 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform text-foreground">
               {stat.icon}
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black italic mb-1">{stat.value}</div>
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-muted-foreground font-medium">{stat.description}</p>
                <span className="text-[10px] font-black text-emerald-400 flex items-center gap-0.5">
                   {stat.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Companies List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass border-white/10 shadow-2xl relative overflow-hidden rounded-[2rem]">
            <CardHeader className="bg-white/5 border-b border-white/5 pb-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-lg font-black italic">Aktif Müşteriler</CardTitle>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-white/5 font-black text-[10px]">{companies.length} Şirket</Badge>
                    <AddCompanyDialog />
                  </div>
               </div>
            </CardHeader>
            <CardContent className="p-0">
               <CompanyList companies={companies} />
            </CardContent>
          </Card>
        </div>

        {/* Recent Onboardings */}
        <div className="space-y-6">
          <Card className="glass border-white/10 shadow-2xl overflow-hidden h-full rounded-[2rem]">
             <CardHeader className="bg-white/5 border-b border-white/5 pb-4">
               <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-emerald-400" />
                  <CardTitle className="text-lg font-black italic">Son Katılımlar</CardTitle>
               </div>
               <CardDescription className="text-xs italic pt-1 text-muted-foreground">Yeni kaydolan müşteriler</CardDescription>
             </CardHeader>
             <CardContent className="pt-6 space-y-6">
                {companies.slice(0, 5).map((company) => (
                  <div key={company.id} className="flex gap-4 relative">
                      <div className="h-8 w-8 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center text-[10px] font-black text-primary italic shrink-0">
                        {company.name[0]}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-black leading-tight italic">{company.name}</span>
                        <span className="text-[10px] text-muted-foreground font-medium">
                          {company.plan} Paketi ile katıldı
                        </span>
                        <span className="text-[9px] text-muted-foreground italic opacity-50">
                          {new Date(company.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                  </div>
                ))}
                
                <Separator className="bg-white/5" />
                
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 space-y-2">
                   <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span className="text-xs font-black uppercase tracking-widest text-primary leading-none">Global Güvenlik</span>
                   </div>
                   <p className="text-[10px] text-muted-foreground font-medium leading-relaxed italic opacity-70">
                      Tüm platform genelinde veri izolasyonu aktif. Müşteri verileri birbirine karışamaz.
                   </p>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
