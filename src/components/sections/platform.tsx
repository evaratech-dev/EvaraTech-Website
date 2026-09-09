"use client";

import { motion } from "framer-motion";
import { Section, Container } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { DashboardMock } from "@/components/site/dashboard-mock";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { platformModules } from "@/lib/evara-data";

export function Platform() {
  return (
    <Section tone="mist" id="platform">
      <Container>
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              kicker="Inside EvaraOne"
              title="Six modules, one login."
              description="Everything the platform does, grouped the way operators actually work."
            />

            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
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
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-28"
          >
            <DashboardMock />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
