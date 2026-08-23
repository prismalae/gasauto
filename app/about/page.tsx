import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gauge, Handshake, PackageCheck, Truck } from "lucide-react";
import { site } from "@/config/site";
import { brandsByFamily } from "@/lib/utils";
import Image from "next/image";
import { media } from "@/content/media";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ChromeCard } from "@/components/ui/ChromeCard";
import { OriginBadge } from "@/components/ui/OriginBadge";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/schema/JsonLd";
import { breadcrumbSchema } from "@/components/schema/schemas";

const description =
  "GAS AUTO is an independent car garage in Sharjah — Range Rover and Land Rover specialists and German car experts, with dealer-level diagnostics, genuine parts and UAE-wide pickup and delivery.";

export const metadata: Metadata = {
  title: { absolute: "About GAS AUTO | Independent Car Garage in Sharjah" },
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | Trusted Car Workshop in Sharjah — GAS AUTO",
    description,
    url: `${site.domain}/about`,
    type: "website",
  },
};

const crumbs = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
];

const values = [
  {
    icon: Gauge,
    title: "Diagnose, then quote, then repair",
    text: "In that order, every time. Most of what customers overpay for elsewhere is parts fitted on a guess, so we spend the time up front to know what is actually wrong.",
  },
  {
    icon: PackageCheck,
    title: "Tell you what we are fitting",
    text: "Genuine, OEM or quality aftermarket — you are told which and why before it goes on the car. No quiet substitutions.",
  },
  {
    icon: Handshake,
    title: "Say when a repair is not worth it",
    text: "Sometimes the honest answer is that the money is better spent elsewhere, or that the car is not worth the job. We will say so even when it costs us the work.",
  },
  {
    icon: Truck,
    title: "Come to you",
    text: "Collection and delivery covers all seven emirates, and the charge is quoted before a driver moves. You should not have to lose half a working day to a garage visit.",
  },
];

const groups = brandsByFamily();

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow="About us"
        title={
          <>
            <span className="text-chrome">Specialists first,</span>{" "}
            <span className="text-green">garage second</span>
          </>
        }
        intro="GAS AUTO is an independent car garage in Sharjah built around two distinct disciplines: British 4x4s — Range Rover and Land Rover — and German cars. We chose to go deep on those rather than accept anything with four wheels, because depth is what makes a diagnosis fast and a repair right the first time."
        crumbs={crumbs}
      />

      <Section className="!pt-10">
        <Reveal className="overflow-hidden rounded-xl">
          <Image
            src={media.workshopInterior.src}
            alt={media.workshopInterior.alt}
            width={media.workshopInterior.width}
            height={media.workshopInterior.height}
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="h-64 w-full object-cover sm:h-96"
            priority
          />
        </Reveal>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <Reveal>
            <Eyebrow>Our approach</Eyebrow>
            <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
              <span className="text-chrome">Why we split the workshop</span>{" "}
              <span className="text-green">in two</span>
            </h2>
            <div className="mt-6 space-y-4 text-muted">
              <p>
                A Range Rover and a BMW are not the same problem wearing
                different badges. The British 4x4s run air suspension
                architecture, terrain response systems and an electrical layout
                that is entirely their own — and in UAE heat they fail in
                patterns that are specific and predictable. The German marques
                are a different discipline: dense electronic architecture where
                one fault lights several unrelated codes, and where replacement
                parts frequently need coding before they will work at all.
              </p>
              <p>
                Treating those as one job is how workshops end up guessing. We
                keep them separate — separate diagnostic equipment, separate
                expertise, separate sections of this website — because that
                separation is what keeps our diagnostic time short and our
                customers&rsquo; bills honest.
              </p>
              <p>
                We are not a dealership and we do not pretend to be. What we
                offer is dealer-level diagnostic capability and genuine parts,
                at independent labour rates, with your car collected from your
                door and returned to it.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {groups.map(({ family }) => (
                <Link
                  key={family.id}
                  href={`/${family.hubSlug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:border-green hover:text-green"
                >
                  {family.label}
                  <ArrowRight
                    className="btn-icon h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <ChromeCard interactive={false}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                Marques we specialise in
              </h2>
              {groups.map(({ family, brands }) => (
                <div key={family.id} className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-green">
                    {family.label}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {brands.map((b) => (
                      <li key={b.slug}>
                        <Link
                          href={`/${b.slug}`}
                          className="flex items-center justify-between gap-2 rounded-lg border border-line bg-paper-2 px-3 py-2 text-sm transition-colors hover:border-green hover:text-green"
                        >
                          {b.name}
                          <OriginBadge family={b.family} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ChromeCard>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal className="max-w-3xl">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
            <span className="text-chrome">Four things we</span>{" "}
            <span className="text-green">will not compromise on</span>
          </h2>
        </Reveal>

        <RevealGroup as="ul" className="mt-10 grid gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <li key={v.title} className="list-none">
              <ChromeCard interactive={false} className="h-full">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-soft ring-1 ring-green/25">
                  <v.icon className="h-5 w-5 text-green" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </ChromeCard>
            </li>
          ))}
        </RevealGroup>

        <Reveal>
          <dl className="mt-12 grid grid-cols-2 gap-4 border-t border-line pt-8 lg:grid-cols-4">
            {site.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-3xl text-ink sm:text-4xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.12em] text-muted">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      <Cta />
    </>
  );
}
