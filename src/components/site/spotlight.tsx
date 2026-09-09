"use client";

import type { PointerEvent } from "react";

/**
 * Cursor-follow highlight for cards, built to never interfere with the card's
 * own click target.
 *
 * The card element itself receives {@link spotlightHandlers}, which write the
 * pointer position into CSS variables on that element. The {@link Spotlight}
 * layer is `pointer-events-none` and simply paints a radial gradient at those
 * coordinates. Mouse only — touch and keyboard get nothing to poke at.
 *
 * Usage:
 *   <Link {...spotlightHandlers} className="group ...">
 *     <Spotlight />
 *     …content…
 *   </Link>
 */
export const spotlightHandlers = {
  onPointerMove: (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    el.style.setProperty("--spot-opacity", "1");
  },
  onPointerLeave: (e: PointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--spot-opacity", "0");
  },
};

export function Spotlight({
  color = "rgba(28,117,188,0.16)",
  size = 300,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[var(--spot-opacity,0)] transition-opacity duration-300"
      style={{
        background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 0%), ${color}, transparent 68%)`,
      }}
    />
  );
}
