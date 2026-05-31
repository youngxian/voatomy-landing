"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Network, BarChart2, Bell, Layers } from "lucide-react";
import { ProductDemoShell } from "@/components/marketing/product-demo-shell";

const ORG_HEALTH = [
  { label: "Sprint velocity",     score: 87, delta: "+4%",  color: "#22c55e" },
  { label: "Incident MTTR",       score: 72, delta: "-8%",  color: "#f59e0b" },
  { label: "Design-code drift",   score: 94, delta: "+2%",  color: "#22c55e" },
  { label: "Tech debt index",     score: 58, delta: "-3%",  color: "#EF4444" },
  { label: "Revenue signal lag",  score: 81, delta: "+6%",  color: "#22c55e" },
];

const PRODUCTS_FEED = [
  { product: "ATLAS",   color: "#f16e2c", event: "Sprint 24 generated — 91% confidence score across 18 items." },
  { product: "SIGNAL",  color: "#EF4444", event: "INC-2847 resolved in 22 min — $1.4M ARR protected." },
  { product: "LOOP",    color: "#8B5CF6", event: "3 new churn-risk signals mapped to Q3 backlog." },
  { product: "DRIFT",   color: "#EC4899", event: "4 component drift issues auto-assigned to design system team." },
  { product: "PHANTOM", color: "#6366F1", event: "payment-processor.ts flagged — debt score crossed 90." },
];

function OrgHealthTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[#121312]">Org health overview</p>
          <p className="text-xs text-[#121312]/45">All products · real-time · 5 dimensions</p>
        </div>
        <span className="rounded-full bg-[#0EA5E9]/10 px-2.5 py-1 text-[11px] font-bold text-[#0EA5E9]">78 / 100</span>
      </div>

      <div className="space-y-2.5">
        {ORG_HEALTH.map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
            className="flex items-center gap-3">
            <p className="w-36 text-xs font-medium text-[#121312]/60 shrink-0">{item.label}</p>
            <div className="flex-1 h-2.5 rounded-full bg-[#121312]/8 overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ backgroundColor: item.color }}
                initial={{ width: 0 }} animate={{ width: `${item.score}%` }} transition={{ duration: 0.6, delay: i * 0.07 }} />
            </div>
            <span className="w-8 text-right text-sm font-bold" style={{ color: item.color }}>{item.score}</span>
            <span className="w-10 text-right text-[11px] font-semibold" style={{ color: item.color }}>{item.delta}</span>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-[#0EA5E9]/20 bg-[#0EA5E9]/5 p-3">
        <p className="text-[10px] font-bold text-[#0EA5E9]">Nexus insight</p>
        <p className="mt-0.5 text-xs text-[#121312]/60">Tech debt index is your weakest signal. PHANTOM recommends a dedicated refactor sprint in Q3 to lift it above 70.</p>
      </div>
    </div>
  );
}

function ProductFeedTab() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold text-[#121312]">Cross-product activity feed</p>
        <span className="flex items-center gap-1 text-[11px] text-[#121312]/40">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Live
        </span>
      </div>
      <div className="space-y-2.5">
        {PRODUCTS_FEED.map((item, i) => (
          <motion.div key={`${item.product}-${i}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="flex items-start gap-3 rounded-xl border border-[#121312]/8 px-3 py-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white" style={{ backgroundColor: item.color }}>
              {item.product[0]}
            </span>
            <div>
              <p className="text-[11px] font-bold" style={{ color: item.color }}>{item.product}</p>
              <p className="text-xs text-[#121312]/60">{item.event}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { key: "health", label: "Org Health",   content: <OrgHealthTab /> },
  { key: "feed",   label: "Product Feed", content: <ProductFeedTab /> },
];

const FEATURES = [
  { icon: Network,   title: "Cross-product intelligence", body: "Nexus aggregates signals from ATLAS, LOOP, SIGNAL, DRIFT, and PHANTOM into a single org-level view." },
  { icon: BarChart2, title: "Org health scoring",          body: "Five health dimensions — velocity, incidents, drift, debt, and revenue lag — in one executive dashboard." },
  { icon: Bell,      title: "Leadership briefings",        body: "Nexus auto-generates weekly executive briefings from cross-product data. No manual slide-building." },
  { icon: Layers,    title: "Unified activity feed",       body: "One live feed of everything happening across every product. Nothing falls through the cracks." },
];

const STEPS = [
  { num: "01", title: "Connect all tools",    body: "Nexus ingests from every connected product and integration across your org." },
  { num: "02", title: "Choose products",      body: "Select which Voatomy products feed into the Nexus graph. Pick all or start with two." },
  { num: "03", title: "Configure briefings",  body: "Set your executive briefing cadence — daily digest, weekly summary, or real-time alerts." },
  { num: "04", title: "Lead with data",       body: "Engineering, product, and leadership share one source of truth for org performance." },
];

export default function NexusDemoPageContent() {
  return (
    <ProductDemoShell
      productKey="nexus"
      productName="NEXUS"
      color="#0EA5E9"
      tagline="Org Nerve Center"
      headline={<>See the <span style={{ color: "#0EA5E9" }}>Org Nerve Center</span> in action</>}
      subhead="Cross-product intelligence for engineering leadership — one health score, five dimensions, zero blind spots."
      tabs={TABS}
      features={FEATURES}
      steps={STEPS}
    />
  );
}
