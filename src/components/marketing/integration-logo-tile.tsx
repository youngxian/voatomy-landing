"use client";

import { cn } from "@/lib/utils";
import { IntegrationLogo } from "@/components/icons/integration-logos";
import { integrationKeyFromName } from "@/lib/integration-name-map";

export function IntegrationLogoTile({
  name,
  label,
  className,
  size = "md",
  rotate,
}: {
  name: string;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  rotate?: number;
}) {
  const key = integrationKeyFromName(name);
  const iconSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "md";
  const box =
    size === "sm"
      ? "h-10 w-10"
      : size === "lg"
        ? "h-14 w-14"
        : "h-12 w-12";

  const displayLabel = label === "" ? null : (label ?? name);

  return (
    <div
      className={cn("flex flex-col items-center gap-1.5", className)}
      style={rotate !== undefined ? { transform: `rotate(${rotate}deg)` } : undefined}
      title={name}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-white shadow-[0_4px_14px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.06] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.12)]",
          box,
        )}
      >
        <IntegrationLogo integrationKey={key} name={name} size={iconSize} />
      </div>
      {displayLabel ? (
        <span className="max-w-[4.5rem] truncate text-center text-[10px] font-semibold text-[#64748b]">
          {displayLabel}
        </span>
      ) : null}
    </div>
  );
}

export function IntegrationLogoChip({
  name,
  className,
  rotate,
}: {
  name: string;
  className?: string;
  rotate?: number;
}) {
  const key = integrationKeyFromName(name);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-3 py-2 shadow-sm transition-all hover:border-[#F05A28]/20 hover:shadow-md",
        className,
      )}
      style={rotate !== undefined ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f8fafc]">
        <IntegrationLogo integrationKey={key} name={name} size="sm" />
      </span>
      <span className="text-xs font-semibold text-[#1e293b]">{name}</span>
    </div>
  );
}
