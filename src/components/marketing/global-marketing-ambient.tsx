"use client";

import { cn } from "@/lib/utils";

/**
 * Site-wide, fixed decorative layer: soft orbs + subtle grid drift.
 * Sits behind page content; keep opacity low for readability.
 */
export function GlobalMarketingAmbient({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className="absolute -left-[20%] top-0 h-[min(70vh,520px)] w-[min(80vw,640px)] rounded-full bg-gradient-to-br from-teal/[0.07] via-brand/[0.04] to-transparent opacity-80 blur-3xl animate-orb-drift-1"
      />
      <div
        className="absolute -right-[15%] top-[20%] h-[min(60vh,480px)] w-[min(70vw,520px)] rounded-full bg-gradient-to-bl from-violet/[0.06] via-sky/[0.04] to-transparent opacity-70 blur-3xl animate-orb-drift-2"
      />
      <div
        className="absolute bottom-0 left-1/2 h-[40vh] w-[90vw] max-w-4xl -translate-x-1/2 translate-y-1/3 rounded-full bg-gradient-to-t from-[#f16e2c]/[0.08] via-coral/[0.04] to-transparent opacity-60 blur-3xl animate-orb-drift-1 [animation-duration:22s] [animation-delay:4s]"
      />
      <div
        className="absolute right-[5%] top-[45%] h-[min(30vh,280px)] w-[min(40vw,320px)] rounded-full bg-gradient-to-bl from-[#f16e2c]/[0.05] to-transparent opacity-50 blur-3xl animate-orb-drift-2 [animation-duration:18s]"
      />
      <div
        className="absolute inset-0 opacity-[0.35] bg-dot-grid-light bg-[length:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] animate-mesh-move"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
