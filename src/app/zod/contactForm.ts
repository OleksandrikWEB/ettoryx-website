import { z } from "zod";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const BUDGET_VALUES = ["small", "medium", "large", "xl"] as const;
export type Budget = (typeof BUDGET_VALUES)[number];

// ---------------------------------------------------------------------------
// Error message bag — keeps all messages in one place and allows i18n callers
// to pass translated strings without coupling this file to next-intl.
// ---------------------------------------------------------------------------

export interface ContactFormMessages {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  consent: string;
}

const DEFAULT_MESSAGES: ContactFormMessages = {
  name: "Name must be at least 2 characters.",
  email: "Please enter a valid email address.",
  phone: "Please enter a valid phone number.",
  service: "Please select a service.",
  message: "Message must be at least 10 characters.",
  consent: "You must accept the privacy policy to continue.",
};

// ---------------------------------------------------------------------------
// Schema factory
// ---------------------------------------------------------------------------

/**
 * Creates the contact-form Zod schema.
 *
 * Pass translated strings via `messages` to get localised error messages;
 * falls back to English defaults when omitted.
 *
 * @example
 * // Inside a Next.js Server Component or API route (no translations needed):
 * const schema = buildContactFormSchema();
 *
 * @example
 * // Inside a Client Component that uses next-intl:
 * const t = useTranslations();
 * const schema = buildContactFormSchema({
 *   name:    t("form.errors.name"),
 *   email:   t("form.errors.email"),
 *   service: t("form.errors.service"),
 *   message: t("form.errors.message"),
 *   consent: t("form.errors.consent"),
 * });
 */
export function buildContactFormSchema(messages: ContactFormMessages = DEFAULT_MESSAGES) {
  return z.object({
    // ── Personal details ────────────────────────────────────────────────────
    name: z
      .string({ required_error: messages.name })
      .trim()
      .min(2, messages.name)
      .max(100, "Name must not exceed 100 characters.")
      .regex(/^[\p{L}\s'-]+$/u, "Name may only contain letters, spaces, hyphens, and apostrophes."),

    email: z
      .string({ required_error: messages.email })
      .trim()
      .toLowerCase()
      .email(messages.email)
      .max(254, "Email address is too long."),

    phone: z
      .string()
      .trim()
      .regex(
        /^[+]?[\d\s\-(). ]{7,20}$/,
        messages.phone ?? DEFAULT_MESSAGES.phone!,
      )
      .optional()
      .or(z.literal("")),

    // ── Project details ──────────────────────────────────────────────────────
    service: z
      .string({ required_error: messages.service })
      .min(1, messages.service),

    budget: z
      .enum(BUDGET_VALUES)
      .optional()
      .or(z.literal("").transform(() => undefined)),

    message: z
      .string({ required_error: messages.message })
      .trim()
      .min(10, messages.message)
      .max(2000, "Message must not exceed 2 000 characters."),

    // ── Legal ────────────────────────────────────────────────────────────────
    consent: z.literal(true, {
      errorMap: () => ({ message: messages.consent }),
    }),

    // ── Honeypot (must stay empty — bots fill it, humans don't) ────────────
    company_website: z
      .string()
      .max(0, "Unexpected value.")
      .optional()
      .or(z.literal("")),
  });
}

// ---------------------------------------------------------------------------
// Default (static) schema — useful for server-side validation in API routes
// ---------------------------------------------------------------------------

export const contactFormSchema = buildContactFormSchema();

// ---------------------------------------------------------------------------
// Derived TypeScript types
// ---------------------------------------------------------------------------

/** Raw form values before transformation (what react-hook-form sees). */
export type ContactFormValues = z.input<typeof contactFormSchema>;

/** Parsed + transformed values after Zod parses the submission. */
export type ContactFormOutput = z.output<typeof contactFormSchema>;
