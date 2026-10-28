"use client";

import type { Puerto } from "@/config/port.types";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { PortRecordHeader } from "@/components/ports/PortRecordHeader";
import { PortPhoto } from "@/components/ports/PortPhoto";
import { PortKeyFigures } from "@/components/ports/PortKeyFigures";
import { TerminalsTable } from "@/components/ports/TerminalsTable";
import { PortFacts } from "@/components/ports/PortFacts";
import { RelatedPortLinks } from "@/components/ports/RelatedPortLinks";

export function PortRecord({ port }: { port: Puerto }) {
  const { t } = useLanguage();

  return (
    <Section className="bg-background">
      <article className="space-y-10">
        <PortRecordHeader port={port} />
        <PortPhoto port={port} />

        <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-12">
          <div className="space-y-10">
            <p className="max-w-3xl text-lg leading-relaxed text-primary/85">{t(port.descripcion)}</p>
            <PortKeyFigures port={port} />
            <TerminalsTable terminals={port.terminales} />
          </div>
          <PortFacts port={port} />
        </div>

        <RelatedPortLinks port={port} />
      </article>
    </Section>
  );
}
