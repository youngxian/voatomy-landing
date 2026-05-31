"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Ghost, TrendingDown, AlertTriangle, DollarSign } from "lucide-react";
import { ProductDemoShell } from "@/components/marketing/product-demo-shell";

const HOTSPOTS = [
  { file: "src/lib/payment-processor.ts", score: 91, effort: "4d", risk: "high", category: "Complexity", lines: 1842, debt: "$18k" },
  { file: "src/api/auth/session.ts",       score: 84, effort: "2d", risk: "high", category: "Coverage",   lines: 620,  debt: "$9k"  },
  { file: "src/components/data-table.tsx", score: 71, effort: "3d", risk: "medium", category: "Duplication", lines: 1104, debt: "$12k" },
  { file: "src/hooks/use-analytics.ts",   score: 58, effort: "1d", risk: "low",  category: "Dead code",  lines: 340,  debt: "$4k"  },
];

const RISK_META: Record<string, { color: string }> = {
  high:   { color: "#EF4444" },
  medium: { color: "#F97316" },
  low:    { color: "#6B7280" },
};

function HotspotTab() {
  const [active, setActive] = React.useState(0);
  const item = HOTSPOTS[active];

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="space-y-1.5 lg:col-span-2">
        {HOTSPOTS.map((h, i) => (
          <button key={h.file} type="button" onClick={() => setActive(i)}
            className={`flex w-full flex-col gap-0.5 rounded-xl border px-3 py-2.5 text-left text-xs transition-all ${active === i ? "border-[#6366F1]/30 bg-[#6366F1]/6" : "border-[#121312]/8 hover:border-[#6366F1]/15"}`}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#121312]/50">{h.file.split("/").pop()}</span>
              <span className="font-bold" style={{ color: RISK_META[h.risk].color }}>{h.score}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#121312]/8 overflow-hidden">
              <div className="h-full rounded-full bg-[#6366F1]" style={{ width: `${h.score}%` }} />
            </div>
          </button>
        ))}
      </div>
      <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-[#121312]/10 p-4 lg:col-span-3">
        <p className="font-mono text-xs text-[#6366F1]">{item.file}</p>
        <p className="mt-2 text-lg font-bold text-[#121312]">Debt score: {item.score}</p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
          {[
            { k: "Category", v: item.category },
            { k: "Risk",     v: item.risk,    color: RISK_META[item.risk].color },
            { k: "Lines",    v: item.lines.toLocaleString() },
            { k: "Est. debt cost", v: item.debt, bold: true },
          ].map(({ k, v, color, bold }) => (
            <div key={k} className="rounded-lg bg-[#f4f5f7] p-2.5">
              <p className="text-[#121312]/40">{k}</p>
              <p className="mt-0.5 font-bold" style={{ color: color ?? "#121312" }}>{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl border border-[#6366F1]/20 bg-[#6366F1]/5 p-3">
          <p className="text-[10px] font-bold text-[#6366F1]">Phantom recommendation</p>
          <p className="mt-0.5 text-xs text-[#121312]/60">Refactor in {item.effort} — ROI: eliminate {item.debt} annual debt cost. Suggested sprint: next quarter.</p>
        </div>
      </motion.div>
    </div>
  );
}

function DebtTrendTab() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const scores = [78, 81, 76, 83, 79, 72];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[#121312]">Debt trend · 6 months</p>
          <p className="text-xs text-[#121312]/45">Lower = healthier · 4 repos tracked</p>
        </div>
        <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-500">↑ Accumulating</span>
      </div>

      <div className="flex items-end gap-3 pt-2">
        {months.map((m, i) => (
          <div key={m} className="flex flex-1 flex-col items-center gap-1">
            <motion.div
              className="w-full rounded-t-lg bg-[#6366F1]"
              initial={{ height: 0 }}
              animate={{ height: `${(scores[i] / 100) * 120}px` }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            />
            <p className="text-[10px] font-bold text-[#121312]/40">{m}</p>
            <p className="text-[10px] text-[#121312]/30">{scores[i]}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
        <p className="text-xs font-bold text-amber-700">⚠ Debt increasing 3.2% per sprint</p>
        <p className="mt-0.5 text-xs text-amber-600">At current rate, critical threshold (90) reached in ~8 weeks. Phantom recommends scheduling a refactor sprint.</p>
      </div>
    </div>
  );
}

const TABS = [
  { key: "hotspots", label: "Debt Hotspots", content: <HotspotTab /> },
  { key: "trend",    label: "Debt Trend",    content: <DebtTrendTab /> },
];

const FEATURES = [
  { icon: Ghost,       title: "Debt hotspot scoring",    body: "Phantom scores every file by complexity, coverage, duplication, and risk — surfacing the worst offenders first." },
  { icon: DollarSign,  title: "Cost & ROI estimates",    body: "Every hotspot includes an estimated debt cost and refactor ROI so you can justify the work to leadership." },
  { icon: TrendingDown, title: "Trend tracking",          body: "See whether your codebase is getting healthier or accumulating debt sprint over sprint." },
  { icon: AlertTriangle, title: "Pre-merge debt alerts",  body: "Phantom flags new debt in PRs before it merges, keeping the bar from dropping silently." },
];

const STEPS = [
  { num: "01", title: "Connect your repo",    body: "Link GitHub or GitLab. Phantom clones and analyses your codebase on first run." },
  { num: "02", title: "Choose scoring mode",  body: "Rank hotspots by effort, risk, or ROI — whichever aligns with your team's goals." },
  { num: "03", title: "Set risk threshold",   body: "Configure your alert threshold. Only get notified when debt crosses your defined risk level." },
  { num: "04", title: "Refactor with data",   body: "Engineers tackle hotspots with clear ROI. Phantom tracks improvement sprint over sprint." },
];

export default function PhantomDemoPageContent() {
  return (
    <ProductDemoShell
      productKey="phantom"
      productName="PHANTOM"
      color="#6366F1"
      tagline="Technical Debt Radar"
      headline={<>See the <span style={{ color: "#6366F1" }}>Tech Debt Radar</span> in action</>}
      subhead="Find debt hotspots with cost and risk scoring — so you refactor what actually matters."
      tabs={TABS}
      features={FEATURES}
      steps={STEPS}
    />
  );
}
