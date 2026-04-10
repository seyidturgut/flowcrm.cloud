import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // ONLY Global Admin (SaaS Owner) can access this area
  const isBoss = session?.isGlobalAdmin || session?.email === "seyitturgut@gmail.com";
  
  if (!session || !isBoss) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="pt-2">{children}</main>
    </div>
  );
}
