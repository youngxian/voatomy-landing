"use client";

import { cn } from "@/lib/utils";
import { productHeroAtmosphere } from "@/lib/product-brand";

type ProductHeroVariant = "atlas" | "loop" | "drift" | "signal" | "phantom" | "nexus";

function AtlasSprintSwimlaneMotif() {
  return (
    <svg
      className="absolute bottom-0 left-0 right-0 h-[45%] w-full text-[#F16E2C]/[0.14] dark:text-[#F16E2C]/[0.10]"
      viewBox="0 0 1200 200"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      <line x1="0" y1="40" x2="1200" y2="40" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="90" x2="1200" y2="90" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="140" x2="1200" y2="140" stroke="currentColor" strokeWidth="1" />
      {[80, 240, 400, 560, 720, 880, 1040].map((x) => (
        <g key={x}>
          <line x1={x} y1="40" x2={x} y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx={x + 40} cy="65" r="3" className="fill-[#0F766E]/25" />
        </g>
      ))}
    </svg>
  );
}

function LoopRevenueOrbitMotif() {
  return (
    <svg
      className="absolute left-1/2 top-[6%] h-[min(52vh,440px)] w-[min(96vw,920px)] -translate-x-1/2 text-[#4F46E5]/[0.11]"
      viewBox="0 0 400 400"
      aria-hidden
    >
      <g className="animate-mesh-move" style={{ animationDuration: "26s", transformOrigin: "200px 200px" }}>
        <ellipse
          cx="200"
          cy="200"
          rx="140"
          ry="78"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          transform="rotate(-8 200 200)"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="110"
          ry="62"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.55"
          transform="rotate(18 200 200)"
        />
        <path
          d="M 60 200 C 100 120, 180 100, 200 200 C 220 300, 300 280, 340 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.45"
          strokeLinecap="round"
        />
      </g>
      <circle cx="200" cy="200" r="3" className="fill-[#7C3AED]/15" />
    </svg>
  );
}

function DriftSpecMeshMotif() {
  return (
    <div
      className="absolute inset-0 opacity-[0.12] [background-image:repeating-linear-gradient(45deg,transparent,transparent_31px,rgba(109,40,217,0.35)_31px,rgba(109,40,217,0.35)_32px)]"
      aria-hidden
    />
  );
}

function SignalBlastRadiusMotif() {
  return (
    <div className="absolute right-[6%] top-[12%] h-[min(38vh,360px)] w-[min(38vh,360px)]" aria-hidden>
      <div
        className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DC2626]/15 animate-pulse-ring"
        style={{ animationDuration: "3.2s" }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#DC2626]/10"
        style={{ animation: "pulse-ring 4.2s ease-in-out infinite 0.4s" }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#EA580C]/15"
        style={{ animation: "pulse-ring 3.5s ease-in-out infinite 0.8s" }}
      />
    </div>
  );
}

function PhantomDepthScanMotif() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      <div className="absolute inset-0 h-full w-full">
        <div
          className="h-24 w-full bg-gradient-to-b from-cyan-400/15 via-cyan-500/5 to-transparent animate-scan-line [animation-duration:4.2s]"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22D3EE]/25 to-transparent" />
    </div>
  );
}

function NexusPrismStripMotif() {
  return (
    <div
      className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-[#F97316]/40 via-[#6366F1]/35 via-[#06B6D4]/35 via-[#EF4444]/30 via-[#A855F7]/30 to-[#10B981]/50 opacity-80"
      aria-hidden
    />
  );
}

function HeroMotif({ variant }: { variant: ProductHeroVariant }) {
  switch (variant) {
    case "atlas":
      return <AtlasSprintSwimlaneMotif />;
    case "loop":
      return <LoopRevenueOrbitMotif />;
    case "drift":
      return <DriftSpecMeshMotif />;
    case "signal":
      return <SignalBlastRadiusMotif />;
    case "phantom":
      return <PhantomDepthScanMotif />;
    case "nexus":
      return <NexusPrismStripMotif />;
    default:
      return null;
  }
}

/**
 * Abstract product hero — unique motif + mesh per product. No photography.
 * Pairs with `.product-hero-gradient` and page-level fine-grid / noise.
 */
export function ProductHeroAtmosphere({
  variant,
  className,
}: {
  variant: ProductHeroVariant;
  className?: string;
}) {
  const v = productHeroAtmosphere[variant];

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className={cn(
          "absolute -left-[15%] -top-[10%] h-[min(70vh,480px)] w-[min(85vw,600px)] rounded-full bg-gradient-to-br opacity-90 blur-3xl animate-orb-drift-1",
          v.orbs[0],
        )}
      />
      <div
        className={cn(
          "absolute -right-[10%] top-[15%] h-[min(55vh,400px)] w-[min(75vw,500px)] rounded-full bg-gradient-to-bl opacity-80 blur-3xl animate-orb-drift-2",
          v.orbs[1],
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 left-1/3 h-[min(40vh,360px)] w-[min(90vw,700px)] -translate-x-1/2 translate-y-1/4 rounded-full bg-gradient-to-t opacity-70 blur-3xl [animation-delay:1.2s] animate-orb-drift-1 [animation-duration:20s]",
          v.orbs[2],
        )}
      />
      {variant === "loop" && (
        <div className="absolute -left-[20%] top-1/3 h-[min(45vh,320px)] w-[min(70vw,480px)] rotate-6 rounded-full bg-gradient-to-r from-violet-500/5 to-transparent blur-3xl [animation-duration:24s] animate-orb-drift-2" />
      )}
      {variant === "phantom" && (
        <div className="absolute right-[8%] bottom-[12%] h-32 w-32 rounded-full bg-[#0E7490]/10 blur-2xl [animation-duration:18s] animate-orb-drift-1" />
      )}

      <div
        className={cn(
          "absolute inset-0 z-[0] bg-gradient-to-b",
          v.wash,
        )}
      />
      <div
        className={cn(
          "absolute inset-0 z-[1]",
          variant === "drift" && "opacity-90",
        )}
      >
        <HeroMotif variant={variant} />
      </div>
      <div className="absolute left-0 right-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />
    </div>
  );
}
