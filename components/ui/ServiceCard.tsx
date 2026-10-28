"use client";

import type { Offering } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";
import { AnchorIcon } from "@/components/ui/icons";

export function ServiceCard({ item }: { item: Offering }) {
  const { t } = useLanguage();

  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
        <AnchorIcon className="h-5 w-5" />
      </span>
      <h3 className="mt-5 font-heading text-lg font-semibold text-primary">{t(item.name)}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-primary/75">{t(item.description)}</p>
    </article>
  );
}
