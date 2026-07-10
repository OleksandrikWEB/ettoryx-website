import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, GraduationCap, Rocket, HeartHandshake } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { cms } from "@/lib/cms";
import { buildAlternates, buildCanonicalUrl } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeader, JobCard } from "@/components/cards";
import { Placeholder } from "@/components/Placeholder";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "career.hero" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/career"),
    openGraph: { url: buildCanonicalUrl(locale, "/career") },
  };
}

export default async function CareerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const jobs = await cms.getJobs();

  const benefitIcons = [Clock, GraduationCap, Rocket, HeartHandshake];
  const benefitKeys = ["flexible", "growth", "projects", "team"] as const;

  return (
    <>
      <PageHero eyebrow={t("career.hero.eyebrow")} title={t("career.hero.title")} subtitle={t("career.hero.subtitle")} />

      {/* Benefits */}
      <section className="container-x py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <SectionHeader title={t("career.benefits.title")} />
              <ul className="mt-8 grid gap-5 sm:grid-cols-2">
                {benefitKeys.map((k, i) => {
                  const Icon = benefitIcons[i];
                  return (
                    <li key={k} className="flex items-start gap-3">
                      <Icon className="h-6 w-6 shrink-0 text-gold" />
                      <span className="text-body text-ink-secondary">{t(`career.benefits.items.${k}`)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Placeholder alt="ettoryx office and team culture" ratio="4/3" label="Office photo" />
          </Reveal>
        </div>
      </section>

      {/* Openings */}
      <section className="container-x py-16 lg:py-20">
        <Reveal>
          <SectionHeader title={t("career.openings")} />
        </Reveal>
        <RevealGroup className="mt-10 space-y-4">
          {jobs.map((j) => (
            <RevealItem key={j.slug}>
              <JobCard job={j} locale={locale} meta={{ department: j.department[locale], location: j.location[locale] }} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
