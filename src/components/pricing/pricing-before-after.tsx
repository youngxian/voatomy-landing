"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { BrandIcon, getBrandColor } from "@/components/icons/brand-icons";
import { VoatomyLogoMark } from "@/components/icons/voatomy-logo-mark";
import { PRICING_BEFORE, PRICING_AFTER, PRICING_SECTIONS } from "@/lib/pricing-page-data";
import { Check, X } from "lucide-react";

const INK = "#111827";

function FloatingLogo({
  name,
  size = 28,
  className,
  style,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "absolute flex items-center justify-center rounded-xl bg-white p-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.08)] ring-1 ring-black/5",
        className,
      )}
      style={style}
    >
      <BrandIcon name={name} size={size} colored />
    </div>
  );
}

function ChaosScene() {
  return (
    <div className="relative mx-auto h-[220px] w-full max-w-[340px] sm:h-[260px]">
      <FloatingLogo name="Slack" className="left-[2%] top-[2%] -rotate-12" style={{ width: 44, height: 44 }} />
      <FloatingLogo name="Jira" className="right-[4%] top-0 rotate-6" style={{ width: 42, height: 42 }} />
      <FloatingLogo name="Microsoft Teams" className="left-0 top-[42%] -rotate-6" size={24} style={{ width: 40, height: 40 }} />
      <FloatingLogo name="GitHub" className="right-[2%] top-[38%] rotate-10" style={{ width: 44, height: 44 }} />
      <FloatingLogo name="Notion" className="left-[32%] top-[2%] rotate-3" size={24} style={{ width: 38, height: 38 }} />
      <FloatingLogo name="Linear" className="right-[28%] top-[18%] -rotate-8" size={22} style={{ width: 36, height: 36 }} />

      <span className="absolute left-[8%] top-[58%] max-w-[110px] -rotate-6 rounded bg-[#FEE2E2] px-2 py-1 font-mono text-[8px] font-medium text-[#991B1B] shadow-sm sm:text-[9px]">
        sprint_final_v4.pdf
      </span>
      <span className="absolute right-[6%] top-[62%] max-w-[100px] rotate-4 rounded bg-[#FEF3C7] px-2 py-1 font-mono text-[8px] font-medium text-[#92400E] shadow-sm sm:text-[9px]">
        standup-notes.docx
      </span>

      <svg
        viewBox="0 0 140 150"
        className="absolute bottom-0 left-1/2 h-[150px] w-[130px] -translate-x-1/2"
        aria-hidden
      >
        <circle cx="70" cy="36" r="22" fill="none" stroke={INK} strokeWidth="2.25" />
        <path d="M52 22 Q48 8 58 14 M62 16 Q58 4 68 10 M76 12 Q86 2 80 18" stroke={INK} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M58 28 Q54 34 60 38 M68 26 Q74 32 70 40 M62 32 Q66 36 64 42" stroke={INK} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M54 44 Q70 48 86 44" stroke={INK} strokeWidth="1.5" fill="none" />
        <path d="M48 24 Q42 18 46 12 M92 24 Q98 18 94 12" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="70" y1="58" x2="70" y2="102" stroke={INK} strokeWidth="2.25" strokeLinecap="round" />
        <line x1="70" y1="72" x2="48" y2="88" stroke={INK} strokeWidth="2.25" strokeLinecap="round" />
        <line x1="70" y1="72" x2="92" y2="88" stroke={INK} strokeWidth="2.25" strokeLinecap="round" />
        <line x1="70" y1="102" x2="54" y2="132" stroke={INK} strokeWidth="2.25" strokeLinecap="round" />
        <line x1="70" y1="102" x2="86" y2="132" stroke={INK} strokeWidth="2.25" strokeLinecap="round" />
        <text x="70" y="146" textAnchor="middle" fill="#9CA3AF" fontSize="7" fontWeight="600">
          ????
        </text>
      </svg>
    </div>
  );
}

function HubScene() {
  const hub = { x: 170, y: 100 };

  return (
    <div className="relative mx-auto h-[220px] w-full max-w-[340px] sm:h-[260px]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 340 260" aria-hidden>
        {[
          { name: "GitHub", end: { x: 52, y: 52 } },
          { name: "Linear", end: { x: 288, y: 40 } },
          { name: "Slack", end: { x: 170, y: 24 } },
          { name: "Jira", end: { x: 48, y: 118 } },
          { name: "Figma", end: { x: 292, y: 112 } },
        ].map(({ name, end }) => (
          <line
            key={name}
            x1={hub.x}
            y1={hub.y}
            x2={end.x}
            y2={end.y}
            stroke={getBrandColor(name)}
            strokeWidth="2"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
        ))}
        <text x="28" y="200" fill="#FBBF24" fontSize="14">★</text>
        <text x="300" y="180" fill="#FBBF24" fontSize="12">★</text>
        <text x="310" y="220" fill="#FBBF24" fontSize="10">★</text>
        <rect x="24" y="210" width="14" height="18" rx="2" fill="#86EFAC" stroke={INK} strokeWidth="1.2" />
        <rect x="290" y="208" width="14" height="18" rx="2" fill="#86EFAC" stroke={INK} strokeWidth="1.2" />
      </svg>

      <div className="absolute left-1/2 top-[38%] z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-fynk-ink shadow-lg ring-4 ring-white sm:h-16 sm:w-16">
        <VoatomyLogoMark className="h-8 w-8 sm:h-9 sm:w-9" />
      </div>

      <FloatingLogo name="GitHub" className="left-[4%] top-[12%]" size={26} style={{ width: 42, height: 42 }} />
      <FloatingLogo name="Linear" className="right-[2%] top-[6%] -rotate-3" size={24} style={{ width: 40, height: 40 }} />
      <FloatingLogo name="Slack" className="left-[38%] top-0 rotate-2" size={22} style={{ width: 38, height: 38 }} />
      <FloatingLogo name="Jira" className="left-[2%] top-[38%] -rotate-6" size={24} style={{ width: 40, height: 40 }} />
      <FloatingLogo name="Figma" className="right-[0%] top-[36%] rotate-4" size={24} style={{ width: 40, height: 40 }} />

      <svg
        viewBox="0 0 160 120"
        className="absolute bottom-0 left-1/2 h-[110px] w-[140px] -translate-x-1/2"
        aria-hidden
      >
        <ellipse cx="80" cy="108" rx="36" ry="8" fill="#E5E7EB" opacity="0.6" />
        <circle cx="80" cy="32" r="16" fill="none" stroke={INK} strokeWidth="2" />
        <circle cx="74" cy="30" r="1.5" fill={INK} />
        <circle cx="86" cy="30" r="1.5" fill={INK} />
        <path d="M74 36 Q80 40 86 36" stroke={INK} strokeWidth="1.5" fill="none" />
        <line x1="80" y1="48" x2="80" y2="78" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <line x1="80" y1="58" x2="38" y2="48" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <line x1="80" y1="58" x2="122" y2="48" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <line x1="80" y1="64" x2="28" y2="72" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <line x1="80" y1="64" x2="132" y2="72" stroke={INK} strokeWidth="2" strokeLinecap="round" />
        <circle cx="28" cy="72" r="8" fill="none" stroke={INK} strokeWidth="1.5" />
        <text x="28" y="75" textAnchor="middle" fill={INK} fontSize="8">💡</text>
        <rect x="118" y="66" width="16" height="11" rx="2" fill="none" stroke={INK} strokeWidth="1.5" />
        <path d="M132 58 L138 66 L132 74" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function ComparisonCard({
  variant,
  label,
  title,
  subtitle,
  items,
  scene,
}: {
  variant: "before" | "after";
  label: string;
  title: string;
  subtitle: string;
  items: readonly string[];
  scene: React.ReactNode;
}) {
  const isAfter = variant === "after";

  return (
    <article className="flex h-full flex-col rounded-[1.75rem] bg-[#F3F4F6] p-6 sm:p-8">
      <p
        className={cn(
          "font-handwriting text-[1.35rem] font-bold leading-none sm:text-[1.5rem]",
          isAfter ? "text-[#2563EB]" : "text-[#DC2626]",
        )}
      >
        {label}
      </p>

      <h3 className="mt-5 font-heading text-[1.2rem] font-bold leading-snug tracking-[-0.02em] text-fynk-ink sm:text-[1.35rem]">
        {title}
      </h3>
      <p className="mt-2 text-body-sm leading-relaxed text-fynk-muted sm:text-body-base">{subtitle}</p>

      <ul className="mt-5 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-body-sm text-fynk-body sm:text-body-base">
            {isAfter ? (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563EB]">
                <Check className="h-3 w-3 text-white" strokeWidth={3} />
              </span>
            ) : (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EF4444]">
                <X className="h-3 w-3 text-white" strokeWidth={3} />
              </span>
            )}
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-black/[0.06] pt-6">{scene}</div>
    </article>
  );
}

export function PricingBeforeAfter() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-white px-4 py-20 sm:py-28">
      <div ref={ref} className="mx-auto max-w-container">
        <h2
          className={cn(
            "text-center font-heading text-heading-3 tracking-[-0.03em] text-fynk-ink sm:text-heading-2",
            "transition-all duration-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
        >
          {PRICING_SECTIONS.beforeAfterTitle}
        </h2>

        <div className="relative mt-12 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-8">
          <div
            className={cn(
              "absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex",
              "transition-all duration-700 delay-150",
              isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0",
            )}
          >
            <div className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl bg-fynk-ink shadow-xl ring-[5px] ring-white">
              <VoatomyLogoMark className="h-7 w-7" />
            </div>
          </div>

          <div
            className={cn(
              "transition-all duration-700 delay-100",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            <ComparisonCard
              variant="before"
              label={PRICING_BEFORE.label}
              title={PRICING_BEFORE.title}
              subtitle={PRICING_BEFORE.subtitle}
              items={PRICING_BEFORE.items}
              scene={<ChaosScene />}
            />
          </div>

          <div
            className={cn(
              "transition-all duration-700 delay-200",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            <ComparisonCard
              variant="after"
              label={PRICING_AFTER.label}
              title={PRICING_AFTER.title}
              subtitle={PRICING_AFTER.subtitle}
              items={PRICING_AFTER.items}
              scene={<HubScene />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
