"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { INTEGRATIONS } from "@/lib/constants";
import { VoatomyLogoMark } from "@/components/icons/voatomy-logo-mark";
import {
  FynkButtonPrimary,
  FynkDisplayHeading,
  FynkGradientBackdrop,
  FynkHeadingUnderlineAccent,
  FynkReveal,
  FynkSubheading,
} from "@/components/marketing/fynk-primitives";
import {
  DoodleIconChip,
  DoodleIntegrationIcon,
} from "@/components/marketing/doodle-integration-icons";
import { ColoredIconBadge } from "@/components/marketing/colored-icon-badge";
import { TeamworkGraphCanvas } from "@/components/marketing/teamwork-graph-canvas";
import {
  GraphLabelPill,
  HexIconStrip,
} from "@/components/marketing/graph-node-primitives";
import { INTEGRATION_GRAPH_POSITIONS } from "@/lib/graph-layout";
import { useLocale } from "@/i18n/locale-provider";

const FLOATING = [
  { name: "GitHub", label: "Code", color: "#238636" },
  { name: "Jira", label: "Projects", color: "#2684FF" },
  { name: "Slack", label: "Comms", color: "#E01E5A" },
  { name: "Figma", label: "Design", color: "#A259FF" },
  { name: "Linear", label: "Linear", color: "#5E6AD2" },
  { name: "Salesforce", label: "CRM", color: "#00A1E0" },
  { name: "Notion", label: "Docs", color: "#111827" },
  { name: "Datadog", label: "Ops", color: "#632CA6" },
] as const;

const HEX_STRIP = FLOATING.slice(0, 7);

const SPOTLIGHT = [
  {
    name: "GitHub",
    title: "Your code shapes the plan",
    desc: "Repos, PRs, and complexity flow into ATLAS — so estimates reflect reality, not optimism.",
    accent: "#238636",
    light: "#F0FFF4",
  },
  {
    name: "Jira",
    title: "Your backlog stays honest",
    desc: "Ticket weight and dependencies sync live — no more stale priorities from last month's spreadsheet.",
    accent: "#2684FF",
    light: "#EFF6FF",
  },
  {
    name: "Slack",
    title: "Alerts where your team already is",
    desc: "Sprint risks and updates land in Slack — so nothing important gets buried in email.",
    accent: "#E01E5A",
    light: "#FFF0F3",
  },
  {
    name: "Figma",
    title: "Design scope you can count on",
    desc: "Component complexity and design debt show up in every estimate — before handoff surprises your sprint.",
    accent: "#A259FF",
    light: "#F5F3FF",
  },
] as const;

const CATEGORIES = [
  { key: "Code", color: "#24292F", items: ["GitHub", "GitLab", "Bitbucket"] },
  { key: "Project", color: "#2684FF", items: ["Jira", "Linear", "Asana"] },
  { key: "Comms", color: "#E01E5A", items: ["Slack", "Microsoft Teams", "Gmail"] },
  { key: "Design", color: "#A259FF", items: ["Figma", "Framer", "Adobe Creative Cloud"] },
  { key: "CRM", color: "#00A1E0", items: ["Salesforce", "HubSpot", "Intercom"] },
  { key: "Ops", color: "#632CA6", items: ["Datadog", "PagerDuty", "Zendesk"] },
] as const;

function IntegrationsHubScene({ visible }: { visible: boolean }) {
  const nodes = FLOATING.map((item, i) => {
    const pos = INTEGRATION_GRAPH_POSITIONS[i];
    return {
      key: item.name,
      x: pos.x,
      y: pos.y,
      lineColor: item.color,
      lineOpacity: 0.65,
      node: (
        <GraphLabelPill
          label={item.label}
          color={item.color}
          icon={<DoodleIntegrationIcon name={item.name} size={22} />}
        />
      ),
    };
  });

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[540px] transition-all duration-700",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
    >
      <HexIconStrip
        className="mb-5"
        icons={HEX_STRIP.map((item) => ({
          key: item.name,
          node: <DoodleIntegrationIcon name={item.name} size={32} />,
        }))}
      />

      <TeamworkGraphCanvas
        visible={visible}
        variant="dark"
        minHeight={440}
        center={
          <div className="flex flex-col items-center">
            <div className="flex h-[72px] w-[72px] flex-col items-center justify-center rounded-2xl border border-white/15 bg-[#252b3b] shadow-xl">
              <VoatomyLogoMark className="h-9 w-9" />
              <span className="mt-1 text-[8px] font-bold uppercase tracking-widest text-emerald-300">
                Voatomy
              </span>
            </div>
          </div>
        }
        nodes={nodes}
      />
    </div>
  );
}

function SpotlightCard({
  item,
  index,
  visible,
}: {
  item: (typeof SPOTLIGHT)[number];
  index: number;
  visible: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[1.5rem] border-2 border-fynk-ink/10 bg-[#F3F4F6] p-5 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:p-6",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
      style={{ transitionDelay: `${250 + index * 70}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-fynk-ink/90 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
          <DoodleIntegrationIcon name={item.name} size={38} />
        </div>
        <div>
          <p className="font-handwriting text-[1.1rem] font-bold leading-none" style={{ color: item.accent }}>
            {item.name}
          </p>
          <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-fynk-ink">{item.title}</h3>
          <p className="mt-1.5 text-base leading-relaxed text-fynk-muted">{item.desc}</p>
        </div>
      </div>
      <div
        className="mt-4 h-1 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: `${item.accent}22` }}
      >
        <div className="h-full w-3/4 rounded-full" style={{ backgroundColor: item.accent }} />
      </div>
    </article>
  );
}

export function IntegrationsSection() {
  const { ref, isVisible } = useScrollAnimation(0.08);
  const { localizedPath } = useLocale();

  const extraCount = INTEGRATIONS.length;

  return (
    <section className="light-surface-typography relative overflow-hidden bg-white px-4 py-20 sm:py-28">
      <FynkGradientBackdrop intensity="soft" />

      <div ref={ref} className="relative z-[1] mx-auto max-w-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <FynkReveal visible={isVisible} direction="left">
            <FynkDisplayHeading>
              Works with your stack.{" "}
              <FynkHeadingUnderlineAccent variant="sky">Delivers value this week.</FynkHeadingUnderlineAccent>
            </FynkDisplayHeading><FynkSubheading className="mt-5 text-left lg:mx-0">
              {extraCount}+ integrations — GitHub, Jira, Linear, Slack, Salesforce, and more. Connect
              in minutes. No custom dev project. No waiting on IT.
            </FynkSubheading>

            <div className="mt-8 flex flex-wrap gap-2">
              {["5-min OAuth setup", "Real-time sync", "Your code stays put", "Free to try"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border-2 border-fynk-ink/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-fynk-ink shadow-sm"
                >
                  {chip}
                </span>
              ))}
            </div>
          </FynkReveal>

          <FynkReveal visible={isVisible} direction="right">
            <IntegrationsHubScene visible={isVisible} />
          </FynkReveal>
        </div>

        <div className="mt-16 space-y-4">
          {CATEGORIES.map((cat, ci) => (
            <div
              key={cat.key}
              className={cn(
                "overflow-hidden rounded-[1.25rem] border-2 border-fynk-ink/8 bg-[#F9FAFB] p-4 transition-all duration-500 sm:p-5",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: `${200 + ci * 60}ms` }}
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.key}
                </span>
                <span className="text-xs text-fynk-muted">{cat.items.length} integrations</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {cat.items.map((name, ii) => (
                  <DoodleIconChip
                    key={name}
                    name={name}
                    size={34}
                    rotate={(ci + ii) % 2 === 0 ? 3 : -3}
                  />
                ))}
                <div className="flex items-center rounded-2xl border-2 border-dashed border-fynk-ink/15 bg-white/60 px-4 py-2">
                  <span className="font-handwriting text-sm font-bold text-fynk-muted">+ more</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {SPOTLIGHT.map((item, i) => (
            <SpotlightCard key={item.name} item={item} index={i} visible={isVisible} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <FynkButtonPrimary href={localizedPath("/integrations")} variant="ink" className="inline-flex">
            View all integrations
            <ArrowRight className="h-4 w-4" />
          </FynkButtonPrimary>
        </div>
      </div>
    </section>
  );
}
