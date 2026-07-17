import type { Metadata } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { cms } from '@/lib/cms';
import { buildAlternates, buildCanonicalUrl } from '@/lib/seo';
import { PageHero } from '@/components/PageHero';
import { RevealGroup, RevealItem } from '@/components/Reveal';
import { ProductCard } from '@/components/cards';
import { FinalCta } from '@/components/sections/FinalCta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t('nav.products'),
    description: t('products.hero.subtitle'),
    alternates: buildAlternates(locale, '/products'),
    openGraph: { url: buildCanonicalUrl(locale, '/products') },
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const products = await cms.getProducts();

  return (
    <>
      <PageHero
        eyebrow={t('products.hero.eyebrow')}
        title={t('products.hero.title')}
        subtitle={t('products.hero.subtitle')}
      />
      <section className="container-x py-16 lg:py-20">
        <RevealGroup className="grid gap-12 sm:grid-cols-1 lg:grid-cols-1">
          {products.map((p) => (
            <RevealItem
              key={p.slug}
              className="flex h-full justify-center items-center"
            >
              <ProductCard
                product={p}
                locale={locale}
                ctaLabel={t('cta.visitProduct')}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <FinalCta />
    </>
  );
}
