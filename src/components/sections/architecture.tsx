"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Bell, Eye, ShieldCheck } from "lucide-react";
import { Section, Container } from "@/components/site/section";
import { FrameScrubber } from "@/components/site/frame-scrubber";
import { MaskReveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { evaraOne, company } from "@/lib/evara-data";

/**
 * EvaraOne, the platform section.
 *
 * The scroll-scrubbed film is itself the ecosystem visualization (dashboard at
 * the centre, every device in a ring, live connections), so it carries the
 * "one platform" idea on its own. A tight intro sets it up. After it, the
 * substance: what the platform computes per instrument and who gets to see
 * what, both taken from the EvaraOne software requirements specification.
 */
export function Architecture() {
  return (
    <div id="architecture" className="relative bg-white">
      {/* Intro */}
      <Section tone="paper" className="pb-8 sm:pb-12 lg:pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <MaskReveal>
              <p className="font-mono text-[11px] tracking-[0.22em] text-evara-water uppercase sm:text-xs">
                Unified cloud platform
              </p>
            </MaskReveal>
            <h2 className="mt-4 font-heading text-5xl font-semibold tracking-tight text-evara-ink sm:text-6xl lg:text-7xl 2xl:text-8xl">
              EvaraOne
            </h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="mt-6 text-base leading-relaxed text-evara-slate sm:text-lg 2xl:text-xl"
            >
              Every tank, borewell, meter, pump and valve reports into one
              AI-powered platform. Live monitoring, alerts, usage forecasting
              and predictive maintenance, from a single building to an entire
              district.
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="mt-5 font-heading text-sm font-medium tracking-tight text-evara-ink/70 sm:text-base"
            >
              {company.positioning}
            </motion.p>
          </div>
        </Container>
      </Section>

      {/* The film, filling the screen. The plate keeps the labelled diagram
          whole at its own 16:9; the ambient backdrop fills everything around
          it with a blur of the same frame, so on a phone in portrait the space
          above and below the plate is the film's own colour, never white. */}
      <FrameScrubber
        dir="/frames/evaraone"
        count={120}
        pinHeight="300vh"
        pinHeightMobile="220vh"
        plate
        ambient
        fit="contain"
        tint={false}
      />

      {/* What it knows */}
      <Section tone="paper" className="pt-12 sm:pt-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[11px] tracking-[0.22em] text-evara-water uppercase sm:text-xs">
              What it knows
            </p>
            <h3 className="mt-4 text-balance font-heading text-[1.75rem] leading-[1.15] font-semibold tracking-tight text-evara-ink sm:text-4xl">
              Not a dashboard of numbers. A model of your water.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-evara-slate sm:text-lg">
              Each instrument feeds its own analytics. Pick one to see what the
              platform watches, what it works out, and when it speaks up.
            </p>
          </div>

          <Intelligence />
        </Container>
      </Section>

      {/* Who sees what */}
      <Section tone="paper" className="pt-4 sm:pt-6">
        <Container>
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
          >
            <motion.div variants={fadeUp}>
              <p className="font-mono text-[11px] tracking-[0.22em] text-evara-water uppercase sm:text-xs">
                Who sees what
              </p>
              <h3 className="mt-4 text-balance font-heading text-[1.75rem] leading-[1.15] font-semibold tracking-tight text-evara-ink sm:text-4xl">
                One platform. Three levels of trust.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-evara-slate sm:text-lg">
                EvaraOne is multi-tenant by design. A distributor deploying
                fifty societies, and a society watching its own tanks, log into
                the same platform and each see exactly their own scope.
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {evaraOne.capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm text-evara-ink/80 sm:text-base">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-evara-teal" strokeWidth={2.2} aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Access tiers, drawn as nested scope: each ring can see the
                rings inside it. */}
            <motion.ol variants={staggerContainer(0.12)} className="flex flex-col gap-3 lg:pt-10">
              {evaraOne.roles.map((r, i) => (
                <motion.li
                  key={r.name}
                  variants={fadeUp}
                  style={{ marginLeft: `${i * 6}%` }}
                  className={cn(
                    "rounded-2xl border p-5 backdrop-blur-xl transition-colors sm:p-6",
                    i === 0 && "border-evara-navy-700/30 bg-evara-ink text-white",
                    i === 1 && "border-white/70 bg-white/60 text-evara-ink hover:bg-white/80",
                    i === 2 && "border-white/70 bg-white/45 text-evara-ink hover:bg-white/70"
                  )}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h4 className="font-heading text-lg font-semibold sm:text-xl">
                      {r.name}
                    </h4>
                    <span className={cn("text-xs font-medium tracking-wide", i === 0 ? "text-evara-teal-300" : "text-evara-water")}>
                      {r.who}
                    </span>
                  </div>
                  <p className={cn("mt-2 text-sm leading-relaxed sm:text-base", i === 0 ? "text-white/70" : "text-evara-slate")}>
                    {r.detail}
                  </p>
                </motion.li>
              ))}
            </motion.ol>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}

const FACETS = [
  { key: "watches", label: "Watches", icon: Eye },
  { key: "computes", label: "Works out", icon: Activity },
  { key: "alerts", label: "Speaks up when", icon: Bell },
] as const;

function Intelligence() {
  const [active, setActive] = useState(0);
  const current = evaraOne.intelligence[active];

  return (
    <div className="mt-10 sm:mt-12">
      {/* Instrument picker */}
      <div
        role="tablist"
        aria-label="Instrument"
        className="mx-auto flex w-full max-w-xl rounded-full border border-white/70 bg-white/50 p-1 backdrop-blur-xl"
      >
        {evaraOne.intelligence.map((item, i) => (
          <button
            key={item.device}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={cn(
              "relative flex-1 rounded-full px-3 py-2.5 text-sm font-medium transition-colors sm:text-base",
              active === i ? "text-white" : "text-evara-slate hover:text-evara-ink"
            )}
          >
            {active === i && (
              <motion.span
                layoutId="intel-pill"
                className="absolute inset-0 rounded-full bg-evara-ink"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{item.device}</span>
          </button>
        ))}
      </div>

      <div className="relative mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <AnimatePresence mode="wait">
          {FACETS.map((f) => (
            <motion.div
              key={`${current.device}-${f.key}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/70 bg-white/50 p-5 backdrop-blur-xl sm:p-6"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-evara-water-100 text-evara-water">
                <f.icon className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-evara-slate uppercase">
                {f.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-evara-ink sm:text-base">
                {current[f.key]}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
