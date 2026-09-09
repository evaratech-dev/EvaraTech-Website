import Link from "next/link";
import { Container } from "@/components/site/section";
import { company, products } from "@/lib/evara-data";

const FOOTER_COLUMNS = [
  {
    heading: "Products",
    links: products
      .slice(0, 4)
      .map((p) => ({ label: p.name, href: "/#ecosystem" })),
  },
  {
    heading: "Platform",
    links: [
      { label: "Overview", href: "/#platform" },
      { label: "AI & Analytics", href: "/#platform" },
      { label: "Digital Twin", href: "/#platform" },
      { label: "Integrations", href: "/#platform" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/#proof" },
      { label: "Deployments", href: "/#proof" },
      { label: "Why EvaraTech", href: "/#proof" },
      { label: "Contact", href: `mailto:${company.email}` },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Specifications", href: "/#ecosystem" },
      { label: "Patent & designs", href: "/#proof" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="dark bg-evara-navy-950 text-foreground">
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-[1.6fr_repeat(4,1fr)]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <span className="font-heading text-base font-semibold tracking-tight text-white">
              EVARATECH
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Building intelligent infrastructure that makes every drop of water
              measurable, predictable and optimizable.
            </p>
            <a
              href={`mailto:${company.email}`}
              className="mt-4 inline-block text-sm text-evara-water-300 hover:text-white"
            >
              {company.email}
            </a>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white">{col.heading}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {company.legalName}. All rights
            reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            {company.hq} · {company.supportingLine}
          </p>
        </div>
      </Container>
    </footer>
  );
}
