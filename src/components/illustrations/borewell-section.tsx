"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * EvaraDeep borewell cross-section. The patented mechanism sits at the top
 * of the casing and derives depth without any sensor entering the water —
 * the point of the drawing is that the device and the water never meet.
 */
export function BorewellSection() {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 420 520"
      className="h-auto w-full"
      role="img"
      aria-label="Cross-section of a borewell showing the EvaraDeep device mounted at the top of the casing, measuring water depth up to 100 metres without any sensor entering the water"
    >
      <defs>
        <linearGradient id="soil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8e2d8" />
          <stop offset="100%" stopColor="#d6cec1" />
        </linearGradient>
        <linearGradient id="deepWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4fa0dd" />
          <stop offset="100%" stopColor="#0d4f86" />
        </linearGradient>
      </defs>

      {/* Ground */}
      <rect x="0" y="96" width="420" height="424" fill="url(#soil)" />
      {/* Strata lines */}
      {[150, 226, 312, 402].map((y, i) => (
        <path
          key={y}
          d={`M0 ${y} Q 105 ${y - 8 + i * 3}, 210 ${y} T 420 ${y}`}
          fill="none"
          stroke="#c6bcac"
          strokeWidth="1.5"
          strokeDasharray={i % 2 ? "6 8" : undefined}
        />
      ))}
      <rect x="0" y="88" width="420" height="10" fill="#a8dd8e" opacity="0.5" />

      {/* Casing */}
      <rect x="176" y="96" width="68" height="410" fill="#f7f9fc" stroke="#b9c3d0" strokeWidth="2" />

      {/* Water column — recharges and depletes */}
      <clipPath id="wellClip">
        <rect x="178" y="98" width="64" height="406" />
      </clipPath>
      <g clipPath="url(#wellClip)">
        <motion.rect
          x="178"
          width="64"
          height="420"
          fill="url(#deepWater)"
          initial={{ y: 320 }}
          animate={reduced ? { y: 300 } : { y: [330, 268, 306, 330] }}
          transition={
            reduced
              ? undefined
              : { duration: 13, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </g>

      {/* Device at the wellhead — motor, encoder and tension switch */}
      <rect x="158" y="52" width="104" height="44" rx="8" fill="#0f2138" />
      {/* Spool the string pays out from */}
      <motion.circle
        cx="196"
        cy="74"
        r="10"
        fill="none"
        stroke="#8adfd7"
        strokeWidth="2"
        strokeDasharray="4 3"
        animate={reduced ? undefined : { rotate: 360 }}
        style={{ transformOrigin: "196px 74px" }}
        transition={
          reduced
            ? undefined
            : { duration: 6, repeat: Infinity, ease: "linear" }
        }
      />
      <circle cx="196" cy="74" r="2.5" fill="#8adfd7" />
      <circle cx="234" cy="74" r="5" fill="#3fc9bd" />
      <text x="210" y="42" textAnchor="middle" className="fill-evara-ink text-[12px] font-semibold">
        EvaraDeep
      </text>
      <text x="210" y="112" textAnchor="middle" className="fill-evara-slate text-[8px] tracking-wide uppercase">
        motor · encoder · tension switch
      </text>

      {/* Patented mechanism: motor pays out a string carrying a floating bob.
          The string is the only thing in the well; the bob floats and the
          tension switch fires the instant it reaches the surface. */}
      <motion.line
        x1="210"
        y1="96"
        x2="210"
        y2="292"
        stroke="#3fc9bd"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Floating bob resting on the water surface */}
      <motion.g
        initial={{ y: -140, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <ellipse cx="210" cy="300" rx="13" ry="9" fill="#3fc9bd" />
        <ellipse cx="210" cy="297" rx="13" ry="6" fill="#8adfd7" />
      </motion.g>
      <text x="252" y="286" className="fill-evara-teal text-[9px] font-medium">
        floating bob
      </text>
      <text x="252" y="298" className="fill-evara-slate text-[9px]">
        string only — no electronics
      </text>

      {/* Depth scale */}
      <line x1="290" y1="96" x2="290" y2="506" stroke="#a89f90" strokeWidth="1" />
      {[
        { y: 96, l: "0 m" },
        { y: 200, l: "25 m" },
        { y: 304, l: "50 m" },
        { y: 408, l: "75 m" },
        { y: 502, l: "100 m" },
      ].map((t) => (
        <g key={t.l}>
          <line x1="284" y1={t.y} x2="296" y2={t.y} stroke="#a89f90" strokeWidth="1" />
          <text x="304" y={t.y + 4} className="fill-evara-slate text-[10px]">
            {t.l}
          </text>
        </g>
      ))}

      {/* Uplink */}
      {!reduced && (
        <motion.circle
          cx="210"
          r="3.5"
          fill="#4ca02c"
          initial={{ cy: 56, opacity: 0 }}
          animate={{ cy: [56, 12], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.6, ease: "easeIn" }}
        />
      )}
      <circle cx="210" cy="14" r="10" fill="none" stroke="#74c454" strokeWidth="1" strokeOpacity="0.6" />
      <circle cx="210" cy="14" r="3.5" fill="#74c454" />

      {/* Reading */}
      <rect x="34" y="150" width="104" height="48" rx="8" fill="#ffffff" stroke="#e4e9f0" />
      <text x="86" y="172" textAnchor="middle" className="fill-evara-ink text-[16px] font-semibold">
        68.4 m
      </text>
      <text x="86" y="187" textAnchor="middle" className="fill-evara-slate text-[9px]">
        99.4% accuracy
      </text>
      <text x="86" y="228" textAnchor="middle" className="fill-evara-teal text-[10px] font-medium">
        Patent 202241055442
      </text>
    </svg>
  );
}
