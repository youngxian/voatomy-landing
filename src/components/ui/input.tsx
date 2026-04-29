"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    return (
      <div className="text-left">
        {label && (
          <label
            htmlFor={id}
            className="mb-2 block text-sm font-semibold text-theme-s"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          className={cn(
            "flex h-12 w-full rounded-md border border-theme bg-theme-input px-3.5 text-base font-medium text-theme transition-colors duration-300",
            "placeholder:text-theme-m",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:border-brand",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus-visible:ring-red-500/30",
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
