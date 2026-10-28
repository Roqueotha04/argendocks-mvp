import type { ReactNode } from "react";

interface CarouselProps {
  children: ReactNode;
  className?: string;
}

export function Carousel({ children, className = "" }: CarouselProps) {
  return (
    <div
      className={`-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-4 md:-mx-8 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {children}
    </div>
  );
}
