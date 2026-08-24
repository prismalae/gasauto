"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2, Info, Phone } from "lucide-react";
import { site, telUrl, whatsappUrl } from "@/config/site";
import { services } from "@/content/services";
import { emirates, sharjahAreas } from "@/content/areas";
import { brandsByFamily } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/Button";
import type { BookingState } from "@/lib/validation";
import { submitBooking } from "./actions";
import { gtagEvent } from "@/lib/gtag";

const groups = brandsByFamily();
const initial: BookingState = { status: "idle" };

const field =
  "w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted transition-colors focus:border-green focus:outline-none";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-muted";

export function BookingForm() {
  const [state, formAction] = useActionState(submitBooking, initial);
  const errs = state.status === "error" ? state.fieldErrors : undefined;
  const submitted = state.status === "success";

  // Fires once, only on a genuinely successful submission — not on render of
  // the form, and not when the mail transport is unconfigured.
  useEffect(() => {
    if (submitted) gtagEvent("booking_submitted");
  }, [submitted]);

  if (state.status === "success") {
    return (
      <div className="card rounded-2xl p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green" aria-hidden="true" />
        <h2 className="mt-4 font-display text-2xl text-ink">
          Booking received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted">{state.message}</p>
        <ButtonLink href="/" size="md" variant="outline" className="mt-6">
          Back to home
        </ButtonLink>
      </div>
    );
  }

  return (
    <form action={formAction} className="card rounded-2xl p-6 sm:p-8" noValidate>
      {state.status === "unconfigured" && (
        <div
          role="status"
          className="mb-6 rounded-xl border border-green/40 bg-green-soft p-4"
        >
          <p className="flex items-start gap-3 text-sm text-ink">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
            {state.message}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <ButtonLink href={telUrl()} size="sm">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone}
            </ButtonLink>
            <ButtonLink
              href={whatsappUrl(`Hi ${site.name}, I'd like to book a pickup.`)}
              size="sm"
              variant="outline"
            >
              WhatsApp us
            </ButtonLink>
          </div>
        </div>
      )}

      {state.status === "error" && (
        <p
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {state.message}
        </p>
      )}

      {/* Honeypot — hidden from users, filled only by bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errs?.name} required>
          <input id="name" name="name" required autoComplete="name" className={field} placeholder="Full name" />
        </Field>

        <Field id="phone" label="Phone / WhatsApp" error={errs?.phone} required>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className={field}
            placeholder="+971 50 000 0000"
          />
        </Field>

        <Field id="email" label="Email (optional)" error={errs?.email}>
          <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@example.com" />
        </Field>

        <Field id="brand" label="Car brand" error={errs?.brand} required>
          <select id="brand" name="brand" required defaultValue="" className={field}>
            <option value="" disabled>
              Choose your brand
            </option>
            {/* Optgroups mirror the two families used everywhere else. */}
            {groups.map(({ family, brands: list }) => (
              <optgroup key={family.id} label={family.label}>
                {list.map((b) => (
                  <option key={b.slug} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value="Other">Other</option>
          </select>
        </Field>

        <Field id="model" label="Model (optional)" error={errs?.model}>
          <input id="model" name="model" className={field} placeholder="e.g. Vogue, X5, C200" />
        </Field>

        <Field id="year" label="Year (optional)" error={errs?.year}>
          <input id="year" name="year" inputMode="numeric" className={field} placeholder="e.g. 2019" />
        </Field>

        <Field id="service" label="Service needed" error={errs?.service} required>
          <select id="service" name="service" required defaultValue="" className={field}>
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
            <option value="Not sure — please diagnose">Not sure — please diagnose</option>
          </select>
        </Field>

        <Field id="area" label="Pickup area" error={errs?.area} required>
          <select id="area" name="area" required defaultValue="" className={field}>
            <option value="" disabled>
              Where should we collect?
            </option>
            <optgroup label="Sharjah districts">
              {sharjahAreas.map((a) => (
                <option key={a} value={`Sharjah — ${a}`}>
                  {a}
                </option>
              ))}
            </optgroup>
            <optgroup label="Other emirates">
              {emirates
                .filter((e) => e !== "Sharjah")
                .map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
            </optgroup>
          </select>
        </Field>

        <Field id="date" label="Preferred date (optional)" error={errs?.date}>
          <input id="date" name="date" type="date" className={field} />
        </Field>

        <div className="sm:col-span-2">
          <Field id="message" label="Describe the problem (optional)" error={errs?.message}>
            <textarea
              id="message"
              name="message"
              rows={4}
              className={field}
              placeholder="Warning message on the dash, a noise, a smell — whatever you have noticed. The more detail, the better we can prepare."
            />
          </Field>
        </div>
      </div>

      <SubmitButton />

      <p className="mt-4 text-center text-xs text-muted">
        We only use your details to arrange this booking, and we will confirm
        the collection charge for your area before anything is arranged. See our{" "}
        <Link href="/privacy-policy" className="underline hover:text-green">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

function Field({
  id,
  label: text,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string[];
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {text}
        {required && <span className="ml-1 text-green">*</span>}
      </label>
      {children}
      {error?.[0] && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-300">
          {error[0]}
        </p>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="mt-7 w-full" disabled={pending}>
      {pending ? "Sending…" : "Request a pickup"}
    </Button>
  );
}
