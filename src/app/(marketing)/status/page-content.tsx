"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Clock,
  ExternalLink,
  Globe,
  Mail,
  RefreshCw,
  Server,
  Shield,
  Activity,
  Wifi,
  Cloud,
  GitBranch,
  Paintbrush,
  Lock,
  Webhook,
  Image,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Service status types & data                                        */
/* ------------------------------------------------------------------ */

type ServiceStatus = "operational" | "degraded" | "down" | "maintenance";

interface ServiceInfo {
  name: string;
  status: ServiceStatus;
  uptime: number;
  icon: React.ReactNode;
  description: string;
}

const STATUS_CONFIG: Record<
  ServiceStatus,
  { label: string; color: string; bgClass: string; textClass: string; dotClass: string }
> = {
  operational: {
    label: "Operational",
    color: "#0d9488",
    bgClass: "bg-[#0d9488]/10",
    textClass: "text-[#0d9488]",
    dotClass: "bg-[#0d9488]",
  },
  degraded: {
    label: "Degraded",
    color: "#F59E0B",
    bgClass: "bg-amber-500/10",
    textClass: "text-amber-400",
    dotClass: "bg-amber-400",
  },
  down: {
    label: "Down",
    color: "#EF4444",
    bgClass: "bg-red-500/10",
    textClass: "text-red-400",
    dotClass: "bg-red-400",
  },
  maintenance: {
    label: "Maintenance",
    color: "#6366F1",
    bgClass: "bg-indigo-500/10",
    textClass: "text-indigo-400",
    dotClass: "bg-indigo-400",
  },
};

const SERVICES: ServiceInfo[] = [
  {
    name: "ATLAS API",
    status: "operational",
    uptime: 99.99,
    icon: <Server className="h-4.5 w-4.5" />,
    description: "Core sprint planning engine and REST API",
  },
  {
    name: "ATLAS Dashboard",
    status: "operational",
    uptime: 99.98,
    icon: <Activity className="h-4.5 w-4.5" />,
    description: "Web application and real-time dashboards",
  },
  {
    name: "LOOP API",
    status: "operational",
    uptime: 99.97,
    icon: <RefreshCw className="h-4.5 w-4.5" />,
    description: "Revenue feedback engine and integrations",
  },
  {
    name: "Git Integration",
    status: "operational",
    uptime: 99.99,
    icon: <GitBranch className="h-4.5 w-4.5" />,
    description: "GitHub, GitLab, and Bitbucket connectors",
  },
  {
    name: "Figma Sync",
    status: "operational",
    uptime: 99.95,
    icon: <Paintbrush className="h-4.5 w-4.5" />,
    description: "DRIFT design token synchronization",
  },
  {
    name: "Authentication",
    status: "operational",
    uptime: 99.99,
    icon: <Lock className="h-4.5 w-4.5" />,
    description: "SSO, SAML, and session management",
  },
  {
    name: "Webhooks",
    status: "operational",
    uptime: 99.96,
    icon: <Webhook className="h-4.5 w-4.5" />,
    description: "Outbound event delivery and retries",
  },
  {
    name: "CDN & Assets",
    status: "operational",
    uptime: 99.99,
    icon: <Cloud className="h-4.5 w-4.5" />,
    description: "Static assets, images, and edge caching",
  },
];

/* ------------------------------------------------------------------ */
/*  90-day uptime data (mock)                                          */
/* ------------------------------------------------------------------ */

type DayStatus = "full" | "degraded" | "down";

function generate90DayData(): { day: number; status: DayStatus }[] {
  const data: { day: number; status: DayStatus }[] = [];
  const degradedDays = new Set([23, 47, 68]);

  for (let i = 0; i < 90; i++) {
    data.push({
      day: i + 1,
      status: degradedDays.has(i) ? "degraded" : "full",
    });
  }
  return data;
}

const UPTIME_DATA = generate90DayData();

/* ------------------------------------------------------------------ */
/*  Recent incidents data                                              */
/* ------------------------------------------------------------------ */

interface IncidentUpdate {
  time: string;
  message: string;
}

interface Incident {
  title: string;
  date: string;
  status: "resolved" | "monitoring" | "investigating" | "completed";
  duration: string;
  affected: string[];
  severity: "minor" | "major" | "maintenance";
  updates: IncidentUpdate[];
}

const RECENT_INCIDENTS: Incident[] = [
  {
    title: "Elevated API Latency",
    date: "Feb 18, 2026",
    status: "resolved",
    duration: "23 min",
    affected: ["ATLAS API"],
    severity: "minor",
    updates: [
      { time: "14:32 UTC", message: "Investigating elevated p99 latency on ATLAS API endpoints." },
      { time: "14:41 UTC", message: "Root cause identified: database connection pool exhaustion during traffic spike." },
      { time: "14:50 UTC", message: "Connection pool scaled. Latency returning to normal levels." },
      { time: "14:55 UTC", message: "Resolved. All API response times within normal thresholds." },
    ],
  },
  {
    title: "Figma Sync Delay",
    date: "Feb 5, 2026",
    status: "resolved",
    duration: "45 min",
    affected: ["Figma Sync"],
    severity: "minor",
    updates: [
      { time: "09:12 UTC", message: "Reports of delayed token synchronization from Figma plugin." },
      { time: "09:28 UTC", message: "Identified WebSocket reconnection bug in sync service." },
      { time: "09:45 UTC", message: "Hotfix deployed. Sync queue draining normally." },
      { time: "09:57 UTC", message: "Resolved. All pending syncs completed successfully." },
    ],
  },
  {
    title: "Scheduled Maintenance",
    date: "Jan 28, 2026",
    status: "completed",
    duration: "2 hr window",
    affected: ["All services"],
    severity: "maintenance",
    updates: [
      { time: "02:00 UTC", message: "Scheduled maintenance window begins. Database migration in progress." },
      { time: "02:45 UTC", message: "Database migration complete. Restarting application services." },
      { time: "03:15 UTC", message: "All services restored. Running verification checks." },
      { time: "03:30 UTC", message: "Maintenance completed successfully. All systems nominal." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Service card component                                             */
/* ------------------------------------------------------------------ */

function ServiceCard({ service }: { service: ServiceInfo }) {
  const config = STATUS_CONFIG[service.status];

  return (
    <Card variant="light" className="group relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-theme-subtle text-theme-s transition-colors duration-300">
            {service.icon}
          </span>
          <div>
            <h3 className="text-sm font-semibold text-theme">{service.name}</h3>
            <p className="mt-0.5 text-xs text-theme-m">{service.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {/* Status badge */}
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
            config.bgClass,
            config.textClass,
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full animate-pulse", config.dotClass)} />
          {config.label}
        </span>

        {/* Uptime percentage */}
        <span className="text-sm font-bold tabular-nums" style={{ color: config.color }}>
          {service.uptime}%
        </span>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Incident card component                                            */
/* ------------------------------------------------------------------ */

function IncidentCard({ incident }: { incident: Incident }) {
  const [expanded, setExpanded] = React.useState(false);

  const severityConfig = {
    minor: { color: "#F59E0B", bg: "bg-amber-500/10", text: "text-amber-400", label: "Minor" },
    major: { color: "#EF4444", bg: "bg-red-500/10", text: "text-red-400", label: "Major" },
    maintenance: {
      color: "#6366F1",
      bg: "bg-indigo-500/10",
      text: "text-indigo-400",
      label: "Maintenance",
    },
  };

  const statusConfig = {
    resolved: { color: "#0d9488", bg: "bg-[#0d9488]/10", text: "text-[#0d9488]", label: "Resolved" },
    completed: { color: "#0d9488", bg: "bg-[#0d9488]/10", text: "text-[#0d9488]", label: "Completed" },
    monitoring: { color: "#3B82F6", bg: "bg-blue-500/10", text: "text-blue-400", label: "Monitoring" },
    investigating: { color: "#F59E0B", bg: "bg-amber-500/10", text: "text-amber-400", label: "Investigating" },
  };

  const sConfig = severityConfig[incident.severity];
  const stConfig = statusConfig[incident.status];

  return (
    <Card variant="light" className="overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-theme">{incident.title}</h3>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                stConfig.bg,
                stConfig.text,
              )}
            >
              <CheckCircle2 className="h-3 w-3" />
              {stConfig.label}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-theme-m">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {incident.date}
            </span>
            <span className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Duration: {incident.duration}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
                sConfig.bg,
                sConfig.text,
              )}
            >
              {sConfig.label}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {incident.affected.map((service) => (
              <span
                key={service}
                className="rounded-md bg-theme-subtle px-2 py-0.5 text-[11px] font-medium text-theme-s transition-colors duration-300"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <span
          className={cn(
            "mt-1 shrink-0 text-theme-m transition-transform duration-300",
            expanded && "rotate-180",
          )}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* Expandable timeline */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="mt-4 border-t border-theme pt-4">
            <div className="space-y-3">
              {incident.updates.map((update, i) => (
                <div key={i} className="flex gap-3">
                  <div className="relative flex flex-col items-center">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full shrink-0 mt-1.5",
                        i === incident.updates.length - 1
                          ? "bg-[#0d9488]"
                          : "bg-theme-subtle",
                      )}
                    />
                    {i < incident.updates.length - 1 && (
                      <div className="w-px flex-1 bg-theme" />
                    )}
                  </div>
                  <div className="pb-3">
                    <span className="text-[11px] font-mono font-medium text-theme-m">
                      {update.time}
                    </span>
                    <p className="mt-0.5 text-xs text-theme-s leading-relaxed">{update.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Uptime bar component                                               */
/* ------------------------------------------------------------------ */

function UptimeBar({
  data,
}: {
  data: { day: number; status: DayStatus }[];
}) {
  const statusColors: Record<DayStatus, string> = {
    full: "#0d9488",
    degraded: "#F59E0B",
    down: "#EF4444",
  };

  return (
    <div className="flex items-end gap-[2px] sm:gap-[3px]">
      {data.map((d) => (
        <div
          key={d.day}
          className="group relative flex-1 cursor-default"
        >
          <div
            className={cn(
              "w-full rounded-sm transition-all duration-200 hover:opacity-80",
              d.status === "full" ? "h-8" : d.status === "degraded" ? "h-5" : "h-3",
            )}
            style={{ backgroundColor: statusColors[d.status] }}
          />
          {/* Tooltip */}
          <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-[#0a0a0a] px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 whitespace-nowrap z-10">
            Day {d.day}: {d.status === "full" ? "100%" : d.status === "degraded" ? "Degraded" : "Down"}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function StatusPage() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState<string>("");

  React.useEffect(() => {
    const update = () => {
      setCurrentTime(
        new Date().toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        }),
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const allOperational = SERVICES.every((s) => s.status === "operational");

  return (
    <div className="bg-theme">
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <Section variant="mint" className="pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="mx-auto max-w-3xl text-center">
          <Chip dotColor="#0d9488" className="mb-6">
            System Status
          </Chip>

          <h1 className="text-3xl font-semibold tracking-tight text-theme sm:text-5xl lg:text-display-2">
            System Status
          </h1>

          {/* Status banner */}
          <div className="mx-auto mt-8 max-w-md">
            <div
              className={cn(
                "flex items-center justify-center gap-3 rounded-2xl border px-6 py-4",
                allOperational
                  ? "border-[#0d9488]/20 bg-[#0d9488]/5"
                  : "border-amber-500/20 bg-amber-500/5",
              )}
            >
              {/* Pulsing dot */}
              <span className="relative flex h-3 w-3">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                    allOperational ? "bg-[#0d9488]" : "bg-amber-400",
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex h-3 w-3 rounded-full",
                    allOperational ? "bg-[#0d9488]" : "bg-amber-400",
                  )}
                />
              </span>

              <span
                className={cn(
                  "text-base font-semibold sm:text-lg",
                  allOperational ? "text-[#0d9488]" : "text-amber-400",
                )}
              >
                {allOperational ? "All Systems Operational" : "Partial System Disruption"}
              </span>
            </div>
          </div>

          {/* Current time */}
          {currentTime && (
            <p className="mt-4 text-xs text-theme-m">
              Last checked: {currentTime}
            </p>
          )}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SERVICES GRID                                               */}
      {/* ============================================================ */}
      <Section variant="amber" className="py-16 sm:py-24">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10">
            <Server className="h-4 w-4 text-brand" />
          </span>
          <h2 className="text-lg font-semibold text-theme">Services</h2>
          <span className="rounded-full bg-[#0d9488]/10 px-2.5 py-0.5 text-xs font-semibold text-[#0d9488]">
            {SERVICES.filter((s) => s.status === "operational").length}/{SERVICES.length} operational
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  90-DAY UPTIME CHART                                         */}
      {/* ============================================================ */}
      <Section variant="mint" className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10">
                <Activity className="h-4 w-4 text-brand" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-theme">90-Day Uptime</h2>
                <p className="text-xs text-theme-m">Daily availability across all services</p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4">
              {[
                { label: "Operational", color: "#0d9488" },
                { label: "Degraded", color: "#F59E0B" },
                { label: "Down", color: "#EF4444" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-theme-m">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart */}
          <Card variant="light" className="overflow-hidden">
            <UptimeBar data={UPTIME_DATA} />

            <div className="mt-4 flex items-center justify-between text-[11px] text-theme-m">
              <span>90 days ago</span>
              <span className="font-semibold text-[#0d9488]">99.97% overall uptime</span>
              <span>Today</span>
            </div>
          </Card>

          {/* Uptime stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Current streak", value: "34 days", sub: "100% uptime" },
              { label: "30-day uptime", value: "99.98%", sub: "~8.6 s downtime" },
              { label: "60-day uptime", value: "99.97%", sub: "~25.9 s downtime" },
              { label: "90-day uptime", value: "99.97%", sub: "~38.9 s downtime" },
            ].map((stat) => (
              <Card key={stat.label} variant="light" className="text-center">
                <p className="text-lg font-bold text-[#0d9488] sm:text-xl">{stat.value}</p>
                <p className="mt-0.5 text-xs font-medium text-theme-s">{stat.label}</p>
                <p className="mt-0.5 text-[11px] text-theme-m">{stat.sub}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  RECENT INCIDENTS                                            */}
      {/* ============================================================ */}
      <Section variant="amber" className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10">
              <Shield className="h-4 w-4 text-brand" />
            </span>
            <h2 className="text-lg font-semibold text-theme">Recent Incidents</h2>
            <span className="rounded-full bg-theme-subtle px-2.5 py-0.5 text-xs font-medium text-theme-m transition-colors duration-300">
              Last 30 days
            </span>
          </div>

          <div className="space-y-4">
            {RECENT_INCIDENTS.map((incident) => (
              <IncidentCard key={incident.title} incident={incident} />
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="ghost" size="sm">
              View full incident history
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SUBSCRIBE                                                   */}
      {/* ============================================================ */}
      <Section variant="mint" className="py-16 sm:py-24">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10">
            <Bell className="h-6 w-6 text-brand" />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-theme sm:text-heading-1">
            Subscribe to status updates
          </h2>
          <p className="mt-3 text-base text-theme-s">
            Get notified when services experience issues. We will keep you updated until everything is back to normal.
          </p>

          {subscribed ? (
            <div className="mt-8 rounded-2xl border border-[#0d9488]/20 bg-[#0d9488]/5 p-6">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0d9488]/15">
                <CheckCircle2 className="h-5 w-5 text-[#0d9488]" />
              </div>
              <p className="text-sm font-semibold text-[#0d9488]">Subscribed to status updates</p>
              <p className="mt-1 text-xs text-theme-m">
                You&apos;ll receive email notifications whenever an incident is reported or resolved.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className={cn(
                    "h-12 flex-1 rounded-xl border border-theme bg-theme-card px-4 text-sm font-medium text-theme transition-colors duration-300",
                    "placeholder:text-theme-m",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand",
                    "sm:max-w-xs",
                  )}
                />
                <Button type="submit" variant="primary" size="lg">
                  Subscribe
                  <Mail className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <p className="mt-3 text-xs text-theme-m">
                Incident alerts only. No marketing emails.
              </p>
            </form>
          )}

          {/* Additional subscribe options */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {[
              { icon: <Globe className="h-3.5 w-3.5" />, label: "RSS Feed" },
              { icon: <Wifi className="h-3.5 w-3.5" />, label: "Webhook" },
              { icon: <Mail className="h-3.5 w-3.5" />, label: "Slack" },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-theme bg-theme-card px-3 py-1.5 text-xs font-medium text-theme-s transition-colors hover:border-brand/30 hover:text-brand"
              >
                {opt.icon}
                {opt.label}
                <ExternalLink className="h-2.5 w-2.5 text-theme-m" />
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  BOTTOM CTA                                                  */}
      {/* ============================================================ */}
      <Section variant="amber" className="py-12 sm:py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-semibold tracking-tight text-theme sm:text-2xl">
            Have a question about our infrastructure?
          </h2>
          <p className="mt-2 text-sm text-theme-s">
            Our engineering team is happy to walk you through our architecture, SLAs, and security posture.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">
                Talk to Engineering
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/pricing">
                View SLA Details
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
