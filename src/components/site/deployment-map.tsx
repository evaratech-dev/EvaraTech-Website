"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { deployments } from "@/lib/evara-data";

/**
 * Where the devices actually are.
 *
 * One card per site, grouped by city. Hover or tap a card and it opens to
 * list what is installed there. The India outline that used to sit beside
 * this was hand-traced and did not do the country's boundary justice; a map
 * comes back only with an accurate, official outline behind it.
 */
export function DeploymentMap() {
  const [active, setActive] = useState<string | null>(null);
  const cities = Array.from(new Set(deployments.map((d) => d.city)));

  return (
    <motion.div
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10"
    >
      {cities.map((city) => {
        const sites = deployments.filter((d) => d.city === city);
        return (
          <motion.div key={city} variants={fadeUp}>
            <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-evara-water uppercase sm:text-xs">
              <MapPin className="size-3.5" strokeWidth={2} aria-hidden="true" />
              {city}
              <span className="text-evara-slate-400">· {sites.length} {sites.length === 1 ? "site" : "sites"}</span>
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {sites.map((d) => {
                const isActive = active === d.place;
                return (
                  <li key={d.place}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(d.place)}
                      onMouseLeave={() => setActive(null)}
                      onClick={() => setActive(isActive ? null : d.place)}
                      aria-expanded={isActive}
                      className={cn(
                        "block w-full rounded-xl border p-4 text-left backdrop-blur-xl transition-colors sm:p-5",
                        isActive ? "border-evara-water-300 bg-white/80" : "border-white/70 bg-white/45 hover:bg-white/65"
                      )}
                    >
                      <p className="font-heading text-base font-semibold text-evara-ink sm:text-lg">{d.place}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-evara-slate">{d.detail}</p>
                      <motion.ul
                        initial={false}
                        animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        {d.installed.map((i) => (
                          <li key={i} className="mt-2 flex items-center gap-2 text-sm text-evara-ink/80 first:mt-3">
                            <span className="size-1.5 shrink-0 rounded-full bg-evara-teal" />
                            {i}
                          </li>
                        ))}
                      </motion.ul>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
