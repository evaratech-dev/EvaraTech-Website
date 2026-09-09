"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * EvaraRain: a tipping-bucket gauge. Rain fills one side of a see-saw until
 * it tips, and each tip is one fixed volume of rainfall. Counting tips gives
 * both total depth and intensity over time.
 */
export function TippingBucket() {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 420 400"
      className="h-auto w-full"
      role="img"
      aria-label="EvaraRain precision tipping-bucket rain gauge: rainfall fills one side of a pivoting bucket until it tips, and each tip is counted as a fixed volume of rain"
    >
      {/* Rainfall */}
      {!reduced &&
        Array.from({ length: 9 }).map((_, i) => {
          const x = 118 + i * 22;
          return (
            <motion.line
              key={i}
              x1={x} x2={x - 5}
              stroke="#9cc9ec"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ y1: 20, y2: 34, opacity: 0 }}
              animate={{ y1: [20, 96], y2: [34, 110], opacity: [0, 0.9, 0] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                delay: (i % 4) * 0.28 + Math.random() * 0.3,
                ease: "linear",
              }}
            />
          );
        })}

      {/* Collector funnel */}
      <path d="M110 104 H310 L246 176 H174 Z" fill="#e4e9f0" stroke="#cfd8e4" strokeWidth="2" />
      <text x="210" y="96" textAnchor="middle" className="fill-evara-slate text-[9px] tracking-[0.12em] uppercase">
        collector funnel
      </text>

      {/* Drip from funnel throat */}
      {!reduced &&
        [0, 1].map((i) => (
          <motion.circle
            key={i}
            cx="210" r="3" fill="#4fa0dd"
            initial={{ cy: 178, opacity: 0 }}
            animate={{ cy: [178, 216], opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.7, ease: "easeIn" }}
          />
        ))}

      {/* Tipping bucket see-saw */}
      <motion.g
        style={{ transformOrigin: "210px 246px" }}
        animate={reduced ? { rotate: -9 } : { rotate: [-9, -9, 9, 9, -9] }}
        transition={
          reduced
            ? undefined
            : { duration: 5.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.42, 0.5, 0.92, 1] }
        }
      >
        <path
          d="M148 250 L148 222 L206 222 L206 250 Z"
          fill="#0f2138"
        />
        <path
          d="M214 250 L214 222 L272 222 L272 250 Z"
          fill="#17293c"
        />
        <rect x="146" y="246" width="128" height="8" rx="4" fill="#22384f" />
      </motion.g>
      <circle cx="210" cy="246" r="6" fill="#3fc9bd" />
      <path d="M198 262 L210 246 L222 262 Z" fill="#b9c3d0" />
      <rect x="176" y="262" width="68" height="8" rx="4" fill="#cfd8e4" />

      {/* Tip counter */}
      <g>
        <rect x="30" y="216" width="104" height="52" rx="9" fill="#ffffff" stroke="#e4e9f0" />
        <text x="46" y="236" className="fill-evara-slate text-[9px] tracking-wide uppercase">
          Tips today
        </text>
        <motion.text
          x="46" y="258"
          className="fill-evara-ink text-[16px] font-semibold"
          animate={reduced ? undefined : { opacity: [1, 0.55, 1] }}
          transition={reduced ? undefined : { duration: 5.6, repeat: Infinity, times: [0.48, 0.52, 0.56] }}
        >
          142
        </motion.text>
        <text x="86" y="258" className="fill-evara-slate text-[9px]">
          × 0.2 mm
        </text>
      </g>

      {/* Rainfall total */}
      <g>
        <rect x="286" y="216" width="104" height="52" rx="9" fill="#0f2138" />
        <text x="302" y="236" className="fill-evara-teal-300 text-[9px] tracking-wide uppercase">
          Rainfall
        </text>
        <text x="302" y="258" className="fill-white text-[16px] font-semibold">
          28.4 mm
        </text>
      </g>

      {/* Intensity trace */}
      <g transform="translate(30, 300)">
        <rect x="-6" y="-12" width="372" height="76" rx="10" fill="#f7f9fc" stroke="#e4e9f0" />
        <text x="8" y="6" className="fill-evara-slate text-[9px] tracking-wide uppercase">
          Intensity — last 12 h
        </text>
        <motion.path
          d="M8 52 L38 46 L68 50 L98 30 L128 18 L158 26 L188 14 L218 34 L248 42 L278 30 L308 44 L348 50"
          fill="none"
          stroke="#1c75bc"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </g>

      <text x="210" y="392" textAnchor="middle" className="fill-evara-teal text-[9px] font-medium">
        hyperlocal · flood warning · harvesting yield
      </text>
    </svg>
  );
}
