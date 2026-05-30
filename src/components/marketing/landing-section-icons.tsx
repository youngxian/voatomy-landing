"use client";

import * as React from "react";

/* ── ATLAS signal icons (multi-color filled SVGs) ── */

export function SignalCodeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="4" y="4" width="24" height="24" rx="6" fill="#FFF4EF" />
      <path d="M11 12 L8 16 L11 20" stroke="#F05A28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M21 12 L24 16 L21 20" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="18" y1="11" x2="14" y2="21" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SignalCapacityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="12" cy="11" r="4" fill="#22C55E" />
      <circle cx="20" cy="11" r="4" fill="#16A34A" />
      <path d="M6 24 C6 19 9 16 12 16 C14 16 15 17 16 18 C17 17 18 16 20 16 C23 16 26 19 26 24" fill="#4ADE80" />
      <circle cx="16" cy="22" r="2" fill="#15803D" />
    </svg>
  );
}

export function SignalDemandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="5" y="18" width="5" height="9" rx="1.5" fill="#A5B4FC" />
      <rect x="13" y="13" width="5" height="14" rx="1.5" fill="#6366F1" />
      <rect x="21" y="8" width="5" height="19" rx="1.5" fill="#4F46E5" />
      <circle cx="24" cy="7" r="3" fill="#EC4899" />
    </svg>
  );
}

export function SignalDebtIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M16 5 L28 26 H4 Z" fill="#FEF9C3" stroke="#EAB308" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="16" y1="13" x2="16" y2="19" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="16" cy="22" r="1.5" fill="#CA8A04" />
    </svg>
  );
}

export function SignalDesignIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="6" y="6" width="9" height="9" rx="2" fill="#F43F5E" />
      <rect x="17" y="6" width="9" height="9" rx="2" fill="#A855F7" />
      <rect x="6" y="17" width="9" height="9" rx="2" fill="#8B5CF6" />
      <circle cx="21.5" cy="21.5" r="4.5" fill="#C084FC" />
    </svg>
  );
}

export function SignalRevenueIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="11" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1.5" />
      <text x="16" y="21" textAnchor="middle" fill="#DB2777" fontSize="14" fontWeight="800">
        $
      </text>
      <path d="M8 10 L12 8 M24 10 L20 8" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export const SIGNAL_ICON_SET = [
  SignalCodeIcon,
  SignalCapacityIcon,
  SignalDemandIcon,
  SignalDebtIcon,
  SignalDesignIcon,
  SignalRevenueIcon,
] as const;

export const SIGNAL_GRADIENTS = [
  "linear-gradient(135deg, #FFF4EF 0%, #FFEDD5 100%)",
  "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
  "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
  "linear-gradient(135deg, #FEFCE8 0%, #FEF9C3 100%)",
  "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",
  "linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)",
] as const;

/* ── Security feature icons ── */

export function SecLockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="10" y="14" width="12" height="11" rx="2" fill="#004838" />
      <path d="M12 14 V11 C12 8.8 13.8 7 16 7 C18.2 7 20 8.8 20 11 V14" stroke="#073127" strokeWidth="2" fill="none" />
      <circle cx="16" cy="19" r="2" fill="#e6fff0" />
    </svg>
  );
}

export function SecShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M16 4 L26 8 V15 C26 21 21.5 25.5 16 28 C10.5 25.5 6 21 6 15 V8 Z" fill="#0EA5E9" />
      <path d="M12 16 L15 19 L21 13" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function SecTenantIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="5" y="8" width="10" height="18" rx="2" fill="#073127" />
      <rect x="17" y="8" width="10" height="18" rx="2" fill="#004838" opacity="0.7" />
      <line x1="15" y1="8" x2="15" y2="26" stroke="#EF4444" strokeWidth="2" strokeDasharray="2 2" />
    </svg>
  );
}

export function SecSocIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="11" fill="#e6fff0" stroke="#004838" strokeWidth="2" />
      <path d="M11 16 L14.5 19.5 L21 13" stroke="#004838" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function SecScanIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="6" y="8" width="20" height="16" rx="3" fill="#FFF4EF" stroke="#F05A28" strokeWidth="1.5" />
      <line x1="6" y1="14" x2="26" y2="14" stroke="#F05A28" strokeWidth="1.5" opacity="0.5" />
      <circle cx="22" cy="19" r="4" fill="#EF4444" />
      <line x1="20" y1="17" x2="24" y2="21" stroke="#fff" strokeWidth="1.5" />
      <line x1="24" y1="17" x2="20" y2="21" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

export const SECURITY_ICON_SET = [SecLockIcon, SecShieldIcon, SecTenantIcon, SecSocIcon, SecScanIcon] as const;

export const SECURITY_GRADIENTS = [
  "linear-gradient(135deg, #e6fff0 0%, #b3ffd6 100%)",
  "linear-gradient(135deg, #F0F9FF 0%, #BAE6FD 100%)",
  "linear-gradient(135deg, #EBEDE8 0%, #D1D5DB 100%)",
  "linear-gradient(135deg, #e6fff0 0%, #86efac 100%)",
  "linear-gradient(135deg, #FFF4EF 0%, #FED7AA 100%)",
] as const;

/* ── Platform bucket icons ── */

export function BucketPlanIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="11" fill="#e6fff0" stroke="#004838" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="7" fill="none" stroke="#004838" strokeWidth="1.5" opacity="0.5" />
      <circle cx="16" cy="16" r="3" fill="#004838" />
    </svg>
  );
}

export function BucketOrganizeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path d="M6 10 H26 V24 H6 Z" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
      <path d="M6 10 H26" stroke="#2563EB" strokeWidth="2" />
      <rect x="9" y="14" width="14" height="2" rx="1" fill="#3B82F6" opacity="0.4" />
      <rect x="9" y="18" width="10" height="2" rx="1" fill="#60A5FA" />
    </svg>
  );
}

export function BucketScaleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="10" cy="18" r="4" fill="#F05A28" />
      <circle cx="22" cy="12" r="4" fill="#FB923C" />
      <path d="M14 16 Q18 10 18 14" stroke="#EA580C" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M18 14 Q20 8 22 12" stroke="#F97316" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function BucketInsightsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <rect x="5" y="20" width="4" height="8" rx="1" fill="#C4B5FD" />
      <rect x="12" y="14" width="4" height="14" rx="1" fill="#8B5CF6" />
      <rect x="19" y="8" width="4" height="20" rx="1" fill="#7C3AED" />
      <path d="M7 12 L16 8 L25 4" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
    </svg>
  );
}

export const BUCKET_ICON_SET = [BucketPlanIcon, BucketOrganizeIcon, BucketScaleIcon, BucketInsightsIcon] as const;

export const BUCKET_GRADIENTS = [
  "linear-gradient(135deg, #e6fff0 0%, #86efac 100%)",
  "linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 100%)",
  "linear-gradient(135deg, #FFF4EF 0%, #FDBA74 100%)",
  "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)",
] as const;

/* ── Compliance badge icons ── */

export function ComplianceSocIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 2 L20 5 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V5 Z" fill="#004838" />
      <path d="M9 11 L11 13 L15 9" stroke="#e6fff0" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function ComplianceGdprIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" fill="#0EA5E9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="#fff" strokeWidth="1.5" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

export function ComplianceHipaaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="4" y="6" width="16" height="14" rx="3" fill="#F05A28" />
      <rect x="10" y="3" width="4" height="6" rx="1" fill="#EA580C" />
      <line x1="12" y1="10" x2="12" y2="16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <line x1="9" y1="13" x2="15" y2="13" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ComplianceAesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="6" y="10" width="12" height="10" rx="2" fill="#073127" />
      <path d="M8 10 V8 C8 6 9.5 4.5 12 4.5 C14.5 4.5 16 6 16 8 V10" stroke="#004838" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="15" r="1.5" fill="#e6fff0" />
    </svg>
  );
}

export function SecHeroIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 4 L34 9 V19 C34 27 28 33 20 36 C12 33 6 27 6 19 V9 Z" fill="#004838" />
      <path d="M20 4 L34 9 V19 C34 27 28 33 20 36 C12 33 6 27 6 19 V9 Z" fill="url(#sec-hero-grad)" />
      <path d="M16 19 L18.5 21.5 L25 15" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <defs>
        <linearGradient id="sec-hero-grad" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#004838" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AtlasHeroIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="16" fill="url(#atlas-hero-grad)" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const x = 20 + Math.cos(a) * 10;
        const y = 20 + Math.sin(a) * 10;
        const colors = ["#F05A28", "#22C55E", "#6366F1", "#EAB308", "#8B5CF6", "#EC4899"];
        return <circle key={i} cx={x} cy={y} r="2.5" fill={colors[i]} />;
      })}
      <circle cx="20" cy="20" r="5" fill="#fff" />
      <circle cx="20" cy="20" r="2.5" fill="#004838" />
      <defs>
        <linearGradient id="atlas-hero-grad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF4EF" />
          <stop offset="1" stopColor="#e6fff0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PlatformHeroIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="6" y="6" width="12" height="12" rx="3" fill="#004838" />
      <rect x="22" y="6" width="12" height="12" rx="3" fill="#3B82F6" />
      <rect x="6" y="22" width="12" height="12" rx="3" fill="#F05A28" />
      <rect x="22" y="22" width="12" height="12" rx="3" fill="#8B5CF6" />
      <circle cx="20" cy="20" r="3" fill="#fff" stroke="#111827" strokeWidth="1" />
    </svg>
  );
}

/* ── Voatomy product icons (re-export logo marks) ── */

export {
  AtlasLogoMark as ProductAtlasIcon,
  LoopLogoMark as ProductLoopIcon,
  SignalLogoMark as ProductSignalIcon,
  DriftLogoMark as ProductDriftIcon,
  PhantomLogoMark as ProductPhantomIcon,
  NexusLogoMark as ProductNexusIcon,
  PRODUCT_LOGO_SET,
  ProductLogoMark,
} from "@/components/icons/product-logos";

import {
  AtlasLogoMark,
  LoopLogoMark,
  SignalLogoMark,
  DriftLogoMark,
  PhantomLogoMark,
  NexusLogoMark,
} from "@/components/icons/product-logos";

export const PRODUCT_ICON_SET = {
  atlas: AtlasLogoMark,
  loop: LoopLogoMark,
  signal: SignalLogoMark,
  drift: DriftLogoMark,
  phantom: PhantomLogoMark,
  nexus: NexusLogoMark,
} as const;

export const PRODUCT_GRADIENTS: Record<string, string> = {
  atlas: "linear-gradient(135deg, #FFF4EF 0%, #FDBA74 100%)",
  loop: "linear-gradient(135deg, #EEF2FF 0%, #C7D2FE 100%)",
  signal: "linear-gradient(135deg, #FEE2E2 0%, #FCA5A5 100%)",
  drift: "linear-gradient(135deg, #F5F3FF 0%, #DDD6FE 100%)",
  phantom: "linear-gradient(135deg, #ECFEFF 0%, #A5F3FC 100%)",
  nexus: "linear-gradient(135deg, #e6fff0 0%, #BAE6FD 50%, #EDE9FE 100%)",
};

export const PRODUCT_FLOW_LABELS: Record<string, string> = {
  atlas: "Sprint plans",
  loop: "Revenue signals",
  signal: "Incidents",
  drift: "Design scope",
  phantom: "Tech debt",
  nexus: "Org intelligence",
};
