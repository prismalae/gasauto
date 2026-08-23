import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, telUrl, whatsappUrl } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Cta({
  title,
  text,
  whatsappMessage,
}: {
  title?: React.ReactNode;
  text?: string;
  whatsappMessage?: string;
}) {
  return (
    <Section>
      <Reveal>
        <div className="chrome-stroke chrome-stroke-slow grad-band relative overflow-hidden rounded-xl px-6 py-14 text-center sm:px-12">
          <h2 className="mx-auto max-w-3xl font-display text-[1.75rem] sm:text-4xl">
            {title ?? (
              <>
                <span className="text-chrome">Book a collection</span>{" "}
                <span className="text-green">today</span>
              </>
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted">
            {text ??
              "Tell us the symptom and where the car is. We collect it anywhere in the UAE, diagnose it properly and send you a written quote before anything is done."}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/book" size="lg">
              Book a Pickup
            </ButtonLink>
            <ButtonLink href={telUrl()} size="lg" variant="outline">
              <Phone className="h-5 w-5" aria-hidden="true" />
              {site.phone}
            </ButtonLink>
            <ButtonLink
              href={whatsappUrl(
                whatsappMessage ??
                  `Hi ${site.name}, I'd like to book a pickup for my car.`,
              )}
              size="lg"
              variant="outline"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
