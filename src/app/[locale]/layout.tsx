import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { BASE, buildCanonicalUrl } from "@/lib/seo";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const canonicalUrl = buildCanonicalUrl(locale);
  const ogLocale = locale === "uk" ? "uk_UA" : "en_US";
  const altLocale = locale === "uk" ? "en_US" : "uk_UA";

  return {
    metadataBase: new URL(BASE),
    title: {
      default: t("defaultTitle"),
      template: "%s | ettoryx",
    },
    description: t("defaultDescription"),
    openGraph: {
      type: "website",
      siteName: "ettoryx",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      url: canonicalUrl,
      locale: ogLocale,
      alternateLocale: [altLocale],
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      site: "@ettoryx",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ettoryx",
    url: BASE,
    email: "info@ettoryx.com",
    logo: {
      "@type": "ImageObject",
      url: `${BASE}/icon.png`,
    },
    description:
      "IT company building custom products and providing outsourcing development.",
    // sameAs: ["https://linkedin.com/company/casteryx", "https://github.com/casteryx"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ettoryx",
    url: BASE,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/${locale}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${inter.variable} ${unbounded.variable}`}>
      <body className="min-h-screen bg-bg-primary font-sans text-ink-primary antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-black"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="pt-20">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
