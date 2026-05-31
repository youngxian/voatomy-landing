"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildProductCheckoutUrl, type PurchasableProductKey } from "@/lib/product-purchase";
import { cn } from "@/lib/utils";

export interface DemoTab {
  key: string;
  label: string;
  content: React.ReactNode;
}

export interface ProductDemoShellProps {
  productKey: PurchasableProductKey;
  productName: string;
  color: string;
  tagline: string;
  headline: React.ReactNode;
  subhead: string;
  tabs: DemoTab[];
  features: { icon: React.ElementType; title: string; body: string }[];
  steps: { num: string; title: string; body: string }[];
  trustItems?: string[];
  checkoutPlan?: "pro" | "business";
}

export function ProductDemoShell({
  productKey,
  productName,
  color,
  tagline,
  headline,
  subhead,
  tabs,
  features,
  steps,
  trustItems = ["14-day free trial", "No credit card required", "SOC 2 compliant"],
  checkoutPlan = "pro",
}: ProductDemoShellProps) {
  const [activeTab, setActiveTab] = React.useState(tabs[0]?.key ?? "");
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-[72vh] overflow-hidden bg-[#0d0e10] px-4 pb-16 pt-24">
        {/* Grid bg */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }}
          aria-hidden
        />
        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 65% 50% at 50% 30%, ${color}22, transparent)` }}
          aria-hidden
        />

        <div className="relative z-[2] mx-auto max-w-[860px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
              style={{ borderColor: `${color}30`, backgroundColor: `${color}12`, color }}
            >
              {productName} · Interactive Demo
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-[540px] text-base leading-relaxed text-white/50"
          >
            {subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href={buildProductCheckoutUrl({ product: productKey, plan: checkoutPlan })}>
                Start 14-day trial <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href={`/products/${productKey}`} className="text-white/60 hover:text-white">
                Learn more
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Interactive Mock UI ── */}
      <section className="bg-[#f4f5f7] px-4 py-16">
        <div className="mx-auto max-w-[900px]">
          <div className="overflow-hidden rounded-2xl border border-[#121312]/10 bg-white shadow-xl shadow-[#121312]/6">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-[#121312]/8 bg-[#f9f9fa] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/60" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/60" />
              <span className="h-3 w-3 rounded-full bg-green-400/60" />
              <span className="ml-3 flex-1 rounded-md bg-[#121312]/5 px-3 py-1 text-xs text-[#121312]/35">
                {productKey}.voatomy.com
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{ backgroundColor: `${color}18`, color }}
              >
                Demo
              </span>
            </div>

            {/* Tab bar */}
            <div className="flex gap-0 border-b border-[#121312]/8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "shrink-0 px-5 py-3 text-xs font-semibold transition-all border-b-2 whitespace-nowrap",
                    activeTab === tab.key
                      ? "border-b-[color:var(--tab-color)] text-[color:var(--tab-color)] bg-[color:var(--tab-bg)]"
                      : "border-transparent text-[#121312]/40 hover:text-[#121312]/60",
                  )}
                  style={
                    { "--tab-color": color, "--tab-bg": `${color}06` } as React.CSSProperties
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="min-h-[340px] p-6"
              >
                {tabs.find((t) => t.key === activeTab)?.content}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="mt-3 text-center text-xs text-[#121312]/35">
            Interactive demo — sample data only &middot; nothing is saved
          </p>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: `${color}cc` }}>
              Key features
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#121312]">
              What makes {productName} different
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4 rounded-2xl border border-[#121312]/8 p-5"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </span>
                  <div>
                    <p className="font-semibold text-[#121312]">{f.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#121312]/55">{f.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-[#f4f5f7] px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-[860px]">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: `${color}cc` }}>
              How it works
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#121312]">
              From setup to results
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {s.num}
                </div>
                <p className="font-semibold text-[#121312]">{s.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#121312]/55">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0d0e10] px-4 py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(ellipse 50% 60% at 50% 50%, ${color}14, transparent)` }}
          aria-hidden
        />
        <div className="relative z-[1] mx-auto max-w-[600px] text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f16e2c]/25 bg-[#f16e2c]/10 px-3 py-1.5 text-xs font-semibold text-[#f16e2c]">
            <Sparkles className="h-3.5 w-3.5" />
            Start in under 5 minutes
          </span>
          <h2 className="mx-auto mt-5 max-w-[520px] text-3xl font-bold tracking-tight text-white">
            Ready to try {productName} with your real data?
          </h2>
          <p className="mx-auto mt-4 max-w-[420px] text-base text-white/45">
            Connect your tools and generate your first {tagline.toLowerCase()} in minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="primary" size="lg" className="gap-2" asChild>
              <Link href={buildProductCheckoutUrl({ product: productKey, plan: checkoutPlan })}>
                Start 14-day trial <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/demo" className="text-white/50 hover:text-white">Book live demo</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm text-white/35">
            {trustItems.map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500/70" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
