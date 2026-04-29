"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionOwnProps {
  variant?: "default" | "white" | "dark" | "premium" | "glass" | "coral" | "amber" | "violet" | "sky" | "rose" | "mint";
  container?: boolean;
  withGrid?: boolean;
  withNoise?: boolean;
}

type SectionProps = SectionOwnProps &
  Omit<React.HTMLAttributes<HTMLElement>, keyof SectionOwnProps>;

const LIGHT_SURFACE_VARIANTS = new Set([
  "white",
  "amber",
  "coral",
  "violet",
  "sky",
  "rose",
  "mint",
]);

export function Section({
  children,
  variant = "default",
  container = true,
  withGrid = false,
  withNoise = false,
  className,
  ...domProps
}: SectionProps) {
  const lightTypography = LIGHT_SURFACE_VARIANTS.has(variant ?? "default");

  return (
    <section
      className={cn(
        "relative flex flex-col items-center justify-center px-4 py-16 sm:py-24 transition-[background-color,color,border-color] duration-300 ease-out",
        lightTypography && "light-surface-typography",
        variant === "default" && "bg-theme",
        variant === "white" && "bg-white",
        variant === "dark" && "bg-theme-s text-theme",
        variant === "premium" && "bg-theme overflow-hidden",
        variant === "glass" && "glass overflow-hidden",
        variant === "coral" && "bg-coral-light",
        variant === "amber" && "bg-amber-light",
        variant === "violet" && "bg-violet-light",
        variant === "sky" && "bg-sky-light",
        variant === "rose" && "bg-rose-light",
        variant === "mint" && "bg-teal/5",
        withNoise && "noise-overlay",
        withGrid && "fine-grid",
        className,
      )}
      {...domProps}
    >
      {container ? (
        <div className="relative z-[2] mx-auto w-full max-w-container px-4">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
