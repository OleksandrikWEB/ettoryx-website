import * as React from "react";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight, ArrowRight, MapPin, Briefcase } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { Service, Product, CaseStudy, TeamMember, JobListing } from "@/lib/cms/types";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Placeholder } from "@/components/Placeholder";
import { getIcon } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-widest text-gold">
          <span className="h-px w-8 bg-gold-gradient" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 font-display text-h3 text-ink-primary sm:text-h2">{title}</h2>
      {subtitle && <p className="mt-4 text-body-lg text-ink-secondary">{subtitle}</p>}
    </div>
  );
}

export function ServiceCard({ service, locale }: { service: Service; locale: Locale }) {
  const Icon = getIcon(service.icon);
  return (
    <Link href={`/services/${service.slug}`} data-testid={`service-card-${service.slug}`}>
      <Card className="h-full">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/5 text-gold-light transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle>{service.title[locale]}</CardTitle>
        <CardDescription>{service.short[locale]}</CardDescription>
        <span className="mt-6 inline-flex items-center gap-1 text-caption font-medium text-gold-light">
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Card>
    </Link>
  );
}

export function ProductCard({
  product,
  locale,
  ctaLabel,
}: {
  product: Product;
  locale: Locale;
  ctaLabel: string;
}) {
  const Icon = getIcon(product.icon);
  return (
    <Card className="flex h-full flex-col" data-testid={`product-card-${product.slug}`}>
      <div className="mb-5 flex items-center justify-between">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/5 text-gold-light">
          <Icon className="h-6 w-6" />
        </span>
        <Badge variant="gold">{product.category[locale]}</Badge>
      </div>
      <CardTitle>{product.name}</CardTitle>
      <CardDescription className="flex-1">{product.short[locale]}</CardDescription>
      <p className="mt-4 font-display text-h6 text-gold-gradient">{product.value[locale]}</p>
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        data-mock={product.isMock ? "true" : undefined}
        data-testid={`product-link-${product.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-caption font-medium text-ink-primary transition-colors hover:text-gold-light"
      >
        {ctaLabel} <ArrowUpRight className="h-4 w-4" />
      </a>
    </Card>
  );
}

export function CaseCard({ item, locale }: { item: CaseStudy; locale: Locale }) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      data-testid={`case-card-${item.slug}`}
      className="group block"
    >
      <div className="overflow-hidden rounded-2xl border border-line transition-[border-color,box-shadow] duration-300 group-hover:border-gold/60 group-hover:shadow-gold">
        <div className="overflow-hidden">
          <Placeholder
            alt={`Case study cover — ${item.title[locale]}`}
            ratio="16/10"
            className="rounded-none border-0 transition-transform duration-500 group-hover:scale-105"
            label={item.client}
          />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{item.category[locale]}</Badge>
            <Badge>{item.industry[locale]}</Badge>
          </div>
          <h3 className="mt-4 font-display text-h5 text-ink-primary">{item.title[locale]}</h3>
          <p className="mt-2 font-display text-h6 text-gold-gradient">{item.result[locale]}</p>
        </div>
      </div>
    </Link>
  );
}

export function TeamCard({ member, locale }: { member: TeamMember; locale: Locale }) {
  return (
    <div className="group" data-testid={`team-card-${member.slug}`}>
      <Placeholder
        alt={`Team member portrait — ${member.name}`}
        ratio="1/1"
        icon={false}
        className="mb-4 grid place-items-center"
      />
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-h6 text-ink-primary">{member.name}</h3>
          <p className="text-caption text-gold-light">{member.role[locale]}</p>
        </div>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-mock="true"
          aria-label={`${member.name} on LinkedIn`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-secondary transition-colors hover:border-gold hover:text-gold-light"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
      <p className="mt-3 text-caption text-ink-secondary">{member.bio[locale]}</p>
    </div>
  );
}

export function JobCard({
  job,
  locale,
  meta,
}: {
  job: JobListing;
  locale: Locale;
  meta: { department: string; location: string };
}) {
  return (
    <Link
      href={`/career/${job.slug}`}
      data-testid={`job-card-${job.slug}`}
    >
      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-h5 text-ink-primary">{job.title[locale]}</h3>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-caption text-ink-secondary">
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-gold" /> {job.department[locale]}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gold" /> {job.location[locale]}
            </span>
            <Badge variant="gold">{job.format[locale]}</Badge>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1" />
      </Card>
    </Link>
  );
}
