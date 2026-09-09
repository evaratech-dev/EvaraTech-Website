"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Cross-fades page content on every route change.
 *
 * Deliberately opacity-only: the site leans on sticky scroll sequences (the
 * frame scrubber, the horizontal gallery) and position:fixed elements, all of
 * which break if an ancestor carries a `transform`. A translate/scale would
 * leave one behind at rest — a plain fade never does, so the transition is
 * free of side effects.
 *
 * Keyed by pathname so each navigation remounts and replays the entrance.
 */
export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
