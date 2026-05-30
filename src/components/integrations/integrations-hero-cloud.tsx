"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BrandIcon, getBrandColor } from "@/components/icons/brand-icons";
import { HERO_FLOATING_LOGOS, LOGO_STRIP } from "@/lib/integrations-page-data";
import { FynkButtonPrimary } from "@/components/marketing/fynk-primitives";

const SIZE_MAP = {
  sm: { tile: "h-[76px] w-[76px]", icon: 32, rounded: "rounded-2xl" },
  md: { tile: "h-[92px] w-[92px]", icon: 40, rounded: "rounded-2xl" },
  lg: { tile: "h-[108px] w-[108px]", icon: 48, rounded: "rounded-3xl" },
} as const;

const DRIFT_CLASS = {
  a: "animate-logo-drift-a",
  b: "animate-logo-drift-b",
  c: "animate-logo-drift-c",
} as const;

function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[length:28px_28px] bg-dot-grid-light opacity-60" />
      <div className="absolute left-[15%] top-[20%] h-[420px] w-[420px] animate-orb-drift-1 rounded-full bg-[#F05A28]/10 blur-[90px]" />
      <div className="absolute bottom-[10%] right-[12%] h-[380px] w-[380px] animate-orb-drift-2 rounded-full bg-[#6366F1]/12 blur-[80px]" />
      <div className="absolute left-[45%] top-[55%] h-[300px] w-[300px] animate-fynk-ambient rounded-full bg-[#10B981]/8 blur-[70px]" />
    </div>
  );
}

function FloatingBrandLogo({
  logo,
  heroLoaded,
  parallaxX,
  parallaxY,
}: {
  logo: (typeof HERO_FLOATING_LOGOS)[number];
  heroLoaded: boolean;
  parallaxX: number;
  parallaxY: number;
}) {
  const brandColor = getBrandColor(logo.name);
  const { tile, icon, rounded } = SIZE_MAP[logo.size];
  const px = parallaxX * logo.depth * 10;
  const py = parallaxY * logo.depth * 10;

  return (
    <div
      className={cn(
        "pointer-events-auto absolute z-[3] hidden md:block",
        heroLoaded ? "animate-logo-pop-in" : "opacity-0",
      )}
      style={{
        left: `${logo.x}%`,
        top: `${logo.y}%`,
        transform: `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`,
        animationDelay: `${logo.delay}s`,
        transition: "transform 0.15s ease-out",
      }}
    >
      <div
        className={cn(
          "group relative flex items-center justify-center border-2 bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl",
          tile,
          rounded,
          DRIFT_CLASS[logo.drift],
        )}
        style={{
          borderColor: `${brandColor}50`,
          backgroundColor: `${brandColor}12`,
          boxShadow: `0 12px 40px ${brandColor}22, 0 4px 12px rgba(0,0,0,0.06)`,
          animationDelay: `${logo.delay + 0.5}s`,
          animationDuration: `${7 + logo.delay * 3}s`,
        }}
      >
        <span
          className="absolute -inset-1 rounded-[inherit] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundColor: `${brandColor}35` }}
        />
        <BrandIcon name={logo.name} size={icon} colored className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
      </div>
    </div>
  );
}

function MobileLogoMarquee() {
  const logos = [...LOGO_STRIP, ...LOGO_STRIP];

  return (
    <div className="relative mt-10 overflow-hidden md:hidden" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent" />
      <div className="flex w-max animate-marquee-scroll gap-4 py-2">
        {logos.map((name, i) => {
          const brandColor = getBrandColor(name);
          return (
            <div
              key={`${name}-${i}`}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 bg-white shadow-md"
              style={{
                borderColor: `${brandColor}45`,
                backgroundColor: `${brandColor}12`,
                boxShadow: `0 6px 20px ${brandColor}18`,
              }}
            >
              <BrandIcon name={name} size={30} colored />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DesktopLogoStrip() {
  return (
    <div className="mt-14 hidden flex-wrap items-center justify-center gap-3 md:flex lg:gap-4" aria-hidden>
      {LOGO_STRIP.slice(0, 10).map((name, i) => {
        const brandColor = getBrandColor(name);
        return (
          <div
            key={name}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl border-2 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md lg:h-14 lg:w-14 lg:rounded-2xl",
              i % 3 === 0 ? "animate-logo-drift-a" : i % 3 === 1 ? "animate-logo-drift-b" : "animate-logo-drift-c",
            )}
            style={{
              borderColor: `${brandColor}40`,
              backgroundColor: `${brandColor}0F`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${6 + i * 0.5}s`,
            }}
          >
            <BrandIcon name={name} size={26} colored className="lg:scale-110" />
          </div>
        );
      })}
      <span className="ml-2 rounded-full bg-fynk-surface-alt px-3 py-1.5 text-xs font-semibold text-fynk-muted">
        +20 more
      </span>
    </div>
  );
}

export function IntegrationsHeroCloud({
  heroLoaded,
  exploreHref,
  integrateHref,
}: {
  heroLoaded: boolean;
  exploreHref: string;
  integrateHref: string;
}) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setParallax({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  }, []);

  const handleMouseLeave = useCallback(() => setParallax({ x: 0, y: 0 }), []);

  return (
    <section
      className="relative min-h-[640px] overflow-hidden bg-white pb-14 pt-32 sm:min-h-[720px] sm:pb-20 sm:pt-40 lg:pb-24"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatedBackground />

      {HERO_FLOATING_LOGOS.map((logo) => (
        <FloatingBrandLogo
          key={logo.name}
          logo={logo}
          heroLoaded={heroLoaded}
          parallaxX={parallax.x}
          parallaxY={parallax.y}
        />
      ))}

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[4] hidden w-[22%] bg-gradient-to-r from-white via-white/95 to-transparent md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[4] hidden w-[22%] bg-gradient-to-l from-white via-white/95 to-transparent md:block" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-24 bg-gradient-to-t from-white to-transparent" />

      <div className="relative z-10 mx-auto max-w-container px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className={cn(
              "mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700",
              "transition-all duration-700",
              heroLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            30+ live connectors · Real-time sync
          </div>

          <h1
            className={cn(
              "font-heading text-balance text-[2.5rem] font-bold leading-[1.04] tracking-[-0.045em] text-fynk-ink sm:text-[3.5rem] md:text-[4rem] md:leading-[1.02] lg:text-[4.5rem] lg:leading-[0.98]",
              "transition-all duration-700 delay-75",
              heroLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            Connect Voatomy to{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#F05A28] via-[#6366F1] to-[#10B981] bg-clip-text text-transparent">
                30+ tools
              </span>
              <span className="absolute -bottom-1 left-0 h-1 w-full animate-shimmer rounded-full bg-gradient-to-r from-[#F05A28]/40 via-[#6366F1]/40 to-[#10B981]/40 bg-[length:200%_100%]" />
            </span>{" "}
            you already use
          </h1>

          <p
            className={cn(
              "mx-auto mt-7 max-w-[52ch] text-body-base text-fynk-muted sm:mt-8 sm:text-body-lg lg:text-body-xl",
              "transition-all duration-700 delay-150",
              heroLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            GitHub, Jira, Slack, Salesforce, Datadog — official brand icons, full-color tiles,
            streaming data into ATLAS, LOOP, and SIGNAL in real time.
          </p>

          <div
            className={cn(
              "mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row",
              "transition-all duration-700 delay-300",
              heroLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            <FynkButtonPrimary
              href={exploreHref}
              variant="orange"
              className="min-w-[220px] justify-center px-8 py-3.5 text-base shadow-[0_8px_32px_rgba(240,90,40,0.35)] transition-shadow hover:shadow-[0_12px_40px_rgba(240,90,40,0.45)]"
            >
              Explore the marketplace
            </FynkButtonPrimary>
            <Link
              href={integrateHref}
              className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-fynk-ink px-8 py-3.5 text-body-base font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-fynk-ink/90 hover:shadow-xl"
            >
              Integrate with Voatomy
            </Link>
          </div>

          <DesktopLogoStrip />
          <MobileLogoMarquee />
        </div>
      </div>
    </section>
  );
}
