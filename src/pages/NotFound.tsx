import React from "react";
import { PageTransition } from "@/components/PageTransition";
import { CTA } from "@/components/CTA";

export function NotFound() {
  return (
    <PageTransition>
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-editorial text-grafite mb-8 leading-tight">
          Esta ideia ainda não <br className="hidden md:block" /> ganhou forma.
        </h1>
        <p className="text-grafite/60 font-light max-w-md mb-12">
          A página que você procura não existe ou foi movida.
        </p>
        <CTA href="/projetos">Explorar projetos ↗</CTA>
      </section>
    </PageTransition>
  );
}
