"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { FynkHeading } from "@/components/marketing/fynk-primitives";
import { PRICING_COMPARISON_GROUPS, PRICING_SECTIONS } from "@/lib/pricing-page-data";
import { Check, Minus, Scale } from "lucide-react";
import type { PricingTierUI } from "./pricing-hero-plans";

function CellValue({ value }: { value: string }) {
  if (value === "✓") {
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center">
        <Check className="h-[15px] w-[15px] text-fynk-ink" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === "—") {
    return (
      <span className="mx-auto flex h-6 w-6 items-center justify-center">
        <Minus className="h-[14px] w-[14px] text-fynk-faint" strokeWidth={2} />
      </span>
    );
  }
  return <span className="text-[13px] font-medium text-fynk-body sm:text-body-sm">{value}</span>;
}

export function PricingComparisonTable({ tiers, annual }: { tiers: PricingTierUI[]; annual: boolean }) {
  const { ref, isVisible } = useScrollAnimation();

  const formatHeaderPrice = (tier: PricingTierUI) => {
    if (tier.monthlyPrice === null) return "Contact us";
    if (tier.monthlyPrice === 0) return "$0 per user/month";
    const price = annual ? tier.annualPrice : tier.monthlyPrice;
    return `$${price} per user/month`;
  };

  const tierKeys = ["starter", "pro", "business", "enterprise"] as const;

  return (
    <section className="bg-fynk-surface-alt px-4 py-20 sm:py-28">
      <div ref={ref} className="mx-auto max-w-container">
        <div
          className={cn(
            "text-center transition-all duration-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <span className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-fynk-orange-light ring-1 ring-fynk-orange/15">
            <Scale className="h-7 w-7 text-fynk-orange" strokeWidth={1.75} />
          </span>
          <FynkHeading className="text-heading-2 sm:text-heading-1">{PRICING_SECTIONS.comparisonTitle}</FynkHeading>
        </div>

        <div
          className={cn(
            "mt-10 overflow-x-auto rounded-2xl border border-fynk-border bg-white shadow-sm transition-all duration-700 sm:mt-12",
            isVisible ? "opacity-100" : "opacity-0",
          )}
        >
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="border-b border-fynk-border">
                <th className="w-[30%] px-5 py-4 text-left sm:px-6 sm:py-5" />
                {tiers.map((tier) => (
                  <th key={tier.slug} className="w-[17.5%] px-2 py-4 text-center align-top sm:px-3 sm:py-5">
                    <p className="font-heading text-[17px] font-bold text-fynk-ink sm:text-[19px]">{tier.name}</p>
                    <p className="mt-1 text-[12px] text-fynk-muted sm:text-[13px]">{formatHeaderPrice(tier)}</p>
                    {tier.monthlyPrice === null ? (
                      <Link
                        href={tier.ctaHref}
                        className="mt-2.5 inline-flex items-center gap-0.5 text-[12px] font-semibold text-fynk-ink hover:text-fynk-orange sm:text-[13px]"
                      >
                        Contact us →
                      </Link>
                    ) : (
                      <Link
                        href={tier.ctaHref}
                        className="mt-3 inline-flex h-9 items-center justify-center rounded-full bg-fynk-ink px-4 text-[12px] font-semibold text-white transition-colors hover:bg-fynk-ink/90 sm:h-10 sm:px-5 sm:text-[13px]"
                      >
                        Get started
                      </Link>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {PRICING_COMPARISON_GROUPS.map((group) => (
                <React.Fragment key={group.group}>
                  <tr>
                    <td colSpan={5} className="border-t border-fynk-border px-5 py-3 sm:px-6 sm:py-3.5">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] sm:text-[11px]"
                        style={{ backgroundColor: group.tagBg, color: group.tagColor }}
                      >
                        <span className="text-[12px]">{group.icon}</span>
                        {group.group}
                      </span>
                    </td>
                  </tr>
                  {group.rows.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-t border-fynk-border/50 transition-colors hover:bg-fynk-surface-alt/40"
                    >
                      <td className="px-5 py-2.5 text-[13px] text-fynk-body sm:px-6 sm:py-3 sm:text-[14px]">
                        {row.feature}
                      </td>
                      {tierKeys.map((key) => (
                        <td key={key} className="px-2 py-2.5 text-center sm:px-3 sm:py-3">
                          <CellValue value={row[key]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
