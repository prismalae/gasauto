import { BadgeCheck, FileText, Gauge, PackageCheck, ShieldCheck, Users } from "lucide-react";
import { ChromeCard } from "@/components/ui/ChromeCard";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";

const reasons = [
  {
    icon: Gauge,
    title: "Dealer-level diagnostics",
    text: "Manufacturer-level scanning that talks to every control module, runs actuator tests and codes replacement parts — not a generic OBD reader that reads one code and guesses.",
  },
  {
    icon: PackageCheck,
    title: "Genuine & OEM parts",
    text: "We fit genuine or OEM-equivalent parts as standard and tell you exactly which. Where a quality aftermarket option genuinely performs as well, it is offered as your choice.",
  },
  {
    icon: FileText,
    title: "Written quote before any work",
    text: "You approve the cost before a spanner is picked up. If we find something else once the job is open, we stop and check with you rather than adding it to the bill.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty on repairs",
    text: "Parts and labour are covered by a workshop warranty, stated on your invoice. We stand behind the work.",
  },
  {
    icon: BadgeCheck,
    title: "Specialists, not generalists",
    text: "Range Rover air suspension and JLR engine electronics are not general-workshop jobs. Knowing the common failures by heart saves diagnostic hours you would otherwise pay for.",
  },
  {
    icon: Users,
    title: "Honest advice, including \"don't\"",
    text: "Sometimes the right answer is that a repair is not worth the money on that car. We will tell you, even when it costs us the job.",
  },
];

export function WhyUs() {
  return (
    <Section id="why-us">
      <Reveal className="max-w-3xl">
        <Eyebrow>Why GAS AUTO</Eyebrow>
        <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
          <span className="text-chrome">Dealer standards.</span>{" "}
          <span className="text-green">Without the dealer invoice.</span>
        </h2>
      </Reveal>

      <RevealGroup as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r) => (
          <li key={r.title} className="list-none">
            <ChromeCard interactive={false}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-soft ring-1 ring-green/25">
                <r.icon className="h-5 w-5 text-green" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg text-ink">
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.text}</p>
            </ChromeCard>
          </li>
        ))}
      </RevealGroup>
    </Section>
  );
}
