"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Award, FileCheck, GraduationCap, Plus } from "lucide-react";
import { Section, Container } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { team, research, journey } from "@/lib/evara-data";

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

const EASE = [0.16, 1, 0.3, 1] as const;

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
            { icon: Award, title: "Granted patent", detail: research.patent, sub: research.patentTitle },
            { icon: FileCheck, title: "Registered designs", detail: `${research.designs.length} industrial designs`, sub: research.designs.join(" · ") },
            { icon: GraduationCap, title: "University-backed", detail: "IIIT Hyderabad", sub: "Smart City Research Center · IP jointly assigned" },
          ].map((c) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              className="rounded-xl border border-white/70 bg-white/45 p-5 backdrop-blur-xl transition-colors hover:bg-white/60"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-evara-water-100 text-evara-water">
                <c.icon className="size-[18px]" strokeWidth={1.7} />
              </span>
              <h3 className="mt-4 text-sm font-semibold text-evara-ink sm:text-base">{c.title}</h3>
              <p className="mt-1 text-sm font-medium text-evara-water">{c.detail}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-evara-slate sm:text-sm">{c.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* The road here */}
        <Journey />

        {/* Core team */}
        <motion.div
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-16 sm:mt-20"
        >
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] tracking-[0.22em] text-evara-water uppercase sm:text-xs">
                Core team
              </p>
              <h3 className="mt-3 font-heading text-[1.75rem] leading-[1.15] font-semibold tracking-tight text-evara-ink sm:text-4xl">
                Four people. One obsession.
              </h3>
            </div>
            <p className="hidden max-w-xs text-sm text-evara-slate sm:block">
              Open a card to see what each of us actually works on.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

function PersonCard({ person }: { person: (typeof team)[number] }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <motion.article
      variants={fadeUp}
      layout
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border backdrop-blur-xl transition-colors",
        open
          ? "border-evara-navy-700/30 bg-evara-ink text-white"
          : "border-white/70 bg-white/45 text-evara-ink hover:bg-white/65"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex flex-1 flex-col items-start p-5 text-left focus-visible:outline-none sm:p-6"
      >
        <div className="flex w-full items-start justify-between">
          <span
            aria-hidden="true"
            className={cn(
              "flex size-12 items-center justify-center rounded-full font-heading text-sm font-semibold transition-colors",
              open ? "bg-white/15 text-white" : "bg-evara-ink text-white"
            )}
          >
            {initials(person.name)}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className={cn(
              "flex size-8 items-center justify-center rounded-full border transition-colors",
              open ? "border-white/25 text-white" : "border-evara-line text-evara-slate group-hover:border-evara-water group-hover:text-evara-water"
            )}
          >
            <Plus className="size-4" strokeWidth={2} />
          </motion.span>
        </div>
        <h4 className="mt-5 font-heading text-base font-semibold sm:text-lg">{person.name}</h4>
        <p className={cn("mt-0.5 text-sm font-medium", open ? "text-evara-teal-300" : "text-evara-water")}>
          {person.role}
        </p>
        <p className={cn("mt-3 text-sm leading-relaxed", open ? "text-white/70" : "text-evara-slate")}>
          {person.bio}
        </p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="more"
              initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="w-full overflow-hidden"
            >
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {person.focus.map((f) => (
                  <li key={f} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white/90">
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-l-2 border-evara-teal pl-3 text-sm leading-relaxed text-white/85 italic">
                {person.quote}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.article>
  );
}

/** Milestones on a line that draws itself as you scroll into it. */
function Journey() {
  const reduced = useReducedMotion();
  return (
    <div className="mt-16 sm:mt-20">
      <p className="font-mono text-[11px] tracking-[0.22em] text-evara-water uppercase sm:text-xs">
        The road here
      </p>
      <div className="relative mt-8">
        {/* Rail */}
        <div className="absolute top-2 bottom-2 left-[7px] w-px bg-evara-line lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
        <motion.div
          initial={reduced ? { scaleY: 1, scaleX: 1 } : { scaleY: 0, scaleX: 0 }}
          whileInView={{ scaleY: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 2, ease: EASE }}
          className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-evara-water lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:origin-left"
        />
        <motion.ol
          variants={staggerContainer(0.18)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-6"
        >
          {journey.map((step) => (
            <motion.li key={step.title} variants={fadeUp} className="relative pl-8 lg:pt-8 lg:pl-0">
              <span className="absolute top-1 left-0 flex size-[15px] items-center justify-center rounded-full border-2 border-evara-water bg-white lg:top-0 lg:left-0">
                <span className="size-[5px] rounded-full bg-evara-water" />
              </span>
              <p className="font-mono text-xs text-evara-water tabular-nums">{step.year}</p>
              <h4 className="mt-1.5 font-heading text-base font-semibold text-evara-ink sm:text-lg">{step.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-evara-slate">{step.detail}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </div>
  );
}
