"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { PRODUCTS, PRODUCT_DETAILS, JOURNEY_STEPS } from "@/lib/constants";
import { SectionBackgroundDecor } from "@/components/marketing/section-background-decor";
import { WireflowRail } from "@/components/marketing/wireflow-rail";

const PRODUCT_TABS = PRODUCTS.filter((p) => p.key !== "nexus");

export function PlatformSection() {
  const [activeTab, setActiveTab] = React.useState(0);
  const activeProduct = PRODUCT_TABS[activeTab];
  const details =
    PRODUCT_DETAILS[activeProduct.key as keyof typeof PRODUCT_DETAILS];

  const headerAnim = useScrollAnimation();
  const timelineAnim = useScrollAnimation();
  const tabsAnim = useScrollAnimation();
  const flowAnim = useScrollAnimation();
  const journeyAnim = useScrollAnimation();

  return (
    <section className="relative overflow-hidden bg-teal dark-section px-4 py-16 sm:py-24 transition-colors duration-300">
      <SectionBackgroundDecor tone="dark" />
      <div className="relative z-[1] mx-auto max-w-container">
        {/* Section header */}
        <div
          ref={headerAnim.ref}
          className={cn(
            "text-center transition-all duration-700",
            headerAnim.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8",
          )}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-accent-lime/70">
            The Platform
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-theme sm:text-heading-1">
            ATLAS is just the beginning.
          </h2>
          <p className="mx-auto mt-3 max-w-[640px] text-body-lg text-theme-m">
            Voatomy is building the operating system for product teams. ATLAS is
            your entry point into a platform that connects every team in your
            company.
          </p>
        </div>

        <WireflowRail
          className="mt-6 max-w-2xl opacity-90"
          dark
          label="Platform product signal path"
        />

        {/* 9A: Product Evolution Timeline */}
        <div
          ref={timelineAnim.ref}
          className={cn(
            "mt-12 transition-all duration-700 delay-100",
            timelineAnim.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8",
          )}
        >
          <h3 className="mb-8 text-center text-sm font-semibold text-theme-m">
            Your journey from sprint planning to organizational intelligence
          </h3>

          <div className="relative mx-auto max-w-4xl">
            {/* Main horizontal line */}
            <div className="absolute left-0 right-0 top-[42px] hidden h-px bg-theme md:block" />

            {/* Main product nodes */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { product: PRODUCTS[0], time: "TODAY" },
                { product: PRODUCTS[1], time: "+6 MONTHS" },
                { product: PRODUCTS[2], time: "+12 MONTHS" },
                { product: PRODUCTS[5], time: "+18 MONTHS" },
              ].map(({ product, time }, i) => (
                <div
                  key={product.key}
                  className={cn(
                    "flex flex-col items-center text-center transition-all duration-500",
                    timelineAnim.isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6",
                  )}
                  style={{
                    transitionDelay: timelineAnim.isVisible
                      ? `${i * 120}ms`
                      : "0ms",
                  }}
                >
                  <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-theme-f">
                    {time}
                  </span>
                  <div
                    className={cn(
                      "grid h-14 w-14 place-items-center rounded-2xl border text-2xl transition-all",
                      i === 0
                        ? "border-accent-lime/40 bg-accent-lime/[0.15] shadow-[0_0_20px_rgba(226,251,108,0.15)]"
                        : "border-theme bg-theme-subtle",
                    )}
                  >
                    {product.icon}
                  </div>
                  <span className="mt-2 text-sm font-semibold text-theme">
                    {product.name}
                  </span>
                  <span className="text-xs text-theme-m">
                    {product.tagline}
                  </span>
                </div>
              ))}
            </div>

            {/* Independent products */}
            <div className="mt-8 flex items-center justify-center gap-8">
              <div className="h-px flex-1 bg-theme" />
              {PRODUCTS.filter(
                (p) => p.key === "drift" || p.key === "phantom",
              ).map((product) => (
                <div key={product.key} className="flex items-center gap-2">
                  <span className="text-lg">{product.icon}</span>
                  <div>
                    <span className="text-xs font-semibold text-theme-s">
                      {product.name}
                    </span>
                    <span className="ml-1 text-[10px] text-theme-f">
                      (Independent)
                    </span>
                  </div>
                </div>
              ))}
              <div className="h-px flex-1 bg-theme" />
            </div>

            {/* Legend */}
            <div className="mt-4 flex justify-center gap-6 text-[11px] text-theme-f">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />{" "}
                Available now
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />{" "}
                Coming soon
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />{" "}
                Future
              </span>
            </div>
          </div>
        </div>

        {/* 9B: Product Detail Cards (Tabbed) */}
        <div
          ref={tabsAnim.ref}
          className={cn(
            "mt-20 transition-all duration-700",
            tabsAnim.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8",
          )}
        >
          <h3 className="mb-6 text-center text-sm font-semibold text-theme-m">
            Click a product to explore
          </h3>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {PRODUCT_TABS.map((product, i) => (
              <button
                key={product.key}
                type="button"
                onClick={() => setActiveTab(i)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeTab === i
                    ? "bg-theme-subtle text-theme border-b-2 border-accent-lime"
                    : "text-theme-m hover:bg-theme-subtle hover:text-theme-s",
                )}
              >
                <span>{product.icon}</span>
                {product.name}
              </button>
            ))}
          </div>

          {/* Active product card */}
          <div className="mt-6 rounded-2xl border border-theme bg-theme-card p-6 sm:p-8 transition-colors duration-300">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{activeProduct.icon}</span>
              <div>
                <h4 className="text-xl font-semibold text-theme">
                  {activeProduct.name} — {activeProduct.tagline}
                </h4>
                <p className="mt-1 text-sm text-theme-m">
                  {activeProduct.description}
                </p>
              </div>
            </div>

            {details && (
              <>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {details.sections.map((section, i) => (
                    <div
                      key={section.title}
                      className={cn(
                        "rounded-2xl border border-theme bg-theme-subtle p-4 transition-all duration-500",
                        tabsAnim.isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4",
                      )}
                      style={{
                        transitionDelay: tabsAnim.isVisible
                          ? `${i * 100}ms`
                          : "0ms",
                      }}
                    >
                      <h5 className="text-sm font-semibold text-theme-s">
                        {section.title}
                      </h5>
                      <p className="mt-1 text-xs text-theme-m">
                        {section.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-6 text-xs text-theme-m">
                  <div>
                    <span className="font-semibold text-theme-s">
                      Who it&apos;s for:
                    </span>{" "}
                    {details.users}
                  </div>
                  <div>
                    <span className="font-semibold text-theme-s">
                      Integrations:
                    </span>{" "}
                    {details.integrations}
                  </div>
                  <div>
                    <span className="font-semibold text-theme-s">
                      Pricing:
                    </span>{" "}
                    {details.pricing}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 9C: AI Workflow Wireframe */}
        <div
          ref={flowAnim.ref}
          className={cn(
            "mt-20 transition-all duration-700",
            flowAnim.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center mb-10">
            <span className="enterprise-badge mb-3 inline-flex">AI-Powered Pipeline</span>
            <h3 className="text-heading-2 text-theme mt-3">
              The complete data flow
            </h3>
            <p className="mt-2 text-sm text-theme-m max-w-xl mx-auto">
              See how six AI products work together — from signal capture to organizational intelligence.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            {/* Wireframe illustration container */}
            <div className="relative rounded-2xl enterprise-card overflow-hidden p-1">
              {/* Animated top shine */}
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

              <div className="rounded-xl bg-theme-card p-6 sm:p-8 relative overflow-hidden">
                {/* Grid background */}
                <div className="absolute inset-0 fine-grid opacity-50" />
                {/* Noise texture */}
                <div className="absolute inset-0 noise-overlay" />

                {/* Animated data pulse line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden z-[1] hidden md:block">
                  <div
                    className="h-20 w-full"
                    style={{
                      background: "linear-gradient(180deg, transparent, rgba(226,251,108,0.3), transparent)",
                      animation: "scan-line 4s linear infinite",
                    }}
                  />
                </div>

                <div className="relative z-[2] space-y-3">

                  {/* STAGE 1: Input Layer */}
                  <div className="text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-theme-f">Stage 1 — Signal Capture</span>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { icon: "🎙️", label: "Sales Calls", sub: "Gong / Chorus", color: "#6366f1" },
                      { icon: "🎫", label: "Support Tickets", sub: "Zendesk / Intercom", color: "#6366f1" },
                      { icon: "📊", label: "Usage Data", sub: "Amplitude / Mixpanel", color: "#6366f1" },
                      { icon: "💬", label: "NPS & Surveys", sub: "Typeform / Delighted", color: "#6366f1" },
                    ].map((src) => (
                      <div key={src.label} className="group rounded-xl border border-theme bg-theme-subtle/50 p-3 text-center transition-all hover:border-theme-h hover:bg-theme-subtle">
                        <span className="text-lg">{src.icon}</span>
                        <div className="text-[11px] font-semibold text-theme mt-1">{src.label}</div>
                        <div className="text-[9px] text-theme-f">{src.sub}</div>
                      </div>
                    ))}
                  </div>

                  <WireframeConnector label="Raw signals flow in" color="#6366f1" />

                  {/* STAGE 2: LOOP — Intelligence */}
                  <div className="text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-theme-f">Stage 2 — Revenue Intelligence</span>
                  </div>

                  <WireframeProductNode
                    icon="🔄"
                    name="LOOP"
                    tagline="Revenue Feedback Engine"
                    color="#6366f1"
                    features={["AI signal extraction", "Revenue weighting ($)", "Demand clustering", "Priority scoring"]}
                    output="Prioritized feature backlog with $ attribution"
                    isVisible={flowAnim.isVisible}
                    delay={200}
                  />

                  <WireframeConnector label="Revenue-weighted priorities" color="#E2FB6C" />

                  {/* STAGE 3: Teams + ATLAS */}
                  <div className="text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-theme-f">Stage 3 — Planning & Execution</span>
                  </div>

                  <div className="grid md:grid-cols-[1fr_auto_1fr] gap-3 items-start">
                    {/* Left: Teams */}
                    <div className="space-y-2">
                      {[
                        { icon: "📋", name: "Product", desc: "Roadmap decisions", color: "#f97316" },
                        { icon: "👨‍💻", name: "Engineering", desc: "Technical execution", color: "#E2FB6C" },
                        { icon: "🎨", name: "Design", desc: "UX & visual design", color: "#8b5cf6" },
                      ].map((team) => (
                        <div key={team.name} className="flex items-center gap-3 rounded-xl border border-theme bg-theme-subtle/50 px-4 py-2.5 transition-all hover:border-theme-h">
                          <span className="text-base">{team.icon}</span>
                          <div>
                            <div className="text-xs font-semibold text-theme">{team.name}</div>
                            <div className="text-[10px] text-theme-m">{team.desc}</div>
                          </div>
                          <div className="ml-auto h-1.5 w-1.5 rounded-full" style={{ backgroundColor: team.color }} />
                        </div>
                      ))}
                    </div>

                    {/* Center: Arrow */}
                    <div className="hidden md:flex flex-col items-center justify-center gap-1 pt-4">
                      <div className="h-px w-8 bg-accent-lime/30" />
                      <span className="text-[9px] text-accent-lime/60 font-medium">converge</span>
                      <div className="h-px w-8 bg-accent-lime/30" />
                    </div>

                    {/* Right: ATLAS */}
                    <WireframeProductNode
                      icon="🎯"
                      name="ATLAS"
                      tagline="AI Sprint Intelligence"
                      color="#f16e2c"
                      features={["6-signal analysis", "Confidence scoring", "Capacity matching", "Sprint generation"]}
                      output="AI-generated sprint plan (87% accuracy)"
                      isVisible={flowAnim.isVisible}
                      delay={400}
                      highlight
                    />
                  </div>

                  <WireframeConnector label="Feature shipped" color="#E2FB6C" pulse />

                  {/* STAGE 4: Ship + Distribution */}
                  <div className="text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-theme-f">Stage 4 — Auto-Distribution</span>
                  </div>

                  <div className="rounded-xl border border-accent-lime/20 bg-accent-lime/[0.04] p-4 text-center">
                    <span className="text-2xl">🚀</span>
                    <div className="text-sm font-semibold text-theme mt-1">Feature Released</div>
                    <div className="text-[10px] text-theme-m">LOOP auto-generates collateral for every revenue team</div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {[
                        { icon: "💰", name: "Sales", action: "Deal-specific briefs + alerts" },
                        { icon: "📢", name: "Marketing", action: "Changelog + campaign copy" },
                        { icon: "🤝", name: "CS", action: "Talking points + upgrade paths" },
                      ].map((team) => (
                        <div key={team.name} className="rounded-lg border border-theme bg-theme-card p-2 text-center transition-all hover:border-theme-h">
                          <span className="text-sm">{team.icon}</span>
                          <div className="text-[10px] font-semibold text-theme">{team.name}</div>
                          <div className="text-[8px] text-theme-f leading-tight mt-0.5">{team.action}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <WireframeConnector label="Monitoring begins" color="#ef4444" />

                  {/* STAGE 5: SIGNAL */}
                  <div className="text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-theme-f">Stage 5 — Incident Intelligence</span>
                  </div>

                  <WireframeProductNode
                    icon="🚨"
                    name="SIGNAL"
                    tagline="Revenue Impact Intelligence"
                    color="#ef4444"
                    features={["Real-time alerting", "Revenue $/min calc", "Smart routing", "Stakeholder briefs"]}
                    output="If incident → auto-assess business impact & notify"
                    isVisible={flowAnim.isVisible}
                    delay={600}
                  />

                  {/* STAGE 6: Continuous Layer */}
                  <div className="mt-4 premium-divider" />
                  <div className="text-center pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-theme-f">Continuous — Running in background across all stages</span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3 mt-2">
                    <WireframeBgProduct icon="🎨" name="DRIFT" desc="Design ↔ Code sync" color="#8B5CF6" detail="Token monitoring • CI gating • Auto-fix PRs" />
                    <WireframeBgProduct icon="👻" name="PHANTOM" desc="Tech Debt → $" color="#22D3EE" detail="6-dim scan • Dollar translation • ROI queue" />
                    <WireframeBgProduct icon="🧠" name="NEXUS" desc="Org Intelligence" color="#10B981" detail="Cross-product health • Executive briefs" />
                  </div>

                  {/* Data flow arrows: loop back */}
                  <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-theme-f">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent-lime/30" />
                    <span>Data feeds back into every stage — the system gets smarter with every cycle</span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent-lime/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 9D: Start Small, Scale Big */}
        <div
          ref={journeyAnim.ref}
          className={cn(
            "mt-20 transition-all duration-700",
            journeyAnim.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8",
          )}
        >
          <h3 className="mb-8 text-center text-sm font-semibold text-theme-m">
            Start with one team. Scale to your entire company.
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {JOURNEY_STEPS.map((step, i) => (
              <div
                key={step.step}
                className={cn(
                  "flex gap-4 rounded-2xl border border-theme bg-theme-card p-5 transition-all duration-500",
                  journeyAnim.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6",
                )}
                style={{
                  transitionDelay: journeyAnim.isVisible
                    ? `${i * 100}ms`
                    : "0ms",
                }}
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-lime/20 text-sm font-bold text-accent-lime">
                  {step.step}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-theme">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-sm text-theme-m">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Expansion bar */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-accent-lime/[0.06] via-indigo-500/[0.06] to-purple-500/[0.06] p-5 transition-colors duration-300">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-theme-f">
                Step 5: Expand
              </span>
              <div className="mt-3 flex items-center justify-center gap-2 text-sm">
                {["ATLAS", "LOOP", "SIGNAL", "NEXUS"].map((name, i) => (
                  <React.Fragment key={name}>
                    {i > 0 && <span className="text-theme-f">&rarr;</span>}
                    <span className="font-semibold text-theme-s">{name}</span>
                  </React.Fragment>
                ))}
              </div>
              <div className="mt-1 flex items-center justify-center gap-6 text-xs text-theme-f">
                <span>1 team</span>
                <span>3 teams</span>
                <span>All teams</span>
                <span>Entire company</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="#hero">Start with ATLAS &rarr;</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Wireframe Helper Components ---

function WireframeProductNode({
  icon,
  name,
  tagline,
  color,
  features,
  output,
  isVisible,
  delay = 0,
  highlight,
}: {
  icon: string;
  name: string;
  tagline: string;
  color: string;
  features: string[];
  output: string;
  isVisible: boolean;
  delay?: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-all duration-700",
        highlight ? "enterprise-card" : "border-theme bg-theme-subtle/30",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
      style={{
        borderColor: highlight ? undefined : `${color}20`,
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="h-9 w-9 rounded-lg flex items-center justify-center text-lg"
          style={{ backgroundColor: `${color}15` }}
        >
          {icon}
        </div>
        <div>
          <div className="text-sm font-bold text-theme">{name}</div>
          <div className="text-[10px] text-theme-m">{tagline}</div>
        </div>
        <div
          className="ml-auto h-2 w-2 rounded-full animate-glow-pulse"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* AI Feature pipeline */}
      <div className="flex items-center gap-1.5 mb-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {features.map((f, i) => (
          <React.Fragment key={f}>
            {i > 0 && (
              <svg width="12" height="8" viewBox="0 0 12 8" className="shrink-0 text-theme-f/40">
                <path d="M0 4h9M7 1l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            )}
            <span
              className="shrink-0 rounded-md px-2 py-1 text-[10px] font-medium text-theme-s"
              style={{ backgroundColor: `${color}08`, border: `1px solid ${color}15` }}
            >
              {f}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Output */}
      <div className="flex items-center gap-2 rounded-lg bg-theme-subtle px-3 py-2">
        <svg width="14" height="14" viewBox="0 0 14 14" className="shrink-0">
          <path d="M3 7h5M6 4l3 3-3 3" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px] font-medium" style={{ color }}>Output:</span>
        <span className="text-[10px] text-theme-s">{output}</span>
      </div>
    </div>
  );
}

function WireframeConnector({ label, color, pulse }: { label: string; color: string; pulse?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1 py-1">
      <div className="relative h-5 w-px" style={{ backgroundColor: `${color}30` }}>
        {pulse && (
          <div
            className="absolute -left-1 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full animate-glow-pulse"
            style={{ backgroundColor: color, opacity: 0.6 }}
          />
        )}
      </div>
      <span className="text-[9px] font-medium px-2 py-0.5 rounded-full" style={{ color, backgroundColor: `${color}10` }}>
        {label}
      </span>
      <div className="h-5 w-px" style={{ backgroundColor: `${color}30` }} />
    </div>
  );
}

function WireframeBgProduct({ icon, name, desc, color, detail }: { icon: string; name: string; desc: string; color: string; detail: string }) {
  return (
    <div className="group rounded-xl border border-theme bg-theme-subtle/30 p-3 transition-all hover:border-theme-h relative overflow-hidden">
      <div className="relative z-[1]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-base">{icon}</span>
          <span className="text-xs font-bold text-theme">{name}</span>
          <span className="text-[10px] text-theme-m">— {desc}</span>
          <div
            className="ml-auto h-1.5 w-1.5 rounded-full animate-glow-pulse"
            style={{ backgroundColor: color }}
          />
        </div>
        <div className="text-[10px] text-theme-f leading-relaxed">{detail}</div>
        {/* Activity bars */}
        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all"
              style={{
                backgroundColor: color,
                opacity: 0.08 + Math.random() * 0.2,
              }}
            />
          ))}
        </div>
      </div>
      <div
        className="pointer-events-none absolute -bottom-6 -right-6 h-16 w-16 rounded-full opacity-0 group-hover:opacity-[0.06] transition-opacity blur-2xl"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
