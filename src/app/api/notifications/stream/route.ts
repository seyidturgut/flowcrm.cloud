import { getSession } from "@/lib/session";
import { getUnreadCountForUser, listNotificationsForUser } from "@/lib/notifications/service";
import { subscribeToUser } from "@/lib/notifications/publisher";
import type { NotificationEventPayload } from "@/lib/notifications/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function formatSseMessage(event: string, data: unknown) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function GET(request: Request) {
  const session = await getSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const notifications = await listNotificationsForUser({
    companyId: session.companyId,
    userId: session.userId,
  });

  const unreadCount = await getUnreadCountForUser({
    companyId: session.companyId,
    userId: session.userId,
  });

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const send = (event: string, payload: unknown) => {
        controller.enqueue(encoder.encode(formatSseMessage(event, payload)));
      };

      send("connected", { ok: true });
      send("snapshot", { notifications, unreadCount });

      const unsubscribe = subscribeToUser(session.userId, (payload: NotificationEventPayload) => {
        send("notification", payload);
      });

      const pingInterval = setInterval(() => {
        send("ping", { timestamp: Date.now() });
      }, 25000);

      const cleanup = () => {
        clearInterval(pingInterval);
        unsubscribe();
        try {
          controller.close();
        } catch {
          return;
        }
      };

      request.signal.addEventListener("abort", cleanup);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
