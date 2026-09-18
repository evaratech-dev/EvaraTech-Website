"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A card that tilts toward the cursor.
 *
 * Wrap a card in this and it becomes a slab that pivots a few degrees to
 * follow the pointer; anything inside with the `tilt-lift` class rises off
 * the surface (a product render, say) because the wrapper preserves 3D.
 * Mouse only, and nothing at all under reduced motion: a tilt that fires on
 * touch is just a card that jumps when you scroll past it.
 */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees. */
  max?: number;
}) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 220, damping: 22, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 220, damping: 22, mass: 0.5 });
  const rotateY = useTransform(sx, [-1, 1], [-max, max]);
  const rotateX = useTransform(sy, [-1, 1], [max, -max]);

  return (
    <motion.div
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set(((e.clientX - r.left) / r.width) * 2 - 1);
        py.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("h-full [perspective:1100px] [&_.tilt-lift]:[transform:translateZ(36px)]", className)}
    >
      {children}
    </motion.div>
  );
}
