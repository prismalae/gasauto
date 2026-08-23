import { MapPin } from "lucide-react";
import { otherEmirates, sharjahAreas } from "@/content/areas";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import { ChromeCard } from "@/components/ui/ChromeCard";

export function ServiceAreas() {
  return (
    <Section id="areas">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <Reveal>
          <Eyebrow>Where we collect</Eyebrow>
          <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
            <span className="text-chrome">Pickup &amp; delivery</span>{" "}
            <span className="text-green">across the UAE</span>
          </h2>
          <p className="mt-4 text-muted">
            The workshop is in Sharjah, so collection here is the quickest and
            the cheapest — but we cover every emirate. Tell us where the car is
            and we will quote the collection charge before you commit to
            anything.
          </p>

          <ChromeCard interactive={false} className="mt-8">
            <h3 className="font-display text-base text-ink">
              Also collecting from
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {otherEmirates.map((e) => (
                <li
                  key={e}
                  className="rounded-full border border-green/40 bg-green-soft px-3 py-1 text-sm text-green"
                >
                  {e}
                </li>
              ))}
            </ul>
          </ChromeCard>
        </Reveal>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Sharjah districts
          </h3>
          <RevealGroup as="ul" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {sharjahAreas.map((area) => (
              <li
                key={area}
                className="flex items-center gap-2 rounded-lg border border-line bg-paper-2 px-3 py-2.5 text-sm text-muted"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-green" aria-hidden="true" />
                {area}
              </li>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
