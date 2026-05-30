"use client";

import { FynkGradientBackdrop } from "./fynk-primitives";
import { cn } from "@/lib/utils";

/**
 * fynk-style soft gradient band for marketing subpage heroes.
 */
export function SubpageHeroAtmosphere({
  className = "",
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <FynkGradientBackdrop />
    </div>
  );
}
