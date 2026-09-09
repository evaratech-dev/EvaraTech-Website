"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bell, Droplets, Gauge } from "lucide-react";

/**
 * Stylized representation of the EvaraOne dashboard — not a product
 * screenshot (none exists yet per the brand brief), built from the
 * described modules: live tank gauge, borewell depth trend, alerts feed.
 */
export function DashboardMock() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/50 p-4 shadow-[0_24px_60px_-30px_rgba(15,33,56,0.35)] backdrop-blur-xl sm:p-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
      />
      <div className="flex items-center justify-between border-b border-white/50 pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-evara-leaf" />
          <span className="text-xs font-medium text-evara-ink">
            EvaraOne · Live
          </span>
        </div>
        <span className="text-[11px] text-evara-slate">
          5 sites · 214 devices
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="col-span-2 rounded-xl border border-white/50 bg-white/35 p-4 sm:col-span-1">
          <div className="flex items-center gap-2 text-evara-water">
            <Droplets className="size-4" strokeWidth={1.8} />
            <span className="text-xs font-medium text-evara-ink">
              Tank level
            </span>
          </div>
          <div className="mt-4 flex items-end gap-3">
            <span className="font-heading text-3xl font-semibold text-evara-ink">
              78%
            </span>
            <div className="mb-1 h-16 w-8 overflow-hidden rounded-md border border-white/60 bg-white/50">
              <motion.div
                className="w-full bg-evara-water/70"
                initial={{ height: "20%" }}
                animate={
                  reduceMotion
                    ? { height: "78%" }
                    : { height: ["55%", "78%", "62%", "78%"] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }
              />
            </div>
          </div>
        </div>

        <div className="col-span-2 rounded-xl border border-white/50 bg-white/35 p-4 sm:col-span-1">
          <div className="flex items-center gap-2 text-evara-teal">
            <Gauge className="size-4" strokeWidth={1.8} />
            <span className="text-xs font-medium text-evara-ink">
              Borewell depth
            </span>
          </div>
          <svg viewBox="0 0 120 48" className="mt-3 h-12 w-full">
            <motion.path
              d="M0 30 L20 26 L40 32 L60 20 L80 24 L100 14 L120 18"
              fill="none"
              stroke="var(--color-evara-teal)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        </div>

        <div className="col-span-2 rounded-xl border border-evara-amber/30 bg-evara-amber/10 p-4">
          <div className="flex items-center gap-2 text-evara-amber">
            <Bell className="size-4" strokeWidth={1.8} />
            <span className="text-xs font-semibold text-[#8a6400]">
              Predictive alert
            </span>
          </div>
          <p className="mt-2 text-sm leading-snug text-[#5c4300]">
            Sector 4 tank projected to run dry in 18 hours — schedule refill.
          </p>
        </div>
      </div>
    </div>
  );
}
