import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { CTA } from "@/components/CTA";
import { SmartImage } from "@/components/SmartImage";
import { mirra } from "@/config/mirra";
import { buildNexoUrl } from "@/lib/handoff";

const POSTERS = [
  "/assets/posters/hero-resina.jpg",
  "/assets/posters/transparencia.jpg",
  "/assets/posters/profundidade.jpg",
  "/assets/posters/acabamento.jpg",
  "/assets/posters/inclusao.jpg"
];

export function Processo() {
  const nexoUrl = buildNexoUrl({ intent: "process" });

  return (
    <PageTransition>
      <section className="pt-40 pb-24 border-b border-areia/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel className="mb-8">O Método</SectionLabel>
          <h1 className="text-5xl md:text-7xl font-editorial text-grafite mb-8">Da ideia à forma.</h1>
          <p className="text-grafite/70 text-lg max-w-2xl font-light leading-relaxed">
            Fabricar é reproduzir uma solução conhecida. Projetar é entender a necessidade, avaliar viabilidade, definir composição e acabamento, antecipar riscos e transformar a ideia em algo executável.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-24 md:gap-40">
            {mirra.process.map((step, i) => (
              <div key={step.title} className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="order-2 md:order-1">
                  <span className="text-[10px] uppercase tracking-widest text-mineral mb-4 block">Ato 0{i + 1}</span>
                  <h2 className="text-3xl md:text-4xl font-editorial text-grafite mb-6">{step.title}</h2>
                  <p className="text-base text-grafite/70 font-light leading-relaxed max-w-md">{step.description}</p>
                </div>
                <div className="order-1 md:order-2 aspect-[4/3] bg-areia relative overflow-hidden">
                  <SmartImage src={POSTERS[i] || step.poster} alt={step.title} className="w-full h-full object-cover mix-blend-luminosity opacity-40" loading="lazy" />
                  <div className="absolute inset-0 bg-grafite/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-floresta text-marfim text-center">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <p className="text-2xl md:text-4xl font-editorial mb-12 leading-snug">
            Testar antes de prometer. Desenvolver antes de executar. Entregar apenas quando a peça sustenta a ideia.
          </p>
          <CTA href={nexoUrl} variant="dark" external={nexoUrl.startsWith("http")}>Conte sua ideia ↗</CTA>
        </div>
      </section>
    </PageTransition>
  );
}
