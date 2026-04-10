import type { NotificationEventPayload } from "@/lib/notifications/types";

type NotificationListener = (payload: NotificationEventPayload) => void;

const userListeners = new Map<string, Set<NotificationListener>>();

export function subscribeToUser(userId: string, listener: NotificationListener) {
  const listeners = userListeners.get(userId) ?? new Set<NotificationListener>();
  listeners.add(listener);
  userListeners.set(userId, listeners);

  return () => {
    const current = userListeners.get(userId);
    if (!current) return;
    current.delete(listener);
    if (current.size === 0) {
      userListeners.delete(userId);
    }
  };
}

export function publishToUser(userId: string, payload: NotificationEventPayload) {
  const listeners = userListeners.get(userId);
  if (!listeners) return;

  for (const listener of listeners) {
    listener(payload);
  }
}

export function publishToCompany(_companyId: string, _payload: NotificationEventPayload) {
  void _companyId;
  void _payload;
  return;
}
