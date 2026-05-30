import { cn } from "@/lib/utils";

export function VoatomyLogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={cn("h-7 w-7", className)} aria-hidden>
      <path
        d="M6 18c4-8 10-12 20-12-2 6-1 12 4 16-5-2-10-1-14 4 2-4 5-7 10-8Z"
        fill="#F05A28"
      />
      <path
        d="M8 22c3-5 8-8 14-9-1 3 0 6 2 8-3-1-6 0-8 2 1-2 2-3 4-4Z"
        fill="#3B82F6"
        opacity="0.85"
      />
    </svg>
  );
}
