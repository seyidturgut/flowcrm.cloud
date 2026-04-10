import { NextResponse } from "next/server";

import { markAllNotificationsRead } from "@/lib/notifications/service";
import { getSession } from "@/lib/session";

export async function POST() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updatedCount = await markAllNotificationsRead({
    companyId: session.companyId,
    userId: session.userId,
  });

  return NextResponse.json({ success: true, updatedCount });
}
