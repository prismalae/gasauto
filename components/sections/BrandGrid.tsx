import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brandsByFamily, cn } from "@/lib/utils";
import { ChromeCard } from "@/components/ui/ChromeCard";
import { OriginBadge } from "@/components/ui/OriginBadge";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";

const groups = brandsByFamily();

/**
 * The four JLR marques as wide feature cards in one labelled group.
 */
export function BrandGrid() {
  return (
    <Section id="brands">
      <Reveal className="max-w-3xl">
        <Eyebrow>Marques we specialise in</Eyebrow>
        <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
          <span className="text-chrome">Range Rover, Defender &amp; Jaguar repair.</span>{" "}
          <span className="text-green">One family, done properly.</span>
        </h2>
        <p className="mt-4 text-muted">
          Range Rover, Land Rover, Defender and Jaguar share platforms,
          engines and electronics under Jaguar Land Rover — one engineering
          family with its own failure patterns. It is the only work we take,
          and depth in one marque is depth in all four.
        </p>
      </Reveal>

      <div className="mt-12 space-y-14">
        {groups.map(({ family, brands }) => {
          const feature = true;

          return (
            <div key={family.id}>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
                <div>
                  <h3 className="font-display text-xl text-ink sm:text-2xl">
                    {family.label}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-muted">{family.blurb}</p>
                </div>
                <Link
                  href={`/${family.hubSlug}`}
                  className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-green"
                >
                  View all
                  <ArrowRight
                    className="btn-icon h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <RevealGroup
                as="ul"
                className={
                  feature
                    ? "grid gap-5 sm:grid-cols-2"
                    : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                }
              >
                {brands.map((b) => (
                  <li key={b.slug} className="list-none">
                    <ChromeCard href={`/${b.slug}`} chrome={feature} className={feature ? "sm:p-8" : ""}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "shrink-0 text-steel transition-[color,transform] duration-300 group-hover:scale-110 group-hover:text-green",
                              feature ? "h-11 w-11" : "h-8 w-8",
                            )}
                          >
                            <BrandLogo slug={b.slug} name={b.name} />
                          </span>
                          <h4
                            className={
                              feature
                                ? "font-display text-2xl text-ink"
                                : "font-display text-lg text-ink"
                            }
                          >
                            {b.name}
                          </h4>
                        </div>
                        <OriginBadge family={b.family} />
                      </div>

                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                        {feature ? b.intro : b.commonFaults[0]?.body}
                      </p>


                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green">
                        {b.name} repair
                        <ArrowRight
                          className="btn-icon h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </ChromeCard>
                  </li>
                ))}
              </RevealGroup>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
