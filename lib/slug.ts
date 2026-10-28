import { siteConfig } from "@/config/site.config";
import type { Offering } from "@/config/site.types";

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function offeringSlug(item: Offering): string {
  return item.slug ?? slugify(item.name.es);
}

export function findOfferingBySlug(slug: string): Offering | undefined {
  return siteConfig.offerings.items.find((item) => offeringSlug(item) === slug);
}
