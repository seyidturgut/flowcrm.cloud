import { getSalesRepsWithUsers, getAvailableUsers } from "@/lib/data/sales-reps";
import { getTenantId } from "@/lib/tenant";
import { RepList } from "@/components/sales-reps/rep-list";
import { AddRepDialog } from "@/components/sales-reps/add-rep-dialog";
import { Users } from "lucide-react";

export default async function SalesRepsPage() {
  const company_id = await getTenantId();

  const [reps, availableUsers] = await Promise.all([
    getSalesRepsWithUsers(company_id),
    getAvailableUsers(company_id),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Satış Temsilcileri</h1>
            <p className="text-sm text-muted-foreground">
              Ekibinizi yönetin ve lead atama uzmanlıklarını belirleyin.
            </p>
          </div>
        </div>
        <AddRepDialog availableUsers={availableUsers} />
      </div>

      <div className="grid gap-6">
        <RepList reps={reps} />
      </div>
    </div>
  );
}
