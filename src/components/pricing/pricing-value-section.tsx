"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { FynkHeading, FynkSubheading } from "@/components/marketing/fynk-primitives";
import { PRICING_VALUE_PILLARS, PRICING_SECTIONS } from "@/lib/pricing-page-data";
import { Infinity, PackageCheck, Rocket, ShieldCheck, TrendingUp } from "lucide-react";

const INK = "#111827";

type Pillar = (typeof PRICING_VALUE_PILLARS)[number];

const PILLAR_ICONS = {
  infinity: Infinity,
  rocket: Rocket,
  shield: ShieldCheck,
  growth: TrendingUp,
} as const;

function PillarVisual({ pillar }: { pillar: Pillar }) {
  const { accent, light, icon } = pillar;
  const Icon = PILLAR_ICONS[icon];

  const sketches: Record<Pillar["icon"], React.ReactNode> = {
    infinity: (
      <svg viewBox="0 0 240 140" fill="none" className="h-full w-full" aria-hidden>
        <path
          d="M88 70 C88 48 62 48 62 70 C62 92 88 92 88 70 C88 48 114 48 114 70 C114 92 88 92 88 70"
          stroke={INK}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {[
          { x: 24, y: 24, t: "Teams" },
          { x: 158, y: 18, t: "Repos" },
          { x: 164, y: 96, t: "Plans" },
        ].map(({ x, y, t }) => (
          <g key={t} transform={`translate(${x} ${y})`}>
            <rect width="56" height="24" rx="4" fill="#fff" stroke={INK} strokeWidth="1.5" />
            <text x="28" y="16" textAnchor="middle" fill={INK} fontSize="9" fontWeight="600">
              {t}
            </text>
          </g>
        ))}
        <text x="120" y="130" textAnchor="middle" fill={accent} fontSize="10" fontWeight="700">
          unlimited
        </text>
      </svg>
    ),
    rocket: (
      <svg viewBox="0 0 240 140" fill="none" className="h-full w-full" aria-hidden>
        <rect x="52" y="32" width="136" height="76" rx="8" fill="#fff" stroke={INK} strokeWidth="1.5" />
        <circle cx="74" cy="52" r="10" fill="#24292F" />
        <text x="94" y="56" fill={INK} fontSize="9" fontWeight="700">
          GitHub
        </text>
        <rect x="66" y="70" width="108" height="6" rx="3" fill="#E5E7EB" />
        <rect x="66" y="70" width="80" height="6" rx="3" fill={accent} />
        <path
          d="M168 24 L178 44 L158 44 Z"
          fill={accent}
          stroke={INK}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <text x="120" y="104" textAnchor="middle" fill="#6B7280" fontSize="8" fontWeight="600">
          first sprint plan ready
        </text>
        <g transform="translate(176 88) rotate(-8)">
          <rect width="48" height="26" rx="4" fill="#fff" stroke={accent} strokeWidth="2" />
          <text x="24" y="17" textAnchor="middle" fill={accent} fontSize="11" fontWeight="800">
            &lt;10m
          </text>
        </g>
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 240 140" fill="none" className="h-full w-full" aria-hidden>
        <path
          d="M120 20 L162 34 V66 C162 88 144 102 120 110 C96 102 78 88 78 66 V34 Z"
          fill={light}
          stroke={INK}
          strokeWidth="2"
        />
        <rect x="106" y="52" width="28" height="22" rx="3" fill="#fff" stroke={INK} strokeWidth="1.5" />
        <path d="M120 58 V68 M120 58 A4 4 0 0 0 116 58" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
        <g transform="translate(148 28) rotate(6)">
          <rect width="52" height="22" rx="4" fill={accent} />
          <text x="26" y="15" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">
            SOC 2
          </text>
        </g>
        <text x="120" y="132" textAnchor="middle" fill="#6B7280" fontSize="8" fontWeight="600">
          metadata only · no source code
        </text>
      </svg>
    ),
    growth: (
      <svg viewBox="0 0 240 140" fill="none" className="h-full w-full" aria-hidden>
        <line x1="48" y1="104" x2="192" y2="104" stroke={INK} strokeWidth="1.5" />
        {[
          { x: 58, h: 24, l: "2" },
          { x: 98, h: 42, l: "50" },
          { x: 138, h: 62, l: "500" },
          { x: 178, h: 80, l: "2K" },
        ].map(({ x, h, l }) => (
          <g key={l}>
            <rect x={x} y={104 - h} width="24" height={h} rx="3" fill={l === "2K" ? accent : `${accent}55`} stroke={INK} strokeWidth="1" />
            <text x={x + 12} y="118" textAnchor="middle" fill={INK} fontSize="8" fontWeight="600">
              {l}
            </text>
          </g>
        ))}
        <path d="M70 72 L110 56 L150 40 L190 22" stroke={INK} strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
      </svg>
    ),
  };

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-fynk-border bg-white">
      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: light }}>
        <Icon className="h-5 w-5" style={{ color: accent }} strokeWidth={1.75} />
      </div>
      <div className="relative h-full px-3 pb-3 pt-2">{sketches[icon]}</div>
    </div>
  );
}

export function PricingValueSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-white px-4 py-20 sm:py-28">
      <div ref={ref} className="mx-auto max-w-container">
        <div
          className={cn(
            "mx-auto max-w-3xl text-center transition-all duration-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          <span className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-fynk-orange-light ring-1 ring-fynk-orange/15">
            <PackageCheck className="h-7 w-7 text-fynk-orange" strokeWidth={1.75} />
          </span>
          <FynkHeading className="text-heading-2 sm:text-heading-1">
            {PRICING_SECTIONS.valueTitle}{" "}
            <span className="text-brand">{PRICING_SECTIONS.valueTitleAccent}</span>
          </FynkHeading>
          <FynkSubheading className="mt-4">{PRICING_SECTIONS.valueSubtitle}</FynkSubheading>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PRICING_VALUE_PILLARS.map((pillar, i) => (
            <article
              key={pillar.title}
              className={cn(
                "flex h-full flex-col rounded-[1.75rem] border border-fynk-border bg-fynk-surface-alt p-5 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:p-6",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <PillarVisual pillar={pillar} />
              <h3 className="mt-5 font-heading text-[17px] font-bold leading-snug text-fynk-ink sm:text-[18px]">
                {pillar.title}
              </h3>
              <p className="mt-2 text-body-sm leading-relaxed text-fynk-muted sm:text-[15px]">
                {pillar.description}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {pillar.chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-fynk-border bg-white px-2.5 py-0.5 text-[11px] font-medium text-fynk-body"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
