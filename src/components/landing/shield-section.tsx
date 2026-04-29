"use client";

import Link from "next/link";

export function ShieldSection() {
  return (
    <section className="bg-theme-s px-4 py-16 text-theme sm:py-24 transition-colors duration-300">
      <div className="mx-auto grid max-w-container gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-heading-1">Mission Control for multi-agent execution</h2>
          <p className="mt-3 text-body-lg text-theme-s">
            Connect agents to product memory, requirements, and tasks with strict permissions, clear
            boundaries, and full action logs.
          </p>
          <ul className="mt-6 space-y-3 text-body-base text-theme-s">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-lime" />
              One-click context connectors
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-lime" />
              Role-scoped permissions and constraints
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-lime" />
              Trace logs for every automated action
            </li>
          </ul>
          <Link href="#" className="mt-6 inline-block text-sm font-semibold text-teal hover:underline">
            Explore mission control
          </Link>
        </div>
        <div
          className="min-h-[300px] rounded-card border border-theme bg-theme-subtle transition-colors duration-300"
          role="img"
          aria-label="Mission Control preview"
        />
      </div>
    </section>
  );
}
