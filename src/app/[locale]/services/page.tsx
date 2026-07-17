import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { cms } from "@/lib/cms";
import { buildAlternates, buildCanonicalUrl } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { ServiceCard } from "@/components/cards";
import { FinalCta } from "@/components/sections/FinalCta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("nav.services"),
    description: t("services.hero.subtitle"),
    alternates: buildAlternates(locale, "/services"),
    openGraph: { url: buildCanonicalUrl(locale, "/services") },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const services = await cms.getServices();

  return (
    <>
      <PageHero
        eyebrow={t("services.hero.eyebrow")}
        title={t("services.hero.title")}
        subtitle={t("services.hero.subtitle")}
      />
      <section className="container-x py-16 lg:py-20">
        <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <RevealItem key={s.slug} className="h-full">
              <ServiceCard service={s} locale={locale} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <FinalCta />
    </>
  );
}
