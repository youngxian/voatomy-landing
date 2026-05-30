"use client";

import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SECURITY_FEATURES } from "@/lib/constants";
import { FileSearch, KeyRound, ClipboardCheck, BookOpen } from "lucide-react";
import {
  FynkDisplayHeading,
  FynkGradientBackdrop,
  FynkHeadingUnderlineAccent,
  FynkReveal,
  FynkSubheading,
} from "@/components/marketing/fynk-primitives";
import { ColoredIconBadge, ColoredIconPill } from "@/components/marketing/colored-icon-badge";
import {
  SECURITY_GRADIENTS,
  SECURITY_ICON_SET,
  ComplianceSocIcon,
  ComplianceGdprIcon,
  ComplianceHipaaIcon,
  ComplianceAesIcon,
} from "@/components/marketing/landing-section-icons";
import { BrandIcon } from "@/components/icons/brand-icons";

const BRAND = "#004838";
const BRAND_LIGHT = "#e6fff0";
const INK = "#111827";

const CHIP_ICONS = [
  { label: "Read-only API", Icon: KeyRound, bg: BRAND_LIGHT, color: BRAND },
  { label: "No code storage", Icon: ClipboardCheck, bg: "#FEF2F2", color: "#DC2626" },
  { label: "Audit logs", Icon: BookOpen, bg: "#F0F9FF", color: "#0EA5E9" },
  { label: "RBAC", Icon: FileSearch, bg: "#FFF4EF", color: "#F05A28" },
] as const;

const COMPLIANCE_BADGES = [
  { label: "SOC 2", sub: "Aligned", bg: BRAND_LIGHT, color: BRAND, Icon: ComplianceSocIcon },
  { label: "GDPR", sub: "Ready", bg: "#F0F9FF", color: "#0EA5E9", Icon: ComplianceGdprIcon },
  { label: "HIPAA", sub: "Aligned", bg: "#FFF4EF", color: "#F05A28", Icon: ComplianceHipaaIcon },
  { label: "AES-256", sub: "At rest", bg: "#EBEDE8", color: "#073127", Icon: ComplianceAesIcon },
] as const;

function SecurityVaultIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-fynk-border bg-white p-6 shadow-[0_20px_50px_rgba(0,72,56,0.08)] sm:p-8">
        <span
          className="pointer-events-none absolute left-5 top-4 z-10 max-w-[50%] -rotate-6 font-handwriting text-[1.15rem] font-bold leading-tight text-brand sm:left-6 sm:top-5 sm:text-[1.35rem]"
          aria-hidden
        >
          metadata only
        </span>
        <span
          className="pointer-events-none absolute bottom-5 right-5 z-10 max-w-[50%] rotate-3 text-right font-handwriting text-[1.05rem] font-bold leading-tight text-fynk-orange sm:bottom-6 sm:right-6 sm:text-[1.25rem]"
          aria-hidden
        >
          zero code storage
        </span>

        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,72,56,0.06), transparent 70%)",
          }}
          aria-hidden
        />

        <svg viewBox="0 0 360 220" className="relative mt-8 h-auto w-full sm:mt-10" aria-hidden>
          <rect x="24" y="48" width="96" height="72" rx="10" fill="#fff" stroke={INK} strokeWidth="2" />
          <foreignObject x="32" y="58" width="24" height="24">
            <div className="flex h-6 w-6 items-center justify-center">
              <BrandIcon name="GitHub" size={22} colored />
            </div>
          </foreignObject>
          <text x="60" y="72" fill={INK} fontSize="10" fontWeight="700">
            your-repo
          </text>
          <rect x="36" y="84" width="72" height="5" rx="2.5" fill="#E5E7EB" />
          <rect x="36" y="96" width="56" height="5" rx="2.5" fill="#E5E7EB" />
          <rect x="36" y="108" width="64" height="5" rx="2.5" fill={BRAND} opacity="0.35" />

          <path d="M130 84 H168" stroke={BRAND} strokeWidth="2" strokeDasharray="4 3" />
          <polygon points="168,84 160,79 160,89" fill={BRAND} />
          <text x="149" y="76" textAnchor="middle" fill={BRAND} fontSize="8" fontWeight="700">
            read-only
          </text>

          <path
            d="M210 52 L248 64 V96 C248 114 232 126 210 132 C188 126 172 114 172 96 V64 Z"
            fill={BRAND_LIGHT}
            stroke={INK}
            strokeWidth="2"
          />
          <rect x="198" y="88" width="24" height="20" rx="3" fill="#004838" />
          <circle cx="210" cy="98" r="2" fill="#e6fff0" />

          <rect x="268" y="40" width="72" height="28" rx="6" fill="#e6fff0" stroke={BRAND} strokeWidth="1.5" />
          <text x="304" y="58" textAnchor="middle" fill={BRAND} fontSize="8" fontWeight="700">
            complexity
          </text>
          <rect x="268" y="78" width="72" height="28" rx="6" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="1.5" />
          <text x="304" y="96" textAnchor="middle" fill="#0EA5E9" fontSize="8" fontWeight="700">
            dependencies
          </text>
          <rect x="268" y="116" width="72" height="28" rx="6" fill="#FFF4EF" stroke="#F05A28" strokeWidth="1.5" />
          <text x="304" y="134" textAnchor="middle" fill="#F05A28" fontSize="8" fontWeight="700">
            velocity
          </text>

          <rect x="24" y="148" width="140" height="44" rx="8" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="34" y1="158" x2="154" y2="182" stroke="#EF4444" strokeWidth="2" />
          <line x1="154" y1="158" x2="34" y2="182" stroke="#EF4444" strokeWidth="2" />
          <text x="94" y="176" textAnchor="middle" fill="#991B1B" fontSize="9" fontWeight="700">
            source code never stored
          </text>

          {[
            { x: 190, y: 168, t: "TLS 1.3", c: BRAND },
            { x: 268, y: 168, t: "AES-256", c: "#073127" },
            { x: 190, y: 198, t: "SOC 2", c: "#0EA5E9" },
          ].map(({ x, y, t, c }) => (
            <g key={t}>
              <rect x={x} y={y} width="56" height="22" rx="5" fill={c} />
              <text x={x + 28} y={y + 14} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">
                {t}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

export function SecuritySection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="light-surface-typography relative overflow-hidden bg-fynk-surface-alt px-4 py-20 sm:py-28">
      <FynkGradientBackdrop intensity="soft" />

      <div ref={ref} className="relative z-[1] mx-auto max-w-container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <FynkReveal visible={isVisible} direction="left">
            <FynkDisplayHeading>
              Your code never leaves your repos.{" "}
              <FynkHeadingUnderlineAccent variant="brand">Period.</FynkHeadingUnderlineAccent>
            </FynkDisplayHeading>
            <FynkSubheading className="mt-5 text-left lg:mx-0">
              Read-only access. Metadata-only analysis. Enterprise-grade encryption — designed so
              your security team says yes on the first review, not after three rounds of exceptions.
            </FynkSubheading>

            <div className="mt-8 flex flex-wrap gap-2">
              {CHIP_ICONS.map(({ label, Icon, bg, color }) => (
                <ColoredIconPill
                  key={label}
                  label={label}
                  bg={bg}
                  color={color}
                  icon={<Icon className="h-3 w-3" style={{ color }} strokeWidth={2.5} />}
                />
              ))}
            </div>
          </FynkReveal>

          <FynkReveal visible={isVisible} direction="right">
            <SecurityVaultIllustration />
          </FynkReveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECURITY_FEATURES.map((feature, i) => {
            const IconSvg = SECURITY_ICON_SET[i] ?? SECURITY_ICON_SET[0];
            const gradient = SECURITY_GRADIENTS[i] ?? SECURITY_GRADIENTS[0];

            return (
              <article
                key={feature.title}
                className={cn(
                  "group relative overflow-hidden rounded-[1.5rem] border border-fynk-border bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                )}
                style={{ transitionDelay: isVisible ? `${200 + i * 70}ms` : "0ms" }}
              >
                <div className="relative flex items-start gap-4">
                  <ColoredIconBadge size="md" bg={gradient} ringColor="rgba(255,255,255,0.9)">
                    <IconSvg className="h-6 w-6" />
                  </ColoredIconBadge>
                  <div>
                    <h3 className="font-heading text-lg font-bold leading-snug text-fynk-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-fynk-muted">{feature.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div
          className={cn(
            "mt-12 overflow-hidden rounded-[1.75rem] border border-fynk-border bg-white p-8 shadow-sm transition-all duration-700 sm:p-10",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
          )}
          style={{ transitionDelay: isVisible ? "600ms" : "0ms" }}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-fynk-muted">
                Trusted frameworks
              </p>
              <p className="mt-2 font-heading text-lg font-bold text-fynk-ink sm:text-xl">
                Compliance your procurement team expects.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {COMPLIANCE_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="flex min-w-[96px] flex-col items-center gap-2 rounded-2xl border border-fynk-border px-5 py-4 transition-all hover:-translate-y-1 hover:shadow-md"
                  style={{ backgroundColor: badge.bg }}
                >
                  <badge.Icon className="h-8 w-8" />
                  <span className="font-heading text-lg font-bold sm:text-xl" style={{ color: badge.color }}>
                    {badge.label}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-fynk-muted">
                    {badge.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-fynk-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <ColoredIconBadge size="md" bg={SECURITY_GRADIENTS[0]} ringColor="rgba(255,255,255,0.9)">
                <ComplianceSocIcon className="h-5 w-5" />
              </ColoredIconBadge>
              <div>
                <span className="font-heading text-sm font-bold text-fynk-ink">Built for audit confidence</span>
                <p className="text-xs text-fynk-muted">Controls, evidence, runbooks, checklists</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Controls", "Evidence", "Runbooks", "Checklists"].map((w) => (
                <span
                  key={w}
                  className="rounded-full border border-brand/15 bg-brand-light px-4 py-1.5 text-xs font-semibold text-brand"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
