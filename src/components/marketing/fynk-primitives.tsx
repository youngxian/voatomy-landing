"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FYNK, FYNK_AVATAR_COLORS } from "@/lib/fynk-theme";
import { Star } from "lucide-react";

/* ── Section label (Customers, Solutions, Boost…) ── */
export function FynkEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-xs font-bold uppercase tracking-[0.12em] text-fynk-muted sm:text-sm sm:tracking-[0.14em]", className)}>
      {children}
    </p>
  );
}

/* ── Large section heading ── */
export function FynkHeading({
  children,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-heading font-bold text-balance text-heading-2 sm:text-heading-1",
        "!text-fynk-ink",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function FynkSubheading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("mx-auto max-w-3xl text-body-base text-fynk-muted sm:text-body-lg lg:text-body-xl", className)}>{children}</p>
  );
}

/** Shared scale for landing section titles — keep font size & line height in sync site-wide. */
export const FYNK_SECTION_TITLE_CLASSES =
  "font-heading text-balance font-bold leading-[0.92] tracking-[-0.03em] text-[1.75rem] sm:leading-[0.88] sm:tracking-[-0.035em] sm:text-[2.25rem] md:text-[2.875rem] lg:text-[3.375rem]";

/** Large display headline — Labil Grotesk, tight tracking */
export function FynkDisplayHeading({
  children,
  className,
  align = "left",
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        FYNK_SECTION_TITLE_CLASSES,
        align === "center" && "mx-auto max-w-5xl text-center",
        "!text-fynk-ink",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Gradient accent span for display headlines */
export function FynkHeadingAccent({
  children,
  className,
  variant = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "brand" | "warm" | "violet";
}) {
  const gradient =
    variant === "warm"
      ? "bg-gradient-to-r from-fynk-orange via-[#FB923C] to-[#FBBF24] bg-clip-text text-transparent"
      : variant === "violet"
        ? "bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-brand bg-clip-text text-transparent"
        : "bg-gradient-to-r from-brand via-[#0d9488] to-[#14b8a6] bg-clip-text text-transparent";

  return <span className={cn(gradient, className)}>{children}</span>;
}

/** Display-headline accent with fynk-style marker underline (Period., More shipping., etc.) */
export type FynkHeadingAccentVariant =
  | "brand"
  | "warm"
  | "violet"
  | "inverse"
  | "rose"
  | "teal"
  | "amber"
  | "sky"
  | "indigo";

const FYNK_HEADING_ACCENT_STYLES: Record<
  FynkHeadingAccentVariant,
  { text: string; underline: string }
> = {
  inverse: {
    text: "text-white",
    underline: "bg-gradient-to-r from-white/55 via-white/40 to-white/30",
  },
  warm: {
    text: "bg-gradient-to-r from-fynk-orange via-[#FB923C] to-[#FBBF24] bg-clip-text text-transparent",
    underline: "bg-gradient-to-r from-fynk-orange/45 via-fynk-orange/30 to-amber-400/40",
  },
  brand: {
    text: "text-brand",
    underline: "bg-gradient-to-r from-brand/40 via-teal-500/30 to-fynk-orange/35",
  },
  violet: {
    text: "bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-brand bg-clip-text text-transparent",
    underline: "bg-gradient-to-r from-indigo-400/40 via-violet-500/30 to-brand/30",
  },
  rose: {
    text: "bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#FB7185] bg-clip-text text-transparent",
    underline: "bg-gradient-to-r from-pink-400/45 via-rose-400/35 to-fuchsia-400/30",
  },
  teal: {
    text: "bg-gradient-to-r from-[#0D9488] via-[#14B8A6] to-[#2DD4BF] bg-clip-text text-transparent",
    underline: "bg-gradient-to-r from-teal-500/40 via-emerald-400/30 to-cyan-400/35",
  },
  amber: {
    text: "bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#FBBF24] bg-clip-text text-transparent",
    underline: "bg-gradient-to-r from-amber-500/45 via-orange-400/30 to-yellow-400/35",
  },
  sky: {
    text: "bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent",
    underline: "bg-gradient-to-r from-blue-500/45 via-sky-400/35 to-indigo-400/30",
  },
  indigo: {
    text: "bg-gradient-to-r from-[#4338CA] via-[#6366F1] to-[#818CF8] bg-clip-text text-transparent",
    underline: "bg-gradient-to-r from-indigo-500/45 via-violet-500/30 to-blue-400/35",
  },
};

export function FynkHeadingUnderlineAccent({
  children,
  className,
  variant = "warm",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: FynkHeadingAccentVariant;
}) {
  const { text: accentText, underline } = FYNK_HEADING_ACCENT_STYLES[variant];

  return (
    <span className={cn("relative inline-block px-[0.05em]", className)}>
      <span className={cn("relative z-10", accentText)}>{children}</span>
      <span
        aria-hidden
        className={cn(
          "absolute bottom-[0.06em] left-[-0.04em] right-[-0.04em] z-0 h-[0.18em] min-h-[5px] max-h-[14px] -skew-y-1 rounded-[2px]",
          underline,
        )}
      />
    </span>
  );
}

/* ── Hero avatar pills (fynk Jen / Tom / Sue pattern) ── */
export function FynkAvatarPills({
  labels,
  className,
}: {
  labels: readonly string[];
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center justify-center gap-2 sm:gap-3", className)}>
      {labels.map((label, i) => {
        const c = FYNK_AVATAR_COLORS[i % FYNK_AVATAR_COLORS.length];
        return (
          <span
            key={label}
            className="inline-flex h-10 w-10 animate-float-slow items-center justify-center rounded-full text-xs font-bold shadow-md sm:h-12 sm:w-12 sm:text-sm"
            style={{
              backgroundColor: c.bg,
              color: c.text,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {label}
          </span>
        );
      })}
    </span>
  );
}

/* ── Inline overlapping avatar cluster (the actual fynk hero pattern) ── */
/**
 * A static cluster of 3 small overlapping circular avatars rendered INLINE
 * with the surrounding headline text, sized to baseline-align with the
 * h1 cap-height. Avatars are deterministic SVGs (no external image deps).
 */
export function FynkInlineAvatarCluster({
  seeds,
  className,
  size = "md",
}: {
  seeds: readonly string[];
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dim =
    size === "lg"
      ? "h-[0.88em] w-[0.88em] min-h-8 min-w-8 sm:min-h-12 sm:min-w-12 md:min-h-14 md:min-w-14 lg:min-h-16 lg:min-w-16"
      : size === "sm"
        ? "h-7 w-7 sm:h-9 sm:w-9"
        : "h-10 w-10 sm:h-14 sm:w-14";
  const overlap = size === "lg" ? "-ml-4" : size === "sm" ? "-ml-2" : "-ml-3";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center align-middle",
        "-translate-y-[0.06em]",
        className,
      )}
      aria-hidden
    >
      {seeds.map((seed, i) => {
        const palette = FYNK_AVATAR_COLORS[i % FYNK_AVATAR_COLORS.length];
        return (
          <span
            key={`${seed}-${i}`}
            className={cn(
              "relative inline-flex items-center justify-center overflow-hidden rounded-full ring-[3px] ring-white shadow-md transition-transform hover:translate-y-[-2px]",
              dim,
              i > 0 && overlap,
            )}
            style={{
              backgroundColor: palette.bg,
              color: palette.text,
              zIndex: seeds.length - i,
            }}
          >
            {/* dicebear notionists SVG — deterministic per seed, no network image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${palette.bg.replace("#", "")}`}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </span>
        );
      })}
    </span>
  );
}

/* ── Inline mini document/spark icon (fynk's tiny doc inline with text) ── */
export function FynkInlineDocIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center align-middle",
        "-translate-y-[0.06em]",
        className,
      )}
      aria-hidden
    >
      <span className="grid h-[0.88em] w-[0.88em] min-h-8 min-w-8 place-items-center rounded-xl bg-white shadow-md ring-1 ring-fynk-border sm:min-h-12 sm:min-w-12 md:min-h-14 md:min-w-14 lg:min-h-16 lg:min-w-16">
        <svg viewBox="0 0 24 24" fill="none" className="h-[0.42em] w-[0.42em] min-h-[1.125rem] min-w-[1.125rem] sm:min-h-6 sm:min-w-6 md:min-h-7 md:min-w-7 lg:min-h-8 lg:min-w-8">
          <rect x="5" y="3" width="14" height="18" rx="2" className="fill-fynk-surface-alt stroke-fynk-ink" strokeWidth="1.5" />
          <line x1="8" y1="8" x2="16" y2="8" className="stroke-fynk-ink" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="11.5" x2="16" y2="11.5" className="stroke-fynk-ink" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="15" x2="13" y2="15" className="stroke-fynk-ink" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="19" cy="6" r="2" className="fill-fynk-orange" />
        </svg>
      </span>
    </span>
  );
}

/* ── Small event/webinar pill that sits above the hero headline ── */
export function FynkEventPill({
  href,
  icon = "calendar",
  children,
  className,
}: {
  href: string;
  icon?: "calendar" | "spark";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex max-w-[min(100%,18.5rem)] items-center gap-1 rounded-full border border-fynk-border bg-white/80 px-2.5 py-1 text-[10px] font-bold leading-snug text-fynk-ink shadow-sm backdrop-blur transition-all hover:border-fynk-border-hover hover:bg-white sm:max-w-none sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-[11px] md:px-3.5 md:py-2 md:text-xs",
        className,
      )}
    >
      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-md bg-fynk-orange-light text-fynk-orange sm:h-[18px] sm:w-[18px]">
        {icon === "calendar" ? (
          <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5 sm:h-3 sm:w-3">
            <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <line x1="4" y1="9" x2="20" y2="9" stroke="currentColor" strokeWidth="1.8" />
            <line x1="8" y1="3" x2="8" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="16" y1="3" x2="16" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
            <path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" />
          </svg>
        )}
      </span>
      <span className="text-left">{children}</span>
      <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5 shrink-0 text-fynk-muted transition-transform group-hover:translate-x-0.5 sm:h-3 sm:w-3">
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

/* ── Fynk paper-plane illustration (top-right hero corner) ── */
/**
 * Hand-drawn-style SVG of a small person riding a paper airplane with
 * scattered docs flying behind. Optimized as a single inline SVG (no
 * external image), tuned to sit in the top-right of a hero.
 */
export function FynkPaperPlane({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto w-full", className)}
      aria-hidden
    >
      {/* Scattered docs trailing behind */}
      <g stroke="#1f2937" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
        {/* Doc 1 (smallest, furthest left) */}
        <g transform="translate(8 110) rotate(-18)">
          <rect x="0" y="0" width="22" height="16" fill="#FFFFFF" rx="1" />
          <line x1="3" y1="5" x2="18" y2="5" stroke="#9CA3AF" strokeWidth="1" />
          <line x1="3" y1="9" x2="15" y2="9" stroke="#9CA3AF" strokeWidth="1" />
          <text x="14" y="14" fontSize="6" fill="#1f2937" fontWeight="700" stroke="none">€1</text>
        </g>
        {/* Doc 2 */}
        <g transform="translate(40 78) rotate(22)">
          <rect x="0" y="0" width="28" height="20" fill="#FFFFFF" rx="1" />
          <line x1="4" y1="6" x2="24" y2="6" stroke="#9CA3AF" strokeWidth="1" />
          <line x1="4" y1="11" x2="20" y2="11" stroke="#9CA3AF" strokeWidth="1" />
          <line x1="4" y1="16" x2="16" y2="16" stroke="#9CA3AF" strokeWidth="1" />
        </g>
        {/* Doc 3 (largest, mid) */}
        <g transform="translate(78 90) rotate(-8)">
          <rect x="0" y="0" width="32" height="24" fill="#FFFFFF" rx="1" />
          <line x1="4" y1="6" x2="28" y2="6" stroke="#9CA3AF" strokeWidth="1.2" />
          <line x1="4" y1="12" x2="24" y2="12" stroke="#9CA3AF" strokeWidth="1.2" />
          <line x1="4" y1="18" x2="20" y2="18" stroke="#9CA3AF" strokeWidth="1.2" />
        </g>
      </g>

      {/* Speed lines */}
      <g stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M 38 152 L 58 152" />
        <path d="M 22 170 L 50 170" />
        <path d="M 52 132 L 70 132" />
      </g>

      {/* Paper airplane body */}
      <g>
        {/* Far wing (back) */}
        <path
          d="M 160 90 L 254 80 L 200 158 Z"
          fill="#FFFFFF"
          stroke="#1f2937"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Crease shading */}
        <path
          d="M 160 90 L 200 158"
          stroke="#9CA3AF"
          strokeWidth="1.2"
          strokeDasharray="2 2"
        />
        {/* Front wing (the visible folded triangle the person sits on) */}
        <path
          d="M 130 110 L 254 80 L 218 150 L 158 168 Z"
          fill="#FFFFFF"
          stroke="#1f2937"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Inner fold line */}
        <path
          d="M 254 80 L 180 145"
          stroke="#1f2937"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      {/* Person riding the plane (simplified hand-drawn) */}
      <g>
        {/* Body — orange jacket */}
        <path
          d="M 168 92 C 175 80, 195 78, 205 90 L 210 130 L 175 132 Z"
          fill="#F05A28"
          stroke="#1f2937"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Head */}
        <circle cx="192" cy="68" r="14" fill="#FFE4D2" stroke="#1f2937" strokeWidth="2" />
        {/* Hair (dark bob) */}
        <path
          d="M 178 64 C 178 52, 208 50, 208 64 L 207 70 C 200 64, 184 64, 178 70 Z"
          fill="#1f2937"
        />
        {/* Eye */}
        <circle cx="198" cy="70" r="1.4" fill="#1f2937" />
        {/* Smile */}
        <path
          d="M 195 76 Q 199 79, 202 75"
          stroke="#1f2937"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        {/* Arm grabbing plane edge */}
        <path
          d="M 200 110 L 222 122 L 218 132 L 198 122 Z"
          fill="#F05A28"
          stroke="#1f2937"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Hand */}
        <circle cx="224" cy="124" r="4" fill="#FFE4D2" stroke="#1f2937" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/* ── Fynk signature looping ribbon backdrop (orange-left ↔ blue-right) ── */
/**
 * A single continuous SVG ribbon that loops on the left in warm orange,
 * crosses behind the hero and loops out on the right in cool blue.
 * Pure SVG — scales with the section.
 */
export function FynkRibbonBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="fynk-ribbon-grad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#F05A28" stopOpacity="0.95" />
            <stop offset="22%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="48%" stopColor="#F8C39E" stopOpacity="0.45" />
            <stop offset="72%" stopColor="#A8C9F5" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="fynk-ribbon-grad-soft" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#F05A28" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#F3F4F6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.55" />
          </linearGradient>
          <filter id="fynk-ribbon-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>
        {/* Soft blurred ghost behind */}
        <path
          d="M -100 540 C 120 720, 220 220, 480 360 C 720 490, 540 760, 760 720 C 960 680, 880 380, 1080 420 C 1260 460, 1320 660, 1560 520"
          fill="none"
          stroke="url(#fynk-ribbon-grad-soft)"
          strokeWidth="36"
          strokeLinecap="round"
          filter="url(#fynk-ribbon-blur)"
          opacity="0.6"
        />
        {/* Main ribbon */}
        <path
          d="M -80 560 C 140 760, 240 240, 500 380 C 740 510, 560 780, 780 740 C 980 700, 900 400, 1100 440 C 1280 480, 1340 680, 1540 540"
          fill="none"
          stroke="url(#fynk-ribbon-grad)"
          strokeWidth="20"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
      {/* Soft top fade for readability */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/70 to-transparent"
      />
      {/* Soft bottom fade */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/70 to-transparent"
      />
    </div>
  );
}

/* ── Hero rotating avatar+word (fynk "Jen | Tom | Sue | teams" pattern) ── */
/**
 * Renders an inline pill that cycles through `items`, each composed of an
 * avatar (initials) + a word. The word and avatar swap together every
 * `interval` ms with a smooth fade/blur/translate transition.
 * The final item (typically "teams") is rendered without an avatar so
 * the hero resolves to plain language like fynk.com.
 */
export function FynkRotatingAvatarWord({
  items,
  interval = 2200,
  className,
}: {
  items: readonly { label: string; word: string; plain?: boolean }[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<"in" | "out">("in");
  const reducedMotion = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) return;
    const out = setTimeout(() => setPhase("out"), interval - 380);
    const next = setTimeout(() => {
      setIndex((i) => (i + 1) % items.length);
      setPhase("in");
    }, interval);
    return () => {
      clearTimeout(out);
      clearTimeout(next);
    };
  }, [index, items.length, interval]);

  const item = items[index];
  const palette = FYNK_AVATAR_COLORS[index % FYNK_AVATAR_COLORS.length];
  const showAvatar = !item.plain;

  return (
    <span
      className={cn(
        "relative inline-flex items-center align-baseline",
        showAvatar ? "gap-2 sm:gap-3" : "gap-0",
        className,
      )}
    >
      {showAvatar && (
        <span
          key={`av-${index}-${phase}`}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold shadow-md sm:h-12 sm:w-12 sm:text-sm",
            phase === "in" ? "animate-word-swap-in" : "animate-word-swap-out",
          )}
          style={{ backgroundColor: palette.bg, color: palette.text }}
          aria-hidden
        >
          {item.label}
        </span>
      )}
      <span
        key={`w-${index}-${phase}`}
        className={cn(
          "inline-block font-semibold tracking-[-0.025em] text-fynk-ink",
          phase === "in" ? "animate-word-swap-in" : "animate-word-swap-out",
        )}
      >
        {item.word}
      </span>
      <span className="sr-only" aria-live="polite">
        {item.word}
      </span>
    </span>
  );
}

/* ── Primary CTA pill — fynk uses ink (black) on hero, orange elsewhere ── */
export function FynkButtonPrimary({
  href,
  children,
  className,
  onClick,
  variant = "ink",
  ...props
}: React.ComponentProps<typeof Link> & { variant?: "ink" | "orange" }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-all active:scale-[0.98] sm:h-12 sm:px-8 sm:text-[15px] md:h-[52px] md:px-9 md:text-base",
        variant === "ink"
          ? "bg-fynk-ink text-white shadow-lg shadow-fynk-ink/15 hover:bg-fynk-ink/90 hover:shadow-fynk-ink/20"
          : "bg-fynk-orange text-white shadow-lg shadow-fynk-orange/20 hover:bg-fynk-orange-hover hover:shadow-fynk-orange/30",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </Link>
  );
}

export function FynkButtonSecondary({
  href,
  children,
  className,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-fynk-border bg-white px-6 text-sm font-medium text-fynk-ink shadow-sm transition-all hover:border-fynk-border-hover hover:bg-fynk-surface-alt active:scale-[0.98] sm:h-12 sm:px-8 sm:text-[15px] md:h-[52px] md:px-9 md:text-base",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

/* ── Star rating badge ── */
export function FynkRatingBadge({
  score,
  label,
  className,
}: {
  score: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full border border-fynk-border bg-white px-3 py-1.5 shadow-sm sm:gap-2 sm:px-4 sm:py-2",
        className,
      )}
    >
      <div className="flex gap-0.5" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <span className="text-sm font-semibold text-fynk-ink">{score}</span>
      <span className="text-xs text-fynk-faint">{label}</span>
    </div>
  );
}

/* ── Benefit / feature card ── */
export function FynkCard({
  children,
  className,
  visible = true,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-fynk-border bg-white p-4 transition-all duration-500 hover:border-fynk-border-hover hover:shadow-md sm:p-6",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ── Gradient section backdrop (fynk orange-left / blue-right) ── */
export function FynkGradientBackdrop({
  className,
  intensity = "default",
}: {
  className?: string;
  intensity?: "default" | "soft" | "strong";
}) {
  const orangeAlpha = intensity === "strong" ? "26" : intensity === "soft" ? "10" : "18";
  const blueAlpha = intensity === "strong" ? "1e" : intensity === "soft" ? "0c" : "14";
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className="absolute -left-[18%] top-[5%] h-[min(540px,60vh)] w-[min(540px,60vw)] rounded-full opacity-70 blur-3xl animate-fynk-ambient"
        style={{ background: `radial-gradient(circle, ${FYNK.orange}${orangeAlpha}, transparent 70%)` }}
      />
      <div
        className="absolute -right-[12%] top-[15%] h-[min(460px,55vh)] w-[min(460px,55vw)] rounded-full opacity-60 blur-3xl animate-fynk-ambient"
        style={{
          background: `radial-gradient(circle, ${FYNK.blue}${blueAlpha}, transparent 70%)`,
          animationDelay: "3s",
        }}
      />
      {/* Subtle warm floor wash — gives sections the fynk "soft paper" feel */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40%] opacity-90"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${FYNK.surfaceWarm} 100%)`,
        }}
      />
    </div>
  );
}

/* ── Scroll-reveal wrapper ── */
export function FynkReveal({
  children,
  className,
  visible,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  visible: boolean;
  direction?: "up" | "down" | "left" | "right";
}) {
  const hidden = {
    up: "opacity-0 translate-y-8",
    down: "opacity-0 -translate-y-8",
    left: "opacity-0 -translate-x-8",
    right: "opacity-0 translate-x-8",
  }[direction];

  return (
    <div
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible ? "opacity-100 translate-x-0 translate-y-0" : hidden,
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ── Tab pill group (Teams / Industries) ── */
export function FynkTabGroup<T extends string>({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: readonly { id: T; label: string }[];
  active: T;
  onChange: (id: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex rounded-full border border-fynk-border bg-fynk-surface-alt p-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-medium transition-all",
            active === tab.id
              ? "bg-white text-fynk-ink shadow-sm"
              : "text-fynk-muted hover:text-fynk-body",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ── Step number pill (01 Centralize…) ── */
export function FynkStepPill({
  step,
  label,
  active,
  onClick,
}: {
  step: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-all sm:px-4 sm:py-2 sm:text-sm",
        active
          ? "border-fynk-orange/30 bg-fynk-orange-light text-fynk-orange"
          : "border-fynk-border bg-white text-fynk-muted hover:border-fynk-border-hover",
      )}
    >
      {step} {label}
    </Comp>
  );
}

/* ── Trust badge row at bottom CTA ── */
export function FynkTrustBadge({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-fynk-border bg-fynk-surface-alt px-5 py-6 text-left">
      <h3 className="text-sm font-semibold text-fynk-ink">{title}</h3>
      <p className="mt-1 text-xs text-fynk-muted">{desc}</p>
    </div>
  );
}

/* ── Big-number stats display (fynk "80% / 1h→2m / 33%") ── */
export function FynkStatsRow({
  stats,
  className,
}: {
  stats: readonly { value: string; label: string; sub?: string }[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:divide-x md:divide-fynk-border",
        className,
      )}
    >
      {stats.map((s) => (
        <div key={s.label} className="px-4 text-center md:text-left md:first:pl-0 md:last:pr-0">
          <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-fynk-faint">
            {s.label}
          </dt>
          <dd className="mt-3 text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-fynk-ink">
            {s.value}
          </dd>
          {s.sub && <p className="mt-2 text-sm text-fynk-muted">{s.sub}</p>}
        </div>
      ))}
    </dl>
  );
}

/* ── Pull-quote with fynk-style orange underline emphasis ── */
export function FynkEmphasis({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block italic text-fynk-ink">
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0.5 h-[0.45em] -z-0 bg-fynk-orange-light"
      />
    </span>
  );
}

/* ── Logo strip wrapper with edge fades (fynk customer logo row) ── */
export function FynkLogoStrip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/80 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/80 to-transparent"
      />
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 px-8 opacity-70 grayscale transition-all hover:opacity-90">
        {children}
      </div>
    </div>
  );
}
