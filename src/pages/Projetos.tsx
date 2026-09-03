import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { SectionLabel } from "@/components/SectionLabel";
import { ProjectCard } from "@/components/ProjectCard";
import { mirra } from "@/config/mirra";
import { cn } from "@/lib/utils";

const filters = [
  "Todos",
  "Memórias",
  "Casa & Design",
  "Mobiliário",
  "Marcas & Empresas",
  "Projetos Especiais"
];

export function Projetos() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredProjects = mirra.projects.filter(p => 
    p.published === true && (activeFilter === "Todos" || p.verticalLabel === activeFilter)
  );

  return (
    <PageTransition>
      <section className="pt-40 pb-24 border-b border-areia/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel className="mb-8">Portfólio</SectionLabel>
          <h1 className="text-5xl md:text-7xl font-editorial text-grafite mb-8">Projetos selecionados.</h1>
          <p className="text-grafite/70 text-base max-w-xl font-light">
            Um portfólio amplo, porém curado. Cada peça revela uma possibilidade da resina — memória, objeto, superfície, marca ou projeto especial.
          </p>
        </div>
      </section>

      <section className="py-12 bg-marfim sticky top-[73px] z-30 border-b border-areia/20 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center gap-8 overflow-x-auto no-scrollbar">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "text-[10px] uppercase tracking-widest font-medium transition-colors whitespace-nowrap",
                activeFilter === filter ? "text-grafite border-b border-grafite pb-1" : "text-grafite/40 hover:text-grafite"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="py-24 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 gap-y-24">
            {filteredProjects.map((project) => (
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
          {filteredProjects.length === 0 && (
            <div className="text-center py-24">
              <p className="text-grafite/50 font-light">Nenhum projeto encontrado nesta categoria no momento.</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
