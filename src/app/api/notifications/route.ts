import { NextResponse } from "next/server";

import { listNotificationsForUser } from "@/lib/notifications/service";
import { getSession } from "@/lib/session";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notifications = await listNotificationsForUser({
    companyId: session.companyId,
    userId: session.userId,
  });

  return NextResponse.json({ notifications });
}
