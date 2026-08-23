import { ArrowRight } from "lucide-react";
import { services } from "@/content/services";
import { ChromeCard } from "@/components/ui/ChromeCard";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";

export function ServiceGrid({ heading = true }: { heading?: boolean }) {
  return (
    <Section id="services">
      {heading && (
        <Reveal className="max-w-3xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
            <span className="text-chrome">Car repair services in Sharjah.</span>{" "}
            <span className="text-green">Oil change to engine rebuild.</span>
          </h2>
          <p className="mt-4 text-muted">
            Diagnosis first, quote second, work third. That order is what keeps
            our customers from paying for parts their car did not need.
          </p>
        </Reveal>
      )}

      <RevealGroup as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li key={s.slug} className="list-none">
            <ChromeCard href={`/services/${s.slug}`}>
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-soft ring-1 ring-green/25">
                  <ServiceIcon name={s.icon} className="h-6 w-6 text-green" />
                </span>
                {s.featured && (
                  <span className="rounded-full border border-green/40 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-green">
                    Most requested
                  </span>
                )}
              </div>

              <h3 className="mt-5 font-display text-lg text-ink">
                {s.name}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                {s.intro}
              </p>

              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green">
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
    </Section>
  );
}
