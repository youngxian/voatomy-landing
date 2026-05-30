"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shared Tailwind class groups for onboarding steps */
export const ob = {
  ink: "text-fynk-ink",
  muted: "text-fynk-muted",
  faint: "text-fynk-muted/70",
  label: "text-sm font-semibold text-fynk-ink",
  hint: "text-xs text-fynk-muted",
  section: "space-y-4",
  field: "space-y-1.5",
  input:
    "h-10 w-full rounded-xl border border-fynk-border bg-white px-3.5 text-sm font-medium text-fynk-ink outline-none transition-all placeholder:text-fynk-muted/60 focus:border-brand focus:ring-2 focus:ring-brand/15",
  chip: (selected: boolean) =>
    cn(
      "rounded-xl border px-2.5 py-2 text-center transition-all duration-200",
      selected
        ? "border-brand bg-brand/8 text-fynk-ink shadow-sm ring-1 ring-brand/20"
        : "border-fynk-border bg-white text-fynk-muted hover:border-fynk-border/80 hover:bg-fynk-surface-alt/50",
    ),
  card: "rounded-xl border border-fynk-border bg-fynk-surface-alt/30 p-3.5",
  error: "rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700",
} as const;

export function ObLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={cn(ob.label, className)}>{children}</label>;
}

export function ObHint({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn(ob.hint, className)}>{children}</p>;
}

export function ObField({
  label,
  hint,
  children,
  className,
}: {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(ob.field, className)}>
      {label && <ObLabel>{label}</ObLabel>}
      {hint && <ObHint>{hint}</ObHint>}
      {children}
    </div>
  );
}

export function ObInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(ob.input, props.className)} />;
}

export function ObPrimaryButton({
  children,
  disabled,
  loading,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      {...props}
      className={cn(
        className="inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all duration-200",
        disabled || loading
          ? "cursor-not-allowed bg-fynk-surface-alt text-fynk-muted/50"
          : "bg-brand text-fynk-ink shadow-sm hover:bg-brand-dark hover:shadow-md active:scale-[0.99]",
        className,
      )}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
      {!loading && !disabled && <ChevronRight className="h-4 w-4" strokeWidth={2.5} />}
    </button>
  );
}

export function ObSecondaryButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        "inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-fynk-border text-sm font-medium text-fynk-muted transition-all hover:bg-fynk-surface-alt",
        className,
      )}
    >
      <ChevronLeft className="h-4 w-4" strokeWidth={2} />
      {children}
    </button>
  );
}
