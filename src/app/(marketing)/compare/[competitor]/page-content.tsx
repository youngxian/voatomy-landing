"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { COMPETITORS } from "@/lib/compare-competitors";
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
import { BRAND_GREEN } from "@/lib/marketing-visual";



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
