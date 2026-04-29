"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  FOOTER_COLUMNS,
  FOOTER_PRODUCTS,
  FOOTER_SOCIALS,
  PRODUCT_DEMO_LINKS,
} from "@/lib/constants";

function SocialIcon({ icon, className }: { icon: string; className?: string }) {
  const c = cn("h-4 w-4", className);
  switch (icon) {
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={c}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={c}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={c}>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case "discord":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={c}>
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={c}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    default:
      return null;
  }
}

function FooterLinkColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  className?: string;
}) {
  return (
    <nav className={cn("min-w-0", className)} aria-label={title}>
      <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/45">
        {title}
      </h4>
      <ul className="mt-3.5 space-y-2 sm:space-y-2.5">
        {links.map((link) => (
          <li key={`${title}-${link.href}`}>
            <Link
              href={link.href}
              className="inline-block text-sm leading-snug text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ProductsAndDemosBlock() {
  return (
    <div className="min-w-0 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
      <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/45">
        Products
      </h4>
      <ul className="mt-3.5 grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-2">
        {FOOTER_PRODUCTS.map((product) => (
          <li key={product.label} className="min-w-0">
            <Link
              href={product.href}
              className="block truncate text-sm font-medium text-white/85 transition-colors hover:text-white"
              title={product.label}
            >
              {product.label}
            </Link>
            <span className="mt-0.5 block truncate text-[11px] text-white/40" title={product.desc}>
              {product.desc}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 border-t border-white/[0.08] pt-4">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/45">
          Product demos
        </h4>
        <p className="mt-1 text-[11px] leading-relaxed text-white/40">
          Short guided tours for each product.
        </p>
        <ul className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {PRODUCT_DEMO_LINKS.map((d) => (
            <li key={d.key}>
              <Link
                href={d.href}
                className="flex items-center justify-center rounded-lg bg-white/[0.06] px-2 py-2 text-center text-xs font-semibold tracking-tight text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white"
              >
                {d.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Footer() {
  const platformCol = FOOTER_COLUMNS.find((c) => c.title === "Platform")!;
  const solutionsCol = FOOTER_COLUMNS.find((c) => c.title === "Solutions")!;
  const useCasesCol = FOOTER_COLUMNS.find((c) => c.title === "Use Cases")!;
  const resourcesCol = FOOTER_COLUMNS.find((c) => c.title === "Resources")!;
  const legalCol = FOOTER_COLUMNS.find((c) => c.title === "Legal")!;

  return (
    <footer className="relative z-20 bg-teal-dark text-white overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/10 py-14 sm:py-16 lg:py-20">
          <div className="flex flex-col gap-12 lg:gap-14 xl:flex-row xl:items-start xl:justify-between xl:gap-16">
            <div className="max-w-md shrink-0 xl:max-w-[280px]">
              <Link
                href="/"
                className="group inline-flex items-center gap-2.5 transition-opacity hover:opacity-85"
              >
                <span
                  className="grid h-9 w-9 place-items-center rounded-lg shadow-sm shadow-black/20"
                  style={{ background: "#E2FB6C" }}
                  aria-hidden
                >
                  <span className="block h-3 w-3 rounded-[3px] bg-teal/35" />
                </span>
                <span className="text-lg font-bold tracking-tight text-white">Voatomy</span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-white/65">
                The AI Product Operating System. Ship faster with data-driven sprint plans.
              </p>
            </div>

            <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 md:gap-x-10 md:gap-y-12 xl:max-w-4xl">
              <FooterLinkColumn title={platformCol.title} links={platformCol.links} />
              <FooterLinkColumn title={solutionsCol.title} links={solutionsCol.links} />
              <FooterLinkColumn title={useCasesCol.title} links={useCasesCol.links} />
              <FooterLinkColumn title={resourcesCol.title} links={resourcesCol.links} />
              <FooterLinkColumn title={legalCol.title} links={legalCol.links} />
              <div className="min-w-0">
                <ProductsAndDemosBlock />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-6 py-8 sm:flex-row sm:gap-4">
          <nav
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs text-white/45 sm:justify-start"
            aria-label="Legal and copyright"
          >
            <span className="shrink-0">&copy; {new Date().getFullYear()} Voatomy Labs, Inc.</span>
            {legalCol.links.map((link) => (
              <span key={link.href} className="flex shrink-0 items-center gap-x-2">
                <span className="text-white/25" aria-hidden>
                  &middot;
                </span>
                <Link href={link.href} className="transition-colors hover:text-white/85">
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            {FOOTER_SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-white/45 transition-all hover:bg-white/[0.07] hover:text-white"
              >
                <SocialIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
