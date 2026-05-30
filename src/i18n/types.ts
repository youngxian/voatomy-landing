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
  onboarding: {
    shell: {
      stepOf: string;
      signOut: string;
      encrypted: string;
      soc2: string;
    };
    steps: Record<string, string>;
    roles: Record<string, string>;
    welcome: {
      title: string;
      titleWithName: string;
      subtitleSinglePrefix: string;
      subtitleSingleSuffix: string;
      subtitleMulti: string;
      roleLabel: string;
      roleHint: string;
      yourProduct: string;
      productSetupNote: string;
      productPickerLabel: string;
      productPickerHint: string;
      getStarted: string;
      saving: string;
      securityNote: string;
      errors: {
        roleRequired: string;
        productRequired: string;
        profileLoadFailed: string;
        sessionFailed: string;
      };
    };
  };
  auth: {
    shell: {
      byline: string;
      terms: string;
      privacy: string;
      licenses: string;
      cookiePolicy: string;
      promoLabel: string;
      promoHeadline: string;
      pills: { ems: string; techLeads: string; productLeaders: string; ctos: string };
      soc2: string;
      encryption: string;
      neverStoresCode: string;
    };
    common: {
      workEmail: string;
      emailPlaceholder: string;
      ssoEmailPlaceholder: string;
      password: string;
      passwordPlaceholder: string;
      back: string;
      backToSignIn: string;
      demo: string;
      sso: string;
      or: string;
      continueGoogle: string;
      continueGitHub: string;
      somethingWrong: string;
      serverUnreachable: string;
    };
    login: {
      title: string;
      titleOtp: string;
      subtitle: string;
      subtitleOtp: string;
      signInEmail: string;
      forgotPassword: string;
      continueSso: string;
      redirectingSso: string;
      ssoHint: string;
      ssoEmailLabel: string;
      signInWithEmail: string;
      logIn: string;
      signingIn: string;
      emailSignInLink: string;
      sending: string;
      verify: string;
      verifying: string;
      resendCode: string;
      codeExpires: string;
      codeExpired: string;
      resendNewCode: string;
      noAccount: string;
      signUp: string;
      accountExistsHint: string;
      invalidCredentials: string;
      invalidOtp: string;
      resendFailed: string;
      enterEmailFirst: string;
      noAccountFound: string;
      ssoNotConfigured: string;
    };
    signup: {
      title: string;
      subtitle: string;
      firstName: string;
      firstNamePlaceholder: string;
      lastName: string;
      lastNamePlaceholder: string;
      sendLink: string;
      sendingLink: string;
      hasAccount: string;
      signIn: string;
    };
    verifyEmail: {
      title: string;
      sentTo: string;
      expires: string;
      inboxHint: string;
      devMode: string;
      devHint: string;
      newLinkSent: string;
      resendFailed: string;
      didntReceive: string;
      resendIn: string;
      resendLink: string;
      differentEmail: string;
    };
    forgotPassword: {
      title: string;
      subtitle: string;
      sendReset: string;
      sending: string;
      successTitle: string;
      successSent: string;
      successExpires: string;
      resend: string;
    };
    resetPassword: {
      title: string;
      subtitle: string;
      newPassword: string;
      confirmPassword: string;
      submit: string;
      submitting: string;
      successTitle: string;
      successSubtitle: string;
      successRedirect: string;
      goToSignIn: string;
      passwordMustHave: string;
      rules: {
        minLength: string;
        uppercase: string;
        number: string;
        special: string;
        mismatch: string;
      };
      errors: {
        expired: string;
        used: string;
        invalid: string;
      };
    };
    validation: {
      emailInvalid: string;
      passwordRequired: string;
      otpLength: string;
      firstNameRequired: string;
      lastNameRequired: string;
    };
    pages: {
      signingIn: string;
      signInFailed: string;
      noSignInToken: string;
      noAuthToken: string;
      youreIn: string;
      redirectingDashboard: string;
      verifyingLink: string;
      linkExpired: string;
      linkExpiredVerify: string;
      requestNewLink: string;
      invalidLink: string;
      linkNoLongerValid: string;
      tokenAlreadyUsed: string;
      signInLinkInvalid: string;
      ssoFailed: string;
      ssoFailedDefault: string;
      expired: {
        title: string;
        subtitle: string;
        newLinkSent: string;
        newLinkSubtitle: string;
        sendNewLink: string;
        sending: string;
        invalidEmail: string;
        failedToSend: string;
      };
      payment: {
        verifying: string;
        verifyingSubtitle: string;
        success: string;
        successSubtitle: string;
        error: string;
        verifyFailed: string;
        backToDashboard: string;
      };
    };
  };
};
