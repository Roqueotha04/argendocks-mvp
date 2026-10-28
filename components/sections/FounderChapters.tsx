"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ui } from "@/config/i18n";
import type { AboutChapter } from "@/config/site.types";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";

export function FounderChapters({ chapters }: { chapters: AboutChapter[] }) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeChapter = chapters[activeIndex];

  function goTo(offset: number) {
    setActiveIndex((current) => (current + offset + chapters.length) % chapters.length);
  }

  return (
    <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-5 md:p-7">
      <div role="tablist" className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {chapters.map((chapter, index) => (
          <button
            key={chapter.title.es}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            className="shrink-0 rounded-full px-3 py-1.5 text-left text-xs text-accent/70 transition-colors hover:text-white aria-selected:bg-white aria-selected:text-primary"
          >
            <span className="mr-1.5 font-data">{String(index + 1).padStart(2, "0")}</span>
            {t(chapter.title)}
          </button>
        ))}
      </div>

      <div className="relative mt-5 min-h-[13rem]">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={activeIndex}
            role="tabpanel"
            initial={reduceMotion ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-3"
          >
            {t(activeChapter.body).map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-accent/90 md:text-[15px]">
                {paragraph}
              </p>
            ))}
          </m.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="font-data text-xs text-accent/70">
          {String(activeIndex + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(-1)}
            aria-label={t(ui.founder.previous)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-primary"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => goTo(1)}
            aria-label={t(ui.founder.next)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-white transition-colors hover:bg-white hover:text-primary"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
