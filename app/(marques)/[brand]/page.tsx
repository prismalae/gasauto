import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, Check, Truck } from "lucide-react";
import { site } from "@/config/site";
import { brandSlugs, FAMILIES, getBrand } from "@/content/brands";
import Image from "next/image";
import { brandMedia } from "@/content/media";
import { servicesBySlugs } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ChromeCard } from "@/components/ui/ChromeCard";
import { OriginBadge } from "@/components/ui/OriginBadge";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { ButtonLink } from "@/components/ui/Button";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/schema/JsonLd";
import { brandServiceSchema, breadcrumbSchema, faqSchema } from "@/components/schema/schemas";

export function generateStaticParams() {
  return brandSlugs.map((brand) => ({ brand }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ brand: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};

  return {
    title: { absolute: brand.metaTitle },
    description: brand.metaDescription,
    alternates: { canonical: `/${brand.slug}` },
    openGraph: {
      title: brand.metaTitle,
      description: brand.metaDescription,
      url: `${site.domain}/${brand.slug}`,
      type: "website",
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const { brand: slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const family = FAMILIES[brand.family];
  const related = servicesBySlugs(brand.relatedServices);
  const photo = brandMedia[brand.slug];

  // Breadcrumb nests the marque under its family hub — this is what teaches
  // search engines the two-pillar structure of the site.
  const crumbs = [
    { name: "Home", url: "/" },
    { name: family.hubTitle, url: `/${family.hubSlug}` },
    { name: `${brand.name} Repair`, url: `/${brand.slug}` },
  ];

  return (
    <>
      <JsonLd data={brandServiceSchema(brand)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(brand.faqs)} />

      <PageHero
        eyebrow={family.label}
        title={
          <>
            <span className="text-ink">{brand.name} Repair</span>{" "}
            <span className="text-green">&amp; Service</span>
            <br />
            <span className="text-2xl text-muted sm:text-3xl">in Sharjah</span>
          </>
        }
        intro={brand.intro}
        crumbs={crumbs}
        aside={
          <ChromeCard interactive={false}>
            <div className="flex items-center justify-between gap-3">
              <span className="h-9 w-9 shrink-0 text-steel">
                <BrandLogo slug={brand.slug} name={brand.name} />
              </span>
              <h2 className="mr-auto text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                Models we service
              </h2>
              <OriginBadge family={brand.family} />
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {brand.models.map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-line bg-paper-2 px-3 py-1 text-sm text-muted"
                >
                  {m}
                </li>
              ))}
            </ul>
            <ButtonLink href="/book" size="sm" className="mt-5 w-full">
              <Truck className="h-4 w-4" aria-hidden="true" />
              Book a pickup
            </ButtonLink>
          </ChromeCard>
        }
      >
        {brand.originNote && (
          <p className="mt-5 flex max-w-2xl items-start gap-3 rounded-xl border border-line bg-paper-2 p-4 text-sm text-muted">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
            <span>{brand.originNote}</span>
          </p>
        )}
      </PageHero>

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

      {/* Common faults — the marque-specific content that earns the ranking */}
      <Section>
        <Reveal className="max-w-3xl">
          <Eyebrow>Faults we see most</Eyebrow>
          <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
            <span className="text-chrome">Common {brand.name} problems</span>{" "}
            <span className="text-green">in the UAE</span>
          </h2>
          <p className="mt-4 text-muted">
            Heat, dust and traffic change which components fail and how fast.
            These are the faults we diagnose most often on {brand.name} vehicles
            in Sharjah.
          </p>
        </Reveal>

        <RevealGroup as="ul" className="mt-10 grid gap-5 lg:grid-cols-2">
          {brand.commonFaults.map((f) => (
            <li key={f.title} className="list-none">
              <ChromeCard interactive={false}>
                <h3 className="font-display text-lg text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </ChromeCard>
            </li>
          ))}
        </RevealGroup>
      </Section>

      {/* Related services */}
      <Section>
        <Reveal className="max-w-3xl">
          <Eyebrow>Related services</Eyebrow>
          <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
            <span className="text-chrome">What we do for</span>{" "}
            <span className="text-green">your {brand.name}</span>
          </h2>
        </Reveal>

        <RevealGroup as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((s) => (
            <li key={s.slug} className="list-none">
              <ChromeCard href={`/services/${s.slug}`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-soft ring-1 ring-green/25">
                  <ServiceIcon name={s.icon} className="h-5 w-5 text-green" />
                </span>
                <h3 className="mt-4 font-display text-base text-ink">
                  {s.name}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-green">
                  Learn more
                  <ArrowRight
                    className="btn-icon h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </ChromeCard>
            </li>
          ))}
        </RevealGroup>

        <Reveal className="mt-10">
          <ChromeCard interactive={false} className="bg-green-soft">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-xl">
                <h3 className="font-display text-lg text-ink">
                  Pickup &amp; delivery for your {brand.name}, UAE-wide
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted">
                  {[
                    "Collected from anywhere in the UAE, charge quoted up front",
                    "Written quote before any work begins",
                    "Genuine or OEM parts, your choice made clear",
                    "Returned to your door under warranty",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <ButtonLink href="/book" size="lg">
                Book a pickup
              </ButtonLink>
            </div>
          </ChromeCard>
        </Reveal>

        <Reveal className="mt-8">
          <Link
            href={`/${family.hubSlug}`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-green"
          >
            See all {family.label.toLowerCase()} we work on
            <ArrowRight
              className="btn-icon h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </Section>

      <Faq
        items={brand.faqs}
        eyebrow={`${brand.name} questions`}
        title={
          <>
            <span className="text-ink">{brand.name} owners</span>{" "}
            <span className="text-green">ask us</span>
          </>
        }
      />

      <Cta
        title={
          <>
            <span className="text-chrome">Book your {brand.name} in</span>{" "}
            <span className="text-green">today</span>
          </>
        }
        whatsappMessage={`Hi ${site.name}, I have a ${brand.name} and I'd like to book a pickup.`}
      />
    </>
  );
}
