"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Section, Container } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { differentiators, deployments } from "@/lib/evara-data";

export function Proof() {
  return (
    <Section tone="paper" id="proof">
      <Container>
        <SectionHeading
          kicker="Why EvaraTech"
          title="Engineered to be trusted with infrastructure."
          description="Retrofit-first, patented, and already running in the field."
        />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {differentiators.map((d) => (
              <motion.div
                key={d.title}
                variants={fadeUp}
                className="rounded-xl border border-white/70 bg-white/45 p-5 backdrop-blur-xl transition-colors hover:bg-white/60"
              >
                <h3 className="font-heading text-base font-semibold text-evara-ink">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-evara-slate">
                  {d.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="rounded-2xl border border-white/70 bg-white/40 p-6 backdrop-blur-xl sm:p-7"
          >
            <p className="text-xs font-semibold tracking-[0.16em] text-evara-water uppercase">
              Deployed today
            </p>
            <ul className="mt-5 flex flex-col gap-5">
              {deployments.map((d) => (
                <li key={d.place} className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 size-4 shrink-0 text-evara-water"
                    strokeWidth={1.8}
                  />
                  <div>
                    <p className="text-sm font-semibold text-evara-ink">
                      {d.place}
                    </p>
                    <p className="mt-0.5 text-sm text-evara-slate">{d.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
