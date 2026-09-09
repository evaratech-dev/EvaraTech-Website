"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function SpecTable({
  specs,
  className,
  tone = "light",
}: {
  specs: { label: string; value: string }[];
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <motion.dl
      variants={staggerContainer(0.05)}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className={cn(
        "grid grid-cols-1 divide-y overflow-hidden rounded-2xl border backdrop-blur-xl sm:grid-cols-2 sm:divide-x sm:divide-y-0",
        tone === "dark"
          ? "divide-white/10 border-white/10 bg-white/[0.05]"
          : "divide-white/50 border-white/70 bg-white/55",
        className
      )}
    >
      {specs.map((spec) => (
        <motion.div
          key={spec.label}
          variants={fadeUp}
          className="flex items-center justify-between gap-4 px-5 py-4 sm:odd:border-r-0"
        >
          <dt
            className={cn(
              "text-sm",
              tone === "dark" ? "text-muted-foreground" : "text-evara-slate"
            )}
          >
            {spec.label}
          </dt>
          <dd
            className={cn(
              "font-mono text-sm font-medium tabular-nums",
              tone === "dark" ? "text-foreground" : "text-evara-ink"
            )}
          >
            {spec.value}
          </dd>
        </motion.div>
      ))}
    </motion.dl>
  );
}
