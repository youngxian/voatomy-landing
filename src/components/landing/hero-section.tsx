"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSectionTracker } from "@/hooks/use-analytics";
import { useSession } from "@/hooks/use-session";
import { trackConversion } from "@/lib/analytics";
import {
  FynkInlineAvatarCluster,
  FynkInlineDocIcon,
  FynkEventPill,
  FynkRibbonBackdrop,
  FynkRatingBadge,
  FynkButtonPrimary,
  FynkButtonSecondary,
  FynkPaperPlane,
} from "@/components/marketing/fynk-primitives";
import { useDictionary, useLocale } from "@/i18n/locale-provider";

const AVATAR_SEEDS = ["Maya", "Theo", "Sasha"] as const;

function HeroReveal({
  children,
  loaded,
  delayMs = 0,
  className,
  variant = "fade",
}: {
  children: React.ReactNode;
  loaded: boolean;
  delayMs?: number;
  className?: string;
  variant?: "fade" | "scale";
}) {
  return (
    <div
      className={cn(
        !loaded && "opacity-0",
        loaded && variant === "fade" && "animate-hero-fade-up",
        loaded && variant === "scale" && "animate-hero-scale-in",
        className,
      )}
      style={loaded ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function HeroSection() {
  const [loaded, setLoaded] = React.useState(false);
  const sectionRef = useSectionTracker("hero", "Hero Section");
  const { isLoggedIn, dashboardUrl } = useSession();
  const dict = useDictionary();
  const t = dict.hero;
  const nav = dict.nav;
  const { localizedPath } = useLocale();

  React.useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden bg-white px-4 pb-12 pt-20 sm:pb-20 sm:pt-24 lg:pt-28"
    >
      <FynkRibbonBackdrop className="animate-fynk-ambient" />

      <div
        className="pointer-events-none absolute right-0 top-24 z-[1] hidden w-[180px] animate-float-slow md:block md:w-[220px] lg:right-6 lg:top-28 lg:w-[260px]"
        aria-hidden
      >
        <FynkPaperPlane />
      </div>

      <div className="relative z-[2] mx-auto max-w-container">
        {/* fynk stack: webinar → headline → sub → CTAs → ratings */}
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <HeroReveal loaded={loaded} delayMs={0}>
            <FynkEventPill href={localizedPath("/demo")} icon="calendar">
              {t.webinarPill}
            </FynkEventPill>
          </HeroReveal>

          <HeroReveal loaded={loaded} delayMs={80} className="mt-8 sm:mt-10">
            <h1 className="font-heading text-balance text-[2.875rem] font-bold leading-[1.04] tracking-[-0.045em] text-fynk-ink sm:text-[3.875rem] md:text-[4.5rem] md:leading-[1.02] lg:text-[5.125rem] lg:leading-[0.98]">
              <span className="inline">
                {t.headlinePrefix}{" "}
                <FynkInlineAvatarCluster seeds={AVATAR_SEEDS} size="lg" /> {t.headlineBridge}{" "}
                <FynkInlineDocIcon className="[&_span]:h-12 [&_span]:w-12 sm:[&_span]:h-16 sm:[&_span]:w-16 [&_svg]:h-6 [&_svg]:w-6 sm:[&_svg]:h-8 sm:[&_svg]:w-8" /> {t.headlineSuffix.replace(/\.$/, "")}
                <span className="text-fynk-ink">.</span>
              </span>
            </h1>
          </HeroReveal>

          <HeroReveal loaded={loaded} delayMs={160} className="mt-7 sm:mt-8">
            <p className="mx-auto max-w-[56ch] text-body-base text-fynk-muted sm:text-body-lg lg:text-[1.3125rem] lg:leading-[1.55]">
              {t.subheadline}
            </p>
          </HeroReveal>

          <HeroReveal loaded={loaded} delayMs={240} className="mt-9 sm:mt-10">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <FynkButtonPrimary
                href={isLoggedIn ? dashboardUrl : localizedPath("/auth/signup")}
                variant="ink"
                data-track-cta={isLoggedIn ? "hero-cta-dashboard" : "hero-cta-primary"}
                data-track-cta-location="hero"
                onClick={() => !isLoggedIn && trackConversion("signup_start", { source: "hero" })}
              >
                {isLoggedIn ? nav.goToDashboard : t.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </FynkButtonPrimary>
              <FynkButtonSecondary href={localizedPath("/demo")}>{t.ctaSecondary}</FynkButtonSecondary>
            </div>
          </HeroReveal>

          <HeroReveal loaded={loaded} delayMs={320} className="mt-6">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <FynkRatingBadge score={t.ratingG2} label={t.ratingG2Label} />
              <FynkRatingBadge score={t.ratingBeta} label={t.ratingBetaLabel} />
            </div>
          </HeroReveal>
        </div>

        {/* fynk video — wide card overlapping ribbon, thin ink border */}
        <div
          className={cn(
            "relative mx-auto mt-12 w-full sm:mt-14 lg:mt-16",
            loaded ? "animate-hero-scale-in" : "opacity-0",
          )}
          style={{ animationDelay: "400ms" }}
        >
          <div className="group relative mx-auto w-full overflow-hidden rounded-[32px] border border-fynk-ink/20 bg-white shadow-[0_12px_48px_rgba(17,24,39,0.1)] transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(17,24,39,0.14)] sm:rounded-[40px]">
            <div className="relative aspect-[16/9] w-full bg-gradient-to-b from-white via-fynk-surface-alt/50 to-white">
              <div
                className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-55"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 18% 28%, rgba(240,90,40,0.14), transparent 42%), radial-gradient(circle at 82% 72%, rgba(59,130,246,0.12), transparent 38%)",
                }}
              />
              <Link
                href={localizedPath("/demo")}
                className="group/play absolute left-1/2 top-1/2 flex h-[5.5rem] w-[5.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#E8EAED] shadow-inner transition-all duration-300 hover:scale-110 hover:bg-[#dfe2e6] sm:h-28 sm:w-28"
                aria-label="Watch demo video"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[#E8EAED] opacity-70 animate-pulse-ring"
                />
                <Play className="relative ml-1.5 h-9 w-9 fill-fynk-muted text-fynk-muted transition-colors group-hover/play:fill-fynk-ink group-hover/play:text-fynk-ink sm:h-10 sm:w-10" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
