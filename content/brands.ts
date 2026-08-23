/**
 * Brand data for the four marque pages.
 *
 * The lineup is the Jaguar Land Rover family and nothing else: Range Rover,
 * Land Rover, Defender and Jaguar. One engineering family — shared Ingenium
 * and AJ engines, ZF automatics, air suspension architecture and dense
 * electronics — which is exactly why specialising in it works.
 *
 * Every component reads brands through brandsByFamily() in lib/utils.ts, and
 * scripts/check-families.mjs fails the build if any non-JLR marque leaks back
 * into the rendered site.
 */

export type Family = "jlr";

export type FamilyMeta = {
  id: Family;
  label: string;
  short: string;
  badge: string;
  hubSlug: string;
  hubTitle: string;
  blurb: string;
};

export const FAMILIES: Record<Family, FamilyMeta> = {
  jlr: {
    id: "jlr",
    label: "Jaguar Land Rover Specialists",
    short: "JLR",
    badge: "BRITISH",
    hubSlug: "range-rover-specialist-sharjah",
    hubTitle: "Jaguar Land Rover Specialist",
    blurb:
      "Range Rover, Land Rover, Defender and Jaguar share an engineering DNA — air suspension, Ingenium and AJ engines, ZF automatics and dense electronics. One specialism covers all four, and it is the only work we take.",
  },
};

export const FAMILY_ORDER: Family[] = ["jlr"];

export type Brand = {
  slug: string;
  name: string;
  family: Family;
  manufacturer: string;
  /** Shown on the marque page when provenance needs a note. */
  originNote?: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  /** Genuinely marque-specific — this is the content that earns the ranking. */
  commonFaults: { title: string; body: string }[];
  models: string[];
  relatedServices: string[];
  faqs: { q: string; a: string }[];
};

export const brands: Brand[] = [
  {
    slug: "range-rover-repair-sharjah",
    name: "Range Rover",
    family: "jlr",
    manufacturer: "Land Rover",
    metaTitle:
      "Range Rover Repair Sharjah | Specialists & Pickup — GAS AUTO",
    metaDescription:
      "Independent Range Rover specialists in Sharjah. Air suspension, engine, gearbox and electrical repair with dealer-level diagnostics, genuine parts and UAE-wide pickup and delivery.",
    h1: "Range Rover Repair & Service in Sharjah",
    intro:
      "GAS AUTO is an independent Range Rover repair workshop in Sharjah — and the Range Rover is the vehicle we know best. Years of working on Vogue, Sport, Velar and Evoque models in UAE conditions means we recognise most faults from the symptom and the fault code before the car is on the ramp — and we carry the diagnostic equipment to prove it rather than guess at parts.",
    models: [
      "Range Rover Vogue",
      "Range Rover Sport",
      "Range Rover Velar",
      "Range Rover Evoque",
      "Range Rover Autobiography",
    ],
    commonFaults: [
      {
        title: "Air suspension failure",
        body: "The single most common Range Rover fault in the UAE. Heat cycles harden the air springs until they split, the compressor then runs constantly to compensate and burns itself out. Symptoms are a car sitting low overnight, a 'Suspension Fault' message, or a ride height that will not rise. We replace springs, compressors, valve blocks and height sensors and recalibrate the ride height properly afterwards.",
      },
      {
        title: "Supercharger and cooling issues",
        body: "Supercharged 3.0 V6 and 5.0 V8 engines run hot in Gulf ambient temperatures. Water pump failure, coolant crossover pipe leaks and supercharger intercooler pump faults all show up as overheating or coolant loss long before a warning light does.",
      },
      {
        title: "ZF 8-speed gearbox faults",
        body: "Harsh shifting, a jolt into drive, or 'Transmission Fault — Limited Performance'. Often mechatronic sleeve leaks or long-overdue fluid, not a failed gearbox. We diagnose before recommending anything expensive.",
      },
      {
        title: "Electrical and module faults",
        body: "Parasitic battery drain, modules dropping off the CAN bus, infotainment resets and phantom warning lights. These need a systematic diagnostic approach rather than parts swapping.",
      },
      {
        title: "Oil leaks and timing chain wear",
        body: "Rocker cover, timing cover and sump gasket leaks are common at higher mileage, and a rattle on cold start usually points to timing chain tensioner wear on the V6 diesel and petrol units.",
      },
    ],
    relatedServices: [
      "air-suspension-repair",
      "engine-repair",
      "transmission-gearbox-repair",
      "computer-diagnostics",
    ],
    faqs: [
      {
        q: "How much does Range Rover air suspension repair cost in Sharjah?",
        a: "It depends on which components have failed — a single air spring is a very different job from a compressor and valve block together. We diagnose first and give you a written quote before any work starts, so you can compare it against a dealer price with no obligation.",
      },
      {
        q: "Do you use genuine Range Rover parts?",
        a: "We use genuine or OEM-equivalent parts as standard, and we will tell you clearly which is being fitted and why. Where a quality aftermarket option genuinely performs as well for less, we offer it as a choice rather than substituting it quietly.",
      },
      {
        q: "Can you collect my Range Rover if it will not lift or drive?",
        a: "Yes. Our pickup and delivery service covers the whole UAE, and a car sitting on its bump stops with a suspension fault is exactly the case it exists for. Tell us the symptom and your location when you book — we will confirm the collection charge up front and send the right vehicle.",
      },
      {
        q: "Are you cheaper than the Land Rover dealer?",
        a: "Independent specialists are typically well below dealer labour rates for the same work and the same parts quality. The bigger difference is that we diagnose the actual fault rather than replacing assemblies, which is where most of the saving comes from.",
      },
    ],
  },
  {
    slug: "land-rover-repair-sharjah",
    name: "Land Rover",
    family: "jlr",
    manufacturer: "Land Rover",
    metaTitle:
      "Land Rover Repair Sharjah | Discovery Specialists — GAS AUTO",
    metaDescription:
      "Land Rover repair and servicing in Sharjah for Discovery, Discovery Sport and Freelander. Specialist diagnostics, air suspension, engine and gearbox work with UAE-wide pickup and delivery.",
    h1: "Land Rover Repair & Service in Sharjah",
    intro:
      "Land Rover repair in Sharjah for Discovery, Discovery Sport and Freelander. They share much of their engineering with the Range Rover line — and its weak points too. We treat them as what they are: capable vehicles that need proper diagnosis rather than a parts cannon, and we keep the common failure items on the shelf.",
    models: [
      "Discovery",
      "Discovery Sport",
      "Discovery 4",
      "Discovery 3",
      "Freelander",
    ],
    commonFaults: [
      {
        title: "Air suspension and self-levelling faults",
        body: "Discovery models use the same air suspension architecture as the Range Rover and fail the same way in UAE heat — split air springs, an overworked compressor and a car that sinks overnight.",
      },
      {
        title: "Diesel injector and EGR problems",
        body: "The TDV6 is a strong engine but injector seals, EGR valves and turbo actuators are known wear items. Rough running, black smoke and limp mode usually trace back to one of them.",
      },
      {
        title: "Overheating and coolant loss",
        body: "Water pumps, thermostat housings and radiator failures are common at UAE ambient temperatures. Catching a coolant leak early is the difference between a hose and a cylinder head.",
      },
      {
        title: "Transfer box and differential wear",
        body: "Vehicles actually used off-road or on desert runs need transfer box and differential oil changes far more often than the standard schedule suggests.",
      },
    ],
    relatedServices: [
      "air-suspension-repair",
      "engine-repair",
      "computer-diagnostics",
      "brakes-and-suspension",
    ],
    faqs: [
      {
        q: "Do you repair the Defender as well?",
        a: "Yes — the Defender is one of our four core marques and has its own dedicated page. Both the current L663 and the classic Defender come through the workshop regularly.",
      },
      {
        q: "My Discovery overheats in traffic. Is that normal in UAE summer?",
        a: "No. A healthy cooling system copes with Sharjah summer traffic. Overheating means a fault — usually the water pump, thermostat, radiator or a cooling fan — and it is worth stopping and booking a collection rather than driving on.",
      },
      {
        q: "Can you service my Land Rover without voiding the warranty?",
        a: "If the vehicle is still under manufacturer warranty, we will tell you honestly when a job is better handled under that warranty. For out-of-warranty vehicles, independent servicing to schedule with correct parts is the standard route.",
      },
    ],
  },
  {
    slug: "defender-repair-sharjah",
    name: "Defender",
    family: "jlr",
    manufacturer: "Land Rover",
    metaTitle: "Defender Repair Sharjah | New & Classic Defender — GAS AUTO",
    metaDescription:
      "Defender repair and servicing in Sharjah — the current 90, 110 and 130 and the classic Defender. Air suspension, cooling, electrical and off-road driveline work with UAE-wide pickup.",
    h1: "Defender Repair & Service in Sharjah",
    intro:
      "Defender repair in Sharjah for both generations of an icon: the current 90, 110 and 130, and the classic Defender that preceded them. They are very different vehicles underneath — one runs air suspension and dense electronics, the other rewards honest mechanical work — and we treat each on its own terms.",
    models: [
      "Defender 90",
      "Defender 110",
      "Defender 130",
      "Defender V8",
      "Classic Defender",
    ],
    commonFaults: [
      {
        title: "Air suspension faults on the 110 and 130",
        body: "The current Defender shares the corner air suspension architecture of the wider range, and UAE heat ages its air springs the same way — a vehicle sitting low overnight or refusing to reach off-road height is the usual first sign.",
      },
      {
        title: "Cooling system under desert load",
        body: "D250 and D300 diesels and the P400 petrol all work hard in Gulf temperatures, and harder still off-road. Water pumps, thermostats and coolant leaks need catching early — an overheated modern engine is an expensive one.",
      },
      {
        title: "Electrical and infotainment glitches",
        body: "Pivi Pro freezes, camera dropouts, phantom warnings and battery drain are common complaints on the L663. Most trace to software levels or a module that is not sleeping, and they need diagnosis rather than guesswork.",
      },
      {
        title: "Driveline wear from real off-road use",
        body: "Defenders in the UAE actually get used. Desert driving accelerates wear in differentials, the transfer box and suspension bushes, and drops the sensible oil-change interval well below the book figure.",
      },
      {
        title: "Classic Defender care",
        body: "Older Defenders need a different discipline: leaks, corrosion points, bushes, and parts that are increasingly worth refurbishing rather than replacing. We quote those jobs honestly — including when originality is worth preserving.",
      },
    ],
    relatedServices: [
      "air-suspension-repair",
      "engine-repair",
      "oil-change-and-servicing",
      "computer-diagnostics",
    ],
    faqs: [
      {
        q: "Do you work on the classic Defender or only the new one?",
        a: "Both. The current L663 and the classic Defender are different vehicles needing different skills, and we service and repair each — from Pivi Pro diagnostics on one to carburettor-era honesty on the other.",
      },
      {
        q: "I take my Defender into the desert. How often should it be serviced?",
        a: "More often than the book says. Sand, heat and sustained load degrade oils and filters quickly — for a Defender that sees regular desert use we recommend shortening engine and driveline intervals significantly, and checking diffs and the transfer box at every visit.",
      },
      {
        q: "Can you collect a Defender from outside Sharjah?",
        a: "Yes — pickup and delivery covers the whole UAE. Tell us where the vehicle is and we will confirm the collection charge before anything is arranged.",
      },
    ],
  },
  {
    slug: "jaguar-repair-sharjah",
    name: "Jaguar",
    family: "jlr",
    manufacturer: "Jaguar",
    metaTitle: "Jaguar Repair Sharjah | F-Pace, XF & F-Type — GAS AUTO",
    metaDescription:
      "Jaguar repair and servicing in Sharjah for F-Pace, E-Pace, XE, XF, XJ and F-Type. Timing chains, cooling, ZF gearbox and electrical diagnostics with UAE-wide pickup and delivery.",
    h1: "Jaguar Repair & Service in Sharjah",
    intro:
      "Jaguar repair in Sharjah, from an F-Pace daily driver to an F-Type kept for weekends. Jaguar shares its engines, gearboxes and electronics with the Land Rover side of the family — the same AJ V6 and V8 units, the same Ingenium engines, the same ZF automatic — so the specialist knowledge transfers directly, and so does our diagnostic tooling.",
    models: ["F-Pace", "E-Pace", "XE", "XF", "XJ", "F-Type"],
    commonFaults: [
      {
        title: "Timing chain and tensioner wear",
        body: "A rattle on cold start on the AJ V6 and V8 engines, and chain stretch on early Ingenium diesels, are both well documented. Caught early it is a chain and tensioner job; ignored, it takes the engine with it.",
      },
      {
        title: "Cooling system plastics and supercharger pump",
        body: "Thermostat housings, coolant pipes and the supercharger circulation pump age fast in Gulf heat. Coolant loss with no visible puddle is the classic presentation, and it is never safe to ignore on these engines.",
      },
      {
        title: "ZF 8-speed gearbox service",
        body: "The same ZF automatic as the rest of the family, with the same truth: 'sealed for life' fluid does not survive UAE traffic. Harsh or flaring shifts usually mean overdue fluid or a mechatronic fault, not a dead gearbox.",
      },
      {
        title: "Electrical drain and InControl faults",
        body: "Flat batteries after a few days parked, InControl and infotainment glitches, and phantom alarms are frequent Jaguar complaints — and almost always diagnosable to a specific module rather than a mystery.",
      },
      {
        title: "Suspension bushes and brake wear",
        body: "Jaguars are sprung firm and driven quickly. Control arm bushes, shock absorbers and discs wear accordingly, and UAE road speeds bring that forward — we measure rather than guess.",
      },
    ],
    relatedServices: [
      "engine-repair",
      "transmission-gearbox-repair",
      "computer-diagnostics",
      "brakes-and-suspension",
    ],
    faqs: [
      {
        q: "Do Jaguars really share parts with Land Rover?",
        a: "A great deal, yes — engines, gearboxes, electronics architecture and more were developed together under Jaguar Land Rover. It is why a workshop that lives inside this family diagnoses a Jaguar faster than a general garage ever will.",
      },
      {
        q: "Do you work on the F-Type?",
        a: "Yes, including the supercharged V6 and V8 cars. Performance Jaguars get the same rule as everything else here: correct parts, correct fluids, correct procedure.",
      },
      {
        q: "My Jaguar's battery keeps going flat. Is that normal?",
        a: "No — it is usually a module that is not sleeping or a battery that was replaced without being registered. Both are diagnosable, and another new battery on its own will not fix it.",
      },
    ],
  },
];

export const brandSlugs = brands.map((b) => b.slug);

export function getBrand(slug: string) {
  return brands.find((b) => b.slug === slug);
}
