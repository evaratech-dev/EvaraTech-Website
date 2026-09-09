"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Container } from "@/components/site/section";

/**
 * Pinned scroll-scrub: the device stays fixed centre-stage while the
 * narrative advances around it. Each beat is a real stage of how a
 * retrofit device goes from "clipped on" to "reporting to EvaraOne".
 */

const beats = [
  {
    kicker: "01 — Attach",
    title: "It clips onto what you already own.",
    body: "No pipe cutting. No civil work. No permits. The meter, tank or borewell you have today stays exactly where it is.",
  },
  {
    kicker: "02 — Sense",
    title: "It measures without ever touching the water.",
    body: "Ultrasonic, string-based and camera sensing read the real condition from outside — nothing corrodes, nothing contaminates.",
  },
  {
    kicker: "03 — Think",
    title: "It reads the result on-device.",
    body: "On-device AI resolves the reading locally at 97% accuracy. Core metering keeps working even when the network doesn't.",
  },
  {
    kicker: "04 — Report",
    title: "It reports into one platform.",
    body: "Every device, every site, one dashboard — with alerts, forecasting and predictive maintenance layered on top.",
  },
];

export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const rotate = useTransform(smooth, [0, 1], [-12, 12]);
  const scale = useTransform(smooth, [0, 0.5, 1], [0.86, 1.06, 0.92]);
  const y = useTransform(smooth, [0, 1], ["4%", "-4%"]);
  const glow = useTransform(smooth, [0, 0.5, 1], [0.35, 0.85, 0.4]);

  if (reduced) {
    return <StaticStory />;
  }

  return (
    <section
      ref={ref}
      className="relative bg-lab-wash-soft"
      style={{ height: `${beats.length * 100}vh` }}
      aria-label="How an EvaraTech device works"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Container className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Stage */}
          <div className="relative order-1 mx-auto aspect-square w-full max-w-sm lg:order-2 lg:max-w-lg">
            <motion.div
              aria-hidden="true"
              style={{ opacity: glow }}
              className="absolute inset-[12%] rounded-full bg-gradient-to-br from-evara-water-100 via-white to-evara-lavender blur-2xl"
            />
            <motion.div
              style={{ rotate, scale, y }}
              className="relative h-full w-full"
            >
              <Image
                src="/images/products/evaraflow.png"
                alt="EvaraFlow clip-on smart water meter"
                fill
                sizes="(min-width: 1024px) 520px, 80vw"
                className="object-contain drop-shadow-[0_30px_50px_rgba(15,33,56,0.18)]"
              />
            </motion.div>

            <ProgressRail progress={smooth} />
          </div>

          {/* Copy — each beat cross-fades as its band of scroll passes */}
          <div className="relative order-2 h-64 lg:order-1 lg:h-72">
            {beats.map((beat, i) => (
              <Beat
                key={beat.kicker}
                beat={beat}
                index={i}
                total={beats.length}
                progress={smooth}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}

function Beat({
  beat,
  index,
  total,
  progress,
}: {
  beat: (typeof beats)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const band = 1 / total;
  const start = index * band;
  const end = start + band;
  const fade = band * 0.28;

  const opacity = useTransform(
    progress,
    [start - fade, start + fade * 0.6, end - fade * 0.6, end + fade],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [start - fade, start + fade * 0.6, end - fade * 0.6, end + fade],
    [28, 0, 0, -28]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <p className="text-xs font-semibold tracking-[0.18em] text-evara-water uppercase">
        {beat.kicker}
      </p>
      <h3 className="mt-4 text-balance font-heading text-2xl leading-tight font-semibold text-evara-ink sm:text-4xl">
        {beat.title}
      </h3>
      <p className="mt-4 max-w-md text-base leading-relaxed text-evara-slate">
        {beat.body}
      </p>
    </motion.div>
  );
}

/** Thin vertical rail showing position through the story. */
function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div
      aria-hidden="true"
      className="absolute top-1/2 -right-2 hidden h-40 w-px -translate-y-1/2 bg-evara-line lg:block"
    >
      <motion.div
        style={{ scaleY }}
        className="h-full w-full origin-top bg-evara-water"
      />
    </div>
  );
}

/** Reduced-motion equivalent: same content, no pinning, no scrubbing. */
function StaticStory() {
  return (
    <section className="bg-lab-wash-soft py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <Image
              src="/images/products/evaraflow.png"
              alt="EvaraFlow clip-on smart water meter"
              fill
              sizes="(min-width: 1024px) 400px, 80vw"
              className="object-contain"
            />
          </div>
          <ol className="flex flex-col gap-8">
            {beats.map((beat) => (
              <li key={beat.kicker}>
                <p className="text-xs font-semibold tracking-[0.18em] text-evara-water uppercase">
                  {beat.kicker}
                </p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-evara-ink">
                  {beat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-evara-slate">
                  {beat.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
