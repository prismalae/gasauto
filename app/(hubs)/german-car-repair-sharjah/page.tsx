import type { Metadata } from "next";
import { site } from "@/config/site";
import { HubTemplate } from "@/components/sections/HubTemplate";

const description =
  "German car repair in Sharjah for Mercedes-Benz, BMW, Audi, Porsche, Volkswagen and MINI. Dealer-level diagnostics, genuine parts and pickup and delivery across the UAE.";

export const metadata: Metadata = {
  title: { absolute: "German Car Repair Sharjah | Mercedes, BMW, Audi — GAS AUTO" },
  description,
  alternates: { canonical: "/german-car-repair-sharjah" },
  openGraph: {
    title: "German Car Repair Sharjah | Mercedes, BMW, Audi — GAS AUTO",
    description,
    url: `${site.domain}/german-car-repair-sharjah`,
    type: "website",
  },
};

export default function GermanCarHub() {
  return (
    <HubTemplate
      family="german"
      description={description}
      title={
        <>
          <span className="text-chrome">German Car</span>{" "}
          <span className="text-green">Repair &amp; Service</span>
          <br />
          <span className="text-2xl text-muted sm:text-3xl">in Sharjah</span>
        </>
      }
      intro="Mercedes-Benz, BMW, Audi, Porsche and Volkswagen — plus MINI, which is a British marque running BMW Group engineering. German cars reward correct diagnosis and correct fluids, and punish improvisation. We do the former and never the latter."
      serviceSlugs={[
        "computer-diagnostics",
        "engine-repair",
        "transmission-gearbox-repair",
        "car-ac-repair",
        "electrical-and-electronics",
        "oil-change-and-servicing",
      ]}
      sections={[
        {
          title: "Diagnosis before parts",
          text: "German electronic architecture is dense, and a single fault often lights several unrelated codes. Scanning every module, reading live data and running actuator tests is what separates fixing the car from replacing components until the light goes out.",
        },
        {
          title: "Coding is part of the job",
          text: "On a modern German car a replacement battery, sensor or module usually has to be coded and adapted to the vehicle before it works correctly. Parts fitted without it are one of the most common reasons a fault comes straight back.",
        },
        {
          title: "The UAE service interval",
          text: "European service schedules assume European temperatures. Sustained heat, fine dust and stop-start traffic degrade oil, filters and transmission fluid faster, so we shorten intervals rather than following the book literally.",
        },
      ]}
      faqs={[
        {
          q: "Which German brands do you service?",
          a: "Mercedes-Benz, BMW, Audi, Porsche and Volkswagen. We also handle MINI here — it is a British marque, but it is BMW Group engineering underneath, so the diagnostics, parts and service procedures are BMW's.",
        },
        {
          q: "Do you also repair Range Rover?",
          a: "Yes, and it is our core specialty — but Range Rover and Land Rover are British 4x4s, not German cars, so they have their own dedicated section of the site. Different engineering, different expertise.",
        },
        {
          q: "Do you have manufacturer-level diagnostic equipment?",
          a: "Yes. A generic OBD reader shows basic codes only. Talking to every control module, running actuator tests and coding replacement parts requires the proper system, and it is what a real diagnosis depends on.",
        },
        {
          q: "My car has been to another garage and the fault came back. Can you help?",
          a: "That is one of the most common reasons cars come to us. It usually means the original code was treated as the fault rather than as a symptom. We start the diagnosis again from scratch.",
        },
        {
          q: "Is servicing here cheaper than the dealer?",
          a: "Considerably, for the same work and equivalent parts — and we can collect the car from anywhere in the UAE, with the collection charge quoted before you commit.",
        },
      ]}
    />
  );
}
