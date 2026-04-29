"use client";

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const decorVariants = cva("pointer-events-none absolute inset-0 overflow-hidden", {
  variants: {
    tone: {
      default: "",
      white: "",
      coral: "",
      sky: "",
      violet: "",
      dark: "",
      cream: "",
      amber: "",
      rose: "",
    },
  },
  defaultVariants: { tone: "default" },
});

const toneBlob = {
  default: {
    a: "from-teal/[0.12] via-brand/[0.08] to-transparent",
    b: "from-violet/[0.08] via-sky/[0.06] to-transparent",
    c: "from-coral/[0.07] to-transparent",
  },
  white: {
    a: "from-teal/[0.1] via-brand/[0.05] to-transparent",
    b: "from-sky/[0.08] to-transparent",
    c: "from-violet/[0.06] to-transparent",
  },
  coral: {
    a: "from-coral/[0.14] via-amber/[0.06] to-transparent",
    b: "from-rose/[0.08] to-transparent",
    c: "from-coral/[0.05] to-transparent",
  },
  sky: {
    a: "from-sky/[0.12] to-transparent",
    b: "from-violet/[0.08] to-transparent",
    c: "from-teal/[0.06] to-transparent",
  },
  violet: {
    a: "from-violet/[0.12] to-transparent",
    b: "from-sky/[0.07] to-transparent",
    c: "from-teal/[0.05] to-transparent",
  },
  dark: {
    a: "from-white/[0.09] to-transparent",
    b: "from-accent-lime/[0.08] to-transparent",
    c: "from-white/[0.05] to-transparent",
  },
  cream: {
    a: "from-teal/[0.1] to-transparent",
    b: "from-charcoal/[0.04] to-transparent",
    c: "from-coral/[0.06] to-transparent",
  },
  amber: {
    a: "from-amber/[0.12] via-rose/[0.04] to-transparent",
    b: "from-teal/[0.06] to-transparent",
    c: "from-amber/[0.06] to-transparent",
  },
  rose: {
    a: "from-rose/[0.12] to-transparent",
    b: "from-violet/[0.08] to-transparent",
    c: "from-rose/[0.06] to-transparent",
  },
} as const;

/**
 * Per-section ambient orbs and soft grid. First child inside `relative overflow-hidden` sections.
 */
export function SectionBackgroundDecor({
  className,
  tone = "default",
  showGrid = true,
}: { className?: string; showGrid?: boolean } & VariantProps<typeof decorVariants>) {
  const b = toneBlob[tone ?? "default"];
  const isDark = tone === "dark";

  return (
    <div className={cn(decorVariants({ tone }), className)} aria-hidden>
      <div
        className={cn(
          "absolute -right-[8%] -top-[20%] h-[min(50vh,400px)] w-[min(70vw,500px)] rounded-full bg-gradient-to-bl opacity-90 blur-3xl animate-ambient-glow",
          b.a,
        )}
      />
      <div
        className={cn(
          "absolute -left-[10%] top-[28%] h-[min(45vh,360px)] w-[min(65vw,420px)] rounded-full bg-gradient-to-tr opacity-80 blur-3xl animate-orb-drift-2",
          b.b,
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 left-1/3 h-[min(35vh,300px)] w-[min(80vw,600px)] -translate-x-1/2 translate-y-1/4 rounded-full bg-gradient-to-t opacity-70 blur-3xl animate-orb-drift-1",
          b.c,
        )}
      />
      {showGrid && (
        <div
          className={cn(
            "absolute inset-0 bg-[length:32px_32px] opacity-[0.22] [mask-image:radial-gradient(ellipse_at_50%_25%,black,transparent_78%)] animate-mesh-move",
            isDark
              ? "bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)]"
              : "bg-dot-grid-light",
          )}
        />
      )}
    </div>
  );
}
