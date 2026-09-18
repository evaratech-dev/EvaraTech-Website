"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motion";

/**
 * Staggered reveal for a list of server-rendered children.
 *
 * Product pages are Server Components; this is the one small client wrapper
 * that lets their feature grids, step lists and application lists rise in
 * one after another as they scroll into view, the same way the homepage
 * sections do. Pass the element type so lists stay lists.
 */
export function RevealGroup({
  as = "div",
  className,
  children,
  stagger = 0.06,
}: {
  as?: "div" | "ul" | "ol";
  className?: string;
  children: React.ReactNode;
  stagger?: number;
}) {
  const Tag = motion[as];
  return (
    <Tag
      variants={staggerContainer(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  as = "div",
  className,
  children,
}: {
  as?: "div" | "li";
  className?: string;
  children: React.ReactNode;
}) {
  const Tag = motion[as];
  return (
    <Tag variants={fadeUp} className={className}>
      {children}
    </Tag>
  );
}
