import type { Metadata } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight, Check } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { cms } from '@/lib/cms';
import { buildAlternates, buildCanonicalUrl } from '@/lib/seo';
import { Hero } from '@/components/sections/Hero';
import { Testimonials } from '@/components/sections/Testimonials';
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal';
import { CountUp } from '@/components/CountUp';
import { Marquee } from '@/components/Marquee';
import {
  SectionHeader,
  ServiceCard,
  ProductCard,
  CaseCard,
} from '@/components/cards';
import { ContactForm } from '@/components/ContactForm';
import { Placeholder } from '@/components/Placeholder';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('defaultTitle'),
    description: t('defaultDescription'),
    alternates: buildAlternates(locale, ''),
    openGraph: { url: buildCanonicalUrl(locale, '') },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  setRequestLocale(rawLocale);
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();

  const [services, products, cases, stats, testimonials] = await Promise.all([
    cms.getServices(),
    cms.getProducts(),
    cms.getFeaturedCases(3),
    cms.getStats(),
    cms.getTestimonials(),
  ]);
  const tech = cms.getTechStack();
  const logos = cms.getClientLogos();

  return (
    <>
      <Hero />
      {/* Services */}
      <section
        className="container-x py-20 lg:py-28"
        data-testid="home-services"
      >
        <Reveal>
          <SectionHeader
            eyebrow={t('home.services.eyebrow')}
            title={t('home.services.title')}
            subtitle={t('home.services.subtitle')}
          />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <RevealItem key={s.slug} className="h-full">
              <ServiceCard service={s} locale={locale} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      {/* About short */}
      <section className="container-x py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <SectionHeader
                eyebrow={t('home.about.eyebrow')}
                title={t('home.about.title')}
              />
              <p className="mt-4 max-w-prose text-body-lg text-ink-secondary">
                {t('home.about.text')}
              </p>
              <Link
                href="/about"
                className={cn(buttonVariants({ variant: 'secondary' }), 'mt-8')}
                data-testid="home-about-cta"
              >
                {t('cta.moreAboutUs')}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <Placeholder
              alt="ettoryx team collaborating in the office"
              ratio="4/3"
              label="Team photo"
            />
          </Reveal>
        </div>
      </section>
      {/* Products */}
      <section
        className="container-x py-20 lg:py-28"
        data-testid="home-products"
      >
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow={t('home.products.eyebrow')}
              title={t('home.products.title')}
              subtitle={t('home.products.subtitle')}
            />
            <Link
              href="/products"
              className={cn(buttonVariants({ variant: 'ghost' }))}
              data-testid="home-products-cta"
            >
              {t('cta.viewAll')} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
          {products.map((p) => (
            <RevealItem key={p.slug} className="h-full">
              <ProductCard
                product={p}
                locale={locale}
                ctaLabel={t('cta.visitProduct')}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      {/* Portfolio */}
      <section
        className="container-x py-20 lg:py-28"
        data-testid="home-portfolio"
      >
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow={t('home.portfolio.eyebrow')}
              title={t('home.portfolio.title')}
              subtitle={t('home.portfolio.subtitle')}
            />
            <Link
              href="/portfolio"
              className={cn(buttonVariants({ variant: 'ghost' }))}
              data-testid="home-portfolio-cta"
            >
              {t('cta.viewAll')} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <RevealItem key={c.slug} className="h-full">
              <CaseCard item={c} locale={locale} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      {/* Stats */}
      {/* <section className="border-y border-line bg-bg-surface/40 py-20 lg:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeader
              eyebrow={t('home.stats.eyebrow')}
              title={t('home.stats.title')}
              align="center"
            />
          </Reveal>
          <RevealGroup className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s, i) => (
              <RevealItem key={i} className="text-center">
                <div className="font-display text-5xl font-extrabold text-gold-gradient sm:text-6xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-3 text-body text-ink-secondary">
                  {s.label[locale]}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section> */}
      {/* Tech marquee */}
      {/* <section className="py-16 lg:py-20">
        <Reveal className="container-x">
          <p className="mb-8 text-center text-caption uppercase tracking-widest text-ink-secondary/70">
            {t('home.tech.title')}
          </p>
        </Reveal>
        <Marquee
          items={tech.map((name) => (
            <span
              key={name}
              className="whitespace-nowrap font-display text-2xl font-bold text-ink-secondary/50"
            >
              {name}
            </span>
          ))}
        />
      </section> */}

      <section className="py-16 lg:py-20">
        <Reveal className="container-x">
          <p className="mb-3 text-center font-display text-h4 text-ink-primary">
            {t('home.trust.title')}
          </p>
          <p className="mb-8 text-center text-caption text-ink-secondary/70">
            {t('home.trust.badges')}
          </p>
        </Reveal>
        <Marquee
          items={logos.map((name) => (
            <span
              key={name}
              className="inline-flex items-center whitespace-nowrap rounded-xl border border-line px-8 py-4 font-display text-xl font-semibold text-ink-secondary/60"
            >
              {name}
            </span>
          ))}
        />
      </section>
      {/* Testimonials */}
      {/* <section className="container-x py-20 lg:py-28">
        <Reveal>
          <SectionHeader
            eyebrow={t('home.testimonials.eyebrow')}
            title={t('home.testimonials.title')}
            align="center"
            className="mb-14"
          />
        </Reveal>
        <Testimonials
          items={testimonials.map((tm) => ({
            quote: tm.quote[locale],
            author: tm.author,
            role: tm.role[locale],
            company: tm.company,
          }))}
        />
      </section> */}
      {/* Final CTA + contact form */}
      <section
        className="container-x py-20 lg:py-28"
        data-testid="home-final-cta"
      >
        <div className="grid gap-12 rounded-3xl border border-line bg-bg-surface/40 p-8 lg:grid-cols-2 lg:p-14">
          <div>
            <SectionHeader
              title={t('home.finalCta.title')}
              subtitle={t('home.finalCta.subtitle')}
            />
            <ul className="mt-8 space-y-3">
              {[
                t('about.why.items.one'),
                t('about.why.items.two'),
                t('about.why.items.three'),
                t('about.why.items.four'),
              ].map((li) => (
                <li
                  key={li}
                  className="flex items-center gap-3 text-body text-ink-secondary"
                >
                  <Check className="h-5 w-5 shrink-0 text-gold" /> {li}
                </li>
              ))}
            </ul>
          </div>
          <ContactForm
            services={services.map((s) => ({
              slug: s.slug,
              title: s.title[locale],
            }))}
          />
        </div>
      </section>
    </>
  );
}
