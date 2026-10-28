"use client";

import Image from "next/image";
import { ui } from "@/config/i18n";
import type { Puerto } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";

export function PortPhoto({ port }: { port: Puerto }) {
  const { t } = useLanguage();

  return (
    <figure>
      <div className="img-shimmer relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[16/9] lg:aspect-[21/9]">
        <Image
          src={port.foto.src}
          alt={`${port.nombre}, ${port.localidad}`}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1150px"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-2 text-right text-[11px] text-primary/50">
        {t(ui.portDetail.photo)}: {port.foto.credito}
      </figcaption>
    </figure>
  );
}
