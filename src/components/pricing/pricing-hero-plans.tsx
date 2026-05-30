"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import { FynkRibbonBackdrop, FynkSubheading } from "@/components/marketing/fynk-primitives";
import { PRICING_HERO } from "@/lib/pricing-page-data";
import { PricingTierDoodle } from "@/components/pricing/pricing-tier-doodles";

export interface PricingTierUI {
  name: string;
  slug: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  description: string;
  bestFor: string;
  features: string[];
  cta: string;
  ctaHref: string;
  popular: boolean;
}

function HandwrittenSaveBadge({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "inline-block translate-y-0.5 rotate-[-2deg] font-handwriting text-[1.125rem] font-bold leading-none transition-opacity",
        active ? "text-[#2563EB]" : "text-[#2563EB]/65",
      )}
    >
      (SAVE 20%)
    </span>
  );
}

/** Hand-drawn note + arrow pointing at the Most popular* bar — Fynk pattern */
function HotcakesAnnotation() {
  return (
    <div
      className="pointer-events-none absolute -top-[6.25rem] left-1/2 z-20 hidden w-[240px] -translate-x-[42%] lg:block"
      aria-hidden
    >
      <p
        className="font-handwriting text-center text-[1.375rem] font-bold leading-[1.2] tracking-[0.01em] text-[#3D3D3D] rotate-[-4deg] sm:text-[1.5rem]"
      >
        <span className="block">&ldquo;*Selling like hotcakes,</span>
        <span className="block">as we would say in Austria&rdquo;</span>
      </p>
      <svg
        viewBox="0 0 110 56"
        className="ml-auto mr-4 mt-1 h-[56px] w-[110px] text-[#3D3D3D] rotate-[2deg]"
        fill="none"
      >
        <path
          d="M72 6 C80 22 68 38 52 50"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M52 50 L58 44 M52 50 L46 46"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function BillingToggle({
  annual,
  setAnnual,
}: {
  annual: boolean;
  setAnnual: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="inline-flex items-center rounded-full border border-fynk-border bg-[#F3F4F6] p-1">
        <button
          type="button"
          onClick={() => setAnnual(false)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold transition-all",
            !annual ? "bg-white text-fynk-ink shadow-sm" : "text-fynk-muted hover:text-fynk-ink",
          )}
        >
          Pay monthly
        </button>
        <button
          type="button"
          onClick={() => setAnnual(true)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold transition-all",
            annual ? "bg-white text-fynk-ink shadow-sm" : "text-fynk-muted hover:text-fynk-ink",
          )}
        >
          Pay yearly
        </button>
      </div>
      <HandwrittenSaveBadge active={annual} />
    </div>
  );
}

function PlanCard({
  tier,
  annual,
  isDashboard,
}: {
  tier: PricingTierUI;
  annual: boolean;
  isDashboard: boolean;
}) {
  const formatPrice = () => {
    if (tier.monthlyPrice === null) return "Custom";
    if (tier.monthlyPrice === 0) return "$0";
    return `$${annual ? tier.annualPrice : tier.monthlyPrice}`;
  };

  const showUnit = tier.monthlyPrice !== null && tier.monthlyPrice > 0;
  const prevTier =
    tier.name === "Pro"
      ? "Starter"
      : tier.name === "Business"
        ? "Pro"
        : tier.name === "Enterprise"
          ? "Business"
          : null;

  const cta =
    isDashboard && tier.slug === "starter" ? (
      <button
        type="button"
        disabled
        className="inline-flex h-11 w-full cursor-default items-center justify-center rounded-full border border-fynk-ink/20 bg-fynk-surface-alt text-sm font-semibold text-fynk-muted"
      >
        Current plan
      </button>
    ) : tier.popular ? (
      <Link
        href={tier.ctaHref}
        className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-fynk-ink text-sm font-semibold text-white transition-colors hover:bg-fynk-ink/90"
      >
        {tier.cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    ) : (
      <Link
        href={tier.ctaHref}
        className="inline-flex h-11 w-full items-center justify-center rounded-full border border-fynk-ink bg-white text-sm font-semibold text-fynk-ink transition-colors hover:bg-fynk-surface-alt"
      >
        {tier.cta}
      </Link>
    );

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
        tier.popular ? "border-fynk-ink border-2" : "border-fynk-border",
      )}
    >
      {tier.popular && (
        <div className="bg-fynk-ink px-3 py-2 text-center">
          <span className="font-handwriting text-xs font-bold uppercase tracking-wide text-white">
            Most popular*
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Header row: title left, icon top-right */}
        <div className="relative pr-[52px]">
          <h3 className="font-heading text-xl font-bold tracking-tight text-fynk-ink">{tier.name}</h3>
          <div className="absolute right-0 top-0">
            <PricingTierDoodle tierName={tier.name} className="h-11 w-12" />
          </div>
        </div>

        {/* Price block */}
        <div className="mt-5">
          <div className="flex flex-wrap items-baseline gap-x-1.5">
            <span className="font-heading text-[2.5rem] font-bold leading-none tracking-[-0.03em] text-fynk-ink">
              {formatPrice()}
            </span>
            {showUnit && (
              <span className="text-sm text-fynk-muted">per user / month</span>
            )}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-fynk-muted">{tier.description}</p>
        </div>

        <div className="mt-6">{cta}</div>

        {/* Features — pinned to bottom for equal card balance */}
        <div className="mt-8 flex flex-1 flex-col border-t border-fynk-border/80 pt-6">
          <p className="text-sm text-fynk-muted">
            {tier.name === "Starter"
              ? "Includes:"
              : prevTier
                ? `Everything in ${prevTier}, plus:`
                : "Includes:"}
          </p>
          <ul className="mt-3 space-y-2.5">
            {tier.features.slice(0, 7).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm leading-snug text-fynk-body">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-fynk-muted" strokeWidth={2.5} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function PricingHeroAndPlans({
  tiers,
  annual,
  setAnnual,
  isDashboard,
}: {
  tiers: PricingTierUI[];
  annual: boolean;
  setAnnual: (v: boolean) => void;
  isDashboard: boolean;
}) {
  return (
    <>
      {/* Hero — headline only */}
      <section className="relative overflow-hidden bg-white px-4 pb-10 pt-24 sm:pb-12 sm:pt-32">
        <FynkRibbonBackdrop className="opacity-60" />
        <div className="relative z-[2] mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.045em] text-fynk-ink sm:text-[3.5rem] sm:leading-[1.02]">
            {PRICING_HERO.title}
          </h1>
          <FynkSubheading className="mt-6 max-w-xl text-body-lg sm:text-body-xl">
            {PRICING_HERO.subtitle}
          </FynkSubheading>
        </div>
      </section>

      {/* Plans — toggle left-aligned, cards in balanced grid */}
      <section className="relative bg-white px-4 pb-20 sm:pb-28">
        <div className="mx-auto max-w-container">
          <div className="mb-8">
            <BillingToggle annual={annual} setAnnual={setAnnual} />
          </div>

          <div
            className={cn(
              "grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6",
              tiers.some((t) => t.popular) && "lg:pt-[4.5rem]",
            )}
          >
            {tiers.map((tier) => (
              <div key={tier.slug} className={cn("relative", tier.popular && "lg:pt-0")}>
                {tier.popular && <HotcakesAnnotation />}
                <PlanCard tier={tier} annual={annual} isDashboard={isDashboard} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
