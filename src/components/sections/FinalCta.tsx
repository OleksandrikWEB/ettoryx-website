import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function FinalCta() {
  const t = await getTranslations();
  return (
    <section className="container-x py-20 lg:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-bg-surface p-10 text-center lg:p-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 120% at 50% 0%, rgba(186,138,75,0.2), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-h3 text-ink-primary sm:text-h2">
              {t("home.finalCta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-prose text-body-lg text-ink-secondary">
              {t("home.finalCta.subtitle")}
            </p>
            <Link href="/contacts" className={cn(buttonVariants({ size: "lg" }), "mt-8")} data-testid="final-cta-button">
              {t("cta.discussProject")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
