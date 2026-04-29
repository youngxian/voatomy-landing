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
        "inline-flex items-center gap-1.5 rounded-full bg-theme-subtle px-2.5 py-1 text-sm text-theme transition-colors duration-300",
        className,
      )}
      {...props}
    >
      {dotColor && (
        <span
          className="h-3 w-3 rounded-full"
          style={{ background: dotColor }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
