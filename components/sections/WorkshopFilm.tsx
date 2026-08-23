import { LazyVideo } from "@/components/ui/LazyVideo";
import { clips } from "@/content/media";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

const reel = [clips.engineBay, clips.oilChange, clips.engineLift];

/**
 * Real footage from the workshop floor. One landscape clip carries the
 * section, with three vertical clips beside it — the phone-shot aspect ratio
 * used as intended rather than cropped into a wide box.
 */
export function WorkshopFilm() {
  return (
    <Section id="workshop">
      <Reveal className="max-w-3xl">
        <Eyebrow>Inside our Sharjah workshop</Eyebrow>
        <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
          <span className="text-chrome">This is the actual bay</span>{" "}
          <span className="text-green">your car sits in</span>
        </h2>
        <p className="mt-4 text-muted">
          No stock photography. Every clip and photo on this site was shot on
          our floor in Sharjah Industrial Area 12 — the ramps, the tools and the
          technicians who will do the work.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="chrome-stroke chrome-stroke-slow overflow-hidden rounded-xl">
          <LazyVideo
            src={clips.workshopAction.src}
            poster={clips.workshopAction.poster}
            alt={clips.workshopAction.alt}
            className="aspect-video"
          />
        </Reveal>

        <RevealGroup className="grid grid-cols-3 gap-3 lg:grid-cols-3">
          {reel.map((clip) => (
            <Reveal
              key={clip.src}
              className="overflow-hidden rounded-lg border border-line"
            >
              <LazyVideo
                src={clip.src}
                poster={clip.poster}
                alt={clip.alt}
                className="aspect-[9/16]"
              />
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      <Reveal className="mt-8">
        <ButtonLink href="/book" size="lg">
          Book a pickup
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
