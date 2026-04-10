"use client";

import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { AlertCircle, Bell, CheckCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { NotificationEventPayload } from "@/lib/notifications/types";

export function NotificationDropdown({
  notifications,
  isLoading,
  onRead,
  onReadAll,
}: {
  notifications: NotificationEventPayload[];
  isLoading: boolean;
  onRead: (id: string) => Promise<void>;
  onReadAll: () => Promise<void>;
}) {
  return (
    <div className="w-[22rem] overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
          <p className="text-xs text-muted-foreground">Live updates from your workspace</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full text-xs font-semibold"
          onClick={() => void onReadAll()}
        >
          <CheckCheck className="h-3.5 w-3.5" />
          Mark all
        </Button>
      </div>

      <div className="max-h-[26rem] overflow-y-auto p-2">
        {isLoading ? (
          <div className="px-3 py-8 text-center text-sm text-muted-foreground">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
            <div className="rounded-2xl bg-white/5 p-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold">No notifications yet</p>
              <p className="text-xs text-muted-foreground">New activity will appear here in real time.</p>
            </div>
          </div>
        ) : (
          notifications.map((notification) => (
            <button
              key={notification.id}
              type="button"
              onClick={() => void onRead(notification.id)}
              className={`mb-2 w-full rounded-2xl border p-3 text-left transition-all hover:bg-white/6 ${
                notification.isRead
                  ? "border-white/5 bg-transparent"
                  : "border-primary/10 bg-primary/5 shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-foreground">{notification.title}</p>
                    {notification.priority === "HIGH" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-400">
                        <AlertCircle className="h-3 w-3" />
                        High
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{notification.message}</p>
                </div>
                {!notification.isRead ? (
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                ) : null}
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">
                {formatDistanceToNow(new Date(notification.createdAt), {
                  addSuffix: true,
                  locale: tr,
                })}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
