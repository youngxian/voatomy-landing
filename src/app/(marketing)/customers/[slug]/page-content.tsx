"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { CASE_STUDIES } from "@/lib/case-studies";
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
