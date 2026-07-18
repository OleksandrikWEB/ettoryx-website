import type { Metadata } from 'next';
import Image from 'next/image';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { Check, Target, ShieldCheck, Eye, Handshake } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { cms } from '@/lib/cms';
import { buildAlternates, buildCanonicalUrl } from '@/lib/seo';
import { PageHero } from '@/components/PageHero';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { SectionHeader } from '@/components/cards';
import { LeadershipSlider } from '@/components/LeadershipSlider';
import { Placeholder } from '@/components/Placeholder';
import { FinalCta } from '@/components/sections/FinalCta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t('nav.about'),
    description: t('about.hero.subtitle'),
    alternates: buildAlternates(locale, '/about'),
    openGraph: { url: buildCanonicalUrl(locale, '/about') },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const leadership = await cms.getLeadership();
  const developers = await cms.getDevelopers();

  const valueIcons = [Target, Handshake, Eye, ShieldCheck];
  const valueKeys = [
    'quality',
    'ownership',
    'transparency',
    'partnership',
  ] as const;
  const whyKeys = ['one', 'two', 'three', 'four'] as const;

  return (
    <>
      <PageHero
        eyebrow={t('about.hero.eyebrow')}
        title={t('about.hero.title')}
        subtitle={t('about.hero.subtitle')}
      />

      {/* Mission */}
      <section className="container-x py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <SectionHeader title={t('about.mission.title')} />
              <p className="mt-4 max-w-prose text-body-lg text-ink-secondary">
                {t('about.mission.text')}
              </p>
              <ul className="mt-8 space-y-3">
                {whyKeys.map((k) => (
                  <li
                    key={k}
                    className="flex items-center gap-3 text-body text-ink-secondary"
                  >
                    <Check className="h-5 w-5 shrink-0 text-gold" />{' '}
                    {t(`about.why.items.${k}`)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/mission.png"
                alt="ettoryx engineering team at work"
                width={1264}
                height={848}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-line bg-bg-surface/40 py-16 lg:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeader title={t('about.values.title')} align="center" />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueKeys.map((k, i) => {
              const Icon = valueIcons[i];
              return (
                <RevealItem key={k}>
                  <div className="h-full rounded-2xl border border-line bg-bg-primary p-6">
                    <Icon className="h-7 w-7 text-gold" />
                    <h3 className="mt-4 font-display text-h6 text-ink-primary">
                      {t(`about.values.items.${k}.t`)}
                    </h3>
                    <p className="mt-2 text-caption text-ink-secondary">
                      {t(`about.values.items.${k}.d`)}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Leadership */}
      <section className="container-x py-16 lg:py-20">
        <Reveal>
          <SectionHeader
            eyebrow={t('team.leadership')}
            title={t('team.hero.title')}
            subtitle={t('about.geography.text')}
          />
        </Reveal>
        <div className="mt-12">
          <LeadershipSlider members={leadership} locale={locale} />
        </div>
      </section>

      {/* Developers Team */}
      {developers.length > 0 && (
        <section className="container-x pb-16 lg:pb-20" data-testid="developers-section">
          <Reveal>
            <SectionHeader eyebrow={t('team.developers')} title={t('team.developers')} />
          </Reveal>
          <div className="mt-12">
            <LeadershipSlider members={developers} locale={locale} idPrefix="developers" />
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
