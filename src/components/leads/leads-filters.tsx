"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransition } from "react";

interface LeadsFiltersProps {
  salesReps: { id: string; user: { name: string | null; email: string } }[];
}

export function LeadsFilters({ salesReps }: LeadsFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Her filtre değişiminde ilk sayfaya dön
    if (key !== "page") {
      params.delete("page");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center py-4">
      <div className="flex-1">
        <Input
          placeholder="Search leads..."
          defaultValue={searchParams.get("search") || ""}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select
          defaultValue={searchParams.get("status") || "all"}
          onValueChange={(v) => v && handleFilterChange("status", v)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="NEW">New</SelectItem>
            <SelectItem value="CONTACTED">Contacted</SelectItem>
            <SelectItem value="QUALIFIED">Qualified</SelectItem>
            <SelectItem value="PROPOSAL">Proposal</SelectItem>
            <SelectItem value="WON">Won</SelectItem>
            <SelectItem value="LOST">Lost</SelectItem>
          </SelectContent>
        </Select>

        <Select
          defaultValue={searchParams.get("rep") || "all"}
          onValueChange={(v) => v && handleFilterChange("rep", v)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="SalesRep">
              {searchParams.get("rep") && searchParams.get("rep") !== "all" 
                ? (salesReps.find((r) => r.id === searchParams.get("rep"))?.user.name || salesReps.find((r) => r.id === searchParams.get("rep"))?.user.email) 
                : "All Reps"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reps</SelectItem>
            {salesReps.map((rep) => (
              <SelectItem key={rep.id} value={rep.id}>
                {rep.user.name || rep.user.email}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
