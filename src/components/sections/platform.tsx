"use client";

import { motion } from "framer-motion";
import { Section, Container } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { platformModules } from "@/lib/evara-data";

export function Platform() {
  return (
    <Section tone="mist" id="platform">
      <Container>
        <SectionHeading
          align="center"
          kicker="Inside EvaraOne"
          title={`${platformModules.length} modules, one login.`}
          description="Everything the platform does, grouped the way operators actually work."
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {platformModules.map((m) => (
            <motion.div
              key={m.title}
              variants={fadeUp}
              className="rounded-xl border border-white/70 bg-white/45 p-5 backdrop-blur-xl transition-colors hover:bg-white/60"
            >
              <h3 className="font-heading text-sm font-semibold text-evara-ink">
                {m.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-evara-slate">
                {m.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
