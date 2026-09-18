import type { MetadataRoute } from "next";
import { products, caseStudies } from "@/lib/evara-data";
import { SITE_URL } from "@/lib/site";

/**
 * Sitemap for crawlers: the homepage, every product page and every case
 * study. All routes are statically generated, so one file covers the whole site well under Google's
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

  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${SITE_URL}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...productPages,
    ...caseStudyPages,
  ];
}
