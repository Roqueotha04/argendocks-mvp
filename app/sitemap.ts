import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { offeringSlug } from "@/lib/slug";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.site.url;

  const offeringPages: MetadataRoute.Sitemap = siteConfig.offerings.items.map(
    (item) => ({
      url: `${baseUrl}/oferta/${offeringSlug(item)}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...offeringPages,
  ];
}
