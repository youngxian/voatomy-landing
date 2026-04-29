"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { COMPARISON_ROWS, COMPARISON_DATA } from "@/lib/constants";
import { X, Check } from "lucide-react";

export function ComparisonSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="light-surface-typography bg-amber-light px-4 py-16 sm:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-container">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-amber/80">
              Why ATLAS
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1">
              The old way vs. the ATLAS way
            </h2>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-charcoal/10 bg-white shadow-md transition-colors duration-300">
            <div className="min-w-[500px]">
              {/* Header */}
              <div className="grid grid-cols-3 gap-px">
                <div className="p-5 text-xs font-bold uppercase tracking-widest text-charcoal/40">
                  Area
                </div>
                <div className="p-5 text-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-charcoal/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-charcoal/50">
                    <X className="h-3 w-3 text-red-400" />
                    Without ATLAS
                  </span>
                </div>
                <div className="bg-teal/[0.04] p-5 text-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal">
                    <Check className="h-3 w-3" />
                    With ATLAS
                  </span>
                </div>
              </div>

              {/* Data rows */}
              {COMPARISON_ROWS.map((row, i) => (
                <div
                  key={row}
                  className={cn(
                    "grid grid-cols-3 gap-px border-t border-charcoal/8 transition-all duration-500",
                    isVisible ? "opacity-100" : "opacity-0",
                  )}
                  style={{ transitionDelay: `${(i + 1) * 80}ms` }}
                >
                  <div className="p-5 text-sm font-medium text-charcoal/70">
                    {row}
                  </div>
                  <div className="p-5 text-center text-sm text-charcoal/50">
                    {COMPARISON_DATA.old[i]}
                  </div>
                  <div className="bg-teal/[0.04] p-5 text-center text-sm font-medium text-charcoal">
                    {COMPARISON_DATA.atlas[i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
