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
  BarChart3,
  Users,
  Shield,
  Eye,
  Heart,
  Linkedin,
  Sparkles,
  Target,
  Building2,
  Layers,
  UserCircle,
  TrendingUp,
} from "lucide-react";

/* ─────────────────── Constants ─────────────────── */

const BRAND_GREEN = "#12FF80";
const BRAND_ORANGE = "#f16e2c";

const VALUES = [
  {
    icon: BarChart3,
    title: "Data over gut feel",
    desc: "Every decision backed by evidence. We instrument everything and let the numbers guide our roadmap, sprint plans, and priorities.",
    color: BRAND_ORANGE,
  },
  {
    icon: TrendingUp,
    title: "Revenue awareness",
    desc: "Engineering decisions connected to business outcomes. Every feature is measured by the revenue it protects, unlocks, or accelerates.",
    color: "#6366F1",
  },
  {
    icon: Users,
    title: "Cross-team first",
    desc: "Breaking silos between engineering, product, design, and sales. The best products are built when every function shares the same context.",
    color: "#22D3EE",
  },
  {
    icon: Shield,
    title: "Privacy by design",
    desc: "We never store source code. Read-only access only. SOC 2 ready from day one. Your intellectual property stays yours.",
    color: BRAND_GREEN,
  },
];

const STATS = [
  { value: "1,200+", label: "Waitlist signups", sub: "and growing every week" },
  { value: "6", label: "Products", sub: "in the Voatomy platform" },
  { value: "16+", label: "Integrations", sub: "connect your full stack" },
  { value: "5", label: "Founding engineers", sub: "building from day one" },
];

const TEAM = [
  {
    name: "Ade Okanlawon",
    role: "CEO & Co-Founder",
    initials: "AO",
    bio: "Former VP Eng at a Series C startup. Spent a decade watching sprint planning waste thousands of engineering hours.",
    color: BRAND_ORANGE,
  },
  {
    name: "Mira Kapoor",
    role: "CTO & Co-Founder",
    initials: "MK",
    bio: "Ex-Staff Engineer at Stripe. Built real-time data pipelines that processed millions of events daily. Obsessed with developer tooling.",
    color: "#6366F1",
  },
  {
    name: "James Lin",
    role: "VP Product",
    initials: "JL",
    bio: "Product lead at Linear before Voatomy. Believes the best product tools are the ones that disappear into your workflow.",
    color: "#22D3EE",
  },
  {
    name: "Sofia Ramirez",
    role: "VP Engineering",
    initials: "SR",
    bio: "Scaled engineering teams from 8 to 80 at two YC companies. Passionate about sustainable velocity and predictable delivery.",
    color: BRAND_GREEN,
  },
  {
    name: "Kai Nakamura",
    role: "Head of Design",
    initials: "KN",
    bio: "Design systems lead at Figma. Thinks deeply about how data visualization can make complex decisions feel intuitive.",
    color: "#EF4444",
  },
];

const INVESTORS = [
  {
    name: "Ashwin Mehta",
    title: "Partner, Abstract Ventures",
    initials: "AM",
    quote: "Voatomy is building the operating system that every software team will eventually need.",
  },
  {
    name: "Rebecca Thornton",
    title: "GP, Foundry Capital",
    initials: "RT",
    quote: "The team combines deep engineering empathy with a razor-sharp understanding of the market.",
  },
  {
    name: "David Park",
    title: "Angel Investor, ex-CTO Datadog",
    initials: "DP",
    quote: "I wish this existed when I was scaling engineering at Datadog. The cross-team visibility alone is worth it.",
  },
];

/* ─────────────────── Scroll Animation Hook ─────────────────── */

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

/* ─────────────────── Main Page Component ─────────────────── */

export default function AboutPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* ═══════════════ 1. HERO ═══════════════ */}
      <Section
        variant="coral"
        container={false}
        className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-15 blur-[120px]"
            style={{
              background: `radial-gradient(ellipse, ${BRAND_ORANGE}, transparent 70%)`,
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px]"
            style={{
              background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 bg-dot-grid bg-[length:24px_24px] opacity-40" />
        </div>

        <div className="relative mx-auto w-full max-w-container px-4 text-center">
          <div
            className={cn(
              "transition-all duration-700",
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
            )}
          >
            <Chip dotColor={BRAND_ORANGE} className="mb-6 mx-auto">
              About Voatomy
            </Chip>
          </div>

          <h1
            className={cn(
              "text-display-2 lg:text-display-1 text-theme max-w-4xl mx-auto transition-all duration-700 delay-100",
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
            )}
          >
            We believe software teams deserve{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${BRAND_ORANGE}, #ff9a5c)`,
              }}
            >
              better tools.
            </span>
          </h1>

          <p
            className={cn(
              "text-body-lg text-theme-s max-w-2xl mx-auto mt-6 transition-all duration-700 delay-200",
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
            )}
          >
            Voatomy exists to eliminate gut-feel decisions in software delivery.
            We build the intelligence layer that connects engineering effort to
            business outcomes, so teams can plan with confidence and ship with
            clarity.
          </p>

          <div
            className={cn(
              "flex items-center justify-center gap-6 mt-8 text-sm text-theme-m transition-all duration-700 delay-300",
              heroLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
            )}
          >
            <span>Founded 2025</span>
            <span className="h-1 w-1 rounded-full bg-theme-m" />
            <span>San Francisco & Remote</span>
            <span className="h-1 w-1 rounded-full bg-theme-m" />
            <span>5 Founders</span>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 2. THE STORY ═══════════════ */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <Chip dotColor={BRAND_ORANGE} className="mb-4 mx-auto">
              Our Story
            </Chip>
            <h2 className="text-heading-1 text-charcoal">
              Built by engineers, for engineers
            </h2>
          </div>

          <div className="space-y-6 animate-on-scroll stagger-1">
            <p className="text-body-lg text-charcoal/70 leading-relaxed">
              Voatomy was founded in 2025 by five engineers who were tired of
              sprint planning meetings that wasted everyone&apos;s time. We&apos;d
              sit in two-hour sessions, debating story points with no data to
              back up our estimates. Then mid-sprint, scope would creep, deadlines
              would slip, and the retro would devolve into finger-pointing. We
              knew there had to be a better way.
            </p>

            <p className="text-body-lg text-charcoal/70 leading-relaxed">
              The problem wasn&apos;t the people. It was the tools. Project managers
              had spreadsheets. Engineers had gut feelings. Product had customer
              anecdotes. Design had Figma files nobody looked at during planning.
              Sales had revenue context that never made it into the backlog. Every
              team was optimizing locally, and nobody had the full picture. We
              started Voatomy to build that full picture.
            </p>

            <p className="text-body-lg text-charcoal/70 leading-relaxed">
              Today, Voatomy is the intelligence layer for software delivery. We
              connect six real-time signals, from code complexity and tech debt
              to customer demand and revenue impact, into a single platform that
              helps teams plan with confidence, ship predictably, and measure
              what actually matters. We&apos;re not replacing your workflow. We&apos;re
              making every decision inside it smarter.
            </p>
          </div>

          {/* Decorative quote */}
          <div className="mt-12 animate-on-scroll stagger-2">
            <Card variant="dark" className="relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-l-card"
                style={{ backgroundColor: BRAND_ORANGE }}
              />
              <div className="pl-6">
                <p className="text-body-lg text-theme italic leading-relaxed">
                  &ldquo;We didn&apos;t set out to build another project management
                  tool. We set out to eliminate the information gap that makes
                  software delivery feel like guesswork.&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div
                    className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: `${BRAND_ORANGE}90` }}
                  >
                    AO
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-theme">
                      Ade Okanlawon
                    </div>
                    <div className="text-xs text-theme-m">
                      CEO & Co-Founder
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 3. MISSION & VALUES ═══════════════ */}
      <Section variant="amber" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_ORANGE} className="mb-4 mx-auto">
            What We Stand For
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Mission &{" "}
            <span style={{ color: BRAND_ORANGE }}>values</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            These are not poster slogans. They are the principles we use to make
            every product, hiring, and business decision.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {VALUES.map((value, i) => {
            const Icon = value.icon;
            return (
              <Card
                key={value.title}
                variant="dark"
                className={cn(
                  "animate-on-scroll group hover:border-theme-h relative overflow-hidden",
                  `stagger-${i + 1}`,
                )}
              >
                <div className="relative z-10">
                  <div
                    className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300"
                    style={{ backgroundColor: `${value.color}15` }}
                  >
                    <Icon
                      className="h-5 w-5 transition-colors duration-300"
                      style={{ color: value.color }}
                    />
                  </div>
                  <h3 className="text-heading-3 text-theme mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-theme-s leading-relaxed">
                    {value.desc}
                  </p>
                </div>
                <div
                  className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
                  style={{ background: value.color }}
                />
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ═══════════════ 4. BY THE NUMBERS ═══════════════ */}
      <Section variant="violet" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <h2 className="text-heading-1 text-theme mb-4">By the numbers</h2>
          <p className="text-body-lg text-theme-s max-w-xl mx-auto">
            We are early, intentional, and moving fast.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <Card
              key={stat.label}
              variant="dark"
              className={cn(
                "animate-on-scroll text-center hover:border-theme-h",
                `stagger-${i + 1}`,
              )}
            >
              <div
                className="text-display-2 font-bold mb-1"
                style={{ color: BRAND_ORANGE }}
              >
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-theme mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-theme-m">{stat.sub}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 5. TEAM ═══════════════ */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_ORANGE} className="mb-4 mx-auto">
            The Team
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Meet the founding team
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Five builders who have scaled engineering organizations, shipped
            products used by millions, and experienced the pain we are solving
            firsthand.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.map((member, i) => (
            <Card
              key={member.name}
              variant="dark"
              className={cn(
                "animate-on-scroll group hover:border-theme-h",
                `stagger-${i + 1}`,
              )}
            >
              <div className="flex items-start justify-between mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=transparent`}
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${member.color}20`, border: `2px solid ${member.color}40` }}
                  loading="lazy"
                />
                <button
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-theme-m hover:text-theme hover:bg-theme-subtle transition-colors duration-200"
                  aria-label={`${member.name} LinkedIn profile`}
                >
                  <Linkedin className="h-4 w-4" />
                </button>
              </div>
              <h3 className="text-heading-3 text-theme mb-0.5">
                {member.name}
              </h3>
              <div
                className="text-xs font-medium mb-3"
                style={{ color: member.color }}
              >
                {member.role}
              </div>
              <p className="text-sm text-theme-s leading-relaxed">
                {member.bio}
              </p>
            </Card>
          ))}

          {/* Join the team card */}
          <Card
            variant="dark"
            className="animate-on-scroll stagger-6 group hover:border-theme-h flex flex-col items-center justify-center text-center"
          >
            <div
              className="h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: `${BRAND_ORANGE}15` }}
            >
              <UserCircle
                className="h-7 w-7"
                style={{ color: BRAND_ORANGE }}
              />
            </div>
            <h3 className="text-heading-3 text-theme mb-2">This could be you</h3>
            <p className="text-sm text-theme-s mb-4">
              We are hiring across engineering, design, and product.
            </p>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/careers">
                View Open Roles <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </Card>
        </div>
      </Section>

      {/* ═══════════════ 6. INVESTORS ═══════════════ */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Backed By
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Backed by engineers who build
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Our investors are operators who have built and scaled the kinds of
            products we are building for. They bring capital, context, and
            conviction.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {INVESTORS.map((investor, i) => (
            <Card
              key={investor.name}
              variant="dark"
              className={cn(
                "animate-on-scroll hover:border-theme-h",
                `stagger-${i + 1}`,
              )}
            >
              <p className="text-sm text-theme-s leading-relaxed mb-6 italic">
                &ldquo;{investor.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-theme">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(investor.name)}&backgroundColor=transparent`}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full bg-brand/10"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-semibold text-theme">
                    {investor.name}
                  </div>
                  <div className="text-xs text-theme-m">{investor.title}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 7. JOIN US CTA ═══════════════ */}
      <Section
        variant="coral"
        container={false}
        className="relative py-24 sm:py-32 overflow-hidden"
      >
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-15 blur-[100px]"
            style={{
              background: `radial-gradient(ellipse, ${BRAND_ORANGE}, transparent 70%)`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <div className="animate-on-scroll">
            <div
              className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${BRAND_ORANGE}15` }}
            >
              <Heart className="h-7 w-7" style={{ color: BRAND_ORANGE }} />
            </div>
            <h2 className="text-heading-1 text-theme mb-4">
              We&apos;re hiring
            </h2>
            <p className="text-body-lg text-theme-s mb-8 max-w-lg mx-auto">
              Join a small, focused team solving a massive problem. We are
              remote-first, equity-heavy, and obsessed with building tools that
              engineering teams genuinely love.
            </p>
          </div>

          <div className="animate-on-scroll stagger-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link href="/careers">
                See Open Positions <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/auth/signup">Join the Waitlist</Link>
            </Button>
          </div>

          <p className="text-xs text-theme-m mt-6 animate-on-scroll stagger-3">
            San Francisco HQ &middot; Remote-first &middot; Backed by engineers
            who build
          </p>
        </div>
      </Section>
    </div>
  );
}
