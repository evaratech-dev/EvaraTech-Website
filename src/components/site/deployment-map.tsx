"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { deployments, type Deployment } from "@/lib/evara-data";
import { INDIA_PATH, INDIA_VIEWBOX, projectIndia } from "@/lib/india-outline";

/**
 * Where the devices actually are.
 *
 * India, from Natural Earth's "India point of view" boundary (see
 * lib/india-outline.ts), with every deployment pinned at its real
 * coordinates. Hovering a pin or a card highlights the other and the card
 * opens to list what is installed. Sites within a short drive of each other
 * share one pin at this scale; the cards tell them apart.
 */

function cluster(items: Deployment[]) {
  const groups: { lat: number; lon: number; sites: Deployment[] }[] = [];
  for (const d of items) {
    const g = groups.find((g) => Math.abs(g.lat - d.lat) < 0.6 && Math.abs(g.lon - d.lon) < 0.6);
    if (g) g.sites.push(d);
    else groups.push({ lat: d.lat, lon: d.lon, sites: [d] });
  }
  return groups;
}

export function DeploymentMap() {
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const groups = cluster(deployments);
  const cities = Array.from(new Set(deployments.map((d) => d.city)));

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
      {/* Map */}
      <div className="mx-auto w-full max-w-[26rem] lg:max-w-none">
        <svg
          viewBox={`0 0 ${INDIA_VIEWBOX.w} ${INDIA_VIEWBOX.h}`}
          className="h-auto w-full"
          role="img"
          aria-label="Map of India showing EvaraTech deployment sites"
        >
          <defs>
            <linearGradient id="india-fill" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#e3effa" />
              <stop offset="1" stopColor="#dcf5f2" />
            </linearGradient>
          </defs>
          <motion.path
            d={INDIA_PATH}
            fill="url(#india-fill)"
            stroke="#1c75bc"
            strokeWidth="1.1"
            strokeLinejoin="round"
            fillRule="evenodd"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {groups.map((g, gi) => {
            const { x, y } = projectIndia(g.lon, g.lat);
            const isActive = g.sites.some((s) => s.place === active);
            const label = Array.from(new Set(g.sites.map((s) => s.city))).join(" & ");
            return (
              <motion.g
                key={label}
                initial={reduced ? false : { opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.6 + gi * 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${x}px ${y}px` }}
                onMouseEnter={() => setActive(g.sites[0].place)}
                onMouseLeave={() => setActive(null)}
                className="cursor-pointer"
              >
                {!reduced && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={8}
                    fill="none"
                    stroke="#1c75bc"
                    strokeWidth="1.2"
                    initial={{ r: 8, opacity: 0.6 }}
                    animate={{ r: [8, 24], opacity: [0.6, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: gi * 0.6, ease: "easeOut" }}
                  />
                )}
                <circle cx={x} cy={y} r={isActive ? 11 : 9} fill="#1c75bc" fillOpacity="0.18" />
                <circle cx={x} cy={y} r={isActive ? 5.5 : 4.5} fill={isActive ? "#00a99d" : "#1c75bc"} />
                <text x={x + 14} y={y + 4} fontSize="13" fontWeight={600} fill="#0f2138">
                  {label}
                </text>
                <text x={x + 14} y={y + 19} fontSize="10.5" fill="#5c6b80">
                  {g.sites.length} {g.sites.length === 1 ? "site" : "sites"}
                </text>
              </motion.g>
            );
          })}
        </svg>
        <p className="mt-3 text-center text-[11px] text-evara-slate-400 lg:text-left">
          Boundary as published by India. Natural Earth, India point of view edition.
        </p>
      </div>

      {/* Sites, grouped by city */}
      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="flex flex-col gap-7"
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
              <ul className="mt-3 flex flex-col gap-2.5">
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
    </div>
  );
}
