"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * EvaraFlow: a clip-on camera photographs the dial of the analog meter that
 * is already installed, and on-device AI resolves the digits. The point of
 * the drawing is that the meter itself is untouched.
 */
export function MeterScan() {
  const reduced = useReducedMotion();

  const dials = [
    { cx: 118, v: "3" },
    { cx: 170, v: "7" },
    { cx: 222, v: "1" },
    { cx: 274, v: "5" },
  ];

  return (
    <svg
      viewBox="0 0 420 380"
      className="h-auto w-full"
      role="img"
      aria-label="EvaraFlow clip-on camera mounted over an existing analog water meter, reading its dials with on-device AI at 97% accuracy and sending the value to the cloud"
    >
      {/* Pipe the meter already sits on */}
      <rect x="10" y="196" width="400" height="26" rx="13" fill="#cfd8e4" />
      <rect x="10" y="196" width="400" height="12" rx="6" fill="#dfe6ee" />

      {/* Existing meter body */}
      <rect x="78" y="150" width="240" height="86" rx="12" fill="#ffffff" stroke="#cfd8e4" strokeWidth="2" />
      <text x="198" y="170" textAnchor="middle" className="fill-evara-slate-400 text-[9px] tracking-[0.14em] uppercase">
        existing analog meter — unmodified
      </text>

      {dials.map((d) => (
        <g key={d.cx}>
          <circle cx={d.cx} cy={200} r={19} fill="#f7f9fc" stroke="#b9c3d0" strokeWidth="1.5" />
          <text x={d.cx} y={206} textAnchor="middle" className="fill-evara-ink text-[15px] font-semibold">
            {d.v}
          </text>
          <line x1={d.cx} y1={200} x2={d.cx} y2={185} stroke="#1c75bc" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}

      {/* Clip-on camera module */}
      <g>
        <rect x="152" y="72" width="92" height="46" rx="9" fill="#0f2138" />
        <circle cx="198" cy="95" r="10" fill="#050d16" stroke="#3fc9bd" strokeWidth="1.5" />
        <motion.circle
          cx="198" cy="95" r="4" fill="#3fc9bd"
          initial={{ opacity: 0.5 }}
          animate={reduced ? { opacity: 0.9 } : { opacity: [0.3, 1, 0.3] }}
          transition={reduced ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <text x="198" y="60" textAnchor="middle" className="fill-evara-ink text-[11px] font-semibold">
          EvaraFlow
        </text>
        {/* clamp arms onto the meter */}
        <path d="M160 118 L150 150 M236 118 L246 150" stroke="#22384f" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Scan bracket sweeping the dial row */}
      <motion.g
        initial={{ opacity: 0.85 }}
        animate={reduced ? { opacity: 0.7 } : { opacity: [0.35, 0.95, 0.35] }}
        transition={reduced ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {[
          [92, 178, 1, 1],
          [304, 178, -1, 1],
          [92, 224, 1, -1],
          [304, 224, -1, -1],
        ].map(([x, y, dx, dy], i) => (
          <path
            key={i}
            d={`M${x} ${y} h${13 * (dx as number)} M${x} ${y} v${13 * (dy as number)}`}
            stroke="#3fc9bd"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}
      </motion.g>

      {/* Scan line travelling across the dials */}
      {!reduced && (
        <motion.line
          y1="180" y2="222"
          stroke="#3fc9bd" strokeWidth="1.5" strokeOpacity="0.7"
          initial={{ x1: 96, x2: 96 }}
          animate={{ x1: [96, 300], x2: [96, 300] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Resolved reading */}
      <g>
        <rect x="118" y="272" width="164" height="44" rx="9" fill="#0f2138" />
        <text x="200" y="294" textAnchor="middle" className="fill-white text-[16px] font-semibold">
          3715.42 m³
        </text>
        <text x="200" y="308" textAnchor="middle" className="fill-evara-teal-300 text-[9px]">
          97% on-device accuracy
        </text>
      </g>
      <line x1="200" y1="238" x2="200" y2="272" stroke="#74c454" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 5" />

      {/* Uplink */}
      {!reduced && (
        <motion.circle
          cx="200" r="3.5" fill="#4ca02c"
          initial={{ cy: 268, opacity: 0 }}
          animate={{ cy: [268, 340], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.2, ease: "easeIn" }}
        />
      )}
      <circle cx="200" cy="348" r="10" fill="none" stroke="#74c454" strokeWidth="1" strokeOpacity="0.55" />
      <circle cx="200" cy="348" r="3.5" fill="#74c454" />
      <text x="220" y="352" className="fill-evara-slate text-[9px]">
        EvaraOne
      </text>

      <text x="330" y="204" className="fill-evara-teal text-[9px] font-medium">
        no pipe cutting
      </text>
    </svg>
  );
}
