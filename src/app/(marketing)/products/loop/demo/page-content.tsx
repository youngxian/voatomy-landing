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
  MessageSquare,
  DollarSign,
  TrendingUp,
  Users,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { BRAND_GREEN } from "@/lib/marketing-visual";


const PRODUCT_COLOR = "#6366F1";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "Revenue-Weighted Backlogs",
    description:
      "Automatically rank backlog items by the revenue they protect or unlock. Build what matters most to the business.",
  },
  {
    icon: DollarSign,
    title: "Churn Risk Scoring",
    description:
      "LOOP surfaces feature requests tied to at-risk accounts so engineering can act before customers leave.",
  },
  {
    icon: TrendingUp,
    title: "Deal Velocity Tracking",
    description:
      "See which features are blocking sales pipeline. Accelerate deals by shipping what prospects need.",
  },
  {
    icon: Users,
    title: "Customer Voice Integration",
    description:
      "Aggregate feedback from support, NPS, and sales calls into a unified demand signal for engineering.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Connect Revenue Data",
    description:
      "Integrate CRM, support tools, and billing. LOOP maps customer signals to your backlog.",
  },
  {
    num: "02",
    title: "Score & Prioritize",
    description:
      "AI assigns revenue weight and churn risk to every backlog item automatically.",
  },
  {
    num: "03",
    title: "Align Teams",
    description:
      "Product, engineering, and sales share a single source of truth on what to build next.",
  },
  {
    num: "04",
    title: "Measure Impact",
    description:
      "Track how shipped features move the needle on retention, expansion, and deal velocity.",
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

export default function LoopDemoPageContent() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);
  useScrollAnimation();

  return (
    <div id="loop-demo">
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
              className="border border-indigo-500/20 bg-indigo-500/[0.08] font-semibold text-indigo-400"
            >
              LOOP Demo
            </Chip>
          </div>

          <h1
            className={cn(
              "mx-auto mt-8 max-w-[860px] text-4xl font-semibold leading-[1.08] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-[0.1s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            See the{" "}
            <span style={{ color: PRODUCT_COLOR }}>Revenue Feedback Engine</span>{" "}
            in action
          </h1>

          <p
            className={cn(
              "mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-theme-m transition-all duration-700 delay-[0.2s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Close the loop between customer demand and engineering delivery.
            Watch how LOOP turns revenue signals into prioritized backlogs.
          </p>

          <div
            className={cn(
              "mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row transition-all duration-700 delay-[0.3s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href={buildProductCheckoutUrl({ product: "loop", plan: "pro" })}>
                Start 14-day trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/products/loop">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Video Placeholder ── */}
      <Section variant="amber" className="py-20 sm:py-28">
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
      <Section variant="coral" className="py-20 sm:py-28">
        <div className="text-center">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: `${PRODUCT_COLOR}cc` }}
          >
            Key Features
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            What makes LOOP different
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            Revenue intelligence that connects what customers need to what
            engineering builds.
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
            From signals to shipped features
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
            Ready to close the{" "}
            <span className="text-brand">revenue loop?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[520px] text-lg leading-relaxed text-theme-m">
            Connect your CRM and backlog, and let LOOP surface the features
            your customers and prospects need most.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href={buildProductCheckoutUrl({ product: "loop", plan: "pro" })}>
                Start 14-day trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/products/loop">Back to LOOP</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-theme-m">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              Free tier available
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              Salesforce &amp; HubSpot integration
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
