"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, GitBranch, Layers, Quote, Shield, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import { IndustryHeroIllustration } from "@/components/marketing/industry-hero-illustration";
import { INDUSTRY_OPTIONS, PLATFORM_DIFFERENTIATORS } from "@/lib/constants";
import {
  INDUSTRY_HUB_PHOTO,
  INDUSTRY_HUB_VISUAL,
  INDUSTRY_PAGE_BY_SLUG,
  MARKETING_INDUSTRY_SLUGS,
} from "@/lib/industry-pages";

const BRAND_GREEN = "#12FF80";

const HUB_STATS = [
  { value: "7", label: "Industry playbooks", sub: "Curated vertical lenses" },
  { value: "6", label: "Platform products", sub: "Mix and match as you grow" },
  { value: "100+", label: "Integrations", sub: "Code, CRM, support, ops" },
  { value: "1", label: "Operating graph", sub: "Same signals, your context" },
];

const HOW_STEPS = [
  {
    icon: GitBranch,
    title: "Pick your vertical",
    body: "Each page mirrors how leaders like you buy software: challenge → proof → solution pillars → products → proof points.",
  },
  {
    icon: Layers,
    title: "Map products to pain",
    body: "See which combination of ATLAS, LOOP, SIGNAL, PHANTOM, DRIFT, and NEXUS matches your next chapter — with role-based entry points.",
  },
  {
    icon: Sparkles,
    title: "Start narrow, expand fast",
    body: "Most teams begin with ATLAS or their highest-burn workflow, then connect revenue and incidents as trust builds.",
  },
];

const LOGO_STRIP = ["SaaS", "Fintech", "Health", "Commerce", "Enterprise", "DevTools", "AI"];

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
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);
}

export default function IndustriesHubPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useScrollAnimation();

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Hero — split layout (PagerDuty-style: headline + proof + visual) */}
      <Section variant="white" container={false} className="relative overflow-hidden pb-12 pt-28 sm:pb-16 sm:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-12 blur-[120px]"
            style={{ background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)` }}
          />
          <div className="absolute inset-0 bg-dot-grid bg-[length:24px_24px] opacity-35" />
        </div>
        <div className="relative mx-auto grid w-full max-w-container items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className={cn("transition-all duration-700", heroLoaded ? "opacity-100" : "opacity-0")}>
              <Chip dotColor={BRAND_GREEN} className="mb-5">
                <Building2 className="mr-1 h-3 w-3" />
                Industries
              </Chip>
            </div>
            <h1
              className={cn(
                "text-display-2 text-theme mb-5 transition-all delay-100 duration-700 lg:text-display-1",
                heroLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
            >
              The AI Product Operating System —{" "}
              <span className="bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
                built for how you ship
              </span>
            </h1>
            <p
              className={cn(
                "text-body-lg text-theme-s mb-6 max-w-xl transition-all delay-200 duration-700",
                heroLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
            >
              Explore vertical playbooks with proof points, solution pillars, and the Voatomy products that close the loop
              between code, customers, and revenue — the same narrative style trusted B2B buyers expect from category leaders.
            </p>
            <div
              className={cn(
                "mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap transition-all delay-300 duration-700",
                heroLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              )}
            >
              <Link href="/auth/signup">
                <Button size="lg">
                  Get early access
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Talk to sales
                </Button>
              </Link>
            </div>
            <div
              className={cn(
                "flex flex-wrap items-center gap-3 text-sm text-theme-s transition-all delay-[400ms] duration-700",
                heroLoaded ? "opacity-100" : "opacity-0",
              )}
            >
              <Shield className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              <span>Enterprise-ready posture: encryption, isolation, audit trails — detailed on Security.</span>
              <Link href="/security" className="font-semibold text-brand hover:underline">
                Security →
              </Link>
            </div>
          </div>
          <div
            className={cn(
              "relative mx-auto w-full max-w-md transition-all delay-200 duration-700 lg:max-w-none",
              heroLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            <IndustryHeroIllustration visual={INDUSTRY_HUB_VISUAL} className="shadow-2xl ring-1 ring-black/5" />
          </div>
        </div>
      </Section>

      {/* Photo band — human + credible like industry leaders */}
      <Section variant="white" container={false} className="pb-12 pt-0 sm:pb-16">
        <div className="relative mx-auto max-w-container px-4">
          <div className="relative aspect-[21/9] max-h-[min(52vh,420px)] overflow-hidden rounded-3xl border border-theme shadow-lg">
            <Image
              src={INDUSTRY_HUB_PHOTO.src}
              alt={INDUSTRY_HUB_PHOTO.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/75 via-teal-dark/20 to-transparent dark-section" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <p className="max-w-2xl text-lg font-medium leading-snug text-white sm:text-xl">
                Cross-functional teams use Voatomy to replace slide-deck planning with a live graph of work, risk, and
                revenue — from sprint room to board room.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Logo / segment strip */}
      <Section variant="mint" className="py-10 sm:py-12">
        <p className="animate-on-scroll mb-4 text-center text-xs font-bold uppercase tracking-widest text-theme-s">
          Built for teams shipping in
        </p>
        <div className="animate-on-scroll flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {LOGO_STRIP.map((label) => (
            <span
              key={label}
              className="rounded-full border border-theme bg-white/90 px-4 py-2 text-xs font-semibold text-theme shadow-sm"
            >
              {label}
            </span>
          ))}
        </div>
      </Section>

      <Section variant="amber" className="py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {HUB_STATS.map((s, i) => (
            <Card
              key={s.label}
              variant="light"
              className={cn("animate-on-scroll text-center", `stagger-${(i % 4) + 1}`)}
            >
              <div className="text-heading-1 text-theme mb-1">{s.value}</div>
              <div className="text-sm font-semibold text-theme">{s.label}</div>
              <div className="mt-1 text-xs text-theme-s">{s.sub}</div>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="white" className="py-14 sm:py-20">
        <div className="mx-auto mb-12 max-w-2xl animate-on-scroll text-center">
          <h2 className="text-heading-2 text-theme mb-3">Why vertical playbooks matter</h2>
          <p className="text-body-base text-theme-s">
            One platform — many buying centers. Industry pages translate Voatomy into the vocabulary your CFO, CISO, CPO, and
            field teams already use, then route them to the right products and solutions.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PLATFORM_DIFFERENTIATORS.map((d, i) => (
            <Card key={d.title} variant="light" className={cn("animate-on-scroll", `stagger-${(i % 4) + 1}`)}>
              <span className="mb-3 block text-2xl" aria-hidden>
                {d.icon}
              </span>
              <h3 className="text-heading-3 text-theme mb-2">{d.title}</h3>
              <p className="text-sm leading-relaxed text-theme-s">{d.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="white" className="border-t border-theme pb-6 pt-2">
        <div className="mx-auto mb-10 max-w-2xl animate-on-scroll text-center">
          <h2 className="text-heading-2 text-theme mb-3">How teams use this hub</h2>
          <p className="text-body-base text-theme-s">
            Structured like enterprise industry hubs: start with your context, then drill into proof, solutions, and CTAs.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {HOW_STEPS.map((step, i) => (
            <div key={step.title} className={cn("animate-on-scroll text-center md:text-left", `stagger-${(i % 3) + 1}`)}>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 md:mx-0">
                <step.icon className="h-6 w-6 text-brand" />
              </div>
              <h3 className="text-heading-3 text-theme mb-2">{step.title}</h3>
              <p className="text-sm leading-relaxed text-theme-s">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Bento industry grid */}
      <Section variant="white" className="pb-20 sm:pb-28">
        <div className="mb-10 animate-on-scroll text-center lg:text-left">
          <h2 className="text-heading-2 text-theme mb-2">Choose your industry</h2>
          <p className="text-body-base text-theme-s mx-auto max-w-2xl lg:mx-0">
            Each card previews outcomes and links to a full playbook: challenge narrative, solution pillars, photography,
            products, solutions by role, and social-style proof.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {MARKETING_INDUSTRY_SLUGS.map((slug, i) => {
            const meta = INDUSTRY_OPTIONS.find((o) => o.value === slug);
            const page = INDUSTRY_PAGE_BY_SLUG[slug];
            const icon = meta?.icon ?? "✨";
            const label = meta?.label ?? slug;
            const v = page.visual;
            return (
              <Link key={slug} href={`/industries/${slug}`} className="group animate-on-scroll">
                <Card
                  variant="light"
                  className={cn(
                    "h-full overflow-hidden p-0 transition-all hover:-translate-y-0.5 hover:shadow-xl",
                    `stagger-${(i % 4) + 1}`,
                  )}
                >
                  <div
                    className="relative h-36 sm:h-40"
                    style={{ backgroundImage: `linear-gradient(115deg, ${v.orbA}, ${v.orbB} 45%, ${v.orbC})` }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_50%)]" />
                    <span className="absolute left-5 top-5 text-4xl drop-shadow-md">{icon}</span>
                    <span className="absolute bottom-4 left-5 right-5 text-lg font-bold tracking-tight text-white drop-shadow">
                      {label}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand">{page.hubTagline}</p>
                    <p className="mt-2 text-sm leading-relaxed text-theme-s">{page.hubTeaser}</p>
                    <ul className="mt-4 space-y-2 border-t border-theme pt-4">
                      {page.outcomes.slice(0, 2).map((o) => (
                        <li key={o} className="flex gap-2 text-xs text-theme-s">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-brand">
                      Explore playbook
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Quote strip */}
      <Section variant="violet" className="py-14 sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 animate-on-scroll sm:flex-row sm:items-start">
          <Quote className="h-10 w-10 shrink-0 text-violet-600 opacity-80" aria-hidden />
          <blockquote className="text-lg font-medium leading-relaxed text-theme sm:text-xl">
            Industry pages should do the translation work for you — challenges, proof, and product mapping in one flow. That is
            exactly what we built here for Voatomy customers and prospects.
          </blockquote>
        </div>
        <p className="animate-on-scroll mt-4 text-center text-sm text-theme-s">— Voatomy go-to-market</p>
      </Section>

      <Section variant="amber" container={false} className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-12 blur-[100px]"
            style={{ background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)` }}
          />
        </div>
        <div className="relative mx-auto max-w-3xl animate-on-scroll px-4 text-center">
          <h2 className="text-heading-1 text-theme mb-4">Not sure where you fit?</h2>
          <p className="text-body-lg text-theme-s mx-auto mb-4 max-w-xl">
            Start with ATLAS, then add LOOP, SIGNAL, PHANTOM, DRIFT, or NEXUS. Use solutions by role when you are championing
            inside your org.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/auth/signup">
              <Button size="lg">
                Get early access
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Talk to us
              </Button>
            </Link>
            <Link href="/solutions/engineering-managers">
              <Button variant="secondary" size="lg">
                Browse solutions
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
