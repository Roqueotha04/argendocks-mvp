"use client";

import { useState, type ComponentType, type FormEvent } from "react";
import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import type { Localized } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

const { business, contact } = siteConfig;

interface ContactDetail {
  Icon: ComponentType<{ className?: string }>;
  label: Localized;
  value: string;
  href?: string;
}

export function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const greeting = t(contact.whatsappMessage);

  const detailCandidates: (ContactDetail | null)[] = [
    business.phone
      ? {
          Icon: PhoneIcon,
          label: ui.contact.phone,
          value: business.phone,
          href: `tel:${business.phone.replace(/\s/g, "")}`,
        }
      : null,
    business.email
      ? {
          Icon: MailIcon,
          label: ui.contact.email,
          value: business.email,
          href: `mailto:${business.email}`,
        }
      : null,
    business.address
      ? { Icon: MapPinIcon, label: ui.contact.address, value: business.address }
      : null,
    business.hours
      ? { Icon: ClockIcon, label: ui.contact.hours, value: t(business.hours) }
      : null,
  ];
  const details = detailCandidates.filter(
    (detail): detail is ContactDetail => detail !== null,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const composed = [greeting, name && `${t(ui.contact.nameLabel)}: ${name}`, message]
      .filter(Boolean)
      .join("\n");
    window.open(buildWhatsAppLink(business.whatsapp, composed), "_blank", "noopener");
  }

  return (
    <Section
      id="contact"
      className="bg-primary text-white"
      topDivider={<WaveDivider className="fill-primary" />}
    >
      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <Reveal>
          <SectionHeading
            eyebrow={ui.contact.detailsTitle}
            title={contact.title}
            subtitle={contact.subtitle}
            tone="onColor"
          />

          <ul className="mt-8 space-y-4">
            {details.map(({ Icon, label, value, href }) => (
              <li key={value} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Icon className="h-5 w-5 text-white" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs uppercase tracking-wide text-white/60">
                    {t(label)}
                  </span>
                  {href ? (
                    <a href={href} className="text-base font-semibold hover:underline">
                      {value}
                    </a>
                  ) : (
                    <span className="text-base font-semibold">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={buildWhatsAppLink(business.whatsapp, greeting)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(ui.whatsapp.aria)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-base font-bold text-white shadow-lg transition-transform hover:scale-[1.03]"
          >
            <WhatsAppIcon className="h-6 w-6" />
            {t(ui.whatsapp.cta)}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-background p-6 text-foreground shadow-2xl md:p-8"
          >
            <h3 className="font-heading text-xl font-bold text-secondary">
              {t(ui.contact.formTitle)}
            </h3>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-foreground/80">
                  {t(ui.contact.nameLabel)}
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t(ui.contact.namePlaceholder)}
                  required
                  className="w-full rounded-xl border border-foreground/15 bg-white px-4 py-3 text-base outline-none transition-colors placeholder:text-foreground/40 focus:border-secondary"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-foreground/80">
                  {t(ui.contact.messageLabel)}
                </span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={t(ui.contact.messagePlaceholder)}
                  required
                  rows={4}
                  className="w-full resize-none rounded-xl border border-foreground/15 bg-white px-4 py-3 text-base outline-none transition-colors placeholder:text-foreground/40 focus:border-secondary"
                />
              </label>

              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-base font-bold text-white transition-transform hover:scale-[1.02]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {t(ui.contact.submit)}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
