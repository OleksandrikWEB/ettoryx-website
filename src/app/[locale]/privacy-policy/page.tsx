import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return { title: t("title"), description: t("intro"), alternates: buildAlternates(locale, "/privacy-policy") };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const keys = ["data", "use", "share", "rights", "contact"] as const;

  return (
    <>
      <PageHero title={t("title")} subtitle={t("updated")} />
      <section className="container-x py-16 lg:py-20">
        <Reveal>
          <p className="max-w-prose text-body-lg text-ink-secondary">{t("intro")}</p>
        </Reveal>
        <div className="mt-12 space-y-10">
          {keys.map((k) => (
            <Reveal key={k}>
              <div className="max-w-prose">
                <h2 className="font-display text-h5 text-ink-primary">{t(`sections.${k}.t`)}</h2>
                <p className="mt-3 text-body text-ink-secondary">{t(`sections.${k}.d`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
