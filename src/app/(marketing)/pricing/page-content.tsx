"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  Shield,
  Lock,
  Eye,
  Zap,
  Building2,
  Rocket,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  HelpCircle,
  Minus,
  X,
} from "lucide-react";
import { JsonLd, faqPageJsonLd } from "@/components/json-ld";
import { usePricing } from "@/hooks/use-pricing";

/* ------------------------------------------------------------------ */
/*  Product color map                                                  */
/* ------------------------------------------------------------------ */

const PRODUCT_COLORS = {
  ATLAS: "#f16e2c",
  LOOP: "#6366F1",
  PHANTOM: "#22D3EE",
  SIGNAL: "#EF4444",
  DRIFT: "#8B5CF6",
  NEXUS: "#10B981",
} as const;

/* ------------------------------------------------------------------ */
/*  Tier UI enrichment (icons, CTAs, slugs)                            */
/* ------------------------------------------------------------------ */

interface PricingTierUI {
  name: string;
  slug: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  description: string;
  bestFor: string;
  features: string[];
  cta: string;
  ctaHref: string;
  ctaVariant: "primary" | "secondary" | "dark";
  popular: boolean;
  icon: React.ReactNode;
}

const TIER_UI: Record<string, { slug: string; icon: React.ReactNode; cta: string; ctaHref: string; ctaVariant: "primary" | "secondary" | "dark" }> = {
  Starter: { slug: "starter", icon: <Rocket className="h-5 w-5" />, cta: "Start Free", ctaHref: "/auth/signup", ctaVariant: "secondary" },
  Pro:     { slug: "pro",     icon: <Zap className="h-5 w-5" />,    cta: "Start Free Trial", ctaHref: "/auth/signup?plan=pro&trial=true", ctaVariant: "primary" },
  Business:{ slug: "business", icon: <Building2 className="h-5 w-5" />, cta: "Start Free Trial", ctaHref: "/auth/signup?plan=business&trial=true", ctaVariant: "secondary" },
  Enterprise:{ slug: "enterprise", icon: <Shield className="h-5 w-5" />, cta: "Talk to Sales", ctaHref: "/contact?plan=enterprise", ctaVariant: "dark" },
};

function buildTierUI(tiers: ReturnType<typeof usePricing>["tiers"]): PricingTierUI[] {
  return tiers.map((tier) => {
    const ui = TIER_UI[tier.name] ?? { slug: tier.name.toLowerCase(), icon: null, cta: tier.cta, ctaHref: "#", ctaVariant: "secondary" as const };
    const isEnterprise = tier.monthlyPrice < 0;
    return {
      name: tier.name,
      slug: ui.slug,
      monthlyPrice: isEnterprise ? null : tier.monthlyPrice,
      annualPrice: isEnterprise ? null : tier.annualPrice,
      description: tier.description,
      bestFor: tier.bestFor,
      features: tier.features.map((f) => f.text),
      cta: ui.cta,
      ctaHref: ui.ctaHref,
      ctaVariant: ui.ctaVariant,
      popular: tier.popular,
      icon: ui.icon,
    };
  });
}

/* ------------------------------------------------------------------ */
/*  Add-on products                                                    */
/* ------------------------------------------------------------------ */

interface AddOn {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  note: string;
  color: string;
}

const ADD_ONS: AddOn[] = [
  {
    name: "ATLAS",
    tagline: "AI Sprint Planner",
    price: "Included",
    unit: "",
    note: "Included in all plans",
    color: PRODUCT_COLORS.ATLAS,
  },
  {
    name: "LOOP",
    tagline: "Revenue Feedback Engine",
    price: "$39",
    unit: "/user/mo",
    note: "Included in Business+",
    color: PRODUCT_COLORS.LOOP,
  },
  {
    name: "PHANTOM",
    tagline: "Tech Debt Radar",
    price: "$12",
    unit: "/dev/mo",
    note: "Basic included in Pro+",
    color: PRODUCT_COLORS.PHANTOM,
  },
  {
    name: "SIGNAL",
    tagline: "Incident Intelligence",
    price: "$15",
    unit: "/seat/mo",
    note: "Basic included in Business+",
    color: PRODUCT_COLORS.SIGNAL,
  },
  {
    name: "DRIFT",
    tagline: "Design System Sync",
    price: "$19",
    unit: "/user/mo",
    note: "Basic included in Pro+",
    color: PRODUCT_COLORS.DRIFT,
  },
];

/* ------------------------------------------------------------------ */
/*  Feature comparison data                                            */
/* ------------------------------------------------------------------ */

type FeatureValue = boolean | string;

interface FeatureRow {
  feature: string;
  starter: FeatureValue;
  pro: FeatureValue;
  business: FeatureValue;
  enterprise: FeatureValue;
}

interface FeatureGroup {
  group: string;
  color: string;
  rows: FeatureRow[];
}

const FEATURE_GROUPS: FeatureGroup[] = [
  {
    group: "Sprint Planning (ATLAS)",
    color: PRODUCT_COLORS.ATLAS,
    rows: [
      { feature: "AI sprint plan generation", starter: "2/month", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
      { feature: "Teams & repos", starter: "1 each", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" },
      { feature: "Code complexity analysis", starter: true, pro: true, business: true, enterprise: true },
      { feature: "Accuracy tracking", starter: "Basic", pro: "Advanced", business: "Advanced", enterprise: "Custom" },
      { feature: "Team capacity modeling", starter: false, pro: true, business: true, enterprise: true },
      { feature: "Sprint retrospective AI", starter: false, pro: true, business: true, enterprise: true },
    ],
  },
  {
    group: "Revenue Intelligence (LOOP)",
    color: PRODUCT_COLORS.LOOP,
    rows: [
      { feature: "Revenue feedback engine", starter: false, pro: false, business: true, enterprise: true },
      { feature: "Revenue-weighted backlog", starter: false, pro: false, business: true, enterprise: true },
      { feature: "Customer demand signals", starter: false, pro: "Basic", business: "Full", enterprise: "Full" },
      { feature: "Sales brief generation", starter: false, pro: false, business: true, enterprise: true },
      { feature: "Churn risk scoring", starter: false, pro: false, business: true, enterprise: true },
    ],
  },
  {
    group: "Tech Debt (PHANTOM)",
    color: PRODUCT_COLORS.PHANTOM,
    rows: [
      { feature: "Tech debt scanning", starter: false, pro: "Basic", business: "Full", enterprise: "Full" },
      { feature: "Dollar-impact estimates", starter: false, pro: false, business: true, enterprise: true },
      { feature: "Executive debt dashboard", starter: false, pro: false, business: true, enterprise: true },
      { feature: "Remediation planning", starter: false, pro: false, business: true, enterprise: true },
    ],
  },
  {
    group: "Incident Management (SIGNAL)",
    color: PRODUCT_COLORS.SIGNAL,
    rows: [
      { feature: "Incident intelligence", starter: false, pro: false, business: "Basic", enterprise: "Full" },
      { feature: "Revenue impact per incident", starter: false, pro: false, business: true, enterprise: true },
      { feature: "Intelligent routing", starter: false, pro: false, business: false, enterprise: true },
      { feature: "Post-incident analysis AI", starter: false, pro: false, business: false, enterprise: true },
    ],
  },
  {
    group: "Design System (DRIFT)",
    color: PRODUCT_COLORS.DRIFT,
    rows: [
      { feature: "Design token sync", starter: false, pro: "Basic", business: "Full", enterprise: "Full" },
      { feature: "Figma-to-code drift detection", starter: false, pro: true, business: true, enterprise: true },
      { feature: "Revenue-aware design suggestions", starter: false, pro: false, business: true, enterprise: true },
      { feature: "Component usage analytics", starter: false, pro: false, business: true, enterprise: true },
    ],
  },
  {
    group: "Platform (NEXUS)",
    color: PRODUCT_COLORS.NEXUS,
    rows: [
      { feature: "Cross-team dependencies", starter: false, pro: false, business: true, enterprise: true },
      { feature: "Multi-team dashboards", starter: false, pro: false, business: true, enterprise: true },
      { feature: "Full NEXUS nerve center", starter: false, pro: false, business: false, enterprise: true },
      { feature: "Custom integrations & API", starter: false, pro: false, business: false, enterprise: true },
    ],
  },
  {
    group: "Security & Compliance",
    color: "#94A3B8",
    rows: [
      { feature: "TLS 1.3 + AES-256 encryption", starter: true, pro: true, business: true, enterprise: true },
      { feature: "SSO / SAML / SCIM", starter: false, pro: false, business: false, enterprise: true },
      { feature: "RBAC & audit logs", starter: false, pro: false, business: "Basic", enterprise: "Full" },
      { feature: "SOC 2 compliance package", starter: false, pro: false, business: false, enterprise: true },
      { feature: "VPC deployment", starter: false, pro: false, business: false, enterprise: true },
    ],
  },
  {
    group: "Support",
    color: "#12FF80",
    rows: [
      { feature: "Community (Discord)", starter: true, pro: true, business: true, enterprise: true },
      { feature: "Email support", starter: false, pro: true, business: true, enterprise: true },
      { feature: "Priority support", starter: false, pro: false, business: true, enterprise: true },
      { feature: "Dedicated Slack channel", starter: false, pro: false, business: true, enterprise: true },
      { feature: "Dedicated CSM & SLA", starter: false, pro: false, business: false, enterprise: true },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Can I start with one product and add more later?",
    answer:
      "Absolutely. Most teams start with ATLAS for sprint planning and expand as they grow. You can add LOOP, PHANTOM, SIGNAL, or DRIFT as individual add-ons at any time, or upgrade to a higher tier where they are included. No migration, no data loss, no re-setup.",
  },
  {
    question: "What counts as a user or seat?",
    answer:
      "A user is anyone who logs in and actively uses the platform. Viewers who only receive reports or Slack notifications do not count. We bill for active seats monthly, so if someone leaves your team mid-cycle, that seat is freed up automatically.",
  },
  {
    question: "Do you offer discounts for startups?",
    answer:
      "Yes! We have a Startup Program that offers 50% off Pro or Business for the first year. You need to be under $5M ARR and have raised less than Series B. Apply through our contact page and we will get you set up quickly.",
  },
  {
    question: "What happens when my free plan limits are reached?",
    answer:
      "Nothing breaks. Your existing sprint plans and data remain fully accessible. You simply cannot generate new AI sprint plans until your monthly quota resets or you upgrade. We will send you a friendly reminder when you are getting close to the limit.",
  },
  {
    question: "Can I switch plans anytime?",
    answer:
      "Yes. Upgrades take effect immediately with prorated billing. Downgrades take effect at the end of your current billing cycle, so you never lose access mid-month. No cancellation fees, no lock-in.",
  },
  {
    question: "Is there a minimum commitment?",
    answer:
      "Monthly plans have no commitment at all. Annual plans are billed yearly and save you 20%, but you can cancel and keep access through the end of your paid period. We do not believe in trapping customers.",
  },
  {
    question: "Do you offer non-profit pricing?",
    answer:
      "Yes. Registered non-profits and open-source projects receive 40% off any plan. Reach out to our sales team with proof of non-profit status and we will apply the discount to your account.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, Amex), as well as ACH bank transfers for annual plans. Enterprise customers can pay via invoice with NET-30 terms. All payments are processed securely through Stripe.",
  },
];

/* ------------------------------------------------------------------ */
/*  Reusable sub-components                                            */
/* ------------------------------------------------------------------ */

function FeatureCellValue({ value }: { value: FeatureValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center rounded-full bg-brand/10 p-1">
        <Check className="h-3.5 w-3.5 text-brand" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center rounded-full bg-theme-subtle p-1">
        <Minus className="h-3.5 w-3.5 text-theme-f" />
      </span>
    );
  }
  return <span className="text-xs font-medium text-theme-s">{value}</span>;
}

function FAQAccordionItem({
  item,
  open,
  onToggle,
}: {
  item: FAQItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-theme last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-brand"
      >
        <span className="text-sm font-medium text-theme sm:text-base">{item.question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-theme-m transition-transform duration-300",
            open && "rotate-180 text-brand",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-theme-s">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function PricingPage() {
  const searchParams = useSearchParams();
  const isDashboard = searchParams.get("source") === "dashboard";
  const returnUrl = searchParams.get("return") || "/";

  const { tiers: rawTiers } = usePricing();
  const TIERS = React.useMemo(() => buildTierUI(rawTiers), [rawTiers]);

  const [annual, setAnnual] = React.useState(true);
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);
  const [showComparison, setShowComparison] = React.useState(false);

  const formatPrice = (tier: PricingTierUI) => {
    if (tier.monthlyPrice === null) return "Custom";
    if (tier.monthlyPrice === 0) return "$0";
    return `$${annual ? tier.annualPrice : tier.monthlyPrice}`;
  };

  const getTierCta = (tier: PricingTierUI) => {
    if (!isDashboard) return { label: tier.cta, href: tier.ctaHref };
    switch (tier.slug) {
      case "starter":
        return { label: "Current Plan", href: "#" };
      case "pro":
        return { label: "Start 14-day Trial", href: "/auth/signup?plan=pro&trial=true" };
      case "business":
        return { label: "Start 14-day Trial", href: "/auth/signup?plan=business&trial=true" };
      case "enterprise":
        return { label: "Contact Us", href: "/contact?plan=enterprise" };
      default:
        return { label: tier.cta, href: tier.ctaHref };
    }
  };

  return (
    <div className="bg-theme">
      <JsonLd data={faqPageJsonLd(FAQS)} />

      {/* ── Dashboard navigation overlay ── */}
      {isDashboard && (
        <>
          <a
            href={returnUrl}
            className="fixed left-4 top-4 z-50 inline-flex items-center gap-1.5 rounded-xl border border-theme bg-theme-card px-4 py-2 text-sm font-medium text-theme shadow-lg backdrop-blur-sm transition-all hover:bg-theme-subtle hover:shadow-xl sm:left-6 sm:top-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </a>
          <a
            href={returnUrl}
            className="fixed right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-theme bg-theme-card text-theme-m shadow-lg transition-all hover:bg-theme-subtle hover:text-theme sm:right-6 sm:top-6"
            aria-label="Close and return to dashboard"
          >
            <X className="h-4 w-4" />
          </a>
        </>
      )}

      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <Section variant="white" className="pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <Chip dotColor="#12FF80" className="mb-6">
            Pricing
          </Chip>

          <h1 className="text-3xl font-semibold tracking-tight text-theme sm:text-5xl lg:text-display-2">
            Simple, transparent pricing
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base text-theme-s sm:text-body-lg">
            Start free. Scale as you grow. No hidden fees. No surprises.
          </p>

          {/* ── Billing toggle ── */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-theme bg-theme-card p-1 transition-colors duration-300">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                !annual
                  ? "bg-brand text-[#0a0a0a] shadow-sm"
                  : "text-theme-m hover:text-theme-s",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
                annual
                  ? "bg-brand text-[#0a0a0a] shadow-sm"
                  : "text-theme-m hover:text-theme-s",
              )}
            >
              Annual
            </button>
            <span
              className={cn(
                "ml-1 mr-2 rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-colors duration-200",
                annual
                  ? "bg-brand/20 text-brand"
                  : "bg-theme-subtle text-theme-m",
              )}
            >
              Save 20%
            </span>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  PRICING GRID                                                */}
      {/* ============================================================ */}
      <Section variant="sky" className="py-4 sm:py-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier) => (
            <article
              key={tier.slug}
              className={cn(
                "group relative flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg",
                tier.popular
                  ? "border-brand/30 bg-brand/[0.04] shadow-[0_0_60px_rgba(18,255,128,0.05)]"
                  : "border-theme bg-theme-card hover:border-theme-h",
              )}
            >
              {/* Popular badge */}
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#0a0a0a]">
                  Most Popular
                </span>
              )}

              {/* Tier header */}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                    tier.popular ? "bg-brand/15 text-brand" : "bg-theme-subtle text-theme-s",
                  )}
                >
                  {tier.icon}
                </span>
                <h3 className="text-lg font-semibold text-theme">{tier.name}</h3>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-theme">
                  {formatPrice(tier)}
                </span>
                {tier.monthlyPrice !== null && tier.monthlyPrice > 0 && (
                  <span className="text-sm text-theme-m">/user/mo</span>
                )}
              </div>
              {tier.monthlyPrice !== null && tier.monthlyPrice > 0 && annual && (
                <p className="mt-1 text-xs text-theme-m">
                  billed annually (${tier.monthlyPrice}/mo if monthly)
                </p>
              )}
              {tier.monthlyPrice === 0 && (
                <p className="mt-1 text-xs text-theme-m">Free forever. No credit card needed.</p>
              )}
              {tier.monthlyPrice === null && (
                <p className="mt-1 text-xs text-theme-m">
                  Tailored to your organization
                </p>
              )}

              {/* Best for */}
              <p className="mt-3 text-xs text-theme-m">
                <span className="font-medium text-theme-s">Best for:</span> {tier.bestFor}
              </p>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-theme-s">{tier.description}</p>

              {/* Features */}
              <ul className="mt-5 flex-1 space-y-2.5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-theme-s">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-6">
                {isDashboard && tier.slug === "starter" ? (
                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full opacity-50 cursor-default"
                    disabled
                  >
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    variant={tier.ctaVariant}
                    size="md"
                    className={cn("w-full", tier.popular && "shadow-brand/20")}
                    asChild
                  >
                    <Link href={getTierCta(tier).href}>
                      {getTierCta(tier).label}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Note under grid */}
        <p className="mt-6 text-center text-xs text-theme-m">
          All plans include 99.9% uptime SLA, TLS 1.3 encryption, and we never store your source code.
        </p>
      </Section>

      {/* ============================================================ */}
      {/*  PER-PRODUCT ADD-ONS                                         */}
      {/* ============================================================ */}
      <Section variant="violet" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Need just one module?
          </h2>
          <p className="mt-3 text-base text-theme-s sm:text-body-lg">
            Add individual products to any plan. Mix and match to fit your team.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ADD_ONS.map((addon) => (
            <Card key={addon.name} variant="dark" className="relative text-center">
              {/* Color accent bar */}
              <div
                className="mx-auto mb-4 h-1 w-10 rounded-full"
                style={{ backgroundColor: addon.color }}
              />

              <h3 className="text-sm font-bold tracking-wide text-theme">{addon.name}</h3>
              <p className="mt-0.5 text-xs text-theme-m">{addon.tagline}</p>

              <div className="mt-3 flex items-baseline justify-center gap-0.5">
                <span
                  className={cn(
                    "text-xl font-bold",
                    addon.price === "Included" ? "text-brand" : "text-theme",
                  )}
                >
                  {addon.price}
                </span>
                {addon.unit && <span className="text-xs text-theme-m">{addon.unit}</span>}
              </div>

              <p className="mt-2 text-[11px] text-theme-m">{addon.note}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  FEATURE COMPARISON TABLE                                     */}
      {/* ============================================================ */}
      <Section variant="amber" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Compare every feature
          </h2>
          <p className="mt-3 text-base text-theme-s">
            Not sure what is included? Here is the full breakdown, no fine print.
          </p>

          <Button
            variant="secondary"
            size="md"
            className="mt-6"
            onClick={() => setShowComparison(!showComparison)}
          >
            {showComparison ? "Hide comparison" : "Show full comparison"}
            <ChevronDown
              className={cn(
                "ml-1 h-4 w-4 transition-transform duration-300",
                showComparison && "rotate-180",
              )}
            />
          </Button>
        </div>

        {/* Comparison table */}
        <div
          className={cn(
            "mt-10 overflow-hidden transition-all duration-500 ease-in-out",
            showComparison ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              {/* Sticky header */}
              <thead>
                <tr className="border-b border-theme">
                  <th className="w-[40%] py-3 text-left text-xs font-medium uppercase tracking-wider text-theme-m">
                    Feature
                  </th>
                  {["Starter", "Pro", "Business", "Enterprise"].map((name) => (
                    <th
                      key={name}
                      className="w-[15%] py-3 text-center text-xs font-medium uppercase tracking-wider text-theme-m"
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {FEATURE_GROUPS.map((group) => (
                  <React.Fragment key={group.group}>
                    {/* Group header */}
                    <tr>
                      <td colSpan={5} className="pt-6 pb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: group.color }}
                          />
                          <span className="text-xs font-bold uppercase tracking-wider text-theme-s">
                            {group.group}
                          </span>
                        </div>
                      </td>
                    </tr>

                    {/* Feature rows */}
                    {group.rows.map((row) => (
                      <tr
                        key={row.feature}
                        className="border-b border-theme/50 transition-colors hover:bg-theme-subtle"
                      >
                        <td className="py-3 pr-4 text-sm text-theme-s">{row.feature}</td>
                        <td className="py-3 text-center">
                          <FeatureCellValue value={row.starter} />
                        </td>
                        <td className="py-3 text-center">
                          <FeatureCellValue value={row.pro} />
                        </td>
                        <td className="py-3 text-center">
                          <FeatureCellValue value={row.business} />
                        </td>
                        <td className="py-3 text-center">
                          <FeatureCellValue value={row.enterprise} />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  FAQ                                                          */}
      {/* ============================================================ */}
      <Section variant="rose" className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10">
              <HelpCircle className="h-5 w-5 text-brand" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-base text-theme-s">
              Got questions? We have straightforward answers.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-theme bg-theme-card p-1 sm:p-2">
            <div className="px-4 sm:px-6">
              {FAQS.map((faq, i) => (
                <FAQAccordionItem
                  key={i}
                  item={faq}
                  open={openFAQ === i}
                  onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SECURITY & COMPLIANCE                                        */}
      {/* ============================================================ */}
      <Section variant="white" className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Security and compliance
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-theme-s sm:text-body-lg">
            Rest easy knowing we are fully certified by numerous organizations.
          </p>
          <Link
            href="/security"
            className="mt-4 inline-block text-sm font-semibold text-theme underline underline-offset-4 decoration-theme/30 hover:decoration-brand hover:text-brand transition-colors"
          >
            Learn more
          </Link>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "ISO/IEC 27001",
              description: "ISO/IEC Security Management",
              icon: (
                <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5" className="text-theme-s" />
                  <path d="M15 20l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand" />
                  <text x="20" y="33" textAnchor="middle" className="text-theme-m" style={{ fontSize: '5px', fontWeight: 600 }}>BSI</text>
                </svg>
              ),
            },
            {
              name: "SOC 2 Type II",
              description: "SOC for Service Organizations",
              icon: (
                <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5" className="text-theme-s" />
                  <text x="20" y="18" textAnchor="middle" className="text-theme-m" style={{ fontSize: '5px', fontWeight: 700 }}>AICPA</text>
                  <text x="20" y="26" textAnchor="middle" className="text-brand" style={{ fontSize: '7px', fontWeight: 800 }}>SOC 2</text>
                </svg>
              ),
            },
            {
              name: "SOC 3",
              description: "SOC for Service Organizations",
              icon: (
                <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5" className="text-theme-s" />
                  <text x="20" y="23" textAnchor="middle" className="text-theme" style={{ fontSize: '9px', fontWeight: 800 }}>SOC 3</text>
                </svg>
              ),
            },
            {
              name: "NIST",
              description: "National Institute of Standards and Technology",
              icon: (
                <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none">
                  <rect x="6" y="10" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-theme-s" />
                  <text x="20" y="24" textAnchor="middle" className="text-theme" style={{ fontSize: '9px', fontWeight: 900 }}>NIST</text>
                </svg>
              ),
            },
            {
              name: "TISAX",
              description: "Trusted Information Security Assessment Exchange",
              icon: (
                <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none">
                  <rect x="4" y="12" width="32" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" className="text-theme-s" />
                  <text x="20" y="23" textAnchor="middle" className="text-brand" style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '0.5px' }}>TISAX</text>
                </svg>
              ),
            },
            {
              name: "GDPR",
              description: "General Data Protection Regulation",
              icon: (
                <svg className="h-10 w-10" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5" className="text-theme-s" />
                  <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" className="text-brand" />
                  <path d="M20 12v-2M20 30v-2M28 20h2M10 20h2M25.6 14.4l1.4-1.4M13 27l1.4-1.4M25.6 25.6l1.4 1.4M13 13l1.4 1.4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-brand" />
                  <path d="M17 20l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand" />
                </svg>
              ),
            },
          ].map((cert) => (
            <div
              key={cert.name}
              className="group flex flex-col items-center rounded-2xl border border-theme bg-theme-card p-6 text-center transition-all duration-300 hover:border-theme-h hover:shadow-lg"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-theme-subtle transition-colors group-hover:bg-brand/5">
                {cert.icon}
              </div>
              <h3 className="text-base font-semibold text-theme">{cert.name}</h3>
              <p className="mt-1 text-xs text-theme-m">{cert.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  TRUST STRIP                                                  */}
      {/* ============================================================ */}
      <Section variant="mint" className="py-8 sm:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
            {[
              {
                icon: <Lock className="h-5 w-5 text-brand" />,
                label: "Encrypted Everywhere",
                sub: "TLS 1.3 in transit, AES-256 at rest",
              },
              {
                icon: <Eye className="h-5 w-5 text-brand" />,
                label: "No Source Code Stored",
                sub: "Read-only API, metadata only",
              },
              {
                icon: <Shield className="h-5 w-5 text-brand" />,
                label: "99.9% Uptime SLA",
                sub: "Enterprise-grade reliability",
              },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-3 text-center sm:text-left">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10">
                  {badge.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-theme">{badge.label}</p>
                  <p className="text-xs text-theme-m">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  FINAL CTA                                                    */}
      {/* ============================================================ */}
      <Section variant="coral" className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10">
            <MessageCircle className="h-6 w-6 text-brand" />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Not sure which plan is right?
          </h2>
          <p className="mt-3 text-base text-theme-s sm:text-body-lg">
            Talk to us. We will help you find the perfect fit for your team, no pressure.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">
                Talk to Sales
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/auth/signup">
                Start Free
              </Link>
            </Button>
          </div>

          <p className="mt-5 text-xs text-theme-m">
            Free plan available. No credit card required. Upgrade anytime.
          </p>
        </div>
      </Section>
    </div>
  );
}
