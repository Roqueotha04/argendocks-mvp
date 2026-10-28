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
import { Field, fieldInputClassName } from "@/components/ui/Field";
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
      <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
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
          <form
            onSubmit={handleSubmit}
            className="grid gap-4 rounded-3xl border border-line bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,24,48,0.5)] md:p-8 lg:grid-cols-2"
          >
            <h3 className="font-heading text-lg font-semibold text-primary lg:col-span-2">
              {t(ui.contact.formTitle)}
            </h3>
            <Field label={t(ui.contact.nameLabel)} className="lg:col-span-2">
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
                className={fieldInputClassName}
              />
            </Field>
            <Field label={t(ui.contact.emailLabel)}>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
                className={fieldInputClassName}
              />
            </Field>
            <Field label={t(ui.contact.companyLabel)}>
              <input
                type="text"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                autoComplete="organization"
                className={fieldInputClassName}
              />
            </Field>
            <Field label={t(ui.contact.messageLabel)} className="lg:col-span-2">
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={t(ui.contact.messagePlaceholder)}
                required
                rows={4}
                className={`${fieldInputClassName} resize-none`}
              />
            </Field>
            <button
              type="submit"
              className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-white transition-colors hover:bg-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary lg:col-span-2"
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
