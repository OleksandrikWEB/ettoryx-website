import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "thankYou" });
  return { title: t("title"), robots: { index: false } };
}

export default async function ThankYouPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("thankYou");

  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center" data-testid="thank-you">
      <CheckCircle2 className="h-16 w-16 text-gold" />
      <h1 className="mt-8 font-display text-h2 text-ink-primary">{t("title")}</h1>
      <p className="mt-4 max-w-prose text-body-lg text-ink-secondary">{t("subtitle")}</p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className={cn(buttonVariants({ size: "lg" }))} data-testid="thankyou-home">
          {t("backHome")}
        </Link>
        <Link href="/services" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
          {t("exploreServices")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
