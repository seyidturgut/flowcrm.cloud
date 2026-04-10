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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserPlus, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { createSalesRep } from "@/actions/sales-reps";

interface AddRepDialogProps {
  availableUsers: { id: string; name: string | null; email: string }[];
}

export function AddRepDialog({ availableUsers }: AddRepDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      try {
        await createSalesRep(name, email, password);
        setOpen(false);
      } catch (err: any) {
        setError(err.message || "Bir hata oluştu.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="gap-2 rounded-xl shadow-lg shadow-primary/20 font-black text-xs uppercase tracking-widest px-6" />}>
        <UserPlus className="h-4 w-4" />
        Temsilci Ekle
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] glass border-white/10 rounded-[2rem] p-8">
        <DialogHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
             <div className="p-3 bg-primary/10 rounded-2xl">
                <UserPlus className="h-6 w-6 text-primary" />
             </div>
             <div>
                <DialogTitle className="text-2xl font-black tracking-tight italic">Yeni Temsilci</DialogTitle>
                <DialogDescription className="text-xs font-medium italic opacity-70">
                  Ekibinize yeni bir satış temsilcisi tanımlayın.
                </DialogDescription>
             </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <div className="space-y-2 group">
             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Tam İsim</label>
             <Input 
                name="name" 
                placeholder="Örn: Ahmet Yılmaz" 
                className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 transition-all font-semibold"
                required 
             />
          </div>

          <div className="space-y-2 group">
             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">E-posta Adresi</label>
             <Input 
                name="email" 
                type="email"
                placeholder="ahmet@sirket.com" 
                className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 transition-all font-semibold"
                required 
             />
          </div>

          <div className="space-y-2 group">
             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Başlangıç Şifresi</label>
             <Input 
                name="password" 
                type="password"
                placeholder="••••••••" 
                className="h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary/50 transition-all font-semibold"
                required 
             />
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
              className="rounded-xl px-8 font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 bg-primary hover:scale-[1.02] transition-all"
              disabled={isPending}
            >
              {isPending ? "Ekleniyor..." : "Temsilciyi Ekle"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
