import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FAMILIES, type Family } from "@/content/brands";
import { brandsInFamily, servicesBySlugs } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { ChromeCard } from "@/components/ui/ChromeCard";
import { OriginBadge } from "@/components/ui/OriginBadge";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/schema/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/schema/schemas";

/**
 * Shared body for the two family hubs. Each hub owns its own head keyword and
 * links down to only its own marques — the pillars never share a page.
 */
export function HubTemplate({
  family,
  title,
  intro,
  description,
  serviceSlugs,
  sections,
  faqs,
}: {
  family: Family;
  title: React.ReactNode;
  intro: string;
  description: string;
  serviceSlugs: string[];
  sections: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
}) {
  const meta = FAMILIES[family];
  const marques = brandsInFamily(family);
  const svcs = servicesBySlugs(serviceSlugs);

  const crumbs = [
    { name: "Home", url: "/" },
    { name: meta.hubTitle, url: `/${meta.hubSlug}` },
  ];

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `${meta.hubTitle} in Sharjah`,
          description,
          url: `/${meta.hubSlug}`,
        })}
      />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(faqs)} />

      <PageHero
        eyebrow={meta.label}
        title={title}
        intro={intro}
        crumbs={crumbs}
        aside={
          <ChromeCard interactive={false}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Marques in this group
            </h2>
            <ul className="mt-4 space-y-2">
              {marques.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/${b.slug}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-line bg-paper-2 px-3 py-2.5 text-sm transition-colors hover:border-green hover:text-green"
                  >
                    {b.name}
                    <OriginBadge family={b.family} />
                  </Link>
                </li>
              ))}
            </ul>
          </ChromeCard>
        }
      />

      <Section>
        <Reveal className="max-w-3xl">
          <Eyebrow>The marques</Eyebrow>
          <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
            <span className="text-ink">{meta.label}</span>{" "}
            <span className="text-green">we work on</span>
          </h2>
          <p className="mt-4 text-muted">{meta.blurb}</p>
        </Reveal>

        <RevealGroup
          as="ul"
          className={
            marques.length <= 2
              ? "mt-10 grid gap-5 sm:grid-cols-2"
              : "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {marques.map((b) => (
            <li key={b.slug} className="list-none">
              <ChromeCard href={`/${b.slug}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="h-10 w-10 shrink-0 text-steel transition-colors duration-300 group-hover:text-green">
                      <BrandLogo slug={b.slug} name={b.name} />
                    </span>
                    <h3 className="font-display text-xl text-ink">{b.name}</h3>
                  </div>
                  <OriginBadge family={b.family} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{b.intro}</p>
                {b.originNote && (
                  <p className="mt-3 text-xs italic text-muted">{b.originNote}</p>
                )}
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green">
                  {b.name} repair in Sharjah
                  <ArrowRight
                    className="btn-icon h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </ChromeCard>
            </li>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <RevealGroup className="grid gap-5 lg:grid-cols-3">
          {sections.map((s) => (
            <Reveal key={s.title}>
              <ChromeCard interactive={false} className="h-full">
                <h2 className="font-display text-lg text-ink">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </ChromeCard>
            </Reveal>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <Reveal className="max-w-3xl">
          <Eyebrow>Services</Eyebrow>
          <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
            <span className="text-chrome">What these cars</span>{" "}
            <span className="text-green">come to us for</span>
          </h2>
        </Reveal>

        <RevealGroup as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {svcs.map((s) => (
            <li key={s.slug} className="list-none">
              <ChromeCard href={`/services/${s.slug}`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-soft ring-1 ring-green/25">
                  <ServiceIcon name={s.icon} className="h-5 w-5 text-green" />
                </span>
                <h3 className="mt-4 font-display text-base text-ink">
                  {s.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{s.intro}</p>
              </ChromeCard>
            </li>
          ))}
        </RevealGroup>
      </Section>

      <Faq items={faqs} />
      <Cta />
    </>
  );
}
