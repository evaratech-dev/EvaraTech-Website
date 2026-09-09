"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section, Container } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { problemScale, products } from "@/lib/evara-data";

/**
 * Names each way water disappears, then names the instrument that closes it.
 * Problem and answer sit in the same row deliberately — the pairing is the
 * argument.
 */
export function LossCauses() {
  return (
    <Section tone="paper" id="causes">
      <Container>
        <SectionHeading
          kicker="Where it goes"
          title="Four leaks in the system. Four instruments."
          description="Loss is not one problem, it is four — and each one disappears the moment the infrastructure can report on itself."
        />

        <motion.ul
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 divide-y divide-evara-line border-y border-evara-line"
        >
          {problemScale.causes.map((cause, i) => {
            const device = products.find((p) => p.name === cause.device);
            return (
              <motion.li
                key={cause.label}
                variants={fadeUp}
                className="group grid grid-cols-1 gap-4 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8"
              >
                <span className="font-heading text-sm font-semibold text-evara-slate-400 tabular-nums">
                  0{i + 1}
                </span>

                <div>
                  <h3 className="font-heading text-lg font-semibold text-evara-ink sm:text-xl">
                    {cause.label}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-evara-slate">
                    {cause.detail}
                  </p>
                </div>

                {device && (
                  <Link
                    href={`/products/${device.slug}`}
                    className="inline-flex items-center gap-2 self-start rounded-full border border-white/70 bg-white/45 px-4 py-2 text-sm font-medium text-evara-ink backdrop-blur-xl transition-colors hover:border-evara-water-300 hover:bg-white/65 sm:self-auto"
                  >
                    <span className="size-1.5 rounded-full bg-evara-teal" />
                    Closed by {device.name}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </Section>
  );
}
