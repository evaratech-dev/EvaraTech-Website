import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/site/section";
import { ContactButton } from "@/components/contact/contact-dialog";
import { listedProducts } from "@/lib/evara-data";

/**
 * 404. Styled as a dry reading rather than an apology: the page is the one
 * thing on the site with no signal. Offers the instruments and the way home.
 */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-lab-wash">
      <Container className="relative flex min-h-[70svh] flex-col justify-center py-16 sm:py-24">
        <p className="font-mono text-[11px] tracking-[0.24em] text-evara-water uppercase sm:text-xs">
          Error 404 · No signal
        </p>
        <h1 className="mt-5 max-w-3xl text-balance font-heading text-[2.4rem] leading-[1.04] font-semibold tracking-tight text-evara-ink sm:text-6xl">
          This page is the one thing we are not monitoring.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-evara-slate sm:text-lg">
          The address may have changed, or it never existed. Everything that
          does exist is one link away.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-evara-ink px-6 text-sm font-medium text-white transition-colors hover:bg-evara-navy-700"
          >
            <ArrowLeft className="size-4" />
            Back to the homepage
          </Link>
          <ContactButton
            variant="outline"
            className="h-12 rounded-lg border-white/70 bg-white/50 px-6 text-sm font-medium text-evara-ink backdrop-blur-xl hover:bg-white/70"
          >
            Talk to us instead
          </ContactButton>
        </div>

        <div className="mt-14">
          <p className="text-xs font-semibold tracking-[0.16em] text-evara-slate uppercase">
            Or pick an instrument
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {listedProducts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="inline-flex items-center rounded-full border border-white/70 bg-white/50 px-4 py-2 text-sm font-medium text-evara-ink backdrop-blur-xl transition-colors hover:border-evara-water-300 hover:bg-white/75"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
