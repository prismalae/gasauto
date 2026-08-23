/**
 * Service data for the nine service pages plus the /services hub.
 *
 * `appliesTo` lists brand slugs. Service pages render those links grouped under
 * the two family headings, so the British/German split is reinforced even on
 * pages that are not about a specific marque.
 */

export type Service = {
  slug: string;
  name: string;
  /** Short label for cards and grids. */
  short: string;
  icon: IconKey;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  /** Marks the two pages that carry the heaviest search intent in the UAE. */
  featured?: boolean;
  symptoms: string[];
  includes: string[];
  body: { title: string; text: string }[];
  appliesTo: string[];
  faqs: { q: string; a: string }[];
};

export type IconKey =
  | "suspension"
  | "engine"
  | "gearbox"
  | "ac"
  | "diagnostics"
  | "electrical"
  | "brakes"
  | "oil"
  | "inspection";

export const services: Service[] = [
  {
    slug: "air-suspension-repair",
    name: "Air Suspension Repair",
    short: "Air Suspension",
    icon: "suspension",
    featured: true,
    metaTitle:
      "Air Suspension Repair Sharjah | Range Rover Experts — GAS AUTO",
    metaDescription:
      "Air suspension repair in Sharjah for Range Rover, Land Rover, Mercedes AIRMATIC, Audi Q7 and Porsche Cayenne. Air springs, compressors, valve blocks and ride height calibration.",
    h1: "Air Suspension Repair in Sharjah",
    intro:
      "Air suspension repair is the job this Sharjah workshop does more than any other — it is the most common expensive fault on the vehicles we specialise in, and UAE heat is the reason. Rubber air springs harden and split, the compressor runs constantly trying to compensate, and then it fails too. Catching it at the spring stage costs a fraction of catching it after the compressor has burned out.",
    symptoms: [
      "Car sits low on one corner or at the rear overnight",
      "\"Suspension Fault\" or \"Vehicle rising\" message on the dash",
      "Compressor audibly running for long periods",
      "Ride height will not change between settings",
      "Harsh, crashing ride quality",
    ],
    includes: [
      "Full air suspension system diagnostic scan",
      "Leak testing of springs, lines and valve block",
      "Air spring, compressor and valve block replacement",
      "Height sensor replacement and calibration",
      "Ride height reset and road test",
    ],
    body: [
      {
        title: "Why it fails faster here",
        text: "An air spring is rubber holding pressurised air. Sustained 45°C ambient temperatures and hot tarmac accelerate the hardening of that rubber, so springs that might last a decade in Europe commonly fail in half that time in the UAE. It is not a defect so much as a climate consequence — which is why it is worth inspecting proactively rather than waiting for the warning.",
      },
      {
        title: "Diagnose before replacing",
        text: "A suspension fault message does not tell you which component failed. We pressure-test the system to find the actual leak rather than replacing the whole assembly, and we check the compressor's duty cycle to establish whether it has been damaged by a leak elsewhere. That distinction is usually the difference between a moderate bill and a very large one.",
      },
      {
        title: "Calibration matters",
        text: "After any air suspension work the ride height has to be recalibrated to factory specification with diagnostic equipment. Skipping it leaves the car sitting wrong, wearing tyres unevenly and re-triggering faults.",
      },
    ],
    appliesTo: [
      "range-rover-repair-sharjah",
      "land-rover-repair-sharjah",
      "mercedes-benz-repair-sharjah",
      "audi-repair-sharjah",
      "porsche-repair-sharjah",
    ],
    faqs: [
      {
        q: "Can I keep driving with an air suspension fault?",
        a: "It is not advisable. A car on its bump stops has no suspension travel, which damages other components and makes handling unpredictable. Book a collection instead of driving it in.",
      },
      {
        q: "Should I convert to coil springs instead?",
        a: "Conversion kits exist and are cheaper up front, but they change the ride and handling significantly and can trigger permanent dash warnings. On a premium vehicle we generally recommend repairing the system properly, and we will give you an honest comparison for your specific car.",
      },
      {
        q: "How long does air suspension repair take?",
        a: "A single air spring is usually a same-day job. A compressor and valve block together, or a system with multiple failures, may need the car overnight. We confirm the timeline with the quote.",
      },
    ],
  },
  {
    slug: "car-ac-repair",
    name: "Car AC Repair",
    short: "AC & Cooling",
    icon: "ac",
    featured: true,
    metaTitle: "Car AC Repair Sharjah | Auto Air Conditioning Service — GAS AUTO",
    metaDescription:
      "Car AC repair and gas refill in Sharjah. Compressor, condenser, evaporator and blower diagnostics for Range Rover, Mercedes, BMW, Audi and more. UAE-wide pickup and delivery.",
    h1: "Car AC Repair & Servicing in Sharjah",
    intro:
      "Car AC repair in Sharjah is not a comfort call-out — a weak air conditioner is the reason a car cannot be used here. We pressure-test the system properly rather than topping up gas and hoping, because a system that needs regassing has a leak by definition.",
    symptoms: [
      "Air cools at speed but goes warm in traffic",
      "AC blows warm after twenty minutes of driving",
      "Weak airflow from the vents",
      "Musty smell when the AC starts",
      "Loud noise or rattle when the AC engages",
    ],
    includes: [
      "Full system pressure and leak test",
      "Compressor, condenser and expansion valve diagnosis",
      "Evaporator and cabin filter service",
      "Cooling fan and radiator airflow check",
      "Refrigerant evacuation, vacuum and precise refill",
    ],
    body: [
      {
        title: "A regas is not a repair",
        text: "Refrigerant is in a sealed system. If it is low, it leaked. Simply refilling means you are back in the same position within months and the compressor has been running under-lubricated in the meantime. We find the leak first.",
      },
      {
        title: "Cold at speed, warm in traffic",
        text: "This specific symptom almost always means airflow across the condenser, not the AC system itself — usually a failed cooling fan or a condenser packed with dust and sand. It is one of the cheaper faults to fix and one of the most commonly misdiagnosed.",
      },
      {
        title: "Before summer, not during it",
        text: "The best time to have the AC checked is before the heat arrives. A system that was merely adequate in March will be inadequate in July.",
      },
    ],
    appliesTo: [
      "range-rover-repair-sharjah",
      "land-rover-repair-sharjah",
      "mercedes-benz-repair-sharjah",
      "bmw-repair-sharjah",
      "audi-repair-sharjah",
      "volkswagen-repair-sharjah",
      "mini-cooper-repair-sharjah",
    ],
    faqs: [
      {
        q: "How much does a car AC gas refill cost in Sharjah?",
        a: "A refill on its own is inexpensive, but we will not sell you one without checking why the gas went missing. The diagnosis is what determines the real cost, and we quote before any work.",
      },
      {
        q: "Why does my AC smell bad when I turn it on?",
        a: "Moisture and bacteria in the evaporator housing, usually combined with a cabin filter overdue for replacement. Both are straightforward to put right.",
      },
    ],
  },
  {
    slug: "engine-repair",
    name: "Engine Repair & Overhaul",
    short: "Engine Repair",
    icon: "engine",
    metaTitle: "Engine Repair Sharjah | German & Range Rover Engines — GAS AUTO",
    metaDescription:
      "Engine repair and overhaul in Sharjah for Range Rover, BMW, Mercedes, Audi, Porsche and VW. Overheating, oil leaks, timing chains, misfires and full rebuilds.",
    h1: "Engine Repair & Overhaul in Sharjah",
    intro:
      "Engine repair in Sharjah, from an oil leak to a full rebuild. Most catastrophic engine damage we see started as a small cooling or lubrication fault that was driven on for a few weeks — so the most valuable thing we do is catch it early and tell you plainly.",
    symptoms: [
      "Overheating or coolant loss with no visible leak",
      "Rattle on cold start",
      "Misfire, rough idle or flashing engine light",
      "Burning oil smell after driving",
      "Loss of power or limp mode",
      "Excessive oil consumption between services",
    ],
    includes: [
      "Diagnostic scan and live data analysis",
      "Compression and leak-down testing",
      "Timing chain, tensioner and guide replacement",
      "Gasket, seal and cooling system repair",
      "Carbon cleaning and walnut blasting",
      "Full engine overhaul and rebuild",
    ],
    body: [
      {
        title: "Overheating is an emergency",
        text: "A modern aluminium engine tolerates overheating very poorly. Warped heads and failed gaskets follow quickly, and the repair cost multiplies. If the temperature gauge climbs, stop and call us for a collection — it is genuinely cheaper than continuing the journey.",
      },
      {
        title: "Diagnosis before disassembly",
        text: "We establish what is wrong with compression testing, leak-down testing and live data before opening an engine. Exploratory disassembly is expensive and often unnecessary.",
      },
      {
        title: "Rebuild or replace",
        text: "For some engines a rebuild is the right answer and for others a good used or reconditioned unit makes far more financial sense. We give you the honest comparison including what each option is likely to cost over the next few years.",
      },
    ],
    appliesTo: [
      "range-rover-repair-sharjah",
      "land-rover-repair-sharjah",
      "bmw-repair-sharjah",
      "mercedes-benz-repair-sharjah",
      "audi-repair-sharjah",
      "porsche-repair-sharjah",
      "volkswagen-repair-sharjah",
      "mini-cooper-repair-sharjah",
    ],
    faqs: [
      {
        q: "Is an engine rebuild worth it on an older car?",
        a: "Sometimes. It depends on the rest of the car's condition and what you plan to do with it. We will tell you when the honest answer is that the money is better spent elsewhere.",
      },
      {
        q: "What does a rattle on cold start mean?",
        a: "Usually timing chain or tensioner wear, which on several BMW, MINI and Audi engines is a known issue and progressively damaging. It should be diagnosed immediately.",
      },
    ],
  },
  {
    slug: "transmission-gearbox-repair",
    name: "Transmission & Gearbox Repair",
    short: "Transmission",
    icon: "gearbox",
    metaTitle:
      "Gearbox & Transmission Repair Sharjah | ZF, DSG, PDK — GAS AUTO",
    metaDescription:
      "Automatic transmission and gearbox repair in Sharjah. ZF 8-speed, DSG, S tronic and PDK service, mechatronic repair, fluid changes and harsh shifting diagnosis.",
    h1: "Transmission & Gearbox Repair in Sharjah",
    intro:
      "Gearbox and transmission repair in Sharjah for the ZF, DSG and PDK units we see most. Harsh shifting rarely means a dead gearbox — the cause is usually overdue fluid, a mechatronic fault or an adaptation issue, all far cheaper to fix than the replacement people fear.",
    symptoms: [
      "Jolt or clunk when selecting drive or reverse",
      "Harsh, delayed or flaring gear changes",
      "Judder at low speed",
      "\"Transmission Fault — Limited Performance\" warning",
      "Fluid leak beneath the vehicle",
    ],
    includes: [
      "Transmission diagnostic scan and live data",
      "Fluid and filter service with correct specification fluid",
      "Mechatronic unit repair and sleeve replacement",
      "Clutch pack and torque converter diagnosis",
      "Adaptation reset and road test",
    ],
    body: [
      {
        title: "\"Sealed for life\" is a marketing term",
        text: "Many manufacturers describe automatic transmission fluid as lifetime fill. In UAE heat and traffic that is optimistic. A fluid and filter service at sensible intervals is one of the highest-value preventative jobs on the car.",
      },
      {
        title: "Correct fluid, not universal fluid",
        text: "ZF, DSG and PDK units each require a specific fluid. Universal ATF causes shift quality problems and long-term damage, and it is a common shortcut in cheaper workshops.",
      },
      {
        title: "Adaptation after service",
        text: "Modern transmissions learn. After a fluid service or repair the adaptations must be reset and relearned properly, or the shift quality will not be right.",
      },
    ],
    appliesTo: [
      "range-rover-repair-sharjah",
      "mercedes-benz-repair-sharjah",
      "bmw-repair-sharjah",
      "audi-repair-sharjah",
      "porsche-repair-sharjah",
      "volkswagen-repair-sharjah",
    ],
    faqs: [
      {
        q: "How often should automatic transmission fluid be changed?",
        a: "For most of the vehicles we see, every 60,000–80,000 km, and sooner for wet-clutch DSG units or cars used in heavy traffic. It is well worth doing regardless of what the service book says.",
      },
      {
        q: "My gearbox judders in traffic. Is it finished?",
        a: "Usually not. Low-speed judder is most often fluid or mechatronic related. We diagnose before recommending anything major.",
      },
    ],
  },
  {
    slug: "computer-diagnostics",
    name: "Computer Diagnostics",
    short: "Diagnostics",
    icon: "diagnostics",
    metaTitle:
      "Car Diagnostics Sharjah | Dealer-Level Scanning — GAS AUTO",
    metaDescription:
      "Dealer-level computer diagnostics in Sharjah for Range Rover, Mercedes, BMW, Audi and Porsche. Full module scanning, live data, actuator tests and module coding.",
    h1: "Car Computer Diagnostics in Sharjah",
    intro:
      "Proper car diagnostics in Sharjah means more than reading a code. A generic reader tells you a sensor reported a value out of range — not why. We scan every module, read live data, run actuator tests and interpret the result, which is the difference between fixing a car and replacing parts until the light goes out.",
    symptoms: [
      "Warning light with no obvious symptom",
      "Intermittent fault another workshop could not find",
      "Repeat battery drain",
      "Module or sensor replaced but fault returned",
      "Car needs coding after a part replacement",
    ],
    includes: [
      "Full vehicle scan of every control module",
      "Live data and freeze-frame analysis",
      "Actuator and component testing",
      "Wiring and circuit testing where required",
      "Module coding, programming and adaptation",
      "Written report of findings",
    ],
    body: [
      {
        title: "Scanning every module, not just the engine",
        text: "Faults propagate. An engine warning can originate in a body control module or a failing CAN bus connection, and a scan limited to the powertrain will miss it entirely.",
      },
      {
        title: "Coding replacement parts",
        text: "On modern premium vehicles a new battery, sensor or module usually needs coding to the car before it functions correctly. Parts fitted without coding are a common cause of a fault that will not clear.",
      },
      {
        title: "A written answer",
        text: "You get a report explaining what was found, what it means and what it will cost to put right — including the option of doing nothing, where that is reasonable.",
      },
    ],
    appliesTo: [
      "range-rover-repair-sharjah",
      "land-rover-repair-sharjah",
      "mercedes-benz-repair-sharjah",
      "bmw-repair-sharjah",
      "audi-repair-sharjah",
      "porsche-repair-sharjah",
      "volkswagen-repair-sharjah",
      "mini-cooper-repair-sharjah",
    ],
    faqs: [
      {
        q: "Another garage replaced a sensor and the light came back. Can you help?",
        a: "That is one of the most common reasons cars come to us. It usually means the original code was treated as the fault rather than as a symptom. We start the diagnosis again from scratch.",
      },
      {
        q: "Do you charge for diagnostics?",
        a: "Yes — proper diagnosis takes time and equipment, and it is the part that saves you money on parts. Where you go ahead with the repair, we discuss how the diagnostic time is handled up front.",
      },
    ],
  },
  {
    slug: "electrical-and-electronics",
    name: "Electrical & Electronics",
    short: "Electrical",
    icon: "electrical",
    metaTitle: "Auto Electrical Repair Sharjah | Battery Drain — GAS AUTO",
    metaDescription:
      "Auto electrical repair in Sharjah. Battery drain, alternator, starter, wiring faults, module failures and infotainment problems on Range Rover and German cars.",
    h1: "Auto Electrical & Electronics Repair in Sharjah",
    intro:
      "Auto electrical repair in Sharjah is where guesswork gets expensive fastest. We trace circuits properly — measuring current draw, testing grounds and following wiring diagrams — instead of replacing components in sequence and hoping.",
    symptoms: [
      "Battery flat after the car sits for a day or two",
      "Multiple unrelated warning lights",
      "Windows, locks or lights working intermittently",
      "Infotainment restarting or freezing",
      "Car will not start but has a good battery",
    ],
    includes: [
      "Parasitic drain testing",
      "Battery, alternator and starter testing",
      "Wiring, ground and connector repair",
      "Control module diagnosis and replacement",
      "Battery registration and coding",
      "Lighting and comfort system repair",
    ],
    body: [
      {
        title: "Finding parasitic drain",
        text: "A drain is found by measuring current with the car asleep and pulling fuses systematically until the draw drops. It takes patience, and it is the only reliable method. Replacing the battery again is not a fix.",
      },
      {
        title: "Heat and corrosion",
        text: "UAE humidity near the coast plus sustained heat degrades connectors and grounds. A surprising proportion of intermittent electrical faults are a corroded ground point rather than a failed component.",
      },
    ],
    appliesTo: [
      "range-rover-repair-sharjah",
      "land-rover-repair-sharjah",
      "mercedes-benz-repair-sharjah",
      "bmw-repair-sharjah",
      "audi-repair-sharjah",
      "mini-cooper-repair-sharjah",
    ],
    faqs: [
      {
        q: "I keep replacing the battery and it keeps dying. Why?",
        a: "Almost certainly a parasitic drain from a module that is not going to sleep, or a battery that was never registered to the car. Both are diagnosable — another battery will not solve it.",
      },
    ],
  },
  {
    slug: "brakes-and-suspension",
    name: "Brakes & Suspension",
    short: "Brakes & Suspension",
    icon: "brakes",
    metaTitle: "Brake & Suspension Repair Sharjah | Discs & Pads — GAS AUTO",
    metaDescription:
      "Brake and suspension repair in Sharjah. Discs, pads, calipers, shocks, bushes, arms and wheel alignment for Range Rover and German cars. UAE-wide pickup and delivery.",
    h1: "Brake & Suspension Repair in Sharjah",
    intro:
      "Brake and suspension repair in Sharjah for heavy premium vehicles — which are hard on brakes and bushes, on roads and at speeds that do not help. We measure rather than estimate, so you replace components when they actually need it.",
    symptoms: [
      "Squealing, grinding or vibration when braking",
      "Longer stopping distance or a soft pedal",
      "Knocking or clunking over bumps",
      "Uneven tyre wear",
      "Steering pulling to one side",
    ],
    includes: [
      "Disc and pad measurement and replacement",
      "Caliper overhaul and brake fluid service",
      "Shock absorber and strut replacement",
      "Control arm, bush and ball joint replacement",
      "Wheel alignment and road test",
    ],
    body: [
      {
        title: "Measured, not guessed",
        text: "Discs have a minimum thickness stamped on them and pads have a measurable remaining depth. We record the numbers and show you, so replacement is a decision based on evidence.",
      },
      {
        title: "Brake fluid absorbs water",
        text: "Brake fluid is hygroscopic, and in humid coastal conditions it takes up moisture faster. Old fluid lowers the boiling point and makes the pedal soft under repeated heavy braking — it is a cheap service with a real safety benefit.",
      },
    ],
    appliesTo: [
      "range-rover-repair-sharjah",
      "land-rover-repair-sharjah",
      "porsche-repair-sharjah",
      "bmw-repair-sharjah",
      "mercedes-benz-repair-sharjah",
    ],
    faqs: [
      {
        q: "How often should brake fluid be changed?",
        a: "Every two years for most vehicles, and we would not stretch that in the UAE climate.",
      },
    ],
  },
  {
    slug: "oil-change-and-servicing",
    name: "Oil Change & Periodic Servicing",
    short: "Oil & Servicing",
    icon: "oil",
    metaTitle:
      "Car Oil Change Sharjah | Periodic Servicing — GAS AUTO",
    metaDescription:
      "Oil change and periodic servicing in Sharjah with genuine filters and correct specification oil for Range Rover, Mercedes, BMW, Audi, Porsche and VW. UAE-wide pickup and delivery.",
    h1: "Oil Change & Periodic Servicing in Sharjah",
    intro:
      "Car servicing and oil change in Sharjah, done properly: servicing is where you either prevent the expensive faults or create them. We use the oil specification the manufacturer requires — not a universal grade — and we shorten intervals to suit UAE conditions rather than following a European schedule literally.",
    symptoms: [
      "Service due message on the dash",
      "Oil overdue or unknown service history",
      "Recently purchased car needing a baseline service",
      "Oil level dropping between services",
    ],
    includes: [
      "Engine oil and genuine oil filter",
      "Air, cabin and fuel filter replacement",
      "Full fluid level and condition check",
      "Multi-point inspection with written report",
      "Service light reset and stamped record",
    ],
    body: [
      {
        title: "Why UAE intervals should be shorter",
        text: "Manufacturer intervals assume moderate temperatures and steady driving. Sustained heat, fine dust and short stop-start journeys all degrade oil and clog filters faster. Shortening the interval is inexpensive insurance on an engine that is not.",
      },
      {
        title: "Correct specification oil",
        text: "Modern engines specify an exact oil approval, not just a viscosity. Using the wrong approval affects timing chain wear, emissions components and warranty position. We use what the manufacturer lists.",
      },
      {
        title: "The inspection is the point",
        text: "The oil change is routine; the value is in the technician who has the car on a ramp noticing the developing leak, the perished bush or the disc approaching its minimum. You get that in writing.",
      },
    ],
    appliesTo: [
      "range-rover-repair-sharjah",
      "land-rover-repair-sharjah",
      "mercedes-benz-repair-sharjah",
      "bmw-repair-sharjah",
      "audi-repair-sharjah",
      "porsche-repair-sharjah",
      "volkswagen-repair-sharjah",
      "mini-cooper-repair-sharjah",
    ],
    faqs: [
      {
        q: "How often should I change my oil in the UAE?",
        a: "For most of the vehicles we service, every 8,000–10,000 km rather than the 15,000–20,000 km some schedules allow. Heat and dust are the reason.",
      },
      {
        q: "Will servicing with you affect my warranty?",
        a: "For a vehicle out of manufacturer warranty, no. While still under warranty, we will advise you honestly on what is better done under it.",
      },
    ],
  },
  {
    slug: "pre-purchase-inspection",
    name: "Pre-Purchase Inspection",
    short: "Pre-Purchase Check",
    icon: "inspection",
    metaTitle:
      "Pre-Purchase Car Inspection Sharjah — GAS AUTO",
    metaDescription:
      "Independent pre-purchase car inspection in Sharjah. Full diagnostic scan, mechanical and body check on used Range Rover, Mercedes, BMW, Audi and Porsche before you buy.",
    h1: "Pre-Purchase Inspection in Sharjah",
    intro:
      "A pre-purchase car inspection in Sharjah is the cheapest hour you will ever spend on a used premium car. We inspect the vehicle you are considering, scan every module for stored and pending faults, and give you a written report — so you negotiate with facts or walk away before it becomes your problem.",
    symptoms: [
      "Buying a used Range Rover or German car privately",
      "Seller has limited or missing service history",
      "Car has been recently \"cleared\" of warning lights",
      "You want leverage on price",
    ],
    includes: [
      "Full multi-module diagnostic scan including pending codes",
      "Engine, gearbox and cooling system assessment",
      "Air suspension test through all height settings",
      "Brake, tyre and suspension measurement",
      "Body, paint and accident-damage check",
      "Road test and written report with photographs",
    ],
    body: [
      {
        title: "Cleared codes still leave traces",
        text: "A seller can clear warning lights, but readiness monitors and pending codes reveal that it was done recently. That single check has saved buyers a great deal of money.",
      },
      {
        title: "Test the air suspension deliberately",
        text: "On any air-sprung vehicle we cycle the suspension through every height setting and monitor compressor duty. A system that works when warm can still be on the way out.",
      },
    ],
    appliesTo: [
      "range-rover-repair-sharjah",
      "land-rover-repair-sharjah",
      "mercedes-benz-repair-sharjah",
      "bmw-repair-sharjah",
      "audi-repair-sharjah",
      "porsche-repair-sharjah",
      "volkswagen-repair-sharjah",
      "mini-cooper-repair-sharjah",
    ],
    faqs: [
      {
        q: "Can you inspect a car at the seller's location?",
        a: "We prefer the car on our ramp, where a proper inspection is possible. Our pickup service can collect it if the seller agrees.",
      },
    ],
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
