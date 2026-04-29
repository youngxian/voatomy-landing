import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { MARKETING_INDUSTRY_SLUGS } from "@/lib/industry-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;

  const marketingPages: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/security", priority: 0.7, changeFrequency: "monthly" },
    { path: "/careers", priority: 0.7, changeFrequency: "weekly" },
    { path: "/press", priority: 0.5, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
    { path: "/docs", priority: 0.8, changeFrequency: "weekly" },
    { path: "/changelog", priority: 0.6, changeFrequency: "weekly" },
    { path: "/status", priority: 0.4, changeFrequency: "daily" },
    { path: "/integrations", priority: 0.7, changeFrequency: "monthly" },

    // Legal
    { path: "/privacy", priority: 0.5, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.5, changeFrequency: "monthly" },
    { path: "/cookies", priority: 0.3, changeFrequency: "monthly" },

    // Products
    { path: "/products/atlas", priority: 0.9, changeFrequency: "weekly" },
    { path: "/products/loop", priority: 0.8, changeFrequency: "monthly" },
    { path: "/products/phantom", priority: 0.8, changeFrequency: "monthly" },
    { path: "/products/signal", priority: 0.8, changeFrequency: "monthly" },
    { path: "/products/drift", priority: 0.8, changeFrequency: "monthly" },
    { path: "/products/nexus", priority: 0.8, changeFrequency: "monthly" },

    // Product Demos
    { path: "/products/atlas/demo", priority: 0.7, changeFrequency: "monthly" },
    { path: "/products/loop/demo", priority: 0.7, changeFrequency: "monthly" },
    { path: "/products/phantom/demo", priority: 0.7, changeFrequency: "monthly" },
    { path: "/products/signal/demo", priority: 0.7, changeFrequency: "monthly" },
    { path: "/products/drift/demo", priority: 0.7, changeFrequency: "monthly" },
    { path: "/products/nexus/demo", priority: 0.7, changeFrequency: "monthly" },

    // Solutions
    { path: "/solutions/engineering-managers", priority: 0.8, changeFrequency: "monthly" },
    { path: "/solutions/product-leaders", priority: 0.8, changeFrequency: "monthly" },
    { path: "/solutions/sre-devops", priority: 0.8, changeFrequency: "monthly" },
    { path: "/solutions/design-teams", priority: 0.8, changeFrequency: "monthly" },
    { path: "/solutions/cto-vp-engineering", priority: 0.8, changeFrequency: "monthly" },
    { path: "/solutions/sales-leaders", priority: 0.8, changeFrequency: "monthly" },
    { path: "/solutions/customer-success", priority: 0.8, changeFrequency: "monthly" },

    // Use Cases
    { path: "/use-cases/sprint-planning", priority: 0.8, changeFrequency: "monthly" },
    { path: "/use-cases/feedback-roadmap", priority: 0.7, changeFrequency: "monthly" },
    { path: "/use-cases/cross-team", priority: 0.7, changeFrequency: "monthly" },
    { path: "/use-cases/revenue-intelligence", priority: 0.7, changeFrequency: "monthly" },
    { path: "/use-cases/incident-intelligence", priority: 0.7, changeFrequency: "monthly" },
    { path: "/use-cases/design-system-health", priority: 0.7, changeFrequency: "monthly" },
    { path: "/use-cases/tech-debt-management", priority: 0.7, changeFrequency: "monthly" },

    // Customers
    { path: "/customers", priority: 0.7, changeFrequency: "monthly" },

    // Industries
    { path: "/industries", priority: 0.75, changeFrequency: "monthly" },
    ...MARKETING_INDUSTRY_SLUGS.map((slug) => ({
      path: `/industries/${slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),

    // Roadmap
    { path: "/roadmap", priority: 0.6, changeFrequency: "weekly" },
  ];

  return marketingPages.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
