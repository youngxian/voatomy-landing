"use client";

import { cn } from "@/lib/utils";

/**
 * fynk-style ambient: soft orange + blue gradient blurs only.
 */
export function GlobalMarketingAmbient({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
      aria-hidden
    >
      <div className="absolute -left-[15%] top-0 h-[min(50vh,420px)] w-[min(60vw,520px)] rounded-full bg-fynk-orange/[0.04] blur-3xl animate-orb-drift-1" />
      <div className="absolute -right-[10%] top-[18%] h-[min(45vh,380px)] w-[min(55vw,480px)] rounded-full bg-fynk-blue/[0.035] blur-3xl animate-orb-drift-2" />
    </div>
  );
}
