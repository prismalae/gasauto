/**
 * Fire a gtag event if the Google tag is loaded. Safe to call anywhere —
 * no-ops on the server, before the tag loads, or with the tag disabled.
 *
 * Event names used across the site (mark these as conversions in Google Ads):
 *   whatsapp_click     — the floating WhatsApp button
 *   call_click         — any tel: link (header, mobile action bar)
 *   booking_submitted  — the booking form completed successfully
 */
type GtagParams = Record<string, string | number | boolean>;

export function gtagEvent(name: string, params?: GtagParams) {
  if (typeof window === "undefined") return;
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", name, params ?? {});
}
