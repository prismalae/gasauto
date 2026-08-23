import type { Metadata } from "next";
import { Car, CheckCircle2, Clock, MapPin, Receipt, ShieldCheck, Truck, Wrench } from "lucide-react";
import { site } from "@/config/site";
import { emirates, otherEmirates, sharjahAreas } from "@/content/areas";
import Image from "next/image";
import { media } from "@/content/media";
import { pickupFaqs } from "@/content/faqs";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ChromeCard } from "@/components/ui/ChromeCard";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/schema/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/schema/schemas";

const description =
  "Car pickup and delivery across the UAE. We collect your car from home or the office, repair it and return it — including vehicles that will not start. Collection charge quoted up front.";

export const metadata: Metadata = {
  title: { absolute: "Car Pickup & Delivery Across the UAE — GAS AUTO Sharjah" },
  description,
  alternates: { canonical: "/pickup-and-delivery" },
  openGraph: {
    title: "Car Pickup & Delivery Across the UAE — GAS AUTO Sharjah",
    description,
    url: `${site.domain}/pickup-and-delivery`,
    type: "website",
  },
};

const crumbs = [
  { name: "Home", url: "/" },
  { name: "Pickup & Delivery", url: "/pickup-and-delivery" },
];

const steps = [
  {
    icon: Truck,
    title: "1. We collect",
    text: "Book by phone, WhatsApp or the form. Tell us where the car is and when suits you, and we confirm the collection charge for your location before anything is arranged. Our driver then collects it from your home, office or the roadside — including cars that will not start or will not lift.",
  },
  {
    icon: Wrench,
    title: "2. We diagnose",
    text: "Full multi-module diagnostic scan and a physical inspection on the ramp. We establish the actual fault rather than the first code, then send you a written quote covering parts and labour.",
  },
  {
    icon: CheckCircle2,
    title: "3. You approve",
    text: "Nothing is carried out until you say yes. If we find something additional once the job is open, we stop and check with you rather than adding it to the invoice.",
  },
  {
    icon: Car,
    title: "4. We deliver",
    text: "The car is road tested, washed and returned to your door, with the work documented and covered by our warranty.",
  },
];

export default function PickupPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Car pickup and delivery",
          description,
          url: "/pickup-and-delivery",
        })}
      />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(pickupFaqs)} />

      <PageHero
        eyebrow="All seven emirates"
        title={
          <>
            <span className="text-chrome">Car Pickup</span>{" "}
            <span className="text-green">&amp; Delivery</span>
            <br />
            <span className="text-2xl text-muted sm:text-3xl">across the UAE</span>
          </>
        }
        intro="Car pickup and delivery from your door, anywhere in the UAE, to our Sharjah workshop and back again. You should not have to lose half a working day to a garage visit — we collect, carry out the agreed work and return the car, with the collection charge quoted before anything is arranged."
        crumbs={crumbs}
        aside={
          <ChromeCard interactive={false} className="overflow-hidden !p-0">
            <Image
              src={media.pickupRecovery.src}
              alt={media.pickupRecovery.alt}
              width={media.pickupRecovery.width}
              height={media.pickupRecovery.height}
              sizes="(min-width: 1024px) 420px, 100vw"
              className="aspect-[4/5] w-full object-cover object-center"
            />
            <div className="p-6">
            <ul className="space-y-3">
              {[
                { icon: Receipt, text: "Collection charge quoted up front, never a surprise" },
                { icon: ShieldCheck, text: "Your car is covered while in our care" },
                { icon: Clock, text: "Collection at a time that suits you" },
                { icon: Truck, text: "Non-runners and no-lift cars included" },
                { icon: MapPin, text: "All seven emirates covered" },
              ].map((i) => (
                <li key={i.text} className="flex items-start gap-3 text-sm text-muted">
                  <i.icon className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
                  {i.text}
                </li>
              ))}
            </ul>
            <ButtonLink href="/book" size="md" className="mt-5 w-full">
              Book a collection
            </ButtonLink>
            </div>
          </ChromeCard>
        }
      />

      {/* Pricing honesty — stated plainly rather than buried in an FAQ. */}
      <Section>
        <Reveal>
          <ChromeCard interactive={false} className="bg-green-soft">
            <div className="flex flex-wrap items-start gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-soft ring-1 ring-green/25">
                <Receipt className="h-6 w-6 text-green" aria-hidden="true" />
              </span>
              <div className="max-w-3xl">
                <h2 className="font-display text-xl text-ink">
                  What collection costs
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Pickup and delivery is a paid service, and the price depends on
                  three things: which emirate you are in, the distance from our
                  workshop in Sharjah, and whether the car can be driven or needs
                  recovery equipment. We quote it when you book — before a driver
                  is dispatched and before you have committed to any repair. You
                  will never find a collection charge on your invoice that you
                  did not agree to first.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Sharjah is where the workshop is, so collection here is the
                  quickest and the least expensive.
                </p>
              </div>
            </div>
          </ChromeCard>
        </Reveal>
      </Section>

      <Section>
        <Reveal className="max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
            <span className="text-chrome">Four steps,</span>{" "}
            <span className="text-green">start to finish</span>
          </h2>
        </Reveal>

        <RevealGroup as="ol" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.title} className="list-none">
              <ChromeCard interactive={false} className="h-full">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-soft ring-1 ring-green/25">
                  <s.icon className="h-6 w-6 text-green" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </ChromeCard>
            </li>
          ))}
        </RevealGroup>
      </Section>

      {/* Coverage — the local SEO surface */}
      <Section>
        <Reveal className="max-w-3xl">
          <Eyebrow>Coverage</Eyebrow>
          <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
            <span className="text-chrome">Every emirate,</span>{" "}
            <span className="text-green">door to door</span>
          </h2>
          <p className="mt-4 text-muted">
            Wherever the car is in the UAE, we can get to it. Below are the
            emirates we cover and the Sharjah districts we collect from most
            often — if your area is not listed, it is almost certainly still
            covered. Call and ask.
          </p>
        </Reveal>

        <RevealGroup as="ul" className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {emirates.map((e) => (
            <li
              key={e}
              className="flex items-center gap-2 rounded-xl border border-green/30 bg-green-soft px-4 py-3 text-sm font-medium text-green"
            >
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              {e}
              {e === "Sharjah" && (
                <span className="ml-auto text-[0.625rem] uppercase tracking-wider text-muted">
                  Workshop
                </span>
              )}
            </li>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <h3 className="font-display text-lg text-ink">
            Sharjah districts we collect from
          </h3>
        </Reveal>

        <RevealGroup as="ul" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {sharjahAreas.map((a) => (
            <li
              key={a}
              className="flex items-center gap-2 rounded-lg border border-line bg-paper-2 px-3 py-2.5 text-sm text-muted"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 text-green" aria-hidden="true" />
              {a}
            </li>
          ))}
        </RevealGroup>

        <Reveal className="mt-8">
          <ChromeCard interactive={false} className="bg-green-soft">
            <h3 className="font-display text-lg text-ink">
              Outside Sharjah?
            </h3>
            <p className="mt-2 text-sm text-muted">
              We collect from {otherEmirates.join(", ")}. Tell us your location
              when you book and we will confirm the collection charge and the
              timing before the day.
            </p>
          </ChromeCard>
        </Reveal>
      </Section>

      <Faq
        items={pickupFaqs}
        eyebrow="Pickup questions"
        title={
          <>
            <span className="text-chrome">Pickup &amp; delivery</span>{" "}
            <span className="text-green">questions</span>
          </>
        }
      />

      <Cta
        title={
          <>
            <span className="text-chrome">Book a collection</span>{" "}
            <span className="text-green">anywhere in the UAE</span>
          </>
        }
        whatsappMessage={`Hi ${site.name}, I'd like to arrange a pickup for my car.`}
      />
    </>
  );
}
