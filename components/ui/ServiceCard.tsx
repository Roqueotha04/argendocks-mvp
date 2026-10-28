"use client";

import Link from "next/link";
import type { Offering } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";
import { offeringSlug } from "@/lib/slug";

export function ServiceCard({ item }: { item: Offering }) {
  const { t } = useLanguage();

  return (
    <Link
      href={`/oferta/${offeringSlug(item)}`}
      className="group flex h-full flex-col rounded-2xl border border-foreground/10 p-5 transition-colors hover:border-primary/40"
    >
      <h3 className="font-heading text-lg font-semibold text-foreground group-hover:underline">
        {t(item.name)}
      </h3>
      <p className="mt-2 flex-1 text-sm text-foreground/70">{t(item.description)}</p>
    </Link>
  );
}
