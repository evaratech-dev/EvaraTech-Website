"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * A short brand intro on the first visit of a session.
 *
 * The mark rises, the wordmark unmasks beside it, a hairline fills, and the
 * curtain lifts to reveal the hero video already playing beneath. About 1.6s
 * in total. It plays once per browser session (sessionStorage) so navigating
 * around the site never shows it twice, and it is skipped entirely under
 * reduced motion. Nothing below waits for it: the page loads and renders as
 * normal behind the curtain.
 */
const KEY = "evara-intro-seen";

export function BrandIntro() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduced) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage blocked: still play once */
    }
    setShow(true);
    const t = setTimeout(() => setShow(false), 1650);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-evara-navy-950"
          aria-hidden="true"
        >
          <div className="flex items-center gap-4">
            <motion.span
              initial={{ opacity: 0, scale: 0.6, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative block size-12 sm:size-14"
            >
              <Image src="/images/brand/evaratech-logo.png" alt="" fill sizes="56px" priority className="object-contain" />
            </motion.span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="block font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                Evara<span className="text-evara-water-400">Tech</span>
              </motion.span>
            </span>
          </div>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[18%] left-1/2 h-px w-40 origin-left -translate-x-1/2 bg-gradient-to-r from-evara-water to-evara-teal-300"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
