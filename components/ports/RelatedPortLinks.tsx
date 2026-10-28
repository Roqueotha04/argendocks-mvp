"use client";

import Link from "next/link";
import { ui } from "@/config/i18n";
import type { Puerto } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { portPath } from "@/lib/navigation";
import { findRelatedPorts } from "@/lib/ports";
import { ArrowRightIcon } from "@/components/ui/icons";

export function RelatedPortLinks({ port }: { port: Puerto }) {
  const { t } = useLanguage();
  const relatedPorts = findRelatedPorts(port);

  return (
    <section aria-labelledby="related-title" className="border-t border-line pt-8 print:hidden">
      <h2 id="related-title" className="font-heading text-xl font-semibold text-primary">
        {t(ui.portDetail.relatedTitle)}
      </h2>
      <ul className="mt-4 grid gap-3 md:grid-cols-3">
        {relatedPorts.map((related) => (
          <li key={related.slug}>
            <Link
              href={portPath(related.slug)}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-secondary"
            >
              <span className="min-w-0">
                <span className="block font-data text-[10px] tracking-[0.2em] text-secondary">{related.unLocode}</span>
                <span className="block truncate font-semibold text-primary">{related.nombre}</span>
                <span className="block truncate text-xs text-primary/60">
                  {related.localidad}, {related.provincia}
                </span>
              </span>
              <ArrowRightIcon className="h-4 w-4 shrink-0 text-secondary transition-transform group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
