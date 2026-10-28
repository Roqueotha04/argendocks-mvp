import { z } from "zod";
import type { SiteConfig } from "@/config/site.types";

const localized = z.object({ es: z.string(), en: z.string() });
const localizedArray = z.object({ es: z.array(z.string()), en: z.array(z.string()) });

const offeringSchema = z.object({
  name: localized,
  description: localized,
  price: z.string().optional(),
  image: z.string().optional(),
  slug: z.string().optional(),
});

const sectionId = z.enum(["hero", "offerings", "about", "contact", "testimonials", "gallery", "faq"]);

const configSchema = z.object({
  site: z.object({
    url: z.string().min(1, "site.url is required"),
    defaultLocale: z.enum(["es", "en"]),
  }),
  business: z.object({
    name: z.string().min(1, "business.name is required"),
    legalName: z.string().optional(),
    logoText: z.string().optional(),
    logo: z.string().optional(),
    phone: z.string().min(1, "business.phone is required"),
    whatsapp: z.string().min(1, "business.whatsapp is required"),
    email: z.string().optional(),
    address: z.string().optional(),
    mapUrl: z.string().optional(),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    hours: localized.optional(),
  }),
  brand: z.object({
    headingFont: z.string().min(1),
    bodyFont: z.string().min(1),
  }),
  sections: z.array(sectionId).min(1, "At least one section is required"),
  variants: z.object({
    about: z.enum(["split", "simple"]).optional(),
    contact: z.enum(["full", "centered"]).optional(),
    offerings: z.enum(["grid", "carousel"]).optional(),
  }).optional(),
  hero: z.object({
    eyebrow: localized.optional(),
    title: localized,
    subtitle: localized,
    ctaText: localized,
    backgroundImage: z.string().optional(),
  }),
  offerings: z.object({
    kind: z.enum(["services", "products"]),
    title: localized,
    subtitle: localized.optional(),
    items: z.array(offeringSchema).min(1, "At least one offering is required"),
  }),
  about: z.object({
    title: localized,
    eyebrow: localized.optional(),
    body: localizedArray,
    highlights: z.array(z.object({ value: z.string(), label: localized })).optional(),
    image: z.string().optional(),
  }),
  contact: z.object({
    title: localized,
    subtitle: localized,
    whatsappMessage: localized,
  }),
  testimonials: z.object({
    title: localized,
    subtitle: localized.optional(),
    items: z.array(z.object({
      name: z.string(),
      role: localized.optional(),
      quote: localized,
      avatar: z.string().optional(),
    })),
  }).optional(),
  gallery: z.object({
    title: localized,
    subtitle: localized.optional(),
    images: z.array(z.object({ src: z.string(), alt: localized })),
  }).optional(),
  faq: z.object({
    title: localized,
    subtitle: localized.optional(),
    items: z.array(z.object({ question: localized, answer: localized })),
  }).optional(),
  legalLinks: z.array(z.object({ label: localized, href: z.string() })).optional(),
  seo: z.object({
    title: localized,
    description: localized,
    keywords: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
  }),
});

export function validateConfig(config: SiteConfig): SiteConfig {
  const result = configSchema.safeParse(config);
  if (!result.success) {
    const errors = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`\n\n❌ Config validation failed:\n${errors}\n`);
  }
  return result.data as SiteConfig;
}
