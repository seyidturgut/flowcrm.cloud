import { PrismaClient } from '@prisma/client';

const DATABASE_URL = "mysql://flowcrm_flodbUsr:t%3Fhi-SIm~_Q%5E@160.153.246.164:3306/flowcrm_flowDB";

async function testConnection() {
  console.log("Bağlantı denetleniyor: ", "160.153.246.164");
  
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    await prisma.$connect();
    console.log("✅ BAŞARILI: Veritabanına başarıyla bağlanıldı!");
    const tables = await prisma.$queryRaw`SHOW TABLES`;
    console.log("Tablolar:", tables);
  } catch (error: any) {
    console.error("❌ HATA: Bağlantı kurulamadı!");
    console.error("Hata Detayı:", error.message);
    
    if (error.message.includes("timed out")) {
      console.log("\nÖNERİ: Sunucu yanıt vermiyor. Lütfen cPanel'de 3306 portunun dışarıya açık olduğundan ve Firewall'un engellemediğinden emin olun.");
    } else if (error.message.includes("Access denied")) {
      console.log("\nÖNERİ: Kullanıcı adı veya şifre yanlış, ya da bu kullanıcının dışarıdan (Remote) erişim yetkisi yok.");
    }
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
