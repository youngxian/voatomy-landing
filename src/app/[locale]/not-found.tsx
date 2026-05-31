"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Atlas – AI Sprint Planner", href: "/products/atlas" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Get a demo", href: "/demo" },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0d0e10] px-4 text-center">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 40%, #f16e2c18, transparent)",
        }}
        aria-hidden
      />

      <div className="relative z-10">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Voatomy">
          <span className="grid h-[18px] w-[18px] place-items-center rounded-md bg-[#f16e2c] shadow-sm shadow-[#f16e2c]/25" aria-hidden>
            <span className="block h-2 w-2 rounded-[3px] bg-black/20" />
          </span>
          <span className="text-[24px] font-bold tracking-tight text-white">Voatomy</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <p className="text-[120px] font-black leading-none tracking-tight text-white/[0.06] select-none sm:text-[180px]">
            404
          </p>
          <div className="-mt-8 sm:-mt-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f16e2c]/25 bg-[#f16e2c]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#f16e2c]">
              Page not found
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              This page doesn't exist.
            </h1>
            <p className="mx-auto mt-3 max-w-[400px] text-base text-white/40">
              The URL may have changed, or you may have followed an outdated link.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#f16e2c] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#f16e2c]/25 transition-all hover:shadow-[#f16e2c]/40 hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/25">
              Or go to
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/50 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/80"
                >
                  {link.label}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
