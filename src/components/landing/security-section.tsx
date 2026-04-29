"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SECURITY_FEATURES } from "@/lib/constants";
import {
  Shield,
  Lock,
  ShieldCheck,
  FileCode2,
  CheckCircle2,
} from "lucide-react";

const ICON_MAP = [
  Lock,
  ShieldCheck,
  Shield,
  CheckCircle2,
  FileCode2,
] as const;

export function SecuritySection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-white px-4 py-16 sm:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-container">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {/* Header — split layout: left text, right visual */}
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-teal/15 bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal shadow-sm">
                <Shield className="h-3 w-3" strokeWidth={2} />
                Security
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1">
                Your code stays yours.{" "}
                <span className="relative inline-block">
                  Always.
                  <span className="absolute -bottom-1 left-0 right-0 h-1.5 rounded-full bg-accent-lime/60" />
                </span>
              </h2>
              <p className="mt-4 max-w-[520px] text-body-lg text-charcoal/60 lg:max-w-none">
                ATLAS never stores your source code. Read-only access and
                structural metadata only.
              </p>
            </div>

            {/* Right: Large lock visual */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-teal/15 bg-white shadow-lg shadow-teal/[0.06] sm:h-40 sm:w-40">
                  <Lock className="h-14 w-14 text-teal/80 sm:h-16 sm:w-16" strokeWidth={1.5} />
                </div>
                <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/10 bg-white shadow-md">
                  <CheckCircle2 className="h-5 w-5 text-teal" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>

          {/* Feature cards — bento grid */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECURITY_FEATURES.map((feature, i) => {
              const Icon = ICON_MAP[i] ?? Lock;
              return (
                <article
                  key={feature.title}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-charcoal/10 bg-white p-6 transition-all duration-500 hover:border-teal/20 hover:shadow-md",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6",
                  )}
                  style={{
                    transitionDelay: isVisible ? `${i * 80}ms` : "0ms",
                  }}
                >
                  <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-teal/[0.04] transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10">
                      <Icon className="h-5 w-5 text-teal" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-charcoal">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                      {feature.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Compliance badges — refined grid */}
          <div className="mt-12 rounded-2xl border border-charcoal/10 bg-white p-8 shadow-sm">
            <div className="mb-6 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-charcoal/50">
                Trusted frameworks
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {[
                { label: "SOC 2", sub: "Compliant" },
                { label: "GDPR", sub: "Ready" },
                { label: "HIPAA", sub: "Aligned" },
                { label: "AES-256", sub: "At rest" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-charcoal/8 bg-cream px-6 py-4 transition-all hover:border-teal/15 hover:bg-teal/[0.02]"
                >
                  <span className="text-lg font-bold tracking-tight text-teal sm:text-xl">
                    {badge.label}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-charcoal/40">
                    {badge.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Audit bar */}
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10">
                <FileCode2 className="h-5 w-5 text-teal" strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-sm font-semibold text-charcoal">
                  Built for audit confidence
                </span>
                <p className="text-xs text-charcoal/50">
                  Controls, evidence, runbooks, checklists
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Controls", "Evidence", "Runbooks", "Checklists"].map((w) => (
                <span
                  key={w}
                  className="rounded-full border border-teal/15 bg-teal/5 px-4 py-1.5 text-xs font-semibold text-teal"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
