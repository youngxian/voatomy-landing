"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { buildProductCheckoutUrl } from "@/lib/product-purchase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import {
  ArrowRight,
  PlayCircle,
  AlertTriangle,
  Activity,
  DollarSign,
  BarChart3,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { BRAND_GREEN } from "@/lib/marketing-visual";


const PRODUCT_COLOR = "#EF4444";

const FEATURES = [
  {
    icon: AlertTriangle,
    title: "Revenue-Aware Routing",
    description:
      "Incidents are routed based on business impact, not just severity. A P2 affecting your largest account gets executive attention instantly.",
  },
  {
    icon: Activity,
    title: "Auto-Context Enrichment",
    description:
      "SIGNAL attaches recent deploys, code owners, and related incidents to every alert so responders start with full context.",
  },
  {
    icon: DollarSign,
    title: "Business Impact Scoring",
    description:
      "Every incident gets a real-time dollar-impact estimate based on affected customers, SLA exposure, and revenue at risk.",
  },
  {
    icon: BarChart3,
    title: "Post-Incident Analysis",
    description:
      "Automated retro reports tie incidents to root cause, sprint impact, and long-term remediation recommendations.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Connect Monitoring",
    description:
      "Integrate PagerDuty, Datadog, and your APM. SIGNAL correlates alerts with business data from day one.",
  },
  {
    num: "02",
    title: "Detect & Score",
    description:
      "AI scores every incident by revenue impact and auto-enriches context for faster triage.",
  },
  {
    num: "03",
    title: "Route & Resolve",
    description:
      "Smart routing sends the right people the right context. Mean time to resolution drops dramatically.",
  },
  {
    num: "04",
    title: "Learn & Prevent",
    description:
      "Post-incident insights feed back into engineering priorities to prevent repeat outages.",
  },
];

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

export default function SignalDemoPageContent() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);
  useScrollAnimation();

  return (
    <div id="signal-demo">
      {/* ── Hero ── */}
      <section className="relative min-h-[80vh] overflow-hidden bg-theme px-4 pb-20 pt-28 transition-colors duration-300">
        <div
          className="pointer-events-none absolute inset-0 bg-dot-grid"
          style={{ backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 50% 35%, ${PRODUCT_COLOR}15, transparent)`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-[2] mx-auto max-w-container text-center">
          <div
            className={cn(
              "transition-all duration-700 delay-[0s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            <Chip
              dotColor={PRODUCT_COLOR}
              className="border border-red-500/20 bg-red-500/[0.08] font-semibold text-red-400"
            >
              SIGNAL Demo
            </Chip>
          </div>

          <h1
            className={cn(
              "mx-auto mt-8 max-w-[860px] text-4xl font-semibold leading-[1.08] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-[0.1s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            See{" "}
            <span style={{ color: PRODUCT_COLOR }}>Incident Intelligence</span>{" "}
            in action
          </h1>

          <p
            className={cn(
              "mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-theme-m transition-all duration-700 delay-[0.2s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Revenue-aware incident management that correlates outages with
            business impact. Watch how SIGNAL turns chaos into clarity.
          </p>

          <div
            className={cn(
              "mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row transition-all duration-700 delay-[0.3s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href={buildProductCheckoutUrl({ product: "signal", plan: "pro" })}>
                Start 14-day trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/products/signal">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Video Placeholder ── */}
      <Section variant="coral" className="py-20 sm:py-28">
        <div className="mx-auto max-w-[960px]">
          <Card
            variant="dark"
            className="group relative aspect-video overflow-hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${PRODUCT_COLOR}20, transparent)`,
              }}
            />
            <div className="relative z-[1] flex h-full flex-col items-center justify-center gap-4">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full border-2 transition-transform duration-300 group-hover:scale-110"
                style={{
                  borderColor: `${PRODUCT_COLOR}60`,
                  background: `${PRODUCT_COLOR}15`,
                }}
              >
                <PlayCircle
                  className="h-10 w-10"
                  style={{ color: PRODUCT_COLOR }}
                />
              </div>
              <p className="text-sm font-medium text-theme-m">
                Demo coming soon
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* ── Key Features ── */}
      <Section variant="amber" className="py-20 sm:py-28">
        <div className="text-center">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: `${PRODUCT_COLOR}cc` }}
          >
            Key Features
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            What makes SIGNAL different
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Business-aware incident response that goes beyond alerts to deliver
            revenue-correlated intelligence.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                variant="light"
                className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-500 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${PRODUCT_COLOR}15` }}
                >
                  <Icon className="h-5 w-5" style={{ color: PRODUCT_COLOR }} />
                </div>
                <h3 className="text-heading-3 text-theme">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-theme-m">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ── How It Works ── */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: `${PRODUCT_COLOR}cc` }}
          >
            How It Works
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            From alert to resolution in four steps
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-[880px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-500 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 text-center"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ background: PRODUCT_COLOR }}
              >
                {step.num}
              </div>
              <h3 className="text-heading-3 text-theme">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-theme-m">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-theme px-4 py-24 sm:py-32 transition-colors duration-300">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${BRAND_GREEN}18, transparent)`,
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-dot-grid"
          style={{ backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />

        <div className="relative z-[2] mx-auto max-w-container text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/[0.08] px-4 py-1.5 text-sm font-semibold text-brand mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Start in under 5 minutes
          </div>

          <h2 className="mx-auto max-w-[700px] text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 md:text-display-2">
            Ready to make incidents{" "}
            <span className="text-brand">revenue-aware?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[520px] text-lg leading-relaxed text-theme-m">
            Connect your monitoring stack and let SIGNAL correlate every alert
            with business impact. No credit card required.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href={buildProductCheckoutUrl({ product: "signal", plan: "pro" })}>
                Start 14-day trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/products/signal">Back to SIGNAL</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-theme-m">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              Free tier available
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              PagerDuty &amp; Datadog integration
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              SOC 2 compliant
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
