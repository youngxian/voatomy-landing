"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, GitBranch, Bell, BarChart2 } from "lucide-react";
import { ProductDemoShell } from "@/components/marketing/product-demo-shell";

const DRIFT_ITEMS = [
  { id: "DRF-01", component: "Button / Primary", type: "color-token", figma: "#EC4899", code: "#e11d48", severity: "high", file: "src/components/ui/button.tsx" },
  { id: "DRF-02", component: "Heading / H1", type: "typography", figma: "700 / 48px", code: "600 / 46px", severity: "medium", file: "src/components/ui/typography.tsx" },
  { id: "DRF-03", component: "Card / Radius", type: "spacing", figma: "16px", code: "12px", severity: "low", file: "src/components/ui/card.tsx" },
  { id: "DRF-04", component: "Icon / CheckCircle", type: "icon-usage", figma: "heroicons", code: "lucide-react", severity: "medium", file: "src/components/landing/cta-section.tsx" },
];

const SEV_META: Record<string, { color: string; label: string }> = {
  high:   { color: "#EF4444", label: "High" },
  medium: { color: "#F97316", label: "Medium" },
  low:    { color: "#6B7280", label: "Low" },
};

function DriftScanTab() {
  const [scanning, setScanning] = React.useState(false);
  const [scanned, setScanned] = React.useState(false);
  const [dismissed, setDismissed] = React.useState<string[]>([]);

  const runScan = () => {
    setScanning(true);
    setScanned(false);
    setTimeout(() => { setScanning(false); setScanned(true); }, 2000);
  };

  const visible = DRIFT_ITEMS.filter((d) => !dismissed.includes(d.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[#121312]">Design drift scanner</p>
          <p className="text-xs text-[#121312]/45">Figma → GitHub · Last scan: 2 hours ago · {visible.length} issues</p>
        </div>
        <button
          type="button"
          onClick={runScan}
          disabled={scanning}
          className="flex items-center gap-1.5 rounded-xl bg-[#EC4899] px-3 py-2 text-xs font-bold text-white disabled:opacity-60 transition-opacity hover:opacity-85"
        >
          {scanning
            ? <><svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" /></svg> Scanning…</>
            : "▶ Run scan"}
        </button>
      </div>

      {scanning && (
        <div className="space-y-1.5">
          {["Fetching Figma tokens…", "Parsing component tree…", "Comparing to codebase…"].map((msg, i) => (
            <motion.p key={msg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.5 }}
              className="text-xs text-[#121312]/40">
              <span className="mr-1.5 inline-block animate-pulse">⚙</span>{msg}
            </motion.p>
          ))}
        </div>
      )}

      <AnimatePresence>
        {visible.map((item) => {
          const sev = SEV_META[item.severity];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-xl border border-[#121312]/8 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#121312]">{item.component}</span>
                      <span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ backgroundColor: `${sev.color}15`, color: sev.color }}>{sev.label}</span>
                    </div>
                    <p className="mt-0.5 font-mono text-[10px] text-[#121312]/40">{item.file}</p>
                  </div>
                  <button type="button" onClick={() => setDismissed((p) => [...p, item.id])}
                    className="shrink-0 text-[10px] text-[#121312]/30 hover:text-[#121312]/60">dismiss</button>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                  <div className="rounded-lg bg-[#f4f5f7] px-2 py-1.5">
                    <p className="font-semibold text-[#121312]/40">Figma</p>
                    <p className="font-mono text-[#121312]">{item.figma}</p>
                  </div>
                  <div className="rounded-lg border border-[#EC4899]/20 bg-[#EC4899]/5 px-2 py-1.5">
                    <p className="font-semibold text-[#EC4899]/60">Code</p>
                    <p className="font-mono text-[#EC4899]">{item.code}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {scanned && visible.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
          <p className="text-sm font-bold text-emerald-700">✓ Zero drift detected</p>
          <p className="mt-0.5 text-xs text-emerald-600">Your design system and codebase are perfectly in sync.</p>
        </motion.div>
      )}
    </div>
  );
}

function ComponentHealthTab() {
  const components = [
    { name: "Button", health: 94, issues: 1, tokens: 12 },
    { name: "Card",   health: 87, issues: 2, tokens: 8  },
    { name: "Input",  health: 100, issues: 0, tokens: 9 },
    { name: "Modal",  health: 72, issues: 4, tokens: 15 },
    { name: "Badge",  health: 98, issues: 0, tokens: 5  },
  ];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-bold text-[#121312]">Component health scores</p>
        <span className="text-xs text-[#121312]/40">5 components tracked</span>
      </div>
      <div className="space-y-2.5">
        {components.map((c, i) => {
          const color = c.health >= 90 ? "#22c55e" : c.health >= 80 ? "#f59e0b" : "#EF4444";
          return (
            <motion.div key={c.name} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
              className="flex items-center gap-3 rounded-xl border border-[#121312]/8 px-4 py-2.5">
              <p className="w-16 text-sm font-semibold text-[#121312]">{c.name}</p>
              <div className="flex-1 h-2 rounded-full bg-[#121312]/8 overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${c.health}%`, backgroundColor: color }} />
              </div>
              <span className="w-10 text-right text-sm font-bold" style={{ color }}>{c.health}%</span>
              <span className="w-16 text-right text-[11px] text-[#121312]/40">{c.issues} issue{c.issues !== 1 ? "s" : ""}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const TABS = [
  { key: "scan",   label: "Drift Scanner",     content: <DriftScanTab /> },
  { key: "health", label: "Component Health",  content: <ComponentHealthTab /> },
];

const FEATURES = [
  { icon: Layers,    title: "Token-level comparison", body: "Drift compares every design token — color, spacing, typography, radius — against your live code on each commit." },
  { icon: GitBranch, title: "Commit-triggered scans",  body: "Every push triggers a scan. Drift reports surface in PRs before code reaches production." },
  { icon: Bell,      title: "Smart severity alerts",   body: "Set severity thresholds. Get notified on high-risk drift only, not every minor pixel." },
  { icon: BarChart2, title: "Component health scores", body: "Track the overall design-code health of every component in your system over time." },
];

const STEPS = [
  { num: "01", title: "Connect Figma & repo", body: "Link your Figma workspace and GitHub/GitLab. Drift reads your design tokens and component library." },
  { num: "02", title: "Configure categories", body: "Choose which drift types matter — colors, typography, spacing, icons, component names." },
  { num: "03", title: "Set scan cadence", body: "Scan on every commit, daily, or weekly. PR comments flag drift before it merges." },
  { num: "04", title: "Fix & stay in sync", body: "Engineers get file-level attribution. Designers approve fixes in Figma. Health improves sprint over sprint." },
];

export default function DriftDemoPageContent() {
  return (
    <ProductDemoShell
      productKey="drift"
      productName="DRIFT"
      color="#EC4899"
      tagline="Design System Guardian"
      headline={<>See the <span style={{ color: "#EC4899" }}>Design System Guardian</span> in action</>}
      subhead="Detect design-code drift on every commit. Keep Figma and production permanently in sync."
      tabs={TABS}
      features={FEATURES}
      steps={STEPS}
    />
  );
}
