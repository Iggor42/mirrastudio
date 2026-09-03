import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { CinematicResinPlayer } from "@/components/CinematicResinPlayer";
import { mirra } from "@/config/mirra";

export function Materia() {
  return (
    <PageTransition>
      <section className="pt-40 pb-24 border-b border-areia/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel className="mb-8">A Base</SectionLabel>
          <h1 className="text-5xl md:text-7xl font-editorial text-grafite mb-8">Resina como matéria.</h1>
          <p className="text-grafite/70 text-lg max-w-2xl font-light leading-relaxed">
            A MIRRA deixa de ser definida por uma única aplicação da resina. A marca passa a ser definida pelo domínio da resina como matéria para criação.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-32">
            {mirra.matter.map((item, i) => (
              <div key={item.title} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <div className="order-2 lg:order-1">
                  <span className="text-[10px] uppercase tracking-widest text-mineral mb-4 block">Capítulo 0{i + 1}</span>
                  <h2 className="text-3xl md:text-5xl font-editorial text-grafite mb-6">{item.title}</h2>
                  <p className="text-lg text-grafite/80 font-light leading-relaxed max-w-md mb-8">
                    {item.description}
                  </p>
                  <div className="border-l border-ambar pl-6 py-2">
                    <span className="text-[10px] uppercase tracking-widest text-grafite/40 block mb-2">Nota Técnica</span>
                    <p className="text-xs text-grafite/60 font-light italic">{item.note}</p>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <CinematicResinPlayer 
                    srcMp4={item.media}
                    poster={item.poster}
                    alt={item.title}
                    className="w-full aspect-[4/5] lg:aspect-square"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-marfim text-center border-t border-areia/20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <p className="text-3xl md:text-5xl font-editorial text-grafite">
            Não basta ser possível. Precisa ser bem executado.
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
