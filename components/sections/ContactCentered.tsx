"use client";

import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";

const { business, contact } = siteConfig;

export function ContactCentered() {
  const { t } = useLanguage();

  const details = [
    business.phone,
    business.email,
    business.address,
    business.hours && t(business.hours),
  ].filter((value): value is string => Boolean(value));

  return (
    <Section id="contact">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <SectionHeading title={contact.title} subtitle={contact.subtitle} />
        <div className="mt-8">
          <WhatsAppButton />
        </div>
        {details.length > 0 && (
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-foreground/70">
            {details.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        )}
      </Reveal>
    </Section>
  );
}
