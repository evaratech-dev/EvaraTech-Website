import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Container } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { ProductIllustration } from "@/components/illustrations/product-illustration";
import { DevicePanel } from "@/components/site/device-panel";
import { RevealGroup, RevealItem } from "@/components/site/reveal-group";
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

      {/* Hero: a dark stage that mirrors the homepage hero. The device's own
          environment photograph sits behind it, blurred and dimmed so it
          reads as a place rather than a poster; the render stands in front,
          large; the three numbers that sell it close the frame. */}
      <section className="dark relative -mt-20 overflow-hidden bg-evara-navy-950 text-white sm:-mt-24">
        {product.scene ? (
          <Image
            src={product.scene}
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover opacity-60 blur-[10px]"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute top-[-20%] right-[10%] size-[60vw] max-w-[900px] rounded-full bg-evara-water/25 blur-[120px]" />
            <div className="absolute bottom-[-30%] left-[5%] size-[50vw] max-w-[700px] rounded-full bg-evara-teal/20 blur-[120px]" />
          </div>
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-evara-navy-950 via-evara-navy-950/85 to-evara-navy-950/40" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-evara-navy-950 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-evara-navy-950/80 to-transparent" />
        <div aria-hidden="true" className="hero-grain pointer-events-none absolute inset-0" />

        <Container className="relative pt-28 pb-10 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-14">
          <nav aria-label="Breadcrumb" className="text-sm text-white/55">
            <Link href="/#ecosystem" className="hover:text-white">
              Products
            </Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/85">{product.name}</span>
          </nav>

          <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="order-2 lg:order-1">
              <p className="font-mono text-[11px] tracking-[0.24em] text-evara-teal-300 uppercase sm:text-xs">
                {product.category}
              </p>
              <h1 className="mt-4 font-heading text-[2.6rem] leading-[1.02] font-semibold tracking-tight text-white sm:text-6xl lg:text-[4.2rem]">
                {product.name}
              </h1>
              <p className="mt-3 font-heading text-lg font-medium text-white/80 sm:text-2xl">
                {product.tagline}
              </p>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
                {product.oneLine}
              </p>

              {product.price && (
                <p className="mt-6 inline-flex items-baseline gap-2 rounded-lg border border-white/15 bg-white/[0.07] px-4 py-2 backdrop-blur-xl">
                  <span className="font-heading text-2xl font-semibold text-white">{product.price}</span>
                  <span className="text-sm text-white/60">per unit</span>
                </p>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ContactButton className="h-[52px] rounded-xl bg-evara-water px-7 text-sm font-semibold text-white shadow-[0_18px_38px_-14px_rgba(28,117,188,0.85)] hover:bg-evara-water-400">
                  Request Demo
                </ContactButton>
                <Button
                  asChild
                  variant="outline"
                  className="h-[52px] rounded-xl border-white/25 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/20"
                >
                  <a href="#how-it-works">How it works</a>
                </Button>
              </div>
            </div>

            <div className="relative order-1 mx-auto aspect-[4/5] w-full max-w-[280px] sm:max-w-[340px] lg:order-2 lg:max-w-[440px]">
              <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-evara-water/25 blur-3xl" />
              {product.image ? (
                <Image
                  src={product.image}
                  alt={`${product.name} device`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 440px, (min-width: 640px) 340px, 75vw"
                  className="relative object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
                />
              ) : (
                <div className="relative flex h-full items-center justify-center">
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs tracking-widest text-white/60 uppercase backdrop-blur-xl">
                    Render in production
                  </span>
                </div>
              )}
            </div>
          </div>

          {product.highlights && (
            <dl className="relative mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] shadow-[0_28px_70px_-30px_rgba(0,0,0,0.7)] backdrop-blur-2xl sm:grid-cols-3">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              {product.highlights.map((h, i) => (
                <div
                  key={h.label}
                  className={`px-6 py-5 ${i > 0 ? "border-t border-white/12 sm:border-t-0 sm:border-l" : ""}`}
                >
                  <dd className="font-heading text-2xl font-semibold text-white tabular-nums sm:text-3xl">{h.value}</dd>
                  <dt className="mt-1 text-sm text-white/60">{h.label}</dt>
                </div>
              ))}
            </dl>
          )}
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
            <RevealGroup as="ol" className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              {product.mechanism.map((m, i) => (
                <RevealItem as="li" key={m.step} className="border-t border-evara-line pt-4">
                  <p className="font-mono text-xs text-evara-water tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-heading text-lg font-semibold text-evara-ink">
                    {m.step}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-evara-slate">
                    {m.detail}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </Container>
      </Section>

      {/* What it does */}
      {product.features && product.features.length > 0 && (
        <Section tone="mist">
          <Container>
            <SectionHeading kicker="Capabilities" title="What it does." />
            <RevealGroup className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.features.map((f) => (
                <RevealItem
                  key={f.title}
                  className="rounded-xl border border-white/70 bg-white/50 p-5 backdrop-blur-xl transition-colors hover:bg-white/70"
                >
                  <h3 className="font-heading text-sm font-semibold text-evara-ink">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-evara-slate">
                    {f.detail}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
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
              <RevealGroup as="ul" stagger={0.04} className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:pt-10">
                {product.applications.map((a) => (
                  <RevealItem as="li" key={a} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-evara-teal"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-snug text-evara-ink/80">
                      {a}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
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

      {/* See it work: the device's own EvaraOne tile, running */}
      <Section tone="lab" id="see-it-work">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
            <SectionHeading
              kicker="See it work"
              title="This is what EvaraOne shows for it."
              description={`A live simulation of the ${product.name} tile in the platform. The reading ticks, the trace draws, and you can cause the fault it exists to catch.`}
            />
            <DevicePanel slug={product.slug} name={product.name} />
          </div>
          <div className="mt-10 flex justify-center">
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-lg border-white/70 bg-white/50 px-6 text-sm font-medium text-evara-ink backdrop-blur-xl hover:bg-white/70"
            >
              <Link href="/#architecture">Explore the whole platform</Link>
            </Button>
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
