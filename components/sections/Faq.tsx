import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";

export function Faq({
  items,
  eyebrow = "Common questions",
  title,
}: {
  items: { q: string; a: string }[];
  eyebrow?: string;
  title?: React.ReactNode;
}) {
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
            {title ?? (
              <>
                <span className="text-chrome">Car repair questions</span>{" "}
                <span className="text-green">we get asked</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-muted">
            Not seeing yours? Call or WhatsApp us — we would rather answer it
            before you book than after.
          </p>
        </Reveal>

        <Reveal>
          <Accordion items={items} />
        </Reveal>
      </div>
    </Section>
  );
}
