"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { ui } from "@/config/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { navItems, PORTS_PATH } from "@/lib/navigation";
import { Logo } from "@/components/layout/Logo";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

const demoLabel = siteConfig.hero.secondaryCtaText ?? ui.whatsapp.cta;

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
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

  function isCurrent(href: string) {
    return href === PORTS_PATH && pathname.startsWith(PORTS_PATH);
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/10 bg-deep/95 backdrop-blur print:hidden"
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 md:h-[72px] md:px-8">
        <Logo />

        <ul className="hidden items-center gap-1 rounded-full bg-white/5 p-1 lg:flex">
          {navItems.map(({ id, href }) => (
            <li key={id}>
              <Link
                href={href}
                aria-current={isCurrent(href) ? "page" : undefined}
                className="block rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white aria-[current=page]:bg-white aria-[current=page]:text-primary"
              >
                {t(ui.nav[id])}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <WhatsAppButton
            label={t(demoLabel)}
            className="hidden h-9 px-4 text-xs md:inline-flex"
          />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? t(ui.menu.close) : t(ui.menu.open)}
            aria-expanded={isOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
          >
            {isOpen ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
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
            className="overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-1 border-t border-white/10 px-6 py-4">
              {navItems.map(({ id, href }) => (
                <Link
                  key={id}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-base text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {t(ui.nav[id])}
                </Link>
              ))}
              <WhatsAppButton className="mt-3 w-full" />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
