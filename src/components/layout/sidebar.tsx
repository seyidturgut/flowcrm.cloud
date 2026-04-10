"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  FileText, 
  Magnet, 
  UserCog, 
  ShieldCheck, 
  Webhook, 
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Menu,
  Beaker,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Lead Kayıtları", url: "/leads", icon: Magnet },
  { title: "Pazarlama Analizi", url: "/marketing-analytics", icon: BarChart3 },
  { title: "Satış Temsilcileri", url: "/sales-reps", icon: UserCog },
  { title: "Otomatik Atama", url: "/assignment-rules", icon: ShieldCheck },
  { title: "Webhook Kayıtları", url: "/webhook-logs", icon: Webhook },
  { title: "Test Merkezi", url: "/test-lead", icon: Beaker },
  { title: "Sistem Ayarları", url: "/dashboard/settings", icon: Settings },
];

import Image from "next/image";

export function Sidebar({ 
  companyName = "FlowCRM.cloud",
  userRole = "sales_rep",
  isGlobalAdmin = false,
  userEmail = ""
}: { 
  companyName?: string;
  userRole?: string;
  isGlobalAdmin?: boolean;
  userEmail?: string;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Patron Kontrolü: Ya flag true olmalı ya da e-posta senin e-postan olmalı
  const isBoss = isGlobalAdmin || userEmail === "seyitturgut@gmail.com";

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-30 hidden flex-col border-r glass transition-all duration-300 ease-in-out sm:flex",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* ... logo section ... */}
      <div className="flex h-20 items-center justify-between px-6 border-b border-white/5">
        {!isCollapsed && (
          <Link href="/dashboard" className="flex items-center group">
             <Image 
                src="/FlowCRM.cloud logo design.webp" 
                alt="FlowCRM Logo" 
                width={130} 
                height={32} 
                className="object-contain hover:scale-105 transition-all duration-300"
                priority
              />
          </Link>
        )}
        {isCollapsed && (
          <Link href="/dashboard" className="flex items-center justify-center w-full">
            <Image 
              src="/fav.png" 
              alt="Logo" 
              width={32} 
              height={32} 
              className="rounded-lg shadow-lg hover:scale-110 transition-transform"
            />
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "h-8 w-8 rounded-full border border-white/10 hover:bg-white/10 transition-all",
            isCollapsed && "absolute -right-4 bg-background"
          )}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {items.map((item, index) => {
          if (item.title === "Test Merkezi" && !isBoss) return null;
          const Icon = item.icon;
          const isActive = pathname === item.url;
          return (
            <Link
              key={index}
              href={item.url}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 transition-all group relative overflow-hidden",
                isActive
                  ? "bg-primary/10 text-primary font-bold shadow-[inset_0_0_20px_rgba(var(--primary),0.05)]"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_var(--primary)]" />
              )}
              <Icon className={cn(
                "h-5 w-5 shrink-0 transition-transform group-hover:scale-110", 
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              {!isCollapsed && <span className="text-sm tracking-wide">{item.title}</span>}
            </Link>
          );
        })}
      </div>
      
      {isBoss && (
        <div className="p-4 mt-auto border-t border-white/5">
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-3 text-red-500 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-all group shadow-lg shadow-red-500/5",
              isCollapsed ? "justify-center" : ""
            )}
          >
            <ShieldAlert className="h-5 w-5 shrink-0 animate-pulse text-red-500" />
            {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">SAAS BOSS PANEL</span>}
          </Link>
        </div>
      )}
    </aside>
  );
}
