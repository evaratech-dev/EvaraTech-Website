"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const WaterScene = dynamic(() => import("@/components/three/water-scene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Mounts the WebGL scene only once it is actually near the viewport, so the
 * three.js bundle never competes with first paint. Falls back to nothing at
 * all if the device can't do WebGL.
 */
export function SceneMount({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [supported, setSupported] = useState(true);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const ok =
        !!window.WebGLRenderingContext &&
        !!(
          canvas.getContext("webgl2") ||
          canvas.getContext("webgl")
        );
      setSupported(ok);
    } catch {
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      {supported && visible && <WaterScene reduced={reduced} />}
    </div>
  );
}
