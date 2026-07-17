import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, Phone, MessageCircle, MapPin, Clock, Linkedin } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { cms } from "@/lib/cms";
import { buildAlternates, buildCanonicalUrl } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contacts.hero" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: buildAlternates(locale, "/contacts"),
    openGraph: { url: buildCanonicalUrl(locale, "/contacts") },
  };
}

export default async function ContactsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  setRequestLocale(raw);
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const services = await cms.getServices();

  const info = [
    { Icon: Mail,           label: t("contacts.info.email"),      value: "info@ettoryx.com",          href: "mailto:info@ettoryx.com" },
    { Icon: Phone,          label: t("contacts.info.phone"),      value: "+38 098 059 98 87",          href: "tel:+380980599887" },
    { Icon: MessageCircle,  label: "Telegram",                    value: "@mykola_plikhtiak",          href: "https://t.me/mykola_plikhtiak" },
    { Icon: Linkedin,       label: "LinkedIn",                    value: "linkedin.com/company/ettoryx", href: "https://www.linkedin.com/company/ettoryx" },
    { Icon: MapPin,         label: t("contacts.info.address"),    value: "Івано-Франківськ, Україна" },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("contacts.hero.eyebrow")}
        title={t("contacts.hero.title")}
        subtitle={t("contacts.hero.subtitle")}
      />

      <section className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div>
              <h2 className="font-display text-h4 text-ink-primary">{t("contacts.info.title")}</h2>
              <ul className="mt-8 space-y-6">
                {info.map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/5 text-gold-light">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-caption uppercase tracking-wider text-ink-secondary/70">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="text-body text-ink-primary transition-colors hover:text-gold-light"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-body text-ink-primary">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-caption text-ink-secondary">
                <Clock className="h-4 w-4 text-gold" /> {t("contacts.info.responseTime")}
              </div>

              <div className="mt-8 overflow-hidden rounded-2xl border border-line" style={{ aspectRatio: "16/7" }}>
                <iframe
                  src="https://maps.google.com/maps?q=Ivano-Frankivsk,Ukraine&output=embed&z=13"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ivano-Frankivsk office location"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-line bg-bg-surface/40 p-6 lg:p-10">
              <ContactForm services={services.map((s) => ({ slug: s.slug, title: s.title[locale] }))} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
