import { siteConfig } from "@/config/site.config";
import type { SectionId } from "@/config/site.types";

export type NavItem = { id: SectionId; href: string };

export const PORTS_PATH = "/puertos";

export const navItems: NavItem[] = siteConfig.sections
  .filter((id) => id !== "hero")
  .map((id) => ({ id, href: id === "ports" ? PORTS_PATH : `/#${id}` }));

export function portPath(slug: string): string {
  return `${PORTS_PATH}/${slug}`;
}
