import type { Locale } from "@/i18n/routing";

export type LocalizedString = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export interface SeoFields {
  title: LocalizedString;
  description: LocalizedString;
  ogImage?: string;
}

export interface ProcessStep {
  title: LocalizedString;
  description: LocalizedString;
}

export interface FaqItem {
  question: LocalizedString;
  answer: LocalizedString;
}

export interface Service {
  slug: string;
  icon: string; // lucide icon name
  title: LocalizedString;
  short: LocalizedString;
  problem: LocalizedString;
  solution: LocalizedString;
  process: ProcessStep[];
  technologies: string[];
  faq: FaqItem[];
  relatedCases: string[]; // case slugs
  seo: SeoFields;
}

export interface Product {
  slug: string;
  name: string;
  icon: string;
  category: LocalizedString;
  short: LocalizedString;
  value: LocalizedString;
  url: string;
  isMock: boolean;
}

export interface CaseStudy {
  slug: string;
  title: LocalizedString;
  client: string;
  category: LocalizedString;
  industry: LocalizedString;
  result: LocalizedString;
  challenge: LocalizedString;
  solution: LocalizedString;
  technologies: string[];
  metrics: { label: LocalizedString; value: string }[];
  testimonial?: { quote: LocalizedString; author: string; role: LocalizedString };
  seo: SeoFields;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: LocalizedString;
  bio: LocalizedString;
  leadership: boolean;
  developer?: boolean;
  linkedin: string;
  photo?: string;
}

export interface JobListing {
  slug: string;
  title: LocalizedString;
  department: LocalizedString;
  format: LocalizedString; // office / remote / hybrid
  location: LocalizedString;
  description: LocalizedString;
  requirements: LocalizedList;
  offer: LocalizedList;
  seo: SeoFields;
  /** ISO date string (YYYY-MM-DD) when the posting was published */
  datePosted: string;
}

export interface Testimonial {
  quote: LocalizedString;
  author: string;
  role: LocalizedString;
  company: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: LocalizedString;
}
