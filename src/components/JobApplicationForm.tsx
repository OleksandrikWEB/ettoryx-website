"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { ArrowRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label, FieldError } from "@/components/ui/field";

export function JobApplicationForm({ jobSlug }: { jobSlug: string }) {
  const t = useTranslations();
  const router = useRouter();
  const [fileName, setFileName] = React.useState<string>("");

  const schema = z.object({
    name: z.string().min(2, t("form.errors.name")),
    email: z.string().email(t("form.errors.email")),
    message: z.string().min(10, t("form.errors.message")),
    consent: z.literal(true, { errorMap: () => ({ message: t("form.errors.consent") }) }),
    company_website: z.string().optional(),
  });
  type Values = z.infer<typeof schema>;

  const fileRef = React.useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: Values) => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setFileError(t("form.errors.cv"));
      return;
    }
    const fd = new FormData();
    fd.append("job", jobSlug);
    Object.entries(values).forEach(([k, v]) => fd.append(k, String(v ?? "")));
    fd.append("cv", file);
    const res = await fetch("/submit/application", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({ ok: false }));
    if (data.ok) router.push("/thank-you");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" data-testid="application-form" noValidate>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("company_website")} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="a-name" required>{t("form.name")}</Label>
          <Input id="a-name" data-testid="app-name" aria-invalid={!!errors.name} {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="a-email" required>{t("form.email")}</Label>
          <Input id="a-email" type="email" data-testid="app-email" aria-invalid={!!errors.email} {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="a-message" required>{t("form.message")}</Label>
        <Textarea id="a-message" data-testid="app-message" aria-invalid={!!errors.message} {...register("message")} />
        <FieldError message={errors.message?.message} />
      </div>

      <div>
        <Label required>{t("form.cv")}</Label>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          data-testid="app-cv-button"
          className="flex w-full items-center gap-3 rounded-xl border border-dashed border-line bg-bg-primary px-4 py-4 text-left text-body text-ink-secondary transition-colors hover:border-gold"
        >
          <Upload className="h-5 w-5 text-gold" />
          <span className="flex-1 truncate">{fileName || t("form.cvHint")}</span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword"
          className="hidden"
          data-testid="app-cv-input"
          onChange={(e) => {
            setFileName(e.target.files?.[0]?.name ?? "");
            setFileError("");
          }}
        />
        <FieldError message={fileError} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-caption text-ink-secondary">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-[#BA8A4B]" data-testid="app-consent" {...register("consent")} />
          <span>
            {t("form.consent")}{" "}
            <Link href="/privacy-policy" className="text-gold-light underline underline-offset-2">
              {t("form.privacyLink")}
            </Link>
          </span>
        </label>
        <FieldError message={errors.consent?.message} />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} data-testid="app-submit" className="w-full sm:w-auto">
        {isSubmitting ? t("cta.sending") : t("cta.applyNow")}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </Button>
    </form>
  );
}
