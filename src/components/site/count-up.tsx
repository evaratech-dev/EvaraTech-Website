"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Number that tweens from zero to `value` using framer-motion's `animate()`
 * with an onUpdate writing straight to the DOM node — no React re-renders per
 * frame. Fires either the first time it scrolls into view, or shortly after
 * mount for above-the-fold hero figures. Under reduced motion it prints the
 * final value at once.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  start = "inView",
  delay = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  start?: "inView" | "mount";
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;

    const run = () => {
      if (reduce) {
        el.textContent = format(value);
        return undefined;
      }
      const controls = animate(0, value, {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (n) => {
          el.textContent = format(n);
        },
      });
      return () => controls.stop();
    };

    if (start === "mount") {
      const t = setTimeout(run, delay);
      return () => clearTimeout(t);
    }
    if (inView) return run();
  }, [inView, start, delay, value, reduce, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}
