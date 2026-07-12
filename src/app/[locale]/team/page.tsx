import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { cms } from "@/lib/cms";
import { buildAlternates, buildPersonSchema, buildCanonicalUrl, BASE } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { RevealGroup, RevealItem, Reveal } from "@/components/Reveal";
import { SectionHeader, TeamCard } from "@/components/cards";
import { LeadershipSlider } from "@/components/LeadershipSlider";
import { FinalCta } from "@/components/sections/FinalCta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team.hero" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/team"),
    openGraph: { url: buildCanonicalUrl(locale, "/team") },
  };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const all = await cms.getTeam();
  const leadership = all.filter((m) => m.leadership);
  const rest = all.filter((m) => !m.leadership);

  const personSchemas = all.map((m) =>
    buildPersonSchema({
      name: m.name,
      jobTitle: m.role[locale],
      description: m.bio[locale],
      url: `${BASE}/${locale}/team`,
      sameAs: m.linkedin,
    })
  );

  return (
    <>
      {personSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <PageHero eyebrow={t("team.hero.eyebrow")} title={t("team.hero.title")} subtitle={t("team.hero.subtitle")} />

      <section className="container-x py-16 lg:py-20">
        <Reveal><SectionHeader title={t("team.leadership")} /></Reveal>
        <div className="mt-10">
          <LeadershipSlider members={leadership} locale={locale} />
        </div>
      </section>

      <section className="container-x pb-16 lg:pb-20">
        <Reveal><SectionHeader title={t("team.everyone")} /></Reveal>
        <RevealGroup className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((m) => (
            <RevealItem key={m.slug}><TeamCard member={m} locale={locale} /></RevealItem>
          ))}
        </RevealGroup>
      </section>

      <FinalCta />
    </>
  );
}
