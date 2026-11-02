import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { ADMIN_HOME_PATH } from "@/config/admin.ui";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ADMIN_HOME_PATH,
    },
    sitemap: `${siteConfig.site.url}/sitemap.xml`,
  };
}
