import { PageTransition } from "@/components/PageTransition";
import { VideoBackground } from "@/components/VideoBackground";
import { CTA } from "@/components/CTA";
import { SectionLabel } from "@/components/SectionLabel";
import { ProjectCard } from "@/components/ProjectCard";
import { SmartImage } from "@/components/SmartImage";
import { mirra } from "@/config/mirra";
import { buildNexoUrl } from "@/lib/handoff";

export function Home() {
  const nexoUrl = buildNexoUrl({ intent: "start_project" });

  const featuredProjects = mirra.projects.filter(p => p.published === true).slice(0, 3);

  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 md:opacity-100 md:w-1/2 md:left-1/2">
          <VideoBackground 
            srcMp4="/assets/videos/hero-resina.mp4" 
            poster="/assets/posters/hero-resina.jpg" 
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-marfim via-marfim/80 to-transparent hidden md:block" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.2em] text-grafite/60 font-medium mb-8 block">
              {mirra.hero.eyebrow}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-editorial text-grafite leading-[1.1] mb-8">
              {mirra.hero.headline.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h1>
            <p className="text-grafite/80 text-sm md:text-base max-w-md mb-10 leading-relaxed font-light">
              {mirra.hero.description}
            </p>
            <div className="flex flex-wrap items-center gap-8">
              <CTA href={nexoUrl} external={nexoUrl.startsWith("http")}>{mirra.hero.cta}</CTA>
              <CTA href="/projetos" variant="secondary">Ver projetos selecionados ↗</CTA>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-24 md:py-40 bg-marfim">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-2xl md:text-4xl lg:text-5xl font-editorial text-grafite max-w-4xl mx-auto leading-snug">
            “A MIRRA transforma referências, histórias e necessidades em peças e projetos personalizados em resina. Unimos desenvolvimento, técnica, criatividade e acabamento para encontrar a melhor forma de executar cada ideia.”
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 bg-areia/10 border-t border-areia/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel className="mb-16">Capítulos</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
            {mirra.verticals.map((cat) => (
              <div key={cat.num} className="border-t border-grafite/10 pt-6">
                <span className="text-xs text-grafite/40 font-medium mb-4 block">{cat.num}</span>
                <h3 className="text-xl font-editorial text-grafite mb-3">{cat.title}</h3>
                <p className="text-sm text-grafite/70 font-light">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <SectionLabel>Projetos selecionados</SectionLabel>
            <CTA href="/projetos" variant="secondary">Ver todos os projetos ↗</CTA>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredProjects.map((project) => (
              <ProjectCard 
                key={project.slug} 
                slug={project.slug}
                image={project.image}
                verticalLabel={project.verticalLabel}
                title={project.title}
                conceptText={project.conceptText}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MATTER */}
      <section className="py-24 bg-grafite text-marfim">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel light className="mb-16">Matéria em 3 atos</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mirra.matter.map((item, i) => (
              <div key={item.title} className="group">
                <div className="aspect-[4/3] mb-6 overflow-hidden bg-floresta relative">
                  <SmartImage src={item.poster} alt={item.title} className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700" loading="lazy" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-marfim/40 mb-3 block">0{i + 1}</span>
                <h3 className="text-2xl font-editorial mb-3">{item.title}</h3>
                <p className="text-sm text-marfim/70 font-light">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <CTA href="/materia" variant="dark">Explorar a matéria ↗</CTA>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 md:py-40 border-b border-areia/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel className="mb-16">Processo</SectionLabel>
          <div className="flex flex-wrap items-center justify-between gap-6 md:gap-12">
            {mirra.process.map((step, i) => (
              <div key={step.title} className="flex items-center gap-4 md:gap-8">
                <span className="text-lg md:text-2xl font-editorial text-grafite">{step.title}</span>
                {i < mirra.process.length - 1 && (
                  <span className="text-areia">→</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <CTA href="/processo" variant="secondary">Conhecer o método ↗</CTA>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL CTA */}
      <section className="py-32 bg-floresta text-marfim text-center">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h2 className="text-4xl md:text-5xl font-editorial mb-12">Resina como matéria.<br/>Ideia como ponto de partida.</h2>
          <CTA href={nexoUrl} variant="dark" external={nexoUrl.startsWith("http")}>Conte sua ideia ↗</CTA>
        </div>
      </section>

      {/* LOCAL */}
      <section className="py-24 bg-marfim text-center">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <SectionLabel className="mb-8 justify-center">Origem</SectionLabel>
          <h3 className="text-2xl font-editorial text-grafite mb-6">Desenvolvido em Montes Claros • MG</h3>
          <p className="text-sm text-grafite/70 font-light">
            A presença local da MIRRA nasce do ateliê, das parcerias e das ideias que chegam de pessoas, profissionais e empresas da região.
          </p>
        </div>
      </section>
    </PageTransition>
  );
}
