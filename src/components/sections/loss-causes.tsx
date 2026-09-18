"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section, Container } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { problemScale, products } from "@/lib/evara-data";

/**
 * Names each way water disappears, then names the instrument that closes it.
 *
 * Every row carries a small animated scene of the leak itself: a pipe
 * seeping underground, a dial nobody reads, a tank spilling over, a borewell
 * pumped blind. The device chip arrives after the scene plays, so the eye
 * reads problem then answer, in that order, every time.
 */
export function LossCauses() {
  return (
    <Section tone="paper" id="causes">
      <Container>
        <SectionHeading
          kicker="Where it goes"
          title="Four leaks in the system. Four instruments."
          description="Loss is not one problem, it is four. Each one disappears the moment the infrastructure can report on itself."
        />

        <motion.ul
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 divide-y divide-evara-line border-y border-evara-line"
        >
          {problemScale.causes.map((cause, i) => {
            const device = products.find((p) => p.name === cause.device);
            const Scene = SCENES[i];
            return (
              <motion.li
                key={cause.label}
                variants={fadeUp}
                className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-4 py-7 sm:grid-cols-[auto_9rem_1fr_auto] sm:items-center sm:gap-8 sm:py-8"
              >
                <span className="font-heading text-sm font-semibold text-evara-slate-400 tabular-nums">
                  0{i + 1}
                </span>

                <div className="col-span-2 sm:col-span-1">
                  <Scene />
                </div>

                <div className="col-start-2 sm:col-start-3">
                  <h3 className="font-heading text-lg font-semibold text-evara-ink sm:text-xl">
                    {cause.label}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-evara-slate sm:text-base">
                    {cause.detail}
                  </p>
                </div>

                {device && (
                  <motion.div
                    variants={{ hidden: { opacity: 0, x: 12 }, show: { opacity: 1, x: 0, transition: { delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
                    className="col-start-2 sm:col-start-4"
                  >
                    <Link
                      href={`/products/${device.slug}`}
                      className="inline-flex items-center gap-2 self-start rounded-full border border-white/70 bg-white/45 px-4 py-2 text-sm font-medium text-evara-ink backdrop-blur-xl transition-colors hover:border-evara-water-300 hover:bg-white/65 group-hover:border-evara-teal/50"
                    >
                      <span className="size-1.5 rounded-full bg-evara-teal" />
                      Closed by {device.name}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </motion.div>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </Section>
  );
}

/* ---------- Scenes: 144x72 each, one per cause, in data order ---------- */

const EASE = [0.16, 1, 0.3, 1] as const;
const frame = "h-[4.5rem] w-full max-w-[9rem] text-evara-ink";

/** 01 Physical leakage: a buried pipe, water seeping out and pooling. */
function Leak() {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 144 72" className={frame} aria-hidden="true">
      <rect x="0" y="34" width="144" height="38" fill="#eef2f8" />
      <rect x="8" y="20" width="128" height="12" rx="3" fill="#33506c" />
      <rect x="8" y="20" width="128" height="4" rx="2" fill="#5c6b80" />
      {!reduced &&
        [0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx="72"
            r="2.2"
            fill="#1c75bc"
            initial={{ cy: 32, opacity: 0 }}
            animate={{ cy: [32, 56], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.55, ease: "easeIn" }}
          />
        ))}
      <motion.ellipse
        cx="72"
        cy="58"
        fill="#1c75bc"
        fillOpacity="0.35"
        initial={{ rx: 4, ry: 1.5 }}
        animate={reduced ? undefined : { rx: [4, 30], ry: [1.5, 6] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </svg>
  );
}

/** 02 Unmetered: a dial that keeps turning while the reading stays blank. */
function Dial() {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 144 72" className={frame} aria-hidden="true">
      <circle cx="40" cy="36" r="28" fill="#ffffff" stroke="#d4dbe6" strokeWidth="2" />
      <circle cx="40" cy="36" r="21" fill="none" stroke="#e4e9f0" strokeWidth="1" strokeDasharray="2 4" />
      <motion.line
        x1="40"
        y1="36"
        x2="40"
        y2="17"
        stroke="#1c75bc"
        strokeWidth="2.2"
        strokeLinecap="round"
        style={{ transformOrigin: "40px 36px" }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <circle cx="40" cy="36" r="2.5" fill="#0f2138" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={78 + i * 12} y="26" width="10" height="20" rx="2" fill="#0f2138" />
      ))}
      <text x="80" y="60" fontSize="7" fill="#8a97a8">read: never</text>
    </svg>
  );
}

/** 03 Overflow: the level climbs past the rim and spills down the side. */
function Overflow() {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 144 72" className={frame} aria-hidden="true">
      <rect x="44" y="10" width="56" height="52" rx="4" fill="#ffffff" stroke="#d4dbe6" strokeWidth="2" />
      <motion.rect
        x="46"
        width="52"
        rx="2"
        fill="#4fa0dd"
        initial={{ y: 60, height: 0 }}
        animate={reduced ? { y: 12, height: 48 } : { y: [58, 12, 12, 58], height: [2, 48, 48, 2] }}
        transition={{ duration: 5, repeat: Infinity, times: [0, 0.55, 0.8, 1], ease: "easeInOut" }}
      />
      {!reduced &&
        [0, 1].map((i) => (
          <motion.path
            key={i}
            d={i ? "M100 12 q 8 4 6 16 q -2 10 2 22" : "M44 12 q -8 4 -6 16 q 2 10 -2 22"}
            fill="none"
            stroke="#1c75bc"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity, times: [0.5, 0.65, 0.8, 0.9], ease: "easeInOut" }}
          />
        ))}
      <text x="4" y="66" fontSize="7" fill="#8a97a8">nobody on the roof</text>
    </svg>
  );
}

/** 04 Blind groundwater: a well, a pump running, the level nobody can see. */
function Borewell() {
  const reduced = useReducedMotion();
  return (
    <svg viewBox="0 0 144 72" className={frame} aria-hidden="true">
      <rect x="0" y="22" width="144" height="50" fill="#eef2f8" />
      <rect x="62" y="6" width="20" height="14" rx="2" fill="#33506c" />
      <rect x="66" y="20" width="12" height="52" fill="#ffffff" stroke="#d4dbe6" strokeWidth="1.5" />
      <motion.rect
        x="67.5"
        width="9"
        fill="#4fa0dd"
        initial={{ y: 44, height: 27 }}
        animate={reduced ? undefined : { y: [44, 62, 44], height: [27, 9, 27] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="72"
        cy="13"
        r="2.5"
        fill="#e0a400"
        animate={reduced ? undefined : { opacity: [1, 0.2, 1] }}
        transition={{ duration: 0.9, repeat: Infinity }}
      />
      <text x="88" y="50" fontSize="7" fill="#8a97a8">level: ?</text>
    </svg>
  );
}

const SCENES = [Leak, Dial, Overflow, Borewell];
