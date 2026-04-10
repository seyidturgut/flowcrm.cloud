import {
  NotificationEntityType,
  NotificationPriority,
  NotificationType,
  Prisma,
} from "@prisma/client";

import prisma from "@/lib/prisma";
import { publishToUser } from "@/lib/notifications/publisher";
import { serializeNotification, type NotificationEventPayload } from "@/lib/notifications/types";

type PreferenceKey = "new_lead_enabled" | "lead_assigned_enabled" | "webhook_error_enabled";

type CreateNotificationArgs = {
  companyId: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  entityType: NotificationEntityType;
  entityId?: string | null;
  priority?: NotificationPriority;
};

type ListNotificationsArgs = {
  companyId: string;
  userId: string;
  limit?: number;
};

async function ensurePreference(userId: string, tx: Prisma.TransactionClient | typeof prisma = prisma) {
  return tx.notificationPreference.upsert({
    where: { user_id: userId },
    update: {},
    create: { user_id: userId },
  });
}

function getPreferenceKey(type: NotificationType): PreferenceKey {
  switch (type) {
    case NotificationType.LEAD_CREATED:
      return "new_lead_enabled";
    case NotificationType.LEAD_ASSIGNED:
      return "lead_assigned_enabled";
    case NotificationType.WEBHOOK_ERROR:
      return "webhook_error_enabled";
  }
}

async function canReceiveNotification(
  userId: string,
  type: NotificationType,
  tx: Prisma.TransactionClient | typeof prisma = prisma
) {
  const preference = await ensurePreference(userId, tx);
  return preference.in_app_enabled && preference[getPreferenceKey(type)];
}

export async function createNotificationForUser(args: CreateNotificationArgs) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findFirst({
      where: {
        id: args.userId,
        company_id: args.companyId,
      },
      select: { id: true },
    });

    if (!user) {
      return null;
    }

    const enabled = await canReceiveNotification(args.userId, args.type, tx);
    if (!enabled) {
      return null;
    }

    const notification = await tx.notification.create({
      data: {
        company_id: args.companyId,
        user_id: args.userId,
        type: args.type,
        title: args.title,
        message: args.message,
        entity_type: args.entityType,
        entity_id: args.entityId ?? null,
        priority: args.priority ?? NotificationPriority.MEDIUM,
      },
    });

    const payload = serializeNotification(notification);
    publishToUser(args.userId, payload);

    return payload;
  });
}

export async function createNotificationsForCompanyAdmins(
  companyId: string,
  args: Omit<CreateNotificationArgs, "companyId" | "userId">
) {
  const admins = await prisma.user.findMany({
    where: {
      company_id: companyId,
      role: "admin",
    },
    select: { id: true },
  });

  const results = await Promise.all(
    admins.map((admin) =>
      createNotificationForUser({
        ...args,
        companyId,
        userId: admin.id,
      })
    )
  );

  return results.filter(Boolean) as NotificationEventPayload[];
}

export async function listNotificationsForUser({ companyId, userId, limit = 20 }: ListNotificationsArgs) {
  await ensurePreference(userId);

  const notifications = await prisma.notification.findMany({
    where: {
      company_id: companyId,
      user_id: userId,
    },
    orderBy: { created_at: "desc" },
    take: limit,
  });

  return notifications.map(serializeNotification);
}

export async function getUnreadCountForUser({ companyId, userId }: Omit<ListNotificationsArgs, "limit">) {
  await ensurePreference(userId);

  return prisma.notification.count({
    where: {
      company_id: companyId,
      user_id: userId,
      is_read: false,
    },
  });
}

export async function markNotificationRead({
  companyId,
  userId,
  notificationId,
}: {
  companyId: string;
  userId: string;
  notificationId: string;
}) {
  const result = await prisma.notification.updateMany({
    where: {
      id: notificationId,
      company_id: companyId,
      user_id: userId,
      is_read: false,
    },
    data: { is_read: true },
  });

  return result.count > 0;
}

export async function markAllNotificationsRead({
  companyId,
  userId,
}: {
  companyId: string;
  userId: string;
}) {
  const result = await prisma.notification.updateMany({
    where: {
      company_id: companyId,
      user_id: userId,
      is_read: false,
    },
    data: { is_read: true },
  });

  return result.count;
}
