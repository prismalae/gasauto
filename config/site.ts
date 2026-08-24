/**
 * Single source of truth for every business detail on the site.
 *
 * The contact details below were taken from the live Google Business Profile
 * (G.A.S AUTO GARAGE, Sharjah) so the NAP block, the schema.org markup and the
 * listing agree byte for byte — which is what Google checks when it decides
 * whether this site and that listing are the same business.
 *
 * Anything still marked TODO_CLIENT has not been confirmed. Run
 * `npm run check:placeholders` before deploying.
 */

export const site = {
  /** Display/brand name, as it appears on the logo. */
  name: "GAS AUTO",
  /** Exact name on the Google Business Profile — used for schema.org `name`. */
  gbpName: "G.A.S AUTO GARAGE",
  /** From the workshop signboard: ورشة غروب الشمس لصيانة السيارات. */
  legalName: "Gheroub Al Shams Auto Maintenance Workshop",
  legalNameAr: "ورشة غروب الشمس لصيانة السيارات",
  tagline: "Range Rover, Defender & Jaguar Specialists in Sharjah",
  description:
    "Car repair garage in Sharjah for Range Rover, Land Rover, Defender and Jaguar — dealer-level diagnostics, genuine parts, and pickup & delivery across the UAE.",

  phone: "054 778 8280",
  phoneIntl: "+971 54 778 8280",
  phoneHref: "+971547788280",
  whatsapp: "971547788280",
  email: "info@gasauto.ae", // TODO_CLIENT — not listed on Google, confirm the address

  street: "King Abdul Aziz Road, behind Alba Tower Aluminium Factory, Industrial Area 12",
  district: "Industrial Area",
  city: "Sharjah",
  region: "Sharjah",
  postalCode: "",
  country: "AE",
  countryName: "United Arab Emirates",
  plusCode: "8C9P+XF Sharjah",

  geo: { lat: 25.3199734, lng: 55.436201 },
  /** Keyless Google Maps embed — no API key required. */
  mapEmbedUrl:
    "https://maps.google.com/maps?q=25.3199734,55.436201&z=17&hl=en&output=embed",
  mapLinkUrl: "https://maps.app.goo.gl/YkY1jtXoyZeHHE3G9",
  googleBusinessUrl: "https://maps.app.goo.gl/YkY1jtXoyZeHHE3G9",

  domain: "https://gasauto.ae", // TODO_CLIENT — confirm the production domain

  /** Google Ads tag. Page views load via gtag; see lib/gtag.ts for events. */
  googleAdsId: "AW-18377643265",

  social: {
    instagram: "", // TODO_CLIENT
    facebook: "", // TODO_CLIENT
    tiktok: "", // TODO_CLIENT
  },

  /**
   * From the Google Business Profile: a split day with a 1–4 PM break, Friday
   * closed. Saturday–Thursday 8 AM–1 PM and 4 PM–10 PM.
   */
  hours: [
    {
      days: ["Sa", "Su", "Mo", "Tu", "We", "Th"],
      open: "08:00",
      close: "13:00",
    },
    {
      days: ["Sa", "Su", "Mo", "Tu", "We", "Th"],
      open: "16:00",
      close: "22:00",
    },
  ],
  hoursHuman: [
    { label: "Saturday – Thursday", value: "8:00 AM – 1:00 PM" },
    { label: "", value: "4:00 PM – 10:00 PM" },
    { label: "Friday", value: "Closed" },
  ],

  priceRange: "$$",

  /**
   * Live Google rating. NOT emitted as aggregateRating structured data —
   * self-serving review markup on your own LocalBusiness page is against
   * Google's guidelines and risks a manual action. Displayed as plain text
   * with a link to the listing instead.
   */
  google: {
    rating: 4.0,
    reviewCount: 9,
  },

} as const;

export const ORG_ID = `${site.domain}/#organization`;
export const BUSINESS_ID = `${site.domain}/#autorepair`;

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telUrl() {
  return `tel:${site.phoneHref}`;
}

export const fullAddress = [site.street, site.city, site.countryName]
  .filter(Boolean)
  .join(", ");
