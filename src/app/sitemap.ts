import type { MetadataRoute } from "next";
import { listedProducts } from "@/lib/evara-data";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap for crawlers: the homepage, every listed product page and the two
 * legal pages. Unlisted products are noindex and therefore left out. All
 * routes are statically generated, so one file covers the whole site well under Google's
 * 50,000-URL limit.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const productPages: MetadataRoute.Sitemap = listedProducts.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [`${SITE_URL}/images/og/${p.slug}.jpg`, ...(p.image ? [`${SITE_URL}${p.image}`] : [])],
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/images/og.jpg`],
    },
    ...productPages,
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
