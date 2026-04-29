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
  Building2,
  Users,
  TrendingUp,
  Quote,
  Target,
  Lightbulb,
  BarChart3,
} from "lucide-react";

const BRAND_GREEN = "#12FF80";

const PRODUCT_COLORS: Record<string, string> = {
  ATLAS: "#f16e2c",
  LOOP: "#8b5cf6",
  SIGNAL: "#38bdf8",
  PHANTOM: "#ef4444",
  DRIFT: "#fbbf24",
  NEXUS: "#12FF80",
};

const CASE_STUDIES: Record<string, {
  company: string;
  logo: string;
  industry: string;
  teamSize: string;
  products: string[];
  headline: string;
  overview: string;
  challenge: string[];
  solution: string[];
  results: { label: string; value: string; delta: string }[];
  quote: { text: string; author: string; role: string };
}> = {
  "meridian-saas": {
    company: "Meridian SaaS", logo: "MS", industry: "SaaS", teamSize: "120 engineers", products: ["ATLAS", "PHANTOM"],
    headline: "87% sprint accuracy with AI-powered planning",
    overview: "Meridian SaaS is a B2B collaboration platform serving 2,000+ companies. Their engineering organization grew from 40 to 120 engineers in 18 months, and sprint planning became their biggest bottleneck.",
    challenge: ["Sprint completion rates had dropped to 52% as the team scaled.", "Story point estimates varied wildly between teams.", "Tech debt was accumulating without quantified impact."],
    solution: ["ATLAS deployed across 12 squads for AI-powered complexity analysis.", "PHANTOM connected for real-time tech debt cost visibility.", "Within two sprints, ATLAS calibrated to each team's patterns."],
    results: [{ label: "Sprint Accuracy", value: "87%", delta: "+35%" }, { label: "Tech Debt Reduced", value: "42%", delta: "-42%" }, { label: "Cycle Time", value: "3.2 days", delta: "-28%" }, { label: "Planning Time", value: "-70%", delta: "reduction" }],
    quote: { text: "ATLAS didn't just improve our estimates — it changed how we think about planning.", author: "Sarah Kim", role: "VP Engineering, Meridian SaaS" },
  },
  "novaledge-fintech": {
    company: "Novaledge Financial", logo: "NF", industry: "Fintech", teamSize: "85 engineers", products: ["SIGNAL", "LOOP"],
    headline: "Revenue-aware incidents reduced MTTR by 60%",
    overview: "Novaledge Financial is a payment processing platform handling $4B in annual transaction volume.",
    challenge: ["MTTR was 30 minutes with no business impact visibility.", "Product team had no CRM-connected backlog view.", "On-call couldn't distinguish $10K from $1M incidents."],
    solution: ["SIGNAL enriched every incident with revenue impact data.", "Smart routing escalated high-revenue incidents automatically.", "LOOP connected Salesforce pipeline to the product backlog."],
    results: [{ label: "MTTR", value: "12 min", delta: "-60%" }, { label: "Revenue Saved", value: "$2.1M", delta: "annually" }, { label: "Escalation Accuracy", value: "94%", delta: "+38%" }, { label: "False Escalations", value: "-72%", delta: "reduction" }],
    quote: { text: "Before SIGNAL, a P1 was a P1 regardless of impact. Now our engineers know instantly whether they're dealing with a $500 issue or a $500K one.", author: "Michael Torres", role: "CTO, Novaledge Financial" },
  },
  "cartflow-ecommerce": {
    company: "CartFlow", logo: "CF", industry: "E-Commerce", teamSize: "200 engineers", products: ["ATLAS", "NEXUS", "LOOP"],
    headline: "Cross-team dependencies cut in half",
    overview: "CartFlow is an enterprise e-commerce platform with 14 engineering squads.",
    challenge: ["42% of sprint failures caused by untracked dependencies.", "PMs spent 18+ hours/week in alignment meetings.", "Feature prioritization disconnected from revenue data."],
    solution: ["NEXUS built a real-time dependency graph across 14 squads.", "ATLAS generated plans accounting for cross-team dependencies.", "LOOP connected HubSpot to Linear for revenue context."],
    results: [{ label: "Dependency Blocks", value: "-51%", delta: "reduction" }, { label: "Feature Velocity", value: "+34%", delta: "increase" }, { label: "PM Hours Saved", value: "18h/wk", delta: "per PM" }, { label: "Revenue Alignment", value: "96%", delta: "of top items" }],
    quote: { text: "NEXUS gave us something we'd never had: a live map of who depends on whom.", author: "Jennifer Liu", role: "Director of Engineering, CartFlow" },
  },
  "healthbridge-platform": {
    company: "HealthBridge", logo: "HB", industry: "Healthcare", teamSize: "60 engineers", products: ["PHANTOM", "DRIFT"],
    headline: "Design-code drift eliminated across 3 products",
    overview: "HealthBridge builds a HIPAA-compliant patient engagement platform with three product lines sharing a design system.",
    challenge: ["Design tokens drifting across products threatened HIPAA compliance.", "Design team spent 40% of time auditing code.", "Tech debt slowed delivery by ~2 weeks per quarter."],
    solution: ["DRIFT connected to Figma for continuous design-code monitoring.", "PHANTOM translated tech debt into business cost.", "Automated Slack alerts caught deviations within hours."],
    results: [{ label: "Design Drift", value: "0%", delta: "eliminated" }, { label: "Debt Visibility", value: "100%", delta: "full" }, { label: "Dev Satisfaction", value: "+27pts", delta: "NPS" }, { label: "Audit Time", value: "-85%", delta: "reduction" }],
    quote: { text: "DRIFT turned design consistency from a manual audit into an automated guarantee.", author: "David Park", role: "Head of Design, HealthBridge" },
  },
  "stackwise-enterprise": {
    company: "Stackwise", logo: "SW", industry: "Enterprise", teamSize: "500 engineers", products: ["ATLAS", "LOOP", "SIGNAL", "NEXUS"],
    headline: "Full-stack product intelligence across 40 teams",
    overview: "Stackwise is an enterprise infrastructure company with 500+ engineers across 40 teams in 5 time zones.",
    challenge: ["No unified view of engineering health for leadership.", "Customer escalations took 4 days to reach the right team.", "Sprint planning consumed 200+ person-hours per sprint."],
    solution: ["Full Voatomy suite deployed in phased rollout.", "Executive dashboards aggregated all products.", "LOOP + SIGNAL auto-routed escalations with full context."],
    results: [{ label: "Planning Time", value: "-65%", delta: "reduction" }, { label: "Revenue Attribution", value: "100%", delta: "of backlog" }, { label: "Teams Onboarded", value: "40", delta: "in 6 weeks" }, { label: "Escalation Time", value: "-91%", delta: "4d → 9h" }],
    quote: { text: "Voatomy gave us a unified picture of how engineering effort connects to business outcomes.", author: "Robert Chen", role: "CTO, Stackwise" },
  },
  "codestream-saas": {
    company: "CodeStream AI", logo: "CA", industry: "SaaS", teamSize: "45 engineers", products: ["ATLAS", "LOOP"],
    headline: "Revenue-weighted backlog increased close rate by 22%",
    overview: "CodeStream AI builds developer productivity tools. A small team competing against well-funded incumbents.",
    challenge: ["Product decisions driven by loudest stakeholder.", "Sprint accuracy below 60%.", "Engineering felt disconnected from business outcomes."],
    solution: ["LOOP revealed 3 features accounted for 68% of blocked pipeline.", "ATLAS replaced estimation meetings with AI plans.", "Revenue context on every ticket transformed culture."],
    results: [{ label: "Close Rate", value: "+22%", delta: "increase" }, { label: "Feature Alignment", value: "94%", delta: "to revenue" }, { label: "Sprint Accuracy", value: "81%", delta: "+29%" }, { label: "Sales Confidence", value: "NPS 72", delta: "+40pts" }],
    quote: { text: "Once engineers could see that the feature they were building would directly unblock $400K in pipeline, everything changed.", author: "Alex Rivera", role: "CEO, CodeStream AI" },
  },
};

const ALL_SLUGS = Object.keys(CASE_STUDIES);

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

export default function CaseStudyPage({ slug }: { slug: string }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const study = CASE_STUDIES[slug];
  if (!study) {
    return (
      <Section variant="white" className="py-32 text-center">
        <h1 className="text-heading-1 text-theme mb-4">Case Study Not Found</h1>
        <p className="text-body-lg text-theme-s mb-8">This case study doesn&apos;t exist.</p>
        <Link href="/customers"><Button variant="secondary"><ArrowLeft className="mr-2 h-4 w-4" />All Customers</Button></Link>
      </Section>
    );
  }

  const currentIndex = ALL_SLUGS.indexOf(slug);
  const nextSlug = currentIndex < ALL_SLUGS.length - 1 ? ALL_SLUGS[currentIndex + 1] : null;
  const nextStudy = nextSlug ? CASE_STUDIES[nextSlug] : null;

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
              <Link href="/customers" className="inline-flex items-center gap-1.5 text-sm text-theme-s hover:text-theme mb-6 transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />All Customer Stories
              </Link>
            </div>

            <div className={cn("flex items-center gap-4 mb-6 transition-all duration-700 delay-100", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <div className="h-14 w-14 rounded-2xl bg-brand/10 flex items-center justify-center">
                <span className="text-lg font-bold text-brand">{study.logo}</span>
              </div>
              <div>
                <h2 className="text-heading-3 text-theme">{study.company}</h2>
                <div className="flex items-center gap-2 text-sm text-theme-m">
                  <Building2 className="h-3.5 w-3.5" />{study.industry}
                  <span>·</span>
                  <Users className="h-3.5 w-3.5" />{study.teamSize}
                </div>
              </div>
            </div>

            <h1 className={cn("text-display-2 lg:text-display-1 text-theme mb-5 transition-all duration-700 delay-200", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              {study.headline}
            </h1>

            <div className={cn("flex flex-wrap gap-2 transition-all duration-700 delay-300", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              {study.products.map((p) => (
                <Chip key={p} dotColor={PRODUCT_COLORS[p]} className="text-xs">{p}</Chip>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Results Banner */}
      <Section variant="amber" className="py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-on-scroll">
          {study.results.map((r, i) => (
            <Card key={i} variant="light" className={cn("text-center", `stagger-${i + 1}`)}>
              <TrendingUp className="h-4 w-4 text-brand mx-auto mb-2" />
              <div className="text-heading-1 text-theme mb-1">{r.value}</div>
              <div className="text-xs text-theme-m">{r.label}</div>
              <div className="text-xs text-brand mt-1">{r.delta}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Overview */}
      <Section variant="white" className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <p className="animate-on-scroll text-body-lg text-theme-s leading-relaxed">{study.overview}</p>
        </div>
      </Section>

      {/* Challenge */}
      <Section variant="amber" className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8 animate-on-scroll">
            <Target className="h-5 w-5 text-brand" />
            <h2 className="text-heading-2 text-theme">The Challenge</h2>
          </div>
          <div className="space-y-4">
            {study.challenge.map((point, i) => (
              <div key={i} className={cn("animate-on-scroll flex items-start gap-4", `stagger-${i + 1}`)}>
                <div className="h-7 w-7 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-red-500">{i + 1}</span>
                </div>
                <p className="text-body-base text-theme-s leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Solution */}
      <Section variant="white" className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8 animate-on-scroll">
            <Lightbulb className="h-5 w-5 text-brand" />
            <h2 className="text-heading-2 text-theme">The Solution</h2>
          </div>
          <div className="space-y-4">
            {study.solution.map((point, i) => (
              <div key={i} className={cn("animate-on-scroll flex items-start gap-4", `stagger-${i + 1}`)}>
                <div className="h-7 w-7 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-brand">{i + 1}</span>
                </div>
                <p className="text-body-base text-theme-s leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Quote */}
      <Section variant="amber" className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto animate-on-scroll">
          <Card variant="light" className="relative overflow-hidden">
            <Quote className="h-10 w-10 text-brand/20 absolute top-4 right-4" />
            <p className="text-heading-3 text-theme leading-relaxed mb-6 italic">&ldquo;{study.quote.text}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center">
                <span className="text-sm font-bold text-brand">{study.quote.author.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-theme block">{study.quote.author}</span>
                <span className="text-xs text-theme-m">{study.quote.role}</span>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Results Detail */}
      <Section variant="white" className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8 animate-on-scroll">
            <BarChart3 className="h-5 w-5 text-brand" />
            <h2 className="text-heading-2 text-theme">Results</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {study.results.map((r, i) => (
              <Card key={i} variant="light" className={cn("animate-on-scroll", `stagger-${i + 1}`)}>
                <div className="text-heading-1 text-brand mb-1">{r.value}</div>
                <div className="text-sm font-medium text-theme mb-0.5">{r.label}</div>
                <div className="text-xs text-theme-m">{r.delta}</div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Next Case Study / CTA */}
      <Section variant="amber" container={false} className="relative py-20 sm:py-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-12 blur-[100px]" style={{ background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)` }} />
        </div>
        <div className="relative mx-auto max-w-2xl px-4 text-center animate-on-scroll">
          {nextStudy ? (
            <>
              <p className="text-sm font-semibold text-theme-m uppercase tracking-wider mb-3">Next Case Study</p>
              <h2 className="text-heading-1 text-theme mb-4">{nextStudy.company}</h2>
              <p className="text-body-lg text-theme-s mb-8">{nextStudy.headline}</p>
              <Link href={`/customers/${nextSlug}`}>
                <Button size="lg">Read Case Study<ArrowRight className="ml-1.5 h-4 w-4" /></Button>
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-heading-1 text-theme mb-4">Ready to Write Your Story?</h2>
              <p className="text-body-lg text-theme-s mb-8 max-w-lg mx-auto">Join hundreds of engineering teams delivering smarter with Voatomy.</p>
              <Link href="/auth/signup">
                <Button size="lg">Start Free Trial<ArrowRight className="ml-1.5 h-4 w-4" /></Button>
              </Link>
            </>
          )}
        </div>
      </Section>
    </div>
  );
}
