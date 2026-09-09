import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Container } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { SpecTable } from "@/components/site/spec-table";
import { MechanismTeardown } from "@/components/site/mechanism-teardown";
import { ProductIllustration } from "@/components/illustrations/product-illustration";
import { DashboardMock } from "@/components/site/dashboard-mock";
import { Cta } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/lib/site";
import {
  products,
  company,
  audiences,
  illustratedSlugs,
} from "@/lib/evara-data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: { absolute: "Product not found | EvaraTech" } };

  // Bare title — the root layout's "%s | EvaraTech" template appends the brand.
  const title = `${product.name} — ${product.tagline}`;
  const description = product.oneLine;
  const path = `/products/${product.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: `${title} | EvaraTech`,
      description,
      images: ["/images/og.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | EvaraTech`,
      description,
      images: ["/images/og.jpg"],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const index = products.findIndex((p) => p.slug === slug);
  const next = products[(index + 1) % products.length];

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    category: product.category,
    description: product.oneLine,
    url: absoluteUrl(`/products/${product.slug}`),
    brand: { "@type": "Brand", name: "EvaraTech" },
    manufacturer: { "@type": "Organization", name: company.legalName },
    ...(product.image ? { image: absoluteUrl(product.image) } : {}),
  };

  return (
    <>
      <JsonLd data={productLd} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-lab-wash">
        <Container className="relative py-12 sm:py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-evara-slate">
            <Link href="/#ecosystem" className="hover:text-evara-ink">
              Products
            </Link>
            <span className="mx-2 text-evara-slate-400">/</span>
            <span className="text-evara-ink">{product.name}</span>
          </nav>

          <div className="mt-8 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-evara-water uppercase">
                {product.category}
              </p>
              <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-evara-ink sm:text-5xl lg:text-[3.25rem]">
                {product.name}
              </h1>
              <p className="mt-3 font-heading text-xl font-medium text-evara-slate sm:text-2xl">
                {product.tagline}
              </p>
              <p className="mt-6 max-w-md text-base leading-relaxed text-evara-slate">
                {product.oneLine}
              </p>

              {product.price && (
                <p className="mt-6 inline-flex items-baseline gap-2 rounded-lg border border-evara-teal/30 bg-evara-teal-100/60 px-4 py-2">
                  <span className="font-heading text-2xl font-semibold text-evara-ink">
                    {product.price}
                  </span>
                  <span className="text-sm text-evara-slate">per unit</span>
                </p>
              )}

              {!product.hasSpecSheet && (
                <p className="mt-6 rounded-lg border border-white/70 bg-white/50 px-4 py-3 text-sm text-evara-slate backdrop-blur-xl">
                  Some specifications for {product.name} are still being
                  finalised and are marked accordingly below.
                </p>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-12 rounded-lg bg-evara-ink px-6 text-sm font-medium text-white hover:bg-evara-navy-700"
                >
                  <a href={`mailto:${company.email}`}>Request Demo</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-lg border-white/70 bg-white/50 px-6 text-sm font-medium text-evara-ink backdrop-blur-xl hover:bg-white/70"
                >
                  <a href="#specs">View Specifications</a>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute inset-[10%] rounded-full bg-gradient-to-br from-evara-water-100 via-white to-evara-lavender blur-xl"
              />
              {product.image ? (
                <Image
                  src={product.image}
                  alt={`${product.name} device`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, 90vw"
                  className="relative object-contain p-8 drop-shadow-[0_30px_55px_rgba(15,33,56,0.22)]"
                />
              ) : (
                <div className="relative flex h-full items-center justify-center">
                  <span className="rounded-full border border-white/70 bg-white/50 px-4 py-2 text-xs tracking-widest text-evara-slate-400 uppercase backdrop-blur-xl">
                    Render in production
                  </span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Problem */}
      <Section tone="paper">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            <SectionHeading kicker="The problem" title="Why this exists." />
            <p className="text-base leading-relaxed text-evara-slate lg:pt-10">
              {product.problem}
            </p>
          </div>
        </Container>
      </Section>

      {/* The operating principle, drawn — no photograph can show a mechanism */}
      {illustratedSlugs.has(product.slug) && (
        <Section tone="paper" className="pt-0">
          <Container>
            <SectionHeading
              kicker="The principle"
              title="How it actually works."
            />
            <div className="mt-10">
              <ProductIllustration slug={product.slug} />
            </div>
          </Container>
        </Section>
      )}

      {/* Teardown */}
      {product.mechanism && product.mechanism.length > 0 && (
        <MechanismTeardown
          steps={product.mechanism}
          image={product.image}
          productName={product.name}
        />
      )}

      {/* Specs */}
      <Section tone="mist" id="specs">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-evara-ink">
                Technical specifications
              </h2>
              <div className="mt-6">
                <SpecTable specs={product.specs} />
              </div>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-semibold text-evara-ink">
                How it works
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-evara-slate">
                {product.howItWorks}
              </p>
              <div className="mt-6 rounded-xl border border-white/70 bg-white/50 p-5 backdrop-blur-xl">
                <p className="text-xs font-semibold tracking-[0.14em] text-evara-water uppercase">
                  Retrofit-first
                </p>
                <p className="mt-2 text-sm leading-relaxed text-evara-slate">
                  Installs onto infrastructure you already own. No pipe
                  cutting, no civil work, no permits.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Field gallery */}
      {product.gallery && product.gallery.length > 0 && (
        <Section tone="paper">
          <Container>
            <SectionHeading
              kicker="In the field"
              title="Deployed, not rendered."
            />
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {product.gallery.map((src) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/70 bg-evara-mist"
                >
                  <Image
                    src={src}
                    alt={`${product.name} installed on site`}
                    fill
                    sizes="(min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Platform */}
      <Section tone="lab">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              kicker="Connected to EvaraOne"
              title="Every reading lands in one platform."
              description="Live monitoring, alerts with voice output, AI forecasting and reporting — across every device and every site."
            />
            <DashboardMock />
          </div>
        </Container>
      </Section>

      {/* Built for */}
      <Section tone="paper">
        <Container>
          <p className="text-xs font-semibold tracking-[0.16em] text-evara-slate uppercase">
            Built for
          </p>
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-b border-evara-line pb-12">
            {audiences.map((a) => (
              <span
                key={a}
                className="text-sm font-medium text-evara-ink/80 sm:text-base"
              >
                {a}
              </span>
            ))}
          </div>

          <Link
            href={`/products/${next.slug}`}
            className="group mt-12 flex items-center justify-between gap-6 rounded-2xl border border-white/70 bg-white/45 p-6 backdrop-blur-xl transition-colors hover:border-evara-water-300 hover:bg-white/65 sm:p-8"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-evara-slate uppercase">
                Next product
              </p>
              <p className="mt-2 font-heading text-2xl font-semibold text-evara-ink">
                {next.name}
              </p>
              <p className="mt-1 text-sm text-evara-slate">{next.tagline}</p>
            </div>
            <ArrowRight className="size-6 shrink-0 text-evara-water transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/#ecosystem"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-evara-slate hover:text-evara-ink"
          >
            <ArrowLeft className="size-4" />
            All products
          </Link>
        </Container>
      </Section>

      <Cta />
    </>
  );
}
