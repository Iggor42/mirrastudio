type HandoffIntent = "start_project" | "memory" | "special_project" | "reference" | "process" | "contact";

interface HandoffParams {
  intent: HandoffIntent;
  reference?: string;
  category?: string;
}

export function buildNexoUrl({ intent, reference, category }: HandoffParams): string {
  const nexoUrl = import.meta.env.VITE_NEXO_URL || "";
  if (!nexoUrl) return "/contato";

  const url = new URL(nexoUrl);
  url.searchParams.set("source", "site");
  url.searchParams.set("intent", intent);
  
  if (reference) url.searchParams.set("reference", reference);
  if (category) url.searchParams.set("category", category);

  // Preserve UTMs if they exist in current window
  if (typeof window !== "undefined") {
    const currentParams = new URLSearchParams(window.location.search);
    const utms = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    utms.forEach(utm => {
      const val = currentParams.get(utm);
      if (val) url.searchParams.set(utm, val);
    });
  }

  return url.toString();
}
