"use client";

import { ui } from "@/config/i18n";
import type { Puerto } from "@/config/port.types";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TerminalCard } from "@/components/ports/TerminalCard";
import { PortOverview } from "@/components/ports/PortOverview";

export function PortBody({ port }: { port: Puerto }) {
  return (
    <Section stacked className="z-10 bg-accent">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-8">
        <div>
          <SectionHeading title={ui.portDetail.terminalsTitle} subtitle={ui.portDetail.terminalsSubtitle} />
          <div className="mt-8 space-y-4">
            {port.terminales.map((terminal, index) => (
              <Reveal key={terminal.nombre} delay={index * 0.05}>
                <TerminalCard terminal={terminal} />
              </Reveal>
            ))}
          </div>
        </div>
        <PortOverview port={port} />
      </div>
    </Section>
  );
}
