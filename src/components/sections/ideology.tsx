"use client";

import { motion } from "framer-motion";
import { Section, Container } from "@/components/site/section";
import { MaskReveal } from "@/components/site/reveal";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { company } from "@/lib/evara-data";

/**
 * What the company is for, stated plainly.
 *
 * The rest of the page argues from devices and deployments; this is the one
 * section that argues from intent. Vision and mission lead at display size,
 * then the values that decide how the products get built.
 */
export function Ideology() {
  return (
    <Section tone="lab" id="ideology">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <MaskReveal>
            <p className="font-mono text-[11px] tracking-[0.22em] text-evara-water uppercase">
              Why we build
            </p>
          </MaskReveal>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mt-5 text-balance font-heading text-2xl leading-[1.25] font-semibold tracking-tight text-evara-ink sm:text-4xl"
          >
            {company.vision}
          </motion.p>
        </div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
        >
          <motion.div variants={fadeUp}>
            <p className="text-xs font-semibold tracking-[0.16em] text-evara-water uppercase">
              Our mission
            </p>
            <p className="mt-4 text-base leading-relaxed text-evara-slate">
              {company.mission}
            </p>
            <p className="mt-6 font-heading text-sm font-medium tracking-tight text-evara-ink/70">
              {company.supportingLine}
            </p>
          </motion.div>

          <motion.dl
            variants={staggerContainer(0.07)}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {company.values.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="rounded-xl border border-white/70 bg-white/45 p-5 backdrop-blur-xl"
              >
                <dt className="font-heading text-sm font-semibold text-evara-ink">
                  {v.title}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-evara-slate">
                  {v.detail}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </Container>
    </Section>
  );
}
