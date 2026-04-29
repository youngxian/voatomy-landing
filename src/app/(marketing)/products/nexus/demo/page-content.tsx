"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import {
  ArrowRight,
  PlayCircle,
  Network,
  Gauge,
  LineChart,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const BRAND_GREEN = "#12FF80";
const PRODUCT_COLOR = "#12FF80";

const FEATURES = [
  {
    icon: Network,
    title: "Cross-Team Visibility",
    description:
      "NEXUS unifies data from ATLAS, LOOP, SIGNAL, DRIFT, and PHANTOM into a single org-wide intelligence layer.",
  },
  {
    icon: Gauge,
    title: "Org-Level KPIs",
    description:
      "Track sprint accuracy, revenue alignment, debt index, incident cost, and design coverage across every team at once.",
  },
  {
    icon: LineChart,
    title: "Executive Dashboards",
    description:
      "Leadership gets real-time dashboards that translate engineering activity into business outcomes — no manual reports needed.",
  },
  {
    icon: Sparkles,
    title: "Unified Intelligence",
    description:
      "AI correlates signals across all five products to surface insights no single tool could find on its own.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Activate Your Products",
    description:
      "Enable the Voatomy products your org uses. NEXUS automatically aggregates their data into unified views.",
  },
  {
    num: "02",
    title: "Configure Org KPIs",
    description:
      "Define the metrics that matter to your leadership — velocity, revenue alignment, debt trends, incident costs.",
  },
  {
    num: "03",
    title: "Share Dashboards",
    description:
      "Give executives, VPs, and team leads access to the views they need. Role-based dashboards show the right detail level.",
  },
  {
    num: "04",
    title: "Act on Cross-Team Insights",
    description:
      "NEXUS surfaces org-wide patterns — dependency bottlenecks, systemic debt, misaligned priorities — so you can act at scale.",
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

export default function NexusDemoPageContent() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);
  useScrollAnimation();

  return (
    <div id="nexus-demo">
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
              className="border border-brand/20 bg-brand/[0.08] font-semibold text-brand"
            >
              NEXUS Demo
            </Chip>
          </div>

          <h1
            className={cn(
              "mx-auto mt-8 max-w-[860px] text-4xl font-semibold leading-[1.08] tracking-tight text-theme sm:text-5xl md:text-display-2 lg:text-display-1 transition-all duration-700 delay-[0.1s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            See{" "}
            <span className="text-brand">The Full AI Platform</span>{" "}
            in action
          </h1>

          <p
            className={cn(
              "mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-theme-m transition-all duration-700 delay-[0.2s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            All Voatomy products unified into one AI organizational nerve
            center. Watch how NEXUS delivers cross-team visibility and
            executive-grade intelligence.
          </p>

          <div
            className={cn(
              "mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row transition-all duration-700 delay-[0.3s]",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href="/auth/signup">
                Try Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/products/nexus">Learn More</Link>
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
          <span className="text-xs font-bold uppercase tracking-widest text-brand/70">
            Key Features
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            What makes NEXUS different
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-body-lg text-theme-m">
            The unified intelligence layer that connects every Voatomy product
            into a single organizational nerve center.
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
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/[0.12]">
                  <Icon className="h-5 w-5 text-brand" />
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
          <span className="text-xs font-bold uppercase tracking-widest text-brand/70">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            From siloed tools to unified intelligence
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-[880px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-500 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 text-center"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-sm font-bold text-black">
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
            The complete platform
          </div>

          <h2 className="mx-auto max-w-[700px] text-3xl font-semibold tracking-tight text-theme sm:text-heading-1 md:text-display-2">
            Ready for{" "}
            <span className="text-brand">unified intelligence?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[520px] text-lg leading-relaxed text-theme-m">
            Activate NEXUS and connect every Voatomy product into a single
            org-wide nerve center. See the full picture for the first time.
          </p>

          <div className="mx-auto mt-10 flex max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href="/auth/signup">
                Try NEXUS Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/products/nexus">Back to NEXUS</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-theme-m">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              Free tier available
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-brand" />
              All integrations included
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
