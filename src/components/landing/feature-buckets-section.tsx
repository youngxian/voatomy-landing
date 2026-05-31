"use client";

import Link from "next/link";
import * as React from "react";
import { FEATURE_BUCKETS } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ArrowRight, Zap, Brain, GitBranch, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import {
  FynkCard,
  FynkDisplayHeading,
  FynkGradientBackdrop,
  FynkHeadingUnderlineAccent,
  FynkReveal,
  FynkSubheading,
} from "@/components/marketing/fynk-primitives";
import { ColoredIconBadge, ColoredIconPill } from "@/components/marketing/colored-icon-badge";
import {
  BUCKET_GRADIENTS,
  BUCKET_ICON_SET,
} from "@/components/marketing/landing-section-icons";
import { cn } from "@/lib/utils";

const INK = "#111827";

const BUCKET_CONFIG = [
  { label: "Plan", accent: "#004838", light: "#e6fff0", tag: "commit with proof", FeatureIcon: Zap },
  { label: "Organize", accent: "#3B82F6", light: "#EFF6FF", tag: "one source of truth", FeatureIcon: Layers },
  { label: "Scale", accent: "#F05A28", light: "#FFF4EF", tag: "grow without chaos", FeatureIcon: GitBranch },
  { label: "Insights", accent: "#8B5CF6", light: "#EDE9FE", tag: "show your progress", FeatureIcon: Brain },
] as const;

const SPRINT_INSIGHT_CARDS = [
  {
    id: "video-risks",
    type: "VIDEO",
    title: "Catch sprint risks before your standup ends",
    cta: "Watch free",
    href: "/demo",
    color: "#3d5a1e",
    visualIndex: 0,
    accent: "#004838",
  },
  {
    id: "guide-complexity",
    type: "GUIDE",
    title: "How Voatomy reads your code — without storing it",
    cta: "Read the guide",
    href: "/docs",
    color: "#b45309",
    visualIndex: 0,
    accent: "#F05A28",
  },
  {
    id: "report-2026",
    type: "REPORT",
    title: "Why most sprint plans fail (and what top teams do instead)",
    cta: "Get the report",
    href: "/blog",
    color: "#6b3293",
    visualIndex: 3,
    accent: "#8B5CF6",
  },
  {
    id: "demo-atlas",
    type: "DEMO",
    title: "See ATLAS build a sprint plan in under 10 minutes",
    cta: "Try the demo",
    href: "/demo",
    color: "#1e4fad",
    visualIndex: 1,
    accent: "#2684FF",
  },
  {
    id: "webinar-capacity",
    type: "WEBINAR",
    title: "Stop guessing who's actually available this sprint",
    cta: "Save your seat",
    href: "/demo",
    color: "#0f766e",
    visualIndex: 2,
    accent: "#14B8A6",
  },
  {
    id: "case-study-ship",
    type: "CASE STUDY",
    title: "How one team went from missed dates to 40% fewer slip-ups",
    cta: "Read their story",
    href: "/customers",
    color: "#9f1239",
    visualIndex: 3,
    accent: "#F43F5E",
  },
  {
    id: "template-plan",
    type: "TEMPLATE",
    title: "The sprint readiness checklist leads actually use",
    cta: "Download free",
    href: "/docs",
    color: "#4338ca",
    visualIndex: 1,
    accent: "#6366F1",
  },
  {
    id: "playbook-signals",
    type: "PLAYBOOK",
    title: "Six warning signs your next sprint is already in trouble",
    cta: "Get the playbook",
    href: "/use-cases/sprint-planning",
    color: "#c2410c",
    visualIndex: 0,
    accent: "#EA580C",
  },
] as const;

function SprintInsightCard({
  type,
  title,
  cta,
  href,
  color,
  visualIndex,
  accent,
}: (typeof SPRINT_INSIGHT_CARDS)[number]) {
  return (
    <article className="flex w-[320px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl sm:w-[380px] lg:w-[400px]">
      <div className="relative h-[200px] overflow-hidden bg-[#F3F4F6] sm:h-[220px]">
        <div className="absolute inset-3">
          <BucketVisual index={visualIndex} accent={accent} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-7 sm:p-8" style={{ backgroundColor: color }}>
        <span className="inline-flex w-fit border border-white/50 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white sm:text-[13px]">
          {type}
        </span>
        <h3 className="mt-5 font-heading text-lg font-bold leading-[1.3] tracking-[-0.02em] text-white sm:text-xl lg:text-[1.4375rem]">
          {title}
        </h3>
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-base font-semibold text-white transition-opacity hover:opacity-85 sm:text-[17px]"
        >
          {cta}
          <ArrowRight className="h-5 w-5" strokeWidth={2} />
        </Link>
      </div>
    </article>
  );
}

function SprintInsightsCarousel() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === "left" ? -400 : 400;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-1 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] sm:-mx-0 sm:gap-6 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {SPRINT_INSIGHT_CARDS.map((card) => (
          <SprintInsightCard key={card.id} {...card} />
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll("left")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-fynk-border bg-[#E5E7EB] text-fynk-ink transition-colors hover:bg-[#D1D5DB]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-fynk-ink text-white transition-colors hover:bg-fynk-ink/90"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

function BucketVisual({ index, accent }: { index: number; accent: string }) {
  /* Lighter, branded illustrations — fynk-orange/blue palette, no foreignObject.
     Each visual fills its container (viewBox 240x140) cleanly. */
  const visuals: Record<number, React.ReactNode> = {
    // ── 0 · PLAN — sprint card with progress bars + accuracy badge ──
    0: (
      <svg viewBox="0 0 240 140" fill="none" className="h-full w-full" aria-hidden>
        {/* sprint card */}
        <rect x="32" y="22" width="176" height="96" rx="10" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
        {/* lightning icon tile */}
        <rect x="42" y="32" width="22" height="22" rx="6" fill={`${accent}1f`} />
        <path
          d="M 56 36 L 50 47 L 54 47 L 51 53 L 58 43 L 53 43 Z"
          fill={accent}
          stroke={accent}
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
        {/* heading */}
        <text x="72" y="48" fill={INK} fontSize="10" fontWeight="700">Sprint 24 · ATLAS</text>
        {/* progress rows */}
        {[0, 1, 2, 3].map((r) => {
          const y = 62 + r * 12;
          const filled = [110, 92, 74, 56][r];
          return (
            <g key={r}>
              <rect x="42" y={y} width="156" height="6" rx="3" fill="#F3F4F6" />
              <rect x="42" y={y} width={filled} height="6" rx="3" fill={accent} opacity={0.85 - r * 0.15} />
              <circle cx={42 + filled - 3} cy={y + 3} r="3" fill={accent} />
            </g>
          );
        })}
        {/* accuracy badge */}
        <g transform="translate(164 14) rotate(6)">
          <rect width="56" height="28" rx="14" fill={accent} />
          <text x="28" y="18" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">
            87%
          </text>
        </g>
      </svg>
    ),

    // ── 1 · ORGANIZE — kanban-style cards (one source of truth) ──
    1: (
      <svg viewBox="0 0 240 140" fill="none" className="h-full w-full" aria-hidden>
        {/* column headers */}
        {[
          { x: 24, label: "Backlog", color: "#9CA3AF" },
          { x: 96, label: "In progress", color: "#3B82F6" },
          { x: 168, label: "Done", color: "#22C55E" },
        ].map((col) => (
          <g key={col.label}>
            <circle cx={col.x + 4} cy={28} r="3" fill={col.color} />
            <text x={col.x + 12} y={31} fill={INK} fontSize="8" fontWeight="700">
              {col.label}
            </text>
          </g>
        ))}
        {/* cards */}
        {[
          { x: 22, y: 42, w: 64, accent: "#9CA3AF" },
          { x: 22, y: 72, w: 64, accent: "#9CA3AF" },
          { x: 94, y: 42, w: 64, accent: "#3B82F6" },
          { x: 94, y: 84, w: 64, accent: "#3B82F6" },
          { x: 166, y: 42, w: 64, accent: "#22C55E" },
        ].map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={c.y} width={c.w} height="26" rx="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.2" />
            <rect x={c.x} y={c.y} width="3" height="26" rx="1.5" fill={c.accent} />
            <rect x={c.x + 10} y={c.y + 6} width={c.w - 18} height="3.5" rx="1.75" fill="#1F2937" opacity={0.85} />
            <rect x={c.x + 10} y={c.y + 14} width={c.w - 30} height="3" rx="1.5" fill="#E5E7EB" />
            <circle cx={c.x + c.w - 8} cy={c.y + 18} r="3" fill={c.accent} opacity="0.18" />
          </g>
        ))}
        {/* connecting arrow */}
        <path
          d="M 86 60 L 94 56"
          stroke={accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          markerEnd="url(#arrow1)"
        />
        <defs>
          <marker id="arrow1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M 0 0 L 5 3 L 0 6 Z" fill={accent} />
          </marker>
        </defs>
      </svg>
    ),

    // ── 2 · SCALE — bars trending up + arrow ─────────────────
    2: (
      <svg viewBox="0 0 240 140" fill="none" className="h-full w-full" aria-hidden>
        {/* baseline */}
        <line x1="36" y1="108" x2="204" y2="108" stroke="#E5E7EB" strokeWidth="1.5" />
        {/* bars */}
        {[
          { x: 42, h: 32, l: "Q1" },
          { x: 80, h: 50, l: "Q2" },
          { x: 118, h: 64, l: "Q3" },
          { x: 156, h: 84, l: "Q4" },
        ].map((b) => (
          <g key={b.l}>
            <rect x={b.x} y={108 - b.h} width="26" height={b.h} rx="5" fill={`${accent}26`} />
            <rect x={b.x} y={108 - b.h} width="26" height="6" rx="3" fill={accent} />
            <text x={b.x + 13} y="120" textAnchor="middle" fill="#9CA3AF" fontSize="8" fontWeight="600">
              {b.l}
            </text>
          </g>
        ))}
        {/* growth arrow */}
        <path
          d="M 50 76 Q 100 60, 130 50 T 184 28"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <g transform="translate(180 24)">
          <path
            d="M 0 4 L 8 0 L 8 8 Z"
            fill={accent}
            transform="rotate(20)"
          />
        </g>
        {/* +47% badge */}
        <g transform="translate(146 12) rotate(-4)">
          <rect width="56" height="22" rx="11" fill={accent} />
          <text x="28" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">
            +47%
          </text>
        </g>
      </svg>
    ),

    // ── 3 · INSIGHTS — line chart with milestone dots + badge ──
    3: (
      <svg viewBox="0 0 240 140" fill="none" className="h-full w-full" aria-hidden>
        {/* dashboard frame */}
        <rect x="28" y="26" width="184" height="92" rx="10" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
        {/* grid lines */}
        {[44, 60, 76, 92].map((y) => (
          <line key={y} x1="44" y1={y} x2="196" y2={y} stroke="#F3F4F6" strokeWidth="1" />
        ))}
        {/* line chart */}
        <polyline
          points="50,96 78,82 106,86 134,64 162,58 190,40"
          fill="none"
          stroke={accent}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* area fill under line */}
        <polygon
          points="50,96 78,82 106,86 134,64 162,58 190,40 190,104 50,104"
          fill={accent}
          opacity="0.08"
        />
        {/* milestone dots */}
        {[
          { x: 50, y: 96 },
          { x: 78, y: 82 },
          { x: 106, y: 86 },
          { x: 134, y: 64 },
          { x: 162, y: 58 },
          { x: 190, y: 40 },
        ].map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
          </g>
        ))}
        {/* +33% badge */}
        <g transform="translate(154 12) rotate(-3)">
          <rect width="52" height="22" rx="11" fill={accent} />
          <text x="26" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">
            +33%
          </text>
        </g>
      </svg>
    ),
  };

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-fynk-border bg-white">
      <div className="relative h-full px-2 pb-2 pt-1">{visuals[index]}</div>
    </div>
  );
}

export function FeatureBucketsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="light-surface-typography relative overflow-hidden bg-fynk-surface-alt px-4 py-12 sm:py-20 lg:py-28">
      <FynkGradientBackdrop intensity="soft" />

      <div ref={ref} className="relative z-[1] mx-auto max-w-container">
        {/* Atlassian-style: left-aligned headline + horizontal insight cards */}
        <FynkReveal visible={isVisible}>
          <div className="max-w-3xl">
            <FynkDisplayHeading>
              Know what&apos;s in every sprint —
              <br />
              <FynkHeadingUnderlineAccent variant="sky">
                before it costs you a release.
              </FynkHeadingUnderlineAccent>
            </FynkDisplayHeading>
            <p className="mt-4 max-w-2xl text-sm font-normal leading-relaxed text-fynk-body sm:mt-5 sm:text-base md:text-lg">
              Your backlog, repos, and team capacity already tell the story. Voatomy reads them
              together and surfaces what matters — so you fix problems on Monday, not the night
              before launch.
            </p>
          </div>

          <div className="mt-10 sm:mt-12">
            <SprintInsightsCarousel />
          </div>
        </FynkReveal>

        <div className="mt-16 text-center sm:mt-20">
          <FynkDisplayHeading align="center">
            Less busywork.{" "}
            <FynkHeadingUnderlineAccent>More shipping.</FynkHeadingUnderlineAccent>
          </FynkDisplayHeading>
          <FynkSubheading className="mt-4">
            Every feature exists for one reason: help your team pick the right work, hit the dates
            you promised, and leave planning meetings feeling aligned — not exhausted.
          </FynkSubheading>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-5">
          {FEATURE_BUCKETS.map((bucket, i) => {
            const { label, accent, light, tag, FeatureIcon } = BUCKET_CONFIG[i];
            const IconSvg = BUCKET_ICON_SET[i];
            const gradient = BUCKET_GRADIENTS[i];

            return (
              <FynkCard
                key={bucket.key}
                visible={isVisible}
                delay={150 + i * 80}
                className="group flex h-full flex-col overflow-hidden p-0 hover:shadow-xl"
              >
                <div className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <ColoredIconPill
                      label={label}
                      bg={light}
                      color={accent}
                      icon={
                        <ColoredIconBadge
                          size="sm"
                          bg={gradient}
                          ringColor="rgba(255,255,255,0.95)"
                          className="!h-5 !w-5 !rounded-full !shadow-none !border-0"
                        >
                          <IconSvg className="h-3.5 w-3.5" />
                        </ColoredIconBadge>
                      }
                    />
                    <span
                      className="font-handwriting text-[1rem] font-bold leading-none sm:text-[1.15rem]"
                      style={{ color: accent }}
                    >
                      {tag}
                    </span>
                  </div>

                  <div className="mt-5 flex items-start gap-4">
                    <ColoredIconBadge size="md" bg={gradient} ringColor="rgba(255,255,255,0.9)">
                      <FeatureIcon
                        className="h-5 w-5"
                        style={{ color: accent }}
                        strokeWidth={2}
                        fill={`${accent}22`}
                      />
                    </ColoredIconBadge>
                    <div>
                      <h3 className="font-heading text-base font-bold leading-snug text-fynk-ink sm:text-lg">
                        {bucket.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-fynk-muted sm:mt-2 sm:text-base">
                        {bucket.desc}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {bucket.features.map((f) => (
                      <li
                        key={f}
                        className="inline-flex items-center gap-1.5 rounded-full border border-fynk-border bg-fynk-surface-alt px-3 py-1 text-xs font-medium text-fynk-body transition-colors group-hover:bg-white"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: accent }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/demo"
                    className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all hover:gap-2.5"
                    style={{ backgroundColor: light, color: accent }}
                  >
                    See it in action
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div
                  className={cn(
                    "mt-auto border-t border-fynk-border p-4 transition-colors group-hover:bg-white",
                  )}
                  style={{ backgroundColor: `${light}66` }}
                >
                  <BucketVisual index={i} accent={accent} />
                </div>
              </FynkCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
