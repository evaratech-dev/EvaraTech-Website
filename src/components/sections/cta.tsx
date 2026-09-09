"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Section, Container } from "@/components/site/section";
import { fadeUp, revealViewport } from "@/lib/motion";
import { company } from "@/lib/evara-data";

export function Cta() {
  return (
    <Section tone="dark" className="relative overflow-hidden py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-30%] right-[10%] size-[420px] rounded-full bg-evara-water/18 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-30%] left-[8%] size-[380px] rounded-full bg-evara-teal/14 blur-[120px]"
      />
      <Container className="relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"
        >
          <div className="max-w-xl">
            <h2 className="text-balance font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to make every drop measurable?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Talk to the team building the operating system for water
              infrastructure — from a single tank to an entire smart city.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-xl bg-white px-6 text-sm font-medium text-evara-ink shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)] hover:bg-evara-mist"
            >
              <a href={`mailto:${company.email}`}>Request Demo</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-xl border-white/25 bg-white/[0.06] px-6 text-sm font-medium text-white backdrop-blur-xl hover:bg-white/[0.12]"
            >
              <a href="#ecosystem">Talk to an Expert</a>
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
