"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/lib/constants";
import { PLATFORM_CONNECTION_FLOWS } from "@/lib/product-landing-content";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
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
  return typeof color === "string" && !color.startsWith("url") ? color : "#F05A28";
}

function PlatformConnectIllustration({ visible }: { visible: boolean }) {
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
            <span className="flex h-full w-full items-center justify-center" style={{ color }}>
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
        "relative mx-auto w-full max-w-[440px] transition-all duration-700 sm:max-w-[480px]",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
    >
      <TeamworkGraphCanvas
        visible={visible}
        variant="light"
        minHeight={380}
        center={
          <div className="flex flex-col items-center">
            <div
              className="relative flex h-[88px] w-[88px] flex-col items-center justify-center rounded-3xl border-2 bg-white shadow-[0_18px_40px_-12px_rgba(240,90,40,0.35)]"
              style={{ borderColor: "rgba(240,90,40,0.35)" }}
            >
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

export function PlatformConnectSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="platform-connect"
      className="light-surface-typography relative overflow-hidden bg-fynk-surface-alt px-4 py-12 sm:py-20 lg:py-28"
    >
      <FynkGradientBackdrop intensity="soft" />

      <div ref={ref} className="relative z-[1] mx-auto max-w-container">
        <FynkReveal visible={isVisible} className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-fynk-orange">
            How it connects
          </p>
          <FynkDisplayHeading align="center" className="mt-3">
            Every signal flows{" "}
            <FynkHeadingUnderlineAccent variant="teal">
              to the right place.
            </FynkHeadingUnderlineAccent>
          </FynkDisplayHeading>
          <FynkSubheading className="mx-auto mt-4 max-w-2xl">
            Revenue, capacity, design scope, debt, and incidents — each product captures a slice of
            reality. NEXUS ties them together so nothing falls through the cracks.
          </FynkSubheading>
        </FynkReveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <FynkReveal visible={isVisible} direction="left">
            <div className="space-y-3">
              {PLATFORM_CONNECTION_FLOWS.map(({ from, fromColor, to, toColor, desc }) => (
                <div
                  key={`${from}-${to}`}
                  className="flex items-center gap-3 rounded-xl border border-fynk-border bg-white px-4 py-3 transition-colors hover:shadow-sm"
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
            <PlatformConnectIllustration visible={isVisible} />
          </FynkReveal>
        </div>

        <FynkReveal
          visible={isVisible}
          className="mt-12 overflow-hidden rounded-[1.75rem] border border-fynk-border bg-gradient-to-r from-fynk-orange-light via-white to-blue-50 p-6 sm:mt-16 sm:p-8"
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
