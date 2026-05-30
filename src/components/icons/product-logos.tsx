import * as React from "react";
import { cn } from "@/lib/utils";

type LogoProps = { className?: string };

/** ATLAS — compass sprint planner mark */
export function AtlasLogoMark({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect x="2" y="2" width="36" height="36" rx="10" fill="#FFF4EF" />
      <circle cx="20" cy="20" r="11" stroke="#f16e2c" strokeWidth="2" fill="none" />
      <circle cx="20" cy="20" r="4" fill="#f16e2c" />
      <path d="M20 6v4M20 30v4M6 20h4M30 20h4" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 14l2 4h-4l2-4z" fill="#fff" stroke="#f16e2c" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

/** LOOP — revenue feedback loop mark */
export function LoopLogoMark({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect x="2" y="2" width="36" height="36" rx="10" fill="#EEF2FF" />
      <path
        d="M28 14a10 10 0 1 0-2.5 7.2"
        stroke="#6366F1"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M28 14v-3h3" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12 26a10 10 0 1 0 2.5-7.2"
        stroke="#818CF8"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M12 26v3H9" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="20" r="3.5" fill="#4F46E5" />
      <path d="M17 20h6M20 17v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

/** SIGNAL — incident radar mark */
export function SignalLogoMark({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect x="2" y="2" width="36" height="36" rx="10" fill="#FEE2E2" />
      <path d="M20 32V22" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 22c-4 0-7-3-7-7" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M20 22c6 0 10-4 10-10" stroke="#FCA5A5" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="20" cy="22" r="3" fill="#DC2626" />
      <circle cx="30" cy="10" r="5" fill="#EF4444" />
      <path d="M30 7.5v5M27.5 10h5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** DRIFT — design-system sync mark */
export function DriftLogoMark({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect x="2" y="2" width="36" height="36" rx="10" fill="#F5F3FF" />
      <rect x="8" y="10" width="14" height="14" rx="3" fill="#A855F7" />
      <rect x="18" y="16" width="14" height="14" rx="3" fill="#8B5CF6" fillOpacity="0.85" />
      <path
        d="M15 17h4M17 15v4"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="25" cy="23" r="2.5" fill="#fff" fillOpacity="0.9" />
      <path d="M22 28h8" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

/** PHANTOM — tech-debt radar mark */
export function PhantomLogoMark({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect x="2" y="2" width="36" height="36" rx="10" fill="#ECFEFF" />
      <path
        d="M20 8c7 0 12 5 12 12 0 4-2 7-5 9 1-2 1-4 0-6-2 0-4-1-5-3-1 2-3 3-5 3-1 2-3 3-5 3-1 2-1 4 0 6-3-2-5-5-5-9 0-7 5-12 12-12z"
        fill="#A5F3FC"
        stroke="#0891B2"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="17" r="1.8" fill="#0E7490" />
      <circle cx="25" cy="17" r="1.8" fill="#0E7490" />
      <rect x="14" y="22" width="3" height="5" rx="1" fill="#0891B2" />
      <rect x="18.5" y="20" width="3" height="7" rx="1" fill="#06B6D4" />
      <rect x="23" y="23" width="3" height="4" rx="1" fill="#0891B2" />
    </svg>
  );
}

/** NEXUS — organizational nerve-center mark */
export function NexusLogoMark({ className }: LogoProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#nexus-logo-bg)" />
      <circle cx="20" cy="20" r="3" fill="#fff" />
      <circle cx="20" cy="20" r="1.5" fill="#F05A28" />
      <circle cx="12" cy="14" r="2.5" fill="#fff" fillOpacity="0.95" />
      <circle cx="28" cy="14" r="2.5" fill="#fff" fillOpacity="0.95" />
      <circle cx="14" cy="28" r="2.5" fill="#fff" fillOpacity="0.95" />
      <circle cx="26" cy="27" r="2.5" fill="#fff" fillOpacity="0.95" />
      <line x1="20" y1="20" x2="12" y2="14" stroke="#fff" strokeWidth="1.2" opacity="0.7" />
      <line x1="20" y1="20" x2="28" y2="14" stroke="#fff" strokeWidth="1.2" opacity="0.7" />
      <line x1="20" y1="20" x2="14" y2="28" stroke="#fff" strokeWidth="1.2" opacity="0.7" />
      <line x1="20" y1="20" x2="26" y2="27" stroke="#fff" strokeWidth="1.2" opacity="0.7" />
      <defs>
        <linearGradient id="nexus-logo-bg" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F05A28" />
          <stop offset="0.55" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export type ProductLogoKey = "atlas" | "loop" | "signal" | "drift" | "phantom" | "nexus";

export const PRODUCT_LOGO_SET: Record<ProductLogoKey, React.ComponentType<LogoProps>> = {
  atlas: AtlasLogoMark,
  loop: LoopLogoMark,
  signal: SignalLogoMark,
  drift: DriftLogoMark,
  phantom: PhantomLogoMark,
  nexus: NexusLogoMark,
};

export function ProductLogoMark({
  product,
  className,
}: {
  product: ProductLogoKey | string;
  className?: string;
}) {
  const Logo = PRODUCT_LOGO_SET[product as ProductLogoKey] ?? AtlasLogoMark;
  return <Logo className={className} />;
}
