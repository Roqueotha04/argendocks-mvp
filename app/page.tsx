import type { ComponentType } from "react";
import { siteConfig } from "@/config/site.config";
import type { SectionId } from "@/config/site.types";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Hero } from "@/components/sections/Hero";
import { Offerings } from "@/components/sections/Offerings";
import { OfferingsCarousel } from "@/components/sections/OfferingsCarousel";
import { AboutSplit } from "@/components/sections/AboutSplit";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { ContactCentered } from "@/components/sections/ContactCentered";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { FAQ } from "@/components/sections/FAQ";

const variants = siteConfig.variants;

const sectionComponents: Record<SectionId, ComponentType> = {
  hero: Hero,
  offerings: (variants?.offerings ?? "grid") === "carousel" ? OfferingsCarousel : Offerings,
  about: (variants?.about ?? "split") === "simple" ? About : AboutSplit,
  contact: (variants?.contact ?? "full") === "centered" ? ContactCentered : Contact,
  testimonials: Testimonials,
  gallery: Gallery,
  faq: FAQ,
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {siteConfig.sections.map((id) => {
          const SectionComponent = sectionComponents[id];
          return <SectionComponent key={id} />;
        })}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
