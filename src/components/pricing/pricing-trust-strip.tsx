"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { BrandIcon, getBrandColor } from "@/components/icons/brand-icons";
import { FynkInlineAvatarCluster } from "@/components/marketing/fynk-primitives";
import { PRICING_TRUST_LOGOS } from "@/lib/pricing-page-data";

export function PricingTrustStrip() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="border-y border-fynk-border bg-fynk-surface-alt px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-container">
        <p
          className={cn(
            "flex flex-wrap items-center justify-center gap-3 text-center text-body-lg text-fynk-body sm:text-body-xl",
            "transition-all duration-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          More than
          <FynkInlineAvatarCluster seeds={["JK", "MT", "PS"]} size="md" />
          <span className="font-bold text-fynk-ink">1,200 teams</span>
          chose Voatomy to outgrow planning chaos
        </p>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-7">
          {PRICING_TRUST_LOGOS.map((name, i) => {
            const color = getBrandColor(name);
            return (
              <div
                key={name}
                className={cn(
                  "flex h-[88px] items-center justify-center rounded-2xl border-2 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lg sm:h-[96px] lg:rounded-3xl",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{
                  borderColor: `${color}35`,
                  backgroundColor: `${color}08`,
                  transitionDelay: `${i * 35}ms`,
                }}
              >
                <BrandIcon name={name} size={36} colored className="transition-transform hover:scale-110" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
