"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site.config";
import { useLanguage } from "@/hooks/useLanguage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  const { t } = useLanguage();
  const faq = siteConfig.faq;

  if (!faq) return null;

  return (
    <Section id="faq">
      <SectionHeading title={faq.title} subtitle={faq.subtitle} />
      <div className="mx-auto mt-8 max-w-2xl space-y-3">
        {faq.items.map((item, index) => (
          <Reveal key={item.question.es} delay={index * 0.04}>
            <FaqAccordion question={t(item.question)} answer={t(item.answer)} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function FaqAccordion({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-foreground/10 transition-colors hover:border-primary/30">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-heading text-base font-semibold text-foreground">
          {question}
        </span>
        <span
          aria-hidden
          className={`shrink-0 text-lg text-foreground/50 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm leading-relaxed text-foreground/70">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
