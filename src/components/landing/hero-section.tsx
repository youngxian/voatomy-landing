"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HERO_CONTENT } from "@/lib/constants";
import {
  ArrowRight,
  Star,
  Sparkles,
  FileText,
  BarChart3,
  Settings2,
  TrendingUp,
  Zap,
  Users,
  Target,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSectionTracker } from "@/hooks/use-analytics";
import { useSession } from "@/hooks/use-session";
import { trackConversion } from "@/lib/analytics";
import { MARKETING_IMAGES } from "@/lib/marketing-images";

const FLOATING_ICONS = [
  { Icon: Sparkles, position: "top-[12%] left-[6%] sm:left-[10%]", delay: "0s", size: "h-4 w-4" },
  { Icon: Target, position: "top-[28%] left-[2%] sm:left-[5%]", delay: "0.6s", size: "h-3.5 w-3.5" },
  { Icon: Zap, position: "top-[45%] left-[5%] sm:left-[8%]", delay: "1.2s", size: "h-3.5 w-3.5" },
  { Icon: BarChart3, position: "top-[12%] right-[6%] sm:right-[10%]", delay: "0.3s", size: "h-4 w-4" },
  { Icon: Settings2, position: "top-[32%] right-[2%] sm:right-[5%]", delay: "0.9s", size: "h-3.5 w-3.5" },
  { Icon: TrendingUp, position: "top-[48%] right-[6%] sm:right-[9%]", delay: "1.5s", size: "h-3.5 w-3.5" },
] as const;

export function HeroSection() {
  const [loaded, setLoaded] = React.useState(false);
  const sectionRef = useSectionTracker("hero", "Hero Section");
  const { isLoggedIn, dashboardUrl } = useSession();

  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden border-b border-charcoal/[0.06] bg-white px-4 pb-20 pt-24 sm:pb-24 sm:pt-28 transition-colors duration-300"
    >
      {/* Subtle gradient + grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-teal/[0.02] via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.4] animate-mesh-move"
          style={{
            backgroundImage: `linear-gradient(rgba(0,72,56,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,72,56,0.03) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
            willChange: "transform",
          }}
        />
      </div>

      {/* Floating icon bubbles — modern, prominent */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
        {FLOATING_ICONS.map(({ Icon, position, delay, size }, i) => (
          <div
            key={i}
            className={cn("absolute animate-float-slow", position)}
            style={{ animationDelay: delay }}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-charcoal/[0.08] bg-white shadow-md shadow-charcoal/[0.06]">
              <Icon className={cn(size, "text-teal")} strokeWidth={1.5} />
            </span>
          </div>
        ))}
      </div>

      <div className="relative z-[2] mx-auto max-w-container text-center">
        {/* Eyebrow badge with icon */}
        <div
          className={cn(
            "transition-all duration-700 delay-[0s]",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/5 px-4 py-2 text-sm font-semibold text-teal">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            {HERO_CONTENT.eyebrow}
          </span>
        </div>

        {/* Headline */}
        <h1
          className={cn(
            "mx-auto mt-8 max-w-[900px] text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-charcoal sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-[0.1s]",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          {HERO_CONTENT.headline}
        </h1>

        {/* Subheadline — ~60ch max for comprehension (B2B readability norms) */}
        <p
          className={cn(
            "mx-auto mt-6 max-w-[60ch] text-lg leading-relaxed text-charcoal/65 transition-all duration-700 delay-[0.2s] sm:text-[1.0625rem]",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          {HERO_CONTENT.subheadline}
        </p>

        {/* CTA row — pill buttons */}
        <div
          className={cn(
            "mx-auto mt-10 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-[0.3s]",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <Button
            variant="primary"
            size="lg"
            className="h-12 min-h-[48px] gap-2 rounded-full border-0 bg-[#f16e2c] px-8 text-[15px] text-white shadow-lg shadow-[#f16e2c]/25 transition-colors hover:bg-[#e06222] focus-visible:ring-2 focus-visible:ring-[#f16e2c]/50 sm:h-12"
            asChild
          >
            <Link
              href={isLoggedIn ? dashboardUrl : "/auth/signup"}
              data-track-cta={isLoggedIn ? "hero-cta-dashboard" : "hero-cta-primary"}
              data-track-cta-text={isLoggedIn ? "Go to Dashboard" : HERO_CONTENT.ctaPrimary}
              data-track-cta-location="hero"
              onClick={() => !isLoggedIn && trackConversion("signup_start", { source: "hero" })}
            >
              {isLoggedIn ? "Go to Dashboard" : HERO_CONTENT.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="h-12 min-h-[48px] gap-2 rounded-full border-2 border-charcoal/15 bg-white px-8 text-[15px] text-charcoal shadow-sm hover:border-charcoal/30 hover:bg-charcoal/[0.04]"
            asChild
          >
            <Link
              href="/demo"
              data-track-cta="hero-cta-secondary"
              data-track-cta-text={HERO_CONTENT.ctaSecondary}
              data-track-cta-location="hero"
            >
              {HERO_CONTENT.ctaSecondary}
            </Link>
          </Button>
        </div>

        <p
          className={cn(
            "mt-3 text-center text-sm text-charcoal/45 transition-all duration-700 delay-[0.35s]",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          {HERO_CONTENT.ctaRiskReducer}
        </p>

        {/* Comprehension chips — scannable “why us” before the fold (F-pattern) */}
        <ul
          className={cn(
            "mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:mt-9 sm:grid-cols-3 sm:gap-4 transition-all duration-700 delay-[0.38s]",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          {HERO_CONTENT.valuePills.map((item) => (
            <li
              key={item.label}
              className="flex gap-2.5 rounded-2xl border border-charcoal/[0.08] bg-charcoal/[0.02] px-4 py-3 text-left sm:flex-col sm:px-3.5 sm:py-3.5"
            >
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-[#f16e2c] sm:mt-0"
                strokeWidth={2}
                aria-hidden
              />
              <div>
                <p className="text-sm font-semibold text-charcoal">{item.label}</p>
                <p className="mt-0.5 text-xs leading-snug text-charcoal/50">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Star rating + social proof with icon */}
        <div
          className={cn(
            "mt-8 flex flex-col items-center justify-center gap-2 sm:mt-9 sm:flex-row sm:gap-3 transition-all duration-700 delay-[0.42s]",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <div className="flex items-center gap-0.5 rounded-lg border border-charcoal/8 bg-white px-3 py-1.5 shadow-sm">
            <div className="flex gap-0.5" aria-hidden="true">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
              <Star className="h-4 w-4 fill-amber-400/60 text-amber-400" />
            </div>
            <span className="ml-1.5 text-sm font-semibold text-charcoal">4.8</span>
          </div>
          <span className="max-w-[20rem] text-center text-sm text-charcoal/50 sm:text-left">
            {HERO_CONTENT.socialProof}
          </span>
        </div>

        {/* Bento card grid */}
        <div
          className={cn(
            "mx-auto mt-14 max-w-5xl transition-all duration-700 delay-[0.5s]",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-12 lg:gap-4">
            {/* Card 1: Image — tall left */}
            <div className="col-span-1 row-span-2 lg:col-span-3 relative min-h-[200px] overflow-hidden rounded-2xl border border-charcoal/10 shadow-lg sm:min-h-[260px]">
              <Image
                src={MARKETING_IMAGES.heroTeam}
                alt="Team collaborating on sprint planning"
                width={800}
                height={1040}
                className="h-full w-full object-cover"
                priority
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-teal/[0.07]" />
            </div>

            {/* Card 2: Teal stat with icon */}
            <div className="col-span-1 lg:col-span-2 rounded-2xl bg-teal p-5 text-left shadow-lg shadow-teal/20">
              <Users className="h-6 w-6 text-white/80" strokeWidth={1.5} />
              <div className="mt-3 text-3xl font-bold text-white">
                {HERO_CONTENT.statCards[1].value}
              </div>
              <div className="mt-1 text-xs leading-snug text-white/70">
                {HERO_CONTENT.statCards[1].label}
              </div>
            </div>

            {/* Card 3: White info card with icon */}
            <div className="col-span-2 lg:col-span-4 rounded-2xl border border-charcoal/10 bg-white p-5 text-left shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal/10">
                    <FileText className="h-4 w-4 text-teal" strokeWidth={2} />
                  </span>
                  <span className="text-xs font-medium text-charcoal/60">Total Projects</span>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-accent-lime/20 px-2.5 py-1 text-[10px] font-semibold text-teal">
                  <TrendingUp className="h-2.5 w-2.5" /> 8%
                </span>
              </div>
              <div className="mt-3 text-3xl font-bold text-charcoal">
                {HERO_CONTENT.statCards[2].value}
              </div>
              <div className="mt-1 text-xs text-charcoal/50">
                Increase of <span className="font-medium text-teal">126</span> this month
              </div>
            </div>

            {/* Card 4: Tall teal card with icon */}
            <div className="col-span-1 lg:col-span-3 row-span-2 flex flex-col justify-between rounded-2xl bg-teal p-5 text-left shadow-lg shadow-teal/20 min-h-[200px] sm:min-h-[260px]">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Settings2 className="h-5 w-5 text-white/90" strokeWidth={1.5} />
              </span>
              <p className="text-sm font-medium leading-snug text-white/95">
                One plan the whole team can defend—EM, PM, and ICs aligned.
              </p>
            </div>

            {/* Card 5: Lime stat with icon */}
            <div className="col-span-1 lg:col-span-2 rounded-2xl bg-accent-lime/25 border border-accent-lime/30 p-5 text-left">
              <Zap className="h-5 w-5 text-teal/70" strokeWidth={1.5} />
              <div className="mt-2 text-3xl font-bold text-teal">
                {HERO_CONTENT.statCards[3].value}
              </div>
              <div className="mt-1 text-xs leading-snug text-teal/70">
                {HERO_CONTENT.statCards[3].label}
              </div>
            </div>

            {/* Card 6: Teams stat with icon + chart */}
            <div className="col-span-1 lg:col-span-4 rounded-2xl border border-charcoal/10 bg-white p-5 text-left shadow-md">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-lime/20">
                  <Sparkles className="h-4 w-4 text-teal" strokeWidth={2} />
                </span>
                <span className="text-xs font-medium text-charcoal/60">Active Teams</span>
              </div>
              <div className="mt-3 text-3xl font-bold text-charcoal">
                {HERO_CONTENT.statCards[4].value}
              </div>
              <div className="mt-2 flex h-6 items-end gap-0.5">
                {[55, 70, 45, 85, 60, 90, 50].map((h, j) => (
                  <div
                    key={j}
                    className="w-2 flex-1 rounded-sm bg-teal/30"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
