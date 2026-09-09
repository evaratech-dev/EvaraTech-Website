"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Sparse node-and-link field behind the dark hero. Nodes are placed on a
 * jittered grid and linked only to near neighbours, so it reads as a real
 * mesh network rather than random confetti.
 *
 * Deterministic: positions come from a seeded generator, not Math.random(),
 * so the server and client render identical markup and hydration stays quiet.
 */
export function NetworkField({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const { nodes, links } = useMemo(() => {
    // Small deterministic PRNG — same output every render, every environment.
    let seed = 20251010;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const cols = 9;
    const rows = 5;
    const pts: { x: number; y: number; r: number }[] = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (rnd() < 0.32) continue; // leave gaps
        pts.push({
          x: (c + 0.5) * (1200 / cols) + (rnd() - 0.5) * 70,
          y: (r + 0.5) * (700 / rows) + (rnd() - 0.5) * 60,
          r: rnd() < 0.18 ? 3.2 : 1.8,
        });
      }
    }

    const ln: { a: number; b: number; d: number }[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 190) ln.push({ a: i, b: j, d });
      }
    }
    return { nodes: pts, links: ln };
  }, []);

  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="netFade" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="netMask">
          <rect width="1200" height="700" fill="url(#netFade)" />
        </mask>
      </defs>

      <g mask="url(#netMask)">
        {links.map((l, i) => (
          <line
            key={i}
            x1={nodes[l.a].x}
            y1={nodes[l.a].y}
            x2={nodes[l.b].x}
            y2={nodes[l.b].y}
            stroke="#4fa0dd"
            strokeWidth="0.6"
            strokeOpacity={0.34 * (1 - l.d / 190)}
          />
        ))}

        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r} fill="#8adfd7" fillOpacity="0.75" />
            {!reduced && n.r > 2.5 && (
              <motion.circle
                cx={n.x}
                cy={n.y}
                fill="none"
                stroke="#3fc9bd"
                strokeWidth="0.8"
                initial={{ r: 3.2, opacity: 0.55 }}
                animate={{ r: [3.2, 16], opacity: [0.55, 0] }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  delay: (i % 7) * 0.62,
                  ease: "easeOut",
                }}
              />
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}
