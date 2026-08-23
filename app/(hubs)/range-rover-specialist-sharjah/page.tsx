import type { Metadata } from "next";
import { site } from "@/config/site";
import { HubTemplate } from "@/components/sections/HubTemplate";

const description =
  "Independent Jaguar Land Rover specialists in Sharjah — Range Rover, Land Rover, Defender and Jaguar. Air suspension, engine, gearbox and electrical repair with dealer-level diagnostics and UAE-wide pickup.";

export const metadata: Metadata = {
  title: { absolute: "Range Rover Specialist Sharjah | JLR Garage — GAS AUTO" },
  description,
  alternates: { canonical: "/range-rover-specialist-sharjah" },
  openGraph: {
    title: "Range Rover Specialist Sharjah | JLR Garage — GAS AUTO",
    description,
    url: `${site.domain}/range-rover-specialist-sharjah`,
    type: "website",
  },
};

export default function RangeRoverHub() {
  return (
    <HubTemplate
      family="jlr"
      description={description}
      title={
        <>
          <span className="text-chrome">Range Rover, Defender</span>{" "}
          <span className="text-green">&amp; Jaguar Specialists</span>
          <br />
          <span className="text-2xl text-muted sm:text-3xl">in Sharjah</span>
        </>
      }
      intro="GAS AUTO is an independent Range Rover specialist in Sharjah — and the whole Jaguar Land Rover family is our territory: Range Rover, Land Rover, Defender and Jaguar. They share an engineering DNA — air suspension, Ingenium and AJ engines, ZF automatics and dense electronics — and they fail in patterns we recognise. That familiarity is what keeps diagnostic time short and repair bills honest."
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
          title: "Why we only take one family of car",
          text: "A workshop that accepts anything with four wheels diagnoses everything slowly. Range Rover, Land Rover, Defender and Jaguar share platforms, engines and electronic architecture, so depth in one is depth in all four — and depth is what finds the actual fault instead of the first plausible part.",
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
          a: "No. Range Rover, Land Rover, Defender and Jaguar are all British marques under Jaguar Land Rover — and that family is all we work on. One engineering bloodline, one specialism, done properly.",
        },
        {
          q: "Which vehicles do you actually take?",
          a: "The Jaguar Land Rover family only: every Range Rover, the Land Rover Discovery line, both generations of Defender, and Jaguar from the XE to the F-Type. Specialising is the point — it is why our diagnosis is fast and our repairs stick.",
        },
        {
          q: "Can you fix an air suspension fault the same day?",
          a: "Often, yes. A single air spring is usually a same-day job. A compressor and valve block together, or a system with multiple failures, may need the car overnight. We confirm the timeline with your quote.",
        },
        {
          q: "Do you collect vehicles that will not lift or start?",
          a: "Yes. A car sitting on its bump stops is exactly what the collection service exists for. Tell us the symptom and your location when you book — we will confirm the collection charge up front and bring the right equipment.",
        },
        {
          q: "Are you cheaper than the dealer?",
          a: "Independent specialists sit well below dealer labour rates for the same work and equivalent parts. The bigger saving is usually diagnostic: we identify the specific failed component rather than replacing a whole assembly.",
        },
      ]}
    />
  );
}
