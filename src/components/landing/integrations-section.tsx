"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { INTEGRATIONS } from "@/lib/constants";
import { BrandIcon, getBrandColor } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function IntegrationsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-teal dark-section px-4 py-16 sm:py-24 transition-colors duration-300">
      <div
        ref={ref}
        className="mx-auto max-w-container"
      >
        {/* Header */}
        <div
          className={cn(
            "text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent-lime">
            Integrations
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-heading-1">
            Empowering Top Companies with Seamless Integrations
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] text-body-lg text-white/70">
            Connect in minutes. Works with Jira, Linear, GitHub, Slack, and 100+
            tools. No custom development required.
          </p>
        </div>

        {/* Logo grid — like Clause "Don't replace. Integrate." */}
        <div
          className={cn(
            "mt-12 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {INTEGRATIONS.slice(0, 12).map((integration, i) => {
            const color = getBrandColor(integration.name);
            return (
              <div
                key={integration.name}
                className={cn(
                  "group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition-all duration-500 hover:bg-white/[0.12] hover:border-accent-lime/20 hover:shadow-lg",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                )}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <BrandIcon
                    name={integration.name}
                    size={24}
                    className="opacity-90"
                    colored
                  />
                </div>
                <span className="text-xs font-medium text-white/60 group-hover:text-white/80">
                  {integration.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={cn(
            "mt-10 text-center transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <Button
            variant="primary"
            className="gap-2 rounded-full bg-accent-lime text-teal hover:bg-accent-lime/90 px-8"
            asChild
          >
            <Link href="/integrations">
              View All Features
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
