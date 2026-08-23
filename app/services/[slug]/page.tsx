import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, ArrowRight, Check } from "lucide-react";
import { site } from "@/config/site";
import { getService, serviceSlugs } from "@/content/services";
import Image from "next/image";
import { serviceMedia } from "@/content/media";
import { brandsByFamily, brandsBySlugs } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ChromeCard } from "@/components/ui/ChromeCard";
import { OriginBadge } from "@/components/ui/OriginBadge";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ButtonLink } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/schema/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/schema/schemas";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${site.domain}/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  // Grouped by family — the British / German split is reinforced even here,
  // on a page that is not about any single marque.
  const groups = brandsByFamily(brandsBySlugs(service.appliesTo));
  const photo = serviceMedia[service.slug];

  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.name, url: `/services/${service.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.metaDescription,
          url: `/services/${service.slug}`,
        })}
      />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(service.faqs)} />

      <PageHero
        eyebrow="Service"
        title={
          <>
            <span className="text-ink">{service.name}</span>
            <br />
            <span className="text-2xl text-muted sm:text-3xl">in Sharjah</span>
          </>
        }
        intro={service.intro}
        crumbs={crumbs}
        aside={
          <ChromeCard interactive={false}>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-soft ring-1 ring-green/25">
              <ServiceIcon name={service.icon} className="h-6 w-6 text-green" />
            </span>
            <h2 className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              What&rsquo;s included
            </h2>
            <ul className="mt-3 space-y-2">
              {service.includes.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
            <ButtonLink href="/book" size="sm" className="mt-5 w-full">
              Book a pickup
            </ButtonLink>
          </ChromeCard>
        }
      />

      {photo && (
        <Section className="!pt-10">
          <Reveal className="overflow-hidden rounded-xl">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="h-60 w-full object-cover sm:h-80"
              priority
            />
          </Reveal>
        </Section>
      )}

      {/* Symptoms */}
      <Section>
        <Reveal className="max-w-3xl">
          <Eyebrow>Signs to look for</Eyebrow>
          <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
            <span className="text-chrome">Symptoms that mean</span>{" "}
            <span className="text-green">you need this</span>
          </h2>
        </Reveal>

        <RevealGroup as="ul" className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {service.symptoms.map((s) => (
            <li
              key={s}
              className="flex items-start gap-3 rounded-xl border border-line bg-paper-2 p-4 text-sm text-muted"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
              {s}
            </li>
          ))}
        </RevealGroup>
      </Section>

      {/* Explainer body */}
      <Section>
        <RevealGroup className="grid gap-5 lg:grid-cols-3">
          {service.body.map((b) => (
            <Reveal key={b.title}>
              <ChromeCard interactive={false} className="h-full">
                <h2 className="font-display text-lg text-ink">{b.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
              </ChromeCard>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      {/* Brands this applies to — grouped by family */}
      <Section>
        <Reveal className="max-w-3xl">
          <Eyebrow>Marques covered</Eyebrow>
          <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
            <span className="text-ink">{service.short} for</span>{" "}
            <span className="text-green">these cars</span>
          </h2>
        </Reveal>

        <div className="mt-10 space-y-10">
          {groups.map(({ family, brands }) => (
            <div key={family.id}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  {family.label}
                </h3>
                <Link
                  href={`/${family.hubSlug}`}
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-green"
                >
                  View all
                  <ArrowRight
                    className="btn-icon h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {brands.map((b) => (
                  <li key={b.slug} className="list-none">
                    <Link
                      href={`/${b.slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-line bg-paper-2 px-4 py-3 text-sm transition-colors hover:border-green hover:text-green"
                    >
                      <span className="font-medium">
                        {b.name} {service.short.toLowerCase()}
                      </span>
                      <OriginBadge family={b.family} />
                    </Link>
                  </li>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </Section>

      <Faq
        items={service.faqs}
        eyebrow={`${service.short} questions`}
        title={
          <>
            <span className="text-ink">{service.short}</span>{" "}
            <span className="text-green">questions</span>
          </>
        }
      />

      <Cta
        title={
          <>
            <span className="text-chrome">Book {service.short.toLowerCase()}</span>{" "}
            <span className="text-green">with UAE-wide pickup</span>
          </>
        }
        whatsappMessage={`Hi ${site.name}, I'd like to ask about ${service.name.toLowerCase()}.`}
      />
    </>
  );
}
