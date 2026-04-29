"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  GitBranch,
  Layers,
  Sparkles,
  Wrench,
  Rocket,
  Palette,
  Target,
  Users,
  Mail,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Release type configuration                                         */
/* ------------------------------------------------------------------ */

type ReleaseType = "feature" | "fix" | "improvement" | "major" | "product" | "enhancement";

interface ReleaseTypeConfig {
  label: string;
  color: string;
  bgClass: string;
  textClass: string;
}

const RELEASE_TYPES: Record<ReleaseType, ReleaseTypeConfig> = {
  feature: {
    label: "Feature",
    color: "#0d9488",
    bgClass: "bg-[#0d9488]/10",
    textClass: "text-[#0d9488]",
  },
  fix: {
    label: "Fix",
    color: "#F59E0B",
    bgClass: "bg-amber-500/10",
    textClass: "text-amber-400",
  },
  improvement: {
    label: "Improvement",
    color: "#3B82F6",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-400",
  },
  major: {
    label: "Major Release",
    color: "#0d9488",
    bgClass: "bg-[#0d9488]/15",
    textClass: "text-[#0d9488]",
  },
  product: {
    label: "New Product",
    color: "#A855F7",
    bgClass: "bg-purple-500/10",
    textClass: "text-purple-400",
  },
  enhancement: {
    label: "Enhancement",
    color: "#6366F1",
    bgClass: "bg-indigo-500/10",
    textClass: "text-indigo-400",
  },
};

/* ------------------------------------------------------------------ */
/*  Changelog entry data                                               */
/* ------------------------------------------------------------------ */

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  type: ReleaseType;
  description: string;
  bullets: string[];
  icon: React.ReactNode;
}

const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    version: "v2.4.0",
    date: "Feb 19, 2026",
    title: "Cross-Team Dependencies Dashboard",
    type: "feature",
    description:
      "ATLAS now renders interactive cross-team dependency graphs so you can spot bottlenecks before they cascade across squads.",
    bullets: [
      "Visualize blocking and blocked relationships between any two teams in real time",
      "Receive automated alerts when a dependency becomes a critical-path risk",
      "Export dependency maps as SVG or embed them in Confluence and Notion pages",
    ],
    icon: <Layers className="h-5 w-5" />,
  },
  {
    version: "v2.3.2",
    date: "Feb 8, 2026",
    title: "Sprint Accuracy Improvements",
    type: "improvement",
    description:
      "Accuracy algorithm v3 landed, delivering 12% better sprint estimates out of the box by weighting recent velocity more heavily.",
    bullets: [
      "New exponential decay model gives higher weight to the last three sprints",
      "Recalibration runs nightly instead of weekly for faster convergence",
      "Accuracy dashboard now shows confidence intervals alongside point estimates",
    ],
    icon: <Target className="h-5 w-5" />,
  },
  {
    version: "v2.3.0",
    date: "Jan 27, 2026",
    title: "PHANTOM Beta Launch",
    type: "product",
    description:
      "Introducing PHANTOM, the tech debt radar that scans your codebase and translates complexity hotspots into dollar-impact estimates your leadership team actually understands.",
    bullets: [
      "Automated codebase scan identifies coupling, complexity, and coverage gaps",
      "Dollar-impact translation converts tech debt into estimated engineering cost",
      "Executive-ready PDF reports generated on demand or on a weekly schedule",
    ],
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    version: "v2.2.1",
    date: "Jan 14, 2026",
    title: "Figma Plugin Update",
    type: "fix",
    description:
      "Resolved intermittent token sync delays that caused the DRIFT Figma plugin to fall behind by up to 30 seconds on large files.",
    bullets: [
      "Fixed WebSocket reconnection logic that silently dropped change events",
      "Reduced average sync latency from 12 s to under 2 s on files with 500+ components",
      "Added a connection-status indicator inside the Figma plugin panel",
    ],
    icon: <Wrench className="h-5 w-5" />,
  },
  {
    version: "v2.2.0",
    date: "Dec 15, 2025",
    title: "Revenue-Weighted Backlog",
    type: "feature",
    description:
      "LOOP integration now scores every backlog item by estimated revenue impact, helping product teams prioritize what moves the needle.",
    bullets: [
      "CRM deal data flows into ATLAS to surface high-value feature requests",
      "Revenue-weighted sort option available in backlog, sprint, and roadmap views",
      "New Slack digest summarizes the top revenue-impacting items each Monday",
    ],
    icon: <GitBranch className="h-5 w-5" />,
  },
  {
    version: "v2.1.0",
    date: "Nov 20, 2025",
    title: "Dark Mode",
    type: "enhancement",
    description:
      "Full dark mode support across every surface in the platform, including dashboards, reports, and the embedded Figma preview.",
    bullets: [
      "System-preference detection with a manual override toggle in settings",
      "High-contrast variant available for accessibility compliance",
      "All chart and graph palettes adjusted for optimal readability on dark backgrounds",
    ],
    icon: <Palette className="h-5 w-5" />,
  },
  {
    version: "v2.0.0",
    date: "Oct 10, 2025",
    title: "ATLAS 2.0",
    type: "major",
    description:
      "A complete redesign of the ATLAS sprint planner, now powered by 6-signal analysis that fuses code, design, revenue, demand, debt, and capacity data.",
    bullets: [
      "Unified 6-signal engine replaces the previous 3-signal model for richer estimates",
      "Redesigned sprint board with drag-and-drop reordering and inline editing",
      "New retrospective AI auto-generates improvement suggestions after each sprint",
      "Performance overhaul cuts plan generation time from 18 s to under 4 s",
    ],
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    version: "v1.5.0",
    date: "Sep 8, 2025",
    title: "Team Capacity Intelligence",
    type: "feature",
    description:
      "Smart capacity modeling that accounts for PTO schedules, on-call rotations, and individual skill profiles to produce realistic sprint plans.",
    bullets: [
      "Google Calendar and Outlook integration auto-imports PTO and focus blocks",
      "Skill-based assignment suggestions match tasks to the best-fit engineer",
      "Capacity heatmap shows team availability across the next four sprints",
    ],
    icon: <Users className="h-5 w-5" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Timeline entry component                                           */
/* ------------------------------------------------------------------ */

function TimelineEntry({
  entry,
  isLast,
}: {
  entry: ChangelogEntry;
  isLast: boolean;
}) {
  const typeConfig = RELEASE_TYPES[entry.type];

  return (
    <div className="relative flex gap-6 sm:gap-8">
      {/* ── Vertical line + dot ── */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <div
          className={cn(
            "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300",
            entry.type === "major"
              ? "border-[#0d9488]/40 bg-[#0d9488]/10 text-[#0d9488]"
              : "border-theme bg-theme-card text-theme-s",
          )}
        >
          {entry.icon}
        </div>

        {/* Connecting line */}
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-theme-card via-theme to-transparent" />
        )}
      </div>

      {/* ── Content card ── */}
      <div className={cn("flex-1 pb-12", isLast && "pb-0")}>
        {/* Meta row */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {/* Version badge */}
          <span className="rounded-md bg-theme-subtle px-2 py-0.5 text-xs font-mono font-semibold text-theme-s transition-colors duration-300">
            {entry.version}
          </span>

          {/* Type chip */}
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
              typeConfig.bgClass,
              typeConfig.textClass,
            )}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: typeConfig.color }}
            />
            {typeConfig.label}
          </span>

          {/* Date */}
          <span className="text-xs text-theme-m">{entry.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold tracking-tight text-theme sm:text-xl">
          {entry.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-theme-s sm:text-base">
          {entry.description}
        </p>

        {/* Bullet points */}
        <ul className="mt-4 space-y-2">
          {entry.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-theme-s">
              <ChevronRight
                className="mt-0.5 h-3.5 w-3.5 shrink-0"
                style={{ color: typeConfig.color }}
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function ChangelogPage() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-theme">
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <Section variant="sky" className="pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <Chip dotColor="#0d9488" className="mb-6">
            Changelog
          </Chip>

          <h1 className="text-3xl font-semibold tracking-tight text-theme sm:text-5xl lg:text-display-2">
            Changelog
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base text-theme-s sm:text-body-lg">
            What&apos;s new in Voatomy. We ship updates every week.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Button variant="secondary" size="sm" asChild>
              <Link href="/products/atlas">
                <Rocket className="mr-1 h-3.5 w-3.5" />
                View Roadmap
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#subscribe">
                <Bell className="mr-1 h-3.5 w-3.5" />
                Get Notified
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  VERSION SUMMARY STRIP                                       */}
      {/* ============================================================ */}
      <Section variant="violet" className="py-8 sm:py-10">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {[
            { label: "Latest", value: "v2.4.0", color: "#0d9488" },
            { label: "Releases this year", value: "4", color: "#3B82F6" },
            { label: "Total releases", value: "8", color: "#A855F7" },
            { label: "Avg. cycle", value: "~3 weeks", color: "#F59E0B" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-bold text-theme sm:text-2xl" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="mt-0.5 text-xs text-theme-m">{stat.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  TIMELINE                                                    */}
      {/* ============================================================ */}
      <Section variant="sky" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          {/* Section label */}
          <div className="mb-10 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10">
              <GitBranch className="h-4 w-4 text-brand" />
            </span>
            <h2 className="text-lg font-semibold text-theme">All Releases</h2>
            <span className="rounded-full bg-theme-subtle px-2.5 py-0.5 text-xs font-medium text-theme-m transition-colors duration-300">
              {CHANGELOG_ENTRIES.length} releases
            </span>
          </div>

          {/* Timeline entries */}
          <div className="relative">
            {CHANGELOG_ENTRIES.map((entry, i) => (
              <TimelineEntry
                key={entry.version}
                entry={entry}
                isLast={i === CHANGELOG_ENTRIES.length - 1}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SUBSCRIBE                                                   */}
      {/* ============================================================ */}
      <Section variant="violet" className="py-16 sm:py-24" id="subscribe">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10">
            <Mail className="h-6 w-6 text-brand" />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Get notified about new releases
          </h2>
          <p className="mt-3 text-base text-theme-s">
            Subscribe to our changelog and receive updates directly in your inbox. No spam, just product news.
          </p>

          {subscribed ? (
            <div className="mt-8 rounded-2xl border border-[#0d9488]/20 bg-[#0d9488]/5 p-6">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0d9488]/15">
                <Bell className="h-5 w-5 text-[#0d9488]" />
              </div>
              <p className="text-sm font-semibold text-[#0d9488]">You&apos;re subscribed!</p>
              <p className="mt-1 text-xs text-theme-m">
                We&apos;ll send you an email whenever we ship something new.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className={cn(
                    "h-12 flex-1 rounded-xl border border-theme bg-theme-card px-4 text-sm font-medium text-theme transition-colors duration-300",
                    "placeholder:text-theme-m",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand",
                    "sm:max-w-xs",
                  )}
                />
                <Button type="submit" variant="primary" size="lg">
                  Subscribe
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <p className="mt-3 text-xs text-theme-m">
                Unsubscribe anytime. We respect your inbox.
              </p>
            </form>
          )}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  BOTTOM CTA                                                  */}
      {/* ============================================================ */}
      <Section variant="sky" className="py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-semibold tracking-tight text-theme sm:text-2xl">
            Ready to try the latest features?
          </h2>
          <p className="mt-2 text-sm text-theme-s">
            Start free and upgrade when you need more power. No credit card required.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/auth/signup">
                Start Free
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
