"use server";

import prisma from "@/lib/prisma";
import { getTenantId } from "@/lib/tenant";
import { revalidatePath } from "next/cache";

export async function createSalesRep(name: string, email: string, password: string) {
  const company_id = await getTenantId();

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Bu e-posta adresi zaten kullanımda.");
    }

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password,
          role: "sales_rep",
          company_id,
        },
      });

      await tx.salesRep.create({
        data: {
          userId: user.id,
          company_id,
          isActive: true,
        },
      });
    });

    revalidatePath("/dashboard/sales-reps");
    return { success: true };
  } catch (error: any) {
    console.error("Sales Rep Create Error:", error);
    throw error;
  }
}

export async function toggleRepStatus(repId: string, isActive: boolean) {
  const company_id = await getTenantId();

  await prisma.salesRep.update({
    where: { id: repId, company_id },
    data: { isActive },
  });

  revalidatePath("/dashboard/sales-reps");
}

export async function updateRepSpecialties(repId: string, specialties: string) {
  const company_id = await getTenantId();

  await prisma.salesRep.update({
    where: { id: repId, company_id },
    data: { specialties },
  });

  revalidatePath("/dashboard/sales-reps");
}
