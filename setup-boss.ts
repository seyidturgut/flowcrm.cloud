import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createBoss() {
  const email = "seyitturgut@gmail.com";
  const password = "Beyincik**94";
  const companyName = "FlowCRM.cloud Genel Merkez";

  console.log("🚀 Boss kurulumu başlatılıyor...");

  try {
    // 1. Create or Get the HQ Company
    let hqCompany = await prisma.company.findFirst({
      where: { name: companyName }
    });

    if (!hqCompany) {
      hqCompany = await prisma.company.create({
        data: {
          name: companyName,
          plan: "ENTERPRISE"
        }
      });
      console.log("🏢 Genel Merkez şirketi oluşturuldu.");
    }

    // 2. Create or Update the Boss User
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      await prisma.user.update({
        where: { email },
        data: {
          password: password,
          isGlobalAdmin: true,
          role: "admin",
          company_id: hqCompany.id
        }
      });
      console.log("✅ Mevcut kullanıcı Boss yetkileriyle güncellendi.");
    } else {
      await prisma.user.create({
        data: {
          email,
          password,
          name: "Seyit Turgut",
          role: "admin",
          isGlobalAdmin: true,
          company_id: hqCompany.id
        }
      });
      console.log("👤 Yeni Boss kullanıcısı başarıyla oluşturuldu.");
    }

    console.log("-----------------------------------------");
    console.log("PATRON SİSTEME TANIMLANDI!");
    console.log(`Giriş: ${email}`);
    console.log(`Yetki: GLOBAL ADMIN 👑`);
    console.log("-----------------------------------------");

  } catch (error) {
    console.error("❌ Hata oluştu:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createBoss();
