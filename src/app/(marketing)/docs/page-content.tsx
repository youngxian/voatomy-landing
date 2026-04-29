"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  Clock,
  BookOpen,
  Rocket,
  GitBranch,
  Zap,
  BarChart3,
  RefreshCw,
  Shield,
  Radio,
  Compass,
  Network,
  Code2,
  Webhook,
  Terminal,
  FileCode,
  Github,
  Download,
  FolderOpen,
  ChevronRight,
  ExternalLink,
  Hash,
  Layers,
} from "lucide-react";

/* ─────────────────── Constants ─────────────────── */

const BRAND_GREEN = "#12FF80";

const PRODUCT_COLORS: Record<string, string> = {
  ATLAS: "#f16e2c",
  LOOP: "#8b5cf6",
  PHANTOM: "#ef4444",
  SIGNAL: "#38bdf8",
  DRIFT: "#fbbf24",
  NEXUS: "#12FF80",
};

const QUICK_START_GUIDES = [
  {
    icon: Rocket,
    title: "Getting Started",
    desc: "Set up your Voatomy workspace, invite your team, and connect your first integration in under 5 minutes.",
    steps: 4,
    time: "5 min",
    slug: "/docs/getting-started",
  },
  {
    icon: GitBranch,
    title: "Connect Your First Repo",
    desc: "Link a GitHub or GitLab repository so ATLAS can analyze code complexity and tech debt signals.",
    steps: 3,
    time: "3 min",
    slug: "/docs/connect-repo",
  },
  {
    icon: Zap,
    title: "Generate Your First Sprint Plan",
    desc: "Run your first AI-powered sprint plan and review confidence scores, risk flags, and capacity allocation.",
    steps: 5,
    time: "7 min",
    slug: "/docs/first-sprint-plan",
  },
];

const PRODUCT_DOCS = [
  {
    product: "ATLAS",
    icon: Compass,
    desc: "AI Sprint Planner. Confidence-scored plans from 6 real-time signals.",
    articles: 24,
    slug: "/docs/atlas",
  },
  {
    product: "LOOP",
    icon: RefreshCw,
    desc: "Product-Revenue Feedback Engine. Close the loop between shipping and revenue.",
    articles: 18,
    slug: "/docs/loop",
  },
  {
    product: "PHANTOM",
    icon: Shield,
    desc: "Security-by-Default Module. Threat modeling and auth policy generation.",
    articles: 15,
    slug: "/docs/phantom",
  },
  {
    product: "SIGNAL",
    icon: Radio,
    desc: "Revenue-Aware Incidents. Route alerts by business impact, not just severity.",
    articles: 12,
    slug: "/docs/signal",
  },
  {
    product: "DRIFT",
    icon: BarChart3,
    desc: "Live Spec Sync. Detect when code drifts from the original specification.",
    articles: 10,
    slug: "/docs/drift",
  },
  {
    product: "NEXUS",
    icon: Network,
    desc: "Organizational Nerve Center. Full visibility across all teams and projects.",
    articles: 21,
    slug: "/docs/nexus",
  },
];

const API_SDKS = [
  { name: "Node.js", icon: FileCode, version: "v2.1.0" },
  { name: "Python", icon: Terminal, version: "v1.8.0" },
  { name: "Go", icon: Code2, version: "v1.3.0" },
];

const POPULAR_ARTICLES = [
  { title: "Understanding Confidence Scores", category: "ATLAS", slug: "/docs/atlas/confidence-scores" },
  { title: "Setting Up GitHub Integration", category: "Integrations", slug: "/docs/integrations/github" },
  { title: "Team Capacity Configuration", category: "ATLAS", slug: "/docs/atlas/team-capacity" },
  { title: "Webhook Event Reference", category: "API", slug: "/docs/api/webhooks" },
  { title: "Role-Based Access Control", category: "Admin", slug: "/docs/admin/rbac" },
  { title: "Custom Scoring Weights", category: "ATLAS", slug: "/docs/atlas/scoring-weights" },
  { title: "Figma Integration Guide", category: "Integrations", slug: "/docs/integrations/figma" },
  { title: "Sprint Accuracy Tracking", category: "ATLAS", slug: "/docs/atlas/accuracy-tracking" },
];

const DEV_RESOURCES = [
  {
    icon: Github,
    title: "GitHub Repository",
    desc: "Source code, examples, and issue tracker",
    link: "github.com/voatomy",
    slug: "/docs/github",
  },
  {
    icon: Download,
    title: "SDK Downloads",
    desc: "Official client libraries for Node.js, Python, and Go",
    link: "npm, PyPI, Go modules",
    slug: "/docs/sdks",
  },
  {
    icon: FolderOpen,
    title: "Sample Projects",
    desc: "Full working examples for common integration patterns",
    link: "12 examples available",
    slug: "/docs/examples",
  },
];

/* ─────────────────── Scroll Animation Hook ─────────────────── */

function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);
}

/* ─────────────────── Main Page Component ─────────────────── */

export default function DocsPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* ═══════════════ 1. HERO ═══════════════ */}
      <Section
        variant="white"
        container={false}
        className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-15 blur-[120px]"
            style={{
              background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 bg-dot-grid bg-[length:24px_24px] opacity-40" />
        </div>

        <div className="relative mx-auto w-full max-w-container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className={cn(
                "transition-all duration-700",
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              <Chip dotColor={BRAND_GREEN} className="mb-5 mx-auto">
                <BookOpen className="h-3 w-3 mr-1" />
                Docs
              </Chip>
            </div>

            <h1
              className={cn(
                "text-display-2 lg:text-display-1 text-theme mb-5 transition-all duration-700 delay-100",
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              Documentation
            </h1>

            <p
              className={cn(
                "text-body-lg text-theme-s max-w-xl mx-auto mb-8 transition-all duration-700 delay-200",
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              Everything you need to set up, configure, and master Voatomy.
              Guides, API references, and examples for every product.
            </p>

            {/* Search bar */}
            <div
              className={cn(
                "flex items-center gap-2 max-w-lg mx-auto rounded-xl border border-theme bg-theme-card px-4 h-12 transition-all duration-700 delay-300 focus-within:ring-2 focus-within:ring-brand/30 focus-within:border-brand",
                heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
              )}
            >
              <Search className="h-4 w-4 text-theme-m flex-shrink-0" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="flex-1 bg-transparent text-sm text-theme placeholder:text-theme-m focus:outline-none"
              />
              <kbd className="hidden sm:flex items-center gap-0.5 rounded border border-theme bg-theme-subtle px-1.5 py-0.5 text-[10px] text-theme-m font-mono">
                Ctrl K
              </kbd>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 2. QUICK START GUIDES ═══════════════ */}
      <Section variant="coral" className="py-16 sm:py-24">
        <div className="text-center mb-10 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Quick Start
          </Chip>
          <h2 className="text-heading-1 text-theme mb-3">
            Get up and running
          </h2>
          <p className="text-body-lg text-theme-s max-w-xl mx-auto">
            Follow these step-by-step guides to go from zero to your first
            AI-powered sprint plan.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {QUICK_START_GUIDES.map((guide, i) => {
            const Icon = guide.icon;
            return (
              <Link key={guide.title} href={guide.slug} className="group">
                <Card
                  variant="light"
                  className={cn(
                    "animate-on-scroll h-full flex flex-col hover:border-theme-h transition-all duration-300",
                    `stagger-${i + 1}`,
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-brand/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-brand" />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-theme-m">
                      <span className="flex items-center gap-1">
                        <Layers className="h-3 w-3" />
                        {guide.steps} steps
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {guide.time}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-heading-3 text-theme mb-2 group-hover:text-brand transition-colors duration-200">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-theme-s leading-relaxed flex-1">
                    {guide.desc}
                  </p>

                  <div className="flex items-center gap-1 mt-5 text-sm font-medium text-brand group-hover:gap-2 transition-all duration-200">
                    Start guide
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ═══════════════ 3. PRODUCT DOCS ═══════════════ */}
      <Section variant="white" className="py-16 sm:py-24">
        <div className="text-center mb-10 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Product Documentation
          </Chip>
          <h2 className="text-heading-1 text-theme mb-3">
            Explore by product
          </h2>
          <p className="text-body-lg text-theme-s max-w-xl mx-auto">
            In-depth documentation for every module in the Voatomy platform.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCT_DOCS.map((product, i) => {
            const Icon = product.icon;
            const color = PRODUCT_COLORS[product.product];
            return (
              <Link key={product.product} href={product.slug} className="group">
                <Card
                  variant="light"
                  className={cn(
                    "animate-on-scroll h-full relative overflow-hidden hover:border-theme-h transition-all duration-300",
                    `stagger-${i + 1}`,
                  )}
                >
                  {/* Color accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: color }}
                  />

                  <div className="flex items-start gap-4">
                    <div
                      className="h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-heading-3 text-theme group-hover:text-brand transition-colors duration-200">
                          {product.product}
                        </h3>
                        <span className="text-xs text-theme-m">
                          {product.articles} articles
                        </span>
                      </div>
                      <p className="text-sm text-theme-s leading-relaxed">
                        {product.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mt-4 text-sm font-medium text-brand group-hover:gap-2 transition-all duration-200">
                    Browse docs
                    <ChevronRight className="h-4 w-4" />
                  </div>

                  {/* Hover glow */}
                  <div
                    className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
                    style={{ background: color }}
                  />
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ═══════════════ 4. API REFERENCE ═══════════════ */}
      <Section variant="coral" className="py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Description */}
          <div className="animate-on-scroll">
            <Chip dotColor={BRAND_GREEN} className="mb-4">
              API Reference
            </Chip>
            <h2 className="text-heading-1 text-theme mb-4">
              Build with the Voatomy API
            </h2>
            <p className="text-body-lg text-theme-s mb-6">
              Programmatic access to sprint plans, confidence scores, team
              capacity data, and more. RESTful endpoints with comprehensive
              webhook support.
            </p>

            <div className="space-y-3 mb-8">
              {[
                { icon: Code2, label: "REST API", desc: "Full CRUD operations with JSON responses" },
                { icon: Webhook, label: "Webhooks", desc: "Real-time events for plans, sprints, and alerts" },
                { icon: Terminal, label: "GraphQL", desc: "Flexible queries for complex data requirements" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 rounded-lg border border-theme bg-theme-card p-3.5"
                  >
                    <div className="h-8 w-8 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-brand" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-theme block">
                        {item.label}
                      </span>
                      <span className="text-xs text-theme-m">{item.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button variant="primary" size="md" asChild>
              <Link href="/docs/api">
                Explore API Docs
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right: SDK cards + code preview */}
          <div className="animate-on-scroll stagger-2">
            {/* Code preview mock */}
            <Card variant="light" className="p-0 overflow-hidden mb-5">
              {/* Code header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-theme">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-theme-m font-mono ml-2">
                  example.ts
                </span>
              </div>
              {/* Code body */}
              <div className="p-4 font-mono text-xs leading-relaxed">
                <div>
                  <span className="text-theme-m">{"// "}</span>
                  <span className="text-theme-m">Generate a sprint plan</span>
                </div>
                <div className="mt-1">
                  <span style={{ color: "#c678dd" }}>import</span>
                  <span className="text-theme"> {"{ Voatomy }"} </span>
                  <span style={{ color: "#c678dd" }}>from</span>
                  <span style={{ color: "#98c379" }}> &apos;@voatomy/sdk&apos;</span>
                </div>
                <div className="mt-2">
                  <span style={{ color: "#c678dd" }}>const</span>
                  <span className="text-theme"> client </span>
                  <span className="text-theme-m">= </span>
                  <span style={{ color: "#c678dd" }}>new</span>
                  <span style={{ color: "#61afef" }}> Voatomy</span>
                  <span className="text-theme">({"{"}</span>
                </div>
                <div>
                  <span className="text-theme">{"  "}apiKey</span>
                  <span className="text-theme-m">: </span>
                  <span style={{ color: "#98c379" }}>process.env.VOATOMY_KEY</span>
                </div>
                <div>
                  <span className="text-theme">{"})"}</span>
                </div>
                <div className="mt-2">
                  <span style={{ color: "#c678dd" }}>const</span>
                  <span className="text-theme"> plan </span>
                  <span className="text-theme-m">= </span>
                  <span style={{ color: "#c678dd" }}>await</span>
                  <span className="text-theme"> client.</span>
                  <span style={{ color: "#61afef" }}>sprints</span>
                  <span className="text-theme">.</span>
                  <span style={{ color: "#61afef" }}>generate</span>
                  <span className="text-theme">({"{"}</span>
                </div>
                <div>
                  <span className="text-theme">{"  "}teamId</span>
                  <span className="text-theme-m">: </span>
                  <span style={{ color: "#98c379" }}>&apos;team_abc123&apos;</span>
                  <span className="text-theme">,</span>
                </div>
                <div>
                  <span className="text-theme">{"  "}signals</span>
                  <span className="text-theme-m">: </span>
                  <span className="text-theme">[</span>
                  <span style={{ color: "#98c379" }}>&apos;code&apos;</span>
                  <span className="text-theme">, </span>
                  <span style={{ color: "#98c379" }}>&apos;capacity&apos;</span>
                  <span className="text-theme">, </span>
                  <span style={{ color: "#98c379" }}>&apos;debt&apos;</span>
                  <span className="text-theme">]</span>
                </div>
                <div>
                  <span className="text-theme">{"})"}</span>
                </div>
                <div className="mt-2">
                  <span className="text-theme-m">{"// "}</span>
                  <span className="text-theme-m">
                    plan.confidence {"// => "}
                  </span>
                  <span style={{ color: "#d19a66" }}>0.87</span>
                </div>
              </div>
            </Card>

            {/* SDK Downloads */}
            <div className="grid grid-cols-3 gap-3">
              {API_SDKS.map((sdk) => {
                const Icon = sdk.icon;
                return (
                  <Card
                    key={sdk.name}
                    variant="light"
                    className="text-center hover:border-theme-h transition-all duration-300 cursor-pointer p-4"
                  >
                    <div className="h-9 w-9 rounded-lg bg-brand/10 flex items-center justify-center mx-auto mb-2">
                      <Icon className="h-4 w-4 text-brand" />
                    </div>
                    <span className="text-sm font-semibold text-theme block">
                      {sdk.name}
                    </span>
                    <span className="text-[10px] text-theme-m font-mono">
                      {sdk.version}
                    </span>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 5. POPULAR ARTICLES ═══════════════ */}
      <Section variant="white" className="py-16 sm:py-24">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
          {/* Left: Header */}
          <div className="animate-on-scroll">
            <Chip dotColor={BRAND_GREEN} className="mb-4">
              Popular
            </Chip>
            <h2 className="text-heading-1 text-theme mb-3">
              Most-read articles
            </h2>
            <p className="text-body-base text-theme-s">
              The documentation pages our users visit the most. A great place
              to start if you are new to the platform.
            </p>
          </div>

          {/* Right: Article list */}
          <div className="animate-on-scroll stagger-2">
            <div className="space-y-2">
              {POPULAR_ARTICLES.map((article, i) => (
                <Link key={article.slug} href={article.slug} className="group block">
                  <div className="flex items-center gap-4 rounded-xl border border-theme bg-theme-card px-5 py-3.5 hover:border-theme-h transition-all duration-200">
                    <span className="text-xs font-mono text-theme-f w-5 text-right flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-theme group-hover:text-brand transition-colors duration-200 block truncate">
                        {article.title}
                      </span>
                    </div>
                    <Chip className="text-[10px] flex-shrink-0">
                      {article.category}
                    </Chip>
                    <ChevronRight className="h-4 w-4 text-theme-m group-hover:text-brand transition-colors duration-200 flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 6. DEVELOPER RESOURCES ═══════════════ */}
      <Section
        variant="coral"
        container={false}
        className="relative py-20 sm:py-28 overflow-hidden"
      >
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-12 blur-[100px]"
            style={{
              background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)`,
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-container px-4">
          <div className="text-center mb-10 animate-on-scroll">
            <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
              Developer Resources
            </Chip>
            <h2 className="text-heading-1 text-theme mb-3">
              Tools for developers
            </h2>
            <p className="text-body-lg text-theme-s max-w-xl mx-auto">
              Open-source SDKs, sample projects, and community resources to help
              you build on the Voatomy platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {DEV_RESOURCES.map((resource, i) => {
              const Icon = resource.icon;
              return (
                <Link key={resource.title} href={resource.slug} className="group">
                  <Card
                    variant="light"
                    className={cn(
                      "animate-on-scroll h-full hover:border-theme-h transition-all duration-300",
                      `stagger-${i + 1}`,
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-11 w-11 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-brand" />
                      </div>
                      <div>
                        <h3 className="text-heading-3 text-theme mb-1 group-hover:text-brand transition-colors duration-200">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-theme-s leading-relaxed mb-2">
                          {resource.desc}
                        </p>
                        <span className="flex items-center gap-1 text-xs text-theme-m">
                          <ExternalLink className="h-3 w-3" />
                          {resource.link}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Bottom: Helpful links row */}
          <div className="animate-on-scroll stagger-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="md" asChild>
                <Link href="/docs/api">
                  API Reference
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" size="md" asChild>
                <Link href="/docs/changelog">
                  <Hash className="mr-1 h-4 w-4" />
                  Changelog
                </Link>
              </Button>
              <Button variant="ghost" size="md" asChild>
                <Link href="/docs/status">
                  <span className="h-2 w-2 rounded-full bg-brand mr-2 animate-glow-pulse" />
                  System Status
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
