"use client";

import { useDictionary } from "@/i18n/locale-provider";

export function OrDivider() {
  const dict = useDictionary();
  return (
    <div className="my-[18px] flex items-center gap-2.5">
      <span className="h-px flex-1 bg-[#121312]/15" />
      <span className="text-xs font-semibold tracking-wide text-[#121312]/45">{dict.auth.common.or}</span>
      <span className="h-px flex-1 bg-[#121312]/15" />
    </div>
  );
}
