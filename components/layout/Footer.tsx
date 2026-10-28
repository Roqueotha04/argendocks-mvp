"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import type { Localized, SectionId } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";

const { business, contact, offerings, sections, legalLinks } = siteConfig;
const navSections: SectionId[] = sections.filter((id) => id !== "hero");

function navLabel(id: SectionId): Localized {
  return id === "offerings" ? offerings.title : ui.nav[id];
}

export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    {
      label: "WhatsApp",
      href: buildWhatsAppLink(business.whatsapp, t(contact.whatsappMessage)),
      Icon: WhatsAppIcon,
    },
    ...(business.instagram
      ? [
          {
            label: "Instagram",
            href: `https://instagram.com/${business.instagram.replace(/^@/, "")}`,
            Icon: InstagramIcon,
          },
        ]
      : []),
  ];

  return (
    <footer className="border-t border-white/10 bg-neutral-900 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 md:grid md:grid-cols-[1.6fr_1fr_1fr_1.2fr] md:gap-8 md:px-8 md:py-14">
        <div className="grid grid-cols-2 gap-6 md:contents">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              {business.logo && (
                <Image
                  src={business.logo}
                  alt={business.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full ring-2 ring-white/20"
                />
              )}
              <span className="font-heading text-xl font-bold">
                {business.logoText ?? business.name}
              </span>
            </div>
            {business.address && (
              <p className="max-w-xs text-sm text-white/60">{business.address}</p>
            )}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-6 md:contents">
            <nav className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wide text-white/40">
                {t(ui.footer.sections)}
              </span>
              {navSections.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {t(navLabel(id))}
                </a>
              ))}
            </nav>

            {legalLinks && legalLinks.length > 0 && (
              <nav className="flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wide text-white/40">
                  {t(ui.footer.legal)}
                </span>
                {legalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {t(link.label)}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wide text-white/40">
            {t(ui.footer.designedBy)}
          </span>
          <a
            href="https://www.estudiove.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <Image
              src="/estudio-ve-logo.png"
              alt="Estudio Ve"
              width={400}
              height={283}
              className="h-8 w-auto"
            />
            <span className="font-heading text-base font-bold">Estudio Ve</span>
          </a>
          <p className="text-sm text-white/60">{t(ui.footer.agencyTagline)}</p>
          <a
            href="https://www.estudiove.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            www.estudiove.com
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-center md:flex-row md:px-8 md:text-left">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {business.name}. {t(ui.footer.rights)}
          </p>
          <p className="text-xs text-white/50">
            {t(ui.footer.designedBy)}{" "}
            <span className="font-semibold text-white/80">Estudio Ve</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
