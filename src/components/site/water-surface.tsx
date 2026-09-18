"use client";

import { useEffect, useRef } from "react";

/**
 * A still water surface, seen from above, that drops disturb.
 *
 * A height field on a coarse grid runs the classic two-buffer wave equation
 * (each cell moves toward the mean of its neighbours, minus where it was a
 * step ago, damped), which gives real propagation, reflection off the edges
 * and interference where rings cross. Each frame the field is shaded from
 * its slope like a lit liquid: a key light from the upper left, a cool
 * fill, a specular crest on the steep side of every wave, and a slow
 * caustic shimmer so the surface never reads as flat even when calm. The
 * grid is painted to a small canvas and stretched to the viewport, which
 * both keeps it cheap and softens it the way water is soft.
 *
 * `events` is the choreography: drops at (x, y) in unit coordinates, at a
 * time in seconds, with a radius and strength. `onFrame` reports elapsed
 * time so the overlay can key its own reveals to the water.
 */
export type DropEvent = { t: number; x: number; y: number; r: number; a: number };

export function WaterSurface({
  events,
  className,
  start = 0,
}: {
  events: DropEvent[];
  className?: string;
  /** performance.now() at which the choreography began. */
  start?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Grid: ~300 cells across on desktops, fewer on phones where the portrait
    // aspect would otherwise make the field tall and the frame slow.
    const W = window.innerWidth < 640 ? 200 : 300;
    const H = Math.max(120, Math.round((W * window.innerHeight) / window.innerWidth));
    canvas.width = W;
    canvas.height = H;

    let cur = new Float32Array(W * H);
    let prev = new Float32Array(W * H);
    const img = ctx.createImageData(W, H);
    const px = img.data;

    const fired = new Set<number>();
    const t0 = start || performance.now();
    let raf = 0;
    let lastBreeze = 0;

    const drop = (ux: number, uy: number, r: number, a: number) => {
      const cx = ux * W, cy = uy * H;
      const rr = r * W;
      const x0 = Math.max(1, Math.floor(cx - rr)), x1 = Math.min(W - 2, Math.ceil(cx + rr));
      const y0 = Math.max(1, Math.floor(cy - rr)), y1 = Math.min(H - 2, Math.ceil(cy + rr));
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const d = Math.hypot(x - cx, y - cy) / rr;
          if (d < 1) {
            // A rounded bump, slightly undercut at the rim so the first ring
            // has a trough behind it, the way a real impact does.
            const k = Math.cos(d * Math.PI * 0.5);
            cur[y * W + x] -= a * k * k;
          }
        }
      }
    };

    const step = () => {
      const next = prev;
      for (let y = 1; y < H - 1; y++) {
        const row = y * W;
        for (let x = 1; x < W - 1; x++) {
          const i = row + x;
          let v = (cur[i - 1] + cur[i + 1] + cur[i - W] + cur[i + W]) * 0.5 - next[i];
          v *= 0.985;
          next[i] = v;
        }
      }
      prev = cur;
      cur = next;
    };

    const render = (t: number) => {
      // Lighting
      const lx = -0.62, ly = -0.78;           // key light, upper left
      for (let y = 1; y < H - 1; y++) {
        const row = y * W;
        for (let x = 1; x < W - 1; x++) {
          const i = row + x;
          const nx = cur[i - 1] - cur[i + 1];
          const ny = cur[i - W] - cur[i + W];
          const h = cur[i];

          // Depth: a soft pool of light toward the centre, darker at the edges.
          const dx = x / W - 0.5, dy = y / H - 0.5;
          const vign = 1 - Math.min(1, (dx * dx * 1.4 + dy * dy * 2.4) * 1.6);

          // Slow caustic shimmer, two crossed sines drifting.
          const sh = 0.5 + 0.5 * Math.sin(x * 0.11 + t * 0.9 + Math.sin(y * 0.07 + t * 0.6));
          const sh2 = 0.5 + 0.5 * Math.sin(y * 0.13 - t * 0.7 + Math.cos(x * 0.05 + t * 0.4));
          const caustic = sh * sh2 * 0.07;

          const dot = nx * lx + ny * ly;
          const diffuse = Math.min(1.2, Math.max(0, dot) * 2.2);
          const rim = Math.max(0, -dot) * 0.9;
          const spec = Math.pow(diffuse, 3) * 0.9;
          // Height tint, bounded and applied to every channel, so a trough
          // darkens toward navy rather than toward red.
          const hc = Math.max(-0.5, Math.min(0.5, h));

          // Base: deep navy, lifted toward water blue by light and by height.
          let r = 10 + 22 * vign + 40 * diffuse + 8 * caustic * 255 * 0.02 + 6 * rim + hc * 12;
          let g = 20 + 40 * vign + 90 * diffuse + 20 * caustic * 255 * 0.02 + 10 * rim + hc * 30;
          let b = 34 + 60 * vign + 140 * diffuse + 30 * caustic * 255 * 0.02 + 16 * rim + hc * 40;
          // Specular crest: toward the teal-white of the brand.
          r += 120 * spec; g += 210 * spec; b += 200 * spec;

          const o = i * 4;
          px[o] = r > 255 ? 255 : r;
          px[o + 1] = g > 255 ? 255 : g;
          px[o + 2] = b > 255 ? 255 : b;
          px[o + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    const loop = (now: number) => {
      const t = (now - t0) / 1000;
      events.forEach((e, i) => {
        if (!fired.has(i) && t >= e.t) {
          fired.add(i);
          drop(e.x, e.y, e.r, e.a);
        }
      });
      // A breeze: tiny random disturbances so the surface stays alive.
      if (t > 0.2 && now - lastBreeze > 140) {
        lastBreeze = now;
        drop(Math.random(), Math.random(), 0.012, 0.05 + Math.random() * 0.06);
      }
      step();
      step();
      render(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [events, start]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
