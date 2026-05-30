"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/locale-provider";

const STORAGE_KEY = "voatomy-topbar-dismissed";

function TopBarEventBadge({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5">
      <div
        className="relative flex h-8 w-[46px] items-center justify-center overflow-hidden rounded-[6px]"
        aria-hidden
      >
        <svg viewBox="0 0 46 32" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="tb-grad-a" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
            <linearGradient id="tb-grad-b" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F05A28" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <rect width="46" height="32" fill="#111827" />
          <ellipse cx="14" cy="18" rx="12" ry="10" fill="url(#tb-grad-a)" opacity="0.95" />
          <ellipse cx="32" cy="12" rx="10" ry="8" fill="url(#tb-grad-b)" opacity="0.9" />
          <path
            d="M8 26 Q23 8 38 24"
            stroke="#22D3EE"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>
      <span className="whitespace-nowrap text-[13px] font-bold leading-none tracking-[-0.01em] text-white">
        {label}
      </span>
    </div>
  );
}

/** Atlassian-style black announcement strip — badge, headline, CTA, dismiss. */
export function UtilityTopBar({ scrolled }: { scrolled: boolean }) {
  const { localizedPath, dictionary: t } = useLocale();
  const [dismissed, setDismissed] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setDismissed(true);
    } catch {
      /* ignore */
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!hydrated || dismissed) return null;

  return (
    <div
      className={cn(
        "relative z-[55] border-b border-white/[0.08] bg-[#0a0a0a] text-white transition-all duration-300 ease-out",
        scrolled
          ? "pointer-events-none max-h-0 overflow-hidden opacity-0"
          : "max-h-14 overflow-visible opacity-100",
      )}
      aria-hidden={scrolled}
    >
      <div className="mx-auto flex h-11 w-full max-w-container items-center gap-3 px-3 sm:h-12 sm:gap-4 sm:px-6 lg:px-8">
        {/* Left — event badge + divider */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <TopBarEventBadge label={t.announcement.badge} />
          <span className="hidden h-5 w-px shrink-0 bg-white/20 md:block" aria-hidden />
        </div>

        {/* Center — headline + description */}
        <div className="min-w-0 flex-1 md:px-2">
          <p className="truncate text-[12px] font-semibold leading-tight text-white sm:text-[13px] md:whitespace-normal md:overflow-visible">
            {t.announcement.headline}
          </p>
          <p className="mt-0.5 hidden truncate text-[11px] leading-snug text-white/65 sm:block md:whitespace-normal md:overflow-visible lg:text-xs">
            {t.announcement.description}
          </p>
        </div>

        {/* Right — CTA + dismiss */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href={localizedPath("/demo")}
            className="inline-flex items-center gap-1 whitespace-nowrap text-[12px] font-medium text-white transition-colors hover:text-white/85 sm:text-[13px]"
          >
            <span className="hidden sm:inline">{t.announcement.cta}</span>
            <span className="sm:hidden">Demo</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-90" strokeWidth={2} />
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}
