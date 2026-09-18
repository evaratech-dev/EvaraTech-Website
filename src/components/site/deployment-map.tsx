"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { deployments, type Deployment } from "@/lib/evara-data";

/**
 * Where the devices actually are.
 *
 * A simplified India outline (a hand-traced polygon, no map library, no
 * tiles) with every deployment pinned at its real coordinates. Hovering a
 * pin or a list entry highlights the other, and sites with a case study
 * link through to it. The Hyderabad sites sit within a few kilometres of
 * each other, so at this scale they share one pin and the list tells them
 * apart.
 */

// Lon/lat outline, clockwise from Kashmir. Coarse on purpose: this is a
// silhouette to place pins on, not a survey.
const INDIA: [number, number][] = [
  [74.0, 36.9], [76.5, 35.5], [78.0, 35.5], [79.0, 34.3], [78.5, 32.7], [79.6, 31.1],
  [80.9, 30.2], [81.5, 29.0], [84.0, 28.3], [86.5, 27.9], [88.1, 27.9], [88.9, 27.0],
  [89.6, 26.7], [92.0, 26.9], [93.5, 28.0], [95.5, 28.3], [97.3, 28.3], [96.3, 27.0],
  [95.1, 26.0], [94.7, 24.5], [93.3, 22.5], [92.3, 23.5], [91.2, 24.1], [89.9, 25.9],
  [88.4, 25.6], [88.2, 24.2], [88.9, 22.3], [87.0, 21.4], [86.5, 20.1], [84.8, 19.0],
  [82.3, 17.0], [80.3, 15.6], [80.2, 13.1], [79.8, 10.3], [78.2, 8.7], [77.4, 8.1],
  [76.3, 9.6], [75.0, 12.0], [74.0, 14.6], [73.0, 17.5], [72.8, 19.1], [72.6, 21.1],
  [70.0, 20.8], [68.9, 22.4], [68.4, 23.6], [70.1, 24.3], [71.1, 25.5], [70.0, 26.9],
  [70.5, 28.0], [72.5, 29.5], [74.0, 31.2], [74.5, 32.5], [73.9, 34.3],
];

const LON0 = 68, LAT0 = 37, K = 20, COS = 0.927;
const px = (lon: number) => (lon - LON0) * COS * K;
const py = (lat: number) => (LAT0 - lat) * K;
const W = Math.ceil((97.5 - LON0) * COS * K);
const H = Math.ceil((LAT0 - 7.5) * K);
const OUTLINE = INDIA.map(([lo, la], i) => `${i ? "L" : "M"}${px(lo).toFixed(1)} ${py(la).toFixed(1)}`).join(" ") + " Z";

/** Sites within ~0.3° of each other share a pin. */
function cluster(items: Deployment[]) {
  const groups: { lat: number; lon: number; sites: Deployment[] }[] = [];
  for (const d of items) {
    const g = groups.find((g) => Math.abs(g.lat - d.lat) < 0.3 && Math.abs(g.lon - d.lon) < 0.3);
    if (g) g.sites.push(d);
    else groups.push({ lat: d.lat, lon: d.lon, sites: [d] });
  }
  return groups;
}

export function DeploymentMap() {
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const groups = cluster(deployments);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
      {/* Map */}
      <div className="relative mx-auto w-full max-w-md lg:max-w-none">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label="Map of India showing EvaraTech deployment sites"
        >
          <defs>
            <linearGradient id="india-fill" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#e3effa" />
              <stop offset="1" stopColor="#dcf5f2" />
            </linearGradient>
            <pattern id="india-dots" width="9" height="9" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.1" fill="#1c75bc" fillOpacity="0.16" />
            </pattern>
          </defs>
          <motion.path
            d={OUTLINE}
            fill="url(#india-fill)"
            stroke="#9cc9ec"
            strokeWidth="1.5"
            strokeLinejoin="round"
            initial={reduced ? false : { pathLength: 0, fillOpacity: 0 }}
            whileInView={{ pathLength: 1, fillOpacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />
          <path d={OUTLINE} fill="url(#india-dots)" />

          {groups.map((g, gi) => {
            const x = px(g.lon);
            const y = py(g.lat);
            const isActive = g.sites.some((s) => s.place === active);
            const label = g.sites.length > 1 ? g.sites[0].city : g.sites[0].place;
            return (
              <motion.g
                key={label}
                initial={reduced ? false : { opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 + gi * 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${x}px ${y}px` }}
                onMouseEnter={() => setActive(g.sites[0].place)}
                onMouseLeave={() => setActive(null)}
                className="cursor-pointer"
              >
                {!reduced && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="none"
                    stroke="#1c75bc"
                    strokeWidth="1.2"
                    animate={{ r: [8, 20], opacity: [0.6, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: gi * 0.5, ease: "easeOut" }}
                  />
                )}
                <circle cx={x} cy={y} r={isActive ? 9 : 7} fill="#1c75bc" fillOpacity="0.18" />
                <circle cx={x} cy={y} r={isActive ? 4.5 : 3.5} fill={isActive ? "#00a99d" : "#1c75bc"} />
                <text
                  x={x + 12}
                  y={y + 4}
                  fontSize="11"
                  fontWeight={600}
                  fill="#0f2138"
                  className="font-heading"
                >
                  {label}
                </text>
                {g.sites.length > 1 && (
                  <text x={x + 12} y={y + 17} fontSize="9" fill="#5c6b80">
                    {g.sites.length} sites
                  </text>
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Sites */}
      <ul className="flex flex-col gap-2">
        {deployments.map((d) => {
          const isActive = active === d.place;
          const inner = (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-heading text-base font-semibold text-evara-ink sm:text-lg">{d.place}</p>
                  <p className="mt-0.5 text-xs font-medium tracking-wide text-evara-water uppercase">{d.city}</p>
                </div>
                {d.caseStudy && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-evara-ink px-2.5 py-1 text-[11px] font-medium text-white">
                    Case study <ArrowRight className="size-3" />
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-evara-slate">{d.detail}</p>
              <motion.ul
                initial={false}
                animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                {d.installed.map((i) => (
                  <li key={i} className="mt-2 flex items-center gap-2 text-sm text-evara-ink/80 first:mt-3">
                    <span className="size-1.5 rounded-full bg-evara-teal" />
                    {i}
                  </li>
                ))}
              </motion.ul>
            </>
          );
          const cls = cn(
            "block rounded-xl border p-4 text-left backdrop-blur-xl transition-colors sm:p-5",
            isActive ? "border-evara-water-300 bg-white/75" : "border-white/70 bg-white/45 hover:bg-white/60"
          );
          return (
            <li key={d.place} onMouseEnter={() => setActive(d.place)} onMouseLeave={() => setActive(null)}>
              {d.caseStudy ? (
                <Link href={`/case-studies/${d.caseStudy}`} className={cls}>{inner}</Link>
              ) : (
                <button type="button" onClick={() => setActive(isActive ? null : d.place)} className={cn(cls, "w-full")}>{inner}</button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
