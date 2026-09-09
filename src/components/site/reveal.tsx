"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Mask reveal: the line rises out from behind a clipped edge rather than
 * fading in. Reads as typeset rather than animated.
 */
export function MaskReveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "h1" | "h2" | "p";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  return (
    <span className={cn("block overflow-hidden", className)}>
      <Tag
        initial={reduced ? { opacity: 0 } : { y: "110%" }}
        whileInView={reduced ? { opacity: 1 } : { y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: reduced ? 0.3 : 0.9,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="block"
      >
        {children}
      </Tag>
    </span>
  );
}

/**
 * Splits a headline into words and reveals them in sequence.
 * Words stay whole so screen readers and text selection behave normally.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
