"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { FynkHeading, FynkSubheading } from "@/components/marketing/fynk-primitives";
import { PRICING_IMPACT_CARDS, PRICING_SECTIONS } from "@/lib/pricing-page-data";
import { ArrowUpRight, TrendingUp } from "lucide-react";

export function PricingImpactSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-fynk-surface-alt px-4 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-container">
        <div
          className={cn(
            "mx-auto max-w-3xl text-center transition-all duration-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <span className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100">
            <TrendingUp className="h-8 w-8 text-emerald-600" />
          </span>
          <FynkHeading className="text-heading-1 sm:text-display-3">
            {PRICING_SECTIONS.impactTitle}
          </FynkHeading>
          <FynkSubheading className="mt-5 text-body-xl">
            {PRICING_SECTIONS.impactSubtitle}
          </FynkSubheading>
        </div>

        <div className="mt-14 flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {PRICING_IMPACT_CARDS.map((card, i) => (
            <article
              key={card.dept}
              className={cn(
                "relative flex h-[260px] w-[240px] shrink-0 snap-start flex-col justify-between rounded-[1.75rem] p-8 text-white transition-all duration-500 sm:h-[280px] sm:w-[260px]",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{
                backgroundColor: card.color,
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/85">
                  {card.dept}
                </span>
                <ArrowUpRight className="h-6 w-6 text-white/75" />
              </div>
              <div>
                <p className="font-heading text-[3rem] font-bold leading-none tracking-tight sm:text-[3.25rem]">
                  {card.stat}
                </p>
                <p className="mt-3 text-body-lg leading-snug text-white/90">{card.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
