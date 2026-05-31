"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, DollarSign, Zap, GitBranch } from "lucide-react";
import { ProductDemoShell } from "@/components/marketing/product-demo-shell";

const INCIDENT = {
  id: "INC-2847",
  title: "Payment API latency spike — P1",
  started: "14 min ago",
  services: ["payment-api", "checkout-flow", "webhook-dispatcher"],
  affectedAccounts: 38,
  arrAtRisk: "$1.4M",
  owner: null as string | null,
};

function IncidentDashboardTab() {
  const [owner, setOwner] = React.useState<string | null>(INCIDENT.owner);
  const [acknowledged, setAcknowledged] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="flex h-3 w-3 animate-pulse rounded-full bg-red-500" />
        <p className="text-sm font-bold text-[#121312]">{INCIDENT.title}</p>
        <span className="ml-auto rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">P1 · OPEN</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "ARR at risk", value: INCIDENT.arrAtRisk, color: "#EF4444" },
          { label: "Accounts affected", value: `${INCIDENT.affectedAccounts}`, color: "#F97316" },
          { label: "Duration", value: INCIDENT.started, color: "#121312" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-[#121312]/8 p-3 text-center">
            <p className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            <p className="mt-0.5 text-[10px] text-[#121312]/45">{stat.label}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="mb-1.5 text-xs font-semibold text-[#121312]/40">Affected services</p>
        <div className="flex flex-wrap gap-1.5">
          {INCIDENT.services.map((s) => (
            <span key={s} className="rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-[11px] font-medium text-red-600">{s}</span>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
        <p className="text-[11px] font-bold text-amber-700">⚡ Signal auto-routed to SRE on-call + VP Engineering</p>
        <p className="mt-0.5 text-[11px] text-amber-600">Based on: ARR &gt; $500k threshold · Enterprise account tier · 14 min SLA breach imminent</p>
      </div>

      {!acknowledged ? (
        <button
          type="button"
          onClick={() => { setOwner("you@company.com"); setAcknowledged(true); }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#EF4444] py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-85"
        >
          Acknowledge &amp; take ownership
        </button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-xs font-bold text-emerald-700">✓ Acknowledged by {owner}</p>
          <p className="mt-0.5 text-xs text-emerald-600">SLA timer paused. Revenue impact tracking continues. Stakeholders notified.</p>
        </motion.div>
      )}
    </div>
  );
}

function RevenueImpactTab() {
  const accounts = [
    { name: "Stripe", tier: "Enterprise", arr: "$220k", status: "impacted" },
    { name: "Acme Corp", tier: "Business", arr: "$128k", status: "impacted" },
    { name: "Figma", tier: "Enterprise", arr: "$195k", status: "degraded" },
    { name: "Notion", tier: "Business", arr: "$84k", status: "monitoring" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-[#121312]">Revenue impact map</p>
        <span className="text-xs text-[#121312]/40">INC-2847 · live</span>
      </div>
      {accounts.map((acc, i) => (
        <motion.div key={acc.name} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
          className="flex items-center gap-3 rounded-xl border border-[#121312]/8 px-4 py-3">
          <div className="flex-1">
            <p className="text-sm font-semibold text-[#121312]">{acc.name}</p>
            <p className="text-xs text-[#121312]/40">{acc.tier}</p>
          </div>
          <span className="text-sm font-bold text-[#121312]/60">{acc.arr}</span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${acc.status === "impacted" ? "bg-red-50 text-red-600" : acc.status === "degraded" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"}`}>
            {acc.status}
          </span>
        </motion.div>
      ))}
      <div className="rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-3">
        <p className="text-xs font-bold text-[#EF4444]">Total ARR at risk: $1.4M</p>
        <p className="mt-0.5 text-xs text-[#121312]/50">Signal has notified account managers for Stripe and Figma automatically.</p>
      </div>
    </div>
  );
}

const TABS = [
  { key: "incident", label: "Incident Dashboard", content: <IncidentDashboardTab /> },
  { key: "revenue", label: "Revenue Impact", content: <RevenueImpactTab /> },
];

const FEATURES = [
  { icon: AlertTriangle, title: "Revenue-aware routing", body: "Incidents are escalated based on ARR at risk, account tier, and SLA status — automatically." },
  { icon: DollarSign, title: "Real-time impact scoring", body: "See exactly which accounts and how much revenue is affected within seconds of an alert firing." },
  { icon: Zap, title: "Smart on-call escalation", body: "Signal pages the right people based on service ownership, not just round-robin rotation." },
  { icon: GitBranch, title: "Post-incident revenue report", body: "Auto-generate customer-facing and executive impact reports after resolution." },
];

const STEPS = [
  { num: "01", title: "Connect observability", body: "Link Datadog, PagerDuty, Sentry, or Grafana. Signal ingests alerts immediately." },
  { num: "02", title: "Map revenue context", body: "Connect your CRM so every incident shows ARR at risk by account." },
  { num: "03", title: "Configure routing rules", body: "Set escalation thresholds — by ARR, account tier, incident duration, or blast radius." },
  { num: "04", title: "Resolve with context", body: "Engineers see revenue impact in the incident timeline. Resolution is faster, prioritisation is clearer." },
];

export default function SignalDemoPageContent() {
  return (
    <ProductDemoShell
      productKey="signal"
      productName="SIGNAL"
      color="#EF4444"
      tagline="Incident Intelligence"
      headline={<>See <span style={{ color: "#EF4444" }}>Incident Intelligence</span> in action</>}
      subhead="Revenue-aware incident response — route, triage, and report with full ARR context baked in."
      tabs={TABS}
      features={FEATURES}
      steps={STEPS}
    />
  );
}
