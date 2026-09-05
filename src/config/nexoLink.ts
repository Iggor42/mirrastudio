export interface NexoCampaign {
  slug: string;
  headline: string;
  subheadline: string;
  ctaText: string;
}

export const NEXO_CAMPAIGNS: Record<string, NexoCampaign> = {
  default: {
    slug: "default",
    headline: "Ideias ganham forma.",
    subheadline: "Conte a sua em 1 minuto.",
    ctaText: "Iniciar no WhatsApp ↗"
  },
  instagram: {
    slug: "instagram",
    headline: "Da ideia à peça.",
    subheadline: "O ateliê responde no WhatsApp.",
    ctaText: "Iniciar no WhatsApp ↗"
  },
  "reels-materia": {
    slug: "reels-materia",
    headline: "Matéria que conta história.",
    subheadline: "Comece pela sua.",
    ctaText: "Contar minha ideia ↗"
  },
  "reels-processo": {
    slug: "reels-processo",
    headline: "Do conceito ao acabamento.",
    subheadline: "Conte sua ideia.",
    ctaText: "Falar com o ateliê ↗"
  },
  "anuncio-tampo": {
    slug: "anuncio-tampo",
    headline: "Um rio na sua mesa.",
    subheadline: "Projeto sob medida, do conceito ao acabamento.",
    ctaText: "Planejar meu tampo ↗"
  }
};

export const NEXO_VERTICALS = [
  "Memórias",
  "Casa & Design",
  "Mobiliário",
  "Marcas & Empresas",
  "Projetos Especiais",
  "Ainda não sei"
] as const;

export type NexoVertical = (typeof NEXO_VERTICALS)[number];

export const NEXO_PRAZOS = [
  "Quero logo",
  "Em 30–60 dias",
  "Estou planejando",
  "Sem prazo"
] as const;

export type NexoPrazo = (typeof NEXO_PRAZOS)[number];

export interface NexoVisit {
  id: string;
  slug: string;
  timestamp: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  referrer: string;
}

export interface NexoLead {
  id: string;
  slug: string;
  timestamp: string;
  nome: string;
  vertical: string;
  referencia?: string;
  prazo: string;
  utms: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
  };
  openedWhatsApp: boolean;
}

export interface NexoClick {
  id: string;
  slug: string;
  timestamp: string;
}
