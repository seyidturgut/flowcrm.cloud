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
import { Label } from "@/components/ui/label";
import { UserCog, Loader2 } from "lucide-react";
import { updateLeadInfo } from "@/actions/leads";

interface EditLeadDialogProps {
  leadId: string;
  initialData: {
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
  };
}

export function EditLeadDialog({ leadId, initialData }: EditLeadDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // Controlled form state
  const [formData, setFormData] = useState({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    email: initialData.email || "",
    phone: initialData.phone || ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        await updateLeadInfo(leadId, formData);
        setOpen(false);
      } catch (err: any) {
        setError(err.message || "Güncelleme sırasında bir hata oluştu.");
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (isOpen) {
        // Reset state to initial when opening
        setFormData({
          firstName: initialData.firstName,
          lastName: initialData.lastName,
          email: initialData.email || "",
          phone: initialData.phone || ""
        });
      }
    }}>
      <DialogTrigger render={<Button variant="outline" className="rounded-xl glass border-white/10 font-bold" />}>
         Bilgileri Düzenle
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass border-white/10 rounded-[2rem] p-8">
        <DialogHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-primary/10 rounded-2xl">
                <UserCog className="h-6 w-6 text-primary" />
             </div>
             <div>
                <DialogTitle className="text-2xl font-black tracking-tight italic">Bilgileri Güncelle</DialogTitle>
                <DialogDescription className="text-xs font-medium italic opacity-70">
                  Müşteri iletişim bilgilerini düzenleyin.
                </DialogDescription>
             </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 group">
               <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Ad</Label>
               <Input 
                  name="firstName" 
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 transition-all font-semibold"
                  required 
               />
            </div>
            <div className="space-y-2 group">
               <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Soyad</Label>
               <Input 
                  name="lastName" 
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 transition-all font-semibold"
                  required 
               />
            </div>
          </div>

          <div className="space-y-2 group">
             <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">E-posta</Label>
             <Input 
                name="email" 
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 transition-all font-semibold"
             />
          </div>

          <div className="space-y-2 group">
             <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Telefon</Label>
             <Input 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
                className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 transition-all font-semibold"
             />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase rounded-xl">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="rounded-xl font-bold text-xs uppercase" disabled={isPending}>Vazgeç</Button>
            <Button 
              type="submit" 
              className="rounded-xl px-8 font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 bg-primary hover:scale-[1.02] transition-all"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Güncelle"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
