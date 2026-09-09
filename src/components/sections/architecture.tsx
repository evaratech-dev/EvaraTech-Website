"use client";

import { motion } from "framer-motion";
import { Section, Container } from "@/components/site/section";
import { FrameScrubber } from "@/components/site/frame-scrubber";
import { CountUp } from "@/components/site/count-up";
import { MaskReveal } from "@/components/site/reveal";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { secondaryMetrics, liveMetrics, company } from "@/lib/evara-data";

/**
 * EvaraOne — the platform section.
 *
 * The scroll-scrubbed clip is itself the ecosystem visualization (dashboard at
 * the centre, every device in a ring, live connections), so it carries the
 * "one platform" idea on its own. A tight intro sets it up; a slim metrics
 * strip closes it. No separate flow diagram — the footage already is one.
 */
export function Architecture() {
  return (
    <div id="architecture" className="relative bg-white">
      {/* Local tints only — the scrubber blends to white, so a full ambient
          field at its edge would seam. Clipped in their own layer so their
          off-canvas overflow never widens the page on mobile, while the
          section itself stays a non-scroll container (the scrubber pins). */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-24 right-[8%] size-[420px] rounded-full bg-evara-water/10 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-40 left-[6%] size-[380px] rounded-full bg-evara-teal/10 blur-[110px]"
        />
      </div>

      {/* Intro */}
      <Section tone="paper" className="pb-6 sm:pb-8 lg:pb-10">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <MaskReveal>
              <p className="font-mono text-[11px] tracking-[0.22em] text-evara-water uppercase">
                Unified cloud platform
              </p>
            </MaskReveal>
            <h2 className="mt-4 font-heading text-5xl font-semibold tracking-tight text-evara-ink sm:text-6xl lg:text-7xl">
              EvaraOne
            </h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="mt-6 text-base leading-relaxed text-evara-slate sm:text-lg"
            >
              Every tank, borewell, meter, pump and valve reports into one
              AI-powered platform — live monitoring, alerts with voice output,
              usage forecasting and predictive maintenance, from a single
              building to an entire district.
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="mt-5 font-heading text-sm font-medium tracking-tight text-evara-ink/70"
            >
              {company.positioning}
            </motion.p>
          </div>

          <motion.dl
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {liveMetrics.map((m) => (
              <motion.div key={m.label} variants={fadeUp} className="text-center">
                <dd className="font-heading text-2xl font-semibold text-evara-ink sm:text-3xl">
                  <CountUp
                    value={m.value}
                    decimals={m.decimals ?? 0}
                    suffix={m.suffix}
                  />
                </dd>
                <dt className="mt-1 text-xs leading-snug text-evara-slate">
                  {m.label}
                </dt>
              </motion.div>
            ))}
          </motion.dl>
        </Container>
      </Section>

      {/* Scroll-scrubbed ecosystem film, framed in a centred card at its own
          16:9 ratio so every device and label stays fully visible — a
          labelled diagram must never be cropped by a full-bleed crop. */}
      <FrameScrubber
        dir="/frames/evaraone"
        count={120}
        pinHeight="300vh"
        framed
        tint={false}
      />

      {/* Closing metrics strip */}
      <Section tone="paper" className="pt-6 sm:pt-8">
        <Container>
          <motion.dl
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {secondaryMetrics.map((m) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                className="rounded-xl border border-white/70 bg-white/40 px-5 py-4 backdrop-blur-xl"
              >
                <dt className="text-sm text-evara-slate">{m.label}</dt>
                <dd className="mt-1 font-heading text-2xl font-semibold text-evara-ink">
                  {m.value}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </Container>
      </Section>
    </div>
  );
}
