import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { mirra } from "@/config/mirra";
import { MirraMonogram } from "@/components/brand/MirraMonogram";

export function AMirra() {
  return (
    <PageTransition>
      <section className="pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <SectionLabel className="mb-8 justify-center">Nossa História</SectionLabel>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-editorial text-grafite max-w-4xl mx-auto leading-tight mb-16">
            A MIRRA nasceu preservando histórias.
          </h1>
          
          <div className="max-w-2xl mx-auto text-left flex flex-col gap-8 text-base md:text-lg text-grafite/80 font-light leading-relaxed">
            {mirra.about.story.slice(1).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-floresta text-marfim">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-marfim/40 mb-12 border-b border-marfim/10 pb-4">Hoje, a MIRRA desenvolve</h2>
              <ul className="flex flex-col gap-6 text-xl md:text-2xl font-editorial">
                {mirra.about.categories.map(cat => (
                  <li key={cat} className="flex items-center gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-ambar" />
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-sm uppercase tracking-widest text-marfim/40 mb-12 border-b border-marfim/10 pb-4">O que guia cada projeto</h2>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-base font-light text-marfim/80">
                {mirra.about.principles.map(principle => (
                  <div key={principle}>{principle}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 text-center bg-marfim">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <MirraMonogram className="w-8 h-8 mx-auto text-grafite/20 mb-8" />
          <p className="text-2xl md:text-4xl font-editorial text-grafite">
            Primeiro dominar a categoria local. Depois ampliar o território.
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
