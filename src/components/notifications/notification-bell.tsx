"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NotificationDropdown } from "@/components/notifications/notification-dropdown";
import { useRealtimeNotifications } from "@/components/notifications/realtime-notifications-provider";

export function NotificationBell() {
  const [mounted, setMounted] = useState(false);
  const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead } = useRealtimeNotifications();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative h-10 w-10 rounded-xl border border-white/5 hover:bg-white/5"
      >
        <Bell className="h-5 w-5 text-muted-foreground" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-xl border border-white/5 hover:bg-white/5"
          />
        }
      >
        <Bell className="h-5 w-5 text-muted-foreground" />
        {unreadCount > 0 ? (
          <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground shadow-lg">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        ) : null}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-auto rounded-2xl border-white/10 bg-popover/95 p-0 shadow-2xl backdrop-blur-xl"
      >
        <NotificationDropdown
          notifications={notifications}
          isLoading={isLoading}
          onRead={markAsRead}
          onReadAll={markAllAsRead}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
