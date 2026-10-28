"use client";

import type { ReactNode } from "react";
import { ui } from "@/config/i18n";
import { useDragScroll } from "@/hooks/useDragScroll";
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";

export const carouselItemClassName = "w-[78vw] max-w-[300px] shrink-0 snap-start";

type CarouselTone = "default" | "onColor";

interface CarouselProps {
  header?: ReactNode;
  children: ReactNode;
  tone?: CarouselTone;
  className?: string;
}

const controlClasses: Record<CarouselTone, string> = {
  default: "border-primary/20 text-primary hover:border-primary hover:bg-primary hover:text-white",
  onColor: "border-white/30 text-white hover:border-white hover:bg-white hover:text-primary",
};

export function Carousel({ header, children, tone = "default", className = "" }: CarouselProps) {
  const { t } = useLanguage();
  const trackRef = useDragScroll<HTMLDivElement>();

  function scrollByPage(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  }

  const controlClassName = `hidden h-9 w-9 items-center justify-center rounded-full border transition-colors md:flex ${controlClasses[tone]}`;

  return (
    <div className={className}>
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">{header}</div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => scrollByPage(-1)} aria-label={t(ui.carousel.previous)} className={controlClassName}>
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => scrollByPage(1)} aria-label={t(ui.carousel.next)} className={controlClassName}>
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={trackRef}
        className="-mx-6 mt-5 flex cursor-grab snap-x snap-proximity scroll-px-6 gap-4 overflow-x-auto px-6 pb-3 select-none active:cursor-grabbing [scrollbar-width:none] md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}
