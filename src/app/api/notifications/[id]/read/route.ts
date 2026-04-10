import { NextResponse } from "next/server";

import { markNotificationRead } from "@/lib/notifications/service";
import { getSession } from "@/lib/session";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const success = await markNotificationRead({
    companyId: session.companyId,
    userId: session.userId,
    notificationId: id,
  });

  if (!success) {
    return NextResponse.json({ error: "Notification not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
