"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, Label, FieldError } from "@/components/ui/field";

export function ContactForm({
  services,
}: {
  services: { slug: string; title: string }[];
}) {
  const t = useTranslations();
  const router = useRouter();

  const schema = z.object({
    name: z.string().min(2, t("form.errors.name")),
    email: z.string().email(t("form.errors.email")),
    phone: z.string().optional(),
    service: z.string().min(1, t("form.errors.service")),
    budget: z.string().optional(),
    message: z.string().min(10, t("form.errors.message")),
    consent: z.literal(true, { errorMap: () => ({ message: t("form.errors.consent") }) }),
    company_website: z.string().optional(),
  });

  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: Values) => {
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => fd.append(k, String(v ?? "")));
    const res = await fetch("/submit/contact", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({ ok: false }));
    if (data.ok) router.push("/thank-you");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      data-testid="contact-form"
      noValidate
    >
      {/* honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("company_website")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" required>{t("form.name")}</Label>
          <Input id="name" data-testid="contact-name" aria-invalid={!!errors.name} {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="email" required>{t("form.email")}</Label>
          <Input id="email" type="email" data-testid="contact-email" aria-invalid={!!errors.email} {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">{t("form.phoneOptional")}</Label>
          <Input id="phone" data-testid="contact-phone" {...register("phone")} />
        </div>
        <div>
          <Label htmlFor="service" required>{t("form.service")}</Label>
          <Select id="service" data-testid="contact-service" aria-invalid={!!errors.service} defaultValue="" {...register("service")}>
            <option value="" disabled>{t("form.servicePlaceholder")}</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.title}</option>
            ))}
          </Select>
          <FieldError message={errors.service?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="budget">{t("form.budget")}</Label>
        <Select id="budget" data-testid="contact-budget" defaultValue="" {...register("budget")}>
          <option value="" disabled>{t("form.budgetPlaceholder")}</option>
          <option value="small">{t("form.budgets.small")}</option>
          <option value="medium">{t("form.budgets.medium")}</option>
          <option value="large">{t("form.budgets.large")}</option>
          <option value="xl">{t("form.budgets.xl")}</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="message" required>{t("form.message")}</Label>
        <Textarea id="message" placeholder={t("form.messagePlaceholder")} data-testid="contact-message" aria-invalid={!!errors.message} {...register("message")} />
        <FieldError message={errors.message?.message} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-caption text-ink-secondary">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-[#BA8A4B]" data-testid="contact-consent" {...register("consent")} />
          <span>
            {t("form.consent")}{" "}
            <Link href="/privacy-policy" className="text-gold-light underline underline-offset-2">
              {t("form.privacyLink")}
            </Link>
          </span>
        </label>
        <FieldError message={errors.consent?.message} />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} data-testid="contact-submit" className="w-full sm:w-auto">
        {isSubmitting ? t("cta.sending") : t("cta.send")}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </Button>
    </form>
  );
}
