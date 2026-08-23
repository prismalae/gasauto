import type { Metadata } from "next";
import { ArrowRight, Clock } from "lucide-react";
import { site } from "@/config/site";
import { posts } from "@/content/posts";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ChromeCard } from "@/components/ui/ChromeCard";
import { RevealGroup } from "@/components/ui/Reveal";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/schema/JsonLd";
import { breadcrumbSchema } from "@/components/schema/schemas";

const description =
  "Car maintenance advice for UAE drivers — Range Rover air suspension, German car service intervals, AC faults and honest guidance on repairs, from the GAS AUTO workshop in Sharjah.";

export const metadata: Metadata = {
  title: { absolute: "Car Maintenance Tips for UAE Drivers | Blog — GAS AUTO" },
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Car Maintenance Tips for UAE Drivers | Blog — GAS AUTO",
    description,
    url: `${site.domain}/blog`,
    type: "website",
  },
};

const crumbs = [
  { name: "Home", url: "/" },
  { name: "Blog", url: "/blog" },
];

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow="From the workshop"
        title={
          <>
            <span className="text-chrome">Car maintenance advice</span>{" "}
            <span className="text-green">for UAE drivers</span>
          </>
        }
        intro="Practical guidance on the faults we actually see, why the Gulf climate changes what wears out and how fast, and how to tell a real diagnosis from a guess."
        crumbs={crumbs}
      />

      <Section>
        <RevealGroup as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p) => (
            <li key={p.slug} className="list-none">
              <ChromeCard href={`/blog/${p.slug}`} className="flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-green/40 bg-green-soft px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-green">
                    {p.tag}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {p.readingMinutes} min
                  </span>
                </div>

                <h2 className="mt-4 font-display text-lg leading-snug text-ink">
                  {p.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {p.description}
                </p>

                <div className="mt-auto pt-4">
                  <time dateTime={p.date} className="block text-xs text-muted">
                    {dateFmt.format(new Date(p.date))}
                  </time>
                  <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-green">
                    Read article
                    <ArrowRight
                      className="btn-icon h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </ChromeCard>
            </li>
          ))}
        </RevealGroup>
      </Section>

      <Cta />
    </>
  );
}
