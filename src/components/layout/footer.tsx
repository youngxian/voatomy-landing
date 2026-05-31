"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { FOOTER_COLUMNS, FOOTER_SOCIALS } from "@/lib/constants";
import { useLocale } from "@/i18n/locale-provider";

function SocialIcon({ icon, className }: { icon: string; className?: string }) {
  const c = cn("h-4 w-4 sm:h-[18px] sm:w-[18px]", className);
  switch (icon) {
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={c} aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={c} aria-hidden>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    default:
      return null;
  }
}

const FOOTER_SOCIAL_PRIMARY = FOOTER_SOCIALS.filter((s) => s.icon === "x" || s.icon === "github");

function FooterLinkColumn({
  title,
  links,
  localizedPath,
  label,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  localizedPath: (path: string) => string;
  label: string;
}) {
  return (
    <nav className="min-w-0" aria-label={label}>
      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/45 sm:mb-4 sm:text-xs">
        {title}
      </h3>
      <ul className="space-y-2 sm:space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={localizedPath(link.href)}
              className="inline-block text-[13px] leading-snug text-white/85 transition-colors hover:text-white sm:text-[15px] sm:text-white/90"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const { localizedPath } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-20 overflow-hidden bg-black text-white">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-10 sm:py-16 lg:grid-cols-5 lg:gap-x-12 lg:py-20">
          {FOOTER_COLUMNS.map((col) => (
            <FooterLinkColumn
              key={col.title}
              title={col.title}
              label={col.title}
              links={col.links}
              localizedPath={localizedPath}
            />
          ))}
        </div>

        {/* Social + copyright */}
        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 py-6 text-center sm:flex-row sm:items-center sm:py-8 sm:text-left">
          <div className="flex items-center justify-center gap-4 sm:justify-start">
            {FOOTER_SOCIAL_PRIMARY.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-white/45 transition-colors hover:text-white/80"
              >
                <SocialIcon icon={social.icon} />
              </a>
            ))}
          </div>
          <p className="text-xs text-white/45 sm:text-sm">
            &copy; {year} Voatomy Labs, Inc. All rights reserved.
          </p>
        </div>
      </div>

      {/* Giant outlined wordmark — full bleed */}
      <div
        className="pointer-events-none relative mt-2 w-full overflow-hidden sm:mt-6"
        style={{ height: "clamp(140px, 32vw, 480px)" }}
        aria-hidden
      >
        <p
          className="absolute left-1/2 w-[100vw] max-w-none -translate-x-1/2 text-center font-heading font-bold leading-[0.76] tracking-[-0.05em] text-transparent [WebkitTextStroke:1px_rgba(255,255,255,0.85)] sm:[WebkitTextStroke:2px_rgba(255,255,255,0.9)]"
          style={{
            bottom: "-4%",
            fontSize: "clamp(7.5rem, 28vw, 44rem)",
          }}
        >
          voatomy
        </p>
      </div>
    </footer>
  );
}
