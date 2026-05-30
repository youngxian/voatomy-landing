"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { JsonLd, faqPageJsonLd } from "@/components/json-ld";
import { usePricing } from "@/hooks/use-pricing";
import {
  FynkButtonPrimary,
  FynkButtonSecondary,
  FynkEyebrow,
  FynkHeading,
} from "@/components/marketing/fynk-primitives";
import { PricingHeroAndPlans, type PricingTierUI } from "@/components/pricing/pricing-hero-plans";
import { PricingValueSection } from "@/components/pricing/pricing-value-section";
import { PricingBeforeAfter } from "@/components/pricing/pricing-before-after";
import { PricingTestimonialsGrid } from "@/components/pricing/pricing-testimonials-grid";
import { PricingImpactSection } from "@/components/pricing/pricing-impact-section";
import { PricingFeaturedQuote } from "@/components/pricing/pricing-featured-quote";
import { PricingComparisonTable } from "@/components/pricing/pricing-comparison-table";
import { PricingFAQSection } from "@/components/pricing/pricing-faq-section";
import { PRICING_FAQS, PRICING_SECTIONS } from "@/lib/pricing-page-data";
import { useSession } from "@/hooks/use-session";
import { useSubscription, planRank } from "@/hooks/use-subscription";
import { useLocale } from "@/i18n/locale-provider";

const TIER_SLUGS: Record<string, string> = {
  Starter: "starter",
  Pro: "pro",
  Business: "business",
  Enterprise: "enterprise",
};

function getTierCta(
  slug: string,
  isLoggedIn: boolean,
  currentPlan: string | null,   // null = no active subscription
  localizedPath: (p: string) => string,
  dashboardUrl: string,
): { cta: string; ctaHref: string; disabled?: boolean } {
  // Enterprise always goes to contact
  if (slug === "enterprise") {
    return { cta: "Contact us", ctaHref: localizedPath("/contact?plan=enterprise") };
  }

  // Not logged in → signup
  if (!isLoggedIn) {
    const href = slug === "starter" ? "/auth/signup" : `/auth/signup?plan=${slug}&trial=true`;
    return { cta: "Sign up free", ctaHref: href };
  }

  // Logged in, no active subscription → send to checkout (starter is free so goes to dashboard)
  if (!currentPlan) {
    if (slug === "starter") {
      return { cta: "Get started", ctaHref: dashboardUrl };
    }
    return {
      cta: "Get started",
      ctaHref: localizedPath(`/pricing/checkout?plan=${slug}`),
    };
  }

  // Logged in, has a plan
  const currentRank = planRank(currentPlan);
  const tierRank = planRank(slug);

  if (slug === currentPlan) {
    return { cta: "Current plan", ctaHref: dashboardUrl, disabled: true };
  }

  if (tierRank > currentRank) {
    return {
      cta: "Upgrade",
      ctaHref: localizedPath(`/pricing/checkout?plan=${slug}`),
    };
  }

  // Downgrade — send to dashboard/billing settings
  return { cta: "Downgrade", ctaHref: dashboardUrl };
}

function buildTierUI(
  tiers: ReturnType<typeof usePricing>["tiers"],
  isLoggedIn: boolean,
  currentPlan: string | null,
  localizedPath: (p: string) => string,
  dashboardUrl: string,
): PricingTierUI[] {
  return tiers.map((tier) => {
    const slug = TIER_SLUGS[tier.name] ?? tier.name.toLowerCase();
    const isEnterprise = tier.monthlyPrice < 0;
    const { cta, ctaHref } = getTierCta(slug, isLoggedIn, currentPlan, localizedPath, dashboardUrl);
    return {
      name: tier.name,
      slug,
      monthlyPrice: isEnterprise ? null : tier.monthlyPrice,
      annualPrice: isEnterprise ? null : tier.annualPrice,
      description: tier.description,
      bestFor: tier.bestFor,
      features: tier.features.map((f) => f.text),
      cta,
      ctaHref,
      popular: tier.popular,
    };
  });
}

export default function PricingPage() {
  const searchParams = useSearchParams();
  const isDashboard = searchParams.get("source") === "dashboard";
  const returnUrl = searchParams.get("return") || "/";

  const { isLoggedIn, dashboardUrl } = useSession();
  const { localizedPath } = useLocale();
  const subscriptionState = useSubscription(isLoggedIn);

  // Derive the current active plan slug (null if no active/trialing subscription)
  const currentPlan = React.useMemo(() => {
    if (subscriptionState.status !== "loaded") return null;
    const { subscription } = subscriptionState;
    if (subscription.status === "active" || subscription.status === "trialing") {
      return subscription.plan;
    }
    return null;
  }, [subscriptionState]);

  const { tiers: rawTiers } = usePricing();
  const tiers = React.useMemo(
    () => buildTierUI(rawTiers, isLoggedIn, currentPlan, localizedPath, dashboardUrl),
    [rawTiers, isLoggedIn, currentPlan, localizedPath, dashboardUrl],
  );

  const [annual, setAnnual] = React.useState(true);

  return (
    <div className="relative overflow-hidden bg-white text-fynk-ink">
      <JsonLd data={faqPageJsonLd([...PRICING_FAQS])} />

      {isDashboard && (
        <>
          <Link
            href={returnUrl}
            className="fixed left-4 top-4 z-50 inline-flex items-center gap-1.5 rounded-full border border-fynk-border bg-white px-4 py-2 text-sm font-medium text-fynk-ink shadow-lg backdrop-blur transition-all hover:bg-fynk-surface-alt sm:left-6 sm:top-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
          <Link
            href={returnUrl}
            className="fixed right-4 top-4 z-50 grid h-10 w-10 place-items-center rounded-full border border-fynk-border bg-white text-fynk-muted shadow-lg transition-all hover:bg-fynk-surface-alt hover:text-fynk-ink sm:right-6 sm:top-6"
            aria-label="Close and return to dashboard"
          >
            <X className="h-4 w-4" />
          </Link>
        </>
      )}

      <PricingHeroAndPlans
        tiers={tiers}
        annual={annual}
        setAnnual={setAnnual}
        isDashboard={isDashboard}
      />

      <PricingValueSection />
      <PricingBeforeAfter />
      <PricingTestimonialsGrid />
      <PricingImpactSection />
      <PricingFeaturedQuote />
      <PricingComparisonTable tiers={tiers} annual={annual} />
      <PricingFAQSection />

      {/* Final CTA */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-fynk-orange-light via-white to-brand-50"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-fynk-orange/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
        />

        <div className="relative z-[1] mx-auto max-w-2xl text-center">
          <FynkEyebrow className="text-brand">{PRICING_SECTIONS.ctaEyebrow}</FynkEyebrow>
          <FynkHeading as="h2" className="mt-4 text-heading-2 sm:text-heading-1">
            {PRICING_SECTIONS.ctaTitle}{" "}
            <span className="text-fynk-orange">{PRICING_SECTIONS.ctaTitleAccent}</span>
          </FynkHeading>
          <p className="mt-4 text-body-sm text-fynk-muted sm:text-body-base">
            {PRICING_SECTIONS.ctaSubtitle}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <FynkButtonPrimary href={localizedPath("/contact")} variant="orange">
              {PRICING_SECTIONS.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </FynkButtonPrimary>
            {!isLoggedIn && (
              <FynkButtonSecondary href="/auth/signup">
                {PRICING_SECTIONS.ctaSecondary}
              </FynkButtonSecondary>
            )}
            {isLoggedIn && !currentPlan && (
              <FynkButtonSecondary href={localizedPath("/pricing/checkout?plan=pro")}>
                Get started
              </FynkButtonSecondary>
            )}
            {isLoggedIn && currentPlan && (
              <FynkButtonSecondary href={dashboardUrl}>
                Go to dashboard
              </FynkButtonSecondary>
            )}
          </div>
          <p className="mt-5 text-body-sm text-fynk-muted">
            {PRICING_SECTIONS.ctaFootnote}
          </p>
        </div>
      </section>
    </div>
  );
}
