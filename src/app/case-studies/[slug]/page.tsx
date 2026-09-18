import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Section, Container } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Cta } from "@/components/sections/cta";
import { ContactButton } from "@/components/contact/contact-dialog";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/lib/site";
import { caseStudies, products, company } from "@/lib/evara-data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return { title: { absolute: "Case study not found | EvaraTech" } };
  const path = `/case-studies/${cs.slug}`;
  return {
    title: `${cs.title} | ${cs.place}`,
    description: cs.summary,
    alternates: { canonical: path },
    openGraph: { type: "article", url: path, title: cs.title, description: cs.summary, images: ["/images/og.jpg"] },
    twitter: { card: "summary_large_image", title: cs.title, description: cs.summary, images: ["/images/og.jpg"] },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) notFound();

  const index = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const used = cs.devices.map((n) => products.find((p) => p.name === n)).filter(Boolean);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.title,
    description: cs.summary,
    url: absoluteUrl(`/case-studies/${cs.slug}`),
    author: { "@type": "Organization", name: company.legalName },
    publisher: { "@type": "Organization", name: company.legalName },
    about: cs.place,
  };

  return (
    <>
      <JsonLd data={articleLd} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-lab-wash">
        <Container className="relative py-10 sm:py-14 lg:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-evara-slate">
            <Link href="/#proof" className="hover:text-evara-ink">Deployments</Link>
            <span className="mx-2 text-evara-slate-400">/</span>
            <span className="text-evara-ink">{cs.place}</span>
          </nav>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold tracking-[0.16em] text-evara-water uppercase">{cs.kicker}</p>
              <span
                className={
                  cs.status === "live"
                    ? "inline-flex items-center gap-1.5 rounded-full bg-evara-teal-100 px-2.5 py-1 text-[11px] font-medium text-evara-teal"
                    : "inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-800"
                }
              >
                <span className={cs.status === "live" ? "size-1.5 rounded-full bg-evara-teal" : "size-1.5 rounded-full bg-amber-500"} />
                {cs.status === "live" ? "Live" : "In progress"}
              </span>
            </div>
            <h1 className="mt-4 text-balance font-heading text-[2.25rem] leading-[1.05] font-semibold tracking-tight text-evara-ink sm:text-5xl lg:text-6xl">
              {cs.title}
            </h1>
            <p className="mt-3 font-heading text-lg font-medium text-evara-slate sm:text-2xl">{cs.place}</p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-evara-slate sm:text-lg">{cs.summary}</p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {cs.hero.map((h) => (
              <div key={h.label} className="rounded-2xl border border-white/70 bg-white/55 p-5 backdrop-blur-xl">
                <dd className="font-heading text-2xl font-semibold text-evara-ink tabular-nums sm:text-3xl lg:text-4xl">{h.value}</dd>
                <dt className="mt-1 text-xs leading-snug text-evara-slate sm:text-sm">{h.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Challenge */}
      <Section tone="paper">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading kicker="The situation" title="What we walked into." />
            <ul className="flex flex-col gap-5 lg:pt-10">
              {cs.challenge.map((c) => (
                <li key={c} className="border-l-2 border-evara-line pl-5 text-base leading-relaxed text-evara-slate sm:text-lg">{c}</li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Approach */}
      <Section tone="mist">
        <Container>
          <SectionHeading kicker="What we installed" title="The approach." />
          <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {cs.approach.map((a, i) => (
              <li key={a} className="rounded-2xl border border-white/70 bg-white/50 p-5 backdrop-blur-xl sm:p-6">
                <p className="font-mono text-xs text-evara-water tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-sm leading-relaxed text-evara-ink sm:text-base">{a}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Findings */}
      <Section tone="paper">
        <Container>
          <SectionHeading kicker="What the data showed" title="Findings." />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {cs.findings.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/70 bg-white/45 p-6 backdrop-blur-xl">
                <h3 className="font-heading text-lg font-semibold text-evara-ink sm:text-xl">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-evara-slate sm:text-base">{f.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Outcome */}
      <Section tone="lab">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading kicker="Where it stands" title={cs.status === "live" ? "The outcome." : "Where it is now."} />
            <div className="lg:pt-10">
              <p className="text-base leading-relaxed text-evara-ink sm:text-lg">{cs.outcome}</p>
              {used.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs font-semibold tracking-[0.16em] text-evara-slate uppercase">Instruments involved</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {used.map((p) => (
                      <li key={p!.slug}>
                        <Link
                          href={`/products/${p!.slug}`}
                          className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-medium text-evara-ink backdrop-blur-xl transition-colors hover:border-evara-water-300 hover:bg-white/75"
                        >
                          <Check className="size-3.5 text-evara-teal" strokeWidth={2.5} />
                          {p!.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-8">
                <ContactButton className="h-12 rounded-lg bg-evara-ink px-6 text-sm font-medium text-white hover:bg-evara-navy-700">
                  Talk to us about your site
                </ContactButton>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Onward */}
      <Section tone="paper">
        <Container>
          <Link
            href={`/case-studies/${next.slug}`}
            className="group flex items-center justify-between gap-6 rounded-2xl border border-white/70 bg-white/45 p-6 backdrop-blur-xl transition-colors hover:border-evara-water-300 hover:bg-white/65 sm:p-8"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-evara-slate uppercase">Next case study</p>
              <p className="mt-2 font-heading text-xl font-semibold text-evara-ink sm:text-2xl">{next.title}</p>
              <p className="mt-1 text-sm text-evara-slate">{next.place}</p>
            </div>
            <ArrowRight className="size-6 shrink-0 text-evara-water transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/#proof" className="mt-6 inline-flex min-h-9 items-center gap-2 text-sm font-medium text-evara-slate hover:text-evara-ink">
            <ArrowLeft className="size-4" />
            All deployments
          </Link>
        </Container>
      </Section>

      <Cta />
    </>
  );
}
