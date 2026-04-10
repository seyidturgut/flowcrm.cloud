"use server";

import { verifyUser } from "@/lib/auth";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { Plan } from "@prisma/client";

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "E-posta ve şifre gereklidir." };
  }

  const user = await verifyUser(email, password);

  if (!user) {
    return { error: "Geçersiz e-posta veya şifre." };
  }

  if ("error" in user) {
    return { error: user.error };
  }

  await createSession({
    userId: user.id as string,
    email: user.email as string,
    role: user.role as "admin" | "sales_rep",
    isGlobalAdmin: user.isGlobalAdmin as boolean,
    companyId: user.companyId as string,
  });

  redirect("/dashboard");
}

export async function registerCompany(prevState: any, formData: FormData) {
  const companyName = formData.get("companyName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const plan = (formData.get("plan") as string)?.toUpperCase() || "STARTER";

  if (!companyName || !email || !password) {
    return { error: "Tüm alanlar zorunludur." };
  }

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "Bu e-posta adresi zaten kullanımda." };
    }

    // Create Company and Admin User in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: companyName,
          plan: plan as Plan,
        }
      });

      const user = await tx.user.create({
        data: {
          email,
          password, // Plain text for now as per project style
          name: companyName + " Admin",
          role: "admin",
          company_id: company.id,
        }
      });

      return { user, company };
    });

    await createSession({
      userId: result.user.id,
      email: result.user.email,
      role: "admin",
      isGlobalAdmin: false,
      companyId: result.company.id,
    });

    redirect("/dashboard");
  } catch (error: any) {
    console.error("Register Error:", error);
    return { error: "Kayıt sırasında bir hata oluştu: " + error.message };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
