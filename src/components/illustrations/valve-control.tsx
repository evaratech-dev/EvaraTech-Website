"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * EvaraValve: a motorised actuator on an existing distribution pipe. Flow is
 * metered as it passes, and supply to each zone can be opened, throttled or
 * closed on a schedule from the dashboard.
 */
export function ValveControl() {
  const reduced = useReducedMotion();

  const zones = [
    { y: 268, label: "Zone A", open: true },
    { y: 308, label: "Zone B", open: true },
    { y: 348, label: "Zone C", open: false },
  ];

  return (
    <svg
      viewBox="0 0 420 400"
      className="h-auto w-full"
      role="img"
      aria-label="EvaraValve motorised actuator on a distribution pipe, metering flow and opening or closing supply to individual zones on a schedule"
    >
      <defs>
        <linearGradient id="valvePipe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4fa0dd" />
          <stop offset="100%" stopColor="#1c75bc" />
        </linearGradient>
      </defs>

      {/* Main line */}
      <rect x="8" y="150" width="404" height="30" rx="15" fill="#cfd8e4" />
      <rect x="12" y="156" width="396" height="18" rx="9" fill="url(#valvePipe)" opacity="0.9" />

      {/* Flow pulses along the main line */}
      {!reduced &&
        [0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cy="165" r="4" fill="#ffffff" fillOpacity="0.85"
            initial={{ cx: 20 }}
            animate={{ cx: [20, 400] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: i * 1.05, ease: "linear" }}
          />
        ))}

      {/* Valve body + actuator */}
      <rect x="168" y="140" width="84" height="50" rx="8" fill="#b9c3d0" />
      <rect x="176" y="72" width="68" height="70" rx="10" fill="#0f2138" />
      <text x="210" y="60" textAnchor="middle" className="fill-evara-ink text-[11px] font-semibold">
        EvaraValve
      </text>

      {/* Actuator stem turning */}
      <motion.g
        style={{ transformOrigin: "210px 107px" }}
        animate={reduced ? undefined : { rotate: [0, 90, 90, 0] }}
        transition={reduced ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut", times: [0, 0.35, 0.7, 1] }}
      >
        <rect x="196" y="103" width="28" height="8" rx="4" fill="#3fc9bd" />
        <circle cx="210" cy="107" r="5" fill="#8adfd7" />
      </motion.g>
      <line x1="210" y1="142" x2="210" y2="156" stroke="#22384f" strokeWidth="4" />

      {/* Inline meter readout */}
      <g>
        <rect x="20" y="196" width="132" height="42" rx="8" fill="#ffffff" stroke="#e4e9f0" />
        <text x="86" y="216" textAnchor="middle" className="fill-evara-ink text-[14px] font-semibold">
          12.4 m³/h
        </text>
        <text x="86" y="229" textAnchor="middle" className="fill-evara-slate text-[9px]">
          metered in-line
        </text>
      </g>

      {/* Zone branches */}
      {zones.map((z, i) => (
        <g key={z.label}>
          <path
            d={`M300 180 C 340 180, 340 ${z.y}, 372 ${z.y}`}
            fill="none"
            stroke={z.open ? "#4fa0dd" : "#cfd8e4"}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {z.open && !reduced && (
            <motion.circle
              r="3" fill="#ffffff" fillOpacity="0.9"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
            >
              <animateMotion
                dur={`${2.4}s`}
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
                path={`M300 180 C 340 180, 340 ${z.y}, 372 ${z.y}`}
              />
            </motion.circle>
          )}
          <circle cx="378" cy={z.y} r="7" fill={z.open ? "#4ca02c" : "#93a1b3"} />
          <text x="392" y={z.y + 4} className="fill-evara-slate text-[10px]">
            {z.label}
          </text>
        </g>
      ))}

      {/* Schedule / control card */}
      <g>
        <rect x="20" y="266" width="150" height="96" rx="10" fill="#ffffff" stroke="#e4e9f0" />
        <text x="34" y="288" className="fill-evara-ink text-[10px] font-semibold">
          Schedule
        </text>
        {[
          { y: 306, t: "06:00 — open", on: true },
          { y: 326, t: "13:00 — throttle", on: true },
          { y: 346, t: "22:00 — close", on: false },
        ].map((r) => (
          <g key={r.t}>
            <rect x="34" y={r.y - 9} width="22" height="12" rx="6" fill={r.on ? "#dcf5f2" : "#eef2f8"} />
            <circle cx={r.on ? 50 : 40} cy={r.y - 3} r="4.5" fill={r.on ? "#00a99d" : "#93a1b3"} />
            <text x="64" y={r.y} className="fill-evara-slate text-[9px]">
              {r.t}
            </text>
          </g>
        ))}
      </g>

      <text x="258" y="128" className="fill-evara-teal text-[9px] font-medium">
        remote open · throttle · close
      </text>
    </svg>
  );
}
