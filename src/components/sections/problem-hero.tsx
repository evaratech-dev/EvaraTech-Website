"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Activity, ArrowRight, Droplets, MapPin, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/site/section";
import { MaskReveal } from "@/components/site/reveal";
import { Magnetic } from "@/components/site/magnetic";
import { ContactButton } from "@/components/contact/contact-dialog";
import { CountUp } from "@/components/site/count-up";

/**
 * Cinematic video hero.
 *
 * A dark product-reveal montage plays full-bleed behind the copy. The section
 * pulls up under the floating nav (cancelling the layout's top padding) so the
 * footage reaches the very top of the page, and lays a left-weighted scrim so
 * white copy stays legible over the moving image.
 *
 * On a pointer device the footage drifts a few pixels against the cursor
 * and the stat bar tilts toward it, so the first screen answers the hand.
 * Pointer only: touch gets a still composition, and reduced motion gets the
 * poster frame, the same scene held still. Every stat figure is one
 * EvaraTech publishes.
 */

// Framed as impact rather than inventory: the same published figures, said
// the way the company measures itself.
const STATS = [
  { icon: Droplets, value: 2.5, decimals: 1, suffix: "M+", label: "Litres of water protected" },
  { icon: Radio, value: 120, decimals: 0, suffix: "+", label: "Devices in the field" },
  { icon: MapPin, value: 15, decimals: 0, suffix: "+", label: "Communities served" },
  { icon: Activity, value: 99.9, decimals: 1, suffix: "%", label: "Always watching" },
];

export function ProblemHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  // Cursor position across the section, -1..1 on each axis, eased.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });
  const footageX = useTransform(sx, [-1, 1], [12, -12]);
  const footageY = useTransform(sy, [-1, 1], [8, -8]);
  const barRotateY = useTransform(sx, [-1, 1], [-2.2, 2.2]);
  const barRotateX = useTransform(sy, [-1, 1], [1.6, -1.6]);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Some browsers ignore the autoplay attribute until the element is muted in
  // JS as well; nudge it once mounted.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    v.muted = true;
    const p = v.play();
    if (p) p.catch(() => {});
  }, [reduced]);

  return (
    <section
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="dark relative -mt-20 flex min-h-[92svh] flex-col overflow-hidden bg-evara-navy-950 text-white sm:-mt-24"
    >
      {/* Footage */}
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/hero/hero-poster.webp"
          alt="EvaraTech smart water devices"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        // Slightly oversized so the drift never exposes an edge.
        <motion.div
          style={{ x: footageX, y: footageY }}
          className="absolute -inset-4"
          aria-hidden="true"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            poster="/images/hero/hero-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/images/hero/hero.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}

      {/* Scrims, strongest at left and bottom, so the devices on the right of
          the frame keep showing through. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-evara-navy-950 via-evara-navy-950/75 to-evara-navy-950/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-evara-navy-950 via-evara-navy-950/55 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-evara-navy-950/70 to-transparent"
      />

      {/* Cinematic finish: an edge vignette and a faint film grain over the
          footage. The grain is a tiled SVG noise data-URI (no asset, no CSP
          issue) drifting slowly, kept low-opacity so it reads as texture. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: "inset 0 0 220px 60px rgba(5,10,18,0.75)",
        }}
      />
      <div aria-hidden="true" className="hero-grain pointer-events-none absolute inset-0" />

      {/* Copy, vertically centred in the space above the stat bar */}
      <Container className="relative z-10 flex flex-1 flex-col justify-center pt-28 pb-8 sm:pt-32">
        <div className="max-w-3xl">
          <MaskReveal trigger="mount">
            <p className="font-mono text-[11px] tracking-[0.24em] text-evara-teal-300 uppercase sm:text-xs">
              AI · IoT · Climate tech
            </p>
          </MaskReveal>

          <h1 className="mt-5 font-heading text-[2.4rem] leading-[1.04] font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.9rem] 2xl:text-[4.5rem]">
            <MaskReveal trigger="mount" delay={0.05}>Every litre measured.</MaskReveal>
            <span className="block overflow-hidden">
              <motion.span
                initial={reduced ? { opacity: 0 } : { y: "110%" }}
                animate={reduced ? { opacity: 1 } : { y: 0 }}
                transition={{ duration: 0.9, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Every <span className="text-evara-teal-300">rupee saved.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg 2xl:text-xl"
          >
            Retrofit IoT and AI that turn the tanks, borewells, meters and
            pumps you already own into a water network that pays for itself.
            No pipe cutting, no civil work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Magnetic>
              <Button
                asChild
                className="h-[52px] rounded-xl bg-evara-water px-7 text-sm font-semibold text-white shadow-[0_18px_38px_-14px_rgba(28,117,188,0.85)] hover:bg-evara-water-400"
              >
                <a href="#architecture">
                  Explore Platform
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <ContactButton
                variant="outline"
                className="h-[52px] rounded-xl border-white/25 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20"
              >
                Request Demo
              </ContactButton>
            </Magnetic>
          </motion.div>
        </div>
      </Container>

      {/* Dark-glass stat bar, seated in the frame */}
      <Container className="relative z-10 pb-8 sm:pb-10 [perspective:1400px]">
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotateX: barRotateX, rotateY: barRotateY, transformStyle: "preserve-3d" }}
          className="relative grid grid-cols-2 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] shadow-[0_28px_70px_-30px_rgba(0,0,0,0.7)] backdrop-blur-2xl lg:grid-cols-4"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
          />
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "flex items-center gap-3.5 px-5 py-5 sm:px-6",
                i % 2 === 1 && "border-l border-white/12",
                i % 4 !== 0 && "lg:border-l lg:border-white/12",
                i >= 2 && "border-t border-white/12 lg:border-t-0"
              )}
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-evara-teal-300">
                <s.icon className="size-[19px]" strokeWidth={1.9} />
              </span>
              <div>
                <dd className="font-heading text-2xl font-semibold text-white tabular-nums">
                  <CountUp
                    value={s.value}
                    decimals={s.decimals}
                    suffix={s.suffix}
                    start="mount"
                    delay={900 + i * 90}
                  />
                </dd>
                <dt className="mt-0.5 text-sm text-white/60">{s.label}</dt>
              </div>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  );
}
