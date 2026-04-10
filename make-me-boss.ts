import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const email = process.argv[2];

async function main() {
  if (!email) {
    console.error("❌ Hata: Lütfen bir e-posta adresi girin!");
    console.log("Kullanım: npx tsx make-me-boss.ts kullanici@mail.com");
    process.exit(1);
  }

  console.log(`🔍 '${email}' kullanıcısı için patron yetkileri aranıyor...`);

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error("❌ Hata: Bu e-posta adresine sahip bir kullanıcı bulunamadı!");
      process.exit(1);
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        isGlobalAdmin: true,
        role: "admin", // Her ihtimale karşı admin rolünü de verelim
      },
    });

    console.log("✅ BAŞARILI!");
    console.log("-----------------------------------------");
    console.log(`İsim: ${updatedUser.name}`);
    console.log(`E-posta: ${updatedUser.email}`);
    console.log(`Yetki: GLOBAL ADMIN (SaaS Boss) 👑`);
    console.log("-----------------------------------------");
    console.log("Artık /admin paneline tam erişiminiz var.");

  } catch (error) {
    console.error("❌ Bir hata oluştu:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
