import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Check, Briefcase, MapPin, Building2 } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { cms } from "@/lib/cms";
import { buildAlternates, buildBreadcrumbSchema, buildCanonicalUrl, BASE } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { JobApplicationForm } from "@/components/JobApplicationForm";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    cms.getJobSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const job = await cms.getJob(slug);
  if (!job) return {};
  const l = locale as Locale;
  return {
    title: job.seo.title[l],
    description: job.seo.description[l],
    alternates: buildAlternates(locale, `/career/${slug}`),
    openGraph: { url: buildCanonicalUrl(locale, `/career/${slug}`) },
  };
}

export default async function JobDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  setRequestLocale(raw);
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const job = await cms.getJob(slug);
  if (!job) notFound();

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title[locale],
    description: job.description[locale],
    employmentType: "FULL_TIME",
    hiringOrganization: { "@type": "Organization", name: "ettoryx", sameAs: BASE },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location[locale] } },
    datePosted: job.datePosted,
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "ettoryx", url: `${BASE}/${locale}` },
    { name: t("nav.career"), url: `${BASE}/${locale}/career` },
    { name: job.title[locale], url: `${BASE}/${locale}/career/${slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageHero eyebrow={t("nav.career")} title={job.title[locale]}>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-caption text-ink-secondary">
          <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4 text-gold" /> {job.department[locale]}</span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gold" /> {job.location[locale]}</span>
          <Badge variant="gold">{job.format[locale]}</Badge>
        </div>
      </PageHero>

      <section className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-10">
            <Reveal>
              <div>
                <h2 className="font-display text-h4 text-ink-primary">{t("career.detail.about")}</h2>
                <p className="mt-4 text-body text-ink-secondary">{job.description[locale]}</p>
              </div>
            </Reveal>
            <Reveal>
              <div>
                <h2 className="font-display text-h4 text-ink-primary">{t("career.detail.requirements")}</h2>
                <ul className="mt-4 space-y-3">
                  {job.requirements[locale].map((r) => (
                    <li key={r} className="flex items-start gap-3 text-body text-ink-secondary">
                      <Briefcase className="h-5 w-5 shrink-0 text-gold" /> {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal>
              <div>
                <h2 className="font-display text-h4 text-gold-gradient">{t("career.detail.offer")}</h2>
                <ul className="mt-4 space-y-3">
                  {job.offer[locale].map((o) => (
                    <li key={o} className="flex items-start gap-3 text-body text-ink-secondary">
                      <Check className="h-5 w-5 shrink-0 text-gold" /> {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-line bg-bg-surface/40 p-6 lg:p-8">
              <h2 className="mb-6 font-display text-h4 text-ink-primary">{t("career.detail.apply")}</h2>
              <JobApplicationForm jobSlug={job.slug} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
