"use client";

import { motion } from "framer-motion";
import { Section, Container } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { DeploymentMap } from "@/components/site/deployment-map";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { differentiators } from "@/lib/evara-data";

export function Proof() {
  return (
    <Section tone="paper" id="proof">
      <Container>
        <SectionHeading
          kicker="Why EvaraTech"
          title="Engineered to be trusted with infrastructure."
          description="Retrofit-first, patented, and already running in the field."
        />

        <motion.div
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {differentiators.map((d) => (
            <motion.div
              key={d.title}
              variants={fadeUp}
              className="rounded-xl border border-white/70 bg-white/45 p-5 backdrop-blur-xl transition-colors hover:bg-white/60"
            >
              <h3 className="font-heading text-base font-semibold text-evara-ink">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-evara-slate">{d.detail}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Where it runs */}
        <div className="mt-16 sm:mt-20">
          <SectionHeading
            kicker="Deployed today"
            title="Running today, at these sites."
            description="Every pin is a site with EvaraTech hardware reporting from it. Hover a site to see what is installed."
          />
          <div className="mt-10">
            <DeploymentMap />
          </div>
        </div>
      </Container>
    </Section>
  );
}
