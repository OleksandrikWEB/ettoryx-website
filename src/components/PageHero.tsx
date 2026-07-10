import * as React from "react";
import { Reveal } from "@/components/Reveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line" data-testid="page-hero">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 80% 0%, rgba(186,138,75,0.16), transparent 55%)",
        }}
      />
      <div className="bg-grain pointer-events-none absolute inset-0 -z-10 opacity-50" />
      <div className="container-x py-16 lg:py-24">
        <Reveal>
          {eyebrow && (
            <span className="inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-widest text-gold">
              <span className="h-px w-8 bg-gold-gradient" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 max-w-4xl font-display text-h2 font-extrabold tracking-tight text-ink-primary sm:text-h1">
            {title}
          </h1>
          {subtitle && <p className="mt-5 max-w-prose text-body-lg text-ink-secondary">{subtitle}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
