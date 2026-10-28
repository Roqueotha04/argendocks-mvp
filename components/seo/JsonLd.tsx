import { siteConfig } from "@/config/site.config";
import { translate } from "@/lib/i18n";

const { site, business, seo } = siteConfig;

export function JsonLd() {
  const locale = site.defaultLocale;

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.legalName ?? business.name,
    description: translate(seo.description, locale),
    url: site.url,
    telephone: business.phone,
    ...(business.email && { email: business.email }),
    ...(business.address && { address: business.address }),
    ...(business.instagram && {
      sameAs: [`https://instagram.com/${business.instagram.replace(/^@/, "")}`],
    }),
  };

  const safeJson = JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}
