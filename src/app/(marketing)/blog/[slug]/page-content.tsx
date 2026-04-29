"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Chip } from "@/components/ui/chip";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  User,
  Share2,
  BookOpen,
  ChevronRight,
} from "lucide-react";

const BRAND_GREEN = "#12FF80";

const CATEGORY_COLORS: Record<string, string> = {
  Engineering: "#12FF80",
  Product: "#8b5cf6",
  Design: "#f472b6",
  Data: "#38bdf8",
  Culture: "#fbbf24",
};

const ALL_POSTS = [
  { slug: "story-point-delusion", title: "The Story Point Delusion", category: "Engineering", date: "Jan 15, 2026", readTime: "8 min read" },
  { slug: "how-we-built-atlas", title: "How We Built ATLAS: From Prototype to Production", category: "Engineering", date: "Jan 8, 2026", readTime: "12 min read" },
  { slug: "revenue-weighted-backlogs", title: "Revenue-Weighted Backlogs: A PM's Guide", category: "Product", date: "Dec 28, 2025", readTime: "6 min read" },
  { slug: "tech-debt-business-problem", title: "Tech Debt Is Not a Technical Problem", category: "Culture", date: "Dec 20, 2025", readTime: "7 min read" },
  { slug: "case-against-story-points", title: "The Case Against Story Points", category: "Data", date: "Dec 12, 2025", readTime: "10 min read" },
  { slug: "cross-team-alignment", title: "Cross-Team Alignment at Scale", category: "Product", date: "Dec 5, 2025", readTime: "9 min read" },
  { slug: "designing-voatomy", title: "Designing Voatomy: Our Design System Journey", category: "Design", date: "Nov 28, 2025", readTime: "8 min read" },
];

const POST_DATA: Record<string, {
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  body: string[];
}> = {
  "story-point-delusion": {
    title: "The Story Point Delusion: Why Sprint Estimates Are Statistically Meaningless",
    description: "We analyzed 14,000 sprints across 340 engineering teams and found that story point estimates have virtually zero predictive power.",
    author: "Voatomy Team",
    date: "Jan 15, 2026",
    readTime: "8 min read",
    category: "Engineering",
    body: [
      "Every engineering team estimates. Most use story points — those Fibonacci-flavored numbers that promise to capture complexity, effort, and uncertainty in a single integer. The problem? They don't work.",
      "We analyzed 14,000 sprints across 340 engineering teams of varying sizes, from 4-person startups to 200-person enterprise squads. The correlation between story point estimates and actual delivery time was 0.12 — barely above random noise.",
      "The core issue is that story points conflate three distinct dimensions: technical complexity, effort required, and uncertainty. A task can be technically simple but high-effort (migrating 500 database records), or technically complex but low-effort (a single algorithm change). Collapsing these into one number destroys the signal.",
      "What actually predicts sprint outcomes? Our data points to three factors: historical cycle time for similar work items, the number of cross-team dependencies, and the ratio of new code to modified code. ATLAS uses these signals — not human intuition — to generate sprint plans with 87% confidence intervals.",
      "This doesn't mean human judgment is worthless. Engineers have crucial context about organizational dynamics, upcoming holidays, and technical debt that no model can capture. The trick is combining machine precision with human context — which is exactly what ATLAS does.",
      "The future of sprint planning isn't more precise story points. It's probabilistic forecasting grounded in your team's actual delivery data. And that future is here.",
    ],
  },
  "how-we-built-atlas": {
    title: "How We Built ATLAS: From Prototype to Production",
    description: "The architectural decisions, trade-offs, and late-night debugging sessions that shaped our AI sprint planner.",
    author: "Ade Ogunleye",
    date: "Jan 8, 2026",
    readTime: "12 min read",
    category: "Engineering",
    body: [
      "ATLAS started as a weekend hack — a Python script that pulled Jira tickets and GitHub PRs into a single view. Eighteen months later, it's an AI sprint planner processing millions of signals per day.",
      "The first architectural decision was the hardest: should we build a monolith or start with microservices? We chose a modular monolith — a single deployable unit with clear internal boundaries.",
      "The AI layer went through three rewrites. Version one used a simple regression model. Version two added a transformer-based complexity analyzer. Version three — the current architecture — uses an ensemble approach that combines code analysis, historical patterns, and team dynamics.",
      "The biggest technical challenge was latency. Sprint planning is interactive — engineers expect sub-second responses. But our AI models needed 3-4 seconds per analysis. The solution was a pre-computation pipeline that continuously analyzes repositories in the background.",
      "If we could start over, we'd invest in observability earlier. We didn't add structured logging until month six, and those first six months of debugging were significantly harder than they needed to be.",
      "The lesson? Build for the problem you have today, but leave doors open for the problems you'll have tomorrow.",
    ],
  },
  "revenue-weighted-backlogs": {
    title: "Revenue-Weighted Backlogs: A PM's Guide",
    description: "How to attach revenue signals to every backlog item so your team always ships what matters most.",
    author: "Maya Chen",
    date: "Dec 28, 2025",
    readTime: "6 min read",
    category: "Product",
    body: [
      "Your backlog is lying to you. The prioritization frameworks most teams use share a fatal flaw: they treat revenue impact as a guess rather than a measurement.",
      "Revenue-weighted backlogs flip this by connecting every feature request, bug report, and improvement to actual revenue data from your CRM, support system, and product analytics.",
      "LOOP ingests deal data from Salesforce, maps feature requests to pipeline value, and surfaces the total addressable revenue for each backlog item.",
      "The key is making this data ambient, not buried in a spreadsheet. When revenue context shows up directly in Jira or Linear, it changes how engineers think about their work.",
      "Start small: connect your CRM to LOOP, map your top 20 deals to feature requests, and see what emerges. Most teams are shocked by what they find.",
    ],
  },
  "tech-debt-business-problem": {
    title: "Tech Debt Is Not a Technical Problem — It's a Business One",
    description: "Framing tech debt as an engineering concern loses the argument every time.",
    author: "James Okafor",
    date: "Dec 20, 2025",
    readTime: "7 min read",
    category: "Culture",
    body: [
      "Every quarter, the same ritual plays out: engineering asks for time to address tech debt, leadership asks for a business case, engineering can't provide one, and the debt grows.",
      "The problem isn't that leadership doesn't care about code quality. It's that 'tech debt' is an engineering abstraction that doesn't map to any metric the business tracks.",
      "PHANTOM quantifies tech debt by analyzing code complexity trends, correlating them with delivery metrics, and expressing the result in dollars and days.",
      "When tech debt has a dollar figure attached, it stops being an engineering concern and starts being a business decision. And business decisions get resources.",
    ],
  },
  "case-against-story-points": {
    title: "The Case Against Story Points",
    description: "A deep statistical analysis of why Fibonacci-based estimation creates a false sense of precision.",
    author: "Priya Sharma",
    date: "Dec 12, 2025",
    readTime: "10 min read",
    category: "Data",
    body: [
      "Story points have become so embedded in agile practice that questioning them feels like heresy. But the statistical foundations of Fibonacci-based estimation are remarkably weak.",
      "Our analysis of 50,000 tickets across 400 teams shows that the distribution of actual completion times within a story point bucket is nearly identical regardless of the bucket.",
      "Probabilistic forecasting offers a fundamentally better approach. Instead of asking 'how many points is this?', ask 'what does our historical data say about how long similar work takes?'",
      "The transition away from story points doesn't require abandoning estimation entirely. It means replacing subjective, consensus-driven numbers with data-driven ranges.",
    ],
  },
  "cross-team-alignment": {
    title: "Cross-Team Alignment at Scale",
    description: "When you grow past three squads, alignment stops being a Slack message and starts being an engineering problem.",
    author: "Tunde Adebayo",
    date: "Dec 5, 2025",
    readTime: "9 min read",
    category: "Product",
    body: [
      "At three squads, you can keep everyone aligned with a weekly sync. At ten squads, those mechanisms break down completely.",
      "The core challenge is dependency management. When Team A's sprint depends on Team B's API, and Team B is blocked by Team C's infrastructure migration, no amount of Slack messaging can resolve it efficiently.",
      "NEXUS addresses this by building a real-time dependency graph across all teams. It surfaces dependencies before they become blockers.",
      "The most effective organizations treat alignment as a system, not a practice. They invest in tooling, define contracts, and measure cross-team velocity as a first-class metric.",
    ],
  },
  "designing-voatomy": {
    title: "Designing Voatomy: Our Design System Journey",
    description: "From a messy Figma file to a composable, theme-aware component library.",
    author: "Lina Park",
    date: "Nov 28, 2025",
    readTime: "8 min read",
    category: "Design",
    body: [
      "When I joined Voatomy as the first designer, the 'design system' was a Figma file with 47 unnamed frames and three different shades of green.",
      "Six months later, we have a composable, theme-aware component library with 40+ components, dark mode support, and a design-to-code pipeline.",
      "We started with foundations: a color system, a spacing scale, and a type ramp. These three decisions eliminated 80% of design inconsistencies.",
      "The biggest lesson: a design system isn't a Figma library or a component package. It's a shared language between design and engineering.",
    ],
  },
};

function useScrollAnimation() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);
}

export default function BlogPostPage({ slug }: { slug: string }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const post = POST_DATA[slug];
  if (!post) {
    return (
      <Section variant="white" className="py-32 text-center">
        <h1 className="text-heading-1 text-theme mb-4">Post Not Found</h1>
        <p className="text-body-lg text-theme-s mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/blog">
          <Button variant="secondary"><ArrowLeft className="mr-2 h-4 w-4" />Back to Blog</Button>
        </Link>
      </Section>
    );
  }

  const currentIndex = ALL_POSTS.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? ALL_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < ALL_POSTS.length - 1 ? ALL_POSTS[currentIndex + 1] : null;
  const relatedPosts = ALL_POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
  if (relatedPosts.length < 3) {
    const more = ALL_POSTS.filter((p) => p.slug !== slug && p.category !== post.category).slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...more);
  }

  const catColor = CATEGORY_COLORS[post.category] ?? BRAND_GREEN;

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <Section variant="white" container={false} className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-15 blur-[120px]" style={{ background: `radial-gradient(ellipse, ${catColor}, transparent 70%)` }} />
        </div>
        <div className="relative mx-auto w-full max-w-container px-4">
          <div className="max-w-3xl mx-auto">
            <div className={cn("transition-all duration-700", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-theme-s hover:text-theme mb-6 transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Blog
              </Link>
            </div>
            <div className={cn("flex items-center gap-3 mb-4 transition-all duration-700 delay-100", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <Chip dotColor={catColor} className="text-xs">{post.category}</Chip>
              <span className="flex items-center gap-1 text-xs text-theme-m"><Clock className="h-3 w-3" />{post.readTime}</span>
            </div>
            <h1 className={cn("text-display-2 lg:text-display-1 text-theme mb-5 transition-all duration-700 delay-200", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              {post.title}
            </h1>
            <p className={cn("text-body-lg text-theme-s mb-8 transition-all duration-700 delay-300", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              {post.description}
            </p>
            <div className={cn("flex items-center justify-between pt-6 border-t border-theme transition-all duration-700 delay-[400ms]", heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-brand" />
                </div>
                <div>
                  <span className="text-sm font-medium text-theme block">{post.author}</span>
                  <span className="flex items-center gap-1 text-xs text-theme-m"><Calendar className="h-3 w-3" />{post.date}</span>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-sm text-theme-s hover:text-theme transition-colors">
                <Share2 className="h-4 w-4" />Share
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Article Body */}
      <Section variant="white" className="pt-4 pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto">
          <article className="prose-voatomy">
            {post.body.map((paragraph, i) => (
              <p key={i} className="animate-on-scroll text-body-base text-theme-s leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </Section>

      {/* Prev / Next */}
      <Section variant="amber" className="py-12">
        <div className="max-w-3xl mx-auto animate-on-scroll">
          <div className="grid sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="group">
                <Card variant="light" className="h-full hover:border-theme-h transition-all">
                  <span className="text-xs text-theme-m mb-2 block">Previous</span>
                  <span className="text-sm font-semibold text-theme group-hover:text-brand transition-colors flex items-center gap-1">
                    <ArrowLeft className="h-3.5 w-3.5 flex-shrink-0" />{prevPost.title}
                  </span>
                </Card>
              </Link>
            ) : <div />}
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="group">
                <Card variant="light" className="h-full hover:border-theme-h transition-all text-right">
                  <span className="text-xs text-theme-m mb-2 block">Next</span>
                  <span className="text-sm font-semibold text-theme group-hover:text-brand transition-colors flex items-center justify-end gap-1">
                    {nextPost.title}<ArrowRight className="h-3.5 w-3.5 flex-shrink-0" />
                  </span>
                </Card>
              </Link>
            )}
          </div>
        </div>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section variant="white" className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-8 animate-on-scroll">
              <BookOpen className="h-4 w-4 text-brand" />
              <h2 className="text-heading-2 text-theme">Related Articles</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {relatedPosts.map((rp, i) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group">
                  <Card variant="light" className={cn("animate-on-scroll h-full hover:border-theme-h transition-all", `stagger-${i + 1}`)}>
                    <div className="flex items-center justify-between mb-3">
                      <Chip dotColor={CATEGORY_COLORS[rp.category] ?? BRAND_GREEN} className="text-xs">{rp.category}</Chip>
                      <span className="text-xs text-theme-m flex items-center gap-1"><Clock className="h-3 w-3" />{rp.readTime}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-theme group-hover:text-brand transition-colors line-clamp-2">{rp.title}</h3>
                    <span className="flex items-center gap-1 text-xs text-brand mt-3 group-hover:gap-2 transition-all">
                      Read <ChevronRight className="h-3 w-3" />
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}
