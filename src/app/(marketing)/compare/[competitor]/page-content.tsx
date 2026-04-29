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
  Check,
  X as XIcon,
  Minus,
  Shield,
  Zap,
  Star,
  DollarSign,
  ChevronRight,
} from "lucide-react";

const BRAND_GREEN = "#12FF80";

const COMPETITORS: Record<string, {
  name: string;
  tagline: string;
  description: string;
  category: string;
  comparison: { feature: string; voatomy: string | boolean; competitor: string | boolean }[];
  differentiators: string[];
  pricing: { voatomy: string; competitor: string };
}> = {
  jellyfish: {
    name: "Jellyfish", tagline: "Engineering Management Intelligence", description: "See how Voatomy compares to Jellyfish for engineering intelligence.", category: "Engineering Intelligence",
    comparison: [
      { feature: "AI Sprint Planning", voatomy: true, competitor: false },
      { feature: "Engineering Metrics Dashboard", voatomy: true, competitor: true },
      { feature: "Revenue-Weighted Backlog", voatomy: true, competitor: false },
      { feature: "Tech Debt Quantification ($)", voatomy: true, competitor: false },
      { feature: "Cross-Team Dependency Mapping", voatomy: true, competitor: "Limited" },
      { feature: "Incident Revenue Impact", voatomy: true, competitor: false },
      { feature: "Design-Code Sync", voatomy: true, competitor: false },
      { feature: "CRM Integration", voatomy: true, competitor: false },
      { feature: "Git + Project Integration", voatomy: true, competitor: true },
      { feature: "Custom Reporting", voatomy: true, competitor: true },
    ],
    differentiators: ["Generates sprint plans — not just reports on past performance", "Revenue intelligence connects customer signals to priorities", "Tech debt in dollars, not code metrics", "Six purpose-built products vs. one dashboard"],
    pricing: { voatomy: "From $29/user/mo", competitor: "Custom (~$50K+/yr)" },
  },
  productboard: {
    name: "Productboard", tagline: "Product Management Platform", description: "Compare Voatomy and Productboard for product-engineering alignment.", category: "Product Management",
    comparison: [
      { feature: "Customer Feedback Aggregation", voatomy: true, competitor: true },
      { feature: "Revenue-Weighted Prioritization", voatomy: true, competitor: "Limited" },
      { feature: "AI Sprint Planning", voatomy: true, competitor: false },
      { feature: "Roadmap Visualization", voatomy: "Q2 2026", competitor: true },
      { feature: "CRM Revenue Attribution", voatomy: true, competitor: "Limited" },
      { feature: "Engineering Complexity Scoring", voatomy: true, competitor: false },
      { feature: "Incident Business Impact", voatomy: true, competitor: false },
      { feature: "Cross-Team Dependencies", voatomy: true, competitor: false },
      { feature: "Design System Monitoring", voatomy: true, competitor: false },
      { feature: "Jira/Linear/Asana Sync", voatomy: true, competitor: true },
    ],
    differentiators: ["Bridges product AND engineering workflows", "Revenue data from CRM, not manual input", "AI plans that account for code complexity", "Full incident intelligence layer"],
    pricing: { voatomy: "From $29/user/mo", competitor: "From $20/maker/mo" },
  },
  pagerduty: {
    name: "PagerDuty", tagline: "Incident Management Platform", description: "Compare Voatomy SIGNAL with PagerDuty for incident management.", category: "Incident Management",
    comparison: [
      { feature: "On-Call Scheduling", voatomy: "Via integration", competitor: true },
      { feature: "Alert Routing & Escalation", voatomy: true, competitor: true },
      { feature: "Revenue Impact per Incident", voatomy: true, competitor: false },
      { feature: "Customer Identification", voatomy: true, competitor: false },
      { feature: "SLA-Aware Escalation", voatomy: true, competitor: "Limited" },
      { feature: "Post-Incident Cost Reporting", voatomy: true, competitor: false },
      { feature: "AI Sprint Planning", voatomy: true, competitor: false },
      { feature: "CRM Data Integration", voatomy: true, competitor: false },
      { feature: "Monitoring Integrations", voatomy: true, competitor: true },
      { feature: "Status Page", voatomy: false, competitor: true },
    ],
    differentiators: ["Business context PagerDuty can't provide — revenue, customers, SLA impact", "Complement: PagerDuty for on-call + SIGNAL for business intel", "Post-incident cost in dollars", "Incidents inform future sprint capacity"],
    pricing: { voatomy: "From $29/user/mo", competitor: "From $21/user/mo" },
  },
  sonarqube: {
    name: "SonarQube", tagline: "Code Quality & Security", description: "Compare Voatomy PHANTOM with SonarQube for tech debt management.", category: "Code Quality",
    comparison: [
      { feature: "Static Code Analysis", voatomy: "Via integration", competitor: true },
      { feature: "Security Scanning", voatomy: false, competitor: true },
      { feature: "Debt → Dollar Translation", voatomy: true, competitor: false },
      { feature: "Debt Impact on Velocity", voatomy: true, competitor: false },
      { feature: "Code Smell Detection", voatomy: "Via integration", competitor: true },
      { feature: "Business Case Generation", voatomy: true, competitor: false },
      { feature: "Sprint Planning Integration", voatomy: true, competitor: false },
      { feature: "Revenue Prioritization", voatomy: true, competitor: false },
      { feature: "Multi-Language Support", voatomy: true, competitor: true },
      { feature: "CI/CD Integration", voatomy: true, competitor: true },
    ],
    differentiators: ["Answers 'how much is debt costing?' — SonarQube answers 'where is it?'", "SonarQube for detection, PHANTOM for prioritization", "Debt in velocity-days and dollar impact", "Automatic debt capacity in sprint plans"],
    pricing: { voatomy: "From $29/user/mo", competitor: "Free / From $150/yr" },
  },
  gong: {
    name: "Gong", tagline: "Revenue Intelligence Platform", description: "Compare Voatomy LOOP with Gong for revenue intelligence.", category: "Revenue Intelligence",
    comparison: [
      { feature: "Call Recording & Analysis", voatomy: "Via Gong integration", competitor: true },
      { feature: "Feature Request Extraction", voatomy: true, competitor: "Limited" },
      { feature: "CRM Revenue Attribution", voatomy: true, competitor: true },
      { feature: "Backlog Revenue Weighting", voatomy: true, competitor: false },
      { feature: "Sprint Integration", voatomy: true, competitor: false },
      { feature: "Support Ticket Analysis", voatomy: true, competitor: false },
      { feature: "Deal-to-Feature Mapping", voatomy: true, competitor: false },
      { feature: "Competitive Intelligence", voatomy: false, competitor: true },
      { feature: "Sales Coaching", voatomy: false, competitor: true },
      { feature: "Product-Revenue Alignment", voatomy: true, competitor: "Limited" },
    ],
    differentiators: ["LOOP extends Gong intelligence to engineering backlogs", "Gong captures signals, LOOP translates to priorities", "Revenue weighting across ALL channels", "Direct sprint planning integration"],
    pricing: { voatomy: "From $29/user/mo", competitor: "Custom (~$100+/user/mo)" },
  },
  "incident-io": {
    name: "incident.io", tagline: "Modern Incident Management", description: "Compare Voatomy SIGNAL with incident.io for incident management.", category: "Incident Management",
    comparison: [
      { feature: "Slack-Native Management", voatomy: true, competitor: true },
      { feature: "Automated Workflows", voatomy: true, competitor: true },
      { feature: "Revenue Impact Scoring", voatomy: true, competitor: false },
      { feature: "Customer Impact ID", voatomy: true, competitor: false },
      { feature: "Post-Incident Reviews", voatomy: true, competitor: true },
      { feature: "On-Call Management", voatomy: "Via integration", competitor: true },
      { feature: "CRM Data Enrichment", voatomy: true, competitor: false },
      { feature: "Sprint Planning Integration", voatomy: true, competitor: false },
      { feature: "Status Page", voatomy: false, competitor: true },
      { feature: "Service Catalog", voatomy: false, competitor: true },
    ],
    differentiators: ["'What's the business cost?' for every incident", "P1s defined by business impact, not severity", "Connected to full Voatomy suite for planning + product decisions", "Customer-level impact with CRM data"],
    pricing: { voatomy: "From $29/user/mo", competitor: "Free / Custom (Pro)" },
  },
};

const ALL_COMPETITORS = Object.keys(COMPETITORS);

function FeatureCell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="h-5 w-5 text-brand mx-auto" />;
  if (value === false) return <XIcon className="h-5 w-5 text-red-400 mx-auto" />;
  return <span className="text-xs text-theme-m text-center block">{value}</span>;
}

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

export default function ComparisonPage({ competitor }: { competitor: string }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const data = COMPETITORS[competitor];
  if (!data) {
    return (
      <Section variant="white" className="py-32 text-center">
        <h1 className="text-heading-1 text-theme mb-4">Comparison Not Found</h1>
        <p className="text-body-lg text-theme-s mb-8">This comparison page doesn&apos;t exist.</p>
        <Link href="/"><Button variant="secondary"><ArrowLeft className="mr-2 h-4 w-4" />Back to Home</Button></Link>
      </Section>
    );
  }

  const voatomyWins = data.comparison.filter((c) => c.voatomy === true && c.competitor !== true).length;
  const otherCompetitors = ALL_COMPETITORS.filter((c) => c !== competitor);

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <Section variant="white" container={false} className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-15 blur-[120px]" style={{ background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)` }} />
        </div>
        <div className="relative mx-auto w-full max-w-container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className={cn("transition-all duration-700", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <Chip dotColor={BRAND_GREEN} className="mb-5 mx-auto"><Shield className="h-3 w-3 mr-1" />Comparison</Chip>
            </div>
            <h1 className={cn("text-display-2 lg:text-display-1 text-theme mb-5 transition-all duration-700 delay-100", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              Voatomy <span className="text-brand">vs</span> {data.name}
            </h1>
            <p className={cn("text-body-lg text-theme-s max-w-xl mx-auto mb-6 transition-all duration-700 delay-200", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              {data.description}
            </p>
            <div className={cn("flex items-center justify-center gap-4 transition-all duration-700 delay-300", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <Chip className="text-xs">{data.category}</Chip>
              <Chip dotColor={BRAND_GREEN} className="text-xs">{voatomyWins} Voatomy advantages</Chip>
            </div>
          </div>
        </div>
      </Section>

      {/* Feature Comparison Table */}
      <Section variant="amber" className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8 animate-on-scroll">
            <Star className="h-4 w-4 text-brand" />
            <h2 className="text-heading-2 text-theme">Feature Comparison</h2>
          </div>

          <Card variant="light" className="animate-on-scroll overflow-hidden p-0">
            {/* Table Header */}
            <div className="grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_140px_140px] gap-0 border-b border-theme">
              <div className="px-5 py-4 text-sm font-semibold text-theme">Feature</div>
              <div className="px-3 py-4 text-center border-l border-theme">
                <span className="text-sm font-bold text-brand">Voatomy</span>
              </div>
              <div className="px-3 py-4 text-center border-l border-theme">
                <span className="text-sm font-semibold text-theme-s">{data.name}</span>
              </div>
            </div>

            {/* Table Rows */}
            {data.comparison.map((row, i) => (
              <div key={i} className={cn("grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_140px_140px] gap-0 border-b border-theme last:border-b-0", i % 2 === 0 ? "bg-transparent" : "bg-theme-subtle/30")}>
                <div className="px-5 py-3.5 text-sm text-theme">{row.feature}</div>
                <div className="px-3 py-3.5 border-l border-theme flex items-center justify-center">
                  <FeatureCell value={row.voatomy} />
                </div>
                <div className="px-3 py-3.5 border-l border-theme flex items-center justify-center">
                  <FeatureCell value={row.competitor} />
                </div>
              </div>
            ))}
          </Card>
        </div>
      </Section>

      {/* Key Differentiators */}
      <Section variant="white" className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8 animate-on-scroll">
            <Zap className="h-4 w-4 text-brand" />
            <h2 className="text-heading-2 text-theme">Why Teams Choose Voatomy</h2>
          </div>
          <div className="space-y-4">
            {data.differentiators.map((diff, i) => (
              <Card key={i} variant="light" className={cn("animate-on-scroll hover:border-theme-h transition-all", `stagger-${i + 1}`)}>
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-brand" />
                  </div>
                  <p className="text-body-base text-theme">{diff}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing Comparison */}
      <Section variant="amber" className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8 animate-on-scroll">
            <DollarSign className="h-4 w-4 text-brand" />
            <h2 className="text-heading-2 text-theme">Pricing</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 animate-on-scroll">
            <Card variant="light" className="border-brand/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand" />
              <Chip dotColor={BRAND_GREEN} className="text-xs mb-4">Voatomy</Chip>
              <div className="text-heading-2 text-theme mb-2">{data.pricing.voatomy}</div>
              <p className="text-sm text-theme-s">All six products included. No per-product pricing.</p>
            </Card>
            <Card variant="light">
              <Chip className="text-xs mb-4">{data.name}</Chip>
              <div className="text-heading-2 text-theme mb-2">{data.pricing.competitor}</div>
              <p className="text-sm text-theme-s">Single-product focus. Additional tools required for full coverage.</p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Other Comparisons */}
      <Section variant="white" className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-heading-2 text-theme mb-8 animate-on-scroll">Other Comparisons</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCompetitors.map((comp, i) => {
              const c = COMPETITORS[comp];
              return (
                <Link key={comp} href={`/compare/${comp}`} className="group">
                  <Card variant="light" className={cn("animate-on-scroll h-full hover:border-theme-h transition-all", `stagger-${(i % 3) + 1}`)}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-theme group-hover:text-brand transition-colors">vs {c.name}</h3>
                        <p className="text-xs text-theme-m mt-0.5">{c.category}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-theme-m group-hover:text-brand transition-colors" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="amber" container={false} className="relative py-20 sm:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-12 blur-[100px]" style={{ background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)` }} />
        </div>
        <div className="relative mx-auto max-w-2xl px-4 text-center animate-on-scroll">
          <h2 className="text-heading-1 text-theme mb-4">See Voatomy in Action</h2>
          <p className="text-body-lg text-theme-s mb-8 max-w-lg mx-auto">Start your free trial and experience the difference of unified engineering intelligence.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/auth/signup">
              <Button size="lg">Start Free Trial<ArrowRight className="ml-1.5 h-4 w-4" /></Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">Talk to Sales</Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
