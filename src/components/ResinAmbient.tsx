import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BubbleData {
  x: number; y: number; radius: number; depth: number;
  phaseX: number; phaseY: number; speed: number; brightness: number;
}

// Calibrado na macro do hero (hero-resina.jpg). Não reutilizar em outras imagens.
const PRIMARY_BUBBLES: BubbleData[] = [
  { x: 0.342, y: 0.582, radius: 24, depth: 0.95, phaseX: 0.2, phaseY: 1.1, speed: 1.0, brightness: 1.0 },
  { x: 0.531, y: 0.412, radius: 22, depth: 0.90, phaseX: 1.5, phaseY: 0.7, speed: 0.9, brightness: 0.95 },
  { x: 0.450, y: 0.638, radius: 18, depth: 0.85, phaseX: 2.7, phaseY: 2.3, speed: 1.1, brightness: 0.9 },
  { x: 0.505, y: 0.505, radius: 17, depth: 0.88, phaseX: 0.9, phaseY: 3.1, speed: 0.85, brightness: 0.92 },
  { x: 0.578, y: 0.490, radius: 15, depth: 0.75, phaseX: 3.4, phaseY: 1.4, speed: 1.05, brightness: 0.88 },
  { x: 0.690, y: 0.528, radius: 17, depth: 0.82, phaseX: 4.2, phaseY: 0.5, speed: 0.95, brightness: 0.9 },
  { x: 0.785, y: 0.395, radius: 18, depth: 0.78, phaseX: 1.8, phaseY: 2.8, speed: 0.9, brightness: 0.9 },
  { x: 0.672, y: 0.334, radius: 15, depth: 0.70, phaseX: 2.1, phaseY: 1.9, speed: 1.0, brightness: 0.85 },
  { x: 0.622, y: 0.318, radius: 11, depth: 0.65, phaseX: 3.8, phaseY: 0.8, speed: 1.2, brightness: 0.8 },
  { x: 0.631, y: 0.428, radius: 12, depth: 0.60, phaseX: 0.5, phaseY: 4.1, speed: 1.1, brightness: 0.82 },
  { x: 0.582, y: 0.665, radius: 14, depth: 0.72, phaseX: 4.7, phaseY: 1.2, speed: 0.88, brightness: 0.85 },
  { x: 0.510, y: 0.735, radius: 13, depth: 0.68, phaseX: 1.2, phaseY: 2.5, speed: 0.95, brightness: 0.8 },
  { x: 0.418, y: 0.798, radius: 10, depth: 0.55, phaseX: 5.1, phaseY: 3.3, speed: 1.15, brightness: 0.75 },
  { x: 0.355, y: 0.812, radius: 9, depth: 0.50, phaseX: 2.9, phaseY: 0.2, speed: 1.2, brightness: 0.7 },
  { x: 0.285, y: 0.865, radius: 8, depth: 0.45, phaseX: 3.1, phaseY: 4.5, speed: 1.0, brightness: 0.65 },
  { x: 0.245, y: 0.700, radius: 9, depth: 0.52, phaseX: 0.4, phaseY: 2.9, speed: 1.1, brightness: 0.7 },
  { x: 0.892, y: 0.278, radius: 8, depth: 0.40, phaseX: 4.0, phaseY: 1.7, speed: 1.3, brightness: 0.68 },
  { x: 0.720, y: 0.440, radius: 5, depth: 0.35, phaseX: 1.1, phaseY: 3.4, speed: 1.25, brightness: 0.6 },
  { x: 0.610, y: 0.580, radius: 6, depth: 0.40, phaseX: 2.8, phaseY: 2.1, speed: 1.1, brightness: 0.65 },
  { x: 0.480, y: 0.580, radius: 7, depth: 0.48, phaseX: 3.9, phaseY: 0.9, speed: 0.95, brightness: 0.7 },
  { x: 0.830, y: 0.460, radius: 6, depth: 0.32, phaseX: 0.8, phaseY: 4.2, speed: 1.3, brightness: 0.55 },
];

const LOOP = 14;
const DOLLY = 0.048;
const LIGHT = 1.0;
const CAUSTIC = 1.0;
const DRIFT = 1.0;

interface ResinAmbientProps {
  poster?: string;
  className?: string;
}

export function ResinAmbient({ poster = "/assets/posters/hero-resina.jpg", className }: ResinAmbientProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const img = new Image();
    img.src = poster;
    img.onload = () => { imageRef.current = img; setLoaded(true); };
  }, [poster, reducedMotion]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.floor(width * dpr);
          canvas.height = Math.floor(height * dpr);
        }
      }
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, [loaded]);

  useEffect(() => {
    if (reducedMotion || !loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let running = true;
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let t = 0;

    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible) last = performance.now();
    }, { threshold: 0.05 });
    if (containerRef.current) io.observe(containerRef.current);

    const draw = (width: number, height: number) => {
      const progress = (t % LOOP) / LOOP;
      const angle = progress * Math.PI * 2;
      ctx.save();
      const dollyCycle = (1 - Math.cos(angle)) * 0.5;
      const scale = 1 + DOLLY * dollyCycle;
      const panX = Math.sin(angle) * 0.006 * width;
      const panY = Math.sin(angle * 2) * 0.003 * height;
      const pivotX = width * 0.56;
      const pivotY = height * 0.48;
      ctx.translate(pivotX + panX, pivotY + panY);
      ctx.scale(scale, scale);
      ctx.translate(-pivotX, -pivotY);

      const img = imageRef.current;
      if (img) {
        const s = Math.max(width / img.width, height / img.height);
        const dw = img.width * s;
        const dh = img.height * s;
        ctx.drawImage(img, (width - dw) / 2, (height - dh) / 2, dw, dh);
      }

      const sweepX = width * (-0.2 + 1.5 * progress);
      const sweepY = height * 0.35;
      const sweepWidth = width * 0.55;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const lg = ctx.createRadialGradient(sweepX, sweepY, 10, sweepX, sweepY, sweepWidth);
      const baseAlpha = 0.45 * LIGHT;
      lg.addColorStop(0.0, `rgba(255,245,225,${0.40 * baseAlpha})`);
      lg.addColorStop(0.3, `rgba(240,195,140,${0.28 * baseAlpha})`);
      lg.addColorStop(0.65, `rgba(168,117,79,${0.14 * baseAlpha})`);
      lg.addColorStop(1.0, "rgba(46,58,51,0)");
      ctx.fillStyle = lg;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const rimPos = sweepX / width;
      const rimIntensity = Math.max(0, 1 - Math.abs(rimPos - 0.48) * 1.8) * LIGHT;
      if (rimIntensity > 0.01) {
        ctx.beginPath();
        ctx.moveTo(width * 0.10, height * 0.95);
        ctx.bezierCurveTo(width * 0.28, height * 0.52, width * 0.48, height * 0.30, width * 0.85, height * 0.18);
        ctx.lineWidth = 14 * (width / 1000);
        ctx.strokeStyle = `rgba(255,235,195,${0.35 * rimIntensity})`;
        ctx.filter = "blur(6px)";
        ctx.stroke();
        ctx.lineWidth = 4 * (width / 1000);
        ctx.strokeStyle = `rgba(255,255,245,${0.75 * rimIntensity})`;
        ctx.filter = "blur(1.5px)";
        ctx.stroke();
        ctx.filter = "none";
      }
      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const cPhase = angle * CAUSTIC;
      for (let c = 0; c < 5; c++) {
        const p = cPhase + (c * Math.PI * 2) / 5;
        const cx = width * (0.45 + 0.35 * Math.sin(p * 0.7 + c));
        const cy = height * (0.35 + 0.35 * Math.cos(p * 0.5 + c * 0.8));
        const crx = width * (0.18 + 0.06 * Math.sin(p + c));
        const cry = height * (0.12 + 0.04 * Math.cos(p * 1.2));
        const rot = 0.4 + 0.2 * Math.sin(p * 0.4);
        const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(crx, cry));
        const cAlpha = (0.07 + 0.04 * Math.sin(p)) * LIGHT;
        cg.addColorStop(0.0, `rgba(225,160,95,${cAlpha * 1.2})`);
        cg.addColorStop(0.5, `rgba(168,117,79,${cAlpha * 0.6})`);
        cg.addColorStop(1.0, "rgba(0,0,0,0)");
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.scale(1, cry / crx);
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.arc(0, 0, crx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();

      const scaleRef = width / 1000;
      for (let i = 0; i < PRIMARY_BUBBLES.length; i++) {
        const b = PRIMARY_BUBBLES[i];
        const driftX = Math.sin(angle * b.speed + b.phaseX) * (1.8 * DRIFT * b.depth * scaleRef);
        const driftY = Math.cos(angle * b.speed + b.phaseY) * (1.2 * DRIFT * b.depth * scaleRef);
        const bx = b.x * width + driftX;
        const by = b.y * height + driftY;
        const br = b.radius * scaleRef;
        const lightPass = Math.max(0, 1 - (Math.abs(bx - sweepX) / width) * 3.5);
        if (lightPass > 0.01) {
          ctx.save();
          ctx.globalCompositeOperation = "lighter";
          const glow = ctx.createRadialGradient(bx - br * 0.25, by - br * 0.25, 0, bx, by, br * 1.3);
          const glowAlpha = 0.22 * lightPass * b.brightness * LIGHT;
          glow.addColorStop(0, `rgba(255,240,210,${glowAlpha * 1.5})`);
          glow.addColorStop(0.4, `rgba(230,165,95,${glowAlpha})`);
          glow.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(bx, by, br * 1.3, 0, Math.PI * 2);
          ctx.fill();
          const starX = bx - br * 0.32;
          const starY = by - br * 0.32;
          const starSize = (1.5 + 2.5 * lightPass) * scaleRef;
          const sg = ctx.createRadialGradient(starX, starY, 0, starX, starY, starSize * 4);
          sg.addColorStop(0.0, `rgba(255,255,255,${0.85 * lightPass})`);
          sg.addColorStop(0.2, `rgba(255,220,160,${0.60 * lightPass})`);
          sg.addColorStop(1.0, "rgba(255,220,160,0)");
          ctx.fillStyle = sg;
          ctx.beginPath();
          ctx.arc(starX, starY, starSize * 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      ctx.restore();
    };

    const frame = (now: number) => {
      if (!running) return;
      const delta = Math.min(now - last, 200);
      last = now;
      if (visible && canvas.width > 0 && canvas.height > 0) {
        t = (t + delta / 1000) % LOOP;
        draw(canvas.width, canvas.height);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [reducedMotion, loaded]);

  if (reducedMotion) {
    return (
      <div
        className={cn("bg-cover bg-center", className)}
        style={{ backgroundImage: `url(${poster})` }}
        role="img"
        aria-label="Resina em macro: luz atravessando a matéria"
      />
    );
  }

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden bg-areia", className)}>
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${poster})` }} />
      {loaded && <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />}
    </div>
  );
}
