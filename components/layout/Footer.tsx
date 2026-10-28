"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { navItems } from "@/lib/navigation";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Logo } from "@/components/layout/Logo";
import { MailIcon, MapPinIcon, WhatsAppIcon } from "@/components/ui/icons";

const { business, contact } = siteConfig;

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-deep text-white print:hidden">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1.2fr] md:gap-8 md:px-8">
        <div className="flex flex-col gap-4">
          <Logo className="h-8" />
          <p className="max-w-xs text-sm leading-relaxed text-accent/80">{t(ui.footer.tagline)}</p>
        </div>

        <nav className="flex flex-col gap-2.5">
          <span className="mb-1 font-data text-[11px] uppercase tracking-[0.22em] text-secondary">
            {t(ui.footer.sections)}
          </span>
          {navItems.map(({ id, href }) => (
            <Link key={id} href={href} className="w-fit text-sm text-white/80 transition-colors hover:text-white">
              {t(ui.nav[id])}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className="mb-1 font-data text-[11px] uppercase tracking-[0.22em] text-secondary">
            {t(ui.footer.contact)}
          </span>
          {business.email && (
            <a href={`mailto:${business.email}`} className="flex items-center gap-2.5 text-sm text-white/80 hover:text-white">
              <MailIcon className="h-4 w-4 shrink-0 text-secondary" />
              {business.email}
            </a>
          )}
          {business.address && (
            <p className="flex items-start gap-2.5 text-sm text-white/80">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              {business.address}
            </p>
          )}
          <a
            href={buildWhatsAppLink(business.whatsapp, t(contact.whatsappMessage))}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-sm text-white/80 hover:text-white"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0 text-secondary" />
            {business.phone}
          </a>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-center md:flex-row md:px-8 md:text-left">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {business.name}. {t(ui.footer.rights)}
          </p>
          <a
            href="https://www.estudiove.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/50 transition-colors hover:text-white"
          >
            {t(ui.footer.designedBy)} <span className="font-semibold text-white/80">Estudio Ve</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
