"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bell, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A simulated EvaraOne panel for one device.
 *
 * Instead of a screenshot, the product page gets the instrument's own
 * dashboard tile running: a live reading that ticks, a trace that draws
 * itself, and the one thing a demo should let you do, which is cause the
 * fault and watch the platform catch it. Everything is generated locally;
 * no data leaves the page.
 */

type Event = {
  label: string;
  /** Multiplier curve applied over the event's duration, 0..1 -> value delta. */
  effect: (t: number) => number;
  /** Ticks the event lasts. */
  ticks: number;
  alert: string;
};

type Config = {
  site: string;
  metric: string;
  unit: string;
  base: number;
  /** Random walk amplitude per tick. */
  jitter: number;
  min: number;
  max: number;
  decimals: number;
  /** Alert threshold on the value, with direction. */
  threshold?: { at: number; when: "above" | "below"; text: string };
  events: Event[];
  gauge?: "tank" | "depth" | "flow" | "valve" | "phase" | "quality" | "rain";
};

const CONFIG: Record<string, Config> = {
  evaratank: {
    site: "Block C, Tank 4",
    metric: "Level",
    unit: "%",
    base: 64,
    jitter: 0.25,
    min: 0,
    max: 100,
    decimals: 0,
    threshold: { at: 20, when: "below", text: "Low level on Tank 4. Refill scheduled." },
    gauge: "tank",
    events: [
      { label: "Start refill", ticks: 16, effect: (t) => t * 30, alert: "Refill cycle detected on Tank 4" },
      { label: "Simulate leak", ticks: 18, effect: (t) => -t * 50, alert: "Rapid depletion on Tank 4: probable leak" },
    ],
  },
  evaradeep: {
    site: "Borewell B2",
    metric: "Depth to water",
    unit: "m",
    base: 18.4,
    jitter: 0.04,
    min: 0,
    max: 60,
    decimals: 1,
    threshold: { at: 26, when: "above", text: "Drawdown past safe depth on B2. Pump cut." },
    gauge: "depth",
    events: [
      { label: "Run pump", ticks: 20, effect: (t) => t * 9, alert: "Drawdown on B2 while pumping" },
      { label: "Overnight recharge", ticks: 20, effect: (t) => -t * 4, alert: "Recharge detected on B2" },
    ],
  },
  evaraflow: {
    site: "Meter 117, Tower A",
    metric: "Flow",
    unit: "L/min",
    base: 4.2,
    jitter: 0.5,
    min: 0,
    max: 40,
    decimals: 1,
    gauge: "flow",
    events: [
      { label: "Go to night mode", ticks: 22, effect: (t) => -4.2 + (t > 0.45 ? 1.8 : 0), alert: "Night-flow on Meter 117: 1.8 L/min with no demand. Probable leak" },
      { label: "Peak morning draw", ticks: 16, effect: (t) => Math.sin(t * Math.PI) * 18, alert: "Peak usage window on Meter 117" },
    ],
  },
  evaravalve: {
    site: "Zone 3 inlet",
    metric: "Flow through valve",
    unit: "L/min",
    base: 22,
    jitter: 0.6,
    min: 0,
    max: 40,
    decimals: 0,
    gauge: "valve",
    events: [
      { label: "Close valve", ticks: 10, effect: (t) => -22 * Math.min(1, t * 1.6), alert: "Zone 3 isolated. Valve closed in 6 s" },
      { label: "Schedule: open at 06:00", ticks: 10, effect: (t) => -22 + 22 * Math.min(1, t * 1.6), alert: "Zone 3 valve opened on schedule" },
    ],
  },
  evaraamp: {
    site: "Pump P2, 15 HP",
    metric: "Line current",
    unit: "A",
    base: 14.6,
    jitter: 0.15,
    min: 0,
    max: 40,
    decimals: 1,
    threshold: { at: 24, when: "above", text: "Overload on P2. Motor stopped." },
    gauge: "phase",
    events: [
      { label: "Dry run", ticks: 14, effect: (t) => -t * 9, alert: "Current collapsed on P2: dry run. Motor stopped" },
      { label: "Drop phase L3", ticks: 14, effect: (t) => t * 12, alert: "Phase loss on L3: imbalance 38%. Motor stopped" },
    ],
  },
  evaratds: {
    site: "RO outlet, Bakul",
    metric: "TDS",
    unit: "ppm",
    base: 86,
    jitter: 0.8,
    min: 0,
    max: 400,
    decimals: 0,
    threshold: { at: 150, when: "above", text: "TDS above 150 ppm at the RO outlet." },
    gauge: "quality",
    events: [
      { label: "Membrane fouling", ticks: 22, effect: (t) => t * 110, alert: "TDS rising at RO outlet: membrane service due" },
      { label: "After service", ticks: 14, effect: (t) => -Math.min(1, t * 1.5) * 20, alert: "TDS back within range" },
    ],
  },
  evararain: {
    site: "Rooftop gauge",
    metric: "Rainfall",
    unit: "mm/h",
    base: 0.4,
    jitter: 0.2,
    min: 0,
    max: 60,
    decimals: 1,
    threshold: { at: 30, when: "above", text: "Heavy rainfall. Flood early warning issued." },
    gauge: "rain",
    events: [
      { label: "Cloudburst", ticks: 20, effect: (t) => Math.sin(t * Math.PI) * 44, alert: "Heavy rainfall: 42 mm/h. Early warning sent" },
      { label: "Light drizzle", ticks: 20, effect: (t) => Math.sin(t * Math.PI) * 3, alert: "Rain event logged: 3 mm/h" },
    ],
  },
  evaraphase: {
    site: "Field pump",
    metric: "Supply voltage",
    unit: "V",
    base: 412,
    jitter: 1.2,
    min: 0,
    max: 480,
    decimals: 0,
    threshold: { at: 360, when: "below", text: "Under-voltage. Pump held off." },
    gauge: "phase",
    events: [
      { label: "Phase failure", ticks: 14, effect: (t) => -Math.min(1, t * 2) * 140, alert: "Phase failure. Pump stopped before damage" },
      { label: "Start from phone", ticks: 6, effect: () => 0, alert: "Pump started remotely" },
    ],
  },
};

const POINTS = 44;

export function DevicePanel({ slug, name }: { slug: string; name: string }) {
  const cfg = CONFIG[slug];
  const reduced = useReducedMotion();
  const [series, setSeries] = useState<number[]>(() => Array.from({ length: POINTS }, () => cfg?.base ?? 0));
  const [alerts, setAlerts] = useState<{ id: number; text: string }[]>([]);
  const eventRef = useRef<{ ev: Event; tick: number } | null>(null);
  const lastAlertRef = useRef<string | null>(null);
  const idRef = useRef(0);

  useEffect(() => {
    if (!cfg) return;
    const step = () => {
      setSeries((prev) => {
        const last = prev[prev.length - 1];
        let next = last + (Math.random() - 0.5) * 2 * cfg.jitter;
        // Drift gently back toward base when idle.
        next += (cfg.base - next) * 0.04;
        const e = eventRef.current;
        if (e) {
          const t = e.tick / e.ev.ticks;
          next = cfg.base + e.ev.effect(t) + (Math.random() - 0.5) * cfg.jitter;
          e.tick += 1;
          if (e.tick > e.ev.ticks) eventRef.current = null;
        }
        next = Math.max(cfg.min, Math.min(cfg.max, next));
        if (cfg.threshold) {
          const hit = cfg.threshold.when === "above" ? next > cfg.threshold.at : next < cfg.threshold.at;
          if (hit && lastAlertRef.current !== cfg.threshold.text) {
            lastAlertRef.current = cfg.threshold.text;
            push(cfg.threshold.text);
          }
          if (!hit && lastAlertRef.current === cfg.threshold.text) lastAlertRef.current = null;
        }
        return [...prev.slice(1), next];
      });
    };
    const id = setInterval(step, reduced ? 1400 : 650);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfg, reduced]);

  const push = (text: string) => {
    idRef.current += 1;
    const id = idRef.current;
    setAlerts((a) => [{ id, text }, ...a].slice(0, 3));
  };

  const fire = (ev: Event) => {
    eventRef.current = { ev, tick: 0 };
    push(ev.alert);
  };

  const reset = () => {
    eventRef.current = null;
    lastAlertRef.current = null;
    setSeries(Array.from({ length: POINTS }, () => cfg.base));
    setAlerts([]);
  };

  const path = useMemo(() => {
    const w = 320, h = 96;
    const lo = cfg.min, hi = cfg.max;
    const vals = series;
    const minV = Math.min(...vals), maxV = Math.max(...vals);
    const span = Math.max(maxV - minV, (hi - lo) * 0.08);
    const y = (v: number) => h - ((v - (minV - span * 0.15)) / (span * 1.3)) * h;
    const x = (i: number) => (i / (POINTS - 1)) * w;
    return vals.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  }, [series, cfg]);

  if (!cfg) return null;
  const value = series[series.length - 1];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/70 bg-white/55 backdrop-blur-xl">
      {/* Title bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-evara-line/70 px-5 py-3.5">
        <div className="flex items-center gap-2.5 text-sm">
          <span className="size-2 rounded-full bg-evara-teal shadow-[0_0_0_3px_rgba(0,169,157,0.2)]" />
          <span className="font-heading font-semibold text-evara-ink">EvaraOne</span>
          <span className="text-evara-slate">· {name} · {cfg.site}</span>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-full border border-evara-line px-3 py-1.5 text-xs font-medium text-evara-slate transition-colors hover:border-evara-water hover:text-evara-ink"
        >
          <RotateCcw className="size-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 p-5 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-6">
        {/* Reading + gauge */}
        <div className="flex items-end gap-5">
          <Gauge kind={cfg.gauge} value={value} min={cfg.min} max={cfg.max} />
          <div>
            <p className="text-xs font-medium tracking-[0.14em] text-evara-slate uppercase">{cfg.metric}</p>
            <p className="mt-1 font-heading text-4xl font-semibold text-evara-ink tabular-nums sm:text-5xl">
              {value.toFixed(cfg.decimals)}
              <span className="ml-1 text-base font-medium text-evara-slate">{cfg.unit}</span>
            </p>
          </div>
        </div>

        {/* Trace */}
        <div className="flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-evara-slate">
            <span>Last 30 minutes</span>
            <span className="font-mono">{value.toFixed(cfg.decimals)} {cfg.unit}</span>
          </div>
          <svg viewBox="0 0 320 96" className="mt-2 h-24 w-full" aria-hidden="true">
            <defs>
              <linearGradient id={`fill-${slug}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#1c75bc" stopOpacity="0.25" />
                <stop offset="1" stopColor="#1c75bc" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${path} L320 96 L0 96 Z`} fill={`url(#fill-${slug})`} />
            <path d={path} fill="none" stroke="#1c75bc" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 border-t border-evara-line/70 px-5 py-4">
        <span className="mr-1 text-xs font-medium tracking-[0.14em] text-evara-slate uppercase">Try it</span>
        {cfg.events.map((ev) => (
          <button
            key={ev.label}
            type="button"
            onClick={() => fire(ev)}
            className="rounded-full bg-evara-ink px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-evara-navy-700"
          >
            {ev.label}
          </button>
        ))}
      </div>

      {/* Alerts */}
      <div className="border-t border-evara-line/70 bg-white/40 px-5 py-4">
        <div className="flex items-center gap-2 text-xs font-medium tracking-[0.14em] text-evara-slate uppercase">
          <Bell className="size-3.5" /> Alerts
        </div>
        <ul className="mt-3 flex min-h-[2.5rem] flex-col gap-2">
          <AnimatePresence initial={false}>
            {alerts.length === 0 && (
              <motion.li key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm text-evara-slate">
                Nothing to report. Press a button above to cause a fault.
              </motion.li>
            )}
            {alerts.map((a, i) => (
              <motion.li
                key={a.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-sm",
                  i === 0 ? "border-amber-200 bg-amber-50 text-amber-900" : "border-evara-line bg-white/70 text-evara-slate"
                )}
              >
                <span className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", i === 0 ? "bg-amber-500" : "bg-evara-slate-400")} />
                {a.text}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

function Gauge({ kind, value, min, max }: { kind?: Config["gauge"]; value: number; min: number; max: number }) {
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  if (kind === "tank" || kind === "quality" || kind === "rain") {
    return (
      <div className="relative h-28 w-16 overflow-hidden rounded-xl border border-evara-line bg-white/80">
        <motion.div
          animate={{ height: `${pct * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cn("absolute inset-x-0 bottom-0", kind === "quality" ? "bg-gradient-to-t from-evara-teal to-evara-teal-300" : "bg-gradient-to-t from-evara-water to-evara-water-400")}
        />
      </div>
    );
  }
  if (kind === "depth") {
    return (
      <div className="relative h-28 w-16 overflow-hidden rounded-xl border border-evara-line bg-[#eef2f8]">
        <div className="absolute inset-x-6 top-0 bottom-0 bg-white" />
        <motion.div
          animate={{ top: `${pct * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-x-6 bottom-0 bg-gradient-to-t from-evara-water to-evara-water-400"
        />
      </div>
    );
  }
  // flow / valve / phase: an arc
  const angle = -110 + pct * 220;
  return (
    <svg viewBox="0 0 80 80" className="h-24 w-24" aria-hidden="true">
      <path d="M12 60 A32 32 0 1 1 68 60" fill="none" stroke="#e4e9f0" strokeWidth="8" strokeLinecap="round" />
      <motion.path
        d="M12 60 A32 32 0 1 1 68 60"
        fill="none"
        stroke="#1c75bc"
        strokeWidth="8"
        strokeLinecap="round"
        style={{ pathLength: pct }}
        animate={{ pathLength: pct }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <motion.line
        x1="40" y1="46" x2="40" y2="20"
        stroke="#0f2138" strokeWidth="2.5" strokeLinecap="round"
        style={{ transformOrigin: "40px 46px" }}
        animate={{ rotate: angle }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <circle cx="40" cy="46" r="3" fill="#0f2138" />
    </svg>
  );
}
