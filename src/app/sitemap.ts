import type { MetadataRoute } from "next";
import { products } from "@/lib/evara-data";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap for crawlers: the homepage plus every product page. All routes are
 * statically generated, so one file covers the whole site well under Google's
 * 50,000-URL limit.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...productPages,
  ];
}
