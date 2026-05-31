"use client";

import * as React from "react";
import Link from "next/link";
import { ATLAS_SIGNALS } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowRight } from "lucide-react";
import { VoatomyLogoMark } from "@/components/icons/voatomy-logo-mark";
import { FynkGradientBackdrop, FynkDisplayHeading, FynkHeadingUnderlineAccent, FynkReveal } from "@/components/marketing/fynk-primitives";
import { ColoredIconBadge } from "@/components/marketing/colored-icon-badge";
import {
  SIGNAL_GRADIENTS,
  SIGNAL_ICON_SET,
} from "@/components/marketing/landing-section-icons";
import { IntegrationLogoTile } from "@/components/marketing/integration-logo-tile";
import { AiSprintPlanShowcase } from "@/components/landing/ai-sprint-plan-showcase";
import { useLocale } from "@/i18n/locale-provider";

const BRAND = "#004838";
const BRAND_LIGHT = "#e6fff0";

const SIGNAL_TABS = [
  {
    tab: "Code",
    collection: "Code Signal",
    headline: "Your repos tell you what's hard — Voatomy listens",
    includes: ["GitHub", "GitLab", "Bitbucket"] as const,
    badge: "ANALYZING",
    badgeColor: "#2684FF",
  },
  {
    tab: "Capacity",
    collection: "Capacity Signal",
    headline: "Who's actually free this sprint — not who said they were",
    includes: ["Google Calendar", "Jira", "Slack"] as const,
    badge: "SYNCED",
    badgeColor: "#22C55E",
  },
  {
    tab: "Demand",
    collection: "Demand Signal",
    headline: "Customer urgency where your backlog decisions happen",
    includes: ["Salesforce", "Intercom", "Zendesk"] as const,
    badge: "LIVE",
    badgeColor: "#6366F1",
  },
  {
    tab: "Debt",
    collection: "Tech Debt Signal",
    headline: "See which shortcuts will cost you this sprint",
    includes: ["GitHub", "Jira", "Datadog"] as const,
    badge: "FLAGGED",
    badgeColor: "#EAB308",
  },
  {
    tab: "Design",
    collection: "Design Signal",
    headline: "Design scope in every estimate — no surprise handoffs",
    includes: ["Figma", "Framer", "Adobe Creative Cloud"] as const,
    badge: "IN SCOPE",
    badgeColor: "#8B5CF6",
  },
  {
    tab: "Revenue",
    collection: "Revenue Signal",
    headline: "Know which trade-offs hit the number — automatically",
    includes: ["Salesforce", "HubSpot", "Gmail"] as const,
    badge: "WEIGHTED",
    badgeColor: "#EC4899",
  },
] as const;

function DoodleArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={className} aria-hidden fill="none">
      <path
        d="M8 48 Q40 8 72 28"
        stroke="#111827"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 0"
      />
      <path d="M64 22 L72 28 L66 34" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SignalSceneVisual({
  index,
  color,
  badge,
  badgeColor,
}: {
  index: number;
  color: string;
  badge: string;
  badgeColor: string;
}) {
  const Icon = SIGNAL_ICON_SET[index];

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[520px] lg:max-w-none">
      {/* Tilted color slab — reference: blue rectangle behind photo */}
      <div
        className="absolute -right-4 top-6 h-[88%] w-[78%] rounded-2xl sm:-right-6 sm:top-8"
        style={{
          backgroundColor: color,
          transform: "rotate(4deg)",
        }}
        aria-hidden
      />

      {/* Main card */}
      <div className="relative ml-0 mr-6 mt-0 overflow-hidden rounded-2xl border border-fynk-border/80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:mr-10">
        {/* Mock workspace */}
        <div className="relative bg-[#F8F9FA] p-5 sm:p-6">
          <div className="flex items-center gap-2 border-b border-fynk-border/60 pb-3">
            <VoatomyLogoMark className="h-6 w-6" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-fynk-muted">
              ATLAS · Sprint 24
            </span>
          </div>

          <div className="mt-4 flex items-start gap-4">
            <ColoredIconBadge
              size="lg"
              bg={SIGNAL_GRADIENTS[index]}
              ringColor="rgba(255,255,255,0.95)"
            >
              <Icon className="h-7 w-7" />
            </ColoredIconBadge>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-sm font-bold text-fynk-ink sm:text-base">
                {ATLAS_SIGNALS[index].title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-fynk-muted sm:text-[13px]">
                {ATLAS_SIGNALS[index].description}
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            {ATLAS_SIGNALS[index].details.map((detail, di) => (
              <li
                key={detail}
                className="flex items-center gap-2 rounded-lg border border-fynk-border/60 bg-white px-3 py-2 text-xs text-fynk-body"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: color, opacity: 0.5 + di * 0.15 }}
                />
                {detail}
              </li>
            ))}
          </ul>

          {/* Mini chart strip */}
          <div className="mt-4 flex h-16 items-end gap-1.5 rounded-xl border border-fynk-border/50 bg-white px-3 pb-2 pt-3">
            {[40, 65, 52, 88, 72, 95, 68].map((h, bi) => (
              <div
                key={bi}
                className="flex-1 rounded-sm transition-all"
                style={{
                  height: `${h}%`,
                  backgroundColor: color,
                  opacity: 0.25 + (bi / 7) * 0.55,
                }}
              />
            ))}
          </div>
        </div>

        {/* ATLAS tag — rainbow edge reference */}
        <div className="absolute left-4 top-4 flex items-center gap-0 overflow-hidden rounded-full bg-fynk-ink pl-0 pr-3 shadow-lg">
          <span
            className="h-8 w-1.5 shrink-0"
            style={{
              background:
                "linear-gradient(180deg, #F05A28, #6366F1, #22C55E, #2684FF, #EC4899)",
            }}
            aria-hidden
          />
          <span className="py-1.5 pl-2 text-[11px] font-bold text-white">ATLAS</span>
        </div>

        {/* Status badge */}
        <div
          className="absolute bottom-4 right-4 rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-md"
          style={{ backgroundColor: badgeColor }}
        >
          {badge}
        </div>

        {/* Hand-drawn arrow */}
        <DoodleArrow className="pointer-events-none absolute -bottom-2 -left-2 h-14 w-20 opacity-80 sm:h-16 sm:w-24" />
      </div>
    </div>
  );
}

export function WorkflowsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: convRef, isVisible: convVisible } = useScrollAnimation();
  const { localizedPath } = useLocale();
  const [active, setActive] = React.useState(0);

  const meta = SIGNAL_TABS[active];
  const signal = ATLAS_SIGNALS[active];

  return (
    <section className="light-surface-typography relative overflow-hidden bg-white px-4 py-12 sm:py-20 lg:py-28">
      <FynkGradientBackdrop />

      <div ref={ref} className="relative z-[1] mx-auto max-w-container">
        {/* Centered header — reference: Transform how your teams work */}
        <FynkReveal visible={isVisible} className="mx-auto max-w-3xl text-center">
          <FynkDisplayHeading align="center">
            Six signals in.
            <br />
            <FynkHeadingUnderlineAccent variant="indigo">One sprint plan out.</FynkHeadingUnderlineAccent>
          </FynkDisplayHeading>
          <p className="mx-auto mt-4 max-w-3xl text-lg font-normal leading-relaxed text-fynk-body sm:text-xl">
            ATLAS layers on your Jira or Linear board — pulling code complexity, capacity, customer
            demand, tech debt, design scope, and revenue into confidence scores your team can commit
            to without another three-hour meeting.
          </p>
        </FynkReveal>

        {/* Pill tabs */}
        <FynkReveal visible={isVisible} className="mt-10 flex justify-center sm:mt-12">
          <div
            className="inline-flex max-w-full overflow-x-auto rounded-full bg-[#F3F4F6] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="ATLAS signals"
          >
            {SIGNAL_TABS.map((tab, i) => (
              <button
                key={tab.tab}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 sm:px-5",
                  active === i
                    ? "bg-fynk-ink text-white shadow-sm"
                    : "text-fynk-muted hover:text-fynk-ink",
                )}
              >
                {tab.tab}
              </button>
            ))}
          </div>
        </FynkReveal>

        {/* Two-column collection panel */}
        <FynkReveal
          visible={isVisible}
          className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-16"
        >
          <div className="min-w-0">
            <p className="text-sm font-bold text-fynk-ink">{meta.collection}</p>
            <h3 className="mt-3 font-heading text-[1.75rem] font-bold leading-[1.12] tracking-[-0.02em] text-fynk-ink sm:text-[2rem] lg:text-[2.0625rem]">
              {meta.headline}
            </h3>
            <p className="mt-4 max-w-lg text-body-lg leading-relaxed text-fynk-body">
              {signal.description}
            </p>

            <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.16em] text-fynk-muted">
              Includes
            </p>
            <ul className="mt-4 flex flex-wrap gap-6 sm:gap-8">
              {meta.includes.map((name) => (
                <li key={name}>
                  <IntegrationLogoTile name={name} size="md" />
                </li>
              ))}
            </ul>

            <Link
              href={localizedPath("/products/atlas")}
              className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold transition-colors hover:gap-2"
              style={{ color: signal.color }}
            >
              Explore {meta.collection}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>

          <div className="min-w-0">
            <SignalSceneVisual
              index={active}
              color={signal.color}
              badge={meta.badge}
              badgeColor={meta.badgeColor}
            />
          </div>
        </FynkReveal>

        {/* Sprint plan output — finale */}
        <div
          ref={convRef}
          className={cn(
            "relative mt-16 transition-all duration-700 sm:mt-20",
            convVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="flex justify-center py-2">
            <ColoredIconBadge size="sm" bg={BRAND_LIGHT} ringColor="rgba(0,72,56,0.15)">
              <ArrowDown className="h-4 w-4 text-brand" strokeWidth={2.5} />
            </ColoredIconBadge>
          </div>

          <AiSprintPlanShowcase visible={convVisible} demoHref={localizedPath("/demo")} />
        </div>
      </div>
    </section>
  );
}
