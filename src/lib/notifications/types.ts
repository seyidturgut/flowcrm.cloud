import type {
  Notification,
  NotificationEntityType,
  NotificationPriority,
  NotificationType,
} from "@prisma/client";

export type NotificationEventPayload = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  entityType: NotificationEntityType;
  entityId: string | null;
  isRead: boolean;
  createdAt: string;
};

export function serializeNotification(notification: Notification): NotificationEventPayload {
  return {
    id: notification.id,
    type: notification.type,
    title: notification.title,
    message: notification.message,
    priority: notification.priority,
    entityType: notification.entity_type,
    entityId: notification.entity_id ?? null,
    isRead: notification.is_read,
    createdAt: notification.created_at.toISOString(),
  };
}
