"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { AUDIENCES } from "@/lib/constants";
import { PersonaIllustration } from "@/components/illustrations/abstract-illustrations";

const PERSONA_VARIANTS = ["manager", "product"] as const;

export function AudienceSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="light-surface-typography bg-amber-light px-4 py-16 sm:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-container">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-amber/80">
              Who It&apos;s For
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1">
              Built for teams that ship.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {AUDIENCES.map((aud, i) => (
              <article
                key={aud.title}
                className={cn(
                  "rounded-2xl border border-charcoal/10 bg-white p-8 transition-all duration-500 hover:border-amber/25 hover:shadow-md",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6",
                )}
                style={{
                  transitionDelay: isVisible ? `${i * 120}ms` : "0ms",
                }}
              >
                <div className="flex items-start gap-4">
                  <PersonaIllustration
                    variant={PERSONA_VARIANTS[i] ?? "manager"}
                    className="h-16 w-16 flex-shrink-0"
                    primaryColor={i === 0 ? "#004838" : "#073127"}
                    secondaryColor={i === 0 ? "#E2FB6C" : "#004838"}
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal">
                      {aud.title}
                    </h3>
                    <p className="mt-1 text-sm text-charcoal/60">{aud.description}</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2">
                  {aud.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-2 text-sm text-charcoal/70"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <Link
                  href={aud.ctaHref}
                  className="mt-6 inline-block text-sm font-semibold text-teal hover:underline"
                >
                  {aud.cta} &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
