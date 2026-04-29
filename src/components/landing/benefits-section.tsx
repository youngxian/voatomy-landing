"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { BENEFITS_LIST } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Check, TrendingUp, Users, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionBackgroundDecor } from "@/components/marketing/section-background-decor";
import { FloatingPictureFrame } from "@/components/marketing/floating-picture-frame";
import { MARKETING_IMAGES } from "@/lib/marketing-images";

export function BenefitsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:py-24 transition-colors duration-300">
      <SectionBackgroundDecor tone="white" />
      <div
        ref={ref}
        className="relative z-[1] mx-auto grid max-w-container gap-12 lg:grid-cols-2 lg:items-center lg:gap-20"
      >
        {/* Left: Visual bento with real image + dashboard */}
        <div
          className={cn(
            "relative order-2 lg:order-1 transition-all duration-700",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
          )}
        >
          <div className="grid grid-cols-5 gap-3">
            {/* Real workspace image — spans 3 cols */}
            <FloatingPictureFrame className="col-span-3" delay={0.08}>
              <div className="overflow-hidden rounded-2xl border border-charcoal/10 shadow-md">
                <Image
                  src={MARKETING_IMAGES.collaboration}
                  alt="Team collaboration in product review"
                  width={960}
                  height={720}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FloatingPictureFrame>

            {/* Stacked stat cards — spans 2 cols */}
            <div className="col-span-2 flex flex-col gap-3">
              <div className="flex-1 rounded-2xl border border-charcoal/10 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal/10">
                    <Zap className="h-3.5 w-3.5 text-teal" />
                  </span>
                </div>
                <div className="mt-2 text-xl font-bold text-teal">1,951+</div>
                <div className="text-[10px] text-charcoal/50">Tickets Planned</div>
              </div>
              <div className="flex-1 rounded-2xl border border-accent-lime/30 bg-accent-lime/15 p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal/10">
                    <Users className="h-3.5 w-3.5 text-teal" />
                  </span>
                </div>
                <div className="mt-2 text-xl font-bold text-teal">78%</div>
                <div className="text-[10px] text-charcoal/50">Team Capacity</div>
                <div className="mt-1.5 flex h-1.5 overflow-hidden rounded-full bg-teal/10">
                  <div className="w-[78%] rounded-full bg-teal/50" />
                </div>
              </div>
            </div>

            {/* Bottom chart card — spans all 5 */}
            <div className="col-span-5 rounded-2xl border border-charcoal/10 bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-charcoal">Sprint Overview</span>
                <span className="rounded-full bg-accent-lime/20 px-2 py-0.5 text-[10px] font-semibold text-teal">
                  <TrendingUp className="mr-0.5 inline h-2.5 w-2.5" />
                  +12%
                </span>
              </div>
              <div className="flex h-16 items-end justify-between gap-1">
                {[55, 70, 45, 85, 60, 90, 50, 75, 65, 80, 55, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-teal/25 transition-all hover:bg-teal/45"
                    style={{ height: `${h}%`, minHeight: "8px" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Benefits list */}
        <div
          className={cn(
            "order-1 lg:order-2 transition-all duration-700 delay-150",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
          )}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/15 bg-teal/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal">
            Key Benefits
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1">
            Key Benefits for Your Engineering Workflow
          </h2>
          <p className="mt-3 text-body-lg text-charcoal/60">
            Data-driven sprint planning that connects capacity, priority, and code complexity in one place.
          </p>
          <ul className="mt-8 space-y-5">
            {BENEFITS_LIST.map((benefit) => (
              <li key={benefit.title} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-white shadow-sm">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <div>
                  <div className="font-semibold text-charcoal">{benefit.title}</div>
                  <div className="mt-0.5 text-sm text-charcoal/60">{benefit.desc}</div>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/products/atlas"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-dark"
          >
            Learn more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
