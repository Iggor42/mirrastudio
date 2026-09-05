import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { MirraWordmark } from "@/components/brand/MirraWordmark";
import { NexoVisit } from "@/config/nexoLink";

export function NexoLinkPremium() {
  const location = useLocation();
  const recordedVisitRef = useRef(false);

  // Capture UTMs and record visit on mount
  useEffect(() => {
    if (recordedVisitRef.current) return;
    recordedVisitRef.current = true;

    try {
      const searchParams = new URLSearchParams(location.search);
      const utmSource = searchParams.get("utm_source") || undefined;
      const utmMedium = searchParams.get("utm_medium") || undefined;
      const utmCampaign = searchParams.get("utm_campaign") || undefined;
      const utmContent = searchParams.get("utm_content") || undefined;

      const visitPayload = {
        id: `pv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        slug: "premium",
        timestamp: new Date().toISOString(),
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        referrer: typeof document !== "undefined" ? document.referrer || "direto" : "direto"
      };

      // 1. Save in nexo_premium_visits
      const premiumVisits = JSON.parse(
        localStorage.getItem("nexo_premium_visits") || "[]"
      );
      premiumVisits.push(visitPayload);
      localStorage.setItem("nexo_premium_visits", JSON.stringify(premiumVisits));

      // 2. Also save in nexo_visits for compatibility with /l-admin metrics
      const standardVisit: NexoVisit = {
        id: visitPayload.id,
        slug: utmCampaign || "premium",
        timestamp: visitPayload.timestamp,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_content: utmContent,
        referrer: visitPayload.referrer
      };
      const existingVisits: NexoVisit[] = JSON.parse(
        localStorage.getItem("nexo_visits") || "[]"
      );
      existingVisits.push(standardVisit);
      localStorage.setItem("nexo_visits", JSON.stringify(existingVisits));
    } catch {
      // Ignore localStorage errors
    }
  }, [location.search]);

  // Preserve UTMs on the idea briefing link
  const ideiaHref = `/l/ideia${location.search}`;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-marfim text-grafite flex flex-col justify-between selection:bg-areia selection:text-grafite">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        src="/assets/videos/hero-resina.mp4"
        poster="/assets/posters/hero-resina.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Atmospheric Soft Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-marfim/90 via-marfim/70 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-marfim/50 backdrop-blur-[2px] pointer-events-none" />

      {/* Content Container (Mobile-first, max-w-md mx-auto, breathing room) */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-10 flex-1 flex flex-col justify-between">
        {/* Minimal Wordmark Top Header */}
        <header className="pt-2 pb-4 text-center">
          <Link
            to="/"
            aria-label="MIRRA Home"
            className="inline-block transition-opacity hover:opacity-75 focus:outline-none"
          >
            <MirraWordmark className="h-7 w-auto mx-auto text-grafite" />
          </Link>
        </header>

        {/* Editorial Opening */}
        <div className="my-auto py-6 text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-mineral font-medium block mb-3">
            Ateliê de Criação
          </span>
          <h1 className="text-4xl md:text-5xl font-editorial tracking-tight text-grafite mb-3 leading-tight">
            Ideias ganham forma.
          </h1>
          <p className="text-sm font-sans uppercase tracking-wide text-mineral font-medium">
            Escolha seu caminho:
          </p>

          {/* 3 Intent Cards */}
          <div className="flex flex-col gap-4 mt-8 text-left">
            {/* Card 1: Dar forma a uma ideia */}
            <Link
              to={ideiaHref}
              className="group block p-5 md:p-6 bg-marfim/85 backdrop-blur-md border border-grafite/30 hover:border-grafite rounded-none shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-ambar block mb-1 font-medium">
                    Briefing guiado
                  </span>
                  <h2 className="text-lg md:text-xl font-editorial text-grafite group-hover:text-grafite transition-colors">
                    Quero dar forma a uma ideia
                  </h2>
                </div>
                <span className="text-base text-grafite/60 group-hover:text-grafite group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-300">
                  ↗
                </span>
              </div>
            </Link>

            {/* Card 2: Conhecer as criações */}
            <Link
              to="/projetos"
              className="group block p-5 md:p-6 bg-marfim/85 backdrop-blur-md border border-grafite/30 hover:border-grafite rounded-none shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-mineral block mb-1 font-medium">
                    Portfólio de peças
                  </span>
                  <h2 className="text-lg md:text-xl font-editorial text-grafite group-hover:text-grafite transition-colors">
                    Quero conhecer as criações
                  </h2>
                </div>
                <span className="text-base text-grafite/60 group-hover:text-grafite group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-300">
                  ↗
                </span>
              </div>
            </Link>

            {/* Card 3: Entender como funciona */}
            <Link
              to="/processo"
              className="group block p-5 md:p-6 bg-marfim/85 backdrop-blur-md border border-grafite/30 hover:border-grafite rounded-none shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-mineral block mb-1 font-medium">
                    Matéria e tempo
                  </span>
                  <h2 className="text-lg md:text-xl font-editorial text-grafite group-hover:text-grafite transition-colors">
                    Quero entender como funciona
                  </h2>
                </div>
                <span className="text-base text-grafite/60 group-hover:text-grafite group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-300">
                  ↗
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Minimal Footer */}
        <footer className="pt-6 pb-2 text-center text-[10px] text-grafite/50 uppercase tracking-widest font-light">
          MIRRA • Peças & Projetos em Resina • Montes Claros, MG
        </footer>
      </div>
    </main>
  );
}
