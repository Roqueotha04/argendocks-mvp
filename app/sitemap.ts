import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { ports } from "@/config/ports";
import { PORTS_PATH, portPath } from "@/lib/navigation";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.site.url;
  const lastModified = new Date();

  const portPages: MetadataRoute.Sitemap = ports.map((port) => ({
    url: `${baseUrl}${portPath(port.slug)}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    { url: baseUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}${PORTS_PATH}`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...portPages,
  ];
}
