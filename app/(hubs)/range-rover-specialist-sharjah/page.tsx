import type { Metadata } from "next";
import { site } from "@/config/site";
import { HubTemplate } from "@/components/sections/HubTemplate";

const description =
  "Independent Range Rover and Land Rover specialists in Sharjah. Air suspension, engine, gearbox and electrical repair with dealer-level diagnostics and UAE-wide pickup and delivery.";

export const metadata: Metadata = {
  title: { absolute: "Range Rover Specialist Sharjah | Land Rover Garage — GAS AUTO" },
  description,
  alternates: { canonical: "/range-rover-specialist-sharjah" },
  openGraph: {
    title: "Range Rover Specialist Sharjah | Land Rover Garage — GAS AUTO",
    description,
    url: `${site.domain}/range-rover-specialist-sharjah`,
    type: "website",
  },
};

export default function RangeRoverHub() {
  return (
    <HubTemplate
      family="british-4x4"
      description={description}
      title={
        <>
          <span className="text-chrome">Range Rover &amp; Land Rover</span>{" "}
          <span className="text-green">Specialists</span>
          <br />
          <span className="text-2xl text-muted sm:text-3xl">in Sharjah</span>
        </>
      }
      intro="GAS AUTO is an independent Range Rover specialist in Sharjah, and British 4x4s are our core specialty. Range Rover and Land Rover share an engineering DNA — air suspension, ZF transmissions, supercharged and diesel V6 engines, and dense electronics — and they fail in patterns we recognise. That familiarity is what keeps diagnostic time short and repair bills honest."
      serviceSlugs={[
        "air-suspension-repair",
        "engine-repair",
        "transmission-gearbox-repair",
        "computer-diagnostics",
        "electrical-and-electronics",
        "pre-purchase-inspection",
      ]}
      sections={[
        {
          title: "Why British 4x4s get their own bay",
          text: "A Range Rover is not a German saloon with a higher roof. The air suspension architecture, the terrain response system and the electrical layout are specific to these vehicles, and the diagnostic equipment that reads them properly is specific too. Treating them as a separate discipline is the whole point.",
        },
        {
          title: "Air suspension is the headline fault",
          text: "In UAE heat the rubber air springs harden and split years earlier than they would in Europe. The compressor then overworks trying to hold the car up and fails in turn. Catching it at the spring stage rather than the compressor stage is the single biggest saving available on these cars.",
        },
        {
          title: "Dealer-level, dealer-free",
          text: "We run manufacturer-level diagnostics, fit genuine or OEM parts, and code and calibrate everything the vehicle requires afterwards — at independent labour rates, with your car collected from your door anywhere in the UAE.",
        },
      ]}
      faqs={[
        {
          q: "Is Range Rover a German car?",
          a: "No. Range Rover and Land Rover are British marques, built by Jaguar Land Rover. We are specialists in both, and separately we are experts in the German marques — Mercedes-Benz, BMW, Audi, Porsche and Volkswagen. They are genuinely different engineering, which is why we treat them as two distinct disciplines rather than one list of logos.",
        },
        {
          q: "Do you work on both Range Rover and Land Rover models?",
          a: "Yes — the full range. Range Rover Vogue, Sport, Velar and Evoque, plus Discovery, Discovery Sport, Defender and Freelander.",
        },
        {
          q: "Can you fix an air suspension fault the same day?",
          a: "Often, yes. A single air spring is usually a same-day job. A compressor and valve block together, or a system with multiple failures, may need the car overnight. We confirm the timeline with your quote.",
        },
        {
          q: "Do you collect Range Rovers that will not lift?",
          a: "Yes. A car sitting on its bump stops is exactly what the collection service exists for. Tell us the symptom and your location when you book — we will confirm the collection charge up front and bring the right equipment.",
        },
        {
          q: "Are you cheaper than the Land Rover dealer in Sharjah?",
          a: "Independent specialists sit well below dealer labour rates for the same work and equivalent parts. The bigger saving is usually diagnostic: we identify the specific failed component rather than replacing a whole assembly.",
        },
      ]}
    />
  );
}
