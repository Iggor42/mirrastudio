import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SmartImage } from "./SmartImage";

interface ProjectCardProps {
  slug: string;
  image: string;
  verticalLabel: string;
  title: string;
  conceptText: string;
  className?: string;
}

export function ProjectCard({ slug, image, verticalLabel, title, conceptText, className }: ProjectCardProps) {
  return (
    <Link to={`/projetos/${slug}`} className={cn("group block", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-areia mb-6">
        <SmartImage 
          src={image} 
          alt={title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-grafite/0 transition-colors duration-500 group-hover:bg-grafite/10" />
      </div>
      
      <div className="flex flex-col items-start">
        <span className="text-[10px] uppercase tracking-widest text-mineral mb-3 block">
          {verticalLabel}
        </span>
        <h3 className="text-2xl font-editorial text-grafite mb-2">{title}</h3>
        <p className="text-sm text-grafite/70 mb-4">{conceptText}</p>
        
        <span className="text-[11px] uppercase tracking-widest text-grafite border-b border-grafite/30 pb-1 inline-block transition-colors duration-300 group-hover:border-grafite">
          Ver projeto ↗
        </span>
      </div>
    </Link>
  );
}
