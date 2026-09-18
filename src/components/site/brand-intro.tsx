"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";

/**
 * Brand intro, first visit of a session.
 *
 * The idea is the company's: a drop falls, it is measured, and the brand
 * comes out of the measurement.
 *
 *   0.00s  a single luminous drop falls to the centre
 *   0.55s  it lands; ultrasonic ripples ring outward (the EvaraTank pulse)
 *   0.65s  the mark rises from the impact point, the wordmark unmasks letter
 *          by letter beside it
 *   1.15s  the tagline settles beneath
 *   0.60s  a water level fills along the base while a readout counts to 100
 *   2.45s  the curtain lifts, a waterline trailing its lower edge, and the
 *          hero is already playing underneath
 *
 * Plays once per browser session and never under reduced motion. The page
 * loads and renders normally behind it; nothing waits.
 */
const KEY = "evara-intro-seen";
const EASE = [0.16, 1, 0.3, 1] as const;
const HOLD_MS = 2450;

const WORD = ["E", "v", "a", "r", "a", "T", "e", "c", "h"];

export function BrandIntro() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduced) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage blocked: still play once */
    }
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
          {/* Ground: the same light the site lives in, kept dim */}
          <div className="absolute top-[-20%] right-[-10%] size-[70vmin] rounded-full bg-evara-water/[0.22] blur-[18vmin]" />
          <div className="absolute bottom-[-25%] left-[-10%] size-[60vmin] rounded-full bg-evara-teal/[0.16] blur-[18vmin]" />
          <Rings />
          <div className="hero-grain pointer-events-none absolute inset-0 opacity-60" />

          {/* The drop, the ripples, the mark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex flex-col items-center">
              <Ripples />
              <Drop />

              <div className="relative flex items-center gap-4 sm:gap-5">
                <motion.span
                  initial={{ opacity: 0, scale: 0.3, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.65, ease: EASE }}
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
                      transition={{ duration: 0.7, delay: 0.72 + i * 0.045, ease: EASE }}
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
                transition={{ duration: 0.7, delay: 1.15, ease: EASE }}
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

/** Faint concentric ellipses, the network motif, drawing outward. */
function Rings() {
  return (
    <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      {[90, 170, 250, 330].map((r, i) => (
        <motion.ellipse
          key={r}
          cx="500"
          cy="300"
          rx={r * 1.6}
          ry={r}
          fill="none"
          stroke="#9cc9ec"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.12 - i * 0.02 }}
          transition={{ duration: 1.6, delay: 0.5 + i * 0.12, ease: EASE }}
        />
      ))}
    </svg>
  );
}

/** One luminous drop falling to the centre and vanishing on impact. */
function Drop() {
  return (
    <motion.svg
      viewBox="0 0 24 32"
      className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-6 -translate-x-1/2"
      initial={{ y: "-46vh", opacity: 0, scaleY: 1.15 }}
      animate={{ y: ["-46vh", "-2vh", "-2vh"], opacity: [0, 1, 0], scaleY: [1.15, 1, 0.6] }}
      transition={{ duration: 0.62, times: [0, 0.9, 1], ease: [0.5, 0, 1, 1] }}
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

/** Ripples from the impact point: the ultrasonic pulse, rendered as rings. */
function Ripples() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.2 }}
          animate={{ opacity: [0, 0.55, 0], scale: [0.2, 1, 1.5] }}
          transition={{ duration: 1.5, delay: 0.55 + i * 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-1/2 size-[42vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-evara-teal-300/80"
        />
      ))}
    </div>
  );
}

/** A water level filling along the base, with a readout that counts to 100. */
function Level() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const c = animate(0, 100, {
      duration: 1.6,
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
          transition={{ duration: 1.6, delay: 0.6, ease: EASE }}
          className="absolute inset-0 origin-left bg-gradient-to-r from-evara-water via-evara-water-400 to-evara-teal-300"
        />
        <motion.span
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.6, delay: 0.6, ease: EASE }}
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
