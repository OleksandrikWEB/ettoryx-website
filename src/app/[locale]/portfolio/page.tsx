import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { cms } from "@/lib/cms";
import { buildAlternates, buildCanonicalUrl } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { CaseCard } from "@/components/cards";
import { FinalCta } from "@/components/sections/FinalCta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("nav.portfolio"),
    description: t("portfolio.hero.subtitle"),
    alternates: buildAlternates(locale, "/portfolio"),
    openGraph: { url: buildCanonicalUrl(locale, "/portfolio") },
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const cases = await cms.getCaseStudies();

  return (
    <>
      <PageHero eyebrow={t("portfolio.hero.eyebrow")} title={t("portfolio.hero.title")} subtitle={t("portfolio.hero.subtitle")} />
      <section className="container-x py-16 lg:py-20">
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <RevealItem key={c.slug} className="h-full">
              <CaseCard item={c} locale={locale} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <FinalCta />
    </>
  );
}
