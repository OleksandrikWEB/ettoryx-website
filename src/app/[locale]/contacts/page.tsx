import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, Phone, MessageCircle, MapPin, Clock, MapPinned } from "lucide-react";
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
    { Icon: Mail, label: t("contacts.info.email"), value: "info@ettoryx.com", href: "mailto:info@ettoryx.com" },
    { Icon: Phone, label: t("contacts.info.phone"), value: t("contacts.info.phoneValue"), href: "tel:+380000000000" },
    { Icon: MessageCircle, label: t("contacts.info.messengers"), value: "Telegram", href: "#" },
    { Icon: MapPin, label: t("contacts.info.address"), value: t("contacts.info.addressValue") },
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
                          {...(href === "#" ? { "data-mock": "true", target: "_blank", rel: "noopener noreferrer" } : {})}
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

              <div
                role="img"
                aria-label="Map showing ettoryx office location (placeholder)"
                data-mock="true"
                className="bg-grain mt-8 flex items-center justify-center rounded-2xl border border-line bg-bg-surface text-ink-secondary/50"
                style={{ aspectRatio: "16/7" }}
              >
                <div className="flex flex-col items-center gap-2">
                  <MapPinned className="h-8 w-8" />
                  <span className="text-caption">{t("contacts.info.mapPlaceholder")}</span>
                </div>
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
