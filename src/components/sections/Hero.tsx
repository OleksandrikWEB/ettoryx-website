"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const t = useTranslations("home.hero");
  const tc = useTranslations("cta");
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.2]);

  const words = t("title").split(" ");

  return (
    <section ref={ref} className="relative overflow-hidden" data-testid="hero">
      {/* backdrop */}
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 70% at 75% 0%, rgba(186,138,75,0.18), transparent 55%), radial-gradient(60% 50% at 10% 20%, rgba(122,90,46,0.14), transparent 60%)",
          }}
        />
        <div className="bg-grain absolute inset-0 opacity-60" />
      </motion.div>

      {/* decorative brand monogram watermark */}
      <motion.div
        style={{ y }}
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/2 -z-10 hidden -translate-y-1/2 lg:block"
      >
        <Image
          src="/logo-mark.png"
          alt=""
          width={720}
          height={398}
          className="h-auto w-[42rem] object-contain opacity-[0.13]"
        />
      </motion.div>

      <motion.div style={{ opacity }} className="container-x pb-24 pt-20 lg:pb-32 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-caption text-gold-light"
          data-testid="hero-badge"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {t("badge")}
        </motion.div>

        <h1 className="max-w-4xl font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.08 * i }}
              className={cn("inline-block", i >= words.length - 2 && "text-gold-gradient")}
            >
              {w}&nbsp;
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.5 }}
          className="mt-6 max-w-prose text-body-lg text-ink-secondary"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.65 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link href="/contacts" className={cn(buttonVariants({ size: "lg" }))} data-testid="hero-cta-primary">
            {tc("discussProject")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/portfolio" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))} data-testid="hero-cta-secondary">
            {tc("ourWork")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <p className="mt-10 text-caption uppercase tracking-widest text-ink-secondary/70">
          {t("trustline")}
        </p>
      </motion.div>
    </section>
  );
}
