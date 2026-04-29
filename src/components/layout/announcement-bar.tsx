"use client";

import * as React from "react";
import { X } from "lucide-react";

export function AnnouncementBar() {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <div className="border-b border-teal-dark/20 bg-teal-dark transition-colors duration-300">
      <div className="relative mx-auto flex min-h-[40px] max-w-container items-center justify-center gap-3 px-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-lime/15 px-2.5 py-0.5 text-[11px] font-bold text-accent-lime">
          <span
            className="h-1.5 w-1.5 rounded-full bg-accent-lime"
            aria-hidden="true"
          />
          Early Access
        </span>
        <p className="text-center text-xs text-white/70 sm:text-sm">
          ATLAS early access opens Q2 2026.{" "}
          <a
            href="#hero"
            className="font-medium text-accent-lime/80 hover:text-accent-lime"
          >
            Join the waitlist &rarr;
          </a>
        </p>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white/70"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
