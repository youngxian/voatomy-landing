"use client";

import * as React from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useDictionary } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";
import {
  FynkDisplayHeading,
  FynkGradientBackdrop,
  FynkHeadingUnderlineAccent,
  FynkReveal,
  FynkSubheading,
} from "@/components/marketing/fynk-primitives";
import { BenefitIllustration } from "@/components/marketing/landing-illustrations";

export function BenefitsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useDictionary().why;

  return (
    <section className="light-surface-typography relative overflow-hidden bg-white px-4 py-12 sm:py-20 lg:py-28">
      <FynkGradientBackdrop intensity="soft" />

      <div ref={ref} className="relative z-[1] mx-auto max-w-container">
        <FynkReveal visible={isVisible} className="mx-auto max-w-3xl text-center lg:max-w-4xl">
          <FynkDisplayHeading align="center" className="max-w-4xl">
            {t.titleLine1}
            <br />
            <FynkHeadingUnderlineAccent>{t.titleLine2}</FynkHeadingUnderlineAccent>
          </FynkDisplayHeading>
          <FynkSubheading className="mt-4 sm:mt-5">{t.subtitle}</FynkSubheading>
        </FynkReveal>

        <ul className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {t.items.map((item, i) => (
            <li
              key={item.title}
              className={cn(
                "transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <article className="group flex h-full flex-col rounded-2xl border border-fynk-border bg-fynk-surface-alt p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:rounded-3xl sm:p-6">
                {/* Visual mock area */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-fynk-border sm:rounded-2xl">
                  <BenefitIllustration index={i} />
                </div>

                <div className="mt-4 px-0.5 pb-0.5 sm:mt-6 sm:px-1 sm:pb-1">
                  <h3 className="text-base font-bold text-fynk-ink sm:text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fynk-muted sm:mt-2.5 sm:text-base">{item.desc}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
