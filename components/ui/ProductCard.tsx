"use client";

import Image from "next/image";
import Link from "next/link";
import type { Offering } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";
import { offeringSlug } from "@/lib/slug";

export function ProductCard({ item }: { item: Offering }) {
  const { t } = useLanguage();

  return (
    <Link
      href={`/oferta/${offeringSlug(item)}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1.5"
    >
      <div className="img-shimmer relative aspect-square w-full overflow-hidden">
        {item.image && (
          <Image
            src={item.image}
            alt={t(item.name)}
            fill
            sizes="(max-width: 768px) 68vw, 300px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {item.price && (
          <span className="absolute right-3 top-3 inline-flex rounded-full bg-secondary px-3 py-1 text-sm font-bold text-white shadow-md">
            {item.price}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-base font-bold text-primary group-hover:underline">
          {t(item.name)}
        </h3>
        <p className="mt-1 flex-1 text-sm text-foreground/70">{t(item.description)}</p>
      </div>
    </Link>
  );
}
