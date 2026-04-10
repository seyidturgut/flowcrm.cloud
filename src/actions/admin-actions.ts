"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { Plan } from "@prisma/client";
import { sendEmail, notifyBossOnError } from "@/lib/mail";

// Global Admin yetkisi kontrolü için yardımcı fonksiyon
async function requireGlobalAdmin() {
  const session = await getSession();
  const isBoss = session?.isGlobalAdmin || session?.email === "seyitturgut@gmail.com";
  
  if (!session || !isBoss) {
    throw new Error("Bu işlemi yapmak için yetkiniz yok.");
  }
}

export async function createCompanyByAdmin(formData: FormData) {
  await requireGlobalAdmin();

  const companyName = formData.get("companyName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const plan = (formData.get("plan") as string)?.toUpperCase() as Plan || "STARTER";

  if (!companyName || !email || !password) {
    throw new Error("Lütfen tüm alanları doldurun.");
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Bu e-posta adresi sistemde zaten kayıtlı.");
    }

    await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: companyName,
          plan: plan,
          isActive: true
        }
      });

      await tx.user.create({
        data: {
          email,
          password,
          name: companyName + " Admin",
          role: "admin",
          company_id: company.id,
        }
      });
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function toggleCompanyStatus(companyId: string, isActive: boolean) {
  await requireGlobalAdmin();

  try {
    const company = await prisma.company.update({
      where: { id: companyId },
      data: { isActive },
      include: {
        users: {
          where: { role: "admin" },
          take: 1
        }
      }
    });

    // Müşteri admin'ine durum bilgilendirmesi e-postası
    const adminEmail = company.users[0]?.email;
    if (adminEmail) {
      if (isActive) {
        sendEmail(
          adminEmail, 
          "✅ Hesabınız Yeniden Aktif Edildi", 
          `Merhaba, <br/><br/> <strong>${company.name}</strong> şirket hesabı sistem yöneticisi tarafından yeniden aktif edilmiştir. Artık sisteme giriş yapabilirsiniz.`
        ).catch(e => console.error("Mail error:", e));
      } else {
        sendEmail(
          adminEmail, 
          "🛑 Hesabınız Askıya Alındı", 
          `Merhaba, <br/><br/> <strong>${company.name}</strong> şirket hesabı sistem yöneticisi kararıyla askıya alınmıştır. Detaylı bilgi için lütfen teknik destek / müşteri yetkiliniz ile iletişime geçin.`
        ).catch(e => console.error("Mail error:", e));
      }
    }
    
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Toggle company status error:", error);
    notifyBossOnError("Şirket Durum Değiştirme (Dondur/Aç) Hatası", error.message || String(error)).catch(console.error);
    return { error: "İşlem sırasında sunucu hatası oluştu. Sistem yöneticisine bilgi verildi." };
  }
}

export async function deleteCompany(companyId: string) {
  await requireGlobalAdmin();

  try {
    // Note: Due to onDelete: Cascade setup in the schema, 
    // deleting the company will cascade delete users, reps, leads, etc.
    await prisma.company.delete({
      where: { id: companyId },
    });
    
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Delete company error:", error);
    await notifyBossOnError("Kritik Hata: Şirket Silme İşlemi Başarısız", error.message || String(error));
    return { error: "Şirket silinemedi. Lütfen veritabanı bağlantılarını kontrol edin. Sistem yöneticisine rapor gönderildi." };
  }
}
