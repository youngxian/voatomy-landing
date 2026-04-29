"use client";

export function QuoteStatsSection() {
  return (
    <section className="bg-theme-s px-4 py-16 text-theme sm:py-24 transition-colors duration-300">
      <div className="mx-auto max-w-container text-center">
        <p className="mx-auto max-w-[700px] text-2xl font-medium leading-relaxed text-theme md:text-3xl">
          &ldquo;Voatomy transformed our workflow from guesswork into a visible system. Every
          decision now traces to requirements, code, tests, and launch outcomes.&rdquo;
        </p>
        <p className="mt-6 text-sm text-theme-m">
          <span
            className="mr-2 inline-block h-6 w-6 rounded-full bg-theme-subtle"
            aria-hidden="true"
          />
          VP Product, Growth-Stage SaaS
        </p>

        {/* Stats */}
        <div className="mx-auto mt-10 grid max-w-[600px] grid-cols-3 gap-8">
          {[
            { value: "1", label: "Connected product flow" },
            { value: "12+", label: "AI orchestration modules" },
            { value: "6", label: "Delivery stages with gates" },
          ].map((stat) => (
            <div key={stat.label}>
              <strong className="text-4xl font-bold text-theme md:text-5xl">{stat.value}</strong>
              <span className="mt-1 block text-sm text-theme-m">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
