"use client";

import { motion } from "framer-motion";
import { Award, FileCheck, GraduationCap } from "lucide-react";
import { Section, Container } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { team, advisors, research } from "@/lib/evara-data";

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function TeamResearch() {
  return (
    <Section tone="mist" id="team">
      <Container>
        <SectionHeading
          kicker="Team & research"
          title={research.headline}
          description={research.detail}
        />

        {/* Credibility markers */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {[
            {
              icon: Award,
              title: "Granted patent",
              detail: research.patent,
              sub: research.patentTitle,
            },
            {
              icon: FileCheck,
              title: "Registered designs",
              detail: `${research.designs.length} industrial designs`,
              sub: research.designs.join(" · "),
            },
            {
              icon: GraduationCap,
              title: "University-backed",
              detail: "IIIT Hyderabad",
              sub: "Smart City Research Center · IP jointly assigned",
            },
          ].map((c) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              className="rounded-xl border border-white/70 bg-white/45 p-5 backdrop-blur-xl transition-colors hover:bg-white/60"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-evara-water-100 text-evara-water">
                <c.icon className="size-[18px]" strokeWidth={1.7} />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-evara-ink">
                {c.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-evara-water">
                {c.detail}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-evara-slate">
                {c.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Core team */}
        <motion.div
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-14"
        >
          <h3 className="text-xs font-semibold tracking-[0.16em] text-evara-slate uppercase">
            Core team
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <motion.article
                key={person.name}
                variants={fadeUp}
                className="flex flex-col rounded-xl border border-white/70 bg-white/45 p-5 backdrop-blur-xl transition-colors hover:bg-white/60"
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-full bg-evara-ink font-heading text-sm font-semibold text-white"
                >
                  {initials(person.name)}
                </span>
                <h4 className="mt-4 font-heading text-base font-semibold text-evara-ink">
                  {person.name}
                </h4>
                <p className="mt-0.5 text-sm font-medium text-evara-water">
                  {person.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-evara-slate">
                  {person.bio}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Advisors */}
        <motion.div
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12"
        >
          <h3 className="text-xs font-semibold tracking-[0.16em] text-evara-slate uppercase">
            Research advisors
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {advisors.map((person) => (
              <motion.article
                key={person.name}
                variants={fadeUp}
                className="flex items-start gap-4 rounded-xl border border-white/70 bg-white/45 p-5 backdrop-blur-xl transition-colors hover:bg-white/60"
              >
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-evara-teal-100 font-heading text-sm font-semibold text-evara-teal"
                >
                  {initials(person.name)}
                </span>
                <div>
                  <h4 className="font-heading text-base font-semibold text-evara-ink">
                    {person.name}
                  </h4>
                  <p className="mt-0.5 text-sm font-medium text-evara-teal">
                    {person.role}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-evara-slate">
                    {person.affiliation}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
