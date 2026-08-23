/**
 * Blog posts. Kept as typed data rather than MDX so the whole site stays a
 * plain static build with no extra toolchain — body is an array of blocks.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  /** ISO date — used for BlogPosting schema and the sitemap. */
  date: string;
  readingMinutes: number;
  tag: string;
  body: Block[];
  relatedBrands?: string[];
  relatedServices?: string[];
};

export const posts: Post[] = [
  {
    slug: "range-rover-air-suspension-uae-heat",
    title: "Why Range Rover air suspension fails in UAE heat — and what it costs to ignore",
    metaTitle:
      "Range Rover Air Suspension Failure in UAE Heat | Causes & Fixes",
    description:
      "Air springs harden and split years earlier in Gulf temperatures. Here is how the failure progresses, the warning signs, and why catching it early is dramatically cheaper.",
    date: "2026-07-14",
    readingMinutes: 6,
    tag: "Range Rover",
    relatedBrands: [
      "range-rover-repair-sharjah",
      "land-rover-repair-sharjah",
      "defender-repair-sharjah",
    ],
    relatedServices: ["air-suspension-repair"],
    body: [
      {
        type: "p",
        text: "Air suspension is the single most common expensive fault we see on Range Rover and Land Rover vehicles in the UAE. It is not a design defect so much as a climate consequence — and understanding how the failure progresses is what lets you catch it at the cheap stage rather than the expensive one.",
      },
      { type: "h2", text: "What actually fails" },
      {
        type: "p",
        text: "An air spring is rubber holding pressurised air. Sustained ambient temperatures above 40°C, plus radiant heat off the tarmac, accelerate the hardening of that rubber. Springs that might last a decade in northern Europe routinely fail in half that time here. Once a spring develops a leak, the system compensates the only way it can: the compressor runs more often, and for longer.",
      },
      {
        type: "p",
        text: "That is the critical part. The compressor is not designed for continuous duty. A small leak that would cost a moderate amount to fix becomes, over a few months of over-cycling, a burnt-out compressor and often a damaged valve block as well. The bill multiplies.",
      },
      { type: "h2", text: "The warning signs, in the order they appear" },
      {
        type: "ul",
        items: [
          "The car sits lower on one corner after standing overnight — usually the first sign, and easy to dismiss",
          "The compressor runs audibly for longer than usual when you start the car",
          "A \"Suspension Fault\" or \"Vehicle rising\" message appears intermittently",
          "The ride height will not change between settings, or the car refuses to raise",
          "The ride turns harsh and crashing as the car sits on its bump stops",
        ],
      },
      {
        type: "p",
        text: "If you are at the first item on that list, the repair is straightforward. If you are at the last, the compressor has almost certainly been running under strain for months.",
      },
      { type: "h2", text: "Why diagnosis matters more than parts" },
      {
        type: "p",
        text: "A suspension fault message does not tell you which component failed. Replacing the whole assembly is the lazy answer and an expensive one. The correct approach is to pressure-test the system to locate the actual leak, then check the compressor's duty cycle to establish whether it has been damaged by that leak. That single distinction is usually the difference between a moderate invoice and a very large one.",
      },
      { type: "h2", text: "Should you convert to coil springs?" },
      {
        type: "p",
        text: "Conversion kits are cheaper up front and are heavily marketed. They also change the ride and handling significantly, remove the height adjustment the vehicle was designed around, and can leave permanent warning lights on the dash. On a premium vehicle you intend to keep or sell on, repairing the system properly is usually the better decision — but it depends on the car, its age and what you plan to do with it, and an honest workshop will give you that comparison rather than a blanket answer.",
      },
      { type: "h2", text: "What to do if it has already failed" },
      {
        type: "p",
        text: "Do not keep driving it. A car resting on its bump stops has no suspension travel, which puts load through components that were never meant to take it and makes handling unpredictable at speed. Arrange a collection instead — a vehicle that cannot be safely driven is precisely what a pickup service exists for.",
      },
    ],
  },
  {
    slug: "car-ac-cold-at-speed-warm-in-traffic",
    title: "Your car AC is cold at speed but warm in traffic. Here is why.",
    metaTitle: "Car AC Cold At Speed, Warm In Traffic | Cause & Fix (UAE)",
    description:
      "One of the most misdiagnosed faults in the UAE. The problem is usually airflow across the condenser, not the AC system itself — and it is cheaper than you fear.",
    date: "2026-05-30",
    readingMinutes: 4,
    tag: "Air Conditioning",
    relatedServices: ["car-ac-repair"],
    body: [
      {
        type: "p",
        text: "This is the most specific and most useful symptom in car air conditioning, because it points almost directly at the cause. If your AC blows cold on the motorway and turns warm the moment you are stationary in traffic, the refrigerant circuit is very probably fine. The problem is airflow.",
      },
      { type: "h2", text: "What is happening" },
      {
        type: "p",
        text: "Your air conditioning rejects heat through the condenser, which sits at the front of the car alongside the radiator. At speed, air is forced through it and heat is carried away efficiently. When you stop, that forced airflow disappears and the job falls entirely to the cooling fans. If the fans are not working, or the condenser is packed with dust and sand so air cannot pass through it, heat rejection collapses and the system stops cooling.",
      },
      { type: "h2", text: "The usual culprits" },
      {
        type: "ul",
        items: [
          "A failed or intermittent cooling fan, or its relay or control module",
          "A condenser blocked with the fine dust and sand that is unavoidable here",
          "Low refrigerant, which reduces the system's margin so it copes at speed but not stationary",
          "A failing fan clutch on older vehicles",
        ],
      },
      { type: "h2", text: "Why \"just regas it\" is the wrong answer" },
      {
        type: "p",
        text: "Refrigerant lives in a sealed system. If it is low, it leaked — that is not an opinion, it is how a closed circuit works. Refilling without finding the leak means you are back in the same position within months, and in the meantime the compressor has been running with less lubricant than it was designed for. Any workshop that offers a regas without a pressure and leak test first is selling you the same job twice.",
      },
      { type: "h2", text: "Get it checked before summer, not during it" },
      {
        type: "p",
        text: "A system that felt merely adequate in March will be genuinely inadequate in July. Air conditioning in this country is not a comfort feature, it is what makes a car usable — and the workshop queue in peak summer is considerably longer than it is in spring.",
      },
    ],
  },
  {
    slug: "independent-specialist-vs-dealer-uae",
    title: "Independent specialist or main dealer? An honest comparison",
    metaTitle: "Independent Car Specialist vs Main Dealer in the UAE | Compared",
    description:
      "Where a dealer genuinely is the right choice, where an independent specialist wins, and where the real cost difference actually comes from.",
    date: "2026-04-18",
    readingMinutes: 5,
    tag: "Advice",
    relatedServices: ["computer-diagnostics", "pre-purchase-inspection"],
    body: [
      {
        type: "p",
        text: "We are an independent workshop, so treat this with the scepticism it deserves — but the honest answer is that the dealer is sometimes the right choice, and pretending otherwise would not help you.",
      },
      { type: "h2", text: "When the dealer is genuinely the better option" },
      {
        type: "ul",
        items: [
          "The car is still under manufacturer warranty and the fault is likely covered — use it",
          "There is an open recall or a technical service campaign on the vehicle, which the dealer performs at no cost",
          "The repair needs a software update or module only the manufacturer can supply",
          "The car is very new and the fault is unusual enough that factory technical support genuinely matters",
        ],
      },
      { type: "h2", text: "Where an independent specialist wins" },
      {
        type: "p",
        text: "Labour rates are the obvious difference, but they are not the largest one. The bigger saving is diagnostic. Dealer workflows frequently replace assemblies where a specialist replaces the specific failed component — a valve block instead of an entire suspension system, a mechatronic sleeve instead of a gearbox. On the cars a workshop sees every week, familiarity with the common failure patterns cuts diagnostic hours substantially, and those hours are billable either way.",
      },
      {
        type: "p",
        text: "The second advantage is parts choice. An independent can offer you genuine, OEM or quality aftermarket and explain the real difference. Sometimes the genuine part is worth it and we will say so; sometimes the OEM part is made in the same factory with a different box on it.",
      },
      { type: "h2", text: "What to actually ask a workshop" },
      {
        type: "ul",
        items: [
          "Will I get a written quote before any chargeable work begins?",
          "Do you have manufacturer-level diagnostic equipment for my specific marque, or a generic scanner?",
          "Which parts are you fitting — genuine, OEM or aftermarket — and will that be stated on the invoice?",
          "What warranty applies to the parts and to the labour, and for how long?",
          "If you find something additional once the job is open, will you stop and call me?",
        ],
      },
      {
        type: "p",
        text: "A workshop that answers all five clearly is a workshop worth using, independent or otherwise. One that hesitates on any of them is telling you something useful.",
      },
      { type: "h2", text: "Does independent servicing void a warranty?" },
      {
        type: "p",
        text: "For a vehicle out of manufacturer warranty, the question does not arise. While a car is still covered, servicing to the correct schedule with correct-specification parts is the standard route, but the specifics vary — so ask, and get a straight answer, before you commit either way.",
      },
    ],
  },
];

export const postSlugs = posts.map((p) => p.slug);

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
