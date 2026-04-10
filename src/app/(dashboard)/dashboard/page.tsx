import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, Clock, AlertCircle, BarChart3, ArrowUpRight, Zap, Target, TrendingUp, Sparkles, Magnet, UserCog } from "lucide-react"
import { getDashboardStats } from "@/lib/data"
import { formatDistanceToNow } from "date-fns"
import { tr } from "date-fns/locale";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Başlık Bölümü */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter text-gradient leading-tight">
            Panel <span className="text-primary italic">Özeti</span>
          </h1>
          <p className="text-muted-foreground font-medium italic flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            Performans bu hafta %12 arttı. Harika gidiyorsun!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl border-white/10 glass shadow-sm">
            Verileri Dışa Aktar
          </Button>
          <Button className="rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
            Rapor Oluştur
          </Button>
        </div>
      </div>

      {/* Metrik Kartları (Bento Grid) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Magnet className="h-16 w-16" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground italic flex items-center gap-2">
               <div className="h-2 w-2 rounded-full bg-indigo-500" />
               Toplam Kayıt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-foreground">{stats.totalLeads}</div>
            <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-tighter text-green-500">+12% Artış</p>
          </CardContent>
        </Card>
        
        <Card className="glass border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap className="h-16 w-16 text-orange-500" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground italic flex items-center gap-2">
               <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
               Bugün Gelen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-foreground">{stats.todayLeads}</div>
            <p className="text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-tighter">Son 24 Saat</p>
          </CardContent>
        </Card>

        <Card className="glass border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground italic flex items-center gap-2">
               <div className="h-2 w-2 rounded-full bg-red-500" />
               Atanmamış
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-foreground">{stats.unassignedLeads}</div>
            <div className="mt-2 text-[10px] font-black uppercase tracking-widest">
              {stats.unassignedLeads > 0 ? (
                <span className="text-red-500 flex items-center gap-1">Acil Müdahale Gerekli <Zap className="h-3 w-3" /></span>
              ) : (
                <span className="text-green-500 italic">Her Şey Atandı</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-600 to-indigo-900 shadow-xl border-none relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Target className="h-16 w-16 text-white" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-white/60 italic flex items-center gap-2">
               <div className="h-2 w-2 rounded-full bg-white animate-bounce" />
               Performans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-white italic">12.5%</div>
            <p className="text-[10px] text-white/60 mt-2 font-bold uppercase tracking-tighter italic">Dönüşüm Oranı</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 items-start">
        {/* Satış Temsilcisi Dağılımı */}
        <Card className="lg:col-span-8 glass border-white/5 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
            <div className="space-y-1">
              <CardTitle className="text-xl font-black flex items-center gap-2 underline decoration-indigo-500 decoration-4 underline-offset-8">
                Takım Dağılımı
              </CardTitle>
              <CardDescription className="italic text-xs">Satış temsilcilerinin iş yükü analizi.</CardDescription>
            </div>
            <Link href="/sales-reps">
              <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest gap-1 hover:bg-white/5">
                Tüm Takım <ArrowUpRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-8 px-8">
            <div className="grid gap-8">
              {stats.leadsByRep.length === 0 ? (
                <div className="h-[200px] flex items-center justify-center text-muted-foreground italic bg-muted/10 rounded-3xl border-2 border-dashed border-white/5">
                  Henüz lead atanmış aktif temsilci bulunmuyor.
                </div>
              ) : (
                stats.leadsByRep.map((rep) => {
                  const percentage = stats.totalLeads > 0 
                    ? Math.round((rep.count / stats.totalLeads) * 100) 
                    : 0;
                  
                  return (
                    <div key={rep.name} className="space-y-3 group px-4 py-2 hover:bg-white/5 rounded-2xl transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center font-black text-xs group-hover:bg-primary group-hover:text-white transition-all">
                              {rep.name[0]}
                           </div>
                           <span className="font-black text-sm tracking-tight">{rep.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono font-black py-1 px-2 bg-muted rounded-lg">{rep.count} Kayıt</span>
                          <span className="text-xs font-black text-primary">{percentage}%</span>
                        </div>
                      </div>
                      <div className="h-2.5 w-full bg-muted/40 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all duration-1000 ease-out"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Canlı Aktivite Feed */}
        <Card className="lg:col-span-4 glass border-white/5 shadow-2xl overflow-hidden">
          <CardHeader className="border-b border-white/5 pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-black italic text-gradient">Canlı Akış</CardTitle>
              <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            </div>
            <CardDescription className="text-xs italic">Sistemdeki anlık hareketler.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {stats.recentLeads.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center gap-4 opacity-50">
                  <Clock className="h-10 w-10" />
                  <p className="text-sm italic">Yeni lead gelmesi bekleniyor...</p>
                </div>
              ) : (
                stats.recentLeads.map((lead, idx) => (
                  <div key={lead.id} className="p-6 hover:bg-white/5 transition-colors group relative">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center font-black text-lg group-hover:scale-110 transition-transform">
                          {lead.customer[0]}
                        </div>
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-lg bg-background border border-white/10 flex items-center justify-center">
                           <Sparkles className="h-3 w-3 text-primary fill-current" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <Link 
                            href={`/leads/${lead.id}`}
                            className="text-sm font-black truncate group-hover:text-primary transition-colors underline decoration-transparent group-hover:decoration-primary/30 underline-offset-4"
                          >
                            {lead.customer}
                          </Link>
                          <span className="text-[9px] font-black text-muted-foreground uppercase opacity-60">
                            {formatDistanceToNow(new Date(lead.createdAt), { addSuffix: true, locale: tr })}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground italic truncate">{lead.email || "Bilgi Yok"}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Link href="/leads">
              <Button variant="ghost" className="w-full h-14 rounded-none border-t border-white/5 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all">
                Tüm Kayıtlara Eriş
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
