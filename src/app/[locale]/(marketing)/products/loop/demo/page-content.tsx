"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageSquare, DollarSign, TrendingUp, Users } from "lucide-react";
import { ProductDemoShell } from "@/components/marketing/product-demo-shell";

/* ── Signal feed mock ── */
const SIGNALS = [
  { id: 1, account: "Acme Corp", arr: "$128k", type: "churn-risk", body: "3 support tickets in 7 days referencing missing API rate-limit controls.", feature: "Rate-limit controls", weight: 92 },
  { id: 2, account: "Stripe (deal)", arr: "$220k", type: "deal-blocker", body: "Deal stalled — champion asked about multi-region data residency support.", feature: "Data residency", weight: 88 },
  { id: 3, account: "Notion", arr: "$84k", type: "expansion", body: "Power user segment tripled in 30 days. Requesting bulk export API.", feature: "Bulk export API", weight: 71 },
  { id: 4, account: "Figma", arr: "$195k", type: "churn-risk", body: "NPS dropped 24 pts. Engineering bottleneck cited in exit interview notes.", feature: "Performance improvements", weight: 85 },
];

const TYPE_META: Record<string, { label: string; color: string }> = {
  "churn-risk":   { label: "Churn risk",    color: "#EF4444" },
  "deal-blocker": { label: "Deal blocker",  color: "#F97316" },
  "expansion":    { label: "Expansion",     color: "#22c55e" },
};

function SignalFeedTab() {
  const [active, setActive] = React.useState<number | null>(1);
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="space-y-2 lg:col-span-2">
        {SIGNALS.map((s) => {
          const meta = TYPE_META[s.type];
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={`flex w-full flex-col gap-1 rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${active === s.id ? "border-[#8B5CF6]/30 bg-[#8B5CF6]/6" : "border-[#121312]/8 hover:border-[#8B5CF6]/15"}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-[#121312]">{s.account}</p>
                <span className="text-[10px] font-semibold" style={{ color: meta.color }}>{meta.label}</span>
              </div>
              <p className="line-clamp-1 text-[11px] text-[#121312]/50">{s.body}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-[#121312]/8 overflow-hidden">
                  <div className="h-full rounded-full bg-[#8B5CF6]" style={{ width: `${s.weight}%` }} />
                </div>
                <span className="text-[10px] font-bold text-[#8B5CF6]">{s.weight}</span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="lg:col-span-3">
        {active !== null && (() => {
          const s = SIGNALS.find((x) => x.id === active)!;
          const meta = TYPE_META[s.type];
          return (
            <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-[#121312]/10 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold text-[#121312]">{s.account}</span>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: `${meta.color}15`, color: meta.color }}>{meta.label}</span>
              </div>
              <p className="text-sm text-[#121312]/60">{s.body}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-[#f4f5f7] p-2.5">
                  <p className="text-[10px] font-semibold text-[#121312]/40">ARR at risk / at play</p>
                  <p className="mt-0.5 text-base font-bold text-[#121312]">{s.arr}</p>
                </div>
                <div className="rounded-lg bg-[#f4f5f7] p-2.5">
                  <p className="text-[10px] font-semibold text-[#121312]/40">Revenue weight</p>
                  <p className="mt-0.5 text-base font-bold text-[#8B5CF6]">{s.weight} / 100</p>
                </div>
              </div>
              <div className="mt-3 rounded-lg border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 p-3">
                <p className="text-[10px] font-bold text-[#8B5CF6]">Loop recommendation</p>
                <p className="mt-0.5 text-xs text-[#121312]/60">Prioritise <strong>"{s.feature}"</strong> in next sprint. Impacts {s.arr} ARR.</p>
              </div>
            </motion.div>
          );
        })()}
      </div>
    </div>
  );
}

function RevenueBacklogTab() {
  const items = [
    { title: "Rate-limit controls", pts: 5, arr: "$128k", score: 92 },
    { title: "Data residency (EU)", pts: 13, arr: "$220k", score: 88 },
    { title: "Performance improvements", pts: 8, arr: "$195k", score: 85 },
    { title: "Bulk export API", pts: 3, arr: "$84k", score: 71 },
  ];
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold text-[#121312]">Revenue-weighted backlog</p>
        <span className="text-xs text-[#121312]/40">Sorted by Loop score</span>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <motion.div key={item.title} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
            className="flex items-center gap-3 rounded-xl border border-[#121312]/8 px-4 py-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6]/15 text-xs font-bold text-[#8B5CF6]">{i + 1}</span>
            <p className="flex-1 text-sm font-medium text-[#121312]">{item.title}</p>
            <span className="text-xs text-[#121312]/40">{item.pts}pts</span>
            <span className="text-xs font-semibold text-[#121312]/60">{item.arr}</span>
            <div className="flex w-16 items-center gap-1">
              <div className="flex-1 h-1.5 rounded-full bg-[#121312]/8 overflow-hidden">
                <div className="h-full rounded-full bg-[#8B5CF6]" style={{ width: `${item.score}%` }} />
              </div>
              <span className="text-[10px] font-bold text-[#8B5CF6]">{item.score}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { key: "signals", label: "Signal Feed", content: <SignalFeedTab /> },
  { key: "backlog", label: "Revenue Backlog", content: <RevenueBacklogTab /> },
];

const FEATURES = [
  { icon: MessageSquare, title: "Revenue-weighted backlogs", body: "Automatically rank backlog items by the revenue they protect or unlock." },
  { icon: DollarSign, title: "Churn risk scoring", body: "LOOP surfaces feature requests tied to at-risk accounts so engineering can act before customers leave." },
  { icon: TrendingUp, title: "Deal velocity mapping", body: "Connect CRM stages to product gaps — see which features are blocking pipeline directly." },
  { icon: Users, title: "Cross-team signal digest", body: "Sales, CS, and engineering share one view of what customers are asking for." },
];

const STEPS = [
  { num: "01", title: "Connect CRM & support", body: "Link Salesforce, HubSpot, Zendesk, or Intercom. LOOP ingests signal automatically." },
  { num: "02", title: "Configure signals", body: "Choose which events matter — churn risk, deal blockers, expansion opportunities." },
  { num: "03", title: "View revenue backlog", body: "Your backlog is automatically re-ranked by ARR impact every 24 hours." },
  { num: "04", title: "Ship & close", body: "Engineering ships the right feature. Sales closes the deal. LOOP tracks the outcome." },
];

export default function LoopDemoPageContent() {
  return (
    <ProductDemoShell
      productKey="loop"
      productName="LOOP"
      color="#8B5CF6"
      tagline="Revenue Feedback Engine"
      headline={<>See the <span style={{ color: "#8B5CF6" }}>Revenue Feedback Engine</span> in action</>}
      subhead="Close the loop between customer demand and engineering delivery — with real ARR impact scores on every backlog item."
      tabs={TABS}
      features={FEATURES}
      steps={STEPS}
    />
  );
}
