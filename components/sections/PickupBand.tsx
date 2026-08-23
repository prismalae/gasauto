import { Truck, Wrench, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { media } from "@/content/media";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import { fadeUp } from "@/lib/motion";
import { ChromeCard } from "@/components/ui/ChromeCard";

const steps = [
  {
    icon: Truck,
    title: "We collect",
    text: "Tell us where the car is and when suits you. We come to your home or office anywhere in the UAE — including cars that will not start.",
  },
  {
    icon: Wrench,
    title: "We diagnose & repair",
    text: "Full diagnostic scan, then a written quote covering parts and labour. Nothing is carried out until you approve it.",
  },
  {
    icon: CheckCircle2,
    title: "We return",
    text: "Your car comes back to you, washed, with the work documented and covered by our warranty.",
  },
];

export function PickupBand() {
  return (
    <Section id="pickup" className="relative">
      <div className="chrome-stroke chrome-stroke-slow grad-band relative overflow-hidden rounded-xl p-7 sm:p-10">
        {/* Animated route line connecting the three steps. */}
        <svg
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 hidden h-24 w-full -translate-y-1/2 lg:block"
          viewBox="0 0 1200 100"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M60 50 C 300 -10, 500 110, 700 50 S 1050 -5, 1160 50"
            stroke="url(#routeGrad)"
            strokeWidth="2"
            strokeDasharray="10 12"
            className="animate-dash"
          />
          <defs>
            <linearGradient id="routeGrad" x1="0" y1="0" x2="1200" y2="0">
              <stop offset="0%" stopColor="#0b5227" stopOpacity="0" />
              <stop offset="50%" stopColor="#0b5227" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0b5227" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10">
          <Reveal className="max-w-3xl">
            <Eyebrow>Car pickup &amp; delivery — all seven emirates</Eyebrow>
            <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
              <span className="text-chrome">We pick your car up.</span>{" "}
              <span className="text-green">And bring it back.</span>
            </h2>
            <p className="mt-4 text-muted">
              You should not have to lose half a day to a garage visit. Our
              collection and delivery service covers the whole UAE — and the
              charge is quoted to you up front, based on where you are, before
              anything is arranged.
            </p>
          </Reveal>

          <Reveal className="mt-10 overflow-hidden rounded-xl">
            <Image
              src={media.workshopBays.src}
              alt={media.workshopBays.alt}
              width={media.workshopBays.width}
              height={media.workshopBays.height}
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="aspect-[16/9] w-full object-cover"
            />
          </Reveal>

          <RevealGroup as="ol" className="mt-6 grid gap-5 lg:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="list-none">
                <ChromeCard interactive={false} sheen={false}>
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-soft ring-1 ring-green/25">
                      <s.icon className="h-6 w-6 text-green" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                      Step {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </ChromeCard>
              </li>
            ))}
          </RevealGroup>

          <Reveal variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/book" size="lg">
              Book a Pickup
            </ButtonLink>
            <ButtonLink href="/pickup-and-delivery" size="lg" variant="outline">
              How it works
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
