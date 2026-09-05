import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { MirraWordmark } from "@/components/brand/MirraWordmark";
import { mirra } from "@/config/mirra";
import {
  NEXO_CAMPAIGNS,
  NEXO_VERTICALS,
  NEXO_PRAZOS,
  NexoCampaign,
  NexoVisit,
  NexoLead,
  NexoClick
} from "@/config/nexoLink";

export function NexoLink() {
  const { campanha } = useParams<{ campanha?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Slug resolution: unknown slug falls back to default
  const campaignKey = campanha && NEXO_CAMPAIGNS[campanha] ? campanha : "default";
  const campaign: NexoCampaign = NEXO_CAMPAIGNS[campaignKey];

  // UTMs
  const utmSource = searchParams.get("utm_source") || "";
  const utmMedium = searchParams.get("utm_medium") || "";
  const utmCampaign = searchParams.get("utm_campaign") || "";
  const utmContent = searchParams.get("utm_content") || "";

  // Briefing Form State
  const [nome, setNome] = useState("");
  const [vertical, setVertical] = useState<string>(NEXO_VERTICALS[0]);
  const [referencia, setReferencia] = useState("");
  const [prazo, setPrazo] = useState<string>(NEXO_PRAZOS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [waLinkGenerated, setWaLinkGenerated] = useState("");

  const recordedVisitRef = useRef(false);

  // WhatsApp verification
  const rawWhatsapp = mirra.contact.whatsapp?.trim() || "";
  const isPlaceholderNumber = !rawWhatsapp || rawWhatsapp === "553800000000";

  // Record visit in localStorage (nexo_visits) on mount
  useEffect(() => {
    if (recordedVisitRef.current) return;
    recordedVisitRef.current = true;

    try {
      const visit: NexoVisit = {
        id: `v_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        slug: campaignKey,
        timestamp: new Date().toISOString(),
        utm_source: utmSource || undefined,
        utm_medium: utmMedium || undefined,
        utm_campaign: utmCampaign || undefined,
        utm_content: utmContent || undefined,
        referrer: typeof document !== "undefined" ? document.referrer || "direto" : "direto"
      };

      const existingVisits: NexoVisit[] = JSON.parse(
        localStorage.getItem("nexo_visits") || "[]"
      );
      existingVisits.push(visit);
      localStorage.setItem("nexo_visits", JSON.stringify(existingVisits));
    } catch {
      // Ignore localStorage limitations
    }
  }, [campaignKey, utmSource, utmMedium, utmCampaign, utmContent]);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;

    // Build message
    const utmLines: string[] = [];
    if (utmSource) utmLines.push(`source=${utmSource}`);
    if (utmMedium) utmLines.push(`medium=${utmMedium}`);
    if (utmCampaign) utmLines.push(`campaign=${utmCampaign}`);
    if (utmContent) utmLines.push(`content=${utmContent}`);

    const messageText = [
      `Olá, ateliê MIRRA!`,
      `Vim pelo Nexo Link (${campaign.headline}).`,
      ``,
      `*Briefing inicial:*`,
      `• Nome: ${nome.trim()}`,
      `• O quê: ${vertical}`,
      referencia.trim() ? `• Referência: ${referencia.trim()}` : null,
      `• Prazo: ${prazo}`,
      `• Campanha: ${campaignKey}`,
      utmLines.length > 0 ? `• UTMs: ${utmLines.join(" | ")}` : null
    ]
      .filter((line) => line !== null)
      .join("\n");

    const numberToUse = rawWhatsapp || "553800000000";
    const waUrl = `https://wa.me/${numberToUse}?text=${encodeURIComponent(messageText)}`;
    setWaLinkGenerated(waUrl);

    // Save lead in localStorage (nexo_leads)
    try {
      const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const lead: NexoLead = {
        id: leadId,
        slug: campaignKey,
        timestamp: new Date().toISOString(),
        nome: nome.trim(),
        vertical,
        referencia: referencia.trim() || undefined,
        prazo,
        utms: {
          source: utmSource || undefined,
          medium: utmMedium || undefined,
          campaign: utmCampaign || undefined,
          content: utmContent || undefined
        },
        openedWhatsApp: true
      };

      const existingLeads: NexoLead[] = JSON.parse(
        localStorage.getItem("nexo_leads") || "[]"
      );
      existingLeads.push(lead);
      localStorage.setItem("nexo_leads", JSON.stringify(existingLeads));

      // Record WhatsApp click
      const click: NexoClick = {
        id: `c_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        slug: campaignKey,
        timestamp: new Date().toISOString()
      };
      const existingClicks: NexoClick[] = JSON.parse(
        localStorage.getItem("nexo_clicks") || "[]"
      );
      existingClicks.push(click);
      localStorage.setItem("nexo_clicks", JSON.stringify(existingClicks));
    } catch {
      // Ignore localStorage errors
    }

    // If completely empty whatsapp, fallback directly to /contato
    if (!rawWhatsapp) {
      navigate("/contato");
      return;
    }

    // Open WhatsApp in a new tab
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-marfim text-grafite flex flex-col justify-between selection:bg-areia selection:text-grafite">
      {/* Minimal Top Header - Wordmark Only */}
      <header className="pt-8 pb-4 px-6 text-center">
        <Link
          to="/"
          aria-label="MIRRA Home"
          className="inline-block transition-opacity hover:opacity-75 focus:outline-none"
        >
          <MirraWordmark className="h-6 md:h-7 w-auto mx-auto text-grafite" />
        </Link>
      </header>

      {/* Main Conversion Flow */}
      <div className="w-full max-w-md mx-auto px-6 py-6 flex-1 flex flex-col justify-center">
        {!submitted ? (
          <div>
            {/* Promise & Subtitle */}
            <div className="mb-8 text-center">
              <span className="text-[10px] uppercase tracking-[0.25em] text-mineral font-medium block mb-2">
                Ateliê de Criação
              </span>
              <h1 className="text-3xl md:text-4xl font-editorial tracking-tight text-grafite mb-2.5 leading-tight">
                {campaign.headline}
              </h1>
              <p className="text-sm md:text-base text-grafite/70 font-light">
                {campaign.subheadline}
              </p>
            </div>

            {/* 4-Field Briefing Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Nome */}
              <div>
                <label
                  htmlFor="nexo-nome"
                  className="text-[10px] uppercase tracking-widest text-mineral block mb-1 font-medium"
                >
                  Seu nome <span className="text-ambar">*</span>
                </label>
                <input
                  id="nexo-nome"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Como podemos te chamar?"
                  className="w-full px-3.5 py-3 text-sm bg-marfim border border-areia/60 focus:border-grafite focus:ring-0 rounded-none text-grafite outline-none transition-colors"
                />
              </div>

              {/* Field 2: O quê (Verticais) */}
              <div>
                <label
                  htmlFor="nexo-vertical"
                  className="text-[10px] uppercase tracking-widest text-mineral block mb-1 font-medium"
                >
                  O que deseja desenvolver? <span className="text-ambar">*</span>
                </label>
                <select
                  id="nexo-vertical"
                  value={vertical}
                  onChange={(e) => setVertical(e.target.value)}
                  className="w-full px-3.5 py-3 text-sm bg-marfim border border-areia/60 focus:border-grafite focus:ring-0 rounded-none text-grafite outline-none transition-colors"
                >
                  {NEXO_VERTICALS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 3: Referência / Detalhes (Opcional) */}
              <div>
                <label
                  htmlFor="nexo-referencia"
                  className="text-[10px] uppercase tracking-widest text-mineral block mb-1 font-medium"
                >
                  Referência ou ideia inicial <span className="text-grafite/40 font-normal lowercase">(opcional)</span>
                </label>
                <input
                  id="nexo-referencia"
                  type="text"
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                  placeholder="Ex: tampo para mesa, objeto com flor, fotos..."
                  className="w-full px-3.5 py-3 text-sm bg-marfim border border-areia/60 focus:border-grafite focus:ring-0 rounded-none text-grafite outline-none transition-colors"
                />
              </div>

              {/* Field 4: Prazo */}
              <div>
                <label
                  htmlFor="nexo-prazo"
                  className="text-[10px] uppercase tracking-widest text-mineral block mb-1 font-medium"
                >
                  Prazo estimado <span className="text-ambar">*</span>
                </label>
                <select
                  id="nexo-prazo"
                  value={prazo}
                  onChange={(e) => setPrazo(e.target.value)}
                  className="w-full px-3.5 py-3 text-sm bg-marfim border border-areia/60 focus:border-grafite focus:ring-0 rounded-none text-grafite outline-none transition-colors"
                >
                  {NEXO_PRAZOS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Single CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-grafite text-marfim font-editorial text-base tracking-wide hover:bg-grafite/90 active:bg-grafite/95 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  {campaign.ctaText}
                </button>
              </div>
            </form>

            <p className="text-center text-xs text-grafite/50 font-light mt-4">
              Atendimento direto com o ateliê • Montes Claros, MG
            </p>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-12 h-12 rounded-full border border-areia/80 flex items-center justify-center mx-auto mb-5 text-ambar text-xl font-editorial">
              ✓
            </div>

            <h2 className="text-2xl md:text-3xl font-editorial text-grafite mb-3 tracking-tight">
              Sua ideia está a caminho do ateliê.
            </h2>
            <p className="text-sm text-grafite/70 font-light leading-relaxed max-w-sm mx-auto mb-6">
              Abrimos o WhatsApp com o resumo organizado do seu briefing. Envie a mensagem na conversa para iniciar.
            </p>

            {/* Quick Action Links */}
            <div className="flex flex-col gap-3 max-w-xs mx-auto mb-6">
              {waLinkGenerated && (
                <a
                  href={waLinkGenerated}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-grafite text-marfim text-xs uppercase tracking-widest font-medium hover:bg-grafite/90 transition-colors"
                >
                  Reabrir conversa no WhatsApp ↗
                </a>
              )}

              {/* Fallback to /contato if placeholder */}
              {isPlaceholderNumber && (
                <Link
                  to="/contato"
                  className="w-full py-2.5 px-4 border border-areia/80 text-grafite text-xs uppercase tracking-widest font-medium hover:border-grafite transition-colors"
                >
                  Página de Contato do Site ↗
                </Link>
              )}
            </div>

            {isPlaceholderNumber && (
              <p className="text-[11px] text-grafite/50 italic max-w-xs mx-auto">
                (Nota técnica: o número de WhatsApp está com o placeholder padrão configurado em <code>src/config/mirra.ts</code>.)
              </p>
            )}

            <div className="pt-6 border-t border-areia/40 mt-6">
              <Link
                to="/"
                className="text-xs text-grafite/60 hover:text-grafite transition-colors underline underline-offset-4"
              >
                Voltar à página inicial da MIRRA
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Minimal Footer */}
      <footer className="py-6 px-6 text-center text-[10px] text-grafite/40 uppercase tracking-widest font-light">
        MIRRA • Peças & Projetos em Resina
      </footer>
    </main>
  );
}
