import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { site, ORG_ID } from "@/config/site";
import { getPost, postSlugs, posts } from "@/content/posts";
import { brandsBySlugs, servicesBySlugs } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { ChromeCard } from "@/components/ui/ChromeCard";
import { Reveal } from "@/components/ui/Reveal";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/schema/JsonLd";
import { breadcrumbSchema } from "@/components/schema/schemas";

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: { absolute: post.metaTitle },
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.description,
      url: `${site.domain}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  const relBrands = brandsBySlugs(post.relatedBrands ?? []);
  const relServices = servicesBySlugs(post.relatedServices ?? []);
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          url: `${site.domain}/blog/${post.slug}`,
          mainEntityOfPage: `${site.domain}/blog/${post.slug}`,
          author: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
        }}
      />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow={post.tag}
        title={<span className="text-ink">{post.title}</span>}
        crumbs={crumbs}
      >
        <p className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted">
          <time dateTime={post.date}>{dateFmt.format(new Date(post.date))}</time>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-green" aria-hidden="true" />
            {post.readingMinutes} min read
          </span>
        </p>
      </PageHero>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <article>
            <Prose>
              <p className="text-lg text-ink">{post.description}</p>
              {post.body.map((block, i) => {
                if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
                if (block.type === "ul")
                  return (
                    <ul key={i}>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                return <p key={i}>{block.text}</p>;
              })}
            </Prose>
          </article>

          <aside className="space-y-5">
            {relServices.length > 0 && (
              <ChromeCard interactive={false}>
                <h2 className="font-display text-base text-ink">
                  Related services
                </h2>
                <ul className="mt-3 space-y-2">
                  {relServices.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="flex items-center justify-between gap-2 rounded-lg border border-line bg-paper-2 px-3 py-2.5 text-sm transition-colors hover:border-green hover:text-green"
                      >
                        {s.name}
                        <ArrowRight className="btn-icon h-4 w-4 shrink-0" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </ChromeCard>
            )}

            {relBrands.length > 0 && (
              <ChromeCard interactive={false}>
                <h2 className="font-display text-base text-ink">
                  Marques mentioned
                </h2>
                <ul className="mt-3 space-y-2">
                  {relBrands.map((b) => (
                    <li key={b.slug}>
                      <Link
                        href={`/${b.slug}`}
                        className="flex items-center justify-between gap-2 rounded-lg border border-line bg-paper-2 px-3 py-2.5 text-sm transition-colors hover:border-green hover:text-green"
                      >
                        {b.name} repair
                        <ArrowRight className="btn-icon h-4 w-4 shrink-0" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </ChromeCard>
            )}
          </aside>
        </div>
      </Section>

      <Section>
        <Reveal>
          <h2 className="font-display text-2xl text-ink">Read next</h2>
        </Reveal>
        <ul className="mt-6 grid gap-5 sm:grid-cols-3">
          {more.map((p) => (
            <li key={p.slug} className="list-none">
              <ChromeCard href={`/blog/${p.slug}`}>
                <span className="rounded-full border border-green/40 bg-green-soft px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-green">
                  {p.tag}
                </span>
                <h3 className="mt-3 font-display text-base leading-snug text-ink">
                  {p.title}
                </h3>
              </ChromeCard>
            </li>
          ))}
        </ul>
      </Section>

      <Cta />
    </>
  );
}
