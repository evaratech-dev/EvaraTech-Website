"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The headline holds a water level.
 *
 * The type is the vessel: an unfilled ghost of the word sits underneath, and
 * a rising column of water is clipped to the letterforms on top. It is the
 * company's whole proposition — a level, measured precisely — stated in the
 * one element every visitor is guaranteed to look at.
 *
 * The level is a real number rendered beside it, not decoration.
 */
export function WaterHeadline({
  text,
  level = 0.78,
  className,
  variant = "light",
}: {
  text: string;
  /** 0–1 fill height. */
  level?: number;
  className?: string;
  /** Which surface the type sits on — sets the unfilled vessel colour. */
  variant?: "light" | "dark";
}) {
  const reduced = useReducedMotion();
  const [fill, setFill] = useState(0);

  useEffect(() => {
    if (reduced) {
      setFill(level);
      return;
    }
    const t = setTimeout(() => setFill(level), 250);
    return () => clearTimeout(t);
  }, [level, reduced]);

  // One gradient carries both states: water below the line, the unfilled
  // vessel above it. Two stops share a position so the waterline stays crisp
  // instead of fading. A single text node keeps selection and screen readers
  // clean — no ghost copy, no duplicate for assistive tech.
  const pct = Math.round(fill * 100);
  const empty =
    variant === "dark" ? "rgba(255,255,255,0.16)" : "rgba(15,33,56,0.13)";
  const low = variant === "dark" ? "#1c75bc" : "#1c75bc";
  const mid = variant === "dark" ? "#3fc9bd" : "#4fa0dd";
  const crest = variant === "dark" ? "#8adfd7" : "#6fb6e6";

  const surface = `linear-gradient(to top,
      ${low} 0%,
      ${mid} ${Math.max(pct - 20, 0)}%,
      ${crest} ${pct}%,
      ${empty} ${pct}%,
      ${empty} 100%)`;

  return (
    <span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: surface,
        WebkitBackgroundClip: "text",
        transition: reduced
          ? undefined
          : "background-image 2.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {text}
    </span>
  );
}
