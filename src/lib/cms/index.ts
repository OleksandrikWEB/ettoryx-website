/**
 * CMS repository/service layer.
 *
 * Backed by local typed mock data for now. This is the single seam where a real
 * headless CMS (Sanity / Strapi / Payload) can be plugged in later — swap the
 * implementations below to fetch from the CMS API without touching UI components.
 */
import {
  services,
  products,
  caseStudies,
  team,
  jobs,
  testimonials,
  stats,
  techStack,
  clientLogos,
} from "./data";
import type {
  Service,
  Product,
  CaseStudy,
  TeamMember,
  JobListing,
  Testimonial,
  Stat,
} from "./types";

export const cms = {
  // Services
  getServices: async (): Promise<Service[]> => services,
  getService: async (slug: string): Promise<Service | undefined> =>
    services.find((s) => s.slug === slug),
  getServiceSlugs: (): string[] => services.map((s) => s.slug),

  // Products
  getProducts: async (): Promise<Product[]> => products,
  getProduct: async (slug: string): Promise<Product | undefined> =>
    products.find((p) => p.slug === slug),

  // Case studies
  getCaseStudies: async (): Promise<CaseStudy[]> => caseStudies,
  getCaseStudy: async (slug: string): Promise<CaseStudy | undefined> =>
    caseStudies.find((c) => c.slug === slug),
  getCaseStudySlugs: (): string[] => caseStudies.map((c) => c.slug),
  getFeaturedCases: async (n = 3): Promise<CaseStudy[]> => caseStudies.slice(0, n),

  // Team
  getTeam: async (): Promise<TeamMember[]> => team,
  getLeadership: async (): Promise<TeamMember[]> => team.filter((t) => t.leadership),
  getDevelopers: async (): Promise<TeamMember[]> => team.filter((t) => t.developer),

  // Jobs
  getJobs: async (): Promise<JobListing[]> => jobs,
  getJob: async (slug: string): Promise<JobListing | undefined> =>
    jobs.find((j) => j.slug === slug),
  getJobSlugs: (): string[] => jobs.map((j) => j.slug),

  // Misc
  getTestimonials: async (): Promise<Testimonial[]> => testimonials,
  getStats: async (): Promise<Stat[]> => stats,
  getTechStack: (): string[] => techStack,
  getClientLogos: (): string[] => clientLogos,
};

export type { Service, Product, CaseStudy, TeamMember, JobListing, Testimonial, Stat };
