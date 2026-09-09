"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

type StatCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  className?: string;
  tone?: "default" | "inverted";
};

export function StatCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
  className,
  tone = "default",
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 24, stiffness: 90 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    if (reduceMotion && ref.current) {
      ref.current.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
      return;
    }
    const unsub = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      }
    });
    return unsub;
  }, [spring, prefix, suffix, decimals, reduceMotion, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex flex-col", className)}
    >
      <span
        ref={ref}
        className={cn(
          "font-heading text-3xl font-semibold tracking-tight tabular-nums sm:text-[2.5rem]",
          tone === "inverted" ? "text-white" : "text-evara-ink"
        )}
      >
        {prefix}
        {(0).toFixed(decimals)}
        {suffix}
      </span>
      <span
        className={cn(
          "mt-1.5 text-sm",
          tone === "inverted" ? "text-muted-foreground" : "text-evara-slate"
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}
