/** SEO helper utilities for building Next.js Metadata alternates and JSON-LD blocks. */

const BASE = "https://ettoryx.com";
const LOCALES = ["uk", "en"] as const;
const DEFAULT_LOCALE = "uk";

/**
 * Builds `alternates` for Next.js Metadata API.
 * Uses absolute URLs so crawlers resolve canonical/hreflang without a base tag.
 */
export function buildAlternates(locale: string, path = "") {
  const canonical = `${BASE}/${locale}${path}`;
  return {
    canonical,
    languages: Object.fromEntries([
      ...LOCALES.map((l) => [l, `${BASE}/${l}${path}`]),
      ["x-default", `${BASE}/${DEFAULT_LOCALE}${path}`],
    ]) as Record<string, string>,
  };
}

/**
 * Returns the canonical URL for a given locale + path.
 * Useful when you need the URL both for `alternates` and `openGraph.url`.
 */
export function buildCanonicalUrl(locale: string, path = "") {
  return `${BASE}/${locale}${path}`;
}

/** Schema.org BreadcrumbList */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Schema.org Service */
export function buildServiceSchema(opts: {
  name: string;
  description: string;
  url: string;
  providerName: string;
  providerUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      "@type": "Organization",
      name: opts.providerName,
      url: opts.providerUrl,
    },
  };
}

/** Schema.org FAQPage — use on pages that contain a visible FAQ section */
export function buildFaqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Schema.org CreativeWork — use on portfolio / case-study detail pages */
export function buildCaseStudySchema(opts: {
  name: string;
  description: string;
  url: string;
  technologies: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    keywords: opts.technologies.join(", "),
    author: {
      "@type": "Organization",
      name: "ettoryx",
      url: BASE,
    },
  };
}

/** Schema.org Person — use on team / about pages */
export function buildPersonSchema(opts: {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  sameAs?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    jobTitle: opts.jobTitle,
    description: opts.description,
    url: opts.url,
    worksFor: {
      "@type": "Organization",
      name: "ettoryx",
      url: BASE,
    },
    ...(opts.sameAs && opts.sameAs !== "#" ? { sameAs: [opts.sameAs] } : {}),
  };
}

export { BASE };
