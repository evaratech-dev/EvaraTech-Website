"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * EvaraAMP: a split-core transformer closes around the existing supply cable,
 * so current is read without breaking the circuit. Healthy running and a
 * dry-run signature are shown side by side, because the difference between
 * them is the whole product.
 */
export function CurrentClamp() {
  const reduced = useReducedMotion();

  const healthy = "M0 22 Q 10 4, 20 22 T 40 22 T 60 22 T 80 22 T 100 22 T 120 22";
  const faulty =
    "M0 22 Q 6 10, 12 22 T 22 18 Q 30 2, 38 30 T 52 14 Q 60 30, 68 12 T 82 26 Q 92 6, 100 24 T 120 20";

  return (
    <svg
      viewBox="0 0 420 400"
      className="h-auto w-full"
      role="img"
      aria-label="EvaraAMP split-core current transformer clamped around a pump supply cable, tracking RMS current and distinguishing healthy running from a dry-run signature"
    >
      {/* Supply cable */}
      <rect x="8" y="92" width="404" height="18" rx="9" fill="#22384f" />
      <rect x="8" y="94" width="404" height="7" rx="3.5" fill="#33506c" />

      {/* Split-core clamp around the cable */}
      <g>
        <motion.g
          animate={reduced ? undefined : { y: [-3, 0, -3] }}
          transition={reduced ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* jaw halves */}
          <path
            d="M168 52 h84 a10 10 0 0 1 10 10 v34 h-26 v-22 h-52 v22 h-26 v-34 a10 10 0 0 1 10 -10 z"
            fill="#0f2138"
          />
          <path
            d="M158 106 h26 v22 h52 v-22 h26 v34 a10 10 0 0 1 -10 10 h-84 a10 10 0 0 1 -10 -10 z"
            fill="#17293c"
          />
          <circle cx="210" cy="66" r="4" fill="#3fc9bd" />
        </motion.g>
        <text x="210" y="40" textAnchor="middle" className="fill-evara-ink text-[11px] font-semibold">
          EvaraAMP
        </text>
        <text x="210" y="168" textAnchor="middle" className="fill-evara-teal text-[9px] font-medium">
          clamps on — circuit never broken
        </text>
      </g>

      {/* Healthy trace */}
      <g transform="translate(30, 214)">
        <rect x="-14" y="-26" width="168" height="82" rx="9" fill="#ffffff" stroke="#e4e9f0" />
        <text x="0" y="-10" className="fill-evara-slate text-[9px] tracking-wide uppercase">
          Normal
        </text>
        <motion.path
          d={healthy}
          fill="none"
          stroke="#4ca02c"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <text x="0" y="52" className="fill-evara-ink text-[10px] font-semibold">
          6.2 A
        </text>
        <text x="46" y="52" className="fill-evara-slate text-[9px]">
          steady RMS
        </text>
      </g>

      {/* Fault trace */}
      <g transform="translate(238, 214)">
        <rect x="-14" y="-26" width="168" height="82" rx="9" fill="#fdecea" stroke="#f2c4c0" />
        <text x="0" y="-10" className="fill-[#8f2f2b] text-[9px] tracking-wide uppercase">
          Dry run
        </text>
        <motion.path
          d={faulty}
          fill="none"
          stroke="#d9534f"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <text x="0" y="52" className="fill-[#8f2f2b] text-[10px] font-semibold">
          alert raised
        </text>
        <text x="72" y="52" className="fill-[#8f2f2b] text-[9px]">
          before failure
        </text>
      </g>

      {/* Energy tally */}
      <g>
        <rect x="112" y="320" width="196" height="52" rx="10" fill="#0f2138" />
        <text x="210" y="342" textAnchor="middle" className="fill-white text-[15px] font-semibold">
          1,284 kWh
        </text>
        <text x="210" y="358" textAnchor="middle" className="fill-evara-teal-300 text-[9px]">
          cumulative — billing & efficiency
        </text>
      </g>

      {/* sampling ticks into the tally */}
      {!reduced &&
        [0, 1].map((i) => (
          <motion.circle
            key={i}
            cx="210" r="3" fill="#3fc9bd"
            initial={{ cy: 176, opacity: 0 }}
            animate={{ cy: [176, 316], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 1.1, ease: "easeIn" }}
          />
        ))}
    </svg>
  );
}
