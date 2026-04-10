"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { PayloadDialog } from "./payload-dialog";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface LogTableProps {
  logs: any[];
}

export function LogTable({ logs }: LogTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processed":
        return (
          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20 gap-1.5 flex w-fit">
            <CheckCircle2 className="h-3 w-3" />
            Processed
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive" className="gap-1.5 flex w-fit">
            <AlertCircle className="h-3 w-3" />
            Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="gap-1.5 flex w-fit">
            <Clock className="h-3 w-3 text-muted-foreground" />
            Received
          </Badge>
        );
    }
  };

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[180px]">Date & Time</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead>Payload Preview</TableHead>
            <TableHead>Error Details</TableHead>
            <TableHead className="text-right w-[100px]">Raw Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-muted-foreground italic">
                No webhook logs found.
              </TableCell>
            </TableRow>
          ) : (
            logs.map((log) => (
              <TableRow key={log.id} className="group hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium text-xs">
                  <div className="flex flex-col">
                    <span>{format(new Date(log.createdAt), "MMM d, yyyy")}</span>
                    <span className="text-muted-foreground font-normal">{format(new Date(log.createdAt), "HH:mm:ss")}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(log.status)}</TableCell>
                <TableCell>
                  <div className="max-w-[300px] truncate text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded">
                    {JSON.stringify(log.payload)}
                  </div>
                </TableCell>
                <TableCell>
                  {log.error ? (
                    <div className="max-w-[300px] flex items-center gap-2 text-xs text-red-500 bg-red-500/5 px-2 py-1 rounded border border-red-500/10">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      <span className="truncate">{log.error}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground italic text-xs">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <PayloadDialog payload={log.payload} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
