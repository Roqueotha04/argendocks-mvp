"use client";

import type { ReactNode } from "react";
import { useDragScroll } from "@/hooks/useDragScroll";

export const scrollerItemClassName = "w-[78vw] shrink-0 snap-start sm:w-[44vw] md:w-auto";

interface HorizontalScrollerProps {
  children: ReactNode;
  desktopGridClassName: string;
  className?: string;
}

export function HorizontalScroller({
  children,
  desktopGridClassName,
  className = "",
}: HorizontalScrollerProps) {
  const scrollRef = useDragScroll<HTMLDivElement>();

  return (
    <div
      ref={scrollRef}
      className={`-mx-6 flex snap-x snap-proximity scroll-px-6 gap-4 overflow-x-auto px-6 pb-4 select-none cursor-grab active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:cursor-auto md:select-auto md:overflow-visible md:px-0 md:pb-0 ${desktopGridClassName} ${className}`}
    >
      {children}
    </div>
  );
}
