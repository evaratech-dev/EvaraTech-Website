"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section, Container } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { platformModules } from "@/lib/evara-data";

/**
 * Inside EvaraOne: the seven modules, as a bento of small living instruments.
 *
 * A grid of text cards says "we have seven features". A grid where each card
 * shows its feature doing something says "this is what your screen looks like
 * at 6am when a tank is about to run dry". Every visual is SVG or CSS, loops
 * under Framer, and holds still under reduced motion.
 */
export function Platform() {
  return (
    <Section tone="mist" id="platform">
      <Container>
        <SectionHeading
          align="center"
          kicker="Inside EvaraOne"
          title={`${platformModules.length} modules. One login.`}
          description="Everything the platform does, grouped the way operators actually work. Each one is live below."
        />

        <motion.div
          variants={staggerContainer(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 grid auto-rows-[minmax(14rem,auto)] grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-6"
        >
          <Tile module={platformModules[1]} span="lg:col-span-4" visual={<LiveMonitoring />} />
          <Tile module={platformModules[2]} span="lg:col-span-2" visual={<AlertEngine />} />
          <Tile module={platformModules[0]} span="lg:col-span-2" visual={<DeviceGrid />} />
          <Tile module={platformModules[3]} span="lg:col-span-2" visual={<Forecast />} />
          <Tile module={platformModules[6]} span="lg:col-span-2" visual={<Voice />} />
          <Tile module={platformModules[4]} span="lg:col-span-3" visual={<Sites />} />
          <Tile module={platformModules[5]} span="lg:col-span-3" visual={<Api />} />
        </motion.div>
      </Container>
    </Section>
  );
}

function Tile({
  module,
  span,
  visual,
}: {
  module: { title: string; detail: string };
  span: string;
  visual: React.ReactNode;
}) {
  return (
    <motion.article
      variants={fadeUp}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/55 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-evara-water-300 hover:bg-white/75 hover:shadow-[0_28px_60px_-30px_rgba(15,33,56,0.35)]",
        span
      )}
    >
      <div className="relative flex-1 overflow-hidden">{visual}</div>
      <div className="border-t border-evara-line/70 p-5">
        <h3 className="font-heading text-base font-semibold text-evara-ink sm:text-lg">
          {module.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-evara-slate">{module.detail}</p>
      </div>
    </motion.article>
  );
}

/* ---------- Visuals ---------- */

const EASE = [0.16, 1, 0.3, 1] as const;

/** A tank filling and a sparkline drawing itself: the front page of the app. */
function LiveMonitoring() {
  const reduced = useReducedMotion();
  return (
    <div className="grid h-full grid-cols-[auto_1fr] items-end gap-6 p-5 sm:gap-10 sm:p-6">
      <div className="relative h-36 w-20 overflow-hidden rounded-xl border border-evara-line bg-white/70 sm:h-44 sm:w-24">
        <motion.div
          initial={{ height: reduced ? "78%" : "20%" }}
          whileInView={{ height: "78%" }}
          viewport={{ once: true }}
          transition={{ duration: 2.2, ease: EASE }}
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-evara-water to-evara-water-400"
        />
        <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-center pb-3">
          <span className="rounded-md bg-white/85 px-2 py-0.5 font-heading text-lg font-semibold text-evara-ink tabular-nums">
            78%
          </span>
        </div>
        <span className="absolute top-2 left-2 text-[10px] font-medium tracking-wider text-evara-slate uppercase">
          Tank 4
        </span>
      </div>
      <div className="flex h-36 flex-col justify-between sm:h-44">
        <div className="flex items-center justify-between text-xs text-evara-slate">
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-evara-teal shadow-[0_0_0_3px_rgba(0,169,157,0.2)]" />
            Live · 5 sites · 214 devices
          </span>
          <span className="font-mono">last 24h</span>
        </div>
        <svg viewBox="0 0 320 120" className="h-24 w-full sm:h-28" aria-hidden="true">
          <defs>
            <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#1c75bc" stopOpacity="0.28" />
              <stop offset="1" stopColor="#1c75bc" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0 92 C 30 88, 50 60, 80 66 S 130 40, 160 46 S 210 70, 240 52 S 290 20, 320 30 L320 120 L0 120 Z"
            fill="url(#spark-fill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 1 }}
          />
          <motion.path
            d="M0 92 C 30 88, 50 60, 80 66 S 130 40, 160 46 S 210 70, 240 52 S 290 20, 320 30"
            fill="none"
            stroke="#1c75bc"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: reduced ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: EASE }}
          />
          <motion.circle
            r="4"
            cx="320"
            cy="30"
            fill="#1c75bc"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.7 }}
          />
        </svg>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {[["Inflow", "2.4 kL/h"], ["Draw", "1.1 kL/h"], ["Runs dry", "18 h"]].map(([k, v]) => (
            <div key={k} className="rounded-lg bg-white/70 px-2.5 py-1.5">
              <p className="text-evara-slate">{k}</p>
              <p className="font-heading font-semibold text-evara-ink tabular-nums">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Alerts stacking in, newest on top. */
function AlertEngine() {
  const reduced = useReducedMotion();
  const alerts = [
    { tone: "amber", text: "Sector 4 tank projected dry in 18 h" },
    { tone: "red", text: "Pump P2 dry-run detected, cut in 3 s" },
    { tone: "blue", text: "Meter 117 night-flow: probable leak" },
  ];
  return (
    <div className="flex h-full flex-col justify-end gap-2 p-5">
      {alerts.map((a, i) => (
        <motion.div
          key={a.text}
          initial={reduced ? false : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.35, ease: EASE }}
          className={cn(
            "flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-xs leading-snug sm:text-sm",
            a.tone === "amber" && "border-amber-200 bg-amber-50 text-amber-900",
            a.tone === "red" && "border-red-200 bg-red-50 text-red-900",
            a.tone === "blue" && "border-evara-water-300 bg-evara-water-100 text-evara-ink"
          )}
        >
          <span
            className={cn(
              "mt-1 size-2 shrink-0 rounded-full",
              a.tone === "amber" && "bg-amber-500",
              a.tone === "red" && "bg-red-500",
              a.tone === "blue" && "bg-evara-water"
            )}
          />
          {a.text}
        </motion.div>
      ))}
    </div>
  );
}

/** Every device as a dot, a few of them breathing. */
function DeviceGrid() {
  const reduced = useReducedMotion();
  const cells = Array.from({ length: 48 }, (_, i) => i);
  const offline = new Set([7, 29]);
  const busy = new Set([3, 12, 20, 33, 41]);
  return (
    <div className="flex h-full items-center justify-center p-5">
      <div className="grid grid-cols-8 gap-2">
        {cells.map((i) => (
          <motion.span
            key={i}
            className={cn(
              "size-3 rounded-[4px] sm:size-3.5",
              offline.has(i) ? "bg-evara-slate-400/40" : busy.has(i) ? "bg-evara-teal" : "bg-evara-water/80"
            )}
            animate={
              reduced || !busy.has(i)
                ? undefined
                : { opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }
            }
            transition={{ duration: 1.8, repeat: Infinity, delay: (i % 7) * 0.25, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

/** A forecast curve with its confidence band. */
function Forecast() {
  const reduced = useReducedMotion();
  return (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="flex items-center justify-between text-xs text-evara-slate">
        <span>Usage forecast</span>
        <span className="rounded-full bg-evara-teal-100 px-2 py-0.5 font-medium text-evara-teal">7-day</span>
      </div>
      <svg viewBox="0 0 320 130" className="h-28 w-full" aria-hidden="true">
        <line x1="180" x2="180" y1="8" y2="122" stroke="#d4dbe6" strokeDasharray="3 4" />
        <motion.path
          d="M180 70 C 210 62, 240 84, 270 68 S 305 46, 320 52 L320 92 C 305 86, 270 108, 240 100 S 205 92, 180 96 Z"
          fill="#00a99d"
          fillOpacity="0.14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
        />
        <motion.path
          d="M0 96 C 40 92, 70 60, 100 70 S 150 84, 180 76"
          fill="none"
          stroke="#1c75bc"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: reduced ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
        />
        <motion.path
          d="M180 76 C 210 72, 240 96, 270 82 S 305 66, 320 70"
          fill="none"
          stroke="#00a99d"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 5"
          initial={{ pathLength: reduced ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.1, ease: EASE }}
        />
        <text x="8" y="122" fontSize="10" fill="#8a97a8">measured</text>
        <text x="186" y="122" fontSize="10" fill="#00a99d">predicted</text>
      </svg>
    </div>
  );
}

/** Spoken alert, as a waveform. */
function Voice() {
  const reduced = useReducedMotion();
  const bars = [10, 22, 34, 18, 42, 26, 38, 16, 30, 44, 20, 32, 14, 24, 36, 18];
  return (
    <div className="flex h-full flex-col justify-between p-5">
      <p className="text-xs text-evara-slate">
        <span className="font-medium text-evara-ink">Spoken alert</span> · Telugu, Hindi, English
      </p>
      <div className="flex h-16 items-center justify-center gap-1">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="w-1.5 rounded-full bg-evara-water"
            style={{ height: h }}
            animate={reduced ? undefined : { scaleY: [1, 0.35, 1.15, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.07, ease: "easeInOut" }}
          />
        ))}
      </div>
      <p className="rounded-xl bg-white/70 px-3 py-2 text-xs leading-snug text-evara-ink sm:text-sm">
        &ldquo;Block C tank at twelve percent. Refill scheduled for six a.m.&rdquo;
      </p>
    </div>
  );
}

/** Sites as a cluster of pins with a line between them. */
function Sites() {
  const reduced = useReducedMotion();
  const pins = [
    { x: 40, y: 78, label: "Rashtrapati Nilayam" },
    { x: 120, y: 40, label: "IIIT Hyderabad" },
    { x: 200, y: 92, label: "Lulu Mall" },
    { x: 268, y: 34, label: "Sangareddy" },
    { x: 300, y: 104, label: "Jakkur Lake" },
  ];
  return (
    <div className="flex h-full items-center p-5">
      <svg viewBox="0 0 340 130" className="h-full w-full" aria-hidden="true">
        <motion.path
          d={`M${pins.map((p) => `${p.x} ${p.y}`).join(" L")}`}
          fill="none"
          stroke="#9cc9ec"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          initial={{ pathLength: reduced ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: EASE }}
        />
        {pins.map((p, i) => (
          <motion.g
            key={p.label}
            initial={reduced ? false : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.25, ease: EASE }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          >
            <circle cx={p.x} cy={p.y} r="10" fill="#1c75bc" fillOpacity="0.14" />
            <circle cx={p.x} cy={p.y} r="4" fill="#1c75bc" />
            <text x={p.x + 12} y={p.y + 4} fontSize="10" fill="#33506c">
              {p.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

/** The integration surface, as the thing a developer would actually type. */
function Api() {
  return (
    <div className="flex h-full flex-col justify-center p-5">
      <pre className="overflow-x-auto rounded-xl bg-evara-ink p-4 font-mono text-[11px] leading-relaxed text-white/85 sm:text-xs">
        <code>
          <span className="text-evara-teal-300">GET</span> /v1/sites/<span className="text-evara-water-300">sec-4</span>/tanks/latest
          {"\n"}
          {"\n"}
          {"{"}
          {"\n"}  &quot;level_pct&quot;: <span className="text-evara-teal-300">78</span>,
          {"\n"}  &quot;available_l&quot;: <span className="text-evara-teal-300">15600</span>,
          {"\n"}  &quot;runs_dry_in_h&quot;: <span className="text-amber-300">18</span>,
          {"\n"}  &quot;alerts&quot;: [<span className="text-evara-water-300">&quot;LOW_LEVEL_FORECAST&quot;</span>]
          {"\n"}
          {"}"}
        </code>
      </pre>
    </div>
  );
}
