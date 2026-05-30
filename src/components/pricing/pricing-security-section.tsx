"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { FynkEyebrow, FynkHeading } from "@/components/marketing/fynk-primitives";
import { PRICING_SECURITY_FEATURES, PRICING_TRUST_LOGOS } from "@/lib/pricing-page-data";
import { FileKey2, Globe2, Lock, Shield } from "lucide-react";

const SEC_ICONS = {
  eu: Globe2,
  lock: Lock,
  key: FileKey2,
  gdpr: Shield,
} as const;

export function PricingSecuritySection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden bg-[#111827] px-4 py-20 text-white sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[length:32px_32px] opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
        }}
      />

      <div ref={ref} className="relative mx-auto max-w-container">
        <div
          className={cn(
            "text-center transition-all duration-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <FynkEyebrow className="text-white/50">Security & Compliance</FynkEyebrow>
          <FynkHeading as="h2" className="mt-4 text-white sm:text-display-3">
            We protect your data. Always.
          </FynkHeading>
        </div>

        <div className="relative mt-16 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          {/* Left column */}
          <div className="space-y-10">
            {PRICING_SECURITY_FEATURES.filter((f) => f.side === "left").map((item, i) => {
              const Icon = SEC_ICONS[item.icon as keyof typeof SEC_ICONS];
              return (
                <div
                  key={item.title}
                  className={cn(
                    "flex gap-4 transition-all duration-700 lg:flex-row-reverse lg:text-right",
                    isVisible ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0",
                  )}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Icon className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="font-heading text-body-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-white/60">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center doc + shield visual */}
          <div
            className={cn(
              "mx-auto flex h-48 w-40 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-2xl transition-all duration-700 sm:h-56 sm:w-48",
              isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0",
            )}
          >
            <div className="flex h-24 w-20 flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/20 bg-white/5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">DOC</span>
              <Shield className="mt-2 h-10 w-10 text-sky-400" strokeWidth={1.25} />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-10">
            {PRICING_SECURITY_FEATURES.filter((f) => f.side === "right").map((item, i) => {
              const Icon = SEC_ICONS[item.icon as keyof typeof SEC_ICONS];
              return (
                <div
                  key={item.title}
                  className={cn(
                    "flex gap-4 transition-all duration-700",
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
                  )}
                  style={{ transitionDelay: `${i * 100 + 200}ms` }}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Icon className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="font-heading text-body-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-white/60">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust logos bar */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <p className="mb-6 text-center text-body-sm text-white/40">
            Widely trusted by engineering teams worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-50 grayscale">
            {PRICING_TRUST_LOGOS.slice(0, 8).map((name) => (
              <span key={name} className="text-body-base font-semibold text-white/70">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
