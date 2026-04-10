"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCompanyAction(name: string) {
  if (!name) return { error: "Company name is required" };

  try {
    const company = await prisma.company.create({
      data: {
        name,
      },
    });

    revalidatePath("/admin/companies");
    return { success: true, company };
  } catch (error) {
    console.error("Failed to create company:", error);
    return { error: "Failed to create company" };
  }
}
