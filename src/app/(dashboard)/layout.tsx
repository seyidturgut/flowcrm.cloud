import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { RealtimeNotificationsProvider } from "@/components/notifications/realtime-notifications-provider"
import { getTenantId } from "@/lib/tenant"
import { getCompanyById } from "@/lib/auth"
import { getSession } from "@/lib/session"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const companyId = await getTenantId();
  const company = await getCompanyById(companyId);
  const companyName = company?.name || "CRM Admin";

  const session = await getSession();
  const userRole = session?.role || "sales_rep";
  const isGlobalAdmin = session?.isGlobalAdmin || false;
  const userEmail = session?.email || "";
  const headerUser = session
    ? { ...session, isGlobalAdmin, email: userEmail }
    : null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar 
        companyName={companyName} 
        userRole={userRole} 
        isGlobalAdmin={isGlobalAdmin}
        userEmail={userEmail}
      />
      <RealtimeNotificationsProvider>
        <div className="flex flex-col sm:pl-64">
          <Header user={headerUser} />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {children}
          </main>
        </div>
      </RealtimeNotificationsProvider>
    </div>
  )
}
