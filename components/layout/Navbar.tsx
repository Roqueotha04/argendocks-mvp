"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import type { Localized, SectionId } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { WhatsAppIcon } from "@/components/ui/icons";

const { business, contact } = siteConfig;
const navSections: SectionId[] = siteConfig.sections.filter((id) => id !== "hero");

function navLabel(id: SectionId): Localized {
  return id === "offerings" ? siteConfig.offerings.title : ui.nav[id];
}

export function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

  const whatsappHref = buildWhatsAppLink(business.whatsapp, t(contact.whatsappMessage));

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-secondary/15 bg-accent/85 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:px-8">
        <a href="#hero" className="flex items-center gap-2.5">
          {business.logo && (
            <Image
              src={business.logo}
              alt={business.name}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full ring-2 ring-secondary/40"
            />
          )}
          <span className="font-heading text-lg font-bold text-primary">
            {business.logoText ?? business.name}
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {navSections.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="text-sm font-semibold text-foreground/70 transition-colors hover:text-secondary"
              >
                {t(navLabel(id))}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(ui.whatsapp.aria)}
            className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-[1.04] md:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t(ui.whatsapp.cta)}
          </a>
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? t(ui.menu.close) : t(ui.menu.open)}
            aria-expanded={isOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
          >
            <span className="text-xl">{isOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 border-t border-secondary/15 px-6 py-4">
              {navSections.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-base font-semibold text-foreground/80 transition-colors hover:text-secondary"
                >
                  {t(navLabel(id))}
                </a>
              ))}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                aria-label={t(ui.whatsapp.aria)}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-white"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t(ui.whatsapp.cta)}
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
