"use server";

import { bookingSchema, type BookingState } from "@/lib/validation";
import { site } from "@/config/site";

/**
 * Booking submission.
 *
 * Mail transport is intentionally not wired to a third-party form service.
 * Set RESEND_API_KEY and BOOKING_TO_EMAIL to enable delivery. Until then the
 * action returns an explicit `unconfigured` state and the form shows the
 * customer the phone and WhatsApp fallbacks — it never reports success for a
 * lead that was silently dropped.
 */
export async function submitBooking(
  _prev: BookingState,
  formData: FormData,
): Promise<BookingState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = bookingSchema.safeParse(raw);

  if (!parsed.success) {
    const flat = parsed.error.flatten();

    // A filled honeypot is a bot. Return the generic error rather than
    // explaining which field gave it away.
    if (flat.fieldErrors.website) {
      return { status: "error", message: "Something went wrong. Please try again." };
    }

    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: flat.fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;

  if (!apiKey || !to) {
    console.warn(
      "[booking] RESEND_API_KEY / BOOKING_TO_EMAIL not set — booking not delivered:",
      { name: data.name, phone: data.phone, brand: data.brand, service: data.service },
    );
    return {
      status: "unconfigured",
      message:
        "Online booking is not connected yet. Please call or WhatsApp us and we will arrange your collection right away.",
    };
  }

  const lines = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email && `Email: ${data.email}`,
    `Vehicle: ${data.brand} ${data.model} ${data.year}`.trim(),
    `Service: ${data.service}`,
    `Pickup area: ${data.area}`,
    data.date && `Preferred date: ${data.date}`,
    data.message && `Message: ${data.message}`,
  ].filter(Boolean);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.BOOKING_FROM_EMAIL ?? "bookings@gasauto.ae",
        to: [to],
        reply_to: data.email || undefined,
        subject: `New pickup booking — ${data.brand} — ${data.name}`,
        text: lines.join("\n"),
      }),
    });

    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  } catch (err) {
    console.error("[booking] delivery failed:", err);
    return {
      status: "error",
      message: `We could not send your booking. Please call us on ${site.phone} and we will take the details directly.`,
    };
  }

  return {
    status: "success",
    message:
      "Booking received. We will call you shortly to confirm the collection time.",
  };
}
