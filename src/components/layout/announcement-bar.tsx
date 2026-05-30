"use client";

import * as React from "react";
import { ArrowRight, X } from "lucide-react";
import { useDictionary } from "@/i18n/locale-provider";
import { LocalizedLink } from "@/components/i18n/localized-link";

/** Legacy announcement bar — prefer UtilityTopBar in header. */
export function AnnouncementBar() {
  const [visible, setVisible] = React.useState(true);
  const t = useDictionary();

  if (!visible) return null;

  return (
    <div className="relative border-b border-fynk-border bg-[#0a0a0a] animate-nav-slide-down">
      <div className="relative mx-auto flex min-h-[44px] max-w-container items-center justify-center gap-3 px-10 py-2">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          {t.announcement.badge}
        </span>
        <p className="text-center text-xs text-white/80 sm:text-[13px]">
          <span className="font-semibold text-white">{t.announcement.headline}</span>
          {" — "}
          {t.announcement.description}{" "}
          <LocalizedLink
            href="/demo"
            className="inline-flex items-center gap-1 font-medium text-white underline-offset-2 hover:underline"
          >
            {t.announcement.cta}
            <ArrowRight className="h-3 w-3" />
          </LocalizedLink>
        </p>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-white/60 transition-all hover:bg-white/10 hover:text-white"
          aria-label="Dismiss announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
