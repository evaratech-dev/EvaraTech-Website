"use client";

import { motion } from "framer-motion";
import { Section, Container } from "@/components/site/section";
import { MaskReveal, WordReveal } from "@/components/site/reveal";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { company } from "@/lib/evara-data";

/**
 * What the company is for, stated before a single product is shown.
 *
 * Sits directly under the hero so a visitor reads intent before hardware.
 * The vision runs at display size as the one big typographic moment on the
 * light part of the page; mission and values follow as a numbered manifesto
 * rather than a card grid, because a manifesto is read and a grid is scanned.
 */
export function Ideology() {
  return (
    <Section tone="paper" id="ideology" className="overflow-hidden">
      {/* One soft pool of light under the statement */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[10%] left-1/2 size-[70vw] max-w-[1100px] -translate-x-1/2 rounded-full bg-evara-water/[0.07] blur-[8vw]"
      />

      <Container className="relative">
        <div className="mx-auto max-w-5xl text-center">
          <MaskReveal>
            <p className="font-mono text-[11px] tracking-[0.24em] text-evara-water uppercase sm:text-xs">
              Our vision
            </p>
          </MaskReveal>
          <h2 className="mt-6 text-balance font-heading text-[2rem] leading-[1.1] font-semibold tracking-tight text-evara-ink sm:text-5xl lg:text-6xl 2xl:text-7xl">
            <WordReveal text={company.vision} delay={0.05} />
          </h2>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-16 grid grid-cols-1 gap-10 border-t border-evara-line pt-12 sm:mt-20 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:pt-16"
        >
          {/* Mission */}
          <motion.div variants={fadeUp}>
            <p className="font-mono text-[11px] tracking-[0.24em] text-evara-water uppercase sm:text-xs">
              Our mission
            </p>
            <p className="mt-5 font-heading text-2xl leading-snug font-semibold tracking-tight text-evara-ink sm:text-3xl">
              {company.mission}
            </p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-evara-slate sm:text-lg">
              {company.coreIdea}
            </p>
            <p className="mt-8 inline-flex items-center gap-3 font-heading text-sm font-medium tracking-tight text-evara-ink/70">
              <span className="h-px w-8 bg-evara-teal" aria-hidden="true" />
              {company.supportingLine}
            </p>
          </motion.div>

          {/* Values, as a manifesto */}
          <motion.ol variants={staggerContainer(0.09)} className="flex flex-col">
            <li className="pb-3 font-mono text-[11px] tracking-[0.24em] text-evara-water uppercase sm:text-xs">
              How we build
            </li>
            {company.values.map((v, i) => (
              <motion.li
                key={v.title}
                variants={fadeUp}
                className="group grid grid-cols-[3rem_1fr] gap-4 border-t border-evara-line py-6 transition-colors first-of-type:border-t-0 hover:bg-white/40 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:py-7"
              >
                <span className="font-mono text-sm text-evara-slate-400 tabular-nums transition-colors group-hover:text-evara-water sm:text-base">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-evara-ink sm:text-xl">
                    {v.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-evara-slate sm:text-base">
                    {v.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </Container>
    </Section>
  );
}
