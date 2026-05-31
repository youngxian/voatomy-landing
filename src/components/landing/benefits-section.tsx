"use client";

import * as React from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useDictionary } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";
import {
  FynkDisplayHeading,
  FynkGradientBackdrop,
  FynkHeadingUnderlineAccent,
  FynkReveal,
  FynkSubheading,
} from "@/components/marketing/fynk-primitives";

/* ── Themed mini-mock illustrations (one per benefit) ─────────────── */
/** Renders a small inline SVG mock that sits at the top of each card. */
function BenefitVisual({ index }: { index: number }) {
  const visuals = [
    // 0 — One hub: tilted browser window mock
    <svg key={0} viewBox="0 0 240 140" fill="none" className="h-full w-full">
      <g transform="translate(28 22) rotate(-3)">
        <rect x="0" y="0" width="184" height="108" rx="8" fill="#1f2937" />
        <rect x="0" y="0" width="184" height="18" rx="8" fill="#1f2937" />
        <circle cx="10" cy="9" r="2" fill="#F87171" />
        <circle cx="18" cy="9" r="2" fill="#FBBF24" />
        <circle cx="26" cy="9" r="2" fill="#34D399" />
        <rect x="0" y="18" width="184" height="90" fill="#FFFFFF" />
        <rect x="12" y="30" width="14" height="14" rx="3" fill="#F05A28" />
        <text x="30" y="42" fill="#111827" fontSize="9" fontWeight="700">voatomy</text>
        <rect x="12" y="56" width="100" height="6" rx="3" fill="#E5E7EB" />
        <rect x="12" y="68" width="80" height="6" rx="3" fill="#E5E7EB" />
        <rect x="12" y="82" width="120" height="6" rx="3" fill="#F3F4F6" />
      </g>
      {/* sticky-note accent */}
      <g transform="translate(174 18) rotate(8)">
        <rect width="32" height="32" rx="2" fill="#FBBF24" />
        <path d="M 0 0 L 6 8 L -2 8 Z" fill="#F59E0B" />
      </g>
    </svg>,
    // 1 — Faster from plan to ship: timeline progress steps
    <svg key={1} viewBox="0 0 240 140" fill="none" className="h-full w-full">
      <g transform="translate(46 28)">
        <rect width="160" height="84" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
        {/* progress steps */}
        <circle cx="20" cy="22" r="6" fill="#3B82F6" />
        <text x="34" y="26" fill="#111827" fontSize="9" fontWeight="700">Draft</text>
        <text x="120" y="26" fill="#9CA3AF" fontSize="7">Jan 8</text>
        <line x1="20" y1="28" x2="20" y2="42" stroke="#3B82F6" strokeWidth="1.5" />
        <circle cx="20" cy="42" r="5" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="1.5" />
        <text x="34" y="46" fill="#6B7280" fontSize="8">Review</text>
        <line x1="20" y1="48" x2="20" y2="60" stroke="#E5E7EB" strokeWidth="1.5" />
        <circle cx="20" cy="60" r="5" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
        <text x="34" y="64" fill="#9CA3AF" fontSize="8">Signing</text>
        <line x1="20" y1="66" x2="20" y2="76" stroke="#E5E7EB" strokeWidth="1.5" />
        <circle cx="20" cy="76" r="5" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
        <text x="34" y="80" fill="#9CA3AF" fontSize="8">Done</text>
      </g>
    </svg>,
    // 2 — Clarity across teams: doc with role tag
    <svg key={2} viewBox="0 0 240 140" fill="none" className="h-full w-full">
      <g transform="translate(78 18)">
        <rect width="80" height="104" rx="4" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
        <rect x="10" y="14" width="50" height="4" rx="2" fill="#E5E7EB" />
        <rect x="10" y="22" width="60" height="3" rx="1.5" fill="#F3F4F6" />
        <rect x="10" y="28" width="40" height="3" rx="1.5" fill="#F3F4F6" />
        <rect x="10" y="38" width="60" height="3" rx="1.5" fill="#F3F4F6" />
        <rect x="10" y="44" width="55" height="3" rx="1.5" fill="#F3F4F6" />
        <rect x="10" y="50" width="50" height="3" rx="1.5" fill="#F3F4F6" />
      </g>
      {/* role tag */}
      <g transform="translate(70 14)">
        <rect width="40" height="18" rx="4" fill="#3B82F6" />
        <text x="20" y="12" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700">Eng</text>
        <path d="M 4 18 L 0 22 L 8 22 Z" fill="#3B82F6" />
      </g>
    </svg>,
    // 3 — Transparent by design: price tag
    <svg key={3} viewBox="0 0 240 140" fill="none" className="h-full w-full">
      <g transform="translate(76 28)">
        <rect width="88" height="80" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
        <text x="44" y="36" textAnchor="middle" fill="#111827" fontSize="22" fontWeight="700">$29</text>
        <text x="44" y="50" textAnchor="middle" fill="#6B7280" fontSize="8">per user / mo</text>
        <rect x="14" y="58" width="60" height="10" rx="5" fill="#F05A28" />
        <text x="44" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="700">START FREE</text>
      </g>
    </svg>,
    // 4 — Works from day one: lightning bolt
    <svg key={4} viewBox="0 0 240 140" fill="none" className="h-full w-full">
      <g transform="translate(96 24)">
        <path
          d="M 28 0 L 4 56 L 22 56 L 16 92 L 44 30 L 26 30 Z"
          fill="#FBBF24"
          stroke="#111827"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
      <text x="120" y="124" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontWeight="600">SETUP · 0 MIN</text>
    </svg>,
    // 5 — Human support: chat bubbles
    <svg key={5} viewBox="0 0 240 140" fill="none" className="h-full w-full">
      <g transform="translate(56 22)">
        <rect width="80" height="40" rx="10" fill="#3B82F6" />
        <rect x="12" y="14" width="56" height="4" rx="2" fill="#FFFFFF" opacity="0.85" />
        <rect x="12" y="22" width="40" height="4" rx="2" fill="#FFFFFF" opacity="0.7" />
        <path d="M 12 40 L 16 50 L 24 40 Z" fill="#3B82F6" />
      </g>
      <g transform="translate(76 70)">
        <rect width="92" height="46" rx="10" fill="#F3F4F6" />
        <rect x="12" y="16" width="64" height="4" rx="2" fill="#9CA3AF" />
        <rect x="12" y="24" width="50" height="4" rx="2" fill="#9CA3AF" />
        <rect x="12" y="32" width="56" height="4" rx="2" fill="#9CA3AF" />
        <path d="M 80 46 L 76 56 L 68 46 Z" fill="#F3F4F6" />
      </g>
    </svg>,
  ];
  return visuals[index % visuals.length];
}

export function BenefitsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const t = useDictionary().why;

  return (
    <section className="light-surface-typography relative overflow-hidden bg-white px-4 py-12 sm:py-20 lg:py-28">
      <FynkGradientBackdrop intensity="soft" />

      <div ref={ref} className="relative z-[1] mx-auto max-w-container">
        <FynkReveal visible={isVisible} className="mx-auto max-w-3xl text-center lg:max-w-4xl">
          <FynkDisplayHeading align="center" className="max-w-4xl">
            {t.titleLine1}
            <br />
            <FynkHeadingUnderlineAccent>{t.titleLine2}</FynkHeadingUnderlineAccent>
          </FynkDisplayHeading>
          <FynkSubheading className="mt-4 sm:mt-5">{t.subtitle}</FynkSubheading>
        </FynkReveal>

        <ul className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {t.items.map((item, i) => (
            <li
              key={item.title}
              className={cn(
                "transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <article className="group flex h-full flex-col rounded-2xl border border-fynk-border bg-fynk-surface-alt p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:rounded-3xl sm:p-6">
                {/* Visual mock area */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-fynk-border bg-white sm:rounded-2xl">
                  <BenefitVisual index={i} />
                </div>

                <div className="mt-4 px-0.5 pb-0.5 sm:mt-6 sm:px-1 sm:pb-1">
                  <h3 className="text-base font-bold text-fynk-ink sm:text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fynk-muted sm:mt-2.5 sm:text-base">{item.desc}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
