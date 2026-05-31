"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { COMPANY_SIZE_OPTIONS } from "@/lib/constants";
import type { CompanySize } from "@/types";

const STEP_COUNT = COMPANY_SIZE_OPTIONS.length;
/** Half of one grid column — aligns track ends with first/last step centers */
const TRACK_INSET = `calc(100% / ${STEP_COUNT * 2})`;

export function TeamSizeSlider({
  value,
  onChange,
}: {
  value: CompanySize | "";
  onChange: (value: CompanySize) => void;
}) {
  const maxIndex = STEP_COUNT - 1;
  const selectedIndex = React.useMemo(() => {
    if (!value) return 0;
    const idx = COMPANY_SIZE_OPTIONS.findIndex((o) => o.value === value);
    return idx >= 0 ? idx : 0;
  }, [value]);

  const selected = COMPANY_SIZE_OPTIONS[selectedIndex];
  const progress = maxIndex > 0 ? selectedIndex / maxIndex : 0;

  const handleIndexChange = (index: number) => {
    onChange(COMPANY_SIZE_OPTIONS[index].value);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#121312]/8 bg-white px-4 py-3">
        <p className="text-lg font-bold text-[#121312]">{selected.label}</p>
        <p className="mt-0.5 text-sm text-[#121312]/55">{selected.description}</p>
      </div>

      <div>
        {/* Slider row: track, dots, and range share one vertical center */}
        <div className="relative h-8">
          <div
            className="pointer-events-none absolute inset-y-0 flex items-center"
            style={{ left: TRACK_INSET, right: TRACK_INSET }}
          >
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#121312]/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#F05A28] to-[#3B82F6] transition-all duration-300 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0 grid items-center"
            style={{ gridTemplateColumns: `repeat(${STEP_COUNT}, minmax(0, 1fr))` }}
          >
            {COMPANY_SIZE_OPTIONS.map((opt, index) => {
              const active = index <= selectedIndex;
              const current = index === selectedIndex;
              return (
                <div key={opt.value} className="flex justify-center">
                  <span
                    className={cn(
                      "block rounded-full border-2 transition-all duration-200",
                      current
                        ? "h-5 w-5 border-transparent bg-transparent"
                        : active
                          ? "h-4 w-4 border-[#F05A28] bg-white"
                          : "h-4 w-4 border-[#121312]/15 bg-white",
                    )}
                  />
                </div>
              );
            })}
          </div>

          <div
            className="absolute inset-0 flex items-center"
            style={{ paddingLeft: TRACK_INSET, paddingRight: TRACK_INSET }}
          >
            <input
              type="range"
              min={0}
              max={maxIndex}
              step={1}
              value={selectedIndex}
              onChange={(e) => handleIndexChange(Number(e.target.value))}
              className="h-8 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#F05A28] [&::-moz-range-thumb]:shadow-md [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#F05A28] [&::-webkit-slider-thumb]:shadow-md"
              aria-label="Team size"
              aria-valuetext={`${selected.label} — ${selected.description}`}
            />
          </div>
        </div>

        {/* Labels aligned to the same column grid as dots */}
        <div
          className="mt-3 grid gap-1"
          style={{ gridTemplateColumns: `repeat(${STEP_COUNT}, minmax(0, 1fr))` }}
        >
          {COMPANY_SIZE_OPTIONS.map((opt, index) => {
            const current = index === selectedIndex;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleIndexChange(index)}
                className={cn(
                  "mx-auto w-full rounded-full border px-1 py-1.5 text-center text-[10px] font-semibold leading-tight transition-all sm:px-1.5 sm:text-[11px]",
                  current
                    ? "border-[#F05A28]/35 bg-[#FFF8F5] text-[#121312] shadow-sm ring-1 ring-[#F05A28]/20"
                    : "border-[#121312]/10 bg-white text-[#121312]/50 hover:border-[#121312]/15 hover:text-[#121312]/70",
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
