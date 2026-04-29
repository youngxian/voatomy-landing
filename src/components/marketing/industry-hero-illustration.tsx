"use client";

import { cn } from "@/lib/utils";
import type { IndustryHeroVisual } from "@/lib/industry-pages";

interface IndustryHeroIllustrationProps {
  visual: IndustryHeroVisual;
  badge?: string;
  className?: string;
}

/** Decorative mesh hero (no external assets). Inspired by enterprise SaaS industry landing visuals. */
export function IndustryHeroIllustration({ visual, badge, className }: IndustryHeroIllustrationProps) {
  const { orbA, orbB, orbC } = visual;

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl border border-theme shadow-xl sm:aspect-[5/4] sm:max-w-none lg:max-w-xl",
        "bg-gradient-to-br from-white to-theme-subtle",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 400 320" className="h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="blur-a" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="28" result="blur" />
          </filter>
          <linearGradient id="mesh-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={orbA} stopOpacity="0.95" />
            <stop offset="100%" stopColor={orbB} stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="mesh-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={orbB} stopOpacity="0.85" />
            <stop offset="100%" stopColor={orbC} stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id="vignette" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="rgb(255,255,255)" stopOpacity="0" />
            <stop offset="100%" stopColor="rgb(7,49,39)" stopOpacity="0.08" />
          </radialGradient>
        </defs>
        <rect width="400" height="320" fill="url(#vignette)" />
        <circle cx="120" cy="100" r="100" fill="url(#mesh-1)" filter="url(#blur-a)" opacity="0.9" />
        <circle cx="280" cy="140" r="110" fill="url(#mesh-2)" filter="url(#blur-a)" opacity="0.85" />
        <circle cx="200" cy="240" r="90" fill={orbC} fillOpacity="0.35" filter="url(#blur-a)" />
        <rect x="48" y="200" width="304" height="88" rx="16" fill="white" fillOpacity="0.92" stroke="rgba(0,72,56,0.08)" />
        <rect x="64" y="216" width="120" height="10" rx="5" fill="rgba(0,72,56,0.12)" />
        <rect x="64" y="236" width="200" height="8" rx="4" fill="rgba(0,72,56,0.07)" />
        <rect x="64" y="252" width="160" height="8" rx="4" fill="rgba(0,72,56,0.06)" />
        <circle cx="330" cy="244" r="22" fill={orbA} fillOpacity="0.2" />
        <path d="M330 234v20M320 244h20" stroke={orbA} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      </svg>
      {badge ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center pt-4">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-3xl text-4xl shadow-lg ring-4 ring-white/90 sm:h-28 sm:w-28 sm:text-5xl"
            style={{ backgroundImage: `linear-gradient(135deg, ${orbA}, ${orbB})` }}
          >
            <span className="drop-shadow-sm">{badge}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
