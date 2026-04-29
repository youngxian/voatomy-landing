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
  CheckCircle2,
  Link2,
  Blocks,
  Shield,
  Zap,
  Settings2,
  RefreshCw,
  Code2,
} from "lucide-react";
import { BRAND_GREEN } from "@/lib/marketing-visual";



const PRODUCT_NAMES: Record<string, string> = {
  atlas: "ATLAS",
  loop: "LOOP",
  signal: "SIGNAL",
  phantom: "PHANTOM",
  drift: "DRIFT",
  nexus: "NEXUS",
};

const PRODUCT_COLORS: Record<string, string> = {
  atlas: "#f16e2c",
  loop: "#8b5cf6",
  signal: "#38bdf8",
  phantom: "#ef4444",
  drift: "#fbbf24",
  nexus: "#0d9488",
};

const CATEGORY_ICONS: Record<string, typeof Blocks> = {
  Code: Code2,
  Project: Settings2,
  Design: Blocks,
  CRM: Link2,
  Support: Shield,
  Revenue: Zap,
  Monitoring: RefreshCw,
  Communication: Zap,
  Documents: Blocks,
  Import: Settings2,
};

interface IntegrationInfo {
  key: string;
  name: string;
  category: string;
  icon: string;
  authMethod: string;
  products: readonly string[];
}

const CATALOG: IntegrationInfo[] = [
  { key: "github", name: "GitHub", category: "Code", icon: "GH", authMethod: "oauth2", products: ["atlas", "phantom", "drift"] },
  { key: "gitlab", name: "GitLab", category: "Code", icon: "GL", authMethod: "oauth2_pkce", products: ["atlas", "phantom", "drift"] },
  { key: "bitbucket", name: "Bitbucket", category: "Code", icon: "BB", authMethod: "oauth2", products: ["atlas", "phantom"] },
  { key: "azure-devops", name: "Azure DevOps", category: "Code", icon: "AZ", authMethod: "oauth2", products: ["atlas", "phantom"] },
  { key: "jira", name: "Jira", category: "Project", icon: "JR", authMethod: "oauth2_pkce", products: ["atlas", "phantom"] },
  { key: "linear", name: "Linear", category: "Project", icon: "LN", authMethod: "oauth2", products: ["atlas"] },
  { key: "asana", name: "Asana", category: "Project", icon: "AS", authMethod: "oauth2", products: ["atlas"] },
  { key: "monday", name: "Monday.com", category: "Project", icon: "MN", authMethod: "oauth2", products: ["atlas"] },
  { key: "clickup", name: "ClickUp", category: "Project", icon: "CU", authMethod: "oauth2", products: ["atlas"] },
  { key: "trello", name: "Trello", category: "Project", icon: "TR", authMethod: "oauth2", products: ["atlas"] },
  { key: "salesforce", name: "Salesforce", category: "CRM", icon: "SF", authMethod: "oauth2_pkce", products: ["loop"] },
  { key: "hubspot", name: "HubSpot", category: "CRM", icon: "HS", authMethod: "oauth2", products: ["loop"] },
  { key: "pipedrive", name: "Pipedrive", category: "CRM", icon: "PD", authMethod: "oauth2", products: ["loop"] },
  { key: "gong", name: "Gong", category: "Revenue", icon: "GG", authMethod: "api_key", products: ["loop"] },
  { key: "zendesk", name: "Zendesk", category: "Support", icon: "ZD", authMethod: "oauth2", products: ["loop", "signal"] },
  { key: "intercom", name: "Intercom", category: "Support", icon: "IC", authMethod: "oauth2", products: ["loop"] },
  { key: "freshdesk", name: "Freshdesk", category: "Support", icon: "FD", authMethod: "api_key", products: ["loop"] },
  { key: "slack", name: "Slack", category: "Communication", icon: "SL", authMethod: "oauth2", products: ["atlas", "loop", "signal"] },
  { key: "teams", name: "MS Teams", category: "Communication", icon: "TM", authMethod: "oauth2", products: ["atlas", "loop", "signal"] },
  { key: "discord", name: "Discord", category: "Communication", icon: "DC", authMethod: "oauth2", products: ["atlas"] },
  { key: "figma", name: "Figma", category: "Design", icon: "FG", authMethod: "oauth2", products: ["drift", "atlas"] },
  { key: "sketch", name: "Sketch", category: "Design", icon: "SK", authMethod: "api_key", products: ["drift"] },
  { key: "datadog", name: "Datadog", category: "Monitoring", icon: "DD", authMethod: "api_key", products: ["signal", "phantom"] },
  { key: "pagerduty", name: "PagerDuty", category: "Monitoring", icon: "PG", authMethod: "api_key", products: ["signal"] },
  { key: "opsgenie", name: "OpsGenie", category: "Monitoring", icon: "OG", authMethod: "api_key", products: ["signal"] },
  { key: "sentry", name: "Sentry", category: "Monitoring", icon: "SN", authMethod: "api_key", products: ["signal"] },
  { key: "grafana", name: "Grafana", category: "Monitoring", icon: "GF", authMethod: "api_key", products: ["signal"] },
  { key: "google-drive", name: "Google Drive", category: "Documents", icon: "GD", authMethod: "oauth2_pkce", products: ["loop"] },
  { key: "notion", name: "Notion", category: "Documents", icon: "NT", authMethod: "oauth2", products: ["atlas", "loop"] },
  { key: "confluence", name: "Confluence", category: "Documents", icon: "CF", authMethod: "oauth2_pkce", products: ["atlas"] },
  { key: "csv", name: "CSV Upload", category: "Import", icon: "CS", authMethod: "api_key", products: ["atlas", "loop"] },
];

const META: Record<string, { headline: string; description: string; features: string[]; setupSteps: string[] }> = {
  github: { headline: "GitHub + Voatomy", description: "Connect GitHub for code complexity analysis, PR tracking, and automated sprint intelligence.", features: ["Automatic code complexity scoring on every PR", "Repository-level tech debt trending", "Cross-repo dependency mapping", "PR review cycle time analytics"], setupSteps: ["Navigate to Settings → Integrations", "Click 'Connect GitHub' and authorize via OAuth", "Select repositories to analyze", "ATLAS begins analysis within 2 minutes"] },
  gitlab: { headline: "GitLab + Voatomy", description: "Integrate GitLab repos for end-to-end visibility into code complexity and merge requests.", features: ["Merge request complexity analysis", "CI/CD pipeline signal ingestion", "Multi-project dependency tracking", "Code quality trend monitoring"], setupSteps: ["Navigate to Settings → Integrations", "Click 'Connect GitLab' and authorize via OAuth PKCE", "Select groups and projects", "Initial analysis starts automatically"] },
  jira: { headline: "Jira + Voatomy", description: "Two-way Jira sync for AI sprint planning. Import tickets, generate plans, push drafts back.", features: ["Bi-directional sprint sync", "Automatic story point calibration", "Epic-level progress tracking", "Custom field mapping support"], setupSteps: ["Navigate to Settings → Integrations", "Click 'Connect Jira' and complete OAuth PKCE flow", "Select projects to sync", "Configure field mappings if needed"] },
  salesforce: { headline: "Salesforce + Voatomy", description: "Connect Salesforce CRM to map revenue signals to every backlog item.", features: ["Deal-to-feature revenue mapping", "Pipeline impact visualization", "Automatic opportunity tracking", "Custom object support"], setupSteps: ["Navigate to Settings → Integrations", "Click 'Connect Salesforce' and authorize", "Configure opportunity field mappings", "LOOP begins syncing within 1 hour"] },
  slack: { headline: "Slack + Voatomy", description: "Real-time notifications and interactive sprint cards in your Slack channels.", features: ["Sprint plan notifications", "Incident alert routing", "Interactive approval workflows", "Thread-based updates"], setupSteps: ["Navigate to Settings → Integrations", "Click 'Add to Slack' to install the bot", "Select default notification channels", "Configure per-product routing"] },
  datadog: { headline: "Datadog + Voatomy", description: "Connect Datadog monitors and APM to SIGNAL for revenue-aware incident management.", features: ["Monitor alert ingestion", "APM trace correlation", "Revenue impact scoring per incident", "SLA-aware escalation"], setupSteps: ["Navigate to Settings → Integrations", "Enter your Datadog API key and App key", "Select monitors to track", "Configure revenue mapping rules"] },
  pagerduty: { headline: "PagerDuty + Voatomy", description: "Enrich PagerDuty incidents with business context — revenue at risk and SLA impact.", features: ["Incident enrichment with customer data", "Revenue-based escalation routing", "Post-incident cost reporting", "On-call optimization insights"], setupSteps: ["Navigate to Settings → Integrations", "Enter your PagerDuty REST API key", "Map services to Voatomy products", "Configure escalation rules"] },
  figma: { headline: "Figma + Voatomy", description: "Connect Figma for design-code consistency monitoring with DRIFT.", features: ["Design token sync monitoring", "Component coverage analysis", "Design-code drift detection", "Figma-to-code mapping"], setupSteps: ["Navigate to Settings → Integrations", "Click 'Connect Figma' and authorize", "Select design files to monitor", "DRIFT begins scanning within 5 minutes"] },
};

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

export default function IntegrationDetailPage({ slug }: { slug: string }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const integration = CATALOG.find((i) => i.key === slug);
  const meta = META[slug];

  if (!integration) {
    return (
      <Section variant="white" className="py-32 text-center">
        <h1 className="text-heading-1 text-theme mb-4">Integration Not Found</h1>
        <p className="text-body-lg text-theme-s mb-8">This integration page doesn&apos;t exist.</p>
        <Link href="/integrations">
          <Button variant="secondary"><ArrowLeft className="mr-2 h-4 w-4" />All Integrations</Button>
        </Link>
      </Section>
    );
  }

  const headline = meta?.headline ?? `${integration.name} + Voatomy`;
  const description = meta?.description ?? `Connect ${integration.name} to Voatomy for seamless data integration.`;
  const features = meta?.features ?? [
    `Automated ${integration.category.toLowerCase()} data sync`,
    "Real-time event processing",
    "Secure credential management",
    "Granular permission controls",
  ];
  const setupSteps = meta?.setupSteps ?? [
    "Navigate to Settings → Integrations",
    `Click 'Connect ${integration.name}'`,
    integration.authMethod.startsWith("oauth") ? "Complete the OAuth authorization flow" : "Enter your API credentials",
    "Data sync begins automatically",
  ];

  const CatIcon = CATEGORY_ICONS[integration.category] ?? Blocks;
  const relatedIntegrations = CATALOG.filter((i) => i.key !== slug && i.category === integration.category).slice(0, 4);

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <Section variant="white" container={false} className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-15 blur-[120px]" style={{ background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)` }} />
        </div>
        <div className="relative mx-auto w-full max-w-container px-4">
          <div className="max-w-3xl mx-auto">
            <div className={cn("transition-all duration-700", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <Link href="/integrations" className="inline-flex items-center gap-1.5 text-sm text-theme-s hover:text-theme mb-6 transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />All Integrations
              </Link>
            </div>

            <div className={cn("flex items-center gap-4 mb-6 transition-all duration-700 delay-100", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <div className="h-14 w-14 rounded-2xl border border-theme bg-theme-card flex items-center justify-center">
                <span className="text-lg font-bold text-brand">{integration.icon}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Chip dotColor={BRAND_GREEN} className="text-xs"><CatIcon className="h-3 w-3 mr-1" />{integration.category}</Chip>
                  <Chip className="text-xs">{integration.authMethod.includes("oauth") ? "OAuth 2.0" : "API Key"}</Chip>
                </div>
              </div>
            </div>

            <h1 className={cn("text-display-2 lg:text-display-1 text-theme mb-5 transition-all duration-700 delay-200", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              {headline}
            </h1>
            <p className={cn("text-body-lg text-theme-s max-w-xl transition-all duration-700 delay-300", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              {description}
            </p>

            <div className={cn("flex flex-wrap gap-2 mt-6 transition-all duration-700 delay-[400ms]", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              {integration.products.map((p) => (
                <Link key={p} href={`/products/${p}`}>
                  <Chip dotColor={PRODUCT_COLORS[p]} className="text-xs hover:bg-theme-card transition-colors cursor-pointer">
                    {PRODUCT_NAMES[p] ?? p.toUpperCase()}
                  </Chip>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section variant="amber" className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8 animate-on-scroll">
            <Zap className="h-4 w-4 text-brand" />
            <h2 className="text-heading-2 text-theme">Key Features</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <Card key={i} variant="light" className={cn("animate-on-scroll hover:border-theme-h transition-all", `stagger-${i + 1}`)}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-theme">{feature}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Setup Steps */}
      <Section variant="white" className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8 animate-on-scroll">
            <Settings2 className="h-4 w-4 text-brand" />
            <h2 className="text-heading-2 text-theme">Setup Guide</h2>
          </div>
          <div className="space-y-4">
            {setupSteps.map((step, i) => (
              <div key={i} className={cn("animate-on-scroll flex items-start gap-4", `stagger-${i + 1}`)}>
                <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-brand">{i + 1}</span>
                </div>
                <p className="text-body-base text-theme-s pt-1">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 animate-on-scroll">
            <Link href="/auth/signup">
              <Button size="lg">
                Connect {integration.name}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Related Integrations */}
      {relatedIntegrations.length > 0 && (
        <Section variant="amber" className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-8 animate-on-scroll">
              <Link2 className="h-4 w-4 text-brand" />
              <h2 className="text-heading-2 text-theme">Related {integration.category} Integrations</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedIntegrations.map((ri, i) => (
                <Link key={ri.key} href={`/integrations/${ri.key}`} className="group">
                  <Card variant="light" className={cn("animate-on-scroll h-full hover:border-theme-h transition-all text-center", `stagger-${i + 1}`)}>
                    <div className="h-10 w-10 rounded-xl border border-theme bg-theme-subtle flex items-center justify-center mx-auto mb-3">
                      <span className="text-xs font-bold text-theme">{ri.icon}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-theme group-hover:text-brand transition-colors">{ri.name}</h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}
