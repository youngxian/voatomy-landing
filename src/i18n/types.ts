export type Dictionary = {
  meta: {
    siteDescription: string;
  };
  announcement: {
    badge: string;
    headline: string;
    description: string;
    cta: string;
  };
  nav: {
    platform: string;
    solutions: string;
    resources: string;
    pricing: string;
    customers: string;
    contact: string;
    logIn: string;
    watchDemo: string;
    getDemo: string;
    startFreeTrial: string;
    goToDashboard: string;
    skipToContent: string;
    industries: string;
  };
  hero: {
    headlinePrefix: string;
    headlineBridge: string;
    headlineInline: string;
    headlineSuffix: string;
    webinarPill: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    socialProof: string;
    ratingG2: string;
    ratingBeta: string;
    ratingG2Label: string;
    ratingBetaLabel: string;
  };
  why: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    items: readonly { title: string; desc: string }[];
  };
  customers: {
    eyebrow: string;
    title: string;
    readStory: string;
    resultsTitleLead: string;
    resultsTitleAccent: string;
    resultsSubtitle: string;
    stats: readonly { value: string; label: string }[];
    g2Rating: string;
    g2Label: string;
    betaRating: string;
    betaLabel: string;
  };
  workflow: {
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    intro: string;
    steps: readonly {
      step: string;
      title: string;
      subtitle: string;
      desc: string;
    }[];
    cta: string;
  };
  solutions: {
    eyebrow: string;
    title: string;
    titleLead: string;
    titleAccent: string;
    teamsTab: string;
    industriesTab: string;
    learnMore: string;
  };
  cta: {
    title: string;
    subtitle: string;
    startFreeTrial: string;
    getDemo: string;
    g2: string;
    beta: string;
    trust: readonly { title: string; desc: string }[];
  };
  faq: {
    titleLead: string;
    titleAccent: string;
  };
  footer: {
    tagline: string;
    products: string;
    productDemos: string;
    demosHint: string;
  };
};
