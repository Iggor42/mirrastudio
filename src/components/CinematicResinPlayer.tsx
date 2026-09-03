import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SmartImage } from "./SmartImage";

export interface CinematicResinPlayerProps {
  srcMp4?: string;
  srcWebm?: string;
  poster: string;
  alt?: string;
  className?: string;
  objectFit?: "cover" | "contain";
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  priority?: boolean;
  showOverlay?: boolean;
}

/**
 * CinematicResinPlayer
 * 
 * Player cinematográfico para os loops de vídeo da MIRRA
 * (hero-resina.mp4, transparencia.mp4, profundidade.mp4, inclusao.mp4).
 * 
 * - Aguarda a disponibilização dos arquivos de vídeo sem quebrar a UI
 * - Transição suave (cross-fade) do poster para o vídeo quando carregado
 * - Pausa automática fora da viewport via IntersectionObserver
 * - Respeito a prefers-reduced-motion
 * - Fallback resiliente ao poster e SmartImage em caso de erro 404/rede
 */
export function CinematicResinPlayer({
  srcMp4,
  srcWebm,
  poster,
  alt = "Resina cinematográfica MIRRA",
  className,
  objectFit = "cover",
  autoPlay = true,
  loop = true,
  muted = true,
  showOverlay = false,
}: CinematicResinPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // 1. Detectar prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // 2. IntersectionObserver para economia de recursos e performance
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 3. Controle de Play / Pause baseado na visibilidade e disponibilidade
  useEffect(() => {
    if (!videoRef.current || hasVideoError || reducedMotion) return;

    if (isInView && autoPlay && isVideoReady) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Navegador bloqueou autoplay ou arquivo ainda inacessível
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isInView, isVideoReady, autoPlay, hasVideoError, reducedMotion]);

  const handleVideoLoaded = () => {
    setIsVideoReady(true);
    setHasVideoError(false);
  };

  const handleVideoError = () => {
    // Quando o arquivo .mp4 ainda não foi adicionado ou falhou
    setHasVideoError(true);
    setIsVideoReady(false);
  };

  const fitClass = objectFit === "cover" ? "object-cover" : "object-contain";

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden bg-areia select-none", className)}
    >
      {/* Camada 1: Poster base resiliente com SmartImage (sempre presente para evitar layout shifts e flashes) */}
      <SmartImage
        src={poster}
        alt={alt}
        className={cn(
          "w-full h-full transition-opacity duration-1000",
          fitClass,
          isVideoReady && !hasVideoError && !reducedMotion ? "opacity-0" : "opacity-100"
        )}
      />

      {/* Camada 2: Elemento de Vídeo com Crossfade */}
      {!reducedMotion && srcMp4 && !hasVideoError && (
        <video
          ref={videoRef}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoaded}
          onCanPlay={handleVideoLoaded}
          onError={handleVideoError}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000 pointer-events-none",
            fitClass,
            isVideoReady ? "opacity-100" : "opacity-0"
          )}
        >
          <source src={srcMp4} type="video/mp4" />
          {srcWebm && <source src={srcWebm} type="video/webm" />}
        </video>
      )}

      {/* Camada 3: Overlay sutil se solicitado */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-grafite/40 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  );
}
