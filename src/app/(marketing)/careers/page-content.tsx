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
  Globe,
  TrendingUp,
  Calendar,
  Rocket,
  MapPin,
  DollarSign,
  Heart,
  Stethoscope,
  Laptop,
  BookOpen,
  Plane,
  PieChart,
  Mail,
  Sparkles,
  Code2,
  Palette,
  Megaphone,
  Wrench,
  FileText,
  Brain,
  Users,
  Send,
} from "lucide-react";
import { BRAND_GREEN } from "@/lib/marketing-visual";


/* ─────────────────── Constants ─────────────────── */

const BRAND_ORANGE = "#f16e2c";

const WHY_BENEFITS = [
  {
    icon: Globe,
    title: "Remote-first, async culture",
    desc: "Work from anywhere. We default to async communication, long-form writing, and deep focus time. No surveillance, no seat-warming.",
    color: "#22D3EE",
  },
  {
    icon: TrendingUp,
    title: "Equity in a high-growth startup",
    desc: "Meaningful equity packages because we want every team member to build real wealth as we scale. You are not an employee, you are an owner.",
    color: BRAND_ORANGE,
  },
  {
    icon: Calendar,
    title: "Unlimited PTO, no tracking",
    desc: "Take what you need. We trust adults to manage their own energy. Leadership models healthy time off to set the standard.",
    color: "#6366F1",
  },
  {
    icon: Rocket,
    title: "Build products used by thousands",
    desc: "Your work ships to engineering teams at real companies. No internal tools gathering dust. Direct user impact from day one.",
    color: BRAND_GREEN,
  },
];

interface JobListing {
  title: string;
  department: string;
  departmentColor: string;
  location: string;
  salary: string;
  icon: typeof Code2;
  description: string;
}

const JOBS: JobListing[] = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    departmentColor: BRAND_ORANGE,
    location: "Remote",
    salary: "$180-220K",
    icon: Code2,
    description:
      "Build the core platform that connects engineering metrics to business outcomes. Next.js, Python, PostgreSQL, real-time data pipelines.",
  },
  {
    title: "ML/AI Engineer",
    department: "Engineering",
    departmentColor: BRAND_ORANGE,
    location: "Remote",
    salary: "$190-240K",
    icon: Brain,
    description:
      "Design and train the models that power confidence scoring, estimation accuracy, and predictive sprint planning across ATLAS.",
  },
  {
    title: "Product Designer",
    department: "Design",
    departmentColor: "#8B5CF6",
    location: "Remote",
    salary: "$150-190K",
    icon: Palette,
    description:
      "Own the end-to-end design experience for developer tools. Data visualization, complex workflows, and design systems that scale.",
  },
  {
    title: "Developer Advocate",
    department: "Marketing",
    departmentColor: "#22D3EE",
    location: "Remote",
    salary: "$140-170K",
    icon: Megaphone,
    description:
      "Tell the Voatomy story through content, talks, demos, and community. Be the bridge between our product and the engineering world.",
  },
  {
    title: "Solutions Engineer",
    department: "Sales",
    departmentColor: BRAND_GREEN,
    location: "Remote",
    salary: "$160-200K",
    icon: Wrench,
    description:
      "Help enterprise teams evaluate, integrate, and succeed with Voatomy. Technical depth meets consultative selling.",
  },
  {
    title: "Technical Writer",
    department: "Product",
    departmentColor: "#EF4444",
    location: "Remote",
    salary: "$120-150K",
    icon: FileText,
    description:
      "Write docs, guides, and API references that make complex developer tools feel approachable. Clarity is your superpower.",
  },
];

const PERKS = [
  {
    icon: Globe,
    title: "Remote-first",
    desc: "Work from anywhere in the world",
  },
  {
    icon: Stethoscope,
    title: "Health & dental",
    desc: "Full medical, dental, and vision coverage",
  },
  {
    icon: Laptop,
    title: "Equipment budget",
    desc: "$5K to set up your ideal workspace",
  },
  {
    icon: BookOpen,
    title: "Learning budget",
    desc: "$2K/yr for courses, books, and conferences",
  },
  {
    icon: Plane,
    title: "Quarterly retreats",
    desc: "In-person team gatherings every quarter",
  },
  {
    icon: PieChart,
    title: "Stock options",
    desc: "Meaningful equity with a 4-year vest",
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

export default function CareersPage() {
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
        variant="mint"
        container={false}
        className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-0 left-1/3 w-[600px] h-[500px] rounded-full opacity-15 blur-[120px]"
            style={{
              background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)`,
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full opacity-12 blur-[100px]"
            style={{
              background: `radial-gradient(ellipse, ${BRAND_ORANGE}, transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 bg-dot-grid bg-[length:24px_24px] opacity-40" />
        </div>

        <div className="relative mx-auto w-full max-w-container px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Copy */}
            <div className="flex flex-col items-start gap-6">
              <div
                className={cn(
                  "transition-all duration-700",
                  heroLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6",
                )}
              >
                <Chip dotColor={BRAND_GREEN} className="mb-4">
                  We&apos;re Hiring
                </Chip>
              </div>

              <h1
                className={cn(
                  "text-display-2 lg:text-display-1 text-theme transition-all duration-700 delay-100",
                  heroLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6",
                )}
              >
                Build the future of{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${BRAND_GREEN}, #80ffb4)`,
                  }}
                >
                  software delivery
                </span>
              </h1>

              <p
                className={cn(
                  "text-body-lg text-theme-s max-w-lg transition-all duration-700 delay-200",
                  heroLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6",
                )}
              >
                Join a small team solving a trillion-dollar problem. We are
                building the intelligence layer that helps every software team on
                the planet plan better, ship faster, and measure what matters.
              </p>

              <div
                className={cn(
                  "flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-300",
                  heroLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6",
                )}
              >
                <Button size="lg" asChild>
                  <Link href="#open-positions">
                    View Open Roles <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" asChild>
                  <Link href="/about">Learn About Us</Link>
                </Button>
              </div>
            </div>

            {/* Right - Team Culture Visual */}
            <div
              className={cn(
                "relative transition-all duration-1000 delay-500",
                heroLoaded
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95",
              )}
            >
              <div className="rounded-2xl border border-theme bg-theme-s p-1 shadow-2xl">
                <div className="rounded-xl bg-theme-card p-6 space-y-5">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-7 w-7 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${BRAND_GREEN}20` }}
                      >
                        <Users
                          className="h-4 w-4"
                          style={{ color: BRAND_GREEN }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-theme">
                        Life at Voatomy
                      </span>
                    </div>
                    <Chip dotColor={BRAND_GREEN} className="text-xs">
                      5 open roles
                    </Chip>
                  </div>

                  {/* Culture pills */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Remote-first",
                      "Async culture",
                      "Deep work blocks",
                      "Ship weekly",
                      "No meetings Wednesdays",
                      "Equity for all",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-theme bg-theme-subtle px-3 py-1.5 text-xs text-theme-s"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Mini team grid */}
                  <div className="grid grid-cols-5 gap-3">
                    {[
                      { initials: "AO", color: BRAND_ORANGE, role: "CEO" },
                      { initials: "MK", color: "#6366F1", role: "CTO" },
                      { initials: "JL", color: "#22D3EE", role: "Product" },
                      { initials: "SR", color: BRAND_GREEN, role: "Eng" },
                      { initials: "KN", color: "#EF4444", role: "Design" },
                    ].map((m) => (
                      <div key={m.initials} className="text-center">
                        <div
                          className="h-10 w-10 mx-auto rounded-full flex items-center justify-center text-xs font-bold text-white mb-1"
                          style={{ backgroundColor: m.color }}
                        >
                          {m.initials}
                        </div>
                        <span className="text-[10px] text-theme-m">
                          {m.role}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom bar */}
                  <div className="flex items-center justify-between text-xs text-theme-m pt-3 border-t border-theme">
                    <span>5 founders &middot; 6 open roles</span>
                    <span style={{ color: BRAND_GREEN }}>Actively hiring</span>
                  </div>
                </div>
              </div>

              {/* Floating accent */}
              <div
                className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full opacity-30 blur-2xl animate-glow-pulse"
                style={{ background: BRAND_GREEN }}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 2. WHY VOATOMY ═══════════════ */}
      <Section variant="amber" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_ORANGE} className="mb-4 mx-auto">
            Why Join Us
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Why{" "}
            <span style={{ color: BRAND_ORANGE }}>Voatomy?</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            We are building a company where talented people do the best work of
            their careers. Here is what that looks like in practice.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {WHY_BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.title}
                variant="dark"
                className={cn(
                  "animate-on-scroll group hover:border-theme-h relative overflow-hidden",
                  `stagger-${i + 1}`,
                )}
              >
                <div className="relative z-10">
                  <div
                    className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300"
                    style={{ backgroundColor: `${benefit.color}15` }}
                  >
                    <Icon
                      className="h-5 w-5 transition-colors duration-300"
                      style={{ color: benefit.color }}
                    />
                  </div>
                  <h3 className="text-heading-3 text-theme mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-theme-s leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
                <div
                  className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
                  style={{ background: benefit.color }}
                />
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ═══════════════ 3. OPEN POSITIONS ═══════════════ */}
      <Section id="open-positions" variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Open Positions
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Find your role
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Every role is remote-friendly, equity-included, and designed for
            people who want to ship meaningful work.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {JOBS.map((job, i) => {
            const Icon = job.icon;
            return (
              <Card
                key={job.title}
                variant="dark"
                className={cn(
                  "animate-on-scroll group hover:border-theme-h",
                  `stagger-${i + 1}`,
                )}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  {/* Icon + Info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div
                      className="hidden sm:flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${job.departmentColor}15`,
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: job.departmentColor }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-heading-3 text-theme mb-1">
                        {job.title}
                      </h3>
                      <p className="text-sm text-theme-s leading-relaxed mb-3">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Chip
                          dotColor={job.departmentColor}
                          className="text-xs"
                        >
                          {job.department}
                        </Chip>
                        <span className="flex items-center gap-1 text-xs text-theme-m">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-theme-m">
                          <DollarSign className="h-3 w-3" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Apply button */}
                  <div className="flex-shrink-0 md:self-center">
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={`mailto:careers@voatomy.com?subject=Application: ${job.title}`}>
                        Apply <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ═══════════════ 4. CULTURE & PERKS ═══════════════ */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_ORANGE} className="mb-4 mx-auto">
            Culture & Perks
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Benefits that{" "}
            <span style={{ color: BRAND_ORANGE }}>actually matter</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-xl mx-auto">
            No ping-pong tables. Just the things that help you do great work and
            live a great life.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {PERKS.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <Card
                key={perk.title}
                variant="dark"
                className={cn(
                  "animate-on-scroll group hover:border-theme-h text-center",
                  `stagger-${i + 1}`,
                )}
              >
                <div
                  className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${BRAND_ORANGE}15` }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: BRAND_ORANGE }}
                  />
                </div>
                <h3 className="text-sm font-semibold text-theme mb-1">
                  {perk.title}
                </h3>
                <p className="text-xs text-theme-s leading-relaxed">
                  {perk.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ═══════════════ 5. APPLICATION CTA ═══════════════ */}
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
              background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)`,
            }}
          />
          <div
            className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]"
            style={{
              background: `radial-gradient(ellipse, ${BRAND_ORANGE}, transparent 70%)`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <div className="animate-on-scroll">
            <div
              className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${BRAND_GREEN}15` }}
            >
              <Mail className="h-7 w-7" style={{ color: BRAND_GREEN }} />
            </div>
            <h2 className="text-heading-1 text-theme mb-4">
              Don&apos;t see your role?
            </h2>
            <p className="text-body-lg text-theme-s mb-8 max-w-lg mx-auto">
              We are always looking for exceptional people. If you are passionate
              about developer tools and think you would be a great fit, send us a
              note. We read every email.
            </p>
          </div>

          <div className="animate-on-scroll stagger-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <Link href="mailto:careers@voatomy.com">
                Send Us a Note <Send className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/about">
                About Voatomy <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 animate-on-scroll stagger-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-theme bg-theme-card px-5 py-2.5">
              <div
                className="h-2 w-2 rounded-full animate-glow-pulse"
                style={{ backgroundColor: BRAND_GREEN }}
              />
              <span className="text-sm text-theme-s">
                careers@voatomy.com
              </span>
            </div>
          </div>

          <p className="text-xs text-theme-m mt-6 animate-on-scroll stagger-4">
            Voatomy is an equal opportunity employer. We celebrate diversity and
            are committed to creating an inclusive environment for all team
            members.
          </p>
        </div>
      </Section>
    </div>
  );
}
