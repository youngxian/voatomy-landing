"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Layers,
  ListChecks,
  Quote,
  Target,
  Users,
} from "lucide-react";
import { IndustryHeroIllustration } from "@/components/marketing/industry-hero-illustration";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Section } from "@/components/ui/section";
import { INDUSTRY_OPTIONS, PRODUCTS } from "@/lib/constants";
import { INDUSTRY_PAGE_BY_SLUG, type MarketingIndustrySlug } from "@/lib/industry-pages";
import { BRAND_GREEN } from "@/lib/marketing-visual";


function productMeta(key: string) {
  const p = PRODUCTS.find((x) => x.key === key);
  return p ? { name: p.name, href: p.href, color: p.color, icon: p.icon, description: p.description, tagline: p.tagline } : null;
}

export default function IndustryDetailPageContent({ slug }: { slug: MarketingIndustrySlug }) {
  const page = INDUSTRY_PAGE_BY_SLUG[slug];
  const meta = INDUSTRY_OPTIONS.find((o) => o.value === slug);
  const badge = meta?.icon ?? "✨";

  return (
    <div className="relative overflow-hidden">
      {/* Hero — industry headline + abstract art (PagerDuty-style split) */}
      <Section variant="white" container={false} className="relative overflow-hidden pb-10 pt-28 sm:pb-14 sm:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-0 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-10 blur-[110px]"
            style={{ background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)` }}
          />
        </div>
        <div className="relative mx-auto grid w-full max-w-container items-center gap-10 px-4 lg:grid-cols-2 lg:gap-14">
          <div>
            <Link
              href="/industries"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-theme transition-colors hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" />
              All industries
            </Link>
            <Chip dotColor={BRAND_GREEN} className="mb-4">
              {badge} {page.heroEyebrow}
            </Chip>
            <h1 className="mb-5 max-w-3xl text-display-2 text-theme lg:text-display-1">{page.heroHeadline}</h1>
            <p className="max-w-xl text-body-lg text-theme-s">{page.heroSubheadline}</p>
            <p className="mt-4 max-w-xl text-body-base text-theme-s">
              Every playbook is grounded in the same six signals: code complexity, capacity, customer demand, tech debt,
              design scope, and business priority — expressed for your stakeholders.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {page.ctas.map((cta) => (
                <Button key={cta.href} asChild size="lg" variant={cta.href === "/auth/signup" ? "primary" : "secondary"}>
                  <Link href={cta.href}>
                    {cta.label}
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <IndustryHeroIllustration visual={page.visual} badge={badge} className="mx-auto max-w-md lg:max-w-none" />
        </div>
      </Section>

      {/* Proof strip */}
      <Section variant="mint" className="py-10 sm:py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {page.proofPoints.map((p) => (
            <Card key={p.label} variant="light" className="p-5 text-center sm:p-6">
              <div className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">{p.value}</div>
              <div className="mt-1 text-sm font-semibold text-theme">{p.label}</div>
              {p.hint ? <div className="mt-1 text-xs text-theme-s">{p.hint}</div> : null}
            </Card>
          ))}
        </div>
      </Section>

      {/* Editorial image */}
      <Section variant="white" container={false} className="pb-12 pt-0 sm:pb-16">
        <div className="relative mx-auto max-w-container px-4">
          <div className="relative aspect-[2/1] max-h-[min(48vh,440px)] overflow-hidden rounded-3xl border border-theme shadow-lg sm:aspect-[21/9]">
            <Image
              src={page.photoSrc}
              alt={page.photoAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-dark/80 via-teal-dark/35 to-transparent dark-section" />
            <div className="absolute bottom-0 left-0 max-w-lg p-6 sm:p-10">
              <p className="text-lg font-medium leading-snug text-white sm:text-xl">{page.scenarioParagraph}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Challenge — dark band */}
      <section className="relative bg-teal dark-section px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-container">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white/80">
            The challenge
          </div>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-heading-1">
            {page.challengeLead}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-body-lg">
            Leading industry hubs lead with the problem before the logo wall. Voatomy does the same — so your champions can
            paste this page into an internal memo and be understood on the first read.
          </p>
        </div>
      </section>

      {/* Solution pillars */}
      <Section variant="white" className="py-16 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-theme-s">
            <Layers className="h-4 w-4 text-brand" />
            How Voatomy helps
          </div>
          <h2 className="text-heading-2 text-theme mb-3">Solutions that map to your reality</h2>
          <p className="text-body-base text-theme-s">
            Three pillars your team can pilot independently — then connect on the platform as you earn trust.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {page.solutionPillars.map((pillar) => (
            <Card key={pillar.title} variant="light" className="relative overflow-hidden p-6 sm:p-8">
              <div
                className="absolute right-0 top-0 h-32 w-32 -translate-y-1/4 translate-x-1/4 rounded-full opacity-20 blur-2xl"
                style={{ background: page.visual.orbB }}
              />
              <span className="relative mb-4 block text-3xl">{pillar.icon}</span>
              <h3 className="relative text-heading-3 text-theme mb-2">{pillar.title}</h3>
              <p className="relative text-sm leading-relaxed text-theme-s">{pillar.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {page.trustNote ? (
        <Section variant="amber" className="py-10 sm:py-12">
          <div className="flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-theme">
              <CheckCircle2 className="h-6 w-6 text-brand" aria-hidden />
            </div>
            <div>
              <h2 className="text-heading-3 text-theme mb-2">Trust and compliance</h2>
              <p className="text-body-base leading-relaxed text-theme-s">{page.trustNote}</p>
            </div>
          </div>
        </Section>
      ) : null}

      <Section variant="white" className="py-14 sm:py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-heading-2 text-theme mb-2">What we hear from teams like yours</h2>
          <p className="text-body-base text-theme-s">
            Patterns from discovery calls and QBRs — before a single “platform initiative” is chartered.
          </p>
        </div>
        <ul className="mb-16 grid gap-4 sm:grid-cols-2">
          {page.painPoints.map((line) => (
            <li key={line}>
              <Card variant="light" className="flex h-full gap-3 p-4 sm:p-5">
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand" aria-hidden />
                <span className="text-sm leading-relaxed text-theme sm:text-body-base">{line}</span>
              </Card>
            </li>
          ))}
        </ul>

        <div className="mb-6 flex items-center gap-2">
          <Target className="h-5 w-5 text-brand" aria-hidden />
          <h2 className="text-heading-2 text-theme">Outcomes teams target</h2>
        </div>
        <p className="mb-8 max-w-2xl text-body-base text-theme-s">
          Phase adoption — these are outcomes mature customers cite once engineering, product, and leadership share one system
          of record.
        </p>
        <ul className="mb-16 grid gap-3 sm:grid-cols-2">
          {page.outcomes.map((o) => (
            <li
              key={o}
              className="flex gap-3 rounded-2xl border border-theme bg-theme-card px-4 py-3 shadow-sm sm:px-5 sm:py-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" aria-hidden />
              <span className="text-sm font-medium leading-relaxed text-theme sm:text-body-base">{o}</span>
            </li>
          ))}
        </ul>

        <div className="mb-6 flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-brand" aria-hidden />
          <h2 className="text-heading-2 text-theme">Three-step rollout</h2>
        </div>
        <p className="mb-8 max-w-2xl text-body-base text-theme-s">A pragmatic sequence — not a big-bang mandate.</p>
        <ol className="mb-16 grid gap-6 md:grid-cols-3">
          {page.playbookSteps.map((step, idx) => (
            <li key={step.title}>
              <Card variant="light" className="h-full p-5 sm:p-6">
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-sm font-bold text-brand">
                  {idx + 1}
                </span>
                <h3 className="text-heading-3 text-theme mb-2">{step.title}</h3>
                <p className="text-sm leading-relaxed text-theme-s">{step.body}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* Social proof */}
      <Section variant="violet" className="py-14 sm:py-16">
        <div className="mx-auto flex max-w-4xl flex-col gap-5 sm:flex-row sm:items-start">
          <Quote className="h-10 w-10 shrink-0 text-violet-600 opacity-90" aria-hidden />
          <div>
            <blockquote className="text-lg font-medium leading-relaxed text-theme sm:text-xl">“{page.quote.text}”</blockquote>
            <p className="mt-4 text-sm font-semibold text-theme">
              {page.quote.attribution}
              <span className="font-normal text-theme-s"> · {page.quote.role}</span>
            </p>
          </div>
        </div>
      </Section>

      <Section variant="white" className="py-14 sm:py-20">
        <div className="mb-6 flex items-center gap-2">
          <Layers className="h-5 w-5 text-brand" aria-hidden />
          <h2 className="text-heading-2 text-theme">Recommended products</h2>
        </div>
        <p className="mb-8 max-w-2xl text-body-base text-theme-s">
          Start where the fire is hottest. Each product page includes demos and integration depth.
        </p>
        <div className="mb-16 grid gap-5 sm:grid-cols-2">
          {page.recommendedProducts.map((key) => {
            const pm = productMeta(key);
            if (!pm) return null;
            return (
              <Link key={key} href={pm.href} className="group block">
                <Card variant="light" className="h-full overflow-hidden p-0 transition-all hover:border-theme-h sm:flex sm:min-h-[200px]">
                  <div
                    className="relative flex h-24 shrink-0 items-center justify-center sm:hidden"
                    style={{ backgroundImage: `linear-gradient(160deg, ${page.visual.orbA}, ${page.visual.orbB})` }}
                  >
                    <span className="text-4xl opacity-95">{pm.icon}</span>
                  </div>
                  <div
                    className="relative hidden w-2/5 shrink-0 sm:flex"
                    style={{ backgroundImage: `linear-gradient(160deg, ${page.visual.orbA}, ${page.visual.orbB})` }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-5xl opacity-90">{pm.icon}</span>
                  </div>
                  <div className="p-5 sm:w-3/5 sm:p-6">
                    <Chip dotColor={pm.color} className="mb-2 text-xs">
                      {pm.name}
                    </Chip>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-theme-s">{pm.tagline}</p>
                    <p className="text-sm leading-relaxed text-theme-s group-hover:text-theme">{pm.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                      Explore product
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mb-6 flex items-center gap-2">
          <Users className="h-5 w-5 text-brand" aria-hidden />
          <h2 className="text-heading-2 text-theme">Solutions by role</h2>
        </div>
        <p className="mb-8 max-w-2xl text-body-base text-theme-s">
          Industry buyers rarely shop in a vacuum — route champions to the role narrative that matches how they approve tools.
        </p>
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.recommendedSolutions.map((sol) => (
            <Link key={sol.href} href={sol.href} className="group">
              <Card variant="light" className="h-full p-5 transition-all hover:border-theme-h sm:p-6">
                <h3 className="text-heading-3 text-theme transition-colors group-hover:text-brand">{sol.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-theme-s">{sol.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  View solution
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mb-6 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-brand" aria-hidden />
          <h2 className="text-heading-2 text-theme">Related use cases</h2>
        </div>
        <p className="mb-6 max-w-2xl text-body-base text-theme-s">Workflow pages you can share with specialists on your team.</p>
        <div className="mb-12 flex flex-wrap gap-2">
          {page.relatedUseCases.map((uc) => (
            <Link key={uc.href} href={uc.href}>
              <Chip className="cursor-pointer border border-theme bg-theme-subtle px-3 py-1.5 text-sm font-medium text-theme hover:border-theme-h">
                {uc.title}
                <ArrowRight className="ml-1 inline h-3.5 w-3.5 opacity-60" aria-hidden />
              </Chip>
            </Link>
          ))}
        </div>

        <div className="rounded-2xl border border-theme bg-gradient-to-br from-theme-subtle to-white p-6 sm:p-8">
          <h2 className="text-heading-3 text-theme mb-3">Ready to go deeper?</h2>
          <p className="mb-6 max-w-xl text-sm leading-relaxed text-theme-s">
            Book a walkthrough or start a pilot workspace — we will map your toolchain to the shortest credible sequence.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {page.ctas.map((cta) => (
              <Button key={`bottom-${cta.href}`} asChild size="lg" variant={cta.href === "/auth/signup" ? "primary" : "secondary"}>
                <Link href={cta.href}>
                  {cta.label}
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </Section>

      <section className="relative bg-teal dark-section px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-container text-center">
          <h2 className="text-heading-1 text-white mb-4">Compare verticals or read customer stories</h2>
          <p className="mx-auto mb-8 max-w-xl text-body-lg text-white/75">
            Many teams span two industries — read a second playbook or see how peers describe outcomes on the customer hub.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" variant="primary" className="bg-accent-lime text-teal hover:bg-accent-lime/90">
              <Link href="/industries">
                All industries
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="border-white/30 bg-white/10 text-white hover:bg-white/15">
              <Link href="/customers">Customer stories</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
