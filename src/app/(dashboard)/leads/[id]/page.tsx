import { getLeadById, getSalesReps } from "@/lib/data/leads";
import { getTenantId } from "@/lib/tenant";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  Calendar, 
  Globe, 
  Clock, 
  MessageSquare,
  History,
  MoreVertical,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Flame,
  Zap,
  Cloud,
  RefreshCcw,
  UserPlus
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AddNoteForm } from "./components/add-note-form";
import { StatusSelect } from "./components/status-select";
import { RepSelect } from "./components/rep-select";
import { EditLeadDialog } from "./components/edit-lead-dialog";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const company_id = await getTenantId();
  const lead = await getLeadById(id, company_id);
  const salesReps = await getSalesReps(company_id);

  if (!lead) {
    notFound();
  }

  const statusColors: Record<string, string> = {
    NEW: "bg-blue-500/10 text-blue-500",
    CONTACTED: "bg-yellow-500/10 text-yellow-500",
    QUALIFIED: "bg-purple-500/10 text-purple-500",
    PROPOSAL: "bg-orange-500/10 text-orange-500",
    WON: "bg-green-500/10 text-green-500",
    LOST: "bg-red-500/10 text-red-500",
  };

  const statusNames: Record<string, string> = {
    NEW: "YENİ",
    CONTACTED: "GÖRÜŞÜLDÜ",
    QUALIFIED: "UYGUN",
    PROPOSAL: "TEKLİF VERİLDİ",
    WON: "KAZANILDI",
    LOST: "KAYBEDİLDİ",
  };

  return (
    <div className="flex flex-col gap-8 pb-20">
      {/* Header Bölümü */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-xl">
            <AvatarFallback className="bg-primary/10 text-primary font-black text-xl">
              {lead.contact.firstName[0]}{lead.contact.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-gradient">
              {lead.contact.firstName} {lead.contact.lastName}
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline" className={cn("font-black tracking-widest text-[10px]", statusColors[lead.status])}>
                {statusNames[lead.status]}
              </Badge>
              <span className="text-muted-foreground">•</span>
              <span className="flex items-center gap-1 text-muted-foreground italic">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                {format(new Date(lead.createdAt), "d MMMM yyyy", { locale: tr })} tarihinde oluşturuldu
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <EditLeadDialog 
            leadId={lead.id} 
            initialData={{
              firstName: lead.contact.firstName,
              lastName: lead.contact.lastName,
              email: lead.contact.email,
              phone: lead.contact.phone
            }} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sol Taraf: İletişim Bilgileri */}
        <div className="md:col-span-3 space-y-6">
          <Card className="overflow-hidden border-white/5 glass shadow-xl">
            <CardHeader className="bg-white/5 border-b border-white/5 pb-4">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                İletişim Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              <div className="flex items-center gap-4 group">
                <div className="p-2.5 bg-indigo-500/10 rounded-xl group-hover:scale-110 transition-transform">
                  <Mail className="h-4 w-4 text-indigo-400" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">E-posta</span>
                  <span className="text-sm font-bold truncate">{lead.contact.email || "Belirtilmemiş"}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl group-hover:scale-110 transition-transform">
                  <Phone className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Telefon</span>
                  <span className="text-sm font-bold">{lead.contact.phone || "Belirtilmemiş"}</span>
                </div>
              </div>
              
              <Separator className="bg-white/5" />
              
              <div className="space-y-4 pt-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Kaynak</span>
                  <Badge variant="secondary" className="w-fit text-[10px] bg-white/5 border-white/5">{lead.source || "Organik"}</Badge>
                </div>
                {lead.utm_source && (
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Kampanya Bilgisi</span>
                    <span className="text-sm font-medium italic opacity-80">{lead.utm_source} / {lead.utm_medium}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orta: Aktivite Geçmişi */}
        <div className="md:col-span-6 space-y-6">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black italic flex items-center gap-2">
                <History className="h-5 w-5 text-primary" />
                Aktivite Geçmişi
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-4 space-y-8">
              {/* Not Ekleme Formu */}
              <AddNoteForm leadId={lead.id} />

              {/* Zaman Çizelgesi */}
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/20 before:via-primary/5 before:to-transparent">
                {lead.notes.map((note) => (
                  <div key={note.id} className="relative flex items-start gap-6 group">
                    <div className="absolute left-0 mt-1 h-10 w-10 flex items-center justify-center rounded-2xl bg-background border border-white/10 group-hover:border-primary/50 transition-all z-10 shadow-lg group-hover:scale-110">
                      {note.author_id === "system" ? (
                        <RefreshCcw className="h-4 w-4 text-indigo-400" />
                      ) : (
                        <MessageSquare className="h-4 w-4 text-orange-400" />
                      )}
                    </div>
                    <div className="ml-14 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-widest italic opacity-80">
                          {note.author_id === "system" ? "SİSTEM GÜNLÜĞÜ" : "DANIŞMAN NOTU"}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium bg-white/5 px-2 py-1 rounded-full">
                          <Clock className="h-3 w-3" />
                          {format(new Date(note.createdAt), "d MMM, HH:mm", { locale: tr })}
                        </span>
                      </div>
                      <div className={cn(
                        "p-5 rounded-2xl border transition-all",
                        note.author_id === "system" 
                          ? "bg-white/5 border-dashed border-white/5 text-muted-foreground italic text-sm" 
                          : "bg-white/[0.03] border-white/5 shadow-sm text-sm leading-relaxed"
                      )}>
                        {note.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sağ Taraf: Aksiyon ve AI Paneli */}
        <div className="md:col-span-3 space-y-8">
          {/* AI Analiz Kartı */}
          <Card className="overflow-hidden border-primary/20 shadow-2xl relative bg-gradient-to-br from-indigo-900/10 to-transparent">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles className="h-16 w-16" />
            </div>
            <CardHeader className="pb-4 border-b border-white/5">
              <CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                AI Analiz Raporu
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
              {lead.aiScore !== null ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="text-6xl font-black text-primary italic tracking-tighter leading-none">{lead.aiScore}</div>
                      <span className="text-[11px] text-muted-foreground uppercase font-black tracking-[0.2em] mt-2">Kalite Puanı</span>
                    </div>
                    <div>
                      {lead.aiLabel === 'Hot' ? (
                        <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 px-5 py-2 gap-2 rounded-full shadow-lg shadow-red-500/30 text-xs font-black">
                          <Flame className="h-4 w-4 fill-current" /> ÇOK SICAK
                        </Badge>
                      ) : lead.aiLabel === 'Warm' ? (
                        <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0 px-5 py-2 gap-2 rounded-full shadow-lg shadow-orange-500/30 text-xs font-black">
                          <Zap className="h-4 w-4 fill-current" /> ORTA
                        </Badge>
                      ) : (
                        <Badge className="bg-slate-500 hover:bg-slate-600 text-white border-0 px-5 py-2 gap-2 rounded-full shadow-lg shadow-slate-500/30 text-xs font-black">
                          <Cloud className="h-4 w-4 fill-current" /> SOĞUK
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[11px] font-black uppercase text-muted-foreground tracking-[0.2em] opacity-60 italic">Yapay Zeka Yorumu</label>
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 relative shadow-inner">
                       <p className="text-sm leading-relaxed italic text-foreground font-semibold">
                        "{lead.aiReasoning}"
                      </p>
                    </div>
                  </div>

                  {lead.aiTags && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {lead.aiTags.split(", ").map(tag => (
                        <Badge key={tag} variant="outline" className="text-[10px] font-black uppercase tracking-tighter border-white/20 bg-white/5 py-1 px-3 hover:bg-primary/10 hover:border-primary/30 transition-all">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="py-14 flex flex-col items-center justify-center text-center gap-4">
                  <RefreshCcw className="h-8 w-8 text-primary animate-spin" />
                  <p className="text-sm text-muted-foreground italic font-medium">Yapay zeka analiz raporu hazırlanıyor...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* İşlem Paneli */}
          <Card className="glass border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-black italic tracking-tight">Lead Yönetimi</CardTitle>
              <CardDescription className="text-xs italic">Durum ve temsilci atamalarını buradan güncelleyin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                   <div className="h-2 w-2 rounded-full bg-primary" /> Mevcut Durum
                </label>
                <StatusSelect leadId={lead.id} currentStatus={lead.status} />
              </div>
              
              <Separator className="bg-white/5" />
              
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                   <UserPlus className="h-3 w-3 text-primary" /> Sorumlu Atama
                </label>
                <RepSelect 
                  leadId={lead.id} 
                  currentRepId={lead.sales_rep_id} 
                  salesReps={salesReps.map(r => ({ id: r.id, name: r.user.name || r.user.email }))} 
                />
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full justify-start gap-3 h-12 rounded-xl border-white/10 glass hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all font-black uppercase tracking-widest text-[10px]">
                  <ArrowRight className="h-4 w-4" />
                  Müşteriye Dönüştür
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
