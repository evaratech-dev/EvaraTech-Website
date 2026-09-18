import { Container } from "@/components/site/section";

/**
 * Shared frame for the privacy and terms pages: a quiet, readable column.
 * Legal copy is prose; it gets a measure, not a layout.
 */
export function LegalPage({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-lab-wash">
      <Container className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[11px] tracking-[0.24em] text-evara-water uppercase sm:text-xs">
            {kicker}
          </p>
          <h1 className="mt-4 font-heading text-[2.2rem] leading-[1.08] font-semibold tracking-tight text-evara-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-evara-slate">Last updated {updated}</p>
          <div className="prose-evara mt-10">{children}</div>
        </div>
      </Container>
    </section>
  );
}
