"use client";

/** Hand-drawn style tier icons — Fynk pricing card pattern */

export function StarterTierDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 72" className={className} aria-hidden fill="none">
      {/* blue bird */}
      <ellipse cx="38" cy="38" rx="14" ry="11" fill="#3B82F6" stroke="#111827" strokeWidth="1.5" />
      <circle cx="44" cy="34" r="2" fill="#111827" />
      <path d="M48 36 L58 32 L52 40 Z" fill="#2563EB" stroke="#111827" strokeWidth="1" />
      <path d="M28 42 Q22 48 26 52" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
      {/* envelope */}
      <rect x="48" y="44" width="24" height="18" rx="2" fill="#FFFFFF" stroke="#111827" strokeWidth="1.5" />
      <path d="M48 44 L60 54 L72 44" stroke="#111827" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M48 62 L60 52 L72 62" stroke="#93C5FD" strokeWidth="1" />
    </svg>
  );
}

export function ProTierDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 72" className={className} aria-hidden fill="none">
      {/* stacked folders */}
      <path d="M18 48 L18 28 Q18 24 22 24 L34 24 L38 20 L58 20 Q62 20 62 24 L62 48 Z" fill="#F97316" stroke="#111827" strokeWidth="1.5" />
      <path d="M14 52 L14 32 Q14 28 18 28 L30 28 L34 24 L52 24 Q56 24 56 28 L56 52 Z" fill="#FB923C" stroke="#111827" strokeWidth="1.5" opacity="0.85" />
      {/* arrow up */}
      <path d="M38 14 L38 26 M38 14 L32 20 M38 14 L44 20" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BusinessTierDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 72" className={className} aria-hidden fill="none">
      {/* books */}
      <rect x="22" y="46" width="36" height="8" rx="1" fill="#92400E" stroke="#111827" strokeWidth="1.5" />
      <rect x="24" y="38" width="32" height="8" rx="1" fill="#B45309" stroke="#111827" strokeWidth="1.5" />
      {/* trophy */}
      <path d="M40 12 L34 22 L46 22 Z" fill="#FBBF24" stroke="#111827" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="36" y="22" width="8" height="10" fill="#F59E0B" stroke="#111827" strokeWidth="1.5" />
      <path d="M34 22 Q28 22 28 28 Q28 32 32 32" stroke="#111827" strokeWidth="1.5" fill="none" />
      <path d="M46 22 Q52 22 52 28 Q52 32 48 32" stroke="#111827" strokeWidth="1.5" fill="none" />
      <rect x="37" y="32" width="6" height="6" fill="#D97706" stroke="#111827" strokeWidth="1" />
      <path d="M34 38 L46 38" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function EnterpriseTierDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 72" className={className} aria-hidden fill="none">
      {/* rocket */}
      <path d="M40 8 Q48 24 44 44 L36 44 Q32 24 40 8Z" fill="#EC4899" stroke="#111827" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="40" cy="28" r="4" fill="#FBCFE8" stroke="#111827" strokeWidth="1" />
      <path d="M36 44 L28 56 L36 50 Z" fill="#A855F7" stroke="#111827" strokeWidth="1.5" />
      <path d="M44 44 L52 56 L44 50 Z" fill="#A855F7" stroke="#111827" strokeWidth="1.5" />
      <path d="M34 48 L46 48 L44 58 L36 58 Z" fill="#6366F1" stroke="#111827" strokeWidth="1.5" />
      {/* flame */}
      <path d="M38 58 Q40 64 42 58" fill="#F97316" stroke="#111827" strokeWidth="1" />
    </svg>
  );
}

const TIER_DOODLE_MAP = {
  Starter: StarterTierDoodle,
  Pro: ProTierDoodle,
  Business: BusinessTierDoodle,
  Enterprise: EnterpriseTierDoodle,
} as const;

export function PricingTierDoodle({ tierName, className }: { tierName: string; className?: string }) {
  const Doodle = TIER_DOODLE_MAP[tierName as keyof typeof TIER_DOODLE_MAP] ?? StarterTierDoodle;
  return <Doodle className={className} />;
}
