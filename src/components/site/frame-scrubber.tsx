"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useScroll, useReducedMotion } from "framer-motion";

/**
 * Scroll-driven image-sequence player.
 *
 * The source clip is encoded with a single keyframe, so seeking a <video>
 * forces the decoder to replay from frame zero and scrubbing stutters. This
 * decodes the sequence once into bitmaps and paints the right one to a
 * canvas, so scroll position maps to a frame for the cost of one drawImage.
 *
 * Painting is driven by the scroll MotionValue's change event rather than a
 * requestAnimationFrame loop: no loop to lose across re-renders, and no work
 * at all while the reader is still.
 */
export function FrameScrubber({
  dir,
  count,
  ext = "webp",
  pinHeight = "220vh",
  children,
  className,
  fit = "cover",
  softEdges = true,
  tint = true,
  clearColor = "#ffffff",
  framed = false,
  aspect = 16 / 9,
}: {
  dir: string;
  count: number;
  ext?: string;
  pinHeight?: string;
  children?: React.ReactNode;
  className?: string;
  /** "cover" fills the screen and may crop; "contain" shows the whole frame
   *  and letterboxes into `clearColor` (ideal for a composed, labelled shot). */
  fit?: "cover" | "contain";
  /** Radial edge mask — off when the frame's own edges carry content. */
  softEdges?: boolean;
  /** Soft-light accent wash over the footage. */
  tint?: boolean;
  /** Letterbox / clear colour behind a "contain" frame. */
  clearColor?: string;
  /** Present the footage in a centred, rounded card at its own aspect ratio
   *  — every slide fully visible, nothing cropped. Best for labelled diagrams
   *  where full-bleed would shear the edges. */
  framed?: boolean;
  /** Card aspect ratio when `framed` (width / height). */
  aspect?: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(ImageBitmap | HTMLImageElement | undefined)[]>([]);
  const drawnRef = useRef(-1);
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const frameUrl = useCallback(
    (i: number) => `${dir}/${String(i).padStart(3, "0")}.${ext}`,
    [dir, ext]
  );

  /** Paint the frame nearest `p` (0..1). Safe to call at any time. */
  const paint = useCallback(
    (p: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const target = Math.min(count - 1, Math.max(0, Math.round(p * (count - 1))));
      // Fall back to the nearest earlier frame that has already decoded.
      let i = target;
      const frames = framesRef.current;
      while (i > 0 && !frames[i]) i--;
      const frame = frames[i];
      if (!frame) return;

      if (canvas.width === 0 || canvas.height === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale =
        fit === "contain"
          ? Math.min(cw / frame.width, ch / frame.height)
          : Math.max(cw / frame.width, ch / frame.height);
      const dw = frame.width * scale;
      const dh = frame.height * scale;
      try {
        if (fit === "contain") {
          // Fill the letterbox so no previous frame shows through the margins.
          ctx.fillStyle = clearColor;
          ctx.fillRect(0, 0, cw, ch);
        }
        ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
        drawnRef.current = i;
      } catch {
        /* detached bitmap — keep the last good frame on screen */
      }
    },
    [count, fit, clearColor]
  );

  // Size the canvas to its box, and repaint on resize.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      drawnRef.current = -1;
      paint(scrollYProgress.get());
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [paint, scrollYProgress]);

  // Repaint whenever the reader moves.
  useEffect(() => {
    paint(scrollYProgress.get());
    const unsub = scrollYProgress.on("change", paint);
    return () => unsub();
  }, [paint, scrollYProgress]);

  // Decode the sequence, painting as frames land.
  useEffect(() => {
    let cancelled = false;
    const frames: (ImageBitmap | HTMLImageElement | undefined)[] = new Array(count);
    framesRef.current = frames;
    let done = 0;

    const loadOne = async (i: number) => {
      try {
        const res = await fetch(frameUrl(i));
        const blob = await res.blob();
        if (cancelled) return;
        frames[i] =
          typeof createImageBitmap === "function"
            ? await createImageBitmap(blob)
            : await new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = URL.createObjectURL(blob);
              });
      } catch {
        /* a dropped frame just repeats the previous one */
      }
      if (cancelled) return;
      done += 1;
      if (done % 8 === 0 || done === count) setProgress(done / count);
      // Show it straight away if it is the frame currently wanted.
      paint(scrollYProgress.get());
    };

    (async () => {
      await loadOne(0);
      const CONCURRENCY = 6;
      let next = 1;
      await Promise.all(
        Array.from({ length: CONCURRENCY }, async () => {
          while (!cancelled && next < count) await loadOne(next++);
        })
      );
    })();

    return () => {
      cancelled = true;
    };
  }, [count, frameUrl, paint, scrollYProgress]);

  // Reduced motion: a single still, no pinning, no scroll coupling.
  if (reduced) {
    return (
      <div className={className}>
        {children}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={frameUrl(Math.floor(count / 2))} alt="" className="h-auto w-full" />
      </div>
    );
  }

  const radialMask =
    "radial-gradient(120% 100% at 50% 50%, #000 45%, rgba(0,0,0,0.75) 68%, rgba(0,0,0,0) 92%)";

  // Rectangular edge feather: two gradients intersected fade all four edges
  // (and corners) of the footage to transparent, so the section colour behind
  // dissolves the border rather than a white wash sitting on top of it.
  const featherMask =
    "linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 9%, #000 91%, transparent 100%)";

  const canvasMaskStyle: React.CSSProperties = softEdges
    ? { maskImage: radialMask, WebkitMaskImage: radialMask }
    : {
        maskImage: featherMask,
        WebkitMaskImage: featherMask,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      };

  // Framed: the footage lives in a centred card at its own aspect ratio, so
  // every slide is shown whole. Full-bleed instead fills the screen.
  if (framed) {
    return (
      <div ref={sectionRef} className="relative" style={{ height: pinHeight }}>
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-4 sm:px-8">
          <div
            className="relative w-full max-w-[1180px] overflow-hidden rounded-2xl ring-1 ring-black/[0.06] shadow-[0_50px_120px_-45px_rgba(15,33,56,0.5)]"
            style={{ aspectRatio: String(aspect), background: clearColor }}
          >
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
            />
            {tint && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-evara-water-100/25 mix-blend-soft-light"
              />
            )}
            {/* Specular top edge */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
            />
          </div>

          {progress < 1 && (
            <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2">
              <div className="h-0.5 w-40 overflow-hidden rounded-full bg-evara-line">
                <div
                  className="h-full bg-evara-water transition-[width] duration-200"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative" style={{ height: pinHeight }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: clearColor }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          style={canvasMaskStyle}
        />

        {tint && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-evara-water-100/25 mix-blend-soft-light"
          />
        )}

        {children && (
          <div className="relative z-10 flex h-full flex-col items-center justify-start pt-[12vh]">
            {children}
          </div>
        )}

        {progress < 1 && (
          <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
            <div className="h-0.5 w-40 overflow-hidden rounded-full bg-evara-line">
              <div
                className="h-full bg-evara-water transition-[width] duration-200"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
