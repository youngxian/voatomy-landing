import Link from "next/link";
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

export function VoatomyLogo({
  className,
  wordmarkClassName,
  href = "/",
  asLink = true,
}: {
  className?: string;
  wordmarkClassName?: string;
  href?: string;
  asLink?: boolean;
}) {
  const content = (
    <>
      <VoatomyLogoMark className={cn("h-8 w-8", className)} />
      <span
        className={cn(
          "font-heading text-[18px] font-semibold tracking-[-0.02em] text-fynk-ink",
          wordmarkClassName,
        )}
      >
        voatomy
      </span>
    </>
  );

  if (!asLink) {
    return <span className="inline-flex items-center gap-2">{content}</span>;
  }

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-lg text-fynk-ink transition-opacity hover:opacity-85"
      aria-label="Voatomy home"
    >
      {content}
    </Link>
  );
}
