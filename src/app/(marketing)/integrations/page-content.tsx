"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Link2,
  Settings2,
  RefreshCw,
  Code2,
  Webhook,
  BookOpen,
  MessageSquarePlus,
  CheckCircle2,
  Clock,
  Blocks,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Category =
  | "All"
  | "Code"
  | "Project"
  | "Design"
  | "CRM"
  | "Support"
  | "Revenue"
  | "Monitoring"
  | "Communication"
  | "Documents";

type Status = "available" | "coming-soon";

interface Integration {
  name: string;
  abbr: string;
  color: string;
  category: Exclude<Category, "All">;
  description: string;
  products: string[];
  status: Status;
}

/* ------------------------------------------------------------------ */
/*  Category filter data                                               */
/* ------------------------------------------------------------------ */

const CATEGORIES: { label: Category; count: number }[] = [
  { label: "All", count: 22 },
  { label: "Code", count: 3 },
  { label: "Project", count: 3 },
  { label: "Design", count: 3 },
  { label: "CRM", count: 2 },
  { label: "Support", count: 3 },
  { label: "Revenue", count: 1 },
  { label: "Monitoring", count: 2 },
  { label: "Communication", count: 6 },
  { label: "Documents", count: 1 },
];

/* ------------------------------------------------------------------ */
/*  Integration cards data                                             */
/* ------------------------------------------------------------------ */

const INTEGRATIONS: Integration[] = [
  // Code
  {
    name: "GitHub",
    abbr: "GH",
    color: "#22C55E",
    category: "Code",
    description:
      "Analyze code complexity, dependency graphs, and change frequency directly from your GitHub repositories.",
    products: ["ATLAS", "PHANTOM"],
    status: "available",
  },
  {
    name: "GitLab",
    abbr: "GL",
    color: "#F97316",
    category: "Code",
    description:
      "Connect GitLab repos for code-aware sprint planning and tech debt scanning across your codebase.",
    products: ["ATLAS", "PHANTOM"],
    status: "available",
  },
  {
    name: "Bitbucket",
    abbr: "BB",
    color: "#3B82F6",
    category: "Code",
    description:
      "Import Bitbucket repositories to power AI estimation with real code complexity signals.",
    products: ["ATLAS"],
    status: "available",
  },
  // Project
  {
    name: "Jira",
    abbr: "JR",
    color: "#2563EB",
    category: "Project",
    description:
      "Sync Jira boards, sprints, and epics. ATLAS overlays AI estimates onto your existing workflow.",
    products: ["ATLAS", "LOOP"],
    status: "available",
  },
  {
    name: "Linear",
    abbr: "LN",
    color: "#8B5CF6",
    category: "Project",
    description:
      "Import Linear projects and cycles for code-backed sprint plans that your team trusts.",
    products: ["ATLAS"],
    status: "available",
  },
  {
    name: "Asana",
    abbr: "AS",
    color: "#F87171",
    category: "Project",
    description:
      "Connect Asana projects for cross-team visibility and AI-powered task estimation.",
    products: ["ATLAS", "NEXUS"],
    status: "coming-soon",
  },
  // Design
  {
    name: "Figma",
    abbr: "FG",
    color: "#A855F7",
    category: "Design",
    description:
      "Detect design-to-code drift, estimate UI effort from Figma files, and sync design tokens automatically.",
    products: ["ATLAS", "DRIFT"],
    status: "available",
  },
  // CRM
  {
    name: "Salesforce",
    abbr: "SF",
    color: "#3B82F6",
    category: "CRM",
    description:
      "Pull CRM pipeline data to revenue-weight your backlog and align sprints with business outcomes.",
    products: ["LOOP", "NEXUS"],
    status: "available",
  },
  {
    name: "HubSpot",
    abbr: "HS",
    color: "#F97316",
    category: "CRM",
    description:
      "Connect HubSpot contacts, deals, and marketing signals to inform product prioritization.",
    products: ["LOOP"],
    status: "available",
  },
  // Support
  {
    name: "Zendesk",
    abbr: "ZD",
    color: "#22C55E",
    category: "Support",
    description:
      "Aggregate support tickets, CSAT scores, and escalation patterns into customer demand signals.",
    products: ["LOOP", "SIGNAL"],
    status: "available",
  },
  {
    name: "Intercom",
    abbr: "IC",
    color: "#3B82F6",
    category: "Support",
    description:
      "Ingest live chat conversations and product tour data to surface customer engagement patterns.",
    products: ["LOOP"],
    status: "coming-soon",
  },
  // Revenue
  {
    name: "Gong",
    abbr: "GG",
    color: "#8B5CF6",
    category: "Revenue",
    description:
      "Analyze sales call recordings for deal intelligence, competitive mentions, and feature requests.",
    products: ["LOOP"],
    status: "available",
  },
  // Monitoring
  {
    name: "Datadog",
    abbr: "DD",
    color: "#7C3AED",
    category: "Monitoring",
    description:
      "Correlate monitoring alerts with revenue impact and route incident context to the right teams.",
    products: ["SIGNAL", "PHANTOM"],
    status: "available",
  },
  {
    name: "PagerDuty",
    abbr: "PD",
    color: "#16A34A",
    category: "Monitoring",
    description:
      "Transform PagerDuty incidents into business impact assessments with intelligent routing.",
    products: ["SIGNAL"],
    status: "coming-soon",
  },
  // Communication
  {
    name: "Slack",
    abbr: "SL",
    color: "#7C3AED",
    category: "Communication",
    description:
      "Get sprint updates, risk alerts, and AI summaries delivered to your Slack channels in real time.",
    products: ["ATLAS", "LOOP", "SIGNAL"],
    status: "available",
  },
  {
    name: "Microsoft Teams",
    abbr: "TM",
    color: "#2563EB",
    category: "Communication",
    description:
      "Receive notifications, sprint digests, and incident briefs directly in Microsoft Teams.",
    products: ["ATLAS", "SIGNAL"],
    status: "coming-soon",
  },
];

/* ------------------------------------------------------------------ */
/*  Product color map                                                  */
/* ------------------------------------------------------------------ */

const PRODUCT_BADGE_COLORS: Record<string, string> = {
  ATLAS: "#f16e2c",
  LOOP: "#6366F1",
  PHANTOM: "#22D3EE",
  SIGNAL: "#EF4444",
  DRIFT: "#8B5CF6",
  NEXUS: "#10B981",
};

/* ------------------------------------------------------------------ */
/*  How It Works steps                                                 */
/* ------------------------------------------------------------------ */

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Connect",
    description:
      "Authenticate with OAuth or paste an API key. We request the minimum permissions needed and never store source code.",
    icon: <Link2 className="h-6 w-6" />,
  },
  {
    step: 2,
    title: "Configure",
    description:
      "Select which repositories, channels, or pipelines to sync. Fine-tune what data flows into Voatomy.",
    icon: <Settings2 className="h-6 w-6" />,
  },
  {
    step: 3,
    title: "Sync",
    description:
      "Data flows in real time. ATLAS, LOOP, and SIGNAL consume the signals they need, keeping your tools in one loop.",
    icon: <RefreshCw className="h-6 w-6" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const LOGO_CDN = "https://cdn.simpleicons.org";

const INTEGRATION_SLUGS: Record<string, string> = {
  GitHub: "github",
  GitLab: "gitlab",
  Bitbucket: "bitbucket",
  Jira: "jira",
  Linear: "linear",
  Asana: "asana",
  Figma: "figma",
  Salesforce: "salesforce",
  HubSpot: "hubspot",
  Zendesk: "zendesk",
  Intercom: "intercom",
  Slack: "slack",
  "Microsoft Teams": "microsoftteams",
  Datadog: "datadog",
  PagerDuty: "pagerduty",
  Gong: "gong",
  "Google Drive": "googledrive",
  Gmail: "gmail",
  "Microsoft Outlook": "microsoftoutlook",
  Framer: "framer",
  Freshdesk: "freshdesk",
  "Google Calendar": "googlecalendar",
};

function IntegrationIcon({
  name,
  abbr,
  color,
}: {
  name: string;
  abbr: string;
  color: string;
}) {
  const slug = INTEGRATION_SLUGS[name];
  const [imgError, setImgError] = React.useState(false);

  if (slug && !imgError) {
    return (
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border"
        style={{
          backgroundColor: `${color}15`,
          borderColor: `${color}30`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${LOGO_CDN}/${slug}/${color.replace("#", "")}`}
          alt={name}
          width={24}
          height={24}
          className="object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
      style={{ backgroundColor: color, color: "#fff" }}
    >
      {abbr}
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "available") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
        <CheckCircle2 className="h-3 w-3" />
        Available
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-500">
      <Clock className="h-3 w-3" />
      Coming Soon
    </span>
  );
}

function ProductBadge({ name }: { name: string }) {
  const color = PRODUCT_BADGE_COLORS[name] ?? "#94A3B8";
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide"
      style={{
        backgroundColor: `${color}15`,
        color: color,
      }}
    >
      {name}
    </span>
  );
}

function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <Card className="flex flex-col gap-4 p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <IntegrationIcon
          name={integration.name}
          abbr={integration.abbr}
          color={integration.color}
        />
        <StatusBadge status={integration.status} />
      </div>

      {/* Name + category */}
      <div>
        <h3 className="text-base font-semibold text-theme">{integration.name}</h3>
        <span className="mt-0.5 inline-block text-xs font-medium text-theme-m">
          {integration.category}
        </span>
      </div>

      {/* Description */}
      <p className="flex-1 text-sm leading-relaxed text-theme-s">
        {integration.description}
      </p>

      {/* Product badges */}
      <div>
        <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-theme-m">
          Used by
        </p>
        <div className="flex flex-wrap gap-1.5">
          {integration.products.map((product) => (
            <ProductBadge key={product} name={product} />
          ))}
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = React.useState<Category>("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredIntegrations = React.useMemo(() => {
    let results = INTEGRATIONS;

    if (activeCategory !== "All") {
      results = results.filter((i) => i.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.products.some((p) => p.toLowerCase().includes(q)),
      );
    }

    return results;
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-theme">
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <Section variant="white" className="pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <Chip dotColor="#12FF80" className="mb-6">
            Integrations
          </Chip>

          <h1 className="text-3xl font-semibold tracking-tight text-theme sm:text-5xl lg:text-display-2">
            Integrations
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base text-theme-s sm:text-body-lg">
            Connect Voatomy with the tools your team already uses. 22+
            integrations and growing.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 max-w-lg">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-m" />
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full rounded-xl border border-theme bg-theme-card py-3 pl-11 pr-4 text-sm text-theme placeholder:text-theme-m",
                  "transition-all duration-200 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/20",
                )}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  CATEGORY FILTER                                             */}
      {/* ============================================================ */}
      <Section variant="white" className="py-0 sm:py-0 pb-8 sm:pb-12">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => setActiveCategory(cat.label)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                activeCategory === cat.label
                  ? "bg-brand text-[#0a0a0a] shadow-sm"
                  : "border border-theme bg-theme-card text-theme-s hover:border-theme-h hover:text-theme",
              )}
            >
              {cat.label}
              <span
                className={cn(
                  "ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                  activeCategory === cat.label
                    ? "bg-black/15 text-[#0a0a0a]"
                    : "bg-theme-subtle text-theme-m",
                )}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  INTEGRATION GRID                                            */}
      {/* ============================================================ */}
      <Section variant="white" className="py-4 sm:py-8">
        {filteredIntegrations.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredIntegrations.map((integration) => (
              <IntegrationCard
                key={integration.name}
                integration={integration}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md py-16 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-theme-subtle">
              <Search className="h-5 w-5 text-theme-m" />
            </div>
            <h3 className="text-lg font-semibold text-theme">
              No integrations found
            </h3>
            <p className="mt-2 text-sm text-theme-s">
              Try a different search term or category filter.
            </p>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-theme-m">
          Showing {filteredIntegrations.length} of {INTEGRATIONS.length}{" "}
          integrations
          {activeCategory !== "All" && (
            <span>
              {" "}
              in{" "}
              <span className="font-medium text-theme-s">{activeCategory}</span>
            </span>
          )}
        </p>
      </Section>

      {/* ============================================================ */}
      {/*  HOW INTEGRATIONS WORK                                       */}
      {/* ============================================================ */}
      <Section variant="violet" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Chip dotColor="#12FF80" className="mb-6">
            How It Works
          </Chip>
          <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Three steps to connected intelligence
          </h2>
          <p className="mt-3 text-base text-theme-s sm:text-body-lg">
            Get your tools streaming data into Voatomy in minutes, not days.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {HOW_IT_WORKS.map((step, i) => (
            <Card key={step.step} variant="light" className="relative text-center">
              {/* Step number */}
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10">
                <span className="text-sm font-bold text-brand">
                  {step.step}
                </span>
              </div>

              {/* Icon */}
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-theme-subtle text-brand">
                {step.icon}
              </div>

              <h3 className="text-lg font-semibold text-theme">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-theme-s">
                {step.description}
              </p>

              {/* Connector line between cards (hidden on mobile) */}
              {i < HOW_IT_WORKS.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 sm:block">
                  <ArrowRight className="h-5 w-5 text-theme-m" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  BUILD YOUR OWN                                              */}
      {/* ============================================================ */}
      <Section variant="white" className="py-16 sm:py-24">
        <Card className="mx-auto max-w-3xl overflow-hidden">
          <div className="flex flex-col items-center gap-8 p-8 sm:flex-row sm:p-10">
            {/* Icon cluster */}
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10">
                <Code2 className="h-7 w-7 text-brand" />
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-theme-subtle">
                <Webhook className="h-7 w-7 text-theme-s" />
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-theme-subtle">
                <Blocks className="h-7 w-7 text-theme-s" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-semibold text-theme">
                Build your own integration
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-theme-s">
                Build custom integrations with the Voatomy API. We provide a
                fully documented REST API, real-time Webhooks, and SDKs for
                TypeScript, Python, and Go.
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <Chip className="text-xs">REST API</Chip>
                <Chip className="text-xs">Webhooks</Chip>
                <Chip className="text-xs">TypeScript SDK</Chip>
                <Chip className="text-xs">Python SDK</Chip>
                <Chip className="text-xs">Go SDK</Chip>
              </div>

              <div className="mt-5">
                <Button variant="secondary" size="md" asChild>
                  <Link href="/docs">
                    <BookOpen className="mr-1.5 h-4 w-4" />
                    Read the API docs
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* ============================================================ */}
      {/*  CTA — REQUEST AN INTEGRATION                                */}
      {/* ============================================================ */}
      <Section variant="violet" className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10">
            <MessageSquarePlus className="h-6 w-6 text-brand" />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Don't see your tool?
          </h2>
          <p className="mt-3 text-base text-theme-s sm:text-body-lg">
            We ship new integrations every month. Tell us what you need and we
            will prioritize it.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact?topic=integration-request">
                Request an Integration
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/docs">
                Explore the API
              </Link>
            </Button>
          </div>

          <p className="mt-5 text-xs text-theme-m">
            We typically ship requested integrations within 4-6 weeks.
          </p>
        </div>
      </Section>
    </div>
  );
}
