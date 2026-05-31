"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useLocale } from "@/i18n/locale-provider";
import { VoatomyLogoMark } from "@/components/icons/voatomy-logo-mark";
import {
  FynkDisplayHeading,
  FynkGradientBackdrop,
  FynkHeadingUnderlineAccent,
  FynkReveal,
  FynkSubheading,
} from "@/components/marketing/fynk-primitives";
import { ColoredIconBadge } from "@/components/marketing/colored-icon-badge";
import {
  PRODUCT_FLOW_LABELS,
  PRODUCT_GRADIENTS,
  PRODUCT_ICON_SET,
  ProductNexusIcon,
} from "@/components/marketing/landing-section-icons";
import { TeamworkGraphCanvas } from "@/components/marketing/teamwork-graph-canvas";
import { GraphLabelPill } from "@/components/marketing/graph-node-primitives";
import { PRODUCT_GRAPH_POSITIONS } from "@/lib/graph-layout";
import { ArrowRight } from "lucide-react";

const ORBIT_PRODUCTS = PRODUCTS.filter((p) => p.key !== "nexus");

function productColor(color: string) {
  // NEXUS has color "url(#nexus-gradient)" — fall back to fynk-orange (brand accent)
  // rather than the legacy teal so it matches the rest of the section.
  return typeof color === "string" && !color.startsWith("url") ? color : "#F05A28";
}

function ProductEcosystemIllustration({ visible }: { visible: boolean }) {
  const nodes = ORBIT_PRODUCTS.map((product) => {
    const pos = PRODUCT_GRAPH_POSITIONS[product.key];
    const Icon = PRODUCT_ICON_SET[product.key as keyof typeof PRODUCT_ICON_SET];
    const color = productColor(product.color);

    return {
      key: product.key,
      x: pos.x,
      y: pos.y,
      lineColor: color,
      lineOpacity: 0.45,
      node: (
        <GraphLabelPill
          label={product.name}
          color={color}
          dark={false}
          icon={
            <span
              className="flex h-full w-full items-center justify-center"
              style={{ color }}
            >
              <Icon className="h-4 w-4" />
            </span>
          }
        />
      ),
    };
  });

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[520px] transition-all duration-700",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
    >
      <TeamworkGraphCanvas
        visible={visible}
        variant="light"
        minHeight={460}
        center={
          <div className="flex flex-col items-center">
            {/* Light-paper NEXUS hub with fynk-orange accent ring */}
            <div
              className="relative flex h-[88px] w-[88px] flex-col items-center justify-center rounded-3xl border-2 bg-white shadow-[0_18px_40px_-12px_rgba(240,90,40,0.35)]"
              style={{ borderColor: "rgba(240,90,40,0.35)" }}
            >
              {/* faint orange wash inside */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0.5 rounded-[20px] bg-fynk-orange-light/60"
              />
              <div className="relative flex h-10 w-10 items-center justify-center">
                <VoatomyLogoMark className="absolute h-8 w-8 opacity-20" />
                <ProductNexusIcon className="relative h-9 w-9" />
              </div>
              <span className="relative mt-1 font-heading text-[10px] font-bold uppercase tracking-[0.18em] text-fynk-orange">
                NEXUS
              </span>
            </div>
            <span className="mt-3 rounded-full border border-fynk-border bg-white px-3 py-1 text-[10px] font-semibold text-fynk-muted shadow-sm">
              {PRODUCT_FLOW_LABELS.nexus}
            </span>
          </div>
        }
        nodes={nodes}
      />

      {/* Legend */}
      <div className="mt-5 flex flex-wrap justify-center gap-4 text-[11px] font-semibold text-fynk-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-fynk-orange" /> Available now
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-400" /> Coming soon
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-fynk-border-hover" /> Future
        </span>
      </div>
    </div>
  );
}

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

export function ProductEcosystemSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { localizedPath } = useLocale();

  return (
    <section className="light-surface-typography relative overflow-hidden bg-white px-4 py-12 sm:py-20 lg:py-28">
      <FynkGradientBackdrop />

      <div ref={ref} className="relative z-[1] mx-auto max-w-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <FynkReveal visible={isVisible} direction="left">
            <FynkDisplayHeading>
              Six products.{" "}
              <FynkHeadingUnderlineAccent variant="violet">
                One connected system.
              </FynkHeadingUnderlineAccent>
            </FynkDisplayHeading>
            <FynkSubheading className="mt-5 text-left lg:mx-0">
              Start with ATLAS when you need better sprint plans. Add LOOP, SIGNAL, DRIFT, and PHANTOM
              as you grow — NEXUS brings every signal together so nothing falls through the cracks.
            </FynkSubheading>

            {/* Flow summary */}
            <div className="mt-8 space-y-3">
              {[
                { from: "ATLAS", fromColor: "#F05A28", to: "NEXUS", toColor: "#111827", desc: "Sprint plans your leads can defend in any meeting" },
                { from: "LOOP", fromColor: "#6366F1", to: "ATLAS", toColor: "#F05A28", desc: "Customer demand weighted into every priority call" },
                { from: "PHANTOM", fromColor: "#22D3EE", to: "ATLAS", toColor: "#F05A28", desc: "Tech debt cost visible before you commit" },
                { from: "SIGNAL", fromColor: "#EF4444", to: "NEXUS", toColor: "#111827", desc: "Revenue impact when incidents hit production" },
              ].map(({ from, fromColor, to, toColor, desc }) => (
                <div
                  key={`${from}-${to}`}
                  className="flex items-center gap-3 rounded-xl border border-fynk-border bg-fynk-surface-alt px-4 py-3 transition-colors hover:bg-white"
                >
                  <span
                    className="shrink-0 rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
                    style={{ backgroundColor: fromColor }}
                  >
                    {from}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-fynk-muted" />
                  <span
                    className="shrink-0 rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
                    style={{ backgroundColor: toColor }}
                  >
                    {to}
                  </span>
                  <span className="text-xs text-fynk-muted">{desc}</span>
                </div>
              ))}
            </div>
          </FynkReveal>

          <FynkReveal visible={isVisible} direction="right">
            <ProductEcosystemIllustration visible={isVisible} />
          </FynkReveal>
        </div>

        {/* Product cards grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                  "group block rounded-[1.5rem] border border-fynk-border bg-fynk-surface-alt p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-lg",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                  isNexus && "sm:col-span-2 lg:col-span-1 ring-1 ring-fynk-orange/15",
                )}
                style={{ transitionDelay: isVisible ? `${300 + i * 60}ms` : "0ms" }}
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
                <p className="mt-2 text-base leading-relaxed text-fynk-muted">{product.description}</p>

                <span
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors group-hover:gap-2"
                  style={{ color }}
                >
                  Explore {product.name}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* Journey strip */}
        <FynkReveal
          visible={isVisible}
          className="mt-10 overflow-hidden rounded-[1.75rem] border border-fynk-border bg-gradient-to-r from-fynk-orange-light via-white to-blue-50 p-6 sm:p-8"
        >
          <p className="text-center font-handwriting text-[1.2rem] font-bold text-fynk-orange sm:text-[1.3125rem]">
            Your journey: ATLAS today → full platform tomorrow
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {PRODUCTS.map((product, i) => {
              const Icon = PRODUCT_ICON_SET[product.key as keyof typeof PRODUCT_ICON_SET];
              return (
                <React.Fragment key={product.key}>
                  <div className="flex flex-col items-center gap-1.5">
                    <ColoredIconBadge
                      size="sm"
                      bg={PRODUCT_GRADIENTS[product.key]}
                      ringColor="rgba(255,255,255,0.9)"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </ColoredIconBadge>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-fynk-body">
                      {product.name}
                    </span>
                  </div>
                  {i < PRODUCTS.length - 1 && (
                    <ArrowRight className="hidden h-4 w-4 text-fynk-muted/50 sm:block" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </FynkReveal>
      </div>
    </section>
  );
}
