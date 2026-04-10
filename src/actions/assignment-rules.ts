"use server";

import prisma from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";
import { revalidatePath } from "next/cache";

export async function createAssignmentRule(data: {
  name: string;
  field: string;
  operator: string;
  value: string;
  salesRepId: string;
}) {
  const company_id = await getTenantId();

  await prisma.assignmentRule.create({
    data: {
      name: data.name,
      criteria: {
        field: data.field,
        operator: data.operator,
        value: data.value,
      },
      sales_rep_id: data.salesRepId,
      company_id,
      isActive: true,
    },
  });

  revalidatePath("/dashboard/assignment-rules");
}

export async function toggleRuleStatus(ruleId: string, isActive: boolean) {
  const company_id = await getTenantId();

  await prisma.assignmentRule.update({
    where: { id: ruleId, company_id },
    data: { isActive },
  });

  revalidatePath("/dashboard/assignment-rules");
}

export async function deleteAssignmentRule(ruleId: string) {
  const company_id = await getTenantId();

  await prisma.assignmentRule.delete({
    where: { id: ruleId, company_id },
  });

  revalidatePath("/dashboard/assignment-rules");
}
