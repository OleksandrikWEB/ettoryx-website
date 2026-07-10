import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { cms } from "@/lib/cms";
import { routing } from "@/i18n/routing";
import { buildAlternates, buildBreadcrumbSchema, buildServiceSchema, buildFaqSchema, buildCanonicalUrl, BASE } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CaseCard, SectionHeader } from "@/components/cards";
import { FinalCta } from "@/components/sections/FinalCta";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    cms.getServiceSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await cms.getService(slug);
  if (!service) return {};
  const l = locale as Locale;
  return {
    title: service.seo.title[l],
    description: service.seo.description[l],
    alternates: buildAlternates(locale, `/services/${slug}`),
    openGraph: { url: buildCanonicalUrl(locale, `/services/${slug}`) },
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  setRequestLocale(raw);
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const service = await cms.getService(slug);
  if (!service) notFound();

  const allCases = await cms.getCaseStudies();
  const related = allCases.filter((c) => service.relatedCases.includes(c.slug));

  const serviceSchema = buildServiceSchema({
    name: service.title[locale],
    description: service.seo.description[locale],
    url: `${BASE}/${locale}/services/${slug}`,
    providerName: "ettoryx",
    providerUrl: BASE,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "ettoryx", url: `${BASE}/${locale}` },
    { name: t("nav.services"), url: `${BASE}/${locale}/services` },
    { name: service.title[locale], url: `${BASE}/${locale}/services/${slug}` },
  ]);

  const faqSchema = buildFaqSchema(
    service.faq.map((f) => ({ question: f.question[locale], answer: f.answer[locale] }))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHero eyebrow={t("nav.services")} title={service.title[locale]} subtitle={service.short[locale]} />

      <section className="container-x py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-line bg-bg-surface p-8">
              <h2 className="font-display text-h4 text-ink-primary">{t("services.detail.problem")}</h2>
              <p className="mt-4 text-body text-ink-secondary">{service.problem[locale]}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-gold/30 bg-bg-surface p-8">
              <h2 className="font-display text-h4 text-gold-gradient">{t("services.detail.solution")}</h2>
              <p className="mt-4 text-body text-ink-secondary">{service.solution[locale]}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="container-x py-16 lg:py-20">
        <Reveal>
          <SectionHeader title={t("services.detail.process")} />
        </Reveal>
        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step, i) => (
            <RevealItem key={i}>
              <div className="h-full rounded-2xl border border-line bg-bg-surface p-6">
                <span className="font-display text-h3 text-gold-gradient">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-h6 text-ink-primary">{step.title[locale]}</h3>
                <p className="mt-2 text-caption text-ink-secondary">{step.description[locale]}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Technologies */}
      <section className="container-x py-10">
        <Reveal>
          <h2 className="font-display text-h4 text-ink-primary">{t("services.detail.technologies")}</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {service.technologies.map((tech) => (
              <Badge key={tech} variant="gold" className="text-body">{tech}</Badge>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Related cases */}
      {related.length > 0 && (
        <section className="container-x py-16 lg:py-20">
          <Reveal>
            <SectionHeader title={t("services.detail.relatedCases")} />
          </Reveal>
          <RevealGroup className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <RevealItem key={c.slug} className="h-full">
                <CaseCard item={c} locale={locale} />
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* FAQ */}
      <section className="container-x py-16 lg:py-20">
        <Reveal>
          <SectionHeader title={t("services.detail.faq")} className="mb-8" />
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion
            items={service.faq.map((f) => ({ question: f.question[locale], answer: f.answer[locale] }))}
          />
        </Reveal>
      </section>

      <FinalCta />
    </>
  );
}
