"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { Bell, Droplets } from "lucide-react";
import { listedProducts } from "@/lib/evara-data";

/**
 * The EvaraOne ecosystem, as a scroll-driven scene built from the real
 * device renders.
 *
 * Replaces an AI-generated film whose labels were invented ("EvaraTlow",
 * "EvaraPlase"). Here every name and category is typed from product data,
 * every image is the matted render used elsewhere on the site, and the
 * choreography is driven by scroll position: the platform settles in the
 * centre, the instruments arrive one by one around it, their links draw in,
 * and data starts to flow. Full viewport, on the page's own ground, so it
 * blends by construction. Reduced motion shows the finished composition.
 */

// Ring geometry, in percent of the stage. Seven instruments, evenly spaced,
// starting top-centre. Narrow stages get a tighter ring so the outer
// instruments stay inside the screen with room for their labels.
function ring(narrow: boolean) {
  const rx = narrow ? 33 : 41;
  const ry = narrow ? 34 : 37;
  return listedProducts.map((p, i, all) => {
    const a = -Math.PI / 2 + (i / all.length) * Math.PI * 2;
    return { product: p, x: 50 + Math.cos(a) * rx, y: 50 + Math.sin(a) * ry, angle: a };
  });
}
type RingItem = ReturnType<typeof ring>[number];

/** Pixel size of the sticky stage, so SVG geometry can be drawn in px and
 *  stroke dashes are not stretched by a non-uniform viewBox. */
function useStageSize(ref: React.RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

export function EcosystemScene() {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const size = useStageSize(stageRef);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative h-[260vh] sm:h-[320vh]">
      <div ref={stageRef} className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Ground: a pool of light and faint rings, the network motif */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 size-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-evara-water/[0.08] blur-[12vmin]" />
          {size.w > 0 && (
            <svg viewBox={`0 0 ${size.w} ${size.h}`} className="absolute inset-0 h-full w-full">
              {[0.16, 0.26, 0.36, 0.46].map((r, i) => (
                <ellipse key={r} cx={size.w / 2} cy={size.h / 2} rx={size.w * r} ry={size.h * r * 0.92} fill="none" stroke="#1c75bc" strokeOpacity={0.09 - i * 0.015} strokeWidth="1" />
              ))}
            </svg>
          )}
        </div>

        <Stage progress={p} reduced={!!reduced} size={size} />
      </div>
    </div>
  );
}

function Stage({ progress, reduced, size }: { progress: MotionValue<number>; reduced: boolean; size: { w: number; h: number } }) {
  const RING = ring(size.w > 0 && size.w < 640);
  // Title
  const titleO = useTransform(progress, [0, 0.06, 0.16, 0.22], [0, 1, 1, 0]);
  const titleY = useTransform(progress, [0, 0.06], [24, 0]);
  // Dashboard
  const dashO = useTransform(progress, [0.04, 0.16], [0, 1]);
  const dashS = useTransform(progress, [0.04, 0.2], [0.82, 1]);
  // Tagline at the end
  const tagO = useTransform(progress, [0.8, 0.9], [0, 1]);
  const tagY = useTransform(progress, [0.8, 0.9], [16, 0]);
  // Alert on the dashboard, late
  const alertO = useTransform(progress, [0.72, 0.8], [0, 1]);
  const alertX = useTransform(progress, [0.72, 0.8], [14, 0]);

  return (
    <div className="relative h-full w-full">
      {/* Opening title */}
      <motion.div
        style={reduced ? { opacity: 0 } : { opacity: titleO, y: titleY }}
        className="pointer-events-none absolute inset-x-0 top-[9%] text-center"
      >
        <p className="font-mono text-[11px] tracking-[0.24em] text-evara-water uppercase sm:text-xs">One platform</p>
        <p className="mt-2 font-heading text-3xl font-semibold tracking-tight text-evara-ink sm:text-5xl">
          Every instrument reports to <span className="text-evara-water">EvaraOne</span>
        </p>
      </motion.div>

      {/* Links, drawn from each instrument to the centre */}
      {size.w > 0 && (
        <svg viewBox={`0 0 ${size.w} ${size.h}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          {RING.map((r, i) => (
            <Link
              key={r.product.slug}
              index={i}
              x={(r.x / 100) * size.w}
              y={(r.y / 100) * size.h}
              cx={size.w / 2}
              cy={size.h / 2}
              progress={progress}
              reduced={reduced}
            />
          ))}
        </svg>
      )}

      {/* The platform, centred */}
      <motion.div
        style={reduced ? undefined : { opacity: dashO, scale: dashS }}
        className="absolute top-1/2 left-1/2 w-[clamp(13rem,36vmin,24rem)] -translate-x-1/2 -translate-y-1/2"
      >
        <Dashboard alertO={alertO} alertX={alertX} reduced={reduced} />
      </motion.div>

      {/* The instruments */}
      {RING.map((r, i) => (
        <Instrument key={r.product.slug} index={i} item={r} progress={progress} reduced={reduced} />
      ))}

      {/* Closing line */}
      <motion.p
        style={reduced ? undefined : { opacity: tagO, y: tagY }}
        className="pointer-events-none absolute inset-x-0 bottom-[6%] text-center font-heading text-base font-medium tracking-tight text-evara-ink/75 sm:text-xl"
      >
        One Platform. Complete Control. Intelligent Water Infrastructure.
      </motion.p>
    </div>
  );
}

function Instrument({
  index,
  item,
  progress,
  reduced,
}: {
  index: number;
  item: RingItem;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const start = 0.16 + index * 0.055;
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.1], [0.5, 1]);
  // Arrive from slightly further out along its own radius.
  const dx = useTransform(progress, [start, start + 0.1], [Math.cos(item.angle) * 40, 0]);
  const dy = useTransform(progress, [start, start + 0.1], [Math.sin(item.angle) * 40, 0]);
  const { product } = item;

  return (
    // Outer div holds the ring position in percent; the inner one carries
    // the scroll-driven motion, so the two transforms never fight.
    <div
      className="absolute w-[clamp(4.5rem,15vmin,9rem)] -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${item.x}%`, top: `${item.y}%` }}
    >
      <motion.div
        style={reduced ? undefined : { opacity, scale, x: dx, y: dy }}
        className="flex w-full flex-col items-center text-center"
      >
        <div className="relative h-[clamp(3.25rem,11vmin,6.5rem)] w-full">
          {product.image && (
            <Image
              src={product.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 144px, 80px"
              className="object-contain drop-shadow-[0_10px_18px_rgba(15,33,56,0.22)]"
            />
          )}
        </div>
        <p className="mt-1.5 font-heading text-[11px] leading-tight font-semibold text-evara-ink sm:text-sm">
          {product.name}
        </p>
        <p className="mt-0.5 hidden text-[10px] leading-tight text-evara-slate sm:block sm:text-[11px]">
          {product.category}
        </p>
      </motion.div>
    </div>
  );
}

function Link({
  index,
  x,
  y,
  cx,
  cy,
  progress,
  reduced,
}: {
  index: number;
  x: number;
  y: number;
  cx: number;
  cy: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const start = 0.42 + index * 0.04;
  const pathLength = useTransform(progress, [start, start + 0.12], [0, 1]);
  const flowO = useTransform(progress, [start + 0.14, start + 0.2], [0, 1]);
  // Gentle curve: control point pulled sideways from the straight line.
  const mx = (x + cx) / 2 + (y - cy) * 0.18;
  const my = (y + cy) / 2 - (x - cx) * 0.18;
  const d = `M${x.toFixed(1)} ${y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${cx} ${cy}`;

  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke="#9cc9ec"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={reduced ? undefined : { pathLength }}
      />
      {/* Data flowing to the centre: a dashed stroke whose offset marches */}
      <motion.path
        d={d}
        fill="none"
        stroke="#00a99d"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeDasharray="3 21"
        className={reduced ? undefined : "eco-flow"}
        style={reduced ? { opacity: 0.9 } : { opacity: flowO }}
      />
    </g>
  );
}

function Dashboard({
  alertO,
  alertX,
  reduced,
}: {
  alertO: MotionValue<number>;
  alertX: MotionValue<number>;
  reduced: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/80 shadow-[0_40px_90px_-40px_rgba(15,33,56,0.45)] backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-evara-line/70 px-3.5 py-2.5 sm:px-4 sm:py-3">
        <span className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="size-2 rounded-full bg-evara-teal shadow-[0_0_0_3px_rgba(0,169,157,0.2)]" />
          <span className="font-heading font-semibold text-evara-ink">EvaraOne</span>
          <span className="text-evara-slate">· Live</span>
        </span>
        <span className="text-[10px] text-evara-slate sm:text-xs">{listedProducts.length} instruments</span>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-3 p-3.5 sm:gap-4 sm:p-4">
        <div className="relative h-16 w-9 overflow-hidden rounded-lg border border-evara-line bg-white sm:h-20 sm:w-11">
          <div className="absolute inset-x-0 bottom-0 h-[78%] bg-gradient-to-t from-evara-water to-evara-water-400" />
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-[10px] text-evara-slate sm:text-xs">
            <Droplets className="size-3" /> Tank level
          </p>
          <p className="font-heading text-xl font-semibold text-evara-ink tabular-nums sm:text-2xl">78%</p>
          <svg viewBox="0 0 120 32" className="mt-1 h-7 w-full" aria-hidden="true">
            <path d="M0 26 C 12 24, 20 14, 32 17 S 52 8, 64 11 S 86 20, 98 14 S 112 4, 120 7" fill="none" stroke="#1c75bc" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <motion.div
        style={reduced ? undefined : { opacity: alertO, x: alertX }}
        className="mx-3.5 mb-3.5 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] leading-snug text-amber-900 sm:mx-4 sm:mb-4 sm:text-xs"
      >
        <Bell className="mt-0.5 size-3 shrink-0" />
        Sector 4 tank projected to run dry in 18 hours. Refill scheduled.
      </motion.div>
    </div>
  );
}
