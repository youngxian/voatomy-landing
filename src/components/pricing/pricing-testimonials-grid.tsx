"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { FynkHeading } from "@/components/marketing/fynk-primitives";
import { PRICING_TESTIMONIALS, PRICING_SECTIONS } from "@/lib/pricing-page-data";
import { Star } from "lucide-react";

function renderQuote(quote: string, highlightColor: string) {
  const parts = quote.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark
        key={i}
        className="rounded px-0.5 font-semibold text-fynk-ink"
        style={{ backgroundColor: highlightColor }}
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export function PricingTestimonialsGrid() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-white px-4 py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-container">
        <div
          className={cn(
            "text-center transition-all duration-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <span className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-100 text-3xl">
            💙
          </span>
          <FynkHeading className="text-heading-1 sm:text-display-3">
            {PRICING_SECTIONS.testimonialsTitle}
          </FynkHeading>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PRICING_TESTIMONIALS.map((t, i) => (
            <figure
              key={t.author}
              className={cn(
                "flex min-h-[280px] flex-col rounded-[1.75rem] p-8 transition-all duration-500 sm:min-h-[300px] sm:p-9",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{
                backgroundColor: t.bg,
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-body-lg font-bold text-fynk-ink">{t.rating}</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <blockquote className="mt-5 flex-1 text-body-lg leading-relaxed text-fynk-ink sm:text-body-xl">
                {renderQuote(t.quote, t.highlight)}
              </blockquote>
              <figcaption className="mt-8 border-t border-black/5 pt-5">
                <p className="text-body-base font-bold text-fynk-ink">{t.author}</p>
                <p className="text-body-base text-fynk-muted">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
