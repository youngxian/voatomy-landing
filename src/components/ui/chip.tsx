"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  dotColor?: string;
}

export function Chip({ children, dotColor, className, ...props }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-fynk-border bg-fynk-surface-alt px-3 py-1 text-sm font-medium text-fynk-body",
        className,
      )}
      {...props}
    >
      {dotColor && (
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: dotColor }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
