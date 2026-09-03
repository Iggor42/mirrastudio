import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface CTAProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
  external?: boolean;
}

export function CTA({ href, children, variant = "primary", className, external }: CTAProps) {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 font-body uppercase tracking-widest text-[11px] font-medium";
  
  const variants = {
    primary: "border border-grafite text-grafite hover:bg-grafite hover:text-marfim py-3 px-6",
    secondary: "text-grafite border-b border-grafite/30 hover:border-grafite pb-1",
    dark: "border border-marfim text-marfim hover:bg-marfim hover:text-grafite py-3 px-6"
  };

  const isExternal = external || href.startsWith("http");
  
  const handleClick = () => {
    trackEvent('cta_clicked', { href, variant });
    if (isExternal || href.includes('intent=')) {
      trackEvent('handoff_to_site', { href });
    }
  };
  
  if (isExternal) {
    return (
      <a 
        href={href} onClick={handleClick} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={cn(baseStyles, variants[variant], className)}
        aria-label={typeof children === 'string' ? children : 'Link externo'}
      >
        {children}
      </a>
    );
  }

  return (
    <Link 
      to={href} onClick={handleClick} 
      className={cn(baseStyles, variants[variant], className)}
    >
      {children}
    </Link>
  );
}
