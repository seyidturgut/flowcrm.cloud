"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Building2 } from "lucide-react";
import { createCompanyByAdmin } from "@/actions/admin-actions";

export function AddCompanyDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await createCompanyByAdmin(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setOpen(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex h-9 items-center justify-center gap-2 rounded-xl shadow-lg shadow-primary/20 font-black text-xs uppercase tracking-widest px-6 bg-primary hover:scale-105 transition-all text-white">
        <UserPlus className="h-4 w-4" />
        Müşteri Ekle
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass border-white/10 rounded-[2rem] p-8">
        <DialogHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-primary/10 rounded-2xl">
                <Building2 className="h-6 w-6 text-primary" />
             </div>
             <div>
                <DialogTitle className="text-2xl font-black tracking-tight italic">Yeni Müşteri</DialogTitle>
                <DialogDescription className="text-xs font-medium italic opacity-70">
                  Platforma manuel tenant (şirket) ekleyin.
                </DialogDescription>
             </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <div className="space-y-2 group">
             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Şirket Adı</label>
             <Input 
                name="companyName" 
                placeholder="Örn: Acme Corp" 
                className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 transition-all font-semibold"
                required 
             />
          </div>

          <div className="space-y-2 group">
             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Yönetici E-posta</label>
             <Input 
                name="email" 
                type="email"
                placeholder="admin@acme.com" 
                className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 transition-all font-semibold"
                required 
             />
          </div>

          <div className="space-y-2 group">
             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Geçiçi Şifre</label>
             <Input 
                name="password" 
                type="password"
                placeholder="••••••••" 
                className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 transition-all font-semibold"
                required 
             />
          </div>

          <div className="space-y-2 group">
             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Üyelik Paketi</label>
             <select 
               name="plan"
               className="w-full h-12 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 transition-all font-semibold px-3 outline-none"
             >
                <option value="STARTER" className="bg-slate-900">STARTER ($29)</option>
                <option value="PRO" className="bg-slate-900">PRO ($79)</option>
                <option value="ENTERPRISE" className="bg-slate-900">ENTERPRISE ($199)</option>
             </select>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase rounded-xl">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-xl font-bold text-xs uppercase">Vazgeç</Button>
            <Button 
              type="submit" 
              className="rounded-xl px-8 font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 bg-primary hover:scale-[1.02] transition-all text-white"
              disabled={isPending}
            >
              {isPending ? "Ekleniyor..." : "Şirketi Kur"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
