"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";
import {
  FynkDisplayHeading,
  FynkGradientBackdrop,
  FynkHeadingUnderlineAccent,
  FynkReveal,
  FynkSubheading,
} from "@/components/marketing/fynk-primitives";
import { ColoredIconBadge } from "@/components/marketing/colored-icon-badge";
import {
  PRODUCT_GRADIENTS,
  PRODUCT_ICON_SET,
} from "@/components/marketing/landing-section-icons";

function StatusBadge({ status, label }: { status: string; label: string }) {
  const styles =
    status === "available"
      ? "bg-fynk-orange-light text-fynk-orange border-fynk-orange/20"
      : status === "coming-soon"
        ? "bg-amber-50 text-amber-700 border-amber-200/60"
        : "bg-fynk-surface-alt text-fynk-muted border-fynk-border";

  return (
    <span className={cn("rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide", styles)}>
      {label}
    </span>
  );
}

export function ProductsShowcaseSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { localizedPath } = useLocale();

  return (
    <section
      id="products"
      className="light-surface-typography relative overflow-hidden bg-white px-4 py-12 sm:py-16 lg:py-24"
    >
      <FynkGradientBackdrop intensity="soft" />

      <div ref={ref} className="relative z-[1] mx-auto max-w-container">
        <FynkReveal visible={isVisible} className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-fynk-orange">
            The platform
          </p>
          <FynkDisplayHeading align="center" className="mt-3">
            Six products.{" "}
            <FynkHeadingUnderlineAccent variant="violet">
              One operating system.
            </FynkHeadingUnderlineAccent>
          </FynkDisplayHeading>
          <FynkSubheading className="mx-auto mt-4 max-w-2xl">
            Start with ATLAS — an intelligence layer on the board you already use. Add the rest as you
            grow — each product has its own job, and they all connect through NEXUS.
          </FynkSubheading>
        </FynkReveal>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => {
            const Icon = PRODUCT_ICON_SET[product.key as keyof typeof PRODUCT_ICON_SET];
            const color =
              typeof product.color === "string" && !product.color.startsWith("url")
                ? product.color
                : "#F05A28";
            const isNexus = product.key === "nexus";

            return (
              <Link
                key={product.key}
                href={localizedPath(product.href)}
                className={cn(
                  "group block rounded-[1.5rem] border border-fynk-border bg-fynk-surface-alt p-5 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:p-6",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                  isNexus && "ring-1 ring-fynk-orange/15",
                )}
                style={{ transitionDelay: isVisible ? `${120 + i * 50}ms` : "0ms" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <ColoredIconBadge
                    size="md"
                    bg={PRODUCT_GRADIENTS[product.key]}
                    ringColor="rgba(255,255,255,0.9)"
                  >
                    <Icon className="h-6 w-6" />
                  </ColoredIconBadge>
                  <StatusBadge status={product.status} label={product.statusLabel} />
                </div>

                <h3 className="mt-4 font-heading text-lg font-bold text-fynk-ink">{product.name}</h3>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide" style={{ color }}>
                  {product.tagline}
                </p>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fynk-muted">
                  {product.description}
                </p>

                <span
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2"
                  style={{ color }}
                >
                  Explore {product.name}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
