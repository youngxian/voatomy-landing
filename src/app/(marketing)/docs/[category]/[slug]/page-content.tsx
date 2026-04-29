"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  FileText,
  FolderOpen,
  Search,
  Menu,
  X,
} from "lucide-react";

const BRAND_GREEN = "#12FF80";

const DOCS_DATA: Record<string, Record<string, { title: string; description: string; content: string[] }>> = {
  "getting-started": {
    "quickstart": {
      title: "Quickstart Guide",
      description: "Get up and running with Voatomy in under 5 minutes.",
      content: [
        "Welcome to Voatomy! This guide walks you through setting up your workspace from scratch. By the end, you'll have a fully configured environment ready for AI-powered sprint planning.",
        "Step 1: Create your workspace. Sign up at app.voatomy.com and choose a workspace name. This will be your team's home base for all Voatomy products.",
        "Step 2: Invite your team. Navigate to Settings → Team and send invitations via email. Team members can be assigned roles: Admin, Manager, or Member.",
        "Step 3: Connect your first integration. Go to Settings → Integrations and connect GitHub, GitLab, or Jira. OAuth flows handle authentication automatically.",
        "Step 4: Run your first analysis. Once connected, ATLAS will begin analyzing your repositories. Initial analysis takes 2-5 minutes depending on repo size.",
      ],
    },
    "workspace-setup": {
      title: "Workspace Setup",
      description: "Configure your Voatomy workspace settings, team roles, and notification preferences.",
      content: [
        "Your workspace is the central hub for all Voatomy activity. This guide covers the key configuration options available to workspace administrators.",
        "Workspace settings include general options (name, timezone, default sprint length), security settings (SSO, 2FA requirements), and notification preferences.",
        "Team roles follow a hierarchical model: Owners have full access, Admins can manage integrations and team members, Managers can create and modify sprint plans, and Members have read access with limited write permissions.",
        "Notification channels can be configured per-product. ATLAS notifications go to engineering channels, LOOP alerts go to product channels, and SIGNAL incidents go to on-call channels.",
      ],
    },
  },
  "products": {
    "atlas-overview": {
      title: "ATLAS Overview",
      description: "AI-driven sprint plans with confidence scoring and risk analysis.",
      content: [
        "ATLAS is Voatomy's AI sprint planning engine. It analyzes code complexity, team capacity, historical velocity, and cross-team dependencies to generate sprint plans backed by data.",
        "Key concepts: Complexity Score — a 0-100 metric derived from static analysis. Confidence Interval — the probability range for sprint completion. Risk Flags — automated alerts for dependency conflicts.",
        "ATLAS integrates with GitHub, GitLab, Jira, Linear, and Asana to pull in real-time data. Sprint plans update dynamically as new commits, PRs, and ticket changes flow in.",
        "Getting started with ATLAS requires connecting at least one code repository and one project management tool. The AI model calibrates to your team's patterns over 2-3 sprint cycles.",
      ],
    },
    "loop-overview": {
      title: "LOOP Overview",
      description: "Customer feedback and CRM intelligence unified in one layer.",
      content: [
        "LOOP is the customer-product intelligence layer. It ingests signals from CRM systems, support tickets, sales calls, and NPS surveys to create a revenue-weighted view of your product backlog.",
        "Core features: Revenue Attribution, Feedback Clustering, and Stakeholder Alerts. Each feature connects customer voice to engineering priorities.",
        "LOOP integrates with Salesforce, HubSpot, Zendesk, Intercom, Gong, and Slack.",
        "Setup requires connecting at least one CRM. LOOP begins surfacing insights within 24 hours of initial data sync.",
      ],
    },
    "signal-overview": {
      title: "SIGNAL Overview",
      description: "Revenue-aware incident management with business context.",
      content: [
        "SIGNAL transforms incident management from reactive firefighting to proactive, revenue-aware response. Every incident is enriched with business context.",
        "Key capabilities: Revenue Impact Scoring, Smart Routing, and Post-Incident Intelligence.",
        "SIGNAL connects to PagerDuty, Datadog, Sentry, OpsGenie, and Grafana for monitoring data.",
        "Initial setup involves connecting monitoring tools and configuring revenue mapping rules.",
      ],
    },
  },
  "integrations": {
    "github-setup": {
      title: "GitHub Integration Setup",
      description: "Connect GitHub repos for code analysis and complexity scoring.",
      content: [
        "The GitHub integration enables ATLAS to analyze your codebase for complexity patterns, PHANTOM to track tech debt trends, and DRIFT to monitor design-code consistency.",
        "Navigate to Settings → Integrations → GitHub. Click 'Connect' to initiate the OAuth flow. Select which repositories to analyze.",
        "Permissions required: Repository read access (code, PRs, issues), Organization read access (team structure). Voatomy never writes to your repositories.",
        "Once connected, initial analysis begins automatically. Large repositories (100K+ lines) may take up to 10 minutes for first analysis.",
      ],
    },
    "jira-setup": {
      title: "Jira Integration Setup",
      description: "Sync Jira tickets and sprints with Voatomy's planning engine.",
      content: [
        "The Jira integration syncs your project structure, sprint data, and ticket details with ATLAS for AI-powered sprint planning.",
        "Navigate to Settings → Integrations → Jira. Click 'Connect' to start the OAuth 2.0 PKCE flow.",
        "Voatomy maps Jira concepts: Projects → Teams, Sprints → Sprint Plans, Issues → Work Items, Story Points → Complexity Inputs.",
        "Bi-directional sync is optional. Sprint plans generated by ATLAS can be pushed back to Jira as draft sprints.",
      ],
    },
    "slack-setup": {
      title: "Slack Integration Setup",
      description: "Real-time notifications in your Slack channels.",
      content: [
        "The Slack integration delivers real-time notifications for ATLAS sprint events, SIGNAL incidents, and LOOP customer feedback alerts.",
        "Navigate to Settings → Integrations → Slack. Click 'Add to Slack' to install the Voatomy bot.",
        "Channel mapping: Create dedicated channels or use existing ones. Each product's notifications can be routed independently.",
        "Interactive features: React to notifications to acknowledge, snooze, or escalate directly from Slack.",
      ],
    },
  },
  "api": {
    "authentication": {
      title: "API Authentication",
      description: "Authenticate with the Voatomy API using keys and OAuth.",
      content: [
        "The Voatomy API uses Bearer token authentication. All requests must include an Authorization header.",
        "API keys can be generated in Settings → API → Keys. Each key is scoped to a workspace.",
        "For OAuth integrations, use the standard OAuth 2.0 authorization code flow with PKCE.",
        "Rate limits: Free — 100 req/min. Pro — 1,000 req/min. Enterprise — custom limits.",
      ],
    },
    "webhooks": {
      title: "Webhooks",
      description: "Real-time event notifications from Voatomy.",
      content: [
        "Webhooks deliver real-time HTTP POST notifications when events occur. Configure endpoints in Settings → API → Webhooks.",
        "Supported events: sprint.created, sprint.updated, sprint.completed, incident.opened, incident.resolved, feedback.received.",
        "Payloads include a signature header (X-Voatomy-Signature) for HMAC-SHA256 verification.",
        "Failed deliveries are retried 3 times with exponential backoff (1min, 5min, 30min).",
      ],
    },
  },
};

const SIDEBAR_NAV = [
  { category: "getting-started", label: "Getting Started", items: [
    { slug: "quickstart", label: "Quickstart Guide" },
    { slug: "workspace-setup", label: "Workspace Setup" },
  ]},
  { category: "products", label: "Products", items: [
    { slug: "atlas-overview", label: "ATLAS Overview" },
    { slug: "loop-overview", label: "LOOP Overview" },
    { slug: "signal-overview", label: "SIGNAL Overview" },
  ]},
  { category: "integrations", label: "Integrations", items: [
    { slug: "github-setup", label: "GitHub Setup" },
    { slug: "jira-setup", label: "Jira Setup" },
    { slug: "slack-setup", label: "Slack Setup" },
  ]},
  { category: "api", label: "API Reference", items: [
    { slug: "authentication", label: "Authentication" },
    { slug: "webhooks", label: "Webhooks" },
  ]},
];

function getAllPages() {
  const pages: { category: string; slug: string; label: string }[] = [];
  for (const group of SIDEBAR_NAV) {
    for (const item of group.items) {
      pages.push({ category: group.category, slug: item.slug, label: item.label });
    }
  }
  return pages;
}

function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);
}

export default function DocsPage({ category, slug }: { category: string; slug: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useScrollAnimation();

  const doc = DOCS_DATA[category]?.[slug];
  const allPages = getAllPages();
  const currentIndex = allPages.findIndex((p) => p.category === category && p.slug === slug);
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  if (!doc) {
    return (
      <Section variant="white" className="py-32 text-center">
        <h1 className="text-heading-1 text-theme mb-4">Page Not Found</h1>
        <p className="text-body-lg text-theme-s mb-8">This documentation page doesn&apos;t exist.</p>
        <Link href="/docs">
          <Button variant="secondary"><ArrowLeft className="mr-2 h-4 w-4" />Back to Docs</Button>
        </Link>
      </Section>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <Section variant="white" container={false} className="relative pt-24 pb-0 sm:pt-28">
        <div className="relative mx-auto w-full max-w-[1280px] px-4">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden flex items-center gap-1.5 text-sm text-theme-s hover:text-theme transition-colors">
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              {sidebarOpen ? "Close" : "Menu"}
            </button>
            <nav className="flex items-center gap-1.5 text-sm text-theme-m">
              <Link href="/docs" className="hover:text-theme transition-colors">Docs</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="capitalize">{category.replace("-", " ")}</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-theme font-medium">{doc.title}</span>
            </nav>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className={cn(
              "w-64 flex-shrink-0 border-r border-theme pr-6 pb-16",
              "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-50 max-lg:w-72 max-lg:bg-theme max-lg:pt-24 max-lg:pl-4 max-lg:shadow-xl max-lg:transition-transform max-lg:duration-300",
              sidebarOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",
            )}>
              <div className="mb-6">
                <div className="flex items-center gap-2 rounded-lg border border-theme bg-theme-card px-3 h-9">
                  <Search className="h-3.5 w-3.5 text-theme-m" />
                  <input type="text" placeholder="Search docs..." className="flex-1 bg-transparent text-xs text-theme placeholder:text-theme-m focus:outline-none" />
                </div>
              </div>
              <nav className="space-y-6">
                {SIDEBAR_NAV.map((group) => (
                  <div key={group.category}>
                    <h3 className="flex items-center gap-1.5 text-xs font-semibold text-theme-m uppercase tracking-wider mb-2">
                      <FolderOpen className="h-3 w-3" />{group.label}
                    </h3>
                    <ul className="space-y-0.5">
                      {group.items.map((item) => {
                        const isActive = group.category === category && item.slug === slug;
                        return (
                          <li key={item.slug}>
                            <Link
                              href={`/docs/${group.category}/${item.slug}`}
                              onClick={() => setSidebarOpen(false)}
                              className={cn(
                                "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                                isActive ? "bg-brand/10 text-brand font-medium" : "text-theme-s hover:text-theme hover:bg-theme-subtle",
                              )}
                            >
                              <FileText className="h-3 w-3 flex-shrink-0" />
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 pb-20">
              <div className="max-w-3xl">
                <Chip dotColor={BRAND_GREEN} className="mb-4">
                  <BookOpen className="h-3 w-3 mr-1" />Documentation
                </Chip>
                <h1 className="text-display-2 text-theme mb-4">{doc.title}</h1>
                <p className="text-body-lg text-theme-s mb-10">{doc.description}</p>

                <article>
                  {doc.content.map((paragraph, i) => (
                    <p key={i} className="animate-on-scroll text-body-base text-theme-s leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  ))}
                </article>

                {/* Prev / Next */}
                <div className="mt-12 pt-8 border-t border-theme animate-on-scroll">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {prevPage ? (
                      <Link href={`/docs/${prevPage.category}/${prevPage.slug}`} className="group">
                        <Card variant="light" className="h-full hover:border-theme-h transition-all">
                          <span className="text-xs text-theme-m mb-1 block">Previous</span>
                          <span className="text-sm font-semibold text-theme group-hover:text-brand transition-colors flex items-center gap-1">
                            <ArrowLeft className="h-3.5 w-3.5 flex-shrink-0" />{prevPage.label}
                          </span>
                        </Card>
                      </Link>
                    ) : <div />}
                    {nextPage && (
                      <Link href={`/docs/${nextPage.category}/${nextPage.slug}`} className="group">
                        <Card variant="light" className="h-full hover:border-theme-h transition-all text-right">
                          <span className="text-xs text-theme-m mb-1 block">Next</span>
                          <span className="text-sm font-semibold text-theme group-hover:text-brand transition-colors flex items-center justify-end gap-1">
                            {nextPage.label}<ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
                          </span>
                        </Card>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </Section>
    </div>
  );
}
