import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

/** Circular country flag for locale (EN → US, DE → Germany) */
export function LocaleFlag({
  locale,
  className,
  size = 18,
}: {
  locale: Locale;
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 overflow-hidden rounded-full ring-1 ring-black/10",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {locale === "en" ? (
        <svg viewBox="0 0 24 24" width={size} height={size} className="h-full w-full">
          <rect width="24" height="24" fill="#B22234" />
          <rect y="2.3" width="24" height="1.85" fill="#fff" />
          <rect y="6.15" width="24" height="1.85" fill="#fff" />
          <rect y="10" width="24" height="1.85" fill="#fff" />
          <rect y="13.85" width="24" height="1.85" fill="#fff" />
          <rect y="17.7" width="24" height="1.85" fill="#fff" />
          <rect y="21.55" width="24" height="2.45" fill="#fff" />
          <rect width="10.5" height="13" fill="#3C3B6E" />
          <g fill="#fff">
            <circle cx="2.2" cy="2.2" r="0.55" />
            <circle cx="5.2" cy="2.2" r="0.55" />
            <circle cx="8.2" cy="2.2" r="0.55" />
            <circle cx="3.7" cy="4.4" r="0.55" />
            <circle cx="6.7" cy="4.4" r="0.55" />
            <circle cx="2.2" cy="6.6" r="0.55" />
            <circle cx="5.2" cy="6.6" r="0.55" />
            <circle cx="8.2" cy="6.6" r="0.55" />
            <circle cx="3.7" cy="8.8" r="0.55" />
            <circle cx="6.7" cy="8.8" r="0.55" />
            <circle cx="2.2" cy="11" r="0.55" />
            <circle cx="5.2" cy="11" r="0.55" />
            <circle cx="8.2" cy="11" r="0.55" />
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width={size} height={size} className="h-full w-full">
          <rect width="24" height="8" y="0" fill="#000" />
          <rect width="24" height="8" y="8" fill="#DD0000" />
          <rect width="24" height="8" y="16" fill="#FFCE00" />
        </svg>
      )}
    </span>
  );
}
