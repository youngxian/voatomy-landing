"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { PRICING_FEATURED_QUOTE } from "@/lib/pricing-page-data";

export function PricingFeaturedQuote() {
  const { ref, isVisible } = useScrollAnimation();
  const q = PRICING_FEATURED_QUOTE;
  const [before, after] = q.quote.split(q.highlight);

  return (
    <section className="bg-white px-4 py-24 sm:py-32">
      <figure
        ref={ref}
        className={cn(
          "mx-auto max-w-5xl transition-all duration-700",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <span
          aria-hidden
          className="mb-6 block text-5xl font-serif leading-none text-amber-400 sm:text-6xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          &ldquo;
        </span>
        <blockquote className="mx-auto max-w-4xl text-center font-heading text-body-lg leading-relaxed text-fynk-ink sm:text-body-xl md:text-heading-3 md:leading-snug">
          {before}
          <mark className="rounded-sm bg-amber-100 px-1.5 font-semibold not-italic">{q.highlight}</mark>
          {after}
        </blockquote>

        <figcaption className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-fynk-border bg-fynk-surface-alt">
            <span className="text-body-base font-bold uppercase tracking-wider text-fynk-muted">
              {q.company.slice(0, 2)}
            </span>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-body-lg font-bold text-fynk-ink">{q.author}</p>
            <p className="text-body-base text-fynk-muted">{q.role}</p>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
