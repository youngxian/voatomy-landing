"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  locales,
  localeShortLabels,
  localeLabels,
  stripLocaleFromPathname,
  type Locale,
} from "@/i18n/config";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { LocaleFlag } from "@/components/i18n/locale-flag";

export function LanguageSwitcher({
  className,
  variant = "light",
  compact = false,
}: {
  className?: string;
  variant?: "light" | "dark";
  compact?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const currentLocale = (locales.find(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  ) ?? "en") as Locale;

  const pathWithoutLocale = stripLocaleFromPathname(pathname);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors",
          compact ? "h-8 px-1.5 text-[13px]" : "h-9 px-2 text-[15px]",
          variant === "dark"
            ? "text-white/85 hover:text-white"
            : "text-fynk-muted hover:bg-fynk-surface-alt hover:text-fynk-ink",
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <LocaleFlag
          locale={currentLocale}
          size={compact ? 18 : 20}
          className={variant === "dark" ? "ring-white/25" : undefined}
        />
        {localeShortLabels[currentLocale]}
        <ChevronDown className={cn("h-3.5 w-3.5 opacity-60 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-[100] mt-1 min-w-[9rem] overflow-hidden rounded-xl border border-fynk-border bg-white py-1 shadow-lg"
        >
          {locales.map((locale) => {
            const href =
              pathWithoutLocale === "/"
                ? `/${locale}`
                : `/${locale}${pathWithoutLocale}`;
            const active = locale === currentLocale;

            return (
              <li key={locale} role="option" aria-selected={active}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-fynk-orange-light font-semibold text-fynk-orange"
                      : "text-fynk-body hover:bg-fynk-surface-alt hover:text-fynk-ink",
                  )}
                >
                  <LocaleFlag locale={locale} size={18} />
                  {localeLabels[locale]}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
