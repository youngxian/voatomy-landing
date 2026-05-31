"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Users, Zap, TrendingUp, Globe2, Shield, LifeBuoy, Star, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubpageHeroAtmosphere } from "@/components/marketing/subpage-hero-atmosphere";

// ── Partner tiers ──────────────────────────────────────────────────────────

const TIERS = [
  {
    key: "agency",
    label: "Agency Partner",
    tagline: "Consultants & implementation partners",
    icon: Users,
    color: "#F05A28",
    bg: "#FFF4EE",
    border: "#FDDCC8",
    description:
      "For consulting firms, digital agencies, and freelancers who implement Voatomy for clients and want to earn referral fees and co-sell support.",
    benefits: [
      "20% recurring referral commission",
      "Dedicated partner success manager",
      "Co-branded pitch decks & case studies",
      "Priority implementation support",
      "Early access to new modules",
      "Listed in the Voatomy Agency Directory",
      "Free Team plan for your own agency",
      "Joint marketing & webinar opportunities",
    ],
    requirements: [
      "2+ active client implementations",
      "Certified Voatomy practitioner on team",
      "Signed partner agreement",
    ],
    cta: "Apply as Agency Partner",
  },
  {
    key: "tech",
    label: "Technology Partner",
    tagline: "Integrations & platform builders",
    icon: Zap,
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    description:
      "For SaaS companies, tool vendors, and platform builders who want deep two-way integrations with Voatomy and co-marketing reach to product teams.",
    benefits: [
      "Native integration listing in app & docs",
      "Sandbox + staging environment access",
      "Dedicated integration engineering support",
      "Co-marketing & product announcements",
      "Listed in Voatomy Integrations marketplace",
      "Beta access to MCP Mission Control APIs",
      "Joint press releases & case studies",
      "Shared Slack channel for technical support",
    ],
    requirements: [
      "Published, maintained integration",
      "SOC 2 or equivalent security posture",
      "Signed technology partner agreement",
    ],
    cta: "Apply as Tech Partner",
  },
  {
    key: "reseller",
    label: "Reseller Partner",
    tagline: "VARs, MSPs & regional distributors",
    icon: TrendingUp,
    color: "#059669",
    bg: "#F0FDF4",
    border: "#A7F3D0",
    description:
      "For value-added resellers, managed service providers, and regional distributors who want to sell Voatomy licenses to their customer base with margin.",
    benefits: [
      "Up to 30% reseller margin on new licenses",
      "Volume discount tiers (Bronze / Silver / Gold)",
      "Co-sell deal registration & protection",
      "Sales enablement & training library",
      "White-label reporting dashboards",
      "Dedicated channel account manager",
      "Quarterly business reviews",
      "Co-op marketing development funds",
    ],
    requirements: [
      "Established customer base in target market",
      "Minimum annual commitment (Bronze: $50K)",
      "Signed reseller agreement + NDA",
    ],
    cta: "Apply as Reseller",
  },
];

// ── Comparison table ───────────────────────────────────────────────────────

const TABLE_ROWS: { label: string; agency: string | boolean; tech: string | boolean; reseller: string | boolean }[] = [
  { label: "Commission / Margin", agency: "20% recurring", tech: "—", reseller: "Up to 30%" },
  { label: "Partner Directory listing", agency: true, tech: true, reseller: true },
  { label: "Dedicated success manager", agency: true, tech: false, reseller: true },
  { label: "Integration marketplace listing", agency: false, tech: true, reseller: false },
  { label: "Co-marketing budget", agency: true, tech: true, reseller: true },
  { label: "Sandbox / staging access", agency: true, tech: true, reseller: false },
  { label: "White-label dashboards", agency: false, tech: false, reseller: true },
  { label: "Deal registration protection", agency: false, tech: false, reseller: true },
  { label: "Free internal Team plan", agency: true, tech: false, reseller: false },
  { label: "Early feature access", agency: true, tech: true, reseller: false },
  { label: "Joint press / case study", agency: true, tech: true, reseller: true },
];

// ── Tech partner logo grid (uses integration logos) ────────────────────────

const TECH_PARTNERS = [
  { name: "GitHub", color: "#24292e" },
  { name: "GitLab", color: "#FC6D26" },
  { name: "Slack", color: "#4A154B" },
  { name: "Jira", color: "#0052CC" },
  { name: "Linear", color: "#5E6AD2" },
  { name: "Figma", color: "#F24E1E" },
  { name: "Notion", color: "#000000" },
  { name: "Datadog", color: "#632CA6" },
  { name: "PagerDuty", color: "#06AC38" },
  { name: "Sentry", color: "#362D59" },
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Salesforce", color: "#00A1E0" },
];

// ── Why partner stats ──────────────────────────────────────────────────────

const STATS = [
  { value: "12+", label: "Active tech integrations" },
  { value: "40+", label: "Agency partners globally" },
  { value: "3×", label: "Avg. agency revenue uplift" },
  { value: "$2M+", label: "Partner-sourced ARR in Y1" },
];

// ── Process steps ──────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  { n: "01", title: "Apply online", body: "Fill in the short application form. We review every submission within 5 business days." },
  { n: "02", title: "Partner call", body: "A 30-min call with our partnerships team to align on goals, fit, and next steps." },
  { n: "03", title: "Agreement & onboarding", body: "Sign the partner agreement, get portal access, and attend a 2-hour onboarding session." },
  { n: "04", title: "Launch & co-market", body: "Go live in the directory, activate co-marketing, and start earning from day one." },
];

// ── FAQ ────────────────────────────────────────────────────────────────────

const FAQ = [
  {
    q: "Can I be in multiple partner tiers at once?",
    a: "Yes. For example, a consultancy that also builds custom integrations can hold both Agency and Technology partner status under a single agreement.",
  },
  {
    q: "How is commission tracked and paid?",
    a: "Commission is tracked via unique referral links and deal registration. Payouts happen monthly via Stripe, 30 days after the referred customer's payment clears.",
  },
  {
    q: "Do I need to be certified before applying?",
    a: "Not for Technology or Reseller tiers. Agency partners need at least one certified practitioner on the team — certification is a free self-paced course in the partner portal.",
  },
  {
    q: "Is there a cost to join?",
    a: "No joining fee for any tier. Agency partners receive a complimentary internal Team plan. Tech and Reseller partners get sandbox access at no charge.",
  },
  {
    q: "What happens if a customer I referred churns?",
    a: "Commission is paid on net retained revenue. If a customer churns within 90 days, the corresponding commission is reversed. After 90 days, commission is yours to keep.",
  },
];

// ── Component ──────────────────────────────────────────────────────────────

export default function PageContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTier, setActiveTier] = useState<"agency" | "tech" | "reseller">("agency");

  return (
    <div className="relative min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-20 pt-28 text-center">
        <SubpageHeroAtmosphere />
        <div className="relative mx-auto max-w-3xl px-6">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F05A28]/20 bg-[#FFF4EE] px-3 py-1 text-xs font-semibold text-[#F05A28]">
            <Globe2 className="h-3.5 w-3.5" />
            Voatomy Partner Program
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#121312] sm:text-5xl">
            Grow together with{" "}
            <span className="text-[#F05A28]">Voatomy</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-[#121312]/60">
            Whether you consult, build, or resell — there&apos;s a program designed for how you work. Earn commissions, co-market to product teams, and shape the future of AI-driven delivery.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-xl bg-[#F05A28] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#D94E20] transition-colors"
            >
              Apply now <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#tiers"
              className="inline-flex items-center gap-2 rounded-xl border border-[#121312]/12 bg-white px-5 py-3 text-sm font-semibold text-[#121312] hover:bg-[#F7F7F5] transition-colors"
            >
              Compare tiers
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-y border-[#121312]/8 bg-[#F7F7F5]">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-[#121312]/8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-8 text-center">
              <p className="text-3xl font-bold text-[#F05A28]">{s.value}</p>
              <p className="mt-1 text-sm text-[#121312]/55">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tier cards ── */}
      <section id="tiers" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#121312]">Three ways to partner</h2>
          <p className="mt-3 text-[#121312]/55">Pick the program that matches how you go to market.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.key}
                className="flex flex-col rounded-2xl border-2 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
                style={{ borderColor: tier.border }}
              >
                {/* Header */}
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: tier.bg }}
                >
                  <Icon className="h-5 w-5" style={{ color: tier.color }} strokeWidth={2.2} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: tier.color }}>
                  {tier.tagline}
                </p>
                <h3 className="mt-1 text-xl font-bold text-[#121312]">{tier.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#121312]/60">{tier.description}</p>

                {/* Benefits */}
                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-[#121312]/80">
                      <span
                        className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full"
                        style={{ background: tier.bg }}
                      >
                        <Check className="h-2.5 w-2.5" style={{ color: tier.color }} strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Requirements */}
                <div className="mt-6 rounded-xl border border-[#121312]/8 bg-[#F7F7F5] p-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-[#121312]/40">Requirements</p>
                  <ul className="space-y-1.5">
                    {tier.requirements.map((r) => (
                      <li key={r} className="flex items-center gap-2 text-xs text-[#121312]/65">
                        <ChevronRight className="h-3 w-3 shrink-0 text-[#121312]/30" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#apply"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors"
                  style={{ background: tier.color }}
                >
                  {tier.cta} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="bg-[#F7F7F5] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-10 text-center text-2xl font-bold text-[#121312]">Compare all benefits</h2>

          {/* Mobile tier switcher */}
          <div className="mb-6 flex rounded-xl border border-[#121312]/10 bg-white p-1 sm:hidden">
            {(["agency", "tech", "reseller"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTier(t)}
                className={cn(
                  "flex-1 rounded-lg py-2 text-xs font-semibold transition-colors capitalize",
                  activeTier === t ? "bg-[#F05A28] text-white" : "text-[#121312]/55",
                )}
              >
                {t === "tech" ? "Tech" : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#121312]/8 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#121312]/8">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#121312]/40">
                    Benefit
                  </th>
                  {TIERS.map((t) => (
                    <th
                      key={t.key}
                      className={cn(
                        "px-5 py-4 text-center text-xs font-bold",
                        "hidden sm:table-cell",
                      )}
                      style={{ color: t.color }}
                    >
                      {t.label}
                    </th>
                  ))}
                  {/* Mobile: single column header */}
                  <th className="px-5 py-4 text-center text-xs font-bold text-[#F05A28] sm:hidden capitalize">
                    {activeTier === "tech" ? "Tech Partner" : TIERS.find((t) => t.key === activeTier)?.label}
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn("border-b border-[#121312]/6 last:border-0", i % 2 === 0 ? "bg-white" : "bg-[#F7F7F5]/50")}
                  >
                    <td className="px-5 py-3.5 font-medium text-[#121312]/80">{row.label}</td>
                    {/* Desktop: all 3 columns */}
                    {(["agency", "tech", "reseller"] as const).map((k) => {
                      const val = row[k];
                      return (
                        <td key={k} className="hidden px-5 py-3.5 text-center sm:table-cell">
                          {typeof val === "boolean" ? (
                            val ? (
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50">
                                <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
                              </span>
                            ) : (
                              <span className="text-[#121312]/20">—</span>
                            )
                          ) : (
                            <span className="text-xs font-semibold text-[#121312]">{val}</span>
                          )}
                        </td>
                      );
                    })}
                    {/* Mobile: single column */}
                    <td className="px-5 py-3.5 text-center sm:hidden">
                      {(() => {
                        const val = row[activeTier];
                        if (typeof val === "boolean") {
                          return val ? (
                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50">
                              <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
                            </span>
                          ) : (
                            <span className="text-[#121312]/20">—</span>
                          );
                        }
                        return <span className="text-xs font-semibold text-[#121312]">{val}</span>;
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Tech partner logos ── */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-[#121312]">Trusted by teams using tools they already love</h2>
        <p className="mt-3 text-sm text-[#121312]/55">
          Voatomy integrates with the platforms your team already uses — and our tech partners get priority native integrations.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {TECH_PARTNERS.map((p) => (
            <span
              key={p.name}
              className="inline-flex items-center rounded-xl border border-[#121312]/8 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm"
              style={{ color: p.color }}
            >
              {p.name}
            </span>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-[#F7F7F5] py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-12 text-center text-2xl font-bold text-[#121312]">How it works</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div key={step.n} className="rounded-2xl border border-[#121312]/8 bg-white p-6 shadow-sm">
                <span className="text-3xl font-black text-[#F05A28]/20">{step.n}</span>
                <h3 className="mt-2 font-bold text-[#121312]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#121312]/60">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="rounded-2xl border border-[#F05A28]/20 bg-[#FFF4EE] p-10">
          <div className="mb-4 flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[#F05A28] text-[#F05A28]" />
            ))}
          </div>
          <blockquote className="text-lg font-medium leading-relaxed text-[#121312]">
            &ldquo;We closed 4 enterprise accounts in the first quarter of our agency partnership — the co-sell support and co-branded materials made the difference.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F05A28] text-sm font-bold text-white">
              SR
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-[#121312]">Sofia Reyes</p>
              <p className="text-xs text-[#121312]/50">CEO, Meridian Digital — Agency Partner</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#F7F7F5] py-20">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-10 text-center text-2xl font-bold text-[#121312]">Frequently asked questions</h2>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="rounded-2xl border border-[#121312]/8 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-[#121312]">{item.q}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 shrink-0 text-[#121312]/35 transition-transform",
                      openFaq === i && "rotate-90",
                    )}
                  />
                </button>
                {openFaq === i && (
                  <div className="border-t border-[#121312]/8 px-6 pb-5 pt-4">
                    <p className="text-sm leading-relaxed text-[#121312]/65">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply CTA ── */}
      <section id="apply" className="mx-auto max-w-5xl px-6 py-24">
        <div className="overflow-hidden rounded-3xl bg-[#121312] px-10 py-16 text-center">
          {/* Decorative dots */}
          <div className="pointer-events-none absolute inset-0 opacity-10">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-white"
                style={{ top: `${(i * 17 + 8) % 90}%`, left: `${(i * 23 + 5) % 90}%` }}
              />
            ))}
          </div>
          <div className="relative">
            <Shield className="mx-auto mb-4 h-8 w-8 text-[#F05A28]" />
            <h2 className="text-3xl font-bold text-white">Ready to partner with Voatomy?</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/55">
              Applications are reviewed within 5 business days. We work with partners across 30+ countries and all major verticals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?type=partner"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F05A28] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#D94E20] transition-colors"
              >
                Apply now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <LifeBuoy className="h-4 w-4" />
                Talk to partnerships team
              </Link>
            </div>
            <p className="mt-6 text-xs text-white/30">No joining fee · Cancel anytime · 30+ countries</p>
          </div>
        </div>
      </section>
    </div>
  );
}
