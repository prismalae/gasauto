import type { Metadata } from "next";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Clock, Phone, ShieldCheck, Truck } from "lucide-react";
import { site, telUrl, whatsappUrl } from "@/config/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ChromeCard } from "@/components/ui/ChromeCard";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/schema/JsonLd";
import { breadcrumbSchema } from "@/components/schema/schemas";
import { BookingForm } from "./BookingForm";

const description =
  "Book a car collection anywhere in the UAE. Tell us the car, the fault and where to collect it — we quote the collection charge up front, diagnose, quote the repair in writing and return the car to your door.";

export const metadata: Metadata = {
  title: { absolute: "Book a Car Pickup & Delivery in the UAE — GAS AUTO" },
  description,
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a Car Pickup & Delivery in the UAE — GAS AUTO",
    description,
    url: `${site.domain}/book`,
    type: "website",
  },
};

const crumbs = [
  { name: "Home", url: "/" },
  { name: "Book a Pickup", url: "/book" },
];

export default function BookPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow="Collection & delivery"
        title={
          <>
            <span className="text-chrome">Book a Pickup</span>{" "}
            <span className="text-green">&amp; Delivery</span>
          </>
        }
        intro="Book a car service or repair pickup in Sharjah — or anywhere in the UAE. Fill in the form and we will call you back to confirm the collection charge for your area and a time that suits you. Prefer to talk it through first? Call or WhatsApp us — either is faster than a form."
        crumbs={crumbs}
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <BookingForm />

          <div className="space-y-5">
            <ChromeCard interactive={false}>
              <h2 className="font-display text-lg text-ink">
                Rather just call?
              </h2>
              <p className="mt-2 text-sm text-muted">
                Describing a noise or a warning message is often quicker than
                typing it.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <ButtonLink href={telUrl()} size="md">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {site.phone}
                </ButtonLink>
                <ButtonLink
                  href={whatsappUrl(
                    `Hi ${site.name}, I'd like to book a pickup for my car.`,
                  )}
                  size="md"
                  variant="outline"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp us
                </ButtonLink>
              </div>
            </ChromeCard>

            <ChromeCard interactive={false}>
              <h2 className="font-display text-lg text-ink">
                What happens next
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {[
                  { icon: Phone, text: "We call you back with the collection charge and a time." },
                  { icon: Truck, text: "We collect the car — anywhere in the UAE." },
                  { icon: ShieldCheck, text: "Full diagnosis, then a written quote to approve." },
                  { icon: Clock, text: "Work carried out and the car returned to your door." },
                ].map((i) => (
                  <li key={i.text} className="flex items-start gap-3">
                    <i.icon className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
                    {i.text}
                  </li>
                ))}
              </ul>
            </ChromeCard>

            <ChromeCard interactive={false}>
              <h2 className="font-display text-lg text-ink">Opening hours</h2>
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
        </div>
      </Section>
    </>
  );
}
