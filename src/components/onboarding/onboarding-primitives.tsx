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
  section: "space-y-5",
  field: "space-y-1.5",
  input:
    "h-11 w-full rounded-xl border border-[#121312]/10 bg-[#f8f9fa] px-4 text-sm font-medium text-fynk-ink outline-none transition-all placeholder:text-fynk-muted/55 focus:border-[#F05A28]/40 focus:bg-white focus:ring-2 focus:ring-[#F05A28]/12",
  chip: (selected: boolean) =>
    cn(
      "rounded-xl border px-3 py-2.5 text-center text-sm transition-all duration-200",
      selected
        ? "border-[#F05A28]/35 bg-[#FFF8F5] text-fynk-ink shadow-sm ring-1 ring-[#F05A28]/20"
        : "border-[#121312]/10 bg-[#fafafa] text-fynk-muted hover:border-[#121312]/15 hover:bg-white",
    ),
  card: "rounded-2xl border border-[#121312]/8 bg-[#fafafa] p-4",
  error: "rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700",
  selectTile: (selected: boolean) =>
    cn(
      "flex flex-col items-center gap-2 rounded-2xl border-2 px-2 py-3 text-center transition-all duration-200",
      selected
        ? "border-[#F05A28]/35 bg-[#FFF8F5] shadow-sm ring-1 ring-[#F05A28]/20"
        : "border-[#121312]/10 bg-white hover:border-[#121312]/15 hover:bg-[#fafafa] hover:shadow-sm",
    ),
  selectRow: (selected: boolean) =>
    cn(
      "flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition-all duration-200",
      selected
        ? "border-[#F05A28]/35 bg-[#FFF8F5] shadow-sm ring-1 ring-[#F05A28]/20"
        : "border-[#121312]/10 bg-white hover:border-[#121312]/15 hover:bg-[#fafafa] hover:shadow-sm",
    ),
  sectionCard: "rounded-2xl border border-[#121312]/8 bg-[#fafafa]/80 p-4 sm:p-5",
  sectionLabel: "mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121312]/45",
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
        "inline-flex h-11 min-w-0 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-200",
        disabled || loading
          ? "cursor-not-allowed bg-fynk-surface-alt text-fynk-muted/50"
          : "bg-[#F05A28] text-white shadow-md shadow-[#F05A28]/20 hover:bg-[#E04E1E] hover:shadow-lg hover:shadow-[#F05A28]/25 active:scale-[0.99]",
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
        "inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#121312]/10 bg-white text-sm font-medium text-fynk-muted transition-all hover:border-[#121312]/15 hover:bg-[#f8f9fa]",
        className,
      )}
    >
      <ChevronLeft className="h-4 w-4" strokeWidth={2} />
      {children}
    </button>
  );
}
