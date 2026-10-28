"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Gallery() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const gallery = siteConfig.gallery;

  useEffect(() => {
    if (lightboxIndex !== null) {
      dialogRef.current?.focus();
    }
  }, [lightboxIndex]);

  if (!gallery) return null;

  return (
    <Section id="gallery">
      <SectionHeading title={gallery.title} subtitle={gallery.subtitle} />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
        {gallery.images.map((image, index) => (
          <Reveal key={image.src} delay={index * 0.03}>
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-accent"
            >
              <Image
                src={image.src}
                alt={t(image.alt)}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 300px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          </Reveal>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal
          tabIndex={0}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm outline-none"
          onClick={() => setLightboxIndex(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setLightboxIndex(null);
            if (e.key === "ArrowRight") setLightboxIndex((i) => (i !== null && i < gallery.images.length - 1 ? i + 1 : i));
            if (e.key === "ArrowLeft") setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
          }}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-white/20"
          >
            ✕
          </button>

          {lightboxIndex > 0 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
              aria-label="Previous"
              className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-white/20"
            >
              ‹
            </button>
          )}

          <div className="relative max-h-[80vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={gallery.images[lightboxIndex].src}
              alt={t(gallery.images[lightboxIndex].alt)}
              width={1200}
              height={800}
              className="max-h-[80vh] w-auto rounded-xl object-contain"
            />
          </div>

          {lightboxIndex < gallery.images.length - 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
              aria-label="Next"
              className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-white/20"
            >
              ›
            </button>
          )}
        </div>
      )}
    </Section>
  );
}
