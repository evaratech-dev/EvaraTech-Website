"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { ProductCard } from "@/components/site/product-card";
import { Spotlight, spotlightHandlers } from "@/components/site/spotlight";
import { staggerContainer, revealViewport } from "@/lib/motion";
import { products, builtProductSlugs } from "@/lib/evara-data";

/**
 * Lateral scroll gallery: vertical scroll drives horizontal travel through
 * the hardware range. Falls back to a normal grid for reduced motion and
 * for narrow screens, where hijacked horizontal scroll fights the thumb.
 */
export function HorizontalProducts() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    restDelta: 0.001,
  });
  const x = useTransform(smooth, [0, 1], ["2%", "-72%"]);

  return (
    <>
      {/* Mobile / reduced-motion: plain grid */}
      <section
        id="ecosystem"
        className={reduced ? "block py-16" : "block py-16 lg:hidden"}
      >
        <Container>
          <SectionHeading
            kicker="The product ecosystem"
            title="Eight instruments. One nervous system for water."
            description="Each device solves one water-management pain point on its own. EvaraOne ties every reading, alert and control action together."
          />
          <motion.div
            variants={staggerContainer(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Desktop: pinned lateral travel */}
      {!reduced && (
        <section
          ref={ref}
          className="relative hidden lg:block"
          style={{ height: "320vh" }}
          aria-label="Product ecosystem"
        >
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            <Container className="shrink-0 pb-10">
              <SectionHeading
                kicker="The product ecosystem"
                title="Eight instruments. One nervous system for water."
              />
            </Container>

            <motion.ul style={{ x }} className="flex gap-6 pl-12 xl:pl-16">
              {products.map((p) => (
                <li key={p.slug} className="w-[340px] shrink-0">
                  <HorizontalCard product={p} />
                </li>
              ))}
            </motion.ul>

            <Container className="mt-10 shrink-0">
              <div className="h-px w-full bg-evara-line">
                <motion.div
                  style={{ scaleX: smooth }}
                  className="h-full w-full origin-left bg-evara-water"
                />
              </div>
            </Container>
          </div>
        </section>
      )}
    </>
  );
}

function HorizontalCard({ product }: { product: (typeof products)[number] }) {
  const isBuilt = builtProductSlugs.has(product.slug);
  const inner = (
    <>
      {isBuilt && <Spotlight />}
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-white/20">
        {product.image ? (
          <Image
            src={product.image}
            alt={`${product.name} device`}
            fill
            sizes="340px"
            className="object-contain p-8 drop-shadow-[0_16px_20px_rgba(15,33,56,0.16)] transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="text-xs tracking-widest text-evara-slate-400 uppercase">
            Render pending
          </span>
        )}
        {!product.hasSpecSheet && (
          <span className="absolute top-3 right-3 rounded-full border border-evara-line bg-white/90 px-2.5 py-1 text-[10px] font-medium tracking-wide text-evara-slate uppercase">
            Spec tbc
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-evara-water uppercase">
          {product.category}
        </p>
        <h3 className="mt-2.5 font-heading text-xl font-semibold text-evara-ink">
          {product.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-evara-slate">
          {product.oneLine}
        </p>
        <span
          className={
            isBuilt
              ? "mt-5 flex items-center gap-1.5 text-sm font-medium text-evara-water"
              : "mt-5 text-sm font-medium text-evara-slate-400"
          }
        >
          {isBuilt ? "Explore product" : "Full page coming soon"}
          {isBuilt && (
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
      </div>
    </>
  );

  const className =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-evara-water-300 hover:bg-white/65 hover:shadow-[0_28px_56px_-28px_rgba(15,33,56,0.4)]";

  return isBuilt ? (
    <Link
      href={`/products/${product.slug}`}
      className={className}
      {...spotlightHandlers}
    >
      {inner}
    </Link>
  ) : (
    <div className={className}>{inner}</div>
  );
}
