/**
 * Brand data for the eight marque pages.
 *
 * The `family` field is the structural expression of the site's positioning:
 * Range Rover and Land Rover are BRITISH 4x4s and are never grouped with the
 * German marques. Every component that renders brands reads them through
 * `brandsByFamily()` in lib/utils.ts, so the header dropdown, home grid,
 * service pages and both hubs group identically by construction.
 */

export type Family = "british-4x4" | "german";

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
  "british-4x4": {
    id: "british-4x4",
    label: "British 4x4 Specialists",
    short: "British 4x4",
    badge: "BRITISH",
    hubSlug: "range-rover-specialist-sharjah",
    hubTitle: "Range Rover & Land Rover Specialist",
    blurb:
      "Our core specialty. Air suspension, ZF gearboxes, supercharged V6 and V8 engines and the notoriously fussy electronics — the faults that keep British 4x4s off the road in the Gulf heat.",
  },
  german: {
    id: "german",
    label: "German Car Experts",
    short: "German",
    badge: "GERMAN",
    hubSlug: "german-car-repair-sharjah",
    hubTitle: "German Car Repair",
    blurb:
      "Dealer-level diagnostics and genuine parts for the German marques — engine, transmission, cooling, suspension and electronics, without the dealer invoice.",
  },
};

export const FAMILY_ORDER: Family[] = ["british-4x4", "german"];

export type Brand = {
  slug: string;
  name: string;
  family: Family;
  manufacturer: string;
  /** Shown on the marque page when the maker and the marque's origin differ. */
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
    family: "british-4x4",
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
    family: "british-4x4",
    manufacturer: "Land Rover",
    metaTitle:
      "Land Rover Repair Sharjah | Discovery & Defender — GAS AUTO",
    metaDescription:
      "Land Rover repair and servicing in Sharjah for Discovery, Defender and Freelander. Specialist diagnostics, air suspension, engine and gearbox work with UAE-wide pickup and delivery.",
    h1: "Land Rover Repair & Service in Sharjah",
    intro:
      "Land Rover repair in Sharjah for Discovery, Defender and Freelander. They share much of their engineering with the Range Rover line — and its weak points too. We treat them as what they are: capable vehicles that need proper diagnosis rather than a parts cannon, and we keep the common failure items on the shelf.",
    models: [
      "Discovery",
      "Discovery Sport",
      "Defender",
      "Freelander",
      "Discovery 4",
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
        q: "Do you service the new Defender as well as the classic one?",
        a: "Yes — both the current L663 Defender and older models. They are very different vehicles underneath, and we diagnose them accordingly.",
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
    slug: "mercedes-benz-repair-sharjah",
    name: "Mercedes-Benz",
    family: "german",
    manufacturer: "Mercedes-Benz",
    metaTitle:
      "Mercedes-Benz Repair Sharjah | Specialists & Pickup — GAS AUTO",
    metaDescription:
      "Mercedes-Benz repair and servicing in Sharjah. AIRMATIC suspension, engine, gearbox, AC and electrical diagnostics on C, E, S, GLE, GLC and G-Class with UAE-wide pickup and delivery.",
    h1: "Mercedes-Benz Repair & Service in Sharjah",
    intro:
      "Mercedes-Benz repair in Sharjah, from a C-Class daily driver to a G-Class. Mercedes electronics reward proper diagnostic equipment and punish guesswork — we read the vehicle the way the factory system does, then fix the fault that is actually there.",
    models: ["C-Class", "E-Class", "S-Class", "GLE", "GLC", "G-Class", "CLA"],
    commonFaults: [
      {
        title: "AIRMATIC suspension failure",
        body: "Air struts, the compressor and the relay all wear, and UAE heat accelerates it. A corner sitting low or a 'Vehicle rising' message that never clears are the usual first signs.",
      },
      {
        title: "Engine oil and coolant leaks",
        body: "Valve cover gaskets, oil cooler seals and thermostat housings are common leak points across the M274, M276 and M278 engines.",
      },
      {
        title: "7G and 9G-Tronic gearbox issues",
        body: "Conductor plate faults, valve body wear and neglected fluid produce harsh or delayed shifts. Fluid and filter service at the right interval prevents most of it.",
      },
      {
        title: "Air conditioning underperformance",
        body: "In Sharjah, a weak AC is not a comfort issue, it is the reason a car is unusable. Compressor, condenser and evaporator faults all present as poor cooling and need proper pressure testing to separate.",
      },
      {
        title: "Electrical and SBC / sensor faults",
        body: "Battery drain, faulty crank sensors, NOx sensors on diesels and steering-lock modules are all frequent, and all easily misdiagnosed without factory-level scanning.",
      },
    ],
    relatedServices: [
      "computer-diagnostics",
      "air-suspension-repair",
      "car-ac-repair",
      "transmission-gearbox-repair",
    ],
    faqs: [
      {
        q: "Do you have Mercedes-specific diagnostic equipment?",
        a: "Yes. Generic OBD readers show only basic codes; Mercedes modules need a system that can talk to every control unit, run actuator tests and code replacement parts. That is what separates a real diagnosis from a guess.",
      },
      {
        q: "My AC is cold at speed but warm in traffic. What is wrong?",
        a: "Classic symptom of poor condenser airflow — often a failed cooling fan, a blocked condenser or low refrigerant. It is a quick diagnosis and worth fixing before summer.",
      },
      {
        q: "How often should I service a Mercedes in the UAE?",
        a: "More often than the European schedule suggests. Heat, dust and short traffic-heavy trips are hard on oil and filters, so we generally recommend shortening the interval rather than following the book literally.",
      },
    ],
  },
  {
    slug: "bmw-repair-sharjah",
    name: "BMW",
    family: "german",
    manufacturer: "BMW",
    metaTitle: "BMW Repair Sharjah | Specialists & Pickup — GAS AUTO",
    metaDescription:
      "BMW repair and servicing in Sharjah. Engine, N20 and N55 timing, cooling, gearbox, VANOS and electrical diagnostics on 3, 5, 7 Series, X3, X5 and M models. UAE-wide pickup and delivery.",
    h1: "BMW Repair & Service in Sharjah",
    intro:
      "Independent BMW repair and servicing in Sharjah. BMW engines are strong when maintained and expensive when they are not — most of the big bills we see could have been prevented by catching a cooling or oil leak early — so we tell you what is developing, not only what has already broken.",
    models: [
      "3 Series",
      "5 Series",
      "7 Series",
      "X3",
      "X5",
      "X6",
      "M Series",
    ],
    commonFaults: [
      {
        title: "Cooling system failure",
        body: "Electric water pumps, thermostats and plastic expansion tanks are known BMW wear items, and UAE heat brings them forward. An overheating BMW can destroy a cylinder head very quickly.",
      },
      {
        title: "Oil leaks — valve cover and oil filter housing",
        body: "The most common BMW complaint we see. Burning smell after a drive and oil on the exhaust manifold usually means a hardened gasket, which is straightforward if caught before it soaks the belt.",
      },
      {
        title: "Timing chain and VANOS faults",
        body: "N20 and N47 timing chain wear is well documented; a rattle on cold start should be investigated immediately. VANOS solenoid faults cause rough idle and reduced power.",
      },
      {
        title: "Carbon buildup on direct-injection engines",
        body: "Turbocharged direct-injection BMWs accumulate carbon on the intake valves, causing misfires, rough idle and lost power. Walnut blasting restores it properly.",
      },
      {
        title: "Battery drain and electrical gremlins",
        body: "Modules that will not sleep, failed IBS sensors and incorrectly registered batteries all cause repeat flat batteries — a fault that is diagnosable rather than a mystery.",
      },
    ],
    relatedServices: [
      "engine-repair",
      "computer-diagnostics",
      "car-ac-repair",
      "oil-change-and-servicing",
    ],
    faqs: [
      {
        q: "Why does my BMW keep going flat?",
        a: "Almost always a parasitic drain from a module that is not shutting down, or a battery that was replaced without being registered to the car. Both are diagnosable — replacing the battery again will not fix it.",
      },
      {
        q: "Is a rattle on cold start serious?",
        a: "On N20 and N47 engines it can indicate timing chain wear, which is serious. Book it in early — the difference in cost between an early fix and a failure is very large.",
      },
      {
        q: "Do you register a new battery to the car?",
        a: "Yes, always. Fitting a battery without registering it causes the charging system to over- or under-charge it and shortens its life significantly.",
      },
    ],
  },
  {
    slug: "audi-repair-sharjah",
    name: "Audi",
    family: "german",
    manufacturer: "Audi",
    metaTitle:
      "Audi Repair Sharjah | Specialists & Pickup — GAS AUTO",
    metaDescription:
      "Audi repair and servicing in Sharjah. TFSI engine, S tronic gearbox, quattro, oil consumption and electrical diagnostics on A4, A6, Q5, Q7 and more. UAE-wide pickup and delivery.",
    h1: "Audi Repair & Service in Sharjah",
    intro:
      "Audi repair and servicing in Sharjah, from the A3 to the Q8. Audi shares much of its mechanical architecture with Volkswagen and Porsche, so the same known weak points appear across the range — we know where to look first, which keeps diagnostic time — and your bill — down.",
    models: ["A3", "A4", "A6", "A8", "Q3", "Q5", "Q7", "Q8"],
    commonFaults: [
      {
        title: "TFSI oil consumption and carbon buildup",
        body: "Early 2.0 TFSI engines are known for piston ring oil consumption, and all direct-injection units build carbon on the intake valves. Both are fixable, and both are frequently misdiagnosed.",
      },
      {
        title: "S tronic / DSG gearbox faults",
        body: "Jerky low-speed shifts, hesitation from a standstill or a clutch pack warning usually mean overdue fluid service or mechatronic wear rather than a dead gearbox.",
      },
      {
        title: "Timing chain tensioner failure",
        body: "On older TFSI engines, a failing tensioner is a genuine engine-destroying fault. A rattle at start-up is the warning.",
      },
      {
        title: "Water pump and thermostat leaks",
        body: "The composite water pump housings crack with heat cycling. Coolant loss with no visible puddle is a common presentation.",
      },
      {
        title: "Air suspension on Q7 and A8",
        body: "The same heat-driven air spring and compressor failures as the other air-sprung cars we work on, with the same fix.",
      },
    ],
    relatedServices: [
      "engine-repair",
      "transmission-gearbox-repair",
      "computer-diagnostics",
      "air-suspension-repair",
    ],
    faqs: [
      {
        q: "My Audi burns oil between services. Is that normal?",
        a: "Some consumption is normal, but a litre every 1,000 km is not. On 2.0 TFSI engines it often indicates piston ring wear, and we can measure it properly rather than guess.",
      },
      {
        q: "How often should DSG / S tronic fluid be changed?",
        a: "Every 40,000–60,000 km for a wet-clutch unit, and sooner in heavy traffic and heat. It is one of the highest-value preventative services on the car.",
      },
      {
        q: "Can you code and program Audi modules?",
        a: "Yes — replacement components on modern Audis usually need coding or adaptation to the vehicle before they work correctly.",
      },
    ],
  },
  {
    slug: "porsche-repair-sharjah",
    name: "Porsche",
    family: "german",
    manufacturer: "Porsche",
    metaTitle:
      "Porsche Repair Sharjah | Cayenne, Macan & 911 Service — GAS AUTO",
    metaDescription:
      "Porsche repair and servicing in Sharjah for Cayenne, Macan, Panamera and 911. PDK, air suspension, cooling and engine diagnostics with genuine parts and UAE-wide pickup and delivery.",
    h1: "Porsche Repair & Service in Sharjah",
    intro:
      "Porsche repair in Sharjah for Cayenne, Macan, Panamera and 911. Porsche work demands correct torque figures, correct fluids and correct procedure — there is no margin for improvising, and we do not.",
    models: ["Cayenne", "Macan", "Panamera", "911", "Boxster", "Cayman"],
    commonFaults: [
      {
        title: "Coolant pipe and water pump failure",
        body: "Cayenne coolant pipes and water pumps are a known failure point, and overheating on a Porsche V8 gets expensive fast.",
      },
      {
        title: "PDK transmission service",
        body: "PDK units are robust but genuinely need fluid service on schedule. Neglected units develop harsh engagement and clutch wear.",
      },
      {
        title: "Air suspension faults",
        body: "Cayenne and Panamera air struts and compressors fail in the same heat-driven pattern as other air-sprung vehicles, with the same sinking-overnight symptom.",
      },
      {
        title: "Brake and suspension wear",
        body: "Porsche brakes are exceptional but wear at a rate that matches how the car is driven. Discs and pads should be measured, not estimated.",
      },
    ],
    relatedServices: [
      "engine-repair",
      "transmission-gearbox-repair",
      "brakes-and-suspension",
      "air-suspension-repair",
    ],
    faqs: [
      {
        q: "Do you work on the 911 as well as the SUVs?",
        a: "Yes. The Cayenne and Macan are the volume of what comes through, but we service and repair the sports car range as well.",
      },
      {
        q: "Do you use genuine Porsche parts?",
        a: "For a Porsche we recommend genuine or OEM parts as standard, and we will always confirm what is being fitted before the work begins.",
      },
    ],
  },
  {
    slug: "volkswagen-repair-sharjah",
    name: "Volkswagen",
    family: "german",
    manufacturer: "Volkswagen",
    metaTitle:
      "Volkswagen Repair Sharjah | VW Service & Pickup — GAS AUTO",
    metaDescription:
      "Volkswagen repair and servicing in Sharjah. DSG gearbox, TSI engine, cooling, AC and electrical diagnostics on Golf, Passat, Tiguan and Touareg. UAE-wide pickup and delivery.",
    h1: "Volkswagen Repair & Service in Sharjah",
    intro:
      "Volkswagen repair and servicing in Sharjah. VW is the sensible end of German ownership — provided the DSG fluid gets changed and the cooling system is looked after. We keep Volkswagens reliable at a running cost that makes sense.",
    models: ["Golf", "Passat", "Tiguan", "Touareg", "Jetta", "Teramont"],
    commonFaults: [
      {
        title: "DSG gearbox judder and hesitation",
        body: "Overdue fluid and mechatronic wear cause low-speed judder and delayed engagement. Servicing on schedule prevents most DSG failures we see.",
      },
      {
        title: "TSI carbon buildup and coil packs",
        body: "Misfires, rough idle and a flashing engine light are usually coil packs or carbon on the intake valves — both routine to put right.",
      },
      {
        title: "Water pump and thermostat housing leaks",
        body: "Plastic housings crack with heat cycling, which in the UAE means sooner than the service book expects.",
      },
      {
        title: "Air conditioning faults",
        body: "Compressor, condenser and blower faults all present as weak cooling and need proper testing to distinguish.",
      },
    ],
    relatedServices: [
      "transmission-gearbox-repair",
      "engine-repair",
      "car-ac-repair",
      "oil-change-and-servicing",
    ],
    faqs: [
      {
        q: "My DSG judders at low speed. Is the gearbox failing?",
        a: "Usually not. Most low-speed judder we see comes down to overdue fluid or a mechatronic adaptation issue, both of which are far cheaper than a replacement gearbox.",
      },
      {
        q: "Is the Touareg the same as the Cayenne underneath?",
        a: "They share a great deal of platform and componentry, including the air suspension architecture, so a lot of the same diagnostic knowledge applies.",
      },
    ],
  },
  {
    slug: "mini-cooper-repair-sharjah",
    name: "MINI Cooper",
    family: "german",
    manufacturer: "BMW",
    originNote:
      "A British marque built on BMW Group engineering — diagnostics, parts supply and service intervals all follow BMW, which is why we group MINI with the German cars.",
    metaTitle:
      "MINI Cooper Repair Sharjah | Specialists & Pickup — GAS AUTO",
    metaDescription:
      "MINI Cooper repair and servicing in Sharjah. Timing chain, turbo, cooling, gearbox and electrical diagnostics on Cooper, Cooper S, Countryman and Clubman. UAE-wide pickup and delivery.",
    h1: "MINI Cooper Repair & Service in Sharjah",
    intro:
      "MINI Cooper repair in Sharjah, handled the way MINI is built: BMW Group engineering under a British badge — the same engines, the same diagnostic systems, the same parts supply. That is why we service it alongside the German cars rather than with the British 4x4s.",
    models: ["Cooper", "Cooper S", "Countryman", "Clubman", "John Cooper Works"],
    commonFaults: [
      {
        title: "Timing chain rattle",
        body: "A well-known MINI fault, particularly on earlier turbo engines. A rattle on cold start needs looking at immediately rather than at the next service.",
      },
      {
        title: "Carbon buildup and turbo faults",
        body: "Direct injection means carbon on the intake valves, and wastegate rattle on the turbo is common at higher mileage.",
      },
      {
        title: "Thermostat and water pump failure",
        body: "Overheating and coolant loss are common, and the electric water pump is a known wear item.",
      },
      {
        title: "Oil leaks",
        body: "Valve cover and oil filter housing gaskets harden and leak, exactly as they do on the BMW engines they share their design with.",
      },
    ],
    relatedServices: [
      "engine-repair",
      "computer-diagnostics",
      "oil-change-and-servicing",
      "car-ac-repair",
    ],
    faqs: [
      {
        q: "Is MINI a German car?",
        a: "MINI is a British marque, owned by BMW Group since 2000 and engineered on BMW platforms. The badge is British; the engines, electronics and service procedures are BMW's — so servicing it correctly means treating it as a BMW.",
      },
      {
        q: "My MINI rattles when I start it cold. What is that?",
        a: "Most likely timing chain wear, which is a known issue on these engines. It should be diagnosed straight away, because a chain failure damages the engine.",
      },
    ],
  },
];

export const brandSlugs = brands.map((b) => b.slug);

export function getBrand(slug: string) {
  return brands.find((b) => b.slug === slug);
}
