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
  Building2,
  TrendingUp,
  Users,
  BarChart3,
  Filter,
  Star,
} from "lucide-react";
import { BRAND_GREEN } from "@/lib/marketing-visual";



const INDUSTRIES = ["All", "SaaS", "Fintech", "E-Commerce", "Healthcare", "Enterprise"];

const PRODUCT_FILTERS = ["All", "ATLAS", "LOOP", "SIGNAL", "PHANTOM", "DRIFT", "NEXUS"];

const PRODUCT_COLORS: Record<string, string> = {
  ATLAS: "#f16e2c",
  LOOP: "#8b5cf6",
  SIGNAL: "#38bdf8",
  PHANTOM: "#ef4444",
  DRIFT: "#fbbf24",
  NEXUS: "#0d9488",
};

const CASE_STUDIES = [
  {
    slug: "meridian-saas",
    company: "Meridian SaaS",
    logo: "MS",
    industry: "SaaS",
    teamSize: "120 engineers",
    products: ["ATLAS", "PHANTOM"],
    headline: "87% sprint accuracy with AI-powered planning",
    excerpt: "Meridian replaced gut-feel estimation with ATLAS and went from 52% to 87% sprint completion rate in three quarters.",
    stats: [
      { label: "Sprint Accuracy", value: "87%", delta: "+35%" },
      { label: "Tech Debt Reduced", value: "42%", delta: "-42%" },
      { label: "Cycle Time", value: "3.2d", delta: "-28%" },
    ],
  },
  {
    slug: "novaledge-fintech",
    company: "Novaledge Financial",
    logo: "NF",
    industry: "Fintech",
    teamSize: "85 engineers",
    products: ["SIGNAL", "LOOP"],
    headline: "Revenue-aware incidents reduced MTTR by 60%",
    excerpt: "Novaledge connected SIGNAL to their monitoring stack and LOOP to Salesforce, creating a unified view of incident business impact.",
    stats: [
      { label: "MTTR", value: "12min", delta: "-60%" },
      { label: "Revenue Saved", value: "$2.1M", delta: "annually" },
      { label: "Escalation Accuracy", value: "94%", delta: "+38%" },
    ],
  },
  {
    slug: "cartflow-ecommerce",
    company: "CartFlow",
    logo: "CF",
    industry: "E-Commerce",
    teamSize: "200 engineers",
    products: ["ATLAS", "NEXUS", "LOOP"],
    headline: "Cross-team dependencies cut in half",
    excerpt: "CartFlow used NEXUS to map dependencies across 14 squads and ATLAS to plan sprints that account for cross-team bottlenecks.",
    stats: [
      { label: "Dependency Blocks", value: "51%", delta: "-51%" },
      { label: "Feature Velocity", value: "+34%", delta: "increase" },
      { label: "PM Hours Saved", value: "18h/wk", delta: "per PM" },
    ],
  },
  {
    slug: "healthbridge-platform",
    company: "HealthBridge",
    logo: "HB",
    industry: "Healthcare",
    teamSize: "60 engineers",
    products: ["PHANTOM", "DRIFT"],
    headline: "Design-code drift eliminated across 3 products",
    excerpt: "HealthBridge used DRIFT to keep their design system in sync and PHANTOM to quantify the business cost of accumulated tech debt.",
    stats: [
      { label: "Design Drift", value: "0%", delta: "eliminated" },
      { label: "Debt Cost Visibility", value: "100%", delta: "full" },
      { label: "Developer Satisfaction", value: "+27pts", delta: "NPS" },
    ],
  },
  {
    slug: "stackwise-enterprise",
    company: "Stackwise",
    logo: "SW",
    industry: "Enterprise",
    teamSize: "500 engineers",
    products: ["ATLAS", "LOOP", "SIGNAL", "NEXUS"],
    headline: "Full-stack product intelligence across 40 teams",
    excerpt: "Stackwise deployed the complete Voatomy suite to connect engineering velocity, customer feedback, and incident response into a single intelligence layer.",
    stats: [
      { label: "Planning Time", value: "-65%", delta: "reduction" },
      { label: "Revenue Attribution", value: "100%", delta: "of backlog" },
      { label: "Teams Onboarded", value: "40", delta: "in 6 weeks" },
    ],
  },
  {
    slug: "codestream-saas",
    company: "CodeStream AI",
    logo: "CA",
    industry: "SaaS",
    teamSize: "45 engineers",
    products: ["ATLAS", "LOOP"],
    headline: "Revenue-weighted backlog increased close rate by 22%",
    excerpt: "CodeStream connected LOOP to HubSpot and gave product managers revenue context for every backlog item, leading to measurably better prioritization.",
    stats: [
      { label: "Close Rate", value: "+22%", delta: "increase" },
      { label: "Feature Alignment", value: "94%", delta: "to revenue" },
      { label: "Sprint Accuracy", value: "81%", delta: "+29%" },
    ],
  },
];

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

export default function CustomersPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState("All");
  const [activeProduct, setActiveProduct] = useState("All");
  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filtered = CASE_STUDIES.filter((cs) => {
    if (activeIndustry !== "All" && cs.industry !== activeIndustry) return false;
    if (activeProduct !== "All" && !cs.products.includes(activeProduct)) return false;
    return true;
  });

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
              <Chip dotColor={BRAND_GREEN} className="mb-5 mx-auto"><Star className="h-3 w-3 mr-1" />Customer Stories</Chip>
            </div>
            <h1 className={cn("text-display-2 lg:text-display-1 text-theme mb-5 transition-all duration-700 delay-100", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              Teams That Ship <span className="text-brand">Smarter</span>
            </h1>
            <p className={cn("text-body-lg text-theme-s max-w-xl mx-auto mb-8 transition-all duration-700 delay-200", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              See how engineering organizations use Voatomy to improve sprint accuracy, reduce tech debt, and align product delivery with revenue impact.
            </p>
          </div>
        </div>
      </Section>

      {/* Aggregate Stats */}
      <Section variant="amber" className="py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-on-scroll">
          {[
            { label: "Engineering Teams", value: "340+", icon: Users },
            { label: "Sprints Analyzed", value: "14,000+", icon: BarChart3 },
            { label: "Avg Sprint Accuracy", value: "87%", icon: TrendingUp },
            { label: "Revenue Attributed", value: "$180M+", icon: Building2 },
          ].map((stat, i) => (
            <Card key={i} variant="light" className={cn("text-center", `stagger-${i + 1}`)}>
              <stat.icon className="h-5 w-5 text-brand mx-auto mb-2" />
              <div className="text-heading-1 text-theme mb-1">{stat.value}</div>
              <div className="text-xs text-theme-m">{stat.label}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Filters */}
      <Section variant="white" className="py-8 sm:py-10">
        <div className="animate-on-scroll space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-theme-m" />
            <span className="text-sm font-medium text-theme-s">Filter by industry:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
              {INDUSTRIES.map((ind) => (
                <button key={ind} onClick={() => setActiveIndustry(ind)} className={cn(
                  "flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer",
                  activeIndustry === ind ? "bg-brand text-safe-black" : "bg-theme-subtle text-theme-s hover:bg-theme-card hover:text-theme",
                )}>
                  {ind}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-theme-m" />
            <span className="text-sm font-medium text-theme-s">Filter by product:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
              {PRODUCT_FILTERS.map((prod) => (
                <button key={prod} onClick={() => setActiveProduct(prod)} className={cn(
                  "flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer",
                  activeProduct === prod ? "bg-brand text-safe-black" : "bg-theme-subtle text-theme-s hover:bg-theme-card hover:text-theme",
                )}>
                  {prod}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Case Study Grid */}
      <Section variant="white" className="pt-4 pb-20 sm:pb-28">
        <div className="flex items-center justify-between mb-8 animate-on-scroll">
          <h2 className="text-heading-2 text-theme">Case Studies</h2>
          <span className="text-sm text-theme-m">{filtered.length} {filtered.length === 1 ? "story" : "stories"}</span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((cs, i) => (
              <Link key={cs.slug} href={`/customers/${cs.slug}`} className="group">
                <Card variant="light" className={cn("animate-on-scroll h-full hover:border-theme-h transition-all", `stagger-${(i % 4) + 1}`)}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-brand/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-brand">{cs.logo}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-theme group-hover:text-brand transition-colors">{cs.company}</h3>
                      <div className="flex items-center gap-2 text-xs text-theme-m">
                        <span>{cs.industry}</span>
                        <span>·</span>
                        <span>{cs.teamSize}</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-heading-3 text-theme mb-2">{cs.headline}</h4>
                  <p className="text-sm text-theme-s leading-relaxed mb-5">{cs.excerpt}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cs.products.map((p) => (
                      <Chip key={p} dotColor={PRODUCT_COLORS[p]} className="text-xs">{p}</Chip>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-theme">
                    {cs.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-lg font-bold text-theme">{stat.value}</div>
                        <div className="text-[10px] text-theme-m leading-tight">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-on-scroll">
            <Building2 className="h-10 w-10 text-theme-m mx-auto mb-4" />
            <p className="text-body-base text-theme-s mb-1">No case studies match these filters.</p>
            <p className="text-sm text-theme-m">Try adjusting your filters to see more stories.</p>
          </div>
        )}
      </Section>

      {/* CTA */}
      <Section variant="amber" container={false} className="relative py-20 sm:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-12 blur-[100px]" style={{ background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)` }} />
        </div>
        <div className="relative mx-auto max-w-2xl px-4 text-center animate-on-scroll">
          <h2 className="text-heading-1 text-theme mb-4">Ready to Join Them?</h2>
          <p className="text-body-lg text-theme-s mb-8 max-w-lg mx-auto">Start your free trial and see how Voatomy transforms engineering delivery for your team.</p>
          <Link href="/auth/signup">
            <Button size="lg">Start Free Trial<ArrowRight className="ml-1.5 h-4 w-4" /></Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
