import { BUSINESS_ID, ORG_ID, site } from "@/config/site";
import { areaServed } from "@/content/areas";
import { services } from "@/content/services";
import type { Brand } from "@/content/brands";

const sameAs = Object.values(site.social).filter(Boolean);

/**
 * AutoRepair is a LocalBusiness subtype and the correct one here — it is more
 * specific than LocalBusiness and Google treats it as a local entity.
 */
export function autoRepairSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": BUSINESS_ID,
    // Must match the Google Business Profile exactly — that string is how
    // Google ties this site to the listing.
    name: site.gbpName,
    alternateName: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.domain,
    // International format — what Google expects in structured data.
    telephone: site.phoneIntl,
    email: site.email,
    image: `${site.domain}/logo.png`,
    logo: `${site.domain}/logo.png`,
    priceRange: site.priceRange,
    currenciesAccepted: "AED",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      addressLocality: site.city,
      addressRegion: site.region,
      ...(site.postalCode ? { postalCode: site.postalCode } : {}),
      addressCountry: site.country,
    },
    ...(site.geo.lat && site.geo.lng
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: site.geo.lat,
            longitude: site.geo.lng,
          },
        }
      : {}),
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map(
        (d) =>
          ({
            Mo: "Monday",
            Tu: "Tuesday",
            We: "Wednesday",
            Th: "Thursday",
            Fr: "Friday",
            Sa: "Saturday",
            Su: "Sunday",
          })[d as string],
      ),
      opens: h.open,
      closes: h.close,
    })),
    areaServed: areaServed.map((a) => ({ "@type": "City", name: a })),
    hasMap: site.mapLinkUrl,
    // NOTE: aggregateRating is deliberately omitted. Self-serving review markup
    // on your own LocalBusiness page breaches Google's guidelines and risks a
    // manual action — the rating is shown as plain text linking to the listing.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Auto repair services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: `${site.domain}/services/${s.slug}`,
        },
      })),
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.gbpName,
    alternateName: site.name,
    legalName: site.legalName,
    url: site.domain,
    logo: `${site.domain}/logo.png`,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.domain}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: `${site.domain}${url}`,
    provider: { "@id": BUSINESS_ID },
    areaServed: areaServed.map((a) => ({ "@type": "City", name: a })),
  };
}

/**
 * Marque page service node. `brand.manufacturer` is the real maker — Range
 * Rover resolves to Land Rover and MINI to BMW, so no marque is misattributed
 * in structured data any more than it is in the copy.
 */
export function brandServiceSchema(brand: Brand) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${brand.name} Repair & Service in ${site.city}`,
    description: brand.metaDescription,
    serviceType: `${brand.name} repair`,
    url: `${site.domain}/${brand.slug}`,
    provider: { "@id": BUSINESS_ID },
    brand: { "@type": "Brand", name: brand.manufacturer },
    areaServed: areaServed.map((a) => ({ "@type": "City", name: a })),
  };
}
