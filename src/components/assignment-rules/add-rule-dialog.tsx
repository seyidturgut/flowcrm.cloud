"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { createAssignmentRule } from "@/actions/assignment-rules";

interface AddRuleDialogProps {
  salesReps: { id: string; name: string | null; email: string }[];
}

export function AddRuleDialog({ salesReps }: AddRuleDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: "",
    field: "source",
    operator: "equals",
    value: "",
    salesRepId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.value || !formData.salesRepId) return;

    startTransition(async () => {
      await createAssignmentRule(formData);
      setOpen(false);
      setFormData({
        name: "",
        field: "source",
        operator: "equals",
        value: "",
        salesRepId: "",
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="gap-2" />}>
        <PlusCircle className="h-4 w-4" />
        Add Rule
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Assignment Rule</DialogTitle>
            <DialogDescription>
              Define criteria to automatically assign new leads to a sales representative.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Rule Name</Label>
              <Input
                id="name"
                placeholder="e.g., Facebook Leads to John"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="field">Match Field</Label>
                <Select
                  value={formData.field}
                  onValueChange={(v) => v && setFormData({ ...formData, field: v })}
                >
                  <SelectTrigger id="field">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="source">Source</SelectItem>
                    <SelectItem value="email">Email Domain</SelectItem>
                    <SelectItem value="utm_source">UTM Source</SelectItem>
                    <SelectItem value="utm_campaign">UTM Campaign</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="operator">Operator</Label>
                <Select
                  value={formData.operator}
                  onValueChange={(v) => v && setFormData({ ...formData, operator: v })}
                >
                  <SelectTrigger id="operator">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equals">Equals</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="startsWith">Starts With</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                placeholder="e.g., facebook"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="rep">Assign To</Label>
              <Select
                value={formData.salesRepId}
                onValueChange={(v) => v && setFormData({ ...formData, salesRepId: v })}
                required
              >
                <SelectTrigger id="rep">
                  <SelectValue placeholder="Select sales rep...">
                    {formData.salesRepId ? (salesReps.find((r) => r.id === formData.salesRepId)?.name || salesReps.find((r) => r.id === formData.salesRepId)?.email) : "Select sales rep..."}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {salesReps.map((rep) => (
                    <SelectItem key={rep.id} value={rep.id}>
                      {rep.name || rep.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Rule"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
