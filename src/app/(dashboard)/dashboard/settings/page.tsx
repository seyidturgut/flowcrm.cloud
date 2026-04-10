import { getTenantId } from "@/lib/tenant";
import { headers } from "next/headers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Webhook, 
  Copy, 
  Code2, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default async function SettingsPage() {
  const companyId = await getTenantId();
  const headersList = await headers();
  const forwardedHost = headersList.get("x-forwarded-host");
  const host = forwardedHost ?? headersList.get("host");
  const forwardedProto = headersList.get("x-forwarded-proto");
  const protocol = forwardedProto ?? (host?.includes("localhost") ? "http" : "https");
  const baseUrl = host
    ? `${protocol}://${host}`
    : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const webhookUrl = `${baseUrl}/api/webhook/${companyId}`;

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground italic">Manage your company profile and external integrations.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Webhook Integration Card */}
        <Card className="md:col-span-2 border-primary/20 shadow-sm relative overflow-hidden bg-gradient-to-br from-background to-primary/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Webhook className="h-24 w-24" />
          </div>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Webhook className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Webhook Integration</CardTitle>
            </div>
            <CardDescription>
              Connect your website or external tools to automatically capture leads.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground italic">Your Webhook URL</label>
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border font-mono text-sm group relative">
                <span className="truncate flex-1 text-primary/80">{webhookUrl}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                <ShieldCheck className="inline h-3 w-3 mr-1 text-green-500" />
                This URL is specific to your company. Do not share it publicly.
              </p>
            </div>

            <div className="pt-4 border-t border-primary/10">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-4 w-4 text-primary" />
                <h3 className="font-bold text-sm">Example JSON Payload</h3>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800 shadow-inner">
                <pre>{`{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+905551234567",
  "source": "Website Contact Form",
  "message": "I am interested in your services."
}`}</pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links / Guide */}
        <div className="space-y-6">
          <Card className="border-none bg-primary text-primary-foreground shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Integration Guide</CardTitle>
              <CardDescription className="text-primary-foreground/70">
                Learn how to connect your first source in 5 minutes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full justify-between gap-2 shadow-sm">
                Read Documentation
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">Developer Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-xs h-9 gap-3 hover:bg-primary/5">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                API Health: Good
              </Button>
              <Button variant="ghost" className="w-full justify-start text-xs h-9 gap-3 hover:bg-primary/5">
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                Rotation Key
              </Button>
              <Button variant="ghost" className="w-full justify-start text-xs h-9 gap-3 hover:bg-primary/5">
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
                IP Whitelist
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
