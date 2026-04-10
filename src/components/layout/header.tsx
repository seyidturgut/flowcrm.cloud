"use client";

import Link from "next/link";
import { 
  Menu, 
  Search, 
  User, 
  LogOut, 
  Bell, 
  HelpCircle,
  ChevronDown,
  Settings,
  LayoutDashboard,
  Magnet,
  UserCog,
  ShieldCheck,
  Webhook,
  ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup,
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { logout } from "@/actions/auth";

const items = [
  { title: "Panel", url: "/dashboard", icon: LayoutDashboard },
  { title: "Lead Kayıtları", url: "/leads", icon: Magnet },
  { title: "Satış Temsilcileri", url: "/sales-reps", icon: UserCog },
  { title: "Otomatik Atama", url: "/assignment-rules", icon: ShieldCheck },
  { title: "Webhook Kayıtları", url: "/webhook-logs", icon: Webhook },
  { title: "Sistem Ayarları", url: "/dashboard/settings", icon: Settings },
];

import Image from "next/image";

export function Header({ user }: { user?: any }) {
  const pathname = usePathname();
  const isBoss = user?.isGlobalAdmin || user?.email === "seyitturgut@gmail.com";

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between glass px-6 border-b border-white/5">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="shrink-0 sm:hidden border border-white/10" />}>
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col w-72 p-0 glass border-r border-white/10">
            <SheetHeader className="h-20 flex items-center justify-start border-b border-white/5 px-6">
              <SheetTitle>
                <Link href="/dashboard" className="flex items-center gap-3">
                  <Image 
                    src="/FlowCRM.cloud logo design.webp" 
                    alt="FlowCRM Logo" 
                    width={140} 
                    height={35} 
                    className="object-contain"
                  />
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-auto py-6 px-4">
              <nav className="grid gap-2">
                {items.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.url;
                  return (
                    <Link
                      key={index}
                      href={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 transition-all",
                        isActive
                          ? "bg-primary/10 text-primary font-bold shadow-[inset_0_0_15px_rgba(var(--primary),0.05)]"
                          : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  );
                })}
                
                {isBoss && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 rounded-xl px-4 py-4 text-red-500 bg-red-500/5 border border-red-500/10 mt-4 transition-all group shadow-lg shadow-red-500/5"
                  >
                    <ShieldAlert className="h-5 w-5 shrink-0 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] italic">SAAS BOSS PANEL</span>
                  </Link>
                )}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Global Search */}
        <div className="relative group max-w-md w-full hidden md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Her şeyi ara..." 
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/5 border-white/5 focus:bg-white/10 focus:border-primary/30 outline-none text-sm transition-all italic tracking-wide"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-10 w-10 border border-white/5 rounded-xl hover:bg-white/5 relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-background animate-pulse" />
        </Button>
        <Button variant="ghost" size="icon" className="h-10 w-10 border border-white/5 rounded-xl hover:bg-white/5 hidden sm:flex">
          <HelpCircle className="h-5 w-5 text-muted-foreground" />
        </Button>
        
        <div className="h-8 w-px bg-white/5 mx-1 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger render={
            <button className="flex items-center gap-3 p-1 pl-1.5 pr-3 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5 group">
              <Avatar className="h-8 w-8 border border-white/10 shadow-lg group-hover:scale-105 transition-transform">
                <AvatarFallback className="bg-primary/20 text-primary font-bold text-xs ring-1 ring-primary/30">
                  {user?.name?.[0] || user?.email?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start gap-0 hidden sm:flex">
                <span className="text-sm font-bold tracking-tight">{user?.name || "Kullanıcı"}</span>
                <span className="text-[10px] text-zinc-400 font-black uppercase tracking-widest flex items-center gap-1 leading-none">
                  <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
                  {isBoss ? "Global BOSS" : (user?.role === 'admin' ? "Şirket Sahibi" : "Temsilci")}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-1" />
            </button>
          } />
          <DropdownMenuContent className="w-64 glass border-white/10 p-2 shadow-2xl animate-in fade-in zoom-in duration-200">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-3">
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-black uppercase tracking-widest text-primary italic">Yönetici Paneli</p>
                  <p className="text-sm font-bold truncate">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-white/5 my-1" />
            
            {isBoss && (
              <DropdownMenuGroup>
                <DropdownMenuItem 
                  render={<Link href="/admin" className="w-full flex items-center gap-2 cursor-pointer text-red-500 font-bold" />}
                  className="rounded-lg bg-red-500/5 hover:bg-red-500/10 py-2.5 mb-1 border border-red-500/10"
                >
                  <ShieldAlert className="h-4 w-4 animate-pulse" /> SAAS BOSS PANEL
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/5 my-1" />
              </DropdownMenuGroup>
            )}

            <DropdownMenuGroup>
              <DropdownMenuItem 
                render={<Link href="/dashboard/settings" className="w-full flex items-center gap-2 cursor-pointer" />}
                className="rounded-lg hover:bg-white/5 py-2.5"
              >
                <User className="h-4 w-4" /> Profil Detayları
              </DropdownMenuItem>
              <DropdownMenuItem 
                render={<Link href="/dashboard/settings" className="w-full flex items-center gap-2 cursor-pointer" />}
                className="rounded-lg hover:bg-white/5 py-2.5"
              >
                <Settings className="h-4 w-4" /> Tercihler
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator className="bg-white/5 my-1" />
            
            <DropdownMenuItem className="rounded-lg hover:bg-white/5 py-2.5 cursor-pointer">
              <HelpCircle className="h-4 w-4" /> Destek Talebi
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="bg-white/5 my-1" />
            
            <form action={logout} className="w-full">
              <DropdownMenuItem 
                nativeButton={true} 
                render={<button type="submit" className="w-full flex items-center gap-2 cursor-pointer text-left" />}
                className="rounded-lg text-red-400 focus:bg-red-500/10 focus:text-red-400 py-2.5"
              >
                <LogOut className="h-4 w-4" /> Çıkış Yap
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
