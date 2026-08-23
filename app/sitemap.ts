import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { brandSlugs } from "@/content/brands";
import { serviceSlugs } from "@/content/services";
import { posts } from "@/content/posts";

/**
 * Every route on the site. Priorities reflect the two-pillar structure: the
 * family hubs and the Range Rover page carry the most weight.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core = ([
    { url: "/", priority: 1, changeFrequency: "weekly" },
    { url: "/range-rover-specialist-sharjah", priority: 0.95, changeFrequency: "monthly" },
    { url: "/german-car-repair-sharjah", priority: 0.95, changeFrequency: "monthly" },
    { url: "/pickup-and-delivery", priority: 0.9, changeFrequency: "monthly" },
    { url: "/services", priority: 0.85, changeFrequency: "monthly" },
    { url: "/book", priority: 0.8, changeFrequency: "yearly" },
    { url: "/about", priority: 0.6, changeFrequency: "yearly" },
    { url: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { url: "/blog", priority: 0.6, changeFrequency: "weekly" },
    { url: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
    { url: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ] as const).map((e) => ({
    ...e,
    url: `${site.domain}${e.url}`,
    lastModified: now,
  })) satisfies MetadataRoute.Sitemap;

  const brandPages: MetadataRoute.Sitemap = brandSlugs.map((slug) => ({
    url: `${site.domain}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: slug === "range-rover-repair-sharjah" ? 0.95 : 0.85,
  }));

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${site.domain}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.domain}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...core, ...brandPages, ...servicePages, ...blogPages];
}
