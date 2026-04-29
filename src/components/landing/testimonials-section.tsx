"use client";

import { TESTIMONIALS } from "@/lib/constants";
import { ScrollReveal } from "./scroll-reveal";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=transparent`;
}

export function TestimonialsSection() {
  const featured = TESTIMONIALS[0];
  const rest = TESTIMONIALS.slice(1, 7);
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  return (
    <section className="light-surface-typography bg-rose-light px-4 py-16 sm:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-container">
        <ScrollReveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose/10 px-3 py-1 text-sm font-semibold text-rose">
                <span
                className="h-2 w-2 rounded-full bg-rose"
                aria-hidden="true"
              />
              Proof it Works
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-charcoal sm:text-heading-1">
              Don&apos;t just take our word for it.
            </h2>
            <p className="mx-auto mt-2 max-w-[600px] text-body-lg text-charcoal/60">
              Teams are already seeing{" "}
              <span className="font-semibold text-teal">
                87% estimation accuracy
              </span>{" "}
              and{" "}
              <span className="font-semibold text-teal">
                80% faster planning
              </span>
              .
            </p>
          </div>

          {/* Big impact number + image side by side */}
          <div
            ref={statsRef}
            className={cn(
              "mt-12 grid gap-4 sm:grid-cols-2 transition-all duration-700",
              statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            {/* Left: Big number */}
            <div className="rounded-2xl border border-charcoal/10 bg-white p-8 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-widest text-charcoal/40">Sprint points planned</p>
              <div className="mt-3 text-5xl font-bold tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
                26,900+
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-charcoal/8 pt-5">
                {[
                  { value: "1,200+", label: "Teams on waitlist" },
                  { value: "87%", label: "Estimation accuracy" },
                  { value: "3 min", label: "Average setup time" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-xl font-bold text-teal sm:text-2xl">{item.value}</div>
                    <div className="mt-0.5 text-[11px] text-charcoal/50">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image + featured quote overlay */}
            <div className="relative overflow-hidden rounded-2xl border border-charcoal/10">
              <Image
                src="/images/landing/meeting.jpg"
                alt="Engineering team in sprint planning session"
                width={600}
                height={400}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              {featured && (
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Quote className="h-6 w-6 text-accent-lime/80" />
                  <p className="mt-2 text-sm leading-relaxed text-white/90 line-clamp-3">
                    {featured.text}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={avatarUrl(featured.author)}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full bg-white/20 ring-1 ring-white/30"
                      loading="lazy"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white">{featured.author}</span>
                      <span className="ml-1.5 text-[10px] text-white/60">{featured.role}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Testimonial grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((review, i) => (
              <article
                key={review.author}
                className="rounded-2xl border border-charcoal/10 bg-white p-6 transition-all duration-500 hover:shadow-md opacity-0 translate-y-6 group-data-[visible=true]/reveal:opacity-100 group-data-[visible=true]/reveal:translate-y-0"
                style={{
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div className="flex gap-0.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s}>&#9733;</span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-charcoal/70">{review.text}</p>
                <div className="mt-5 flex items-center gap-3 border-t border-charcoal/5 pt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatarUrl(review.author)}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full bg-teal/10"
                    loading="lazy"
                  />
                  <div>
                    <span className="text-sm font-semibold text-charcoal">
                      {review.author}
                    </span>
                    <div className="text-xs text-charcoal/50">
                      {review.role}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
