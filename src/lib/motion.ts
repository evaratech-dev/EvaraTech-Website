import type { Variants } from "framer-motion";

/**
 * Shared motion language for Evara Scientific OS: slow, purposeful reveals.
 * Framer Motion respects prefers-reduced-motion only via useReducedMotion();
 * consumers should pair these with that hook where motion is decorative.
 */

export const EASE_SIGNAL = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SIGNAL },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE_SIGNAL } },
};

export const staggerContainer = (stagger = 0.12, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const revealViewport = { once: true, margin: "-80px" };

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: EASE_SIGNAL },
  },
};
