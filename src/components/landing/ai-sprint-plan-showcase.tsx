"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  ListChecks,
  Maximize2,
  MessageSquare,
  Plus,
  RefreshCw,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MARKETING_IMAGES } from "@/lib/marketing-images";
import { BrandIcon, getBrandColor } from "@/components/icons/brand-icons";
import {
  SIGNAL_ICON_SET,
  SignalCodeIcon,
  SignalCapacityIcon,
  SignalDemandIcon,
} from "@/components/marketing/landing-section-icons";

const PROMPTS = [
  {
    label: "Summarize sprint risks in 3 points",
    icon: ListChecks,
  },
  {
    label: "What blocks ship this week?",
    icon: AlertTriangle,
  },
  {
    label: "Compare capacity vs. commitments",
    icon: Users,
  },
  {
    label: "Draft Monday standup talking points",
    icon: MessageSquare,
  },
] as const;

const SPRINT_CHAPTERS = [
  {
    label: "Auth API",
    image: MARKETING_IMAGES.codeScreen,
    points: 13,
  },
  {
    label: "Landing page",
    image: MARKETING_IMAGES.dashboardMood,
    points: 8,
  },
  {
    label: "Tech debt",
    image: MARKETING_IMAGES.collaboration,
    points: 5,
  },
  {
    label: "Onboarding",
    image: MARKETING_IMAGES.meeting,
    points: 11,
  },
  {
    label: "Billing fix",
    image: MARKETING_IMAGES.heroTeam,
    points: 6,
  },
] as const;

const TOP_SIGNALS = [
  { name: "Code", score: "94", Icon: SignalCodeIcon, color: "#2684FF" },
  { name: "Capacity", score: "88", Icon: SignalCapacityIcon, color: "#22C55E" },
  { name: "Demand", score: "81", Icon: SignalDemandIcon, color: "#6366F1" },
] as const;

const CONNECTED_TOOLS = [
  { name: "GitHub", synced: "1m ago" },
  { name: "Jira", synced: "3m ago" },
  { name: "Linear", synced: "Just now" },
  { name: "Slack", synced: "5m ago" },
] as const;

/** Loom-style four-point sparkle */
function LoomSparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden fill="none">
      <path
        d="M28 6 L32.8 22.4 L49 27 L32.8 31.6 L28 48 L23.2 31.6 L7 27 L23.2 22.4 Z"
        fill="url(#sparkle-fill)"
      />
      <defs>
        <linearGradient id="sparkle-fill" x1="7" y1="6" x2="49" y2="48">
          <stop stopColor="#0066FF" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function WindowChrome() {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0066FF] shadow-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="none">
            <path
              d="M12 2 L14.2 9 L21 11 L14.2 13 L12 20 L9.8 13 L3 11 L9.8 9 Z"
              fill="white"
            />
          </svg>
        </span>
        <div>
          <p className="text-sm font-semibold leading-tight text-gray-900">ATLAS Companion</p>
          <p className="text-[11px] text-gray-400">Sprint 24 · 2 weeks</p>
        </div>
      </div>
      <div className="flex items-center gap-0.5 text-gray-400">
        <button
          type="button"
          aria-label="Refresh"
          className="rounded-lg p-2 transition-colors hover:bg-gray-50 hover:text-gray-600"
        >
          <RefreshCw className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="Expand"
          className="rounded-lg p-2 transition-colors hover:bg-gray-50 hover:text-gray-600"
        >
          <Maximize2 className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="Close"
          className="rounded-lg p-2 transition-colors hover:bg-gray-50 hover:text-gray-600"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}

function TopSignalsCard() {
  return (
    <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-[0_16px_48px_rgba(15,23,42,0.1)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
          Top signals
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-[10px] font-medium text-gray-500"
        >
          Sort by
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
      <ul className="mt-3.5 space-y-3">
        {TOP_SIGNALS.map(({ name, score, Icon, color }, i) => (
          <li key={name} className="flex items-center gap-3">
            <span className="w-4 text-center text-[11px] font-bold text-gray-300">{i + 1}</span>
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50"
              style={{ boxShadow: `inset 0 0 0 1px ${color}22` }}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800">{name}</span>
            <span className="text-xs font-bold tabular-nums text-gray-500">{score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConnectedToolsCard() {
  return (
    <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-[0_16px_48px_rgba(15,23,42,0.1)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">
        Connected
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {CONNECTED_TOOLS.map(({ name }) => {
          const color = getBrandColor(name);
          return (
            <div
              key={name}
              className="flex h-11 items-center justify-center rounded-xl border bg-white"
              style={{
                borderColor: `${color}30`,
                backgroundColor: `${color}0A`,
              }}
              title={name}
            >
              <BrandIcon name={name} size={26} colored />
            </div>
          );
        })}
      </div>

      <ul className="mt-3.5 space-y-2.5 border-t border-gray-100 pt-3.5">
        {CONNECTED_TOOLS.map(({ name, synced }) => {
          const color = getBrandColor(name);
          return (
            <li key={name} className="flex items-center gap-2.5">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border bg-white"
                style={{ borderColor: `${color}25` }}
              >
                <BrandIcon name={name} size={16} colored />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800">{name}</span>
              <span className="flex shrink-0 items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                <span className="text-[11px] font-medium text-gray-400">{synced}</span>
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-xs leading-relaxed text-gray-500">
        Live sync from your stack — no manual updates.
      </p>
    </div>
  );
}

export function AiSprintPlanShowcase({
  visible,
  demoHref,
}: {
  visible: boolean;
  demoHref: string;
}) {
  const [activeChapter, setActiveChapter] = React.useState(1);
  const active = SPRINT_CHAPTERS[activeChapter];

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-4xl px-2 transition-all duration-700 sm:px-4",
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
      )}
    >
      <div className="relative grid items-start gap-6 lg:grid-cols-[1fr_minmax(0,520px)_1fr] lg:gap-5">
        {/* Left satellite — desktop only */}
        <div className="hidden lg:block lg:pt-16">
          <div className="lg:translate-x-2 lg:rotate-[-2deg]">
            <ConnectedToolsCard />
          </div>
        </div>

        {/* Main companion window */}
        <div className="relative z-10 min-w-0">
          <div className="overflow-hidden rounded-[1.35rem] border border-gray-200/90 bg-white shadow-[0_32px_80px_rgba(15,23,42,0.12)] sm:rounded-[1.5rem]">
            <WindowChrome />

            <div className="px-5 pb-6 pt-7 sm:px-7 sm:pb-8 sm:pt-9">
              {/* Hero: sparkle + title */}
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <LoomSparkle className="h-14 w-14 sm:h-16 sm:w-16" />
                </div>
                <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0066FF]">
                  All six signals · one plan
                </p>
                <h3 className="mt-2 font-heading text-[1.625rem] font-bold leading-[1.02] tracking-[-0.035em] text-gray-900 sm:text-[1.9375rem]">
                  AI Sprint Plan
                  <span className="mt-1 block text-[#0066FF]">Generated</span>
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
                  Your backlog, capacity, and customer demand — merged into a plan your team can
                  commit to in the next standup.
                </p>
              </div>

              {/* Prompt chips — 2×2 grid like screenshot */}
              <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {PROMPTS.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-3.5 py-3.5 text-left transition-all hover:border-[#0066FF]/25 hover:bg-[#F5F9FF] hover:shadow-[0_4px_20px_rgba(0,102,255,0.08)]"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#0066FF] transition-colors group-hover:bg-[#0066FF] group-hover:text-white">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="text-[13px] font-medium leading-snug text-gray-700">{label}</span>
                  </button>
                ))}
              </div>

              {/* Smart priorities — image carousel like Smart Chapters */}
              <div className="mt-8">
                <div className="mb-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
                      Smart priorities
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-800">{active.label}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#EFF6FF] px-2.5 py-1 text-[11px] font-bold text-[#0066FF]">
                    {active.points} pts
                  </span>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {SPRINT_CHAPTERS.map((chapter, i) => {
                    const selected = activeChapter === i;
                    return (
                      <button
                        key={chapter.label}
                        type="button"
                        onClick={() => setActiveChapter(i)}
                        className={cn(
                          "group shrink-0 rounded-xl p-1.5 text-left transition-all",
                          selected
                            ? "bg-[#0066FF] shadow-[0_8px_24px_rgba(0,102,255,0.25)]"
                            : "bg-transparent hover:bg-gray-50",
                        )}
                      >
                        <div
                          className={cn(
                            "relative h-[72px] w-[108px] overflow-hidden rounded-lg sm:h-[80px] sm:w-[120px]",
                            selected
                              ? "ring-2 ring-white/90 ring-offset-2 ring-offset-[#0066FF]"
                              : "ring-1 ring-gray-200",
                          )}
                        >
                          <Image
                            src={chapter.image}
                            alt=""
                            fill
                            sizes="120px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white">
                            {chapter.points} pts
                          </span>
                        </div>
                        <p
                          className={cn(
                            "mt-2 max-w-[108px] truncate text-xs font-semibold sm:max-w-[120px]",
                            selected ? "text-white" : "text-gray-700",
                          )}
                        >
                          {chapter.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chat input */}
              <div className="mt-7 flex items-center gap-2.5 rounded-2xl border border-gray-200 bg-[#FAFAFA] px-3 py-2 sm:px-4 sm:py-2.5">
                <button
                  type="button"
                  aria-label="Add context"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm"
                >
                  <Plus className="h-4 w-4" strokeWidth={2} />
                </button>
                <p className="min-w-0 flex-1 text-sm text-gray-400">
                  Ask ATLAS or type{" "}
                  <span className="font-medium text-gray-500">/for more</span>
                </p>
              </div>

              {/* Inline metrics */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-gray-100 pt-5 text-center sm:justify-between sm:text-left">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="font-heading text-xl font-bold text-[#0066FF]">87%</p>
                    <p className="text-[11px] font-medium text-gray-500">Plan accuracy</p>
                  </div>
                  <div>
                    <p className="font-heading text-lg font-bold text-[#6366F1]">HIGH</p>
                    <p className="text-[11px] font-medium text-gray-500">Confidence</p>
                  </div>
                  <div>
                    <p className="font-heading text-xl font-bold text-amber-500">2</p>
                    <p className="text-[11px] font-medium text-gray-500">Risks flagged</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {SIGNAL_ICON_SET.slice(0, 3).map((Icon, i) => (
                    <span
                      key={i}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50"
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                  ))}
                  <span className="text-[11px] font-medium text-gray-400">+3 signals</span>
                </div>
              </div>
            </div>
          </div>

          {/* Commit bar — sits below main card, no awkward overlap */}
          <div className="mt-5 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:flex sm:items-center sm:justify-between sm:px-6">
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-gray-900">
                47 points · 8 people · ready to commit
              </p>
              <p className="mt-0.5 text-xs text-gray-500">
                Built from 6 live signals in under 90 seconds
              </p>
            </div>
            <Link
              href={demoHref}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 sm:mt-0 sm:w-auto"
            >
              Try it on your backlog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right satellite — desktop only */}
        <div className="hidden lg:block lg:pt-8">
          <div className="lg:-translate-x-2 lg:rotate-[2deg]">
            <TopSignalsCard />
          </div>
        </div>
      </div>

      {/* Mobile: stack satellite cards below */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:hidden">
        <ConnectedToolsCard />
        <TopSignalsCard />
      </div>

      {/* Cursor hint — desktop */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[38%] left-[58%] z-20 hidden xl:block"
      >
        <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
          <path
            d="M2 1L2 24L8 18L11 28L13 27L10 17L18 15L2 1Z"
            fill="#111827"
            stroke="white"
            strokeWidth="1.25"
          />
        </svg>
      </div>
    </div>
  );
}
