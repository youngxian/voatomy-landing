"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, Pause } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import {
  FynkDisplayHeading,
  FynkHeadingUnderlineAccent,
  FynkRatingBadge,
  FynkReveal,
} from "@/components/marketing/fynk-primitives";
import { useDictionary, useLocale } from "@/i18n/locale-provider";

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=transparent`;
}

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useDictionary().customers;
  const { localizedPath } = useLocale();

  const featured = TESTIMONIALS.slice(0, Math.min(TESTIMONIALS.length, 4));
  const [active, setActive] = React.useState(0);
  const current = featured[active];

  const next = () => setActive((i) => (i + 1) % featured.length);
  const prev = () => setActive((i) => (i - 1 + featured.length) % featured.length);

  return (
    <section className="light-surface-typography relative overflow-hidden bg-fynk-surface-alt px-4 py-12 sm:py-20 lg:py-28">
      <div ref={ref} className="relative mx-auto max-w-container">
        <FynkReveal visible={isVisible} className="text-center">
          <FynkDisplayHeading align="center">
            {t.resultsTitleLead}
            <br />
            <FynkHeadingUnderlineAccent variant="rose">{t.resultsTitleAccent}</FynkHeadingUnderlineAccent>
          </FynkDisplayHeading>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-fynk-muted sm:mt-4 sm:text-body-lg">{t.resultsSubtitle}</p>
        </FynkReveal>

        {/* Browse customer stories pill button */}
        <div className="mt-5 flex justify-center sm:mt-7">
          <Link
            href={localizedPath("/customers")}
            className="group inline-flex items-center gap-2 rounded-full border border-fynk-border bg-white px-4 py-2 text-xs font-semibold text-fynk-ink shadow-sm transition-all hover:border-fynk-border-hover hover:bg-fynk-surface-alt sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Browse all customer stories
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Stats row with soft gradient blur behind */}
        <div className="relative mt-8 sm:mt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(240,90,40,0.25), transparent), radial-gradient(closest-side at 80% 50%, rgba(59,130,246,0.22), transparent)",
            }}
          />
          <dl className="relative grid grid-cols-3 gap-3 sm:gap-6">
            {t.stats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-[clamp(1.5rem,5vw,3.25rem)] font-semibold leading-none tracking-[-0.04em] text-fynk-ink">
                  {s.value}
                </dd>
                <p className="mt-2 text-xs text-fynk-muted sm:text-sm">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>

        {/* Stacked testimonial card — front + 2 ghost cards behind */}
        <div className="relative mx-auto mt-8 max-w-3xl sm:mt-12 md:mt-16">
          {/* Ghost stack underneath */}
          <div
            aria-hidden
            className="absolute inset-x-6 -bottom-3 h-full rounded-3xl border border-fynk-border bg-white opacity-60 shadow-sm"
          />
          <div
            aria-hidden
            className="absolute inset-x-12 -bottom-6 h-full rounded-3xl border border-fynk-border bg-white opacity-30 shadow-sm"
          />

          {/* Active card */}
          <figure
            key={current.author}
            className={cn(
              "relative rounded-2xl border border-fynk-border bg-white p-5 shadow-md transition-all duration-500 sm:rounded-3xl sm:p-8 md:p-12",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            <span
              aria-hidden
              className="absolute left-4 top-4 select-none text-5xl font-serif leading-none text-rose-400 sm:left-8 sm:top-8 sm:text-7xl"
              style={{ fontFamily: "Georgia, serif" }}
            >
              &ldquo;
            </span>
            <blockquote className="relative pl-10 text-sm leading-relaxed text-fynk-ink sm:pl-14 sm:text-lg md:text-xl md:leading-snug">
              {current.text}
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 sm:mt-10 sm:gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl(current.author)}
                alt=""
                width={48}
                height={48}
                className="h-10 w-10 shrink-0 rounded-full bg-fynk-surface-alt ring-2 ring-white sm:h-12 sm:w-12"
                loading="lazy"
              />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-fynk-ink">
                  {current.author}
                </p>
                <p className="text-sm text-fynk-muted sm:text-base">{current.role}</p>
              </div>
            </figcaption>
          </figure>
        </div>

        {/* Carousel controls */}
        <div className="mx-auto mt-6 flex max-w-3xl items-center justify-center gap-2 sm:mt-10">
          <button
            type="button"
            onClick={prev}
            className="grid h-9 w-9 place-items-center rounded-full border border-fynk-border bg-white text-fynk-muted shadow-sm transition-all hover:bg-fynk-surface-alt hover:text-fynk-ink"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="mx-2 flex items-center gap-1.5 rounded-full border border-fynk-border bg-white px-3 py-2 shadow-sm">
            <Pause className="h-3 w-3 text-fynk-muted" />
            {featured.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  active === i ? "w-6 bg-fynk-ink" : "w-1.5 bg-fynk-border-hover",
                )}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="grid h-9 w-9 place-items-center rounded-full border border-fynk-border bg-white text-fynk-muted shadow-sm transition-all hover:bg-fynk-surface-alt hover:text-fynk-ink"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Rating chips at bottom */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
          <FynkRatingBadge score={t.g2Rating} label={t.g2Label} />
          <FynkRatingBadge score={t.betaRating} label={t.betaLabel} />
        </div>
      </div>
    </section>
  );
}
