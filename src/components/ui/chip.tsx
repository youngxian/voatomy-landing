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
        "inline-flex items-center gap-1.5 rounded-full border border-theme/60 bg-theme-subtle px-2.5 py-1 text-sm text-theme transition-[color,background-color,border-color,box-shadow] duration-200 ease-out",
        className,
      )}
      {...props}
    >
      {dotColor && (
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-black/[0.06] dark:ring-white/10"
          style={{ background: dotColor }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
