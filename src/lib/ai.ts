import { Lead, Contact } from "@prisma/client";

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434/api/generate";
const AI_MODEL = process.env.AI_MODEL || "gemma4:e2b";
const AI_PROVIDER = process.env.AI_PROVIDER || "ollama"; // choices: ollama, groq, openai
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export interface AIAnalysisResult {
  score: number;
  label: "Hot" | "Warm" | "Cold";
  reasoning: string;
  tags: string[];
}

/**
 * Common call to AI Providers
 */
async function callAi(prompt: string, formatJson: boolean = true): Promise<any> {
  if (AI_PROVIDER === "groq" && GROQ_API_KEY) {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // Super fast and smart
        messages: [{ role: "user", content: prompt }],
        response_format: formatJson ? { type: "json_object" } : undefined,
      }),
    });
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  }

  if (AI_PROVIDER === "openai" && OPENAI_API_KEY) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: formatJson ? { type: "json_object" } : undefined,
      }),
    });
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  }

  // Fallback to Ollama (Local)
  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: AI_MODEL,
      prompt: prompt,
      stream: false,
      format: formatJson ? "json" : undefined
    }),
  });
  const data = await response.json();
  return JSON.parse(data.response);
}

/**
 * Analyzes a lead's quality
 */
export async function analyzeLeadQuality(lead: Lead & { contact: Contact }): Promise<AIAnalysisResult | null> {
  try {
    const prompt = `
      Sen profesyonel bir Satış ve İş Geliştirme Uzmanısın. Gelen müşteri adayını "Satış Potansiyeli" açısından analiz et.
      
      Müşteri Verileri:
      - Ad Soyad: ${lead.contact.firstName} ${lead.contact.lastName}
      - Mesaj/Not: "${(lead as any).message || "Mesaj yok"}"
      - Email: ${lead.contact.email || "Yok"} - Telefon: ${lead.contact.phone || "Yok"}
      - Trafik Kaynağı / UTM: ${lead.source || "Bilinmiyor"} (Source: ${lead.utm_source || "-"}, Medium: ${lead.utm_medium || "-"}, Campaign: ${lead.utm_campaign || "-"}, Term: ${lead.utm_term || "-"}, Content: ${lead.utm_content || "-"})
      
      Yanıt Formatı (ZORUNLU JSON):
      {
        "score": number (0-100), 
        "label": "Hot" | "Warm" | "Cold",
        "reasoning": "Türkçe profesyonel açıklama",
        "tags": ["Niyet", "Özellik", "Öncelik"]
      }
    `;

    return await callAi(prompt);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return null;
  }
}

/**
 * Extracts structured lead data from any raw JSON payload
 */
export async function extractLeadDataFromPayload(payload: any): Promise<{
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
} | null> {
  try {
    const prompt = `
      Aşağıdaki ham veriden müşteri bilgilerini ve tüm dijital pazarlama/UTM parametrelerini ayıkla:
      ${JSON.stringify(payload)}
      
      Yanıt Formatı (ZORUNLU JSON):
      {
        "firstName": "string", "lastName": "string", "email": "string|null", "phone": "string|null", "message": "string|null",
        "utm_source": "string|null", "utm_medium": "string|null", "utm_campaign": "string|null", "utm_term": "string|null", "utm_content": "string|null"
      }
    `;

    return await callAi(prompt);
  } catch (error) {
    console.error("AI Extraction failed:", error);
    return null;
  }
}

/**
 * Matches a lead to the most suitable Sales Representative
 */
export async function matchLeadToSalesRep(
  leadInfo: { firstName: string; message?: string },
  reps: { id: string; name: string; specialties?: string | null }[]
): Promise<string | null> {
  if (reps.length === 0) return null;
  if (reps.length === 1) return reps[0].id;

  try {
    const prompt = `
      Müşteri Talebi: "${leadInfo.message || "Bilgi almak istiyor"}"
      
      Temsilciler:
      ${reps.map(r => `- ID: ${r.id}, İsim: ${r.name}, Uzmanlık: ${r.specialties || "Genel"}`).join("\n")}
      
      Bu lead'i en uygun temsilciye ata.
      
      Yanıt Formatı (ZORUNLU JSON):
      { "bestMatchRepId": "string", "reason": "string" }
    `;

    const result = await callAi(prompt);
    return result.bestMatchRepId || reps[0].id;
  } catch (error) {
    console.error("AI Matchmaking failed:", error);
    return reps[0].id;
  }
}

