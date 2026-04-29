"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark" | "enterprise" | "glass";
}

export function Card({ children, variant = "light", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border p-6 transition-all duration-300",
        variant === "light" && "border-theme bg-theme-card hover:shadow-md",
        variant === "dark" && "border-theme bg-theme-card text-theme",
        variant === "enterprise" && "enterprise-card rounded-card",
        variant === "glass" && "glass rounded-card",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
