"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  Shield,
  Lock,
  Database,
  Globe,
  Eye,
  Server,
  Users,
  FileSearch,
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  AlertTriangle,
  Cloud,
  Key,
  Activity,
  HardDrive,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { BRAND_GREEN } from "@/lib/marketing-visual";


/* ─────────────────── Constants ─────────────────── */


const TRUST_BADGES = [
  {
    icon: Shield,
    title: "SOC 2 Type II",
    status: "In Progress",
    statusColor: "#f59e0b",
    desc: "Independent audit of security controls, availability, and confidentiality.",
  },
  {
    icon: Lock,
    title: "TLS 1.3 Encryption",
    status: "Active",
    statusColor: BRAND_GREEN,
    desc: "All data encrypted in transit using the latest transport layer security protocol.",
  },
  {
    icon: Database,
    title: "AES-256 at Rest",
    status: "Active",
    statusColor: BRAND_GREEN,
    desc: "Military-grade encryption for every byte stored in our infrastructure.",
  },
  {
    icon: Globe,
    title: "GDPR Ready",
    status: "Compliant",
    statusColor: BRAND_GREEN,
    desc: "Full data subject rights, processing agreements, and EU data residency options.",
  },
];

const SECURITY_PRINCIPLES = [
  {
    icon: Eye,
    title: "Never Stores Source Code",
    desc: "Voatomy uses read-only API access to your repositories. We retain only structural metadata \u2014 file sizes, complexity scores, dependency maps. Your source code never touches our servers.",
    highlight: "Read-only access. Zero code retention.",
  },
  {
    icon: Lock,
    title: "Encrypted Everywhere",
    desc: "TLS 1.3 in transit, AES-256 at rest. Every data point is encrypted at every layer of the stack. Encryption keys are rotated automatically and stored in a dedicated key management service.",
    highlight: "End-to-end encryption at every layer.",
  },
  {
    icon: Server,
    title: "Tenant Isolation",
    desc: "PostgreSQL Row-Level Security, scoped queries, per-tenant AI context. Your data never leaks across organizations. Each tenant operates in a logically isolated environment.",
    highlight: "Complete data isolation between orgs.",
  },
  {
    icon: Users,
    title: "Access Controls",
    desc: "RBAC, SSO/SAML/SCIM, comprehensive audit logging. Enterprise-grade access controls from day one. Every action is logged, timestamped, and attributable to a specific user.",
    highlight: "Enterprise-grade from day one.",
  },
];

const INFRASTRUCTURE_ITEMS = [
  { icon: Cloud, label: "Cloud Provider", value: "AWS (multi-region)", detail: "US-East, EU-West availability zones" },
  { icon: Database, label: "Database", value: "PostgreSQL with RLS", detail: "Row-Level Security on every table" },
  { icon: Key, label: "Authentication", value: "SSO / SAML / SCIM", detail: "Enterprise identity provider support" },
  { icon: Activity, label: "Monitoring", value: "24/7 automated alerts", detail: "Real-time anomaly detection" },
  { icon: HardDrive, label: "Backups", value: "Hourly, 30-day retention", detail: "Point-in-time recovery capability" },
  { icon: ShieldCheck, label: "Penetration Testing", value: "Annual third-party audits", detail: "Independent security assessments" },
];

const DATA_FLOW_STEPS = [
  { label: "Your Repo", icon: Database, color: "rgba(255,255,255,0.6)" },
  { label: "Read-Only API", icon: Eye, color: "rgba(255,255,255,0.6)" },
  { label: "Metadata Extraction", icon: FileSearch, color: BRAND_GREEN },
  { label: "Encrypted Storage", icon: Lock, color: "rgba(255,255,255,0.6)" },
  { label: "AI Analysis", icon: Activity, color: "rgba(255,255,255,0.6)" },
  { label: "Sprint Plan", icon: CheckCircle2, color: BRAND_GREEN },
];

const COMPLIANCE_ROADMAP = [
  { milestone: "SOC 2 Type I", date: "Q1 2026", status: "in-progress", desc: "Initial controls assessment and gap analysis" },
  { milestone: "SOC 2 Type II", date: "Q3 2026", status: "planned", desc: "Continuous monitoring over observation period" },
  { milestone: "ISO 27001", date: "2027", status: "planned", desc: "International information security management" },
  { milestone: "HIPAA", date: "On Request", status: "future", desc: "Healthcare data compliance for qualifying customers" },
];

/* ─────────────────── Scroll Animation Hook ─────────────────── */

function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);
}

/* ─────────────────── Main Page Component ─────────────────── */

export default function SecurityPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* ═══════════════ 1. HERO ═══════════════ */}
      <Section variant="white" container={false} className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-15 blur-[120px]"
            style={{ background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)` }}
          />
          <div className="absolute inset-0 bg-dot-grid bg-[length:24px_24px] opacity-40" />
        </div>

        <div className="relative mx-auto w-full max-w-container px-4 text-center">
          <div
            className={cn(
              "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-700",
              heroLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90",
            )}
            style={{ backgroundColor: `${BRAND_GREEN}15` }}
          >
            <Shield className="h-8 w-8 text-brand" />
          </div>

          <h1
            className={cn(
              "text-display-2 lg:text-display-1 text-theme mb-6 transition-all duration-700 delay-100",
              heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Security at{" "}
            <span className="text-brand">Voatomy</span>
          </h1>

          <p
            className={cn(
              "text-body-lg text-theme-s max-w-2xl mx-auto mb-8 transition-all duration-700 delay-200",
              heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Your data security is our top priority. We build every feature with security-first
            principles, ensuring your code and organizational data remain protected at every layer.
          </p>

          <div
            className={cn(
              "flex flex-wrap items-center justify-center gap-4 text-sm text-theme-m transition-all duration-700 delay-300",
              heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            <span className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-brand" />
              Zero code storage
            </span>
            <span className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-brand" />
              End-to-end encryption
            </span>
            <span className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-brand" />
              Tenant isolation
            </span>
            <span className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-brand" />
              Enterprise-ready
            </span>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 2. TRUST BADGES ═══════════════ */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Certifications & Standards
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Built on trusted <span className="text-brand">standards</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            We pursue rigorous, independently verified certifications to ensure your data
            is protected by industry-leading security practices.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRUST_BADGES.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <Card
                key={badge.title}
                variant="light"
                className={cn(
                  "animate-on-scroll text-center group hover:border-theme-h relative overflow-hidden",
                  `stagger-${i + 1}`,
                )}
              >
                <div className="relative z-10">
                  <div
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${BRAND_GREEN}12` }}
                  >
                    <Icon className="h-7 w-7 text-brand" />
                  </div>
                  <h3 className="text-heading-3 text-theme mb-2">{badge.title}</h3>
                  <Chip
                    dotColor={badge.statusColor}
                    className="mx-auto mb-3 text-xs"
                  >
                    {badge.status}
                  </Chip>
                  <p className="text-sm text-theme-s leading-relaxed">{badge.desc}</p>
                </div>
                <div
                  className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"
                  style={{ background: BRAND_GREEN }}
                />
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ═══════════════ 3. CORE SECURITY PRINCIPLES ═══════════════ */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Core Principles
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Security by <span className="text-brand">design</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Every architectural decision starts with security. These are not afterthoughts
            — they are foundational to how Voatomy operates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SECURITY_PRINCIPLES.map((principle, i) => {
            const Icon = principle.icon;
            return (
              <Card
                key={principle.title}
                variant="light"
                className={cn(
                  "animate-on-scroll group hover:border-theme-h relative overflow-hidden",
                  `stagger-${i + 1}`,
                )}
              >
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${BRAND_GREEN}12` }}
                    >
                      <Icon className="h-5 w-5 text-brand" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-heading-3 text-theme mb-2">{principle.title}</h3>
                      <p className="text-sm text-theme-s leading-relaxed mb-3">{principle.desc}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-8 rounded-full bg-brand/30" />
                        <span className="text-xs font-medium text-brand">{principle.highlight}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute -bottom-6 -right-6 h-20 w-20 rounded-full opacity-0 group-hover:opacity-8 transition-opacity duration-500 blur-2xl"
                  style={{ background: BRAND_GREEN }}
                />
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ═══════════════ 4. INFRASTRUCTURE ═══════════════ */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Infrastructure
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Enterprise-grade <span className="text-brand">infrastructure</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Our stack is built for reliability, security, and scale. Every layer
            is designed to protect your data and ensure uptime.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INFRASTRUCTURE_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.label}
                variant="light"
                className={cn(
                  "animate-on-scroll hover:border-theme-h group",
                  `stagger-${i + 1}`,
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${BRAND_GREEN}10` }}
                  >
                    <Icon className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <div className="text-xs text-theme-m font-medium uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-theme mb-0.5">{item.value}</div>
                    <div className="text-xs text-theme-s">{item.detail}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* ═══════════════ 5. DATA FLOW DIAGRAM ═══════════════ */}
      <Section variant="white" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Data Flow
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            How your data <span className="text-brand">flows</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Transparency in every step. Here is exactly what happens when Voatomy
            connects to your repository.
          </p>
        </div>

        <div className="animate-on-scroll">
          {/* Desktop flow (horizontal) */}
          <div className="hidden lg:block">
            <div className="rounded-2xl border border-theme bg-theme-card p-8">
              <div className="flex items-center justify-between gap-2">
                {DATA_FLOW_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isHighlight = i === 2;
                  return (
                    <div key={step.label} className="flex items-center gap-2 flex-1">
                      <div className="flex flex-col items-center text-center flex-1">
                        <div
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-2xl mb-3 transition-all duration-300",
                            isHighlight ? "ring-2 ring-brand/30" : "",
                          )}
                          style={{
                            backgroundColor: isHighlight ? `${BRAND_GREEN}15` : "var(--bg-subtle)",
                          }}
                        >
                          <Icon
                            className="h-6 w-6"
                            style={{ color: isHighlight ? BRAND_GREEN : "var(--text-secondary)" }}
                          />
                        </div>
                        <span className={cn(
                          "text-sm font-medium",
                          isHighlight ? "text-brand" : "text-theme",
                        )}>
                          {step.label}
                        </span>
                        {isHighlight && (
                          <div className="mt-2 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3 text-brand" />
                            <span className="text-[10px] font-bold text-brand uppercase tracking-wider">
                              Source code never stored
                            </span>
                          </div>
                        )}
                      </div>
                      {i < DATA_FLOW_STEPS.length - 1 && (
                        <ChevronRight className="h-5 w-5 text-theme-m flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Annotation bar */}
              <div className="mt-8 pt-6 border-t border-theme">
                <div className="flex items-center justify-center gap-6 text-xs text-theme-m">
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-3 w-3 text-brand" />
                    TLS 1.3 encrypted in transit
                  </span>
                  <span className="h-3 w-px bg-theme" />
                  <span className="flex items-center gap-1.5">
                    <Database className="h-3 w-3 text-brand" />
                    AES-256 encrypted at rest
                  </span>
                  <span className="h-3 w-px bg-theme" />
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-3 w-3 text-brand" />
                    Read-only repository access
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile flow (vertical) */}
          <div className="lg:hidden">
            <div className="rounded-2xl border border-theme bg-theme-card p-6">
              <div className="space-y-1">
                {DATA_FLOW_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isHighlight = i === 2;
                  return (
                    <div key={step.label}>
                      <div className="flex items-center gap-4 py-3">
                        <div
                          className={cn(
                            "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl",
                            isHighlight ? "ring-2 ring-brand/30" : "",
                          )}
                          style={{
                            backgroundColor: isHighlight ? `${BRAND_GREEN}15` : "var(--bg-subtle)",
                          }}
                        >
                          <Icon
                            className="h-5 w-5"
                            style={{ color: isHighlight ? BRAND_GREEN : "var(--text-secondary)" }}
                          />
                        </div>
                        <div>
                          <span className={cn(
                            "text-sm font-medium",
                            isHighlight ? "text-brand" : "text-theme",
                          )}>
                            {step.label}
                          </span>
                          {isHighlight && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <AlertTriangle className="h-3 w-3 text-brand" />
                              <span className="text-[10px] font-bold text-brand uppercase tracking-wider">
                                Source code never stored
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      {i < DATA_FLOW_STEPS.length - 1 && (
                        <div className="ml-5.5 h-4 w-px border-l border-dashed border-theme-h" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-theme flex flex-wrap gap-3 text-xs text-theme-m">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3 w-3 text-brand" />
                  TLS 1.3 in transit
                </span>
                <span className="flex items-center gap-1.5">
                  <Database className="h-3 w-3 text-brand" />
                  AES-256 at rest
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="h-3 w-3 text-brand" />
                  Read-only access
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ 6. COMPLIANCE ROADMAP ═══════════════ */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            Compliance
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Compliance <span className="text-brand">roadmap</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            We are actively pursuing industry-recognized certifications
            to meet the security requirements of enterprise customers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-theme hidden sm:block" />

            <div className="space-y-6">
              {COMPLIANCE_ROADMAP.map((item, i) => {
                const isInProgress = item.status === "in-progress";
                const isPlanned = item.status === "planned";

                return (
                  <div
                    key={item.milestone}
                    className={cn("animate-on-scroll", `stagger-${i + 1}`)}
                  >
                    <Card variant="light" className="hover:border-theme-h sm:ml-14">
                      <div className="flex items-start gap-4">
                        {/* Timeline dot (desktop) */}
                        <div
                          className={cn(
                            "hidden sm:flex absolute left-4 h-5 w-5 items-center justify-center rounded-full border-2",
                            isInProgress
                              ? "border-brand bg-brand/20"
                              : isPlanned
                              ? "border-theme-h bg-theme-s"
                              : "border-theme bg-theme-s",
                          )}
                        >
                          {isInProgress && (
                            <div className="h-2 w-2 rounded-full bg-brand animate-glow-pulse" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h3 className="text-heading-3 text-theme">{item.milestone}</h3>
                            <Chip
                              dotColor={
                                isInProgress ? BRAND_GREEN : isPlanned ? "#f59e0b" : "var(--text-muted)"
                              }
                              className="text-xs"
                            >
                              {item.date}
                            </Chip>
                          </div>
                          <p className="text-sm text-theme-s leading-relaxed">{item.desc}</p>
                        </div>

                        <div className="flex-shrink-0">
                          {isInProgress ? (
                            <div className="flex items-center gap-1 text-xs font-medium text-brand">
                              <Clock className="h-3.5 w-3.5" />
                              In Progress
                            </div>
                          ) : isPlanned ? (
                            <span className="text-xs font-medium text-theme-m">Planned</span>
                          ) : (
                            <span className="text-xs font-medium text-theme-f">Future</span>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════ TICKET VULNERABILITY SCANNER ═══════════════ */}
      <Section variant="sky" className="py-20 sm:py-28">
        <div className="text-center mb-14 animate-on-scroll">
          <Chip dotColor={BRAND_GREEN} className="mb-4 mx-auto">
            PII Protection
          </Chip>
          <h2 className="text-heading-1 text-theme mb-4">
            Ticket <span className="text-brand">Vulnerability Scanner</span>
          </h2>
          <p className="text-body-lg text-theme-s max-w-2xl mx-auto">
            Snyk scans your code for vulnerabilities. We scan your tickets for data leaks.
            Every title, description, and comment is checked for PII, API keys, and sensitive data.
          </p>
        </div>

        {/* 3-step workflow */}
        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {[
            {
              icon: FileSearch,
              step: "1",
              title: "Detect",
              desc: "Regex pre-filter scans every ticket field for potential PII candidates — emails, SSNs, credit cards, API keys, and more.",
            },
            {
              icon: Shield,
              step: "2",
              title: "AI Decides",
              desc: "AI classifies each candidate with full reasoning, assesses severity based on context, and generates specific remediation steps.",
            },
            {
              icon: ShieldCheck,
              step: "3",
              title: "Remediate",
              desc: "One-click AI actions — redact, mask, or replace sensitive data directly in Jira or Linear. Full audit trail preserved.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={item.step} variant="light" className={cn("animate-on-scroll text-center", `stagger-${i + 1}`)}>
                <div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${BRAND_GREEN}10` }}
                >
                  <Icon className="h-6 w-6 text-brand" />
                </div>
                <div className="text-xs font-bold text-brand mb-2">Step {item.step}</div>
                <h3 className="text-heading-3 text-theme mb-2">{item.title}</h3>
                <p className="text-sm text-theme-s leading-relaxed">{item.desc}</p>
              </Card>
            );
          })}
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-on-scroll stagger-4">
          {[
            "13+ PII categories detected",
            "Comment & description scanning",
            "Ownership change tracking",
            "Per-project toggle on/off",
            "48h auto-escalation",
            "Compliance-ready audit trail",
          ].map((feat) => (
            <div key={feat} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-theme bg-theme-card">
              <CheckCircle2 className="h-4 w-4 text-brand flex-shrink-0" />
              <span className="text-sm text-theme">{feat}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ 7. SECURITY CONTACT ═══════════════ */}
      <Section variant="white" container={false} className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-[100px]"
            style={{ background: `radial-gradient(ellipse, ${BRAND_GREEN}, transparent 70%)` }}
          />
        </div>

        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <div className="animate-on-scroll">
            <div
              className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${BRAND_GREEN}15` }}
            >
              <Mail className="h-7 w-7 text-brand" />
            </div>

            <h2 className="text-heading-1 text-theme mb-4">Report a vulnerability</h2>

            <p className="text-body-lg text-theme-s mb-4 max-w-lg mx-auto">
              Found a security vulnerability? We take every report seriously and respond
              within 24 hours. We follow responsible disclosure practices and will work with
              you to resolve any issues promptly.
            </p>

            <p className="text-sm text-theme-m mb-8 max-w-md mx-auto">
              We appreciate the security research community and are committed to recognizing
              contributions that help keep Voatomy and our customers safe.
            </p>
          </div>

          <div className="animate-on-scroll stagger-2">
            <Card variant="light" className="text-center max-w-md mx-auto mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-brand" />
                <span className="text-sm font-semibold text-theme">Security Contact</span>
              </div>
              <a
                href="mailto:security@voatomy.global"
                className="text-brand font-semibold text-lg hover:underline transition-all duration-200"
              >
                security@voatomy.global
              </a>
              <p className="text-xs text-theme-m mt-2">
                Encrypted communication available upon request (PGP)
              </p>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <Link href="/auth/signup">
                  Get Started <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>

            <p className="text-xs text-theme-m mt-6">
              Questions about security? Reach out to our team for a detailed security review or to
              request our SOC 2 readiness documentation.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
