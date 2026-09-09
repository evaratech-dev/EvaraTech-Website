"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#ecosystem", label: "Products" },
  { href: "/#platform", label: "Platform" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/#proof", label: "Company" },
];

/**
 * A floating glass pill rather than a full-width bar: fixed, inset from
 * every edge, rounded-full, backdrop-blur. It thickens its border and
 * shadow slightly once the page scrolls, but never becomes a solid strip —
 * that would break the "glass hovering over the page" read the rest of the
 * site is built on.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // The homepage opens on a dark cinematic video, so the pill rides over it
  // as dark glass with white text, then flips to light glass the moment the
  // reader scrolls into the light sections below (or on any other page).
  const overDark = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 sm:top-4">
      <div className="container-evara">
        <div
          className={cn(
            "relative mx-auto flex h-14 items-center justify-between rounded-full border px-3 backdrop-blur-xl transition-all duration-300 sm:h-16 sm:px-3.5",
            overDark
              ? "border-white/15 bg-white/10 shadow-[0_18px_44px_-22px_rgba(0,0,0,0.6)]"
              : scrolled
                ? "border-white/70 bg-white/70 shadow-[0_18px_44px_-22px_rgba(15,33,56,0.4)]"
                : "border-white/55 bg-white/45 shadow-[0_14px_36px_-24px_rgba(15,33,56,0.3)]"
          )}
        >
          {/* Specular sheen */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent to-transparent",
              overDark ? "via-white/40" : "via-white"
            )}
          />

          <Logo
            wordmarkClassName={overDark ? "text-white" : "text-evara-ink"}
            className="pl-2.5 sm:pl-3"
          />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group/navlink relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  overDark
                    ? "text-white/80 hover:text-white"
                    : "text-evara-slate hover:text-evara-ink"
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/navlink:scale-x-100",
                    overDark ? "bg-evara-teal-300" : "bg-evara-water"
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button
              asChild
              className={cn(
                "h-10 rounded-full px-5 text-sm font-medium transition-colors",
                overDark
                  ? "bg-evara-water text-white shadow-[0_10px_24px_-10px_rgba(28,117,188,0.8)] hover:bg-evara-water-400"
                  : "bg-evara-ink text-white shadow-[0_10px_24px_-12px_rgba(15,33,56,0.55)] hover:bg-evara-navy-700"
              )}
            >
              <a href="mailto:contact@evaratech.com">Request Demo</a>
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                className={cn(
                  "mr-1 size-11 rounded-full lg:hidden",
                  overDark
                    ? "text-white hover:bg-white/10"
                    : "text-evara-ink hover:bg-white/60"
                )}
                aria-label="Open menu"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l border-evara-line bg-white sm:max-w-sm"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col px-2 pt-4">
                <div className="px-4">
                  <Logo wordmarkClassName="text-evara-ink" />
                </div>
                <nav
                  aria-label="Mobile"
                  className="mt-10 flex flex-col gap-1 px-2"
                >
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="flex min-h-14 items-center rounded-lg px-3 text-lg font-medium text-evara-ink transition-colors hover:bg-evara-fog"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto px-2 pb-6">
                  <Button
                    asChild
                    className="h-14 w-full rounded-lg bg-evara-ink text-base font-medium text-white hover:bg-evara-navy-700"
                  >
                    <a href="mailto:contact@evaratech.com">Request Demo</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
