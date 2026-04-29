"use client";

import { WireflowRail } from "./wireflow-rail";
import { cn } from "@/lib/utils";

/**
 * Optional wireflow band for marketing subpage heroes. Pair with
 * the global ambient layer in the marketing layout. Parent should be
 * `relative overflow-hidden` so this sits under hero copy.
 */
export function SubpageHeroAtmosphere({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 right-0 top-[4.5rem] z-0 flex justify-center sm:top-[5.5rem]",
        className,
      )}
      aria-hidden
    >
      <WireflowRail
        className="max-w-lg scale-[0.88] sm:scale-100 opacity-45 sm:opacity-55"
        dark={dark}
        label="Product signal path"
      />
    </div>
  );
}
