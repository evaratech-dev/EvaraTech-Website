"use client";

import { useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { deployments } from "@/lib/evara-data";

/**
 * Slow, continuous trust band of real deployments. Two copies of the list
 * scroll as one track so the loop is seamless; edge masks fade the ends into
 * the page. Under reduced motion it becomes a static, wrapped row — the names
 * still read, nothing moves.
 *
 * These are genuine reference sites (a Presidential Residence among them), so
 * the band states plainly what it is rather than dressing them as logos we
 * don't have.
 */
export function TrustMarquee() {
  const reduced = useReducedMotion();
  const items = deployments.map((d) => d.place);

  if (reduced) {
    return (
      <section className="border-y border-white/60 bg-white/30 py-6 backdrop-blur-md">
        <div className="container-evara">
          <p className="mb-4 text-center font-mono text-[11px] tracking-[0.2em] text-evara-slate uppercase">
            Deployed in the field
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {items.map((place) => (
              <li
                key={place}
                className="flex items-center gap-2 text-sm font-semibold text-evara-ink"
              >
                <MapPin className="size-4 text-evara-water" strokeWidth={1.8} />
                {place}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="EvaraTech deployments"
      className="relative overflow-hidden border-y border-white/60 bg-white/30 py-7 backdrop-blur-md"
    >
      <p className="mb-5 text-center font-mono text-[11px] tracking-[0.2em] text-evara-slate uppercase">
        Deployed in the field
      </p>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f7f9fc] to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f7f9fc] to-transparent sm:w-40" />

      <div className="marquee-track flex w-max items-center gap-12 sm:gap-16">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16"
          >
            {items.map((place) => (
              <li
                key={`${copy}-${place}`}
                className="flex items-center gap-2.5 whitespace-nowrap"
              >
                <MapPin
                  className="size-4 shrink-0 text-evara-water"
                  strokeWidth={1.8}
                />
                <span className="font-heading text-lg font-semibold text-evara-ink/80 sm:text-xl">
                  {place}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
