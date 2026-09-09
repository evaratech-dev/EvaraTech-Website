import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Allow every crawler everywhere, and point them at the sitemap. Nothing on
 * the site is private, so there is nothing to disallow.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
