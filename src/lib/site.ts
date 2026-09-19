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
 * Two homepage titles, on purpose.
 *
 * SITE_TITLE is the document title search engines index: the category first,
 * the brand last, so someone searching for smart water management finds it.
 * SHARE_TITLE is the company tagline, used for Open Graph and Twitter cards,
 * so a link pasted into WhatsApp or LinkedIn reads as the brand.
 */
export const SITE_TITLE = "Smart Water Management IoT Solutions | EvaraTech";
export const SHARE_TITLE = "EvaraTech - Your Universe of Sustainable Solutions";

/** Under 160 characters: what the company makes, and where. */
export const SITE_DESCRIPTION =
  "EvaraTech builds IoT devices and an AI platform that make existing water infrastructure smart: tank, borewell, meter, pump and valve monitoring from Hyderabad.";

/** Absolute URL helper for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
