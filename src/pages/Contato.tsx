import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { CTA } from "@/components/CTA";
import { mirra } from "@/config/mirra";
import { buildNexoUrl } from "@/lib/handoff";

export function Contato() {
  const nexoUrl = buildNexoUrl({ intent: "contact" });
  const hasNexo = Boolean(import.meta.env.VITE_NEXO_URL);

  return (
    <PageTransition>
      <section className="pt-40 pb-24 md:min-h-[80vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            <div>
              <SectionLabel className="mb-8">Início</SectionLabel>
              <h1 className="text-5xl md:text-7xl font-editorial text-grafite mb-8">Conte sua ideia.</h1>
              <p className="text-grafite/70 text-lg font-light leading-relaxed max-w-md mb-12">
                Algumas ideias chegam prontas. Outras ainda precisam ser descobertas. Em ambos os casos, o primeiro passo é contar o que você imagina.
              </p>
              
              <CTA href={nexoUrl} external={nexoUrl.startsWith("http")}>
                {hasNexo ? "Começar pelo Nexo ↗" : "Em breve: briefing guiado MIRRA"}
              </CTA>
            </div>

            <div className="bg-areia/10 p-8 md:p-12 border border-areia/20 flex flex-col justify-center">
              <h3 className="text-[10px] uppercase tracking-widest font-medium text-grafite mb-8">Antes de conversar, ajuda ter:</h3>
              <ul className="flex flex-col gap-4 text-sm font-light text-grafite/80 mb-12">
                <li className="flex items-start gap-3"><span className="text-ambar mt-0.5">•</span> O que será criado e para qual finalidade</li>
                <li className="flex items-start gap-3"><span className="text-ambar mt-0.5">•</span> Medidas e quantidade, se houver</li>
                <li className="flex items-start gap-3"><span className="text-ambar mt-0.5">•</span> Cores e materiais desejados</li>
                <li className="flex items-start gap-3"><span className="text-ambar mt-0.5">•</span> Referências visuais</li>
                <li className="flex items-start gap-3"><span className="text-ambar mt-0.5">•</span> Local ou contexto de uso</li>
                <li className="flex items-start gap-3"><span className="text-ambar mt-0.5">•</span> Prazo desejado</li>
                <li className="flex items-start gap-3"><span className="text-ambar mt-0.5">•</span> Faixa de investimento, se quiser adiantar</li>
                <li className="flex items-start gap-3"><span className="text-ambar mt-0.5">•</span> Necessidade de transporte, instalação ou embalagem</li>
              </ul>

              <div className="pt-8 border-t border-grafite/10">
                <span className="text-[10px] uppercase tracking-widest text-mineral mb-2 block">Local de desenvolvimento</span>
                <span className="text-base text-grafite font-editorial">{mirra.contact.location}</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
}
