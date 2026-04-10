import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST || "mail.flowcrm.cloud";
const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
const smtpUser = process.env.SMTP_USER || "no-reply@flowcrm.cloud";
const smtpPass = process.env.SMTP_PASS || "";
const bossEmail = process.env.BOSS_EMAIL || "seyitturgut@gmail.com";

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465, // true for 465, false for other ports
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
  tls: {
    rejectUnauthorized: false // Development amaçlı Cpanel sunucular için SSL hatalarını dondurabilir, production'da true yapılabilir
  }
});

/**
 * Genel e-posta gönderme fonksiyonu.
 */
export async function sendEmail(to: string, subject: string, html: string) {
  if (!smtpPass) {
    console.warn("SMTP_PASS bulunamadı, e-posta gönderimi atlanıyor.");
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: `"FlowCRM" <${smtpUser}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
}

/**
 * Kritik teknik hatalarda Boss'u uyarır (Örn: Veritabanı crash, dış API kesintisi).
 */
export async function notifyBossOnError(context: string, errorDetails: string) {
  const subject = `⚠️ DİKKAT: FlowCRM Sistem Arızası [${context}]`;
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #fce4e4; padding: 20px; border-radius: 8px border: 1px solid #fccacb;">
      <h2 style="color: #d11a2a; margin-top: 0;">Sistem Alarmı!</h2>
      <p>Sistemde kritik bir hata tespit edildi. İşte detaylar:</p>
      <ul>
        <li><strong>Durum (Context):</strong> ${context}</li>
        <li><strong>Zaman:</strong> ${new Date().toLocaleString()}</li>
      </ul>
      <div style="background: #111; color: #0f0; padding: 15px; border-radius: 5px; font-family: monospace; overflow-x: auto;">
        ${errorDetails}
      </div>
      <p style="font-size: 12px; color: #666; margin-top: 20px;">* Bu e-posta FlowCRM otomatik hata izleme servisi tarafından gönderilmiştir.</p>
    </div>
  `;

  return sendEmail(bossEmail, subject, html);
}
