/**
 * Canonical site identity, in one place.
 *
 * `NEXT_PUBLIC_SITE_URL` lets Vercel (or any host) override the production
 * origin without a code change; the fallback is the intended custom domain.
 * Trailing slash stripped so URL joins never double up.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://evaratech.com"
).replace(/\/+$/, "");

export const SITE_NAME = "EvaraTech";

/**
 * The company tagline, not a description of the product — this is the line
 * that shows as the headline wherever the site is shared (WhatsApp, Slack,
 * LinkedIn, Google), so it has to read as the brand.
 */
export const SITE_TITLE = "EvaraTech — Your Universe of Sustainable Solutions";

export const SITE_DESCRIPTION =
  "Smart IoT devices and an AI-powered platform for real-time water intelligence — retrofit onto the tanks, borewells, meters and pumps you already have, with no pipe cutting and no civil work.";

/** Absolute URL helper for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
