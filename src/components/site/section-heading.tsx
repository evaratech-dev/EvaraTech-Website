"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, revealViewport } from "@/lib/motion";

type SectionHeadingProps = {
  kicker?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  tone?: "default" | "inverted";
};

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
  tone = "default",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {kicker && (
        <p
          className={cn(
            "mb-3 text-xs font-semibold tracking-[0.16em] uppercase",
            tone === "inverted" ? "text-evara-water-300" : "text-evara-water"
          )}
        >
          {kicker}
        </p>
      )}
      <h2
        className={cn(
          "text-balance text-[1.85rem] leading-[1.12] font-semibold tracking-tight sm:text-4xl lg:text-5xl",
          tone === "inverted" ? "text-white" : "text-evara-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-balance text-base leading-relaxed sm:text-lg",
            tone === "inverted" ? "text-muted-foreground" : "text-evara-slate"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
