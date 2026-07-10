import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Quote } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { cms } from "@/lib/cms";
import { buildAlternates, buildBreadcrumbSchema, buildCaseStudySchema, buildCanonicalUrl, BASE } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { Placeholder } from "@/components/Placeholder";
import { SectionHeader } from "@/components/cards";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    cms.getCaseStudySlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = await cms.getCaseStudy(slug);
  if (!c) return {};
  const l = locale as Locale;
  return {
    title: c.seo.title[l],
    description: c.seo.description[l],
    alternates: buildAlternates(locale, `/portfolio/${slug}`),
    openGraph: { url: buildCanonicalUrl(locale, `/portfolio/${slug}`) },
  };
}

export default async function CaseDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  setRequestLocale(raw);
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const c = await cms.getCaseStudy(slug);
  if (!c) notFound();

  const all = await cms.getCaseStudies();
  const idx = all.findIndex((x) => x.slug === slug);
  const next = all[(idx + 1) % all.length];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "ettoryx", url: `${BASE}/${locale}` },
    { name: t("nav.portfolio"), url: `${BASE}/${locale}/portfolio` },
    { name: c.title[locale], url: `${BASE}/${locale}/portfolio/${slug}` },
  ]);

  const caseStudySchema = buildCaseStudySchema({
    name: c.title[locale],
    description: c.seo.description[locale],
    url: `${BASE}/${locale}/portfolio/${slug}`,
    technologies: c.technologies,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />
      <PageHero eyebrow={c.category[locale]} title={c.title[locale]} subtitle={c.result[locale]}>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="gold">{c.industry[locale]}</Badge>
          <Badge variant="outline">{c.client}</Badge>
        </div>
      </PageHero>

      <section className="container-x py-16 lg:py-20">
        <Reveal>
          <Placeholder alt={`Case study cover — ${c.title[locale]}`} ratio="21/9" label={c.client} />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="font-display text-h4 text-ink-primary">{t("portfolio.detail.challenge")}</h2>
              <p className="mt-4 text-body text-ink-secondary">{c.challenge[locale]}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2 className="font-display text-h4 text-gold-gradient">{t("portfolio.detail.solution")}</h2>
              <p className="mt-4 text-body text-ink-secondary">{c.solution[locale]}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Results */}
      <section className="border-y border-line bg-bg-surface/40 py-16">
        <div className="container-x">
          <Reveal><SectionHeader title={t("portfolio.detail.results")} align="center" /></Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {c.metrics.map((m, i) => (
              <RevealItem key={i} className="text-center">
                <p className="font-display text-5xl font-extrabold text-gold-gradient">{m.value}</p>
                <p className="mt-2 text-body text-ink-secondary">{m.label[locale]}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Technologies + gallery */}
      <section className="container-x py-16 lg:py-20">
        <Reveal>
          <h2 className="font-display text-h4 text-ink-primary">{t("portfolio.detail.technologies")}</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {c.technologies.map((tech) => (
              <Badge key={tech} variant="gold" className="text-body">{tech}</Badge>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Placeholder alt={`Screenshot 1 — ${c.title[locale]}`} ratio="16/10" label={t("portfolio.detail.gallery")} />
            <Placeholder alt={`Screenshot 2 — ${c.title[locale]}`} ratio="16/10" label={t("portfolio.detail.gallery")} />
          </div>
        </Reveal>
      </section>

      {/* Testimonial */}
      {c.testimonial && (
        <section className="container-x py-10">
          <Reveal>
            <blockquote className="mx-auto max-w-3xl rounded-3xl border border-gold/30 bg-bg-surface p-10 text-center">
              <Quote className="mx-auto mb-5 h-9 w-9 text-gold" />
              <p className="font-display text-h5 text-ink-primary">&ldquo;{c.testimonial.quote[locale]}&rdquo;</p>
              <footer className="mt-5 text-body text-ink-secondary">
                <span className="text-gold-light">{c.testimonial.author}</span> — {c.testimonial.role[locale]}
              </footer>
            </blockquote>
          </Reveal>
        </section>
      )}

      {/* Next case */}
      <section className="container-x py-16">
        <Link href={`/portfolio/${next.slug}`} className="group block" data-testid="next-case">
          <div className="flex items-center justify-between rounded-2xl border border-line bg-bg-surface p-8 transition-colors hover:border-gold/60">
            <div>
              <p className="text-caption uppercase tracking-widest text-gold">{t("portfolio.detail.nextCase")}</p>
              <p className="mt-2 font-display text-h4 text-ink-primary">{next.title[locale]}</p>
            </div>
            <ArrowRight className="h-6 w-6 text-gold transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </section>

      <section className="container-x pb-20 text-center">
        <Link href="/contacts" className={cn(buttonVariants({ size: "lg" }))}>
          {t("cta.discussProject")} <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  );
}
