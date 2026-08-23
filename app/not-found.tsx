import Link from "next/link";
import { brandsByFamily } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

const groups = brandsByFamily();

export default function NotFound() {
  return (
    <Section className="min-h-[60vh]">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display text-5xl text-green">404</p>
        <h1 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
          That page took a wrong turn
        </h1>
        <p className="mt-4 text-muted">
          The page you were looking for does not exist. Here is the way back.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/book" size="lg" variant="outline">
            Book a pickup
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-6 text-left sm:grid-cols-2">
          {groups.map(({ family, brands }) => (
            <div key={family.id}>
              <Link
                href={`/${family.hubSlug}`}
                className="text-xs font-semibold uppercase tracking-[0.12em] text-green"
              >
                {family.label}
              </Link>
              <ul className="mt-2 space-y-1">
                {brands.map((b) => (
                  <li key={b.slug}>
                    <Link
                      href={`/${b.slug}`}
                      className="text-sm text-muted transition-colors hover:text-green"
                    >
                      {b.name} repair
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
