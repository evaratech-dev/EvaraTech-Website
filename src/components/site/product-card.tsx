"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/motion";
import { builtProductSlugs, type Product } from "@/lib/evara-data";
import { Spotlight, spotlightHandlers } from "@/components/site/spotlight";

export function ProductCard({ product }: { product: Product }) {
  const isBuilt = builtProductSlugs.has(product.slug);
  const className = cn(
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/70 bg-white/50 backdrop-blur-xl transition-all duration-300",
    isBuilt &&
      "hover:-translate-y-0.5 hover:border-evara-water-300 hover:bg-white/65 hover:shadow-[0_24px_50px_-26px_rgba(15,33,56,0.38)] focus-visible:ring-2 focus-visible:ring-evara-water focus-visible:outline-none"
  );

  const inner = (
    <>
      {isBuilt && <Spotlight />}
      <ProductCardInner product={product} isBuilt={isBuilt} />
    </>
  );

  return (
    <motion.div variants={fadeUp}>
      {isBuilt ? (
        <Link href={`/products/${product.slug}`} className={className} {...spotlightHandlers}>
          {inner}
        </Link>
      ) : (
        <div className={className}>{inner}</div>
      )}
    </motion.div>
  );
}

function ProductCardInner({
  product,
  isBuilt,
}: {
  product: Product;
  isBuilt: boolean;
}) {
  return (
    <>
        {/* Specular sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
        />
        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-white/20 sm:h-52">
          {product.image ? (
            <Image
              src={product.image}
              alt={`${product.name} device`}
              fill
              sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
              className="object-contain p-8 drop-shadow-[0_14px_18px_rgba(15,33,56,0.16)] transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <ProductBlueprint />
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
          <p className="mt-1 text-sm font-medium text-evara-slate">
            {product.tagline}
          </p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-evara-slate">
            {product.oneLine}
          </p>

          <div
            className={cn(
              "mt-6 flex items-center gap-1.5 text-sm font-medium",
              isBuilt ? "text-evara-water" : "text-evara-slate-400"
            )}
          >
            {isBuilt ? "Explore product" : "Full page coming soon"}
            {isBuilt && (
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </div>
        </div>
    </>
  );
}

function ProductBlueprint() {
  const stroke = "var(--color-evara-water-400)";
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" fill="none" aria-hidden="true">
      <circle cx="44" cy="44" r="30" stroke={stroke} strokeWidth="1" strokeDasharray="3 5" opacity="0.55" />
      <circle cx="44" cy="44" r="18" stroke={stroke} strokeWidth="1" opacity="0.75" />
      <path d="M44 14v10M44 64v10M14 44h10M64 44h10" stroke={stroke} strokeWidth="1" opacity="0.5" />
      <circle cx="44" cy="44" r="3.5" fill={stroke} />
    </svg>
  );
}
