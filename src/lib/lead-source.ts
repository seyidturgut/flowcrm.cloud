const SOURCE_KEYS = [
  "sourceTitle",
  "source_title",
  "sourceName",
  "source_name",
  "kaynak",
  "kaynakAdi",
  "kaynak_adi",
  "source",
  "utm_source",
] as const;

const SOURCE_URL_KEYS = [
  "url",
  "pageUrl",
  "page_url",
  "landingUrl",
  "landing_url",
  "sourceUrl",
  "source_url",
  "referrer",
  "website",
  "site",
] as const;

function getFirstNonEmptyValue(payload: Record<string, unknown>, keys: readonly string[]) {
  for (const key of keys) {
    const value = payload[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

export function normalizeLeadSource(payload: Record<string, unknown>) {
  return getFirstNonEmptyValue(payload, SOURCE_KEYS);
}

export function normalizeLeadSourceUrl(payload: Record<string, unknown>) {
  const candidate = getFirstNonEmptyValue(payload, SOURCE_URL_KEYS);

  if (!candidate) {
    return null;
  }

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    return null;
  }

  return null;
}

export function getLeadSourceLabel(lead: { source?: string | null; utm_source?: string | null }) {
  return lead.source || lead.utm_source || "Bilinmiyor";
}
