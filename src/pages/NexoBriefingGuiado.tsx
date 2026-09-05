import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MirraWordmark } from "@/components/brand/MirraWordmark";
import { mirra } from "@/config/mirra";
import {
  NEXO_VERTICALS,
  NEXO_PRAZOS,
  NexoLead,
  NexoClick
} from "@/config/nexoLink";

export function NexoBriefingGuiado() {
  const [searchParams] = useSearchParams();

  // Capture UTMs from URL search params or fallback to previous visit records
  const [utms] = useState(() => {
    return {
      source: searchParams.get("utm_source") || "",
      medium: searchParams.get("utm_medium") || "",
      campaign: searchParams.get("utm_campaign") || "",
      content: searchParams.get("utm_content") || ""
    };
  });

  // Step state (1 to 4)
  const [step, setStep] = useState<number>(1);
  const [isFading, setIsFading] = useState<boolean>(false);

  // Form answers
  const [answers, setAnswers] = useState({
    vertical: NEXO_VERTICALS[0] as string,
    referencia: "",
    prazo: NEXO_PRAZOS[0] as string,
    nome: ""
  });

  // Submission state
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [waLinkGenerated, setWaLinkGenerated] = useState<string>("");

  // Smooth fade transition between steps (500ms ease-out)
  const changeStep = (nextStep: number) => {
    setIsFading(true);
    setTimeout(() => {
      setStep(nextStep);
      setIsFading(false);
    }, 260);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      changeStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      changeStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (!answers.nome.trim()) return;

    // Build humanized WhatsApp message as specified
    const message = [
      `Olá! Meu nome é ${answers.nome.trim()}.`,
      "",
      `Busco desenvolver: ${answers.vertical}`,
      answers.referencia.trim() ? `Referência: ${answers.referencia.trim()}` : "",
      `Prazo: ${answers.prazo}`,
      "",
      "—",
      `Campanha: ideia | Origem: ${utms.source || "direto"}/${utms.medium || "organico"}`
    ]
      .filter(Boolean)
      .join("\n");

    const rawWhatsapp = mirra.contact.whatsapp?.trim() || "553800000000";
    const waUrl = `https://wa.me/${rawWhatsapp}?text=${encodeURIComponent(message)}`;
    setWaLinkGenerated(waUrl);

    // Save lead in localStorage (nexo_premium_leads)
    try {
      const leadId = `npl_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const premiumLead = {
        id: leadId,
        timestamp: new Date().toISOString(),
        slug: "ideia",
        answers,
        utms,
        openedWhatsApp: true
      };

      const existingPremiumLeads = JSON.parse(
        localStorage.getItem("nexo_premium_leads") || "[]"
      );
      existingPremiumLeads.push(premiumLead);
      localStorage.setItem("nexo_premium_leads", JSON.stringify(existingPremiumLeads));

      // Also save in nexo_leads for full compatibility with /l-admin metrics
      const standardLead: NexoLead = {
        id: leadId,
        slug: "ideia",
        timestamp: premiumLead.timestamp,
        nome: answers.nome.trim(),
        vertical: answers.vertical,
        referencia: answers.referencia.trim() || undefined,
        prazo: answers.prazo,
        utms: {
          source: utms.source || undefined,
          medium: utms.medium || undefined,
          campaign: utms.campaign || undefined,
          content: utms.content || undefined
        },
        openedWhatsApp: true
      };
      const existingStandardLeads: NexoLead[] = JSON.parse(
        localStorage.getItem("nexo_leads") || "[]"
      );
      existingStandardLeads.push(standardLead);
      localStorage.setItem("nexo_leads", JSON.stringify(existingStandardLeads));

      // Record WhatsApp click
      const click: NexoClick = {
        id: `c_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        slug: "ideia",
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

    // Open WhatsApp in a new tab
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-marfim text-grafite flex flex-col justify-between selection:bg-areia selection:text-grafite">
      {/* Top Header - Wordmark Only */}
      <header className="pt-8 pb-4 px-6 text-center">
        <Link
          to="/l"
          aria-label="MIRRA Voltar"
          className="inline-block transition-opacity hover:opacity-75 focus:outline-none"
        >
          <MirraWordmark className="h-6 md:h-7 w-auto mx-auto text-grafite" />
        </Link>
      </header>

      {/* Main Form Flow */}
      <div className="w-full max-w-md mx-auto px-6 py-8 flex-1 flex flex-col justify-center">
        {!submitted ? (
          <div>
            {/* Step Progress Indicator */}
            <div className="mb-8 flex items-center justify-between border-b border-areia/40 pb-3">
              <span className="text-xs uppercase tracking-widest font-sans text-mineral font-medium">
                Etapa {step} de 4
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 w-6 rounded-none transition-all duration-300 ${
                      s <= step ? "bg-grafite" : "bg-areia/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Dynamic Step Content with Smooth Fade Transitions */}
            <form onSubmit={handleNext}>
              <div
                className={`transition-opacity duration-500 ease-out min-h-[190px] flex flex-col justify-center ${
                  isFading ? "opacity-0" : "opacity-100"
                }`}
              >
                {/* ETAPA 1: O que você imagina? */}
                {step === 1 && (
                  <div>
                    <h1 className="text-2xl md:text-3xl font-editorial tracking-tight text-grafite mb-6">
                      O que você imagina?
                    </h1>
                    <div className="relative">
                      <select
                        id="briefing-vertical"
                        value={answers.vertical}
                        onChange={(e) =>
                          setAnswers({ ...answers, vertical: e.target.value })
                        }
                        className="w-full bg-transparent border-b-2 border-grafite/30 focus:border-grafite py-3.5 text-base md:text-lg text-grafite outline-none transition-colors cursor-pointer appearance-none rounded-none pr-8"
                      >
                        {NEXO_VERTICALS.map((item) => (
                          <option key={item} value={item} className="bg-marfim text-grafite py-2">
                            {item}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-2 top-4 pointer-events-none text-grafite/50 text-xs">
                        ▼
                      </span>
                    </div>
                  </div>
                )}

                {/* ETAPA 2: Tem alguma referência? */}
                {step === 2 && (
                  <div>
                    <h1 className="text-2xl md:text-3xl font-editorial tracking-tight text-grafite mb-2">
                      Tem alguma referência?
                    </h1>
                    <p className="text-xs text-mineral uppercase tracking-wider mb-6">
                      (Opcional)
                    </p>
                    <textarea
                      id="briefing-referencia"
                      rows={3}
                      value={answers.referencia}
                      onChange={(e) =>
                        setAnswers({ ...answers, referencia: e.target.value })
                      }
                      placeholder="Link, imagem, descrição..."
                      className="w-full bg-transparent border-b-2 border-grafite/30 focus:border-grafite py-2.5 text-base text-grafite outline-none resize-none transition-colors placeholder:text-mineral/50 rounded-none"
                    />
                  </div>
                )}

                {/* ETAPA 3: Qual o prazo? */}
                {step === 3 && (
                  <div>
                    <h1 className="text-2xl md:text-3xl font-editorial tracking-tight text-grafite mb-6">
                      Qual o prazo?
                    </h1>
                    <div className="relative">
                      <select
                        id="briefing-prazo"
                        value={answers.prazo}
                        onChange={(e) =>
                          setAnswers({ ...answers, prazo: e.target.value })
                        }
                        className="w-full bg-transparent border-b-2 border-grafite/30 focus:border-grafite py-3.5 text-base md:text-lg text-grafite outline-none transition-colors cursor-pointer appearance-none rounded-none pr-8"
                      >
                        {NEXO_PRAZOS.map((item) => (
                          <option key={item} value={item} className="bg-marfim text-grafite py-2">
                            {item}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-2 top-4 pointer-events-none text-grafite/50 text-xs">
                        ▼
                      </span>
                    </div>
                  </div>
                )}

                {/* ETAPA 4: Seu nome? */}
                {step === 4 && (
                  <div>
                    <h1 className="text-2xl md:text-3xl font-editorial tracking-tight text-grafite mb-6">
                      Seu nome?
                    </h1>
                    <input
                      id="briefing-nome"
                      type="text"
                      required
                      autoFocus
                      value={answers.nome}
                      onChange={(e) =>
                        setAnswers({ ...answers, nome: e.target.value })
                      }
                      placeholder="Como podemos te chamar?"
                      className="w-full bg-transparent border-b-2 border-grafite/30 focus:border-grafite py-3 text-lg text-grafite outline-none transition-colors placeholder:text-mineral/50 rounded-none"
                    />
                  </div>
                )}
              </div>

              {/* Navigation Actions */}
              <div className="mt-10 flex items-center justify-between gap-4 pt-4 border-t border-areia/40">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="text-xs uppercase tracking-widest text-mineral hover:text-grafite transition-colors py-2 px-1 font-medium"
                  >
                    ← Voltar
                  </button>
                ) : (
                  <Link
                    to="/l"
                    className="text-xs uppercase tracking-widest text-mineral hover:text-grafite transition-colors py-2 px-1 font-medium"
                  >
                    Cancelar
                  </Link>
                )}

                <button
                  type="submit"
                  className="ml-auto py-3 px-8 border border-grafite text-grafite hover:bg-ambar hover:border-ambar hover:text-marfim transition-all duration-300 text-xs uppercase tracking-widest font-medium shadow-sm"
                >
                  {step === 4 ? "Enviar para o ateliê ↗" : "Próximo →"}
                </button>
              </div>
            </form>

            <p className="text-center text-[11px] text-mineral/70 font-light mt-8">
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

              <Link
                to="/l"
                className="w-full py-2.5 px-4 border border-areia/80 text-grafite text-xs uppercase tracking-widest font-medium hover:border-grafite transition-colors"
              >
                Voltar ao início
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
