"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import type { NotificationEventPayload } from "@/lib/notifications/types";

type NotificationsContextValue = {
  notifications: NotificationEventPayload[];
  unreadCount: number;
  isLoading: boolean;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
};

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

function mergeNotifications(
  current: NotificationEventPayload[],
  incoming: NotificationEventPayload[]
) {
  const map = new Map(current.map((notification) => [notification.id, notification]));

  for (const notification of incoming) {
    map.set(notification.id, notification);
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function RealtimeNotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationEventPayload[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    let isActive = true;

    async function bootstrap() {
      try {
        const [notificationsRes, countRes] = await Promise.all([
          fetch("/api/notifications", { cache: "no-store" }),
          fetch("/api/notifications/unread-count", { cache: "no-store" }),
        ]);

        if (!notificationsRes.ok || !countRes.ok || !isActive) {
          return;
        }

        const notificationsData = (await notificationsRes.json()) as {
          notifications: NotificationEventPayload[];
        };
        const countData = (await countRes.json()) as { count: number };

        setNotifications(notificationsData.notifications);
        setUnreadCount(countData.count);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    bootstrap();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let disposed = false;

    function connect() {
      const source = new EventSource("/api/notifications/stream");
      eventSourceRef.current = source;

      source.addEventListener("snapshot", (event) => {
        const payload = JSON.parse((event as MessageEvent).data) as {
          notifications: NotificationEventPayload[];
          unreadCount: number;
        };

        setNotifications(payload.notifications);
        setUnreadCount(payload.unreadCount);
        initializedRef.current = true;
      });

      source.addEventListener("notification", (event) => {
        const payload = JSON.parse((event as MessageEvent).data) as NotificationEventPayload;

        setNotifications((current) => mergeNotifications(current, [payload]));
        setUnreadCount((current) => current + (payload.isRead ? 0 : 1));

        if (initializedRef.current) {
          toast(payload.title, {
            description: payload.message,
          });
        }
      });

      source.onerror = () => {
        source.close();
        if (disposed) return;
        reconnectTimeoutRef.current = window.setTimeout(connect, 3000);
      };
    }

    connect();

    return () => {
      disposed = true;
      eventSourceRef.current?.close();
      if (reconnectTimeoutRef.current) {
        window.clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  async function markAsRead(id: string) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
    setUnreadCount((current) => Math.max(0, current - 1));

    const response = await fetch(`/api/notifications/${id}/read`, {
      method: "POST",
    });

    if (!response.ok) {
      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id ? { ...notification, isRead: false } : notification
        )
      );
      setUnreadCount((current) => current + 1);
    }
  }

  async function markAllAsRead() {
    const unreadIds = notifications.filter((notification) => !notification.isRead).map((notification) => notification.id);

    if (unreadIds.length === 0) {
      return;
    }

    setNotifications((current) =>
      current.map((notification) => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);

    const response = await fetch("/api/notifications/read-all", {
      method: "POST",
    });

    if (!response.ok) {
      setNotifications((current) =>
        current.map((notification) =>
          unreadIds.includes(notification.id) ? { ...notification, isRead: false } : notification
        )
      );
      setUnreadCount(unreadIds.length);
    }
  }

  return (
    <NotificationsContext.Provider
      value={{ notifications, unreadCount, isLoading, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useRealtimeNotifications() {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error("useRealtimeNotifications must be used within RealtimeNotificationsProvider");
  }

  return context;
}
