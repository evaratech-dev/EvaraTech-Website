"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Container } from "@/components/site/section";

/**
 * Scroll-scrubbed teardown of a device's operating principle. The product
 * holds centre stage while each step of the mechanism is called out — the
 * page equivalent of taking the lid off and pointing inside.
 */
export function MechanismTeardown({
  steps,
  image,
  productName,
}: {
  steps: { step: string; detail: string }[];
  image?: string;
  productName: string;
}) {
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

  const rotate = useTransform(smooth, [0, 1], [-10, 10]);
  const scale = useTransform(smooth, [0, 0.5, 1], [0.9, 1.05, 0.94]);

  if (reduced) {
    return (
      <section className="bg-lab-wash-soft py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {image && (
              <div className="relative mx-auto aspect-square w-full max-w-sm">
                <Image
                  src={image}
                  alt={`${productName} device`}
                  fill
                  sizes="(min-width: 1024px) 400px, 80vw"
                  className="object-contain"
                />
              </div>
            )}
            <ol className="flex flex-col gap-8">
              {steps.map((s, i) => (
                <li key={s.step}>
                  <p className="font-mono text-xs text-evara-water">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-heading text-xl font-semibold text-evara-ink">
                    {s.step}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-evara-slate">
                    {s.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative bg-lab-wash-soft"
      style={{ height: `${steps.length * 90}vh` }}
      aria-label={`How ${productName} works`}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Container className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="relative order-1 mx-auto aspect-square w-full max-w-xs lg:order-2 lg:max-w-md">
            <div
              aria-hidden="true"
              className="absolute inset-[10%] rounded-full bg-gradient-to-br from-evara-water-100 via-white to-evara-lavender blur-2xl"
            />
            {image ? (
              <motion.div style={{ rotate, scale }} className="relative h-full w-full">
                <Image
                  src={image}
                  alt={`${productName} device`}
                  fill
                  sizes="(min-width: 1024px) 440px, 70vw"
                  className="object-contain drop-shadow-[0_30px_50px_rgba(15,33,56,0.2)]"
                />
              </motion.div>
            ) : (
              <motion.div
                style={{ rotate, scale }}
                className="relative flex h-full w-full items-center justify-center"
              >
                <StepDial progress={smooth} total={steps.length} />
              </motion.div>
            )}
          </div>

          <div className="relative order-2 h-72 lg:order-1">
            {steps.map((s, i) => (
              <TeardownStep
                key={s.step}
                step={s}
                index={i}
                total={steps.length}
                progress={smooth}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}

function TeardownStep({
  step,
  index,
  total,
  progress,
}: {
  step: { step: string; detail: string };
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const band = 1 / total;
  const start = index * band;
  const end = start + band;
  const fade = band * 0.3;

  const opacity = useTransform(
    progress,
    [start - fade, start + fade * 0.6, end - fade * 0.6, end + fade],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [start - fade, start + fade * 0.6, end - fade * 0.6, end + fade],
    [30, 0, 0, -30]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm text-evara-water tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-10 bg-evara-line-strong" />
        <span className="text-xs font-semibold tracking-[0.16em] text-evara-slate uppercase">
          Step {index + 1} of {total}
        </span>
      </div>
      <h3 className="mt-5 text-balance font-heading text-3xl font-semibold text-evara-ink sm:text-4xl">
        {step.step}
      </h3>
      <p className="mt-4 max-w-md text-base leading-relaxed text-evara-slate">
        {step.detail}
      </p>
    </motion.div>
  );
}

/** Fallback stage graphic for devices without a render yet. */
function StepDial({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  const circumference = 2 * Math.PI * 78;
  const dash = useTransform(progress, [0, 1], [circumference, 0]);

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" aria-hidden="true">
      <circle cx="100" cy="100" r="78" fill="none" stroke="var(--color-evara-line)" strokeWidth="8" />
      <motion.circle
        cx="100"
        cy="100"
        r="78"
        fill="none"
        stroke="var(--color-evara-water)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        style={{ strokeDashoffset: dash }}
      />
      {Array.from({ length: total }).map((_, i) => {
        const angle = (i / total) * 2 * Math.PI;
        return (
          <circle
            key={i}
            cx={100 + Math.cos(angle) * 78}
            cy={100 + Math.sin(angle) * 78}
            r="5"
            fill="var(--color-evara-teal)"
          />
        );
      })}
    </svg>
  );
}
