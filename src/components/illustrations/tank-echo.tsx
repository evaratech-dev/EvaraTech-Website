"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * EvaraTank on an Indian rooftop overhead tank: ultrasonic pulses leave the
 * sensor, bounce off the water surface, and return — the sensor never
 * contacts the water. Water level drifts to show live measurement.
 */
export function TankEcho() {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 420 380"
      className="h-auto w-full"
      role="img"
      aria-label="EvaraTank sensor mounted on top of a rooftop water tank, sending ultrasonic pulses down to the water surface and receiving the echo back, without touching the water"
    >
      <defs>
        <linearGradient id="tankWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4fa0dd" />
          <stop offset="100%" stopColor="#1c75bc" />
        </linearGradient>
      </defs>

      {/* Rooftop slab */}
      <rect x="20" y="332" width="380" height="10" rx="2" fill="#e4e9f0" />
      <rect x="20" y="342" width="380" height="6" rx="2" fill="#d4dbe6" />

      {/* Tank body */}
      <path
        d="M96 118 h228 a10 10 0 0 1 10 10 v186 a18 18 0 0 1 -18 18 h-212 a18 18 0 0 1 -18 -18 v-186 a10 10 0 0 1 10 -10 z"
        fill="#ffffff"
        stroke="#cfd8e4"
        strokeWidth="2"
      />
      {/* Tank ribs */}
      {[168, 212, 256].map((y) => (
        <line key={y} x1="90" y1={y} x2="330" y2={y} stroke="#eef2f8" strokeWidth="6" />
      ))}

      {/* Water inside — level breathes */}
      <clipPath id="tankClip">
        <path d="M96 118 h228 a10 10 0 0 1 10 10 v186 a18 18 0 0 1 -18 18 h-212 a18 18 0 0 1 -18 -18 v-186 a10 10 0 0 1 10 -10 z" />
      </clipPath>
      <g clipPath="url(#tankClip)">
        <motion.rect
          x="86"
          width="248"
          height="240"
          fill="url(#tankWater)"
          initial={{ y: 214 }}
          animate={reduced ? { y: 206 } : { y: [214, 190, 202, 214] }}
          transition={
            reduced
              ? undefined
              : { duration: 11, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </g>

      {/* Sensor housing on the lid */}
      <rect x="176" y="86" width="68" height="32" rx="7" fill="#0f2138" />
      <circle cx="210" cy="102" r="5" fill="#3fc9bd" />
      <text x="210" y="76" textAnchor="middle" className="fill-evara-ink text-[11px] font-semibold">
        EvaraTank
      </text>

      {/* Ultrasonic pulses travelling down */}
      {[0, 1, 2].map((i) => (
        <motion.g
          key={`down-${i}`}
          initial={{ opacity: 0 }}
          animate={reduced ? { opacity: 0.4 } : { opacity: [0, 0.85, 0], y: [0, 96] }}
          transition={
            reduced
              ? undefined
              : { duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeIn" }
          }
        >
          <path
            d="M190 124 Q210 138 230 124"
            fill="none"
            stroke="#3fc9bd"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </motion.g>
      ))}

      {/* Echo returning */}
      {[0, 1].map((i) => (
        <motion.g
          key={`up-${i}`}
          initial={{ opacity: 0 }}
          animate={reduced ? { opacity: 0.25 } : { opacity: [0, 0.6, 0], y: [96, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 2.4, repeat: Infinity, delay: 1.2 + i * 0.8, ease: "easeOut" }
          }
        >
          <path
            d="M190 124 Q210 110 230 124"
            fill="none"
            stroke="#9cc9ec"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
        </motion.g>
      ))}

      {/* No-contact callout */}
      <line x1="334" y1="118" x2="376" y2="118" stroke="#d4dbe6" strokeWidth="1" />
      <line x1="334" y1="206" x2="376" y2="206" stroke="#d4dbe6" strokeWidth="1" />
      <line x1="372" y1="118" x2="372" y2="206" stroke="#00a99d" strokeWidth="1.5" />
      <text x="386" y="166" className="fill-evara-teal text-[11px] font-medium" transform="rotate(90 386 166)" textAnchor="middle">
        air gap
      </text>

      {/* Readout */}
      <rect x="40" y="150" width="86" height="44" rx="8" fill="#0f2138" />
      <text x="83" y="170" textAnchor="middle" className="fill-white text-[15px] font-semibold">
        78%
      </text>
      <text x="83" y="184" textAnchor="middle" className="fill-evara-water-300 text-[9px]">
        99.7% precision
      </text>
    </svg>
  );
}
