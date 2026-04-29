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
  Compass,
  CheckCircle2,
  Circle,
  Clock,
  Rocket,
  Sparkles,
  Calendar,
  Filter,
  BookOpen,
  Lightbulb,
  MessageSquare,
} from "lucide-react";

const BRAND_GREEN = "#12FF80";

const PRODUCT_COLORS: Record<string, string> = {
  ATLAS: "#f16e2c",
  LOOP: "#8b5cf6",
  SIGNAL: "#38bdf8",
  PHANTOM: "#ef4444",
  DRIFT: "#fbbf24",
  NEXUS: "#12FF80",
  Platform: "#94a3b8",
};

type Status = "shipped" | "in-progress" | "planned" | "exploring";

const STATUS_CONFIG: Record<Status, { label: string; icon: typeof CheckCircle2; color: string }> = {
  shipped: { label: "Shipped", icon: CheckCircle2, color: "#12FF80" },
  "in-progress": { label: "In Progress", icon: Clock, color: "#38bdf8" },
  planned: { label: "Planned", icon: Circle, color: "#8b5cf6" },
  exploring: { label: "Exploring", icon: Sparkles, color: "#fbbf24" },
};

interface RoadmapItem {
  title: string;
  description: string;
  product: string;
  status: Status;
  quarter: string;
}

const ROADMAP_ITEMS: RoadmapItem[] = [
  // Shipped (Q1 2026)
  { title: "AI Sprint Plan Generation", description: "Generate data-driven sprint plans using code complexity, team capacity, and historical velocity.", product: "ATLAS", status: "shipped", quarter: "Q1 2026" },
  { title: "Revenue-Weighted Backlog", description: "Connect CRM pipeline data to backlog items for revenue-based prioritization.", product: "LOOP", status: "shipped", quarter: "Q1 2026" },
  { title: "Incident Revenue Scoring", description: "Automatically calculate business impact for every incident using CRM and customer data.", product: "SIGNAL", status: "shipped", quarter: "Q1 2026" },
  { title: "Tech Debt Dollar Translation", description: "Convert code complexity metrics into business cost — days lost and dollars impacted.", product: "PHANTOM", status: "shipped", quarter: "Q1 2026" },
  { title: "Design Token Sync Monitoring", description: "Detect drift between Figma design tokens and codebase implementation.", product: "DRIFT", status: "shipped", quarter: "Q1 2026" },
  { title: "Cross-Team Dependency Graph", description: "Real-time visualization of inter-team dependencies across sprints.", product: "NEXUS", status: "shipped", quarter: "Q1 2026" },

  // In Progress (Q2 2026)
  { title: "Confidence Interval Tuning", description: "Let teams calibrate AI confidence thresholds to match their risk tolerance for sprint commitments.", product: "ATLAS", status: "in-progress", quarter: "Q2 2026" },
  { title: "Multi-Channel Feedback Clustering", description: "AI-powered grouping of similar feature requests across Zendesk, Intercom, Gong, and Slack.", product: "LOOP", status: "in-progress", quarter: "Q2 2026" },
  { title: "Smart Escalation Routing", description: "ML-driven routing that learns from resolution patterns to optimize escalation paths.", product: "SIGNAL", status: "in-progress", quarter: "Q2 2026" },
  { title: "Debt Remediation Playbooks", description: "Automated recommendations for addressing the highest-impact tech debt items.", product: "PHANTOM", status: "in-progress", quarter: "Q2 2026" },
  { title: "Component Coverage Analysis", description: "Track what percentage of your design system is actually used in production code.", product: "DRIFT", status: "in-progress", quarter: "Q2 2026" },
  { title: "SSO / SAML Support", description: "Enterprise SSO with SAML 2.0 and OIDC for seamless org-wide authentication.", product: "Platform", status: "in-progress", quarter: "Q2 2026" },

  // Planned (Q3 2026)
  { title: "Sprint Retrospective AI", description: "AI-generated retrospective insights comparing planned vs. actual outcomes with root cause analysis.", product: "ATLAS", status: "planned", quarter: "Q3 2026" },
  { title: "Stakeholder Impact Alerts", description: "Automatic notifications to sales/CS when shipped features affect their tracked accounts.", product: "LOOP", status: "planned", quarter: "Q3 2026" },
  { title: "Proactive Incident Detection", description: "Predict incidents before they happen using anomaly detection on monitoring signals.", product: "SIGNAL", status: "planned", quarter: "Q3 2026" },
  { title: "Dependency Risk Forecasting", description: "Predict which cross-team dependencies are most likely to become blockers.", product: "NEXUS", status: "planned", quarter: "Q3 2026" },
  { title: "Public API v2", description: "Comprehensive REST and GraphQL API for all Voatomy products with webhook support.", product: "Platform", status: "planned", quarter: "Q3 2026" },
  { title: "Audit Log & Compliance", description: "SOC 2 Type II compliant audit logging for all workspace actions.", product: "Platform", status: "planned", quarter: "Q3 2026" },

  // Exploring (Q4 2026+)
  { title: "Natural Language Sprint Queries", description: "Ask questions about sprint health in plain English: 'What's at risk this sprint?'", product: "ATLAS", status: "exploring", quarter: "Q4 2026" },
  { title: "Revenue Forecasting", description: "Predict revenue impact of shipping (or not shipping) specific features.", product: "LOOP", status: "exploring", quarter: "Q4 2026" },
  { title: "Chaos Engineering Integration", description: "Connect chaos engineering results with revenue impact for data-driven resilience investment.", product: "SIGNAL", status: "exploring", quarter: "Q4 2026" },
  { title: "AI Code Refactoring Suggestions", description: "Automated refactoring recommendations for high-cost debt areas.", product: "PHANTOM", status: "exploring", quarter: "Q4 2026" },
];

const QUARTERS = ["Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026"];
const PRODUCTS = ["All", "ATLAS", "LOOP", "SIGNAL", "PHANTOM", "DRIFT", "NEXUS", "Platform"];
const STATUSES: Status[] = ["shipped", "in-progress", "planned", "exploring"];

function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); }); },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);
}

export default function RoadmapPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [activeProduct, setActiveProduct] = useState("All");
  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filtered = activeProduct === "All"
    ? ROADMAP_ITEMS
    : ROADMAP_ITEMS.filter((item) => item.product === activeProduct);

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <Section variant="white" container={false} className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-15 blur-[120px]" style={{ background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)` }} />
          <div className="absolute inset-0 bg-dot-grid bg-[length:24px_24px] opacity-40" />
        </div>
        <div className="relative mx-auto w-full max-w-container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className={cn("transition-all duration-700", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <Chip dotColor={BRAND_GREEN} className="mb-5 mx-auto"><Compass className="h-3 w-3 mr-1" />Public Roadmap</Chip>
            </div>
            <h1 className={cn("text-display-2 lg:text-display-1 text-theme mb-5 transition-all duration-700 delay-100", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              What We&apos;re <span className="text-brand">Building</span>
            </h1>
            <p className={cn("text-body-lg text-theme-s max-w-xl mx-auto mb-8 transition-all duration-700 delay-200", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              Transparency is a core value. Here&apos;s what&apos;s shipped, in progress, planned, and on our radar across all six Voatomy products.
            </p>
          </div>
        </div>
      </Section>

      {/* How to read the roadmap */}
      <Section variant="white" className="py-12 sm:py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center animate-on-scroll">
          <h2 className="text-heading-2 text-theme mb-3">How to read this roadmap</h2>
          <p className="text-body-base text-theme-s">
            Status labels describe confidence, not hype. Use the product filter to see only the surface you care about — then
            cross-check industries and solutions for how each item shows up in the wild.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "Shipped vs. planned",
              body: "Shipped means in customer hands today. Planned and exploring items may move quarters as we learn from early access cohorts — dates shift when quality bars are not met.",
            },
            {
              icon: Lightbulb,
              title: "Why some items linger in Exploring",
              body: "Exploring captures bets we are validating with design partners: technical feasibility, security review, and whether the workflow deserves a first-class product surface.",
            },
            {
              icon: MessageSquare,
              title: "Your vote matters",
              body: "The fastest way to pull an item forward is to tell us which outcomes you need on a fixed timeline — we prioritize overlap across customers, not the loudest single request.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className={cn(
                "animate-on-scroll rounded-2xl border border-theme bg-theme-card p-6 text-left shadow-sm",
                `stagger-${(i % 3) + 1}`,
              )}
            >
              <item.icon className="mb-3 h-8 w-8 text-brand" aria-hidden />
              <h3 className="text-heading-3 text-theme mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-theme-s">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="animate-on-scroll mt-10 text-center text-sm text-theme-s">
          New to Voatomy? Start with{" "}
          <Link className="font-semibold text-brand underline-offset-2 hover:underline" href="/industries">
            industry playbooks
          </Link>{" "}
          or the{" "}
          <Link className="font-semibold text-brand underline-offset-2 hover:underline" href="/docs">
            documentation hub
          </Link>
          .
        </p>
      </Section>

      {/* Status Legend */}
      <Section variant="amber" className="py-8 sm:py-10">
        <div className="flex flex-wrap items-center justify-center gap-4 animate-on-scroll">
          {STATUSES.map((status) => {
            const config = STATUS_CONFIG[status];
            const Icon = config.icon;
            return (
              <div key={status} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4" style={{ color: config.color }} />
                <span className="text-sm text-theme-s">{config.label}</span>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Product Filter */}
      <Section variant="white" className="py-8 sm:py-10">
        <div className="animate-on-scroll">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-theme-m" />
            <span className="text-sm font-medium text-theme-s">Filter by product:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-1">
            {PRODUCTS.map((prod) => (
              <button key={prod} onClick={() => setActiveProduct(prod)} className={cn(
                "flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer",
                activeProduct === prod ? "bg-brand text-safe-black" : "bg-theme-subtle text-theme-s hover:bg-theme-card hover:text-theme",
              )}>
                {prod}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Timeline by Quarter */}
      <Section variant="white" className="pt-4 pb-20 sm:pb-28">
        <div className="space-y-16">
          {QUARTERS.map((quarter) => {
            const items = filtered.filter((item) => item.quarter === quarter);
            if (items.length === 0) return null;
            const quarterStatus = quarter === "Q1 2026" ? "shipped" : quarter === "Q2 2026" ? "in-progress" : quarter === "Q3 2026" ? "planned" : "exploring";
            const StatusIcon = STATUS_CONFIG[quarterStatus].icon;

            return (
              <div key={quarter} className="animate-on-scroll">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${STATUS_CONFIG[quarterStatus].color}15` }}>
                    <Calendar className="h-5 w-5" style={{ color: STATUS_CONFIG[quarterStatus].color }} />
                  </div>
                  <div>
                    <h2 className="text-heading-2 text-theme">{quarter}</h2>
                    <div className="flex items-center gap-1.5">
                      <StatusIcon className="h-3.5 w-3.5" style={{ color: STATUS_CONFIG[quarterStatus].color }} />
                      <span className="text-xs text-theme-m">{STATUS_CONFIG[quarterStatus].label}</span>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item, i) => {
                    const statusConfig = STATUS_CONFIG[item.status];
                    const SIcon = statusConfig.icon;
                    return (
                      <Card key={`${item.product}-${item.title}`} variant="light" className={cn("h-full hover:border-theme-h transition-all", `stagger-${(i % 3) + 1}`)}>
                        <div className="flex items-center justify-between mb-3">
                          <Chip dotColor={PRODUCT_COLORS[item.product]} className="text-xs">{item.product}</Chip>
                          <SIcon className="h-4 w-4" style={{ color: statusConfig.color }} />
                        </div>
                        <h3 className="text-sm font-semibold text-theme mb-2">{item.title}</h3>
                        <p className="text-xs text-theme-s leading-relaxed">{item.description}</p>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* CTA */}
      <Section variant="amber" container={false} className="relative py-20 sm:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-12 blur-[100px]" style={{ background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)` }} />
        </div>
        <div className="relative mx-auto max-w-2xl px-4 text-center animate-on-scroll">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10">
            <Rocket className="h-7 w-7 text-brand" />
          </div>
          <h2 className="text-heading-1 text-theme mb-4">Want to Influence What We Build?</h2>
          <p className="text-body-lg text-theme-s mb-8 max-w-lg mx-auto">
            Voatomy customers get direct access to our product team. Your feedback shapes the roadmap.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/auth/signup">
              <Button size="lg">Start Free Trial<ArrowRight className="ml-1.5 h-4 w-4" /></Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">Request a Feature</Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
