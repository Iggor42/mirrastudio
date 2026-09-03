import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { CTA } from "@/components/CTA";
import { SmartImage } from "@/components/SmartImage";
import { mirra } from "@/config/mirra";
import { buildNexoUrl } from "@/lib/handoff";

export function ProjetoDetail() {
  const { slug } = useParams();
  const project = mirra.projects.find(p => p.slug === slug);

  if (!project) return <Navigate to="/projetos" replace />;

  useEffect(() => {
    if (project) trackEvent('project_viewed', { slug: project.slug });
  }, [project]);

  const nexoUrl = buildNexoUrl({ 
    intent: "reference", 
    reference: project.slug, 
    category: project.category 
  });

  return (
    <PageTransition>
      <article className="pt-32 pb-24">
        {/* Hero Image */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 lg:mb-24">
          <div className="aspect-square md:aspect-[21/9] w-full bg-areia overflow-hidden relative">
            <SmartImage 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            <div className="lg:col-span-8">
              <SectionLabel className="mb-8">{project.verticalLabel}</SectionLabel>
              <h1 className="text-4xl md:text-6xl font-editorial text-grafite mb-6">{project.title}</h1>
              <p className="text-xl md:text-2xl text-grafite/80 font-editorial mb-12 italic">{project.conceptText}</p>
              <p className="text-base text-grafite/70 font-light leading-relaxed max-w-2xl mb-16">
                {project.description}
              </p>

              {/* Gallery */}
              <div className="flex flex-col gap-8 md:gap-12">
                {project.gallery.map((img, i) => (
                  <div key={i} className="w-full bg-areia overflow-hidden">
                    <SmartImage src={img} alt={`Detalhe ${i + 1} de ${project.title}`} className="w-full h-auto object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar / Tech Sheet */}
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="sticky top-32">
                <div className="border border-grafite/10 p-8 mb-8 bg-marfim/50">
                  <h3 className="text-[10px] uppercase tracking-widest font-medium text-grafite mb-8">Ficha Técnica</h3>
                  
                  <dl className="flex flex-col gap-6">
                    {Object.entries(project.technical).map(([key, val]) => (
                      <div key={key} className="border-b border-grafite/10 pb-4 last:border-0 last:pb-0">
                        <dt className="text-[10px] uppercase tracking-widest text-mineral mb-2">{key}</dt>
                        <dd className="text-sm font-light text-grafite">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mb-12">
                  <p className="text-xs text-grafite/50 font-light italic mb-6">
                    Projetos personalizados podem exigir estudo, teste, combinação de materiais e definição de acabamento antes do orçamento.
                  </p>
                  <CTA href={nexoUrl} className="w-full" external={nexoUrl.startsWith("http")}>
                    Quero algo nessa direção ↗
                  </CTA>
                </div>

                <CTA href="/projetos" variant="secondary">
                  Ver outros projetos
                </CTA>
              </div>
            </div>

          </div>
        </div>
      </article>
    </PageTransition>
  );
}
