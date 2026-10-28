"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import type { Localized } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { UnderlineField, underlineInputClassName } from "@/components/ui/UnderlineField";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";

const { business, contact } = siteConfig;

interface ContactDetail {
  label: Localized;
  value: string;
  href?: string;
}

export function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const details: ContactDetail[] = [
    business.email && { label: ui.contact.email, value: business.email, href: `mailto:${business.email}` },
    { label: ui.contact.phone, value: business.phone, href: `tel:${business.phone.replace(/\s|-/g, "")}` },
    business.address && { label: ui.contact.address, value: business.address },
    business.hours && { label: ui.contact.hours, value: t(business.hours) },
  ].filter((detail): detail is ContactDetail => Boolean(detail));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const composed = [
      t(contact.whatsappMessage),
      `${t(ui.contact.nameLabel)}: ${name}`,
      `${t(ui.contact.emailLabel)}: ${email}`,
      company && `${t(ui.contact.companyLabel)}: ${company}`,
      message,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(buildWhatsAppLink(business.whatsapp, composed), "_blank", "noopener");
  }

  return (
    <Section id="contact" className="bg-background">
      <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        <Reveal>
          <SectionHeading eyebrow={contact.eyebrow} title={contact.title} subtitle={contact.subtitle} />

          <dl className="mt-10 space-y-5">
            {details.map(({ label, value, href }) => (
              <div key={value}>
                <dt className="font-data text-[11px] uppercase tracking-[0.2em] text-primary/60">{t(label)}</dt>
                <dd className="mt-1 text-base text-primary">
                  {href ? (
                    <a href={href} className="underline-offset-4 hover:text-secondary hover:underline">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 font-accent text-lg italic text-secondary">{t(ui.contact.or)}</p>
          <WhatsAppButton className="mt-3" />
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={handleSubmit} className="grid gap-7 sm:grid-cols-2">
            <UnderlineField label={t(ui.contact.nameLabel)} className="sm:col-span-2">
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
                className={underlineInputClassName}
              />
            </UnderlineField>
            <UnderlineField label={t(ui.contact.emailLabel)}>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
                className={underlineInputClassName}
              />
            </UnderlineField>
            <UnderlineField label={t(ui.contact.companyLabel)}>
              <input
                type="text"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                autoComplete="organization"
                className={underlineInputClassName}
              />
            </UnderlineField>
            <UnderlineField label={t(ui.contact.messageLabel)} className="sm:col-span-2">
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={t(ui.contact.messagePlaceholder)}
                required
                rows={4}
                className={`${underlineInputClassName} resize-none`}
              />
            </UnderlineField>
            <button
              type="submit"
              className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-white transition-colors hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {t(ui.contact.submit)}
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
