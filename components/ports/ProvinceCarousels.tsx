"use client";

import { ui } from "@/config/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { groupPortsByProvince } from "@/lib/ports";
import { Carousel, carouselItemClassName } from "@/components/ui/Carousel";
import { PortCard } from "@/components/ports/PortCard";

const provinceGroups = groupPortsByProvince();

interface ProvinceCarouselsProps {
  activeSlug: string | null;
  onHighlight: (slug: string | null) => void;
}

export function ProvinceCarousels({ activeSlug, onHighlight }: ProvinceCarouselsProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-10">
      {provinceGroups.map(({ province, ports }) => (
        <Carousel
          key={province}
          header={
            <h2 className="flex items-baseline gap-3 font-heading text-xl font-semibold text-primary">
              {province}
              <span className="font-data text-xs font-normal text-primary/55">
                {ports.length} {t(ui.explorer.results)}
              </span>
            </h2>
          }
        >
          {ports.map((port) => (
            <div key={port.slug} className={carouselItemClassName}>
              <PortCard port={port} isActive={port.slug === activeSlug} onHighlight={onHighlight} />
            </div>
          ))}
        </Carousel>
      ))}
    </div>
  );
}
