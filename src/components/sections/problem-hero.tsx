"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
 * Under reduced motion the video is replaced by its poster frame — the same
 * scene, held still. Every stat figure is one EvaraTech publishes.
 */

const STATS = [
  { icon: Droplets, value: 2.5, decimals: 1, suffix: "M+", label: "Litres monitored" },
  { icon: Radio, value: 120, decimals: 0, suffix: "+", label: "Devices installed" },
  { icon: MapPin, value: 15, decimals: 0, suffix: "+", label: "Active sites" },
  { icon: Activity, value: 99.9, decimals: 1, suffix: "%", label: "System uptime" },
];

export function ProblemHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

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
    <section className="dark relative -mt-20 flex min-h-[90svh] flex-col overflow-hidden bg-evara-navy-950 text-white sm:-mt-24">
      {/* Footage */}
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/images/hero/hero-poster.webp"
          alt="EvaraTech smart water devices"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster="/images/hero/hero-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/images/hero/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* Scrims — strongest at left and bottom, so the devices on the right of
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

      {/* Copy — vertically centred in the space above the stat bar */}
      <Container className="relative z-10 flex flex-1 flex-col justify-center pt-28 pb-8 sm:pt-32">
        <div className="max-w-2xl">
          <MaskReveal>
            <p className="font-mono text-[11px] tracking-[0.24em] text-evara-teal-300 uppercase">
              AI · IoT · Water intelligence
            </p>
          </MaskReveal>

          <h1 className="mt-5 font-heading text-[2.75rem] leading-[1.0] font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
            <MaskReveal delay={0.05}>Every drop has</MaskReveal>
            <MaskReveal delay={0.12}>value. We make</MaskReveal>
            <span className="block overflow-hidden">
              <motion.span
                initial={reduced ? { opacity: 0 } : { y: "110%" }}
                animate={reduced ? { opacity: 1 } : { y: 0 }}
                transition={{ duration: 0.9, delay: 0.19, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                it <span className="text-evara-teal-300">count.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Smart IoT devices and an AI-powered platform for real-time water
            intelligence — retrofit onto the infrastructure you already have,
            with no pipe cutting and no civil work.
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
      <Container className="relative z-10 pb-8 sm:pb-10">
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
