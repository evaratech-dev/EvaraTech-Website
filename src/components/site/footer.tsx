import Link from "next/link";
import { Container } from "@/components/site/section";
import { ContactTrigger } from "@/components/contact/contact-dialog";
import { company, products } from "@/lib/evara-data";

type FooterLink = { label: string; href?: string; action?: "contact" };

const FOOTER_COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Products",
    links: products.slice(0, 4).map((p) => ({ label: p.name, href: "/#ecosystem" })),
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
      { label: "Contact", action: "contact" },
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

const linkClass =
  "inline-flex min-h-9 items-center text-sm text-muted-foreground transition-colors hover:text-white sm:min-h-0";

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
            <ContactTrigger className="mt-3 inline-flex min-h-9 items-center text-sm text-evara-water-300 hover:text-white">
              {company.email}
            </ContactTrigger>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white">{col.heading}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.action === "contact" ? (
                      <ContactTrigger className={linkClass}>
                        {link.label}
                      </ContactTrigger>
                    ) : (
                      <Link href={link.href ?? "/"} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
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
