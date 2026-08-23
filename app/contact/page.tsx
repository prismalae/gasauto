import type { Metadata } from "next";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Clock, Mail, MapPin, Phone, Star } from "lucide-react";
import { fullAddress, site, telUrl, whatsappUrl } from "@/config/site";
import Image from "next/image";
import { media } from "@/content/media";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ChromeCard } from "@/components/ui/ChromeCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/schema/JsonLd";
import { breadcrumbSchema } from "@/components/schema/schemas";

const description =
  "Contact GAS AUTO Garage in Sharjah — phone, WhatsApp, email, address, opening hours and directions. Car pickup and delivery across the UAE.";

export const metadata: Metadata = {
  title: { absolute: "Contact GAS AUTO Garage in Sharjah | Phone & Directions" },
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | Car Workshop in Sharjah — GAS AUTO",
    description,
    url: `${site.domain}/contact`,
    type: "website",
  },
};

const crumbs = [
  { name: "Home", url: "/" },
  { name: "Contact", url: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            <span className="text-chrome">Contact</span>{" "}
            <span className="text-green">GAS AUTO</span>
          </>
        }
        intro="Call, message or drop in. If your car cannot be driven, do not risk it — book a collection instead and we will come to you, anywhere in the UAE."
        crumbs={crumbs}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="space-y-5">
            <ChromeCard interactive={false}>
              <h2 className="font-display text-lg text-ink">Talk to us</h2>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-green" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-muted">
                      Phone
                    </span>
                    <a href={telUrl()} className="text-ink transition-colors hover:text-green">
                      {site.phone}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-green" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-muted">
                      WhatsApp
                    </span>
                    <a
                      href={whatsappUrl(`Hi ${site.name}, I have a question about a repair.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink transition-colors hover:text-green"
                    >
                      Message us
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-green" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-muted">
                      Email
                    </span>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-ink transition-colors hover:text-green"
                    >
                      {site.email}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-green" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-muted">
                      Workshop
                    </span>
                    <address className="not-italic text-ink">{fullAddress}</address>
                  </span>
                </li>
              </ul>

              <ButtonLink href="/book" size="md" className="mt-6 w-full">
                Book a pickup
              </ButtonLink>

              {/* Real Google rating, shown as plain text with a link to the
                  listing. Not emitted as aggregateRating markup — see
                  components/schema/schemas.ts for why. */}
              {site.googleBusinessUrl && (
                <a
                  href={site.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 text-sm text-muted transition-colors hover:text-green"
                >
                  <Star className="h-4 w-4 fill-green text-green" aria-hidden="true" />
                  {site.google.rating.toFixed(1)} on Google ({site.google.reviewCount} reviews)
                </a>
              )}
            </ChromeCard>

            <ChromeCard interactive={false}>
              <h2 className="flex items-center gap-2 font-display text-lg text-ink">
                <Clock className="h-5 w-5 text-green" aria-hidden="true" />
                Opening hours
              </h2>
              <ul className="mt-4 space-y-2">
                {site.hoursHuman.map((h) => (
                  <li key={h.label} className="flex justify-between gap-4 text-sm">
                    <span className="text-muted">{h.label}</span>
                    <span className="text-ink">{h.value}</span>
                  </li>
                ))}
              </ul>
            </ChromeCard>
          </div>

          <Reveal>
            <div className="mb-5 overflow-hidden rounded-xl">
              <Image
                src={media.workshopFrontAlt.src}
                alt={media.workshopFrontAlt.alt}
                width={media.workshopFrontAlt.width}
                height={media.workshopFrontAlt.height}
                sizes="(min-width: 1024px) 620px, 100vw"
                className="h-64 w-full object-cover object-top sm:h-80"
              />
            </div>

            <ChromeCard interactive={false} className="overflow-hidden p-0">
              {site.mapEmbedUrl ? (
                <iframe
                  src={site.mapEmbedUrl}
                  title={`${site.name} location map`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="aspect-[4/3] w-full border-0"
                />
              ) : (
                /* No fabricated map pin — the placeholder states plainly that
                   the real location has not been configured yet. */
                <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 border border-dashed border-line p-8 text-center">
                  <MapPin className="h-8 w-8 text-green" aria-hidden="true" />
                  <p className="font-display text-base text-ink">
                    Map coming soon
                  </p>
                  <p className="max-w-xs text-sm text-muted">
                    Call or WhatsApp us for directions to the workshop and we
                    will send you a live location.
                  </p>
                  <ButtonLink href={telUrl()} size="sm" variant="outline">
                    {site.phone}
                  </ButtonLink>
                </div>
              )}
            </ChromeCard>

            {site.mapLinkUrl && (
              <ButtonLink href={site.mapLinkUrl} size="md" variant="outline" className="mt-4">
                Get directions
              </ButtonLink>
            )}
          </Reveal>
        </div>
      </Section>
    </>
  );
}
