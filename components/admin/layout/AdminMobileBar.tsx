"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { adminUi } from "@/config/admin.ui";
import { AdminBrand } from "@/components/admin/layout/AdminBrand";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

const labels = adminUi.shell;

export function AdminMobileBar() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const close = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-white/95 px-4 backdrop-blur">
        <AdminBrand />
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={labels.openMenu}
          aria-expanded={isOpen}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-primary"
        >
          <MenuIcon className="h-4 w-4" />
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50">
            <m.button
              type="button"
              aria-label={labels.closeMenu}
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-deep/40"
            />
            <m.div
              initial={{ x: shouldReduceMotion ? 0 : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: shouldReduceMotion ? 0 : "-100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 w-[min(16rem,85vw)] shadow-xl"
            >
              <AdminSidebar onNavigate={close} />
              <button
                type="button"
                onClick={close}
                aria-label={labels.closeMenu}
                className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-full text-primary/60 hover:text-primary"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
