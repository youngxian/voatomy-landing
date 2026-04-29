"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  PRICING_FEATURE_GROUPS,
  TEAM_SIZE_PRESETS,
  IMPACT_METRICS,
} from "@/lib/constants";
import { usePricing } from "@/hooks/use-pricing";
import { Check, ChevronDown, ChevronUp, Minus, Users, Zap, Shield, Sparkles } from "lucide-react";
import { trackFeature, trackConversion } from "@/lib/analytics";
import { SectionBackgroundDecor } from "@/components/marketing/section-background-decor";

/* ─── helpers ─── */

function getVolumeDiscount(users: number, volumeDiscounts: ReturnType<typeof usePricing>["volumeDiscounts"]) {
  return volumeDiscounts.find(
    (d) => users >= d.minUsers && users <= d.maxUsers,
  ) ?? volumeDiscounts[0];
}

function formatPrice(price: number) {
  if (price <= 0) return "$0";
  return `$${price.toLocaleString()}`;
}

/* ─── sub-components ─── */

function BillingToggle({
  annual,
  setAnnual,
}: {
  annual: boolean;
  setAnnual: (v: boolean) => void;
}) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-theme bg-theme-card p-1 transition-colors duration-300">
      <button
        type="button"
        onClick={() => {
          setAnnual(false);
          trackFeature("pricing", "toggle_billing", { billing: "monthly" });
        }}
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
          !annual
            ? "bg-accent-lime text-teal"
            : "text-theme-m hover:text-theme-s",
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => {
          setAnnual(true);
          trackFeature("pricing", "toggle_billing", { billing: "annual" });
        }}
        className={cn(
          "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
          annual
            ? "bg-accent-lime text-teal"
            : "text-theme-m hover:text-theme-s",
        )}
      >
        Annual{" "}
        <span
          className={cn(
            "ml-1 text-xs",
            annual ? "text-teal/70" : "text-teal",
          )}
        >
          save 20%
        </span>
      </button>
    </div>
  );
}

function TeamSizeSlider({
  teamSize,
  setTeamSize,
  volumeDiscounts,
}: {
  teamSize: number;
  setTeamSize: (v: number) => void;
  volumeDiscounts: ReturnType<typeof usePricing>["volumeDiscounts"];
}) {
  const discount = getVolumeDiscount(teamSize, volumeDiscounts);

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-theme bg-theme-card p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-teal" />
          <span className="text-sm font-semibold text-theme">Team Size</span>
        </div>
        <span className="text-2xl font-bold text-teal tabular-nums">
          {teamSize} {teamSize >= 500 ? "+" : ""} users
        </span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={1}
        max={500}
        step={1}
        value={teamSize}
        onChange={(e) => setTeamSize(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-theme-subtle accent-[#E2FB6C] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-lime [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
      />

      {/* Preset chips */}
      <div className="flex flex-wrap gap-2 mt-4">
        {TEAM_SIZE_PRESETS.map((preset) => (
          <button
            key={preset.value}
            type="button"
            onClick={() => {
              setTeamSize(preset.value);
              trackFeature("pricing", "team_size_preset", { size: preset.value });
            }}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-all border",
              teamSize === preset.value
                ? "border-brand bg-accent-lime/10 text-teal"
                : "border-theme bg-transparent text-theme-m hover:border-brand/30 hover:text-theme-s",
            )}
          >
            {preset.label}
            <span className="ml-1 opacity-60">{preset.description}</span>
          </button>
        ))}
      </div>

      {/* Volume discount badge */}
      {discount.discount > 0 && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-accent-lime/10 border border-brand/20 px-3 py-2">
          <Sparkles className="h-3.5 w-3.5 text-teal" />
          <span className="text-xs font-medium text-teal">
            {discount.label} applied automatically
          </span>
        </div>
      )}
    </div>
  );
}

function ProductConfigurator({
  selectedAddOns,
  toggleAddOn,
  annual,
  addOns,
}: {
  selectedAddOns: Set<string>;
  toggleAddOn: (key: string) => void;
  annual: boolean;
  addOns: ReturnType<typeof usePricing>["addOns"];
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-theme">
          Customize with Product Add-ons
        </h3>
        <p className="text-sm text-theme-m mt-1">
          ATLAS is included free. Add more products to unlock the full platform.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {addOns.map((addon) => {
          const active = addon.included || selectedAddOns.has(addon.key);
          const price = annual ? addon.annualPrice : addon.monthlyPrice;

          return (
            <button
              key={addon.key}
              type="button"
              disabled={addon.included}
              onClick={() => {
                toggleAddOn(addon.key);
                trackFeature("pricing", "toggle_addon", {
                  addon: addon.key,
                  enabled: !selectedAddOns.has(addon.key),
                });
              }}
              className={cn(
                "relative flex flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-200",
                active
                  ? "border-brand/40 bg-accent-lime/[0.06] shadow-sm"
                  : "border-theme bg-theme-card hover:border-brand/20 hover:bg-theme-subtle",
                addon.included && "cursor-default opacity-80",
              )}
            >
              {active && !addon.included && (
                <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-accent-lime flex items-center justify-center">
                  <Check className="h-3 w-3 text-teal" />
                </div>
              )}
              {addon.included && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-accent-lime/20 px-2 py-0.5 text-[9px] font-bold text-teal">
                  INCLUDED
                </span>
              )}
              <span className="text-2xl">{addon.icon}</span>
              <span className="text-sm font-semibold text-theme">
                {addon.name}
              </span>
              <span className="text-[11px] text-theme-m text-center leading-tight">
                {addon.tagline}
              </span>
              <span className="text-sm font-bold text-theme mt-auto">
                {addon.included
                  ? "Free"
                  : price === 0
                    ? "Free"
                    : `+$${price}`}
              </span>
              <span className="text-[10px] text-theme-m">{addon.note}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PriceEstimator({
  teamSize,
  selectedTier,
  selectedAddOns,
  annual,
  pricingTiers,
  addOns,
  volumeDiscounts,
}: {
  teamSize: number;
  selectedTier: number;
  selectedAddOns: Set<string>;
  annual: boolean;
  pricingTiers: ReturnType<typeof usePricing>["tiers"];
  addOns: ReturnType<typeof usePricing>["addOns"];
  volumeDiscounts: ReturnType<typeof usePricing>["volumeDiscounts"];
}) {
  const tier = pricingTiers[selectedTier];
  const discount = getVolumeDiscount(teamSize, volumeDiscounts);
  const discountRate = discount.discount / 100;

  // Base tier price
  const baseTierPrice = annual ? tier.annualPrice : tier.monthlyPrice;
  const tierTotal =
    baseTierPrice <= 0 ? 0 : baseTierPrice * teamSize * (1 - discountRate);

  // Add-ons total
  let addOnTotal = 0;
  addOns.forEach((addon) => {
    if (!addon.included && selectedAddOns.has(addon.key)) {
      const addonPrice = annual ? addon.annualPrice : addon.monthlyPrice;
      addOnTotal += addonPrice * teamSize * (1 - discountRate);
    }
  });

  const grandTotal = tierTotal + addOnTotal;
  const isCustom = tier.monthlyPrice < 0;

  return (
    <div className="mx-auto max-w-md rounded-2xl border-2 border-brand/30 bg-gradient-to-br from-brand/[0.04] to-transparent p-6 text-center shadow-lg shadow-brand/5">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Zap className="h-4 w-4 text-teal" />
        <span className="text-xs font-bold uppercase tracking-widest text-teal/70">
          Your Estimated Cost
        </span>
      </div>

      {isCustom ? (
        <>
          <div className="text-4xl font-bold text-theme mt-2">Custom</div>
          <p className="text-sm text-theme-m mt-1">
            Tailored pricing for your organization
          </p>
        </>
      ) : (
        <>
          <div className="text-4xl font-bold text-theme mt-2 tabular-nums">
            {formatPrice(Math.round(grandTotal))}
            <span className="text-base font-normal text-theme-m">/mo</span>
          </div>
          <p className="text-sm text-theme-m mt-1">
            {tier.name} plan · {teamSize} users
            {selectedAddOns.size > 0 &&
              ` · ${selectedAddOns.size} add-on${selectedAddOns.size > 1 ? "s" : ""}`}
            {discount.discount > 0 && (
              <span className="text-teal font-medium">
                {" "}
                · {discount.discount}% off
              </span>
            )}
          </p>
          {annual && (
            <p className="text-xs text-teal mt-1 font-medium">
              Billed annually at {formatPrice(Math.round(grandTotal * 12))}
              /year
            </p>
          )}
        </>
      )}

      {/* Breakdown */}
      {!isCustom && grandTotal > 0 && (
        <div className="mt-4 space-y-1 text-left rounded-lg bg-theme-subtle/50 p-3">
          <div className="flex justify-between text-xs text-theme-m">
            <span>
              {tier.name} ({formatPrice(baseTierPrice)}/user × {teamSize})
            </span>
            <span className="font-medium text-theme-s tabular-nums">
              {formatPrice(Math.round(baseTierPrice * teamSize))}
            </span>
          </div>
          {addOns.filter(
            (a) => !a.included && selectedAddOns.has(a.key),
          ).map((addon) => {
            const addonPrice = annual ? addon.annualPrice : addon.monthlyPrice;
            return (
              <div
                key={addon.key}
                className="flex justify-between text-xs text-theme-m"
              >
                <span>
                  {addon.name} (+{formatPrice(addonPrice)}/user × {teamSize})
                </span>
                <span className="font-medium text-theme-s tabular-nums">
                  +{formatPrice(Math.round(addonPrice * teamSize))}
                </span>
              </div>
            );
          })}
          {discount.discount > 0 && (
            <div className="flex justify-between text-xs text-teal font-medium border-t border-theme pt-1 mt-1">
              <span>Volume discount (−{discount.discount}%)</span>
              <span className="tabular-nums">
                −
                {formatPrice(
                  Math.round(
                    (baseTierPrice * teamSize +
                      addOnTotal / (1 - discountRate)) *
                      discountRate,
                  ),
                )}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="mt-5">
        <Button variant="primary" size="lg" className="w-full" asChild>
          <Link
            href={isCustom ? "/contact" : "#hero"}
            onClick={() => {
              trackFeature("pricing", "configurator_cta", {
                tier: tier.name,
                teamSize,
                addOns: Array.from(selectedAddOns),
                annual,
                total: grandTotal,
              });
              if (!isCustom && grandTotal === 0) {
                trackConversion("signup_start", {
                  source: "pricing_configurator",
                  tier: tier.name,
                });
              }
            }}
          >
            {isCustom ? "Talk to Sales" : grandTotal === 0 ? "Start Free" : "Start 14-day Trial"}
          </Link>
        </Button>
        <p className="text-[10px] text-theme-m mt-2">
          No credit card required · Cancel anytime
        </p>
      </div>
    </div>
  );
}

function ImpactSection({ isVisible }: { isVisible: boolean }) {
  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-teal/70">
          Proven Impact
        </span>
        <h3 className="mt-2 text-2xl font-semibold text-theme">
          The ROI teams see with Voatomy
        </h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {IMPACT_METRICS.map((metric, i) => (
          <div
            key={metric.label}
            className={cn(
              "rounded-xl border border-theme bg-theme-card p-5 text-center transition-all duration-500",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4",
            )}
            style={{ transitionDelay: isVisible ? `${i * 80}ms` : "0ms" }}
          >
            <span className="text-2xl">{metric.icon}</span>
            <div className="mt-2 text-3xl font-bold text-teal tabular-nums">
              {metric.value}
            </div>
            <div className="mt-1 text-sm font-medium text-theme">
              {metric.label}
            </div>
            <div className="mt-0.5 text-xs text-theme-m">{metric.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeatureComparisonTable({ isVisible }: { isVisible: boolean }) {
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(
    new Set(),
  );
  const [showAll, setShowAll] = React.useState(false);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
    trackFeature("pricing", "toggle_feature_group", { group });
  };

  const displayGroups = showAll
    ? PRICING_FEATURE_GROUPS
    : PRICING_FEATURE_GROUPS.slice(0, 2);

  return (
    <div
      className={cn(
        "mt-16 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-theme">
          Full Feature Comparison
        </h3>
        <p className="text-sm text-theme-m mt-1">
          See exactly what you get at every tier
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-theme">
        <table className="w-full min-w-[640px]">
          {/* Header */}
          <thead>
            <tr className="bg-theme-subtle">
              <th className="text-left text-xs font-semibold text-theme-m px-4 py-3 w-[200px]">
                Feature
              </th>
              {["Starter", "Pro", "Business", "Enterprise"].map((tier) => (
                <th
                  key={tier}
                  className="text-center text-xs font-semibold text-theme px-4 py-3"
                >
                  {tier}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {displayGroups.map((group) => {
              const expanded = expandedGroups.has(group.group);
              return (
                <React.Fragment key={group.group}>
                  {/* Group header */}
                  <tr>
                    <td colSpan={5}>
                      <button
                        type="button"
                        onClick={() => toggleGroup(group.group)}
                        className="flex w-full items-center gap-2 px-4 py-3 text-left bg-theme-card hover:bg-theme-subtle transition-colors border-t border-theme"
                      >
                        <span className="text-base">{group.icon}</span>
                        <span className="text-sm font-semibold text-theme">
                          {group.group}
                        </span>
                        <span className="text-[10px] text-theme-m ml-1">
                          ({group.features.length} features)
                        </span>
                        <span className="ml-auto">
                          {expanded ? (
                            <ChevronUp className="h-4 w-4 text-theme-m" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-theme-m" />
                          )}
                        </span>
                      </button>
                    </td>
                  </tr>
                  {/* Feature rows */}
                  {expanded &&
                    group.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="border-t border-theme/50 hover:bg-theme-subtle/50 transition-colors"
                      >
                        <td className="text-xs text-theme-s px-4 py-2.5 font-medium">
                          {feature.name}
                        </td>
                        {(
                          [
                            feature.starter,
                            feature.pro,
                            feature.business,
                            feature.enterprise,
                          ] as string[]
                        ).map((val, j) => (
                          <td
                            key={j}
                            className="text-center text-xs px-4 py-2.5"
                          >
                            {val === "✓" ? (
                              <Check className="h-4 w-4 text-teal mx-auto" />
                            ) : val === "—" ? (
                              <Minus className="h-4 w-4 text-theme-m/40 mx-auto" />
                            ) : (
                              <span className="text-theme-s font-medium">
                                {val}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {!showAll && PRICING_FEATURE_GROUPS.length > 2 && (
        <div className="text-center mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowAll(true);
              trackFeature("pricing", "show_all_features");
            }}
          >
            Show all {PRICING_FEATURE_GROUPS.length} feature groups
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ─── */

export function PricingSection() {
  const [annual, setAnnual] = React.useState(false);
  const [teamSize, setTeamSize] = React.useState(10);
  const [selectedTier, setSelectedTier] = React.useState(1); // default Pro
  const [selectedAddOns, setSelectedAddOns] = React.useState<Set<string>>(
    new Set(),
  );
  const [showConfigurator, setShowConfigurator] = React.useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const { tiers: PRICING_TIERS, addOns: PRODUCT_ADD_ONS, volumeDiscounts: VOLUME_DISCOUNTS } = usePricing();

  const toggleAddOn = (key: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // Auto-recommend tier based on team size
  React.useEffect(() => {
    if (teamSize <= 8) setSelectedTier(0);
    else if (teamSize <= 50) setSelectedTier(1);
    else if (teamSize <= 250) setSelectedTier(2);
    else setSelectedTier(3);
  }, [teamSize]);

  return (
    <section
      id="pricing"
      data-track-section="pricing"
      className="relative overflow-hidden bg-theme px-4 py-16 sm:py-24 transition-colors duration-300"
    >
      <SectionBackgroundDecor tone="cream" />
      <div className="mx-auto max-w-container">
        <div
          ref={ref}
          className={cn(
            "relative z-[1] transition-all duration-700",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8",
          )}
        >
          {/* ── Header ── */}
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal/70">
              Pricing
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
              Plans that scale with your impact
            </h2>
            <p className="mx-auto mt-3 max-w-[540px] text-body-lg text-theme-m">
              Start free with ATLAS. Add products, grow your team, and only pay
              for what drives results.
            </p>

            {/* Toggle */}
            <div className="mt-6">
              <BillingToggle annual={annual} setAnnual={setAnnual} />
            </div>
          </div>

          {/* ── Pricing Tier Cards ── */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRICING_TIERS.map((tier, i) => {
              const isCustom = tier.monthlyPrice < 0;
              const price = annual ? tier.annualPrice : tier.monthlyPrice;
              const isSelected = selectedTier === i;

              return (
                <article
                  key={tier.name}
                  onClick={() => {
                    setSelectedTier(i);
                    trackFeature("pricing", "tier_selected", {
                      tier: tier.name,
                      billing: annual ? "annual" : "monthly",
                    });
                  }}
                  className={cn(
                    "relative flex flex-col rounded-2xl border p-6 transition-all duration-300 cursor-pointer",
                    tier.popular
                      ? "border-brand/30 bg-accent-lime/[0.06] shadow-[0_0_40px_rgba(226,251,108,0.08)]"
                      : "border-theme bg-theme-card",
                    isSelected &&
                      "ring-2 ring-brand/40 border-brand/40 shadow-lg shadow-brand/10",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6",
                  )}
                  style={{
                    transitionDelay: isVisible ? `${i * 100}ms` : "0ms",
                  }}
                >
                  {tier.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-lime px-3 py-0.5 text-[11px] font-bold text-teal">
                      {tier.badge}
                    </span>
                  )}

                  <h3 className="text-lg font-semibold text-theme">
                    {tier.name}
                  </h3>

                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-theme tabular-nums">
                      {isCustom ? "Custom" : price === 0 ? "$0" : `$${price}`}
                    </span>
                    {tier.period && !isCustom && (
                      <span className="text-sm text-theme-m">
                        {tier.period}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs text-theme-m">
                    {tier.description}
                  </p>
                  <p className="mt-2 text-[11px] text-teal/70 font-medium leading-snug">
                    {tier.bestFor}
                  </p>

                  <ul className="mt-5 flex-1 space-y-2">
                    {tier.features.map((feature) => (
                      <li
                        key={feature.text}
                        className="flex items-start gap-2 text-sm text-theme-s"
                      >
                        {feature.included ? (
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />
                        ) : (
                          <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-theme-m/40" />
                        )}
                        {feature.text}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Button
                      variant={tier.ctaVariant}
                      className={cn(
                        "w-full",
                        tier.popular && "shadow-brand/20",
                      )}
                      asChild
                    >
                      <Link
                        href={
                          isCustom
                            ? "/contact?plan=enterprise"
                            : tier.monthlyPrice <= 0
                              ? "/auth/signup"
                              : `/pricing/checkout?plan=${tier.name.toLowerCase()}&trial=true`
                        }
                        data-track-cta={`pricing-${tier.name.toLowerCase()}`}
                        data-track-cta-text={tier.cta}
                        data-track-cta-location="pricing"
                        onClick={(e) => {
                          e.stopPropagation();
                          trackFeature("pricing", "tier_cta_clicked", {
                            tier: tier.name,
                            billing: annual ? "annual" : "monthly",
                          });
                          if (tier.name === "Starter") {
                            trackConversion("signup_start", {
                              source: "pricing",
                              tier: "starter",
                            });
                          }
                        }}
                      >
                        {tier.cta}
                      </Link>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* ── Build Your Plan CTA ── */}
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => {
                setShowConfigurator(!showConfigurator);
                trackFeature("pricing", "toggle_configurator", {
                  visible: !showConfigurator,
                });
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-teal-dark transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              {showConfigurator
                ? "Hide pricing calculator"
                : "Build your custom plan →"}
            </button>
          </div>

          {/* ── Interactive Configurator ── */}
          {showConfigurator && (
            <div className="mt-8 space-y-10 animate-in fade-in slide-in-from-top-4 duration-500">
              {/* Team Size */}
              <TeamSizeSlider teamSize={teamSize} setTeamSize={setTeamSize} volumeDiscounts={VOLUME_DISCOUNTS} />

              {/* Product Add-ons */}
              <ProductConfigurator
                selectedAddOns={selectedAddOns}
                toggleAddOn={toggleAddOn}
                annual={annual}
                addOns={PRODUCT_ADD_ONS}
              />

              {/* Price Estimator */}
              <PriceEstimator
                teamSize={teamSize}
                selectedTier={selectedTier}
                selectedAddOns={selectedAddOns}
                annual={annual}
                pricingTiers={PRICING_TIERS}
                addOns={PRODUCT_ADD_ONS}
                volumeDiscounts={VOLUME_DISCOUNTS}
              />
            </div>
          )}

          {/* ── Impact Metrics ── */}
          <ImpactSection isVisible={isVisible} />

          {/* ── Feature Comparison ── */}
          <FeatureComparisonTable isVisible={isVisible} />

          {/* ── Footer ── */}
          <div className="mt-12 text-center space-y-3">
            <div className="inline-flex items-center gap-4 text-sm text-theme-m">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-teal" /> SOC 2 compliant
              </span>
              <span className="text-theme-m/30">·</span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-teal" /> 99.9% uptime SLA
              </span>
              <span className="text-theme-m/30">·</span>
              <span>Unlimited members on all paid plans</span>
            </div>
            <p className="text-sm text-theme-m">
              Need a custom deal for your org?{" "}
              <Link
                href="/contact"
                className="font-medium text-teal/70 hover:text-teal"
              >
                Let&apos;s talk &rarr;
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
