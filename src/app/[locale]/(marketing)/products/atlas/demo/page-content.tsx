"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GitBranch, Brain, Target, TrendingUp } from "lucide-react";
import { ProductDemoShell } from "@/components/marketing/product-demo-shell";

/* ── Sample sprint data ── */
const SPRINT_ITEMS = [
  { id: "ATL-42", title: "Migrate auth to OAuth 2.0", complexity: 8, confidence: 91, estimate: "3d", assignee: "AJ", status: "ready", risk: "low" },
  { id: "ATL-38", title: "Refactor payment retry logic", complexity: 13, confidence: 74, estimate: "5d", assignee: "MC", status: "ready", risk: "medium" },
  { id: "ATL-55", title: "Add Slack notification webhook", complexity: 3, confidence: 96, estimate: "1d", assignee: "SL", status: "ready", risk: "low" },
  { id: "ATL-61", title: "Fix dashboard render on mobile", complexity: 5, confidence: 88, estimate: "2d", assignee: "AJ", status: "flagged", risk: "low" },
  { id: "ATL-47", title: "Implement GraphQL subscriptions", complexity: 21, confidence: 58, estimate: "8d", assignee: "—", status: "blocked", risk: "high" },
] as const;

function ConfidenceBadge({ val }: { val: number }) {
  const color = val >= 85 ? "#22c55e" : val >= 70 ? "#f59e0b" : "#ef4444";
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: `${color}15`, color }}>
      {val}%
    </span>
  );
}

function SprintPlanTab() {
  const [selected, setSelected] = React.useState<string[]>(["ATL-42", "ATL-38", "ATL-55", "ATL-61"]);
  const totalPoints = SPRINT_ITEMS.filter((i) => selected.includes(i.id)).reduce((s, i) => s + i.complexity, 0);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[#121312]">Sprint 24 · AI-generated plan</p>
          <p className="text-xs text-[#121312]/45">Based on 3 repos, 2 boards, team capacity 32 pts</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-[#f16e2c]/10 px-2.5 py-1.5 text-xs font-bold text-[#f16e2c]">
            {totalPoints} / 32 pts
          </span>
          <motion.div
            className="h-2 w-24 overflow-hidden rounded-full bg-[#121312]/8"
          >
            <motion.div
              className="h-full rounded-full bg-[#f16e2c]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((totalPoints / 32) * 100, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>
      </div>

      <div className="space-y-2">
        {SPRINT_ITEMS.map((item) => {
          const isIn = selected.includes(item.id);
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setSelected((prev) => isIn ? prev.filter((x) => x !== item.id) : [...prev, item.id])}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${isIn ? "border-[#f16e2c]/20 bg-[#f16e2c]/4" : "border-[#121312]/8 bg-[#121312]/2 opacity-50"}`}
            >
              <div className={`h-4 w-4 shrink-0 rounded border-2 flex items-center justify-center transition-all ${isIn ? "border-[#f16e2c] bg-[#f16e2c]" : "border-[#121312]/20"}`}>
                {isIn && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
              </div>
              <span className="w-16 shrink-0 font-mono text-[10px] text-[#121312]/35">{item.id}</span>
              <span className="flex-1 font-medium text-[#121312]">{item.title}</span>
              <ConfidenceBadge val={item.confidence} />
              <span className="w-8 shrink-0 text-xs text-[#121312]/40">{item.estimate}</span>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#121312]/8 text-[10px] font-bold text-[#121312]/50">{item.assignee}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function AIEstimationTab() {
  const [analysing, setAnalysing] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const run = () => {
    setAnalysing(true);
    setDone(false);
    setTimeout(() => { setAnalysing(false); setDone(true); }, 2200);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[#121312]">AI Estimation Engine</p>
          <p className="text-xs text-[#121312]/45">ATL-47 · Implement GraphQL subscriptions</p>
        </div>
        <button
          type="button"
          onClick={run}
          disabled={analysing}
          className="flex items-center gap-1.5 rounded-xl bg-[#f16e2c] px-3 py-2 text-xs font-bold text-white disabled:opacity-60 transition-opacity hover:opacity-85"
        >
          {analysing ? <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" /></svg> : "▶"}
          {analysing ? "Analysing…" : "Re-analyse"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Code complexity", value: analysing ? "…" : done ? "21 pts" : "21 pts", sub: "Cyclomatic + deps" },
          { label: "AI confidence", value: analysing ? "…" : done ? "62%" : "58%", sub: "Based on 14 similar tasks", highlight: true },
          { label: "Risk level", value: "High", sub: "No owner assigned", warn: true },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-xl border p-3 text-center ${stat.warn ? "border-red-200 bg-red-50" : stat.highlight ? "border-[#f16e2c]/20 bg-[#f16e2c]/5" : "border-[#121312]/8 bg-[#121312]/2"}`}>
            <p className={`text-xl font-bold ${stat.warn ? "text-red-500" : stat.highlight ? "text-[#f16e2c]" : "text-[#121312]"}`}>{stat.value}</p>
            <p className="mt-0.5 text-[10px] font-semibold text-[#121312]/50">{stat.label}</p>
            <p className="mt-0.5 text-[10px] text-[#121312]/35">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
        <p className="text-xs font-bold text-amber-700">⚠ Atlas recommends deferring ATL-47</p>
        <p className="mt-1 text-xs text-amber-600">No engineer with GraphQL expertise has capacity this sprint. Confidence is below the team&apos;s 70% threshold. Consider moving to Sprint 25.</p>
      </div>

      {done && (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-xs font-bold text-emerald-700">✓ Re-analysis complete</p>
          <p className="mt-1 text-xs text-emerald-600">Confidence updated to 62% — a new PR touching the subscriptions module was merged 2 hours ago. Risk remains high due to missing owner.</p>
        </motion.div>
      )}
    </div>
  );
}

function VelocityTab() {
  const sprints = [
    { name: "S21", planned: 32, actual: 28 },
    { name: "S22", planned: 34, actual: 36 },
    { name: "S23", planned: 30, actual: 29 },
    { name: "S24", planned: 32, actual: null },
  ];
  const max = 40;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[#121312]">Team velocity · Last 4 sprints</p>
          <p className="text-xs text-[#121312]/45">Atlas accuracy: 91% · Learning from 12 engineers</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">↑ Improving</span>
      </div>

      <div className="flex items-end gap-3 pt-2">
        {sprints.map((s) => (
          <div key={s.name} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="relative flex w-full flex-col items-center justify-end gap-1" style={{ height: 120 }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(s.planned / max) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="absolute bottom-0 w-full rounded-t-lg bg-[#f16e2c]/20"
              />
              {s.actual !== null && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(s.actual / max) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute bottom-0 w-[60%] rounded-t-lg bg-[#f16e2c]"
                />
              )}
              {s.actual === null && (
                <div className="absolute bottom-0 w-[60%] rounded-t-lg border-2 border-dashed border-[#f16e2c]/40" style={{ height: `${(s.planned / max) * 100}%` }} />
              )}
            </div>
            <p className="text-[10px] font-bold text-[#121312]/50">{s.name}</p>
            <p className="text-[10px] text-[#121312]/35">
              {s.actual !== null ? `${s.actual}/${s.planned}` : `${s.planned} est.`}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 text-[11px]">
        <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded bg-[#f16e2c]" /> Actual</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded border-2 border-dashed border-[#f16e2c]/50" /> Planned</span>
      </div>
    </div>
  );
}

const TABS = [
  { key: "sprint", label: "Sprint Composer", content: <SprintPlanTab /> },
  { key: "estimation", label: "AI Estimation", content: <AIEstimationTab /> },
  { key: "velocity", label: "Velocity Tracking", content: <VelocityTab /> },
];

const FEATURES = [
  { icon: GitBranch, title: "Code-aware estimation", body: "ATLAS parses your repos and scores story complexity from actual code structure — not gut feel." },
  { icon: Brain, title: "AI confidence scoring", body: "Every sprint item gets a confidence score so you know which estimates to trust and which to revisit." },
  { icon: Target, title: "Capacity-adjusted plans", body: "PTO, on-call, and focus time are factored in automatically. No more overcommitting." },
  { icon: TrendingUp, title: "Historical velocity learning", body: "The model improves every sprint. Past velocity trains sharper predictions over time." },
];

const STEPS = [
  { num: "01", title: "Connect your tools", body: "Link GitHub, Jira, Linear, and your calendar. ATLAS ingests context from day one." },
  { num: "02", title: "Generate a sprint plan", body: "ATLAS analyses code complexity, team capacity, and priorities to build a confidence-scored plan." },
  { num: "03", title: "Review & adjust", body: "Walk through flagged items with your team. Adjust scope with data, not debates." },
  { num: "04", title: "Ship & learn", body: "Execute the sprint. Post-sprint data feeds back into the model for ever-improving accuracy." },
];

export default function AtlasDemoPageContent() {
  return (
    <ProductDemoShell
      productKey="atlas"
      productName="ATLAS"
      color="#f16e2c"
      tagline="AI Sprint Planner"
      headline={<>See the <span style={{ color: "#f16e2c" }}>AI Sprint Planner</span> in action</>}
      subhead="Sprint planning that understands code complexity, team capacity, and business priority — live in your browser."
      tabs={TABS}
      features={FEATURES}
      steps={STEPS}
    />
  );
}
