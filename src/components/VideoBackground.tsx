import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VideoBackgroundProps {
  srcMp4?: string;
  poster?: string;
  className?: string;
}

export function VideoBackground({ srcMp4, poster, className }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reducedMotion || !srcMp4) {
    return (
      <div
        className={cn("bg-cover bg-center bg-areia", className)}
        style={poster ? { backgroundImage: `url(${poster})` } : undefined}
        role="img"
        aria-label="Resina MIRRA"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={cn("w-full h-full object-cover", className)}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
    >
      <source src={srcMp4} type="video/mp4" />
    </video>
  );
}

