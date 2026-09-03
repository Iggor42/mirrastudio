import React from "react";
import { cn } from "@/lib/utils";
import { MirraMonogram } from "./brand/MirraMonogram";

export function SectionLabel({ children, className, light = false }: { children: React.ReactNode, className?: string, light?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3 uppercase tracking-[0.2em] text-[10px] font-medium", light ? "text-marfim/70" : "text-mineral", className)}>
      <MirraMonogram className={cn("w-3 h-3", light ? "text-marfim/70" : "text-mineral")} />
      <span>{children}</span>
    </div>
  );
}
