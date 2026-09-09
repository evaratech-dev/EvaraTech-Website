"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * EvaraTDS: an inline probe at the RO storage tank samples continuously,
 * corrects for temperature, and takes a median across readings so a single
 * noisy sample never raises a false alarm.
 */
export function TdsInline() {
  const reduced = useReducedMotion();

  const bands = [
    { label: "Good", from: 0, to: 0.45, color: "#4ca02c" },
    { label: "Watch", from: 0.45, to: 0.72, color: "#e0a400" },
    { label: "High", from: 0.72, to: 1, color: "#d9534f" },
  ];
  const reading = 0.34; // 168 ppm on a 0–500 scale

  return (
    <svg
      viewBox="0 0 420 400"
      className="h-auto w-full"
      role="img"
      aria-label="EvaraTDS inline probe at an RO storage tank measuring total dissolved solids, conductivity and temperature continuously, with temperature compensation and median filtering"
    >
      {/* RO storage tank */}
      <rect x="24" y="60" width="120" height="150" rx="12" fill="#ffffff" stroke="#cfd8e4" strokeWidth="2" />
      <clipPath id="tdsTank">
        <rect x="26" y="62" width="116" height="146" rx="11" />
      </clipPath>
      <g clipPath="url(#tdsTank)">
        <motion.rect
          x="24" width="120" height="160" fill="#4fa0dd"
          initial={{ y: 108 }}
          animate={reduced ? { y: 104 } : { y: [110, 96, 104, 110] }}
          transition={reduced ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </g>
      <text x="84" y="48" textAnchor="middle" className="fill-evara-slate text-[9px] tracking-[0.12em] uppercase">
        RO storage
      </text>

      {/* Outlet pipe with inline probe */}
      <rect x="144" y="182" width="150" height="20" rx="10" fill="#cfd8e4" />
      <rect x="148" y="186" width="142" height="12" rx="6" fill="#4fa0dd" opacity="0.85" />
      {!reduced &&
        [0, 1].map((i) => (
          <motion.circle
            key={i}
            cy="192" r="3" fill="#ffffff" fillOpacity="0.9"
            initial={{ cx: 152 }}
            animate={{ cx: [152, 286] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: i * 1.3, ease: "linear" }}
          />
        ))}

      {/* Probe body sitting in the line */}
      <g>
        <rect x="196" y="126" width="56" height="60" rx="8" fill="#0f2138" />
        <circle cx="224" cy="146" r="4.5" fill="#3fc9bd" />
        <rect x="216" y="186" width="16" height="20" rx="3" fill="#22384f" />
        <text x="224" y="116" textAnchor="middle" className="fill-evara-ink text-[11px] font-semibold">
          EvaraTDS
        </text>
        <text x="224" y="222" textAnchor="middle" className="fill-evara-teal text-[9px] font-medium">
          inline · 24×7
        </text>
      </g>

      {/* Three parameter chips */}
      {[
        { x: 24, label: "TDS", value: "168", unit: "ppm" },
        { x: 154, label: "EC", value: "336", unit: "µS/cm" },
        { x: 284, label: "Temp", value: "27.4", unit: "°C" },
      ].map((p) => (
        <g key={p.label}>
          <rect x={p.x} y="248" width="112" height="56" rx="9" fill="#ffffff" stroke="#e4e9f0" />
          <text x={p.x + 14} y="268" className="fill-evara-slate text-[9px] tracking-wide uppercase">
            {p.label}
          </text>
          <text x={p.x + 14} y="290" className="fill-evara-ink text-[16px] font-semibold">
            {p.value}
          </text>
          <text x={p.x + 66} y="290" className="fill-evara-slate text-[9px]">
            {p.unit}
          </text>
        </g>
      ))}

      {/* Quality band with needle */}
      <g transform="translate(24, 330)">
        {bands.map((b) => (
          <rect
            key={b.label}
            x={b.from * 372}
            y="0"
            width={(b.to - b.from) * 372}
            height="12"
            fill={b.color}
            opacity="0.28"
          />
        ))}
        <motion.g
          initial={{ x: reading * 372 }}
          animate={reduced ? undefined : { x: [reading * 372 - 12, reading * 372 + 12, reading * 372 - 12] }}
          transition={reduced ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="-1.5" y="-6" width="3" height="24" rx="1.5" fill="#0f2138" />
        </motion.g>
        {bands.map((b) => (
          <text
            key={b.label}
            x={(b.from + (b.to - b.from) / 2) * 372}
            y="28"
            textAnchor="middle"
            className="fill-evara-slate text-[9px]"
          >
            {b.label}
          </text>
        ))}
      </g>

      <text x="210" y="392" textAnchor="middle" className="fill-evara-slate text-[9px]">
        temperature compensated · median filtered
      </text>
    </svg>
  );
}
