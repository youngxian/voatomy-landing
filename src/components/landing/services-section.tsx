"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SERVICES_GRID } from "@/lib/constants";
import { buildProductCheckoutUrl } from "@/lib/product-purchase";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  Target,
  Sparkles,
  Users,
  ShieldCheck,
  Plug,
  BarChart3,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { SectionBackgroundDecor } from "@/components/marketing/section-background-decor";
import { FloatingPictureFrame } from "@/components/marketing/floating-picture-frame";
import { MARKETING_IMAGES } from "@/lib/marketing-images";

const ICON_MAP = {
  target: Target,
  sparkles: Sparkles,
  users: Users,
  "shield-check": ShieldCheck,
  plug: Plug,
  "bar-chart": BarChart3,
} as const;

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:py-24 transition-colors duration-300">
      <SectionBackgroundDecor tone="white" />
      <div ref={ref} className="relative z-[1] mx-auto max-w-container">
        <div
          className={cn(
            "text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/15 bg-teal/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal">
            Our Platform
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1">
            Efficient and Integrated Product Services
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-body-lg text-charcoal/60">
            Sprint planning, AI estimation, and delivery analytics — one platform for your entire workflow.
          </p>
        </div>

        {/* Clause-style bento: Large feature card + smaller grid */}
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {/* Large featured card with image */}
          <div
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-charcoal/10 bg-cream p-8 transition-all duration-500 hover:shadow-lg",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            {SERVICES_GRID[0] && (
              <>
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/10">
                    <Target className="h-6 w-6 text-teal" strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-charcoal/30 transition-all group-hover:text-teal group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-charcoal">
                  {SERVICES_GRID[0].title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                  {SERVICES_GRID[0].description}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Link
                    href={buildProductCheckoutUrl({ product: "atlas", plan: "pro" })}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
                  >
                    Start 14-day trial <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link href="/products/atlas" className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline">
                    Explore ATLAS <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                {/* Dashboard mockup visual */}
                <FloatingPictureFrame className="mt-6" delay={0.05}>
                  <div className="overflow-hidden rounded-xl border border-charcoal/10 bg-white shadow-md">
                    <div className="flex items-center gap-1.5 border-b border-charcoal/10 px-3 py-2">
                      <span className="h-2 w-2 rounded-full bg-red-400/50" />
                      <span className="h-2 w-2 rounded-full bg-yellow-400/50" />
                      <span className="h-2 w-2 rounded-full bg-green-400/50" />
                    </div>
                    <div className="flex h-32 items-end justify-between gap-1 p-4">
                      {[40, 65, 50, 80, 55, 90, 45, 70, 60, 85].map((h, j) => (
                        <div
                          key={j}
                          className="flex-1 rounded-t bg-teal/25 transition-all group-hover:bg-teal/40"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </FloatingPictureFrame>
              </>
            )}
          </div>

          {/* Right side: 2x2 grid of smaller cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {SERVICES_GRID.slice(1, 5).map((service, i) => {
              const Icon = ICON_MAP[service.icon];
              return (
                <article
                  key={service.title}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-charcoal/10 bg-cream p-6 transition-all duration-500 hover:border-teal/20 hover:shadow-md",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8",
                  )}
                  style={{ transitionDelay: isVisible ? `${(i + 1) * 80}ms` : "0ms" }}
                >
                  <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-teal/[0.04] transition-transform duration-500 group-hover:scale-[2]" />
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal/10">
                    <Icon className="h-5 w-5 text-teal" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-charcoal">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal/60">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom wide card */}
        {SERVICES_GRID[5] && (
          <div
            className={cn(
              "mt-4 group relative overflow-hidden rounded-2xl border border-charcoal/10 bg-teal p-8 transition-all duration-500 hover:shadow-lg",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <BarChart3 className="h-5 w-5 text-accent-lime" strokeWidth={1.5} />
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {SERVICES_GRID[5].title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
                  {SERVICES_GRID[5].description}
                </p>
              </div>
              <FloatingPictureFrame delay={0.2}>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src={MARKETING_IMAGES.dashboardMood}
                    alt="Analytics dashboard preview"
                    width={640}
                    height={360}
                    className="h-36 w-64 object-cover opacity-90"
                    sizes="256px"
                  />
                </div>
              </FloatingPictureFrame>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
