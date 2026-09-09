"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * EvaraPhase: the pump is started from a phone, and the starter watches every
 * phase feeding the motor. On phase failure, low voltage, overload or dry run
 * it cuts the supply before the winding is damaged.
 */
export function PumpControl() {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 420 400"
      className="h-auto w-full"
      role="img"
      aria-label="EvaraPhase smart pump starter controlled from a mobile app, monitoring all three phases and automatically cutting power on phase failure, overload or dry run"
    >
      {/* Phone */}
      <g>
        <rect x="18" y="86" width="96" height="176" rx="14" fill="#0f2138" />
        <rect x="25" y="100" width="82" height="148" rx="8" fill="#f7f9fc" />
        <text x="66" y="122" textAnchor="middle" className="fill-evara-slate text-[8px] tracking-[0.12em] uppercase">
          EvaraOne
        </text>
        <motion.rect
          x="38" y="150" width="56" height="56" rx="28"
          fill="#4ca02c"
          animate={reduced ? undefined : { opacity: [1, 0.72, 1] }}
          transition={reduced ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <text x="66" y="183" textAnchor="middle" className="fill-white text-[10px] font-semibold">
          START
        </text>
        <text x="66" y="228" textAnchor="middle" className="fill-evara-slate text-[8px]">
          from anywhere
        </text>
      </g>

      {/* Command travelling to the starter */}
      <path d="M120 174 H182" stroke="#cfd8e4" strokeWidth="1.5" strokeDasharray="4 5" />
      {!reduced && (
        <motion.circle
          cy="174" r="3.5" fill="#4ca02c"
          initial={{ cx: 122, opacity: 0 }}
          animate={{ cx: [122, 180], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
        />
      )}

      {/* Starter unit */}
      <g>
        <rect x="184" y="128" width="92" height="92" rx="10" fill="#0f2138" />
        <text x="230" y="116" textAnchor="middle" className="fill-evara-ink text-[11px] font-semibold">
          EvaraPhase
        </text>
        <circle cx="230" cy="150" r="5" fill="#3fc9bd" />

        {/* Three phase indicators */}
        {[
          { x: 204, label: "L1", ok: true },
          { x: 230, label: "L2", ok: true },
          { x: 256, label: "L3", ok: false },
        ].map((p, i) => (
          <g key={p.label}>
            <motion.rect
              x={p.x - 8} y={172} width="16" height="30" rx="3"
              fill={p.ok ? "#4ca02c" : "#d9534f"}
              animate={reduced || !p.ok ? undefined : { opacity: [0.55, 1, 0.55] }}
              transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
            />
            <text x={p.x} y={214} textAnchor="middle" className="fill-white text-[8px]">
              {p.label}
            </text>
          </g>
        ))}
      </g>

      {/* Supply lines down to the motor */}
      {[204, 230, 256].map((x, i) => (
        <line
          key={x}
          x1={x} y1="220" x2={x} y2="272"
          stroke={i === 2 ? "#d9534f" : "#22384f"}
          strokeWidth="2.5"
          strokeDasharray={i === 2 ? "4 4" : undefined}
        />
      ))}

      {/* Motor */}
      <g>
        <rect x="182" y="272" width="96" height="60" rx="10" fill="#b9c3d0" />
        {[192, 204, 216, 228, 240, 252, 264].map((x) => (
          <line key={x} x1={x} y1="278" x2={x} y2="326" stroke="#9aa7b6" strokeWidth="2" />
        ))}
        <circle cx="230" cy="302" r="14" fill="#0f2138" />
        <motion.line
          x1="230" y1="302" x2="230" y2="292"
          stroke="#3fc9bd" strokeWidth="2" strokeLinecap="round"
          style={{ transformOrigin: "230px 302px" }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={reduced ? undefined : { duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
        <text x="230" y="348" textAnchor="middle" className="fill-evara-slate text-[9px]">
          pump motor
        </text>
      </g>

      {/* Protection alert */}
      <g>
        <rect x="296" y="150" width="112" height="70" rx="9" fill="#fdecea" stroke="#f2c4c0" />
        <circle cx="312" cy="170" r="5" fill="#d9534f" />
        <text x="324" y="174" className="fill-[#8f2f2b] text-[9px] font-semibold">
          Phase failure
        </text>
        <text x="308" y="192" className="fill-[#8f2f2b] text-[8px]">
          L3 lost — pump stopped
        </text>
        <text x="308" y="206" className="fill-[#8f2f2b] text-[8px]">
          automatically
        </text>
      </g>

      <text x="296" y="252" className="fill-evara-teal text-[9px] font-medium">
        dry-run · overload · low voltage
      </text>
      <text x="296" y="266" className="fill-evara-slate text-[9px]">
        all cut before damage
      </text>
    </svg>
  );
}
