"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Beaker, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Loader2,
  ArrowRight,
  Info
} from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is there, if not I'll use standard alert or a simple state
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function TestLeadPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastLeadId, setLastLeadId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"form" | "json">("form");
  const [rawJson, setRawJson] = useState(`{
  "musteri_adi": "Ali Can",
  "eposta_adresi": "ali@example.com",
  "telefon_no": "5551234567",
  "mesaji": "Vergi danışmanlığı hakkında acil bilgi bekliyorum.",
  "ek_not": "Bütçemiz hazır."
}`);
  const router = useRouter();

  async function triggerSimulation(data: any) {
    setLoading(true);
    setSuccess(false);

    try {
      const idRes = await fetch("/api/me"); 
      const { companyId } = await idRes.json();

      const response = await fetch(`/api/webhook/${companyId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: typeof data === "string" ? data : JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok) {
        setSuccess(true);
        setLastLeadId(resData.leadId);
      } else {
        alert("Simulation failed: " + resData.error);
      }
    } catch (error) {
      console.error("Test error:", error);
      alert("An error occurred during simulation.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    await triggerSimulation(data);
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-20 pt-4 px-4 sm:px-0">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-2xl">
            <Beaker className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gradient">Simulation <span className="text-primary italic">Lab</span></h1>
        </div>
        <p className="text-muted-foreground italic font-medium">Test your intelligent AI-First webhook extraction here.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-4">
          {/* Custom Tabs */}
          <div className="flex p-1.5 glass rounded-2xl w-fit border border-white/5">
            <button 
              onClick={() => setActiveTab("form")}
              className={cn("px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all", activeTab === "form" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-foreground")}
            >
              Simple Form
            </button>
            <button 
              onClick={() => setActiveTab("json")}
              className={cn("px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all", activeTab === "json" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-foreground")}
            >
              Raw JSON (AI Power)
            </button>
          </div>

          <Card className="glass border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
               <Sparkles className="h-20 w-20 text-primary" />
            </div>

            {activeTab === "form" ? (
              <form onSubmit={handleSubmitForm}>
                <CardHeader className="border-b border-white/5">
                  <CardTitle>Standart Form</CardTitle>
                  <CardDescription>Geleneksel alanlar otomatik olarak eşlenir.</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">İsim</Label>
                      <Input name="firstName" placeholder="Örn: Ahmet" required className="rounded-xl border-white/5 bg-muted/30 h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Soyisim</Label>
                      <Input name="lastName" placeholder="Örn: Yılmaz" required className="rounded-xl border-white/5 bg-muted/30 h-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">E-posta</Label>
                    <Input name="email" type="email" placeholder="ahmet@ornek.com" className="rounded-xl border-white/5 bg-muted/30 h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Mesaj</Label>
                    <Textarea name="message" placeholder="Nasıl yardımcı olabiliriz?" className="min-h-[100px] rounded-xl border-white/5 bg-muted/30 italic" />
                  </div>
                </CardContent>
                <CardFooter className="bg-white/5 p-6 border-t border-white/5">
                  <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl bg-primary shadow-lg shadow-primary/20 gap-2 font-black uppercase">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    Test Verisi Gönder
                  </Button>
                </CardFooter>
              </form>
            ) : (
              <div className="flex flex-col h-full">
                <CardHeader className="border-b border-white/5">
                  <CardTitle>AI Uzman Modu</CardTitle>
                  <CardDescription>Herhangi bir JSON yapısı gönderin. AI alanları tanımlayacaktır.</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Özel JSON Verisi</Label>
                    <div className="relative font-mono">
                      <Textarea 
                        value={rawJson}
                        onChange={(e) => setRawJson(e.target.value)}
                        className="min-h-[250px] p-6 rounded-2xl bg-slate-950/50 border-white/10 text-indigo-300 text-sm leading-relaxed scrollbar-hide focus:ring-primary/20 focus:border-primary/30"
                      />
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex items-start gap-3">
                     <Info className="h-4 w-4 text-indigo-400 mt-0.5" />
                     <p className="text-[11px] text-indigo-200/60 leading-normal italic">
                       Pro Tip: Change the key names (e.g. from "email" to "mail_adresi") and see how AI correctly identifies them.
                     </p>
                  </div>
                </CardContent>
                <CardFooter className="bg-white/5 p-6 border-t border-white/5">
                  <Button 
                    onClick={() => triggerSimulation(rawJson)} 
                    disabled={loading} 
                    className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20 gap-2 font-black uppercase"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    Run AI Extraction
                  </Button>
                </CardFooter>
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="glass border-white/5 h-fit shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xs font-black uppercase tracking-widest italic flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Live Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="space-y-6 flex flex-col items-center py-6 text-center animate-in slide-in-from-bottom-4 duration-500">
                  <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg mb-1">Processing Done</h3>
                    <p className="text-[11px] text-muted-foreground italic px-4">The AI has analyzed the incoming webhook and created the lead.</p>
                  </div>
                  <div className="grid grid-cols-1 w-full gap-2">
                    <Button 
                      className="w-full h-11 gap-2 rounded-xl italic font-bold text-xs" 
                      onClick={() => router.push(`/leads/${lastLeadId}`)}
                    >
                      Inspect Results <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setSuccess(false)} className="text-[9px] uppercase font-black tracking-widest opacity-50">
                      Reset Simulator
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-16 text-center gap-4 opacity-30">
                  <Beaker className="h-10 w-10" />
                  <p className="text-[11px] font-black uppercase tracking-widest italic">Idle / Waiting</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border-white/5 relative overflow-hidden group">
             <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             <CardHeader className="pb-3 px-6 pt-6">
                <CardTitle className="text-[10px] uppercase font-black tracking-[0.2em] text-primary">Security Note</CardTitle>
             </CardHeader>
             <CardContent className="px-6 pb-6">
                <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                  In production, ensure you use a unique API key or signature verification to prevent unauthorized lead injections.
                </p>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

