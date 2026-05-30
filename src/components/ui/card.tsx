"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark" | "enterprise" | "glass" | "fynk" | "fynk-alt";
}

export function Card({ children, variant = "light", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 transition-all duration-300",
        (variant === "light" || variant === "fynk") &&
          "border-fynk-border bg-white hover:border-fynk-border-hover hover:shadow-md",
        (variant === "dark" || variant === "fynk-alt") &&
          "border-fynk-border bg-fynk-surface-alt text-fynk-ink hover:shadow-md",
        variant === "enterprise" && "enterprise-card rounded-2xl border-fynk-border bg-white",
        variant === "glass" && "glass rounded-2xl border-fynk-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
