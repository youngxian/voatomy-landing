"use client";

import { Play, Monitor, CheckCircle2, BarChart3, Zap, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionBackgroundDecor } from "@/components/marketing/section-background-decor";
import { FloatingPictureFrame } from "@/components/marketing/floating-picture-frame";
import { MARKETING_IMAGES } from "@/lib/marketing-images";

export function DemoSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="demo" className="relative overflow-hidden bg-white px-4 py-16 sm:py-24 transition-colors duration-300">
      <SectionBackgroundDecor tone="white" />
      <div
        ref={ref}
        className={cn(
          "relative z-[1] mx-auto max-w-container transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
      >
        {/* Two-column layout: left text + right video */}
        <div className="grid gap-12 lg:grid-cols-5 lg:items-center">
          {/* Left: Text content */}
          <div className="lg:col-span-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky/20 bg-sky-light px-3 py-1 text-xs font-bold uppercase tracking-widest text-sky">
              <Monitor className="h-3 w-3" />
              See It in Action
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1">
              See ATLAS plan a real sprint in 3 minutes.
            </h2>
            <p className="mt-3 text-body-lg text-charcoal/60">
              Watch how six data signals converge into one intelligent sprint plan.
            </p>

            {/* Feature pills */}
            <div className="mt-6 space-y-3">
              {[
                { icon: CheckCircle2, text: "87% Accuracy", color: "text-sky" },
                { icon: BarChart3, text: "47 points per sprint", color: "text-sky" },
                { icon: Zap, text: "3 minute setup", color: "text-sky" },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10">
                    <Icon className={cn("h-4 w-4", color)} />
                  </span>
                  <span className="text-sm font-medium text-charcoal/70">{text}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-charcoal/40">
              No signup required to watch.
            </p>
          </div>

          {/* Right: Video frame */}
          <FloatingPictureFrame
            className={cn(
              "relative lg:col-span-3",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8",
            )}
            delay={0.15}
          >
            <div
              className={cn(
                "relative transition-all duration-700 delay-[0.2s]",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
              )}
            >
            {/* Floating badge */}
            <div className="pointer-events-none absolute -left-3 top-[15%] z-10 hidden animate-float-slow lg:block" aria-hidden>
              <div className="flex items-center gap-2 rounded-xl border border-charcoal/10 bg-white px-3 py-2 shadow-lg">
                <CheckCircle2 className="h-4 w-4 text-teal" />
                <span className="text-xs font-semibold text-charcoal">Live Sprint</span>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-2 bottom-[20%] z-10 hidden animate-float lg:block" style={{ animationDelay: "1.5s" }} aria-hidden>
              <div className="flex items-center gap-2 rounded-xl border border-accent-lime/30 bg-accent-lime/10 px-3 py-2 shadow-lg">
                <ArrowUpRight className="h-3.5 w-3.5 text-teal" />
                <span className="text-xs font-semibold text-teal">+200% velocity</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-charcoal/10 bg-cream shadow-xl transition-colors duration-300">
              <div className="flex items-center gap-2 border-b border-charcoal/10 px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/50" />
                <span className="ml-3 rounded-md bg-charcoal/5 px-3 py-0.5 text-xs text-charcoal/40">
                  atlas.voatomy.com/demo
                </span>
              </div>

              <div className="relative flex aspect-video items-center justify-center">
                <Image
                  src={MARKETING_IMAGES.codeScreen}
                  alt="ATLAS sprint planning dashboard preview"
                  width={1200}
                  height={675}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-charcoal/20" />
                <button
                  type="button"
                  className="absolute z-10 grid h-16 w-16 place-items-center rounded-full bg-accent-lime shadow-xl shadow-accent-lime/25 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-accent-lime/35 sm:h-20 sm:w-20"
                  aria-label="Play demo video"
                >
                  <Play className="ml-1 h-7 w-7 fill-teal text-teal sm:h-8 sm:w-8" />
                </button>
              </div>

              <div className="flex border-t border-charcoal/10 bg-white">
                {["Sprint Compose", "AI Estimation", "Accuracy Track"].map(
                  (tab, i) => (
                    <button
                      key={tab}
                      type="button"
                      className={cn(
                        "flex-1 px-4 py-3.5 text-xs font-semibold transition-colors",
                        i === 0
                          ? "border-b-2 border-teal text-teal bg-teal/[0.03]"
                          : "text-charcoal/40 hover:text-charcoal/60",
                      )}
                    >
                      {tab}
                    </button>
                  ),
                )}
              </div>
            </div>
            </div>
          </FloatingPictureFrame>
        </div>
      </div>
    </section>
  );
}
