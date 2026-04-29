"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { VOLUME_DISCOUNTS } from "@/lib/constants";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus,
  Shield,
  Lock,
  RotateCcw,
  Zap,
  Building2,
} from "lucide-react";
import { usePricing } from "@/hooks/use-pricing";
import { isPurchasableProductKey } from "@/lib/product-purchase";

const API_BASE =
  process.env.NEXT_PUBLIC_ONBOARDING_API_URL?.replace("/v1", "") ??
  "http://localhost:8081";

/* ------------------------------------------------------------------ */
/*  Plan UI config                                                      */
/* ------------------------------------------------------------------ */

const PLAN_ICONS: Record<string, React.ReactNode> = {
  pro: <Zap className="h-5 w-5" />,
  business: <Building2 className="h-5 w-5" />,
};

type PlanSlug = "pro" | "business";

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function getVolumeDiscount(seats: number) {
  for (const tier of VOLUME_DISCOUNTS) {
    if (seats >= tier.minUsers && seats <= tier.maxUsers) {
      return tier;
    }
  }
  return VOLUME_DISCOUNTS[0];
}

function formatCurrency(cents: number) {
  return `$${cents.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                           */
/* ------------------------------------------------------------------ */

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") as PlanSlug | null;
  const seatsParam = searchParams.get("seats");
  const trialParam = searchParams.get("trial") === "true";

  const { tiers, addOns: hookAddOns, volumeDiscounts: hookVolumes } = usePricing();

  const plan: PlanSlug = planParam === "pro" || planParam === "business" ? planParam : "pro";
  const matchedTier = tiers.find((t) => t.name.toLowerCase() === plan);
  const planInfo = {
    name: matchedTier?.name ?? (plan === "pro" ? "Pro" : "Business"),
    monthlyPrice: matchedTier?.monthlyPrice ?? (plan === "pro" ? 14 : 28),
    annualPrice: matchedTier?.annualPrice ?? (plan === "pro" ? 11 : 22),
    icon: PLAN_ICONS[plan] ?? <Zap className="h-5 w-5" />,
    color: "#12FF80",
  };

  const [seats, setSeats] = React.useState(seatsParam ? Math.max(1, parseInt(seatsParam, 10) || 1) : 5);
  const [annual, setAnnual] = React.useState(true);
  const [selectedProducts, setSelectedProducts] = React.useState<Set<string>>(
    () => {
      const next = new Set<string>(["atlas"]);
      const addonsParam = searchParams.get("addons");
      const productParam = searchParams.get("product");
      if (productParam && isPurchasableProductKey(productParam) && productParam !== "atlas") {
        next.add(productParam);
      }
      if (addonsParam) {
        for (const raw of addonsParam.split(",")) {
          const k = raw.trim().toLowerCase();
          if (isPurchasableProductKey(k) && k !== "atlas") {
            next.add(k);
          }
        }
      }
      return next;
    },
  );
  const [loading, setLoading] = React.useState(false);

  const addonsKey = searchParams.get("addons");
  const productKey = searchParams.get("product");
  React.useEffect(() => {
    const next = new Set<string>(["atlas"]);
    if (productKey && isPurchasableProductKey(productKey) && productKey !== "atlas") {
      next.add(productKey);
    }
    if (addonsKey) {
      for (const raw of addonsKey.split(",")) {
        const k = raw.trim().toLowerCase();
        if (isPurchasableProductKey(k) && k !== "atlas") {
          next.add(k);
        }
      }
    }
    setSelectedProducts(next);
  }, [addonsKey, productKey]);

  const basePrice = annual ? planInfo.annualPrice : planInfo.monthlyPrice;
  const volumeTier = getVolumeDiscount(seats);
  const volumeDiscountPct = volumeTier.discount;

  const baseCost = basePrice * seats;
  const addOnCost = hookAddOns.reduce((sum, addon) => {
    if (addon.included || !selectedProducts.has(addon.key)) return sum;
    const price = annual ? addon.annualPrice : addon.monthlyPrice;
    return sum + price * seats;
  }, 0);

  const subtotal = baseCost + addOnCost;
  const discountAmount = Math.round(subtotal * (volumeDiscountPct / 100));
  const totalMonthly = subtotal - discountAmount;
  const totalAnnual = totalMonthly * 12;

  const toggleProduct = (key: string) => {
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const products = Array.from(selectedProducts).filter((k) => k !== "atlas");
      const res = await fetch(`${API_BASE}/v1/billing/checkout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan_tier: plan,
          seat_count: seats,
          products,
          success_url: `${window.location.origin}/auth/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: window.location.href,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="bg-theme min-h-screen">
      <Section variant="white" className="pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-4xl">
          {/* Back link */}
          <Link
            href="/pricing"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-theme-m hover:text-theme transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to pricing
          </Link>

          {/* Trial badge */}
          {trialParam && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-brand/20 bg-brand/[0.06] px-4 py-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/20 text-brand">
                <Zap className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-semibold text-brand">14-day Free Trial</span>
              <span className="text-sm text-theme-m">— You won&apos;t be charged until your trial ends</span>
            </div>
          )}

          {/* Plan header */}
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
              {planInfo.icon}
            </span>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-theme sm:text-3xl">
                {planInfo.name} Plan {trialParam && "— Free Trial"}
              </h1>
              <p className="text-sm text-theme-m">
                {trialParam
                  ? "Try all features free for 14 days, then choose to subscribe"
                  : "Configure your license and complete your purchase"}
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* ── Left Column: Configuration ── */}
            <div className="space-y-8">
              {/* Billing toggle */}
              <div className="rounded-2xl border border-theme bg-theme-card p-6">
                <h2 className="mb-4 text-base font-semibold text-theme">Billing Cycle</h2>
                <div className="inline-flex items-center gap-1 rounded-full border border-theme bg-theme p-1">
                  <button
                    type="button"
                    onClick={() => setAnnual(false)}
                    className={cn(
                      "rounded-full px-5 py-2 text-sm font-medium transition-all",
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
                      "rounded-full px-5 py-2 text-sm font-medium transition-all",
                      annual
                        ? "bg-brand text-[#0a0a0a] shadow-sm"
                        : "text-theme-m hover:text-theme-s",
                    )}
                  >
                    Annual
                  </button>
                  <span
                    className={cn(
                      "ml-1 mr-2 rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-colors",
                      annual
                        ? "bg-brand/20 text-brand"
                        : "bg-theme-subtle text-theme-m",
                    )}
                  >
                    Save 20%
                  </span>
                </div>
              </div>

              {/* Member count */}
              <div className="rounded-2xl border border-theme bg-theme-card p-6">
                <h2 className="mb-1 text-base font-semibold text-theme">Team Size</h2>
                <p className="mb-5 text-sm text-theme-m">
                  How many members need access?
                  {volumeDiscountPct > 0 && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-bold text-brand">
                      {volumeTier.label}
                    </span>
                  )}
                </p>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setSeats(Math.max(1, seats - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-theme bg-theme text-theme-s hover:bg-theme-subtle hover:text-theme transition-colors"
                    disabled={seats <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <input
                    type="number"
                    min={1}
                    max={9999}
                    value={seats}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10);
                      if (!isNaN(v) && v >= 1) setSeats(v);
                    }}
                    className="h-12 w-24 rounded-xl border border-theme bg-theme text-center text-2xl font-bold text-theme outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 transition-all"
                  />

                  <button
                    type="button"
                    onClick={() => setSeats(seats + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-theme bg-theme text-theme-s hover:bg-theme-subtle hover:text-theme transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>

                  {/* Quick presets */}
                  <div className="hidden items-center gap-1.5 sm:flex">
                    {[5, 10, 25, 50, 100].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setSeats(n)}
                        className={cn(
                          "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                          seats === n
                            ? "bg-brand text-[#0a0a0a] shadow-sm"
                            : "bg-theme-subtle text-theme-m hover:text-theme-s",
                        )}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Volume discount tiers */}
                <div className="mt-5 grid grid-cols-4 gap-1.5 sm:grid-cols-7">
                  {VOLUME_DISCOUNTS.map((tier) => (
                    <div
                      key={tier.minUsers}
                      className={cn(
                        "rounded-lg px-2 py-1.5 text-center text-[10px] transition-all",
                        seats >= tier.minUsers && seats <= tier.maxUsers
                          ? "bg-brand/15 text-brand font-bold ring-1 ring-brand/30"
                          : tier.discount > 0
                            ? "bg-theme-subtle text-theme-m"
                            : "bg-theme-subtle/50 text-theme-f",
                      )}
                    >
                      <div className="font-bold">
                        {tier.maxUsers >= 99999 ? `${tier.minUsers}+` : `${tier.minUsers}-${tier.maxUsers}`}
                      </div>
                      {tier.discount > 0 && (
                        <div className="mt-0.5">{tier.discount}% off</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Product licenses */}
              <div className="rounded-2xl border border-theme bg-theme-card p-6">
                <h2 className="mb-1 text-base font-semibold text-theme">Product Licenses</h2>
                <p className="mb-5 text-sm text-theme-m">
                  Select the products your team needs
                </p>

                <div className="space-y-3">
                  {hookAddOns.map((addon) => {
                    const isSelected = selectedProducts.has(addon.key) || addon.included;
                    const price = annual ? addon.annualPrice : addon.monthlyPrice;
                    return (
                      <button
                        key={addon.key}
                        type="button"
                        disabled={addon.included}
                        onClick={() => !addon.included && toggleProduct(addon.key)}
                        className={cn(
                          "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all",
                          addon.included
                            ? "border-brand/20 bg-brand/[0.04] cursor-default"
                            : isSelected
                              ? "border-brand/30 bg-brand/[0.04] hover:border-brand/40"
                              : "border-theme bg-theme hover:border-theme-h cursor-pointer",
                        )}
                      >
                        {/* Checkbox */}
                        <div
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                            isSelected
                              ? "border-brand bg-brand"
                              : "border-theme-h bg-theme",
                          )}
                        >
                          {isSelected && <Check className="h-3 w-3 text-[#0a0a0a]" />}
                        </div>

                        {/* Product icon */}
                        <span className="text-lg">{addon.icon}</span>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-theme">{addon.name}</span>
                            {addon.included && (
                              <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-bold text-brand">
                                Included
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-theme-m">{addon.tagline}</p>
                        </div>

                        {/* Price */}
                        {!addon.included && (
                          <div className="text-right">
                            <span className="text-sm font-bold text-theme">
                              ${price}
                            </span>
                            <span className="text-xs text-theme-m">/user/mo</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Right Column: Price Breakdown & CTA ── */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <div className="rounded-2xl border border-theme bg-theme-card p-6 shadow-lg shadow-black/5">
                <h2 className="mb-5 text-base font-semibold text-theme">Order Summary</h2>

                {/* Base plan */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-theme-s">
                      {planInfo.name} plan ({formatCurrency(basePrice)}/user &times; {seats})
                    </span>
                    <span className="font-medium text-theme">
                      {formatCurrency(baseCost)}/mo
                    </span>
                  </div>

                  {/* Add-on line items */}
                  {hookAddOns.filter(
                    (a) => !a.included && selectedProducts.has(a.key),
                  ).map((addon) => {
                    const price = annual ? addon.annualPrice : addon.monthlyPrice;
                    return (
                      <div key={addon.key} className="flex items-center justify-between">
                        <span className="text-theme-s">
                          {addon.name} (${price}/user &times; {seats})
                        </span>
                        <span className="font-medium text-theme">
                          {formatCurrency(price * seats)}/mo
                        </span>
                      </div>
                    );
                  })}

                  {/* Volume discount */}
                  {volumeDiscountPct > 0 && (
                    <div className="flex items-center justify-between text-brand">
                      <span>{volumeTier.label}</span>
                      <span className="font-medium">
                        &minus;{formatCurrency(discountAmount)}/mo
                      </span>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t border-theme pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-theme">
                        Total per month
                      </span>
                      <span className="text-xl font-bold text-theme">
                        {formatCurrency(totalMonthly)}/mo
                      </span>
                    </div>
                    {annual && (
                      <div className="mt-1 flex items-center justify-between text-xs text-theme-m">
                        <span>Billed annually</span>
                        <span>{formatCurrency(totalAnnual)}/year</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  variant="primary"
                  size="lg"
                  className="mt-6 w-full"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a]" />
                  ) : (
                    <>
                      {trialParam ? "Start Free Trial" : "Complete Purchase"}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>

                {/* Trust */}
                <div className="mt-5 space-y-2.5">
                  {[
                    { icon: <Shield className="h-3.5 w-3.5" />, text: "256-bit SSL encrypted checkout" },
                    { icon: <RotateCcw className="h-3.5 w-3.5" />, text: "Cancel anytime, no questions asked" },
                    { icon: <Lock className="h-3.5 w-3.5" />, text: "SOC 2 & ISO 27001 certified" },
                  ].map((badge) => (
                    <div
                      key={badge.text}
                      className="flex items-center gap-2 text-xs text-theme-m"
                    >
                      <span className="text-brand">{badge.icon}</span>
                      {badge.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
