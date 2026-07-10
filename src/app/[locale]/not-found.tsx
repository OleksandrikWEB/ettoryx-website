import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center" data-testid="not-found">
      <p className="font-display text-[7rem] font-extrabold leading-none text-gold-gradient sm:text-[10rem]">404</p>
      <h1 className="mt-2 font-display text-h3 text-ink-primary">{t("title")}</h1>
      <p className="mt-4 max-w-prose text-body-lg text-ink-secondary">{t("subtitle")}</p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8")} data-testid="notfound-home">
        {t("backHome")}
      </Link>
    </section>
  );
}
