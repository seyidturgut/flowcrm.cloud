import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

/**
 * Retrieves the current companyId from the session.
 * Throws an error or redirects if the session is invalid or missing companyId.
 * This ensures that data fetching is always gated by a valid tenant context.
 */
export async function getTenantId() {
  const session = await getSession();

  if (!session || !session.companyId) {
    // In a real app, this might throw a specific AuthError 
    // or redirect to login if called from a page.
    redirect("/login");
  }

  return session.companyId;
}
