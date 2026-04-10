"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Eye } from "lucide-react";
import { useState } from "react";

interface PayloadDialogProps {
  payload: any;
}

export function PayloadDialog({ payload }: PayloadDialogProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" size="icon" />}>
        <Eye className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between pr-8">
            <div>
              <DialogTitle>Raw Webhook Payload</DialogTitle>
              <DialogDescription>
                The original data received from the webhook provider.
              </DialogDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 shrink-0"
              onClick={copyToClipboard}
            >
              <Copy className="h-3.5 w-3.5" />
              {copied ? "Copied!" : "Copy JSON"}
            </Button>
          </div>
        </DialogHeader>
        <div className="mt-4 flex-1 overflow-auto bg-muted/50 rounded-lg border p-4 font-mono text-xs">
          <pre className="whitespace-pre-wrap break-all leading-relaxed">
            {JSON.stringify(payload, null, 2)}
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}
