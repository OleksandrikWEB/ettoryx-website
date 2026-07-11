"use client";

import * as React from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/nav";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      data-testid="logo-home-link"
      aria-label="ettoryx — home"

    >
      <Image
        src="/logo-mark.png"
        alt="ettoryx"
        width={44}
        height={44}
        priority
        className="h-9 w-9 object-contain"
      />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight text-ink-primary">
          ettoryx
        </span>
        <span className="mt-0.5 text-[0.58rem] font-medium uppercase tracking-[0.38em] text-gold-light">
          Solutions
        </span>
      </span>
    </Link>
  );
}

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[padding,background-color,backdrop-filter,border-color] duration-300",
        scrolled
          ? "border-b border-line bg-bg-primary/80 py-3 backdrop-blur-xl"
          : "border-b border-transparent py-5"
      )}
      data-testid="site-header"
    >
      <div className="container-x flex items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.key}
                href={item.href}
                data-testid={`nav-${item.key}`}
                className={cn(
                  "group relative px-4 py-2 text-[0.95rem] transition-colors duration-200",
                  active ? "text-ink-primary" : "text-ink-secondary hover:text-ink-primary"
                )}
              >
                {t(`nav.${item.key}`)}
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-gold-gradient transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link href="/contacts" className={cn(buttonVariants({ size: "sm" }))} data-testid="header-cta">
            {t("cta.discussProject")}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-primary lg:hidden"
          onClick={() => setOpen(true)}
          aria-label={t("header.openMenu")}
          data-testid="mobile-menu-open"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-bg-primary lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="container-x flex items-center justify-between py-5">
              <Logo />
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-primary"
                onClick={() => setOpen(false)}
                aria-label={t("header.closeMenu")}
                data-testid="mobile-menu-close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="container-x flex flex-1 flex-col justify-center gap-2" aria-label="Mobile">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    data-testid={`mobile-nav-${item.key}`}
                    className="block py-3 font-display text-h3 text-ink-primary"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="container-x flex items-center justify-between gap-4 py-8">
              <LanguageSwitcher />
              <Link
                href="/contacts"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ size: "md" }))}
                data-testid="mobile-header-cta"
              >
                {t("cta.discussProject")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
