import { SITE_CONFIG, PRODUCTS, FAQ_ITEMS, TESTIMONIALS } from "@/lib/constants";

/* ---------- generic renderer ---------- */

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ---------- schema helpers ---------- */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/og.png`,
    sameAs: [
      "https://x.com/voatomy",
      "https://linkedin.com/company/voatomy",
      "https://github.com/voatomy",
    ],
    description: SITE_CONFIG.description,
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
  };
}

export function productJsonLd(productKey: string) {
  const product = PRODUCTS.find((p) => p.key === productKey);
  if (!product) return null;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${product.name} by ${SITE_CONFIG.name}`,
    applicationCategory: "BusinessApplication",
    description: product.description,
    url: `${SITE_CONFIG.url}${product.href}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free tier available",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
  };
}

export function faqPageJsonLd(
  items: readonly { question: string; answer: string }[] = FAQ_ITEMS,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function testimonialsJsonLd(
  reviews: readonly { text: string; author: string; role: string; stars: number }[] = TESTIMONIALS,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    review: reviews.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.stars,
        bestRating: 5,
      },
      author: {
        "@type": "Person",
        name: r.author,
        jobTitle: r.role,
      },
      reviewBody: r.text,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue:
        reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length,
      reviewCount: reviews.length,
      bestRating: 5,
    },
  };
}

export function breadcrumbJsonLd(
  crumbs: { name: string; href: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_CONFIG.url}${crumb.href}`,
    })),
  };
}
