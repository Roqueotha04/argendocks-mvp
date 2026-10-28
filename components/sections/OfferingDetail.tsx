"use client";

import Image from "next/image";
import Link from "next/link";
import type { Offering, OfferingKind } from "@/config/site.types";
import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";

const { business } = siteConfig;

export function OfferingDetail({
  item,
  kind,
}: {
  item: Offering;
  kind: OfferingKind;
}) {
  const { t } = useLanguage();

  const ctaLabel =
    kind === "products" ? ui.offeringDetail.addToCart : ui.offeringDetail.requestService;
  const message = `${t(ui.offeringDetail.whatsappIntro)} ${t(item.name)}${
    item.price ? ` (${item.price})` : ""
  }`;
  const whatsappHref = buildWhatsAppLink(business.whatsapp, message);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12 md:px-8 md:py-16">
      <Link
        href="/#offerings"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-opacity hover:opacity-70"
      >
        <span aria-hidden>←</span>
        {t(ui.offeringDetail.back)}
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2 md:items-start md:gap-12">
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-accent">
          {item.image && (
            <Image
              src={item.image}
              alt={t(item.name)}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 40vw"
              className="object-cover"
            />
          )}
        </div>

        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {t(item.name)}
          </h1>
          {item.price && (
            <p className="mt-3 text-2xl font-bold text-secondary">{item.price}</p>
          )}
          <p className="mt-4 text-base leading-relaxed text-foreground/75 md:text-lg">
            {t(item.description)}
          </p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {t(ctaLabel)}
          </a>
        </div>
      </div>
    </section>
  );
}
