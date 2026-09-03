import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { mirra } from "@/config/mirra";
import { MirraWordmark } from "./brand/MirraWordmark";
import { MirraSignature } from "./brand/MirraSignature";
import { MirraMonogram } from "./brand/MirraMonogram";
import { CTA } from "./CTA";
import { buildNexoUrl } from "@/lib/handoff";
import { trackEvent } from "@/lib/analytics";

export function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
    trackEvent('page_view', { path: pathname });
  }, [pathname]);

  const nexoUrl = buildNexoUrl({ intent: "start_project" });

  return (
    <div className="flex flex-col min-h-screen">
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "bg-marfim/90 backdrop-blur-md py-4 border-b border-areia/30" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Link to="/" className="text-grafite hover:opacity-70 transition-opacity" aria-label="MIRRA Home">
            <MirraWordmark className="h-6 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {mirra.navigation.map((item) => (
              <Link 
                key={item.href} 
                to={item.href}
                className={cn(
                  "text-[11px] uppercase tracking-widest transition-colors duration-300 font-medium",
                  pathname === item.href ? "text-grafite" : "text-grafite/60 hover:text-grafite"
                )}
              >
                {item.label}
              </Link>
            ))}
            <CTA href={nexoUrl} external={nexoUrl.startsWith("http")}>
              Conte sua ideia ↗
            </CTA>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-grafite"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <div className="w-6 h-4 relative flex flex-col justify-between">
              <span className={cn("w-full h-[1px] bg-grafite transition-transform duration-300 origin-right", mobileMenuOpen ? "-rotate-45" : "")} />
              <span className={cn("w-full h-[1px] bg-grafite transition-opacity duration-300", mobileMenuOpen ? "opacity-0" : "opacity-100")} />
              <span className={cn("w-full h-[1px] bg-grafite transition-transform duration-300 origin-right", mobileMenuOpen ? "rotate-45" : "")} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-marfim z-40 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden flex flex-col pt-24 px-6 pb-12",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="flex flex-col gap-8 mt-12">
          {mirra.navigation.map((item) => (
            <Link 
              key={item.href} 
              to={item.href}
              className={cn(
                "text-2xl font-editorial tracking-tight",
                pathname === item.href ? "text-grafite" : "text-grafite/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <CTA href={nexoUrl} className="w-full" external={nexoUrl.startsWith("http")}>
            Conte sua ideia ↗
          </CTA>
        </div>
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-floresta text-marfim pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
          <MirraSignature className="h-24 w-auto mb-16 text-marfim opacity-90" />
          
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-24">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-marfim/60 mb-2">Local</span>
              <span className="font-body text-sm">{mirra.contact.location}</span>
            </div>
            
            <MirraMonogram className="w-6 h-6 text-marfim/30" />
            
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-marfim/60 mb-2">Social</span>
              <a href={`https://instagram.com/${mirra.contact.instagram}`} target="_blank" rel="noopener noreferrer" className="font-body text-sm hover:text-ambar transition-colors">
                @{mirra.contact.instagram}
              </a>
            </div>
          </div>

          <div className="w-full border-t border-marfim/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-marfim/40">
            <span>&copy; {new Date().getFullYear()} MIRRA. Todos os direitos reservados.</span>
            <span>Ideias ganham forma.</span>
          </div>
          <p className="text-[10px] text-marfim/30 mt-8 font-light text-center w-full">Seus dados são usados apenas para preparar seu atendimento.</p>
        </div>
      </footer>
    </div>
  );
}
