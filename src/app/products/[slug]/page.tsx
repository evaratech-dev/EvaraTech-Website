import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Container } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { ProductIllustration } from "@/components/illustrations/product-illustration";
import { Cta } from "@/components/sections/cta";
import { ContactButton } from "@/components/contact/contact-dialog";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/lib/site";
import { products, listedProducts, company, illustratedSlugs } from "@/lib/evara-data";

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

  // Bare title. The root layout's "%s | EvaraTech" template appends the brand.
  const title = `${product.name}: ${product.tagline}`;
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

  // "Next" walks the listed set only, so an unlisted page still hands off to
  // a listed one and a listed page never hands off to an unlisted one.
  const index = listedProducts.findIndex((p) => p.slug === slug);
  const next = listedProducts[(index + 1) % listedProducts.length];

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

      {/* Hero: the device, shown large and uncluttered */}
      <section className="relative overflow-hidden bg-lab-wash">
        <Container className="relative py-10 sm:py-14 lg:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-evara-slate">
            <Link href="/#ecosystem" className="hover:text-evara-ink">
              Products
            </Link>
            <span className="mx-2 text-evara-slate-400">/</span>
            <span className="text-evara-ink">{product.name}</span>
          </nav>

          <div className="mt-6 grid grid-cols-1 items-center gap-10 sm:mt-8 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div className="order-2 lg:order-1">
              <p className="text-xs font-semibold tracking-[0.16em] text-evara-water uppercase">
                {product.category}
              </p>
              <h1 className="mt-3 font-heading text-[2.25rem] leading-[1.05] font-semibold tracking-tight text-evara-ink sm:text-5xl lg:text-[3.25rem]">
                {product.name}
              </h1>
              <p className="mt-3 font-heading text-lg font-medium text-evara-slate sm:text-2xl">
                {product.tagline}
              </p>
              <p className="mt-5 max-w-md text-base leading-relaxed text-evara-slate">
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

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ContactButton className="h-12 rounded-lg bg-evara-ink px-6 text-sm font-medium text-white hover:bg-evara-navy-700">
                  Request Demo
                </ContactButton>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-lg border-white/70 bg-white/50 px-6 text-sm font-medium text-evara-ink backdrop-blur-xl hover:bg-white/70"
                >
                  <a href="#how-it-works">How it works</a>
                </Button>
              </div>
            </div>

            {/* The device itself gets the room. A soft halo lifts it off the
                wash without boxing it into a frame. */}
            <div className="relative order-1 mx-auto aspect-[4/5] w-full max-w-[300px] sm:max-w-[340px] lg:order-2 lg:max-w-[420px]">
              <div
                aria-hidden="true"
                className="absolute inset-[6%] rounded-[999px] bg-gradient-to-br from-white via-evara-water-100/70 to-evara-lavender/60 blur-2xl"
              />
              {product.image ? (
                <Image
                  src={product.image}
                  alt={`${product.name} device`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 80vw"
                  className="relative object-contain drop-shadow-[0_26px_44px_rgba(15,33,56,0.20)]"
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

      {/* Why it exists */}
      <Section tone="paper">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <SectionHeading kicker="The problem" title="Why this exists." />
            <p className="text-base leading-relaxed text-evara-slate lg:pt-10">
              {product.problem}
            </p>
          </div>
        </Container>
      </Section>

      {/* How it works: the drawn principle, then the steps, laid out flat.
          No scroll pinning: the reader takes it in at their own pace. */}
      <Section tone="paper" id="how-it-works" className="pt-0">
        <Container>
          <SectionHeading
            kicker="How it works"
            title="The operating principle."
            description={product.howItWorks}
          />

          {illustratedSlugs.has(product.slug) && (
            <div className="mt-10">
              <ProductIllustration slug={product.slug} />
            </div>
          )}

          {product.mechanism && product.mechanism.length > 0 && (
            <ol className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              {product.mechanism.map((m, i) => (
                <li key={m.step} className="border-t border-evara-line pt-4">
                  <p className="font-mono text-xs text-evara-water tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-evara-ink">
                    {m.step}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-evara-slate">
                    {m.detail}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </Container>
      </Section>

      {/* What it does */}
      {product.features && product.features.length > 0 && (
        <Section tone="mist">
          <Container>
            <SectionHeading kicker="Capabilities" title="What it does." />
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-white/70 bg-white/50 p-5 backdrop-blur-xl"
                >
                  <h3 className="font-heading text-sm font-semibold text-evara-ink">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-evara-slate">
                    {f.detail}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Where it goes */}
      {product.applications && product.applications.length > 0 && (
        <Section tone="paper">
          <Container>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <SectionHeading
                kicker="Where it's used"
                title="Built for these places."
                description="Retrofit-first, so it installs onto infrastructure that is already there. No pipe cutting, no civil work, no permits."
              />
              <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:pt-10">
                {product.applications.map((a) => (
                  <li key={a} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-evara-teal"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-snug text-evara-ink/80">
                      {a}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
      )}

      {/* Real installs, where we have them */}
      {product.gallery && product.gallery.length > 0 && (
        <Section tone="paper" className="pt-0">
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
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              align="center"
              kicker="Connected to EvaraOne"
              title="Every reading lands in one platform."
              description="Live monitoring, alerts with voice output, AI forecasting and reporting across every device and every site, from a single building to an entire district."
            />
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-lg border-white/70 bg-white/50 px-6 text-sm font-medium text-evara-ink backdrop-blur-xl hover:bg-white/70"
              >
                <Link href="/#architecture">Explore EvaraOne</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Onward */}
      <Section tone="paper">
        <Container>
          <Link
            href={`/products/${next.slug}`}
            className="group flex items-center justify-between gap-6 rounded-2xl border border-white/70 bg-white/45 p-6 backdrop-blur-xl transition-colors hover:border-evara-water-300 hover:bg-white/65 sm:p-8"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-evara-slate uppercase">
                Next product
              </p>
              <p className="mt-2 font-heading text-xl font-semibold text-evara-ink sm:text-2xl">
                {next.name}
              </p>
              <p className="mt-1 text-sm text-evara-slate">{next.tagline}</p>
            </div>
            <ArrowRight className="size-6 shrink-0 text-evara-water transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/#ecosystem"
            className="mt-6 inline-flex min-h-9 items-center gap-2 text-sm font-medium text-evara-slate hover:text-evara-ink"
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
