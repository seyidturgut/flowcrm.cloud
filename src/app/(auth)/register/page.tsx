"use client";

import { useActionState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { registerCompany } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Building2, 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Zap,
  Flame,
  Cloud,
  Globe
} from "lucide-react";

function RegisterForm() {
  const [state, action, isPending] = useActionState(registerCompany, undefined);
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get("plan") || "starter";

  const planIcons: Record<string, any> = {
    starter: <Cloud className="h-5 w-5 text-blue-400" />,
    pro: <Zap className="h-5 w-5 text-orange-400" />,
    enterprise: <Flame className="h-5 w-5 text-red-400" />,
  };

  const planColors: Record<string, string> = {
    starter: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    pro: "bg-orange-500/10 border-orange-500/20 text-orange-400",
    enterprise: "bg-red-500/10 border-red-500/20 text-red-400",
  };

  return (
    <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="flex flex-col items-center text-center space-y-2">
        <Link href="/">
          <Image 
            src="/FlowCRM.cloud logo design.webp" 
            alt="FlowCRM Logo" 
            width={160} 
            height={40} 
            className="mb-6 hover:scale-105 transition-transform"
          />
        </Link>
        <h1 className="text-3xl font-black tracking-tight text-gradient">Hemen Başlayın</h1>
        <p className="text-muted-foreground text-sm font-medium">İşletmenizi yapay zeka ile güçlendirme vaktiniz geldi.</p>
      </div>

      <div className={`p-4 rounded-2xl border flex items-center justify-between shadow-sm transition-all ${planColors[selectedPlan.toLowerCase()] || "bg-muted/50"}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl">
             {planIcons[selectedPlan.toLowerCase()] || <Sparkles className="h-5 w-5" />}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Seçili Paket</span>
            <span className="text-sm font-black capitalize">{selectedPlan}</span>
          </div>
        </div>
        <Link href="/#pricing" className="text-[10px] font-bold underline hover:opacity-80">Değiştir</Link>
      </div>

      <form action={action} className="space-y-4">
        <input type="hidden" name="plan" value={selectedPlan} />
        
        <div className="space-y-2 group">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">İşletme Adı</label>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              name="companyName" 
              placeholder="Şirketinizi adlandırın..." 
              className="h-12 pl-12 rounded-xl glass border-white/10 focus:border-primary/50 transition-all font-medium"
              required
            />
          </div>
        </div>

        <div className="space-y-2 group">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">E-posta Adresi</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              name="email" 
              type="email" 
              placeholder="admin@sirketiniz.com" 
              className="h-12 pl-12 rounded-xl glass border-white/10 focus:border-primary/50 transition-all font-medium"
              required
            />
          </div>
        </div>

        <div className="space-y-2 group">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Yönetici Şifresi</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              name="password" 
              type="password" 
              placeholder="••••••••" 
              className="h-12 pl-12 rounded-xl glass border-white/10 focus:border-primary/50 transition-all font-medium"
              required
            />
          </div>
        </div>

        {state?.error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold rounded-xl animate-in shake duration-500">
            {state.error}
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full h-12 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/20 bg-primary hover:scale-[1.02] transition-all group"
          disabled={isPending}
        >
          {isPending ? "Hesabınız Oluşturuluyor..." : "Hesabı Oluştur ve Başla"}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>

      <div className="text-center pt-4">
        <p className="text-xs font-medium text-muted-foreground">
          Zaten bir hesabınız var mı?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">Giriş Yap</Link>
        </p>
      </div>

      <div className="flex items-center justify-center gap-6 pt-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
         <ShieldCheck className="h-6 w-6" />
         <Globe className="h-6 w-6" />
         <Sparkles className="h-6 w-6" />
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,var(--primary),transparent_40%),radial-gradient(circle_at_bottom_left,var(--accent),transparent_40%)]">
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
