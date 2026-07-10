"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const switchTo = (next: string) => {
    if (next === locale) return;
    // @ts-expect-error -- params are passed through for dynamic segments
    router.replace({ pathname, params }, { locale: next });
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-line p-0.5 text-caption",
        className
      )}
      data-testid="language-switcher"
    >
      {(["uk", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          data-testid={`lang-${l}`}
          aria-current={locale === l}
          className={cn(
            "rounded-full px-3 py-1 font-medium uppercase transition-colors duration-200",
            locale === l
              ? "bg-gold-gradient text-black"
              : "text-ink-secondary hover:text-ink-primary"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
