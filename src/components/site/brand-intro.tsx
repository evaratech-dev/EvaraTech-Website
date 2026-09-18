"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { WaterSurface, type DropEvent } from "@/components/site/water-surface";

/**
 * Brand intro, first visit of a session.
 *
 * The idea is the company's: a drop falls, it is measured, and the brand
 * comes out of the measurement. The whole curtain is a simulated water
 * surface (see water-surface.tsx); the drop really disturbs it.
 *
 *   0.00s  still water, lit from the upper left, a slow caustic shimmer
 *   0.35s  a single luminous drop lands at the centre; rings spread, then
 *          two smaller drops land off-centre and their rings interfere
 *   0.95s  the mark rises from the impact point, the wordmark unmasks letter
 *          by letter beside it
 *   1.45s  the tagline settles beneath
 *   0.60s  a water level fills along the base while a readout counts to 100
 *   2.90s  the curtain lifts, a waterline trailing its lower edge, and the
 *          hero is already playing underneath
 *
 * Plays once per browser session and never under reduced motion. The page
 * loads and renders normally behind it; nothing waits.
 */
const KEY = "evara-intro-seen";
const EASE = [0.16, 1, 0.3, 1] as const;
const HOLD_MS = 2900;

const DROPS: DropEvent[] = [
  { t: 0.35, x: 0.5, y: 0.5, r: 0.042, a: 1.7 },
  { t: 0.95, x: 0.36, y: 0.42, r: 0.026, a: 0.9 },
  { t: 1.2, x: 0.66, y: 0.6, r: 0.022, a: 0.8 },
];

const WORD = ["E", "v", "a", "r", "a", "T", "e", "c", "h"];

export function BrandIntro() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);
  const startRef = useRef(0);

  useEffect(() => {
    if (reduced) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage blocked: still play once */
    }
    startRef.current = performance.now();
    setShow(true);
    const t = setTimeout(() => setShow(false), HOLD_MS);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[200] overflow-hidden bg-evara-navy-950"
          aria-hidden="true"
        >
          {/* The water */}
          <WaterSurface events={DROPS} start={startRef.current} className="absolute inset-0 h-full w-full" />
          <div className="hero-grain pointer-events-none absolute inset-0 opacity-50" />

          {/* The drop, then the mark rising from where it landed */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex flex-col items-center">
              <Drop />

              <div className="relative flex items-center gap-4 sm:gap-5">
                <motion.span
                  initial={{ opacity: 0, scale: 0.3, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
                  className="relative block size-14 sm:size-[4.5rem]"
                >
                  <span className="absolute inset-[-40%] rounded-full bg-evara-water/30 blur-2xl" />
                  <Image src="/images/brand/evaratech-logo.png" alt="" fill sizes="72px" priority className="relative object-contain" />
                </motion.span>

                <span className="flex overflow-hidden font-heading text-4xl font-semibold tracking-tight sm:text-6xl">
                  {WORD.map((ch, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: "115%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.7, delay: 1.02 + i * 0.045, ease: EASE }}
                      className={i >= 5 ? "block text-evara-water-400" : "block text-white"}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.45, ease: EASE }}
                className="mt-5 font-mono text-[11px] tracking-[0.3em] text-evara-teal-300/90 uppercase sm:text-xs"
              >
                Your universe of sustainable solutions
              </motion.p>
            </div>
          </div>

          <Level />

          {/* Waterline that trails the curtain's lower edge as it lifts */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-evara-water via-evara-teal-300 to-evara-water opacity-80" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** One luminous drop falling to the centre and vanishing on impact. */
function Drop() {
  return (
    <motion.svg
      viewBox="0 0 24 32"
      className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-6 -translate-x-1/2"
      initial={{ y: "-48vh", opacity: 0, scaleY: 1.15 }}
      animate={{ y: ["-48vh", "-1vh", "-1vh"], opacity: [0, 1, 0], scaleY: [1.15, 1, 0.5] }}
      transition={{ duration: 0.36, times: [0, 0.94, 1], ease: [0.55, 0, 1, 1] }}
    >
      <defs>
        <radialGradient id="drop-g" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#dcf5f2" />
          <stop offset="0.5" stopColor="#4fa0dd" />
          <stop offset="1" stopColor="#1c75bc" />
        </radialGradient>
      </defs>
      <path d="M12 1 C 12 1, 2 14, 2 20 a10 10 0 0 0 20 0 C 22 14, 12 1, 12 1 Z" fill="url(#drop-g)" />
      <ellipse cx="9" cy="17" rx="2" ry="3" fill="#ffffff" fillOpacity="0.55" />
    </motion.svg>
  );
}

/** A water level filling along the base, with a readout that counts to 100. */
function Level() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const c = animate(0, 100, {
      duration: 1.7,
      delay: 0.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => {
        el.textContent = String(Math.round(n)).padStart(3, "0");
      },
    });
    return () => c.stop();
  }, []);

  return (
    <div className="absolute inset-x-0 bottom-[12%] flex flex-col items-center gap-3 sm:bottom-[14%]">
      <div className="relative h-px w-48 overflow-hidden bg-white/10 sm:w-64">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.7, delay: 0.6, ease: EASE }}
          className="absolute inset-0 origin-left bg-gradient-to-r from-evara-water via-evara-water-400 to-evara-teal-300"
        />
        <motion.span
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.7, delay: 0.6, ease: EASE }}
          className="absolute top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-evara-teal-300 shadow-[0_0_12px_2px_rgba(138,223,215,0.7)]"
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-white/45 uppercase"
      >
        <span>Level</span>
        <span ref={ref} className="text-evara-teal-300/90 tabular-nums">000</span>
        <span>%</span>
      </motion.p>
    </div>
  );
}
