/**
 * Photography from the workshop.
 *
 * Alt text describes what is actually in each frame — these are real photos of
 * the Sharjah workshop, not stock, and the descriptions should stay accurate if
 * the images are ever swapped.
 *
 * Intrinsic width/height are recorded so next/image can reserve the right space
 * and avoid layout shift.
 */

export type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const media = {
  workshopBays: {
    src: "/media/workshop-bays.jpg",
    alt: "Range Rover and Land Rover vehicles on the ramps inside the GAS AUTO workshop in Sharjah",
    width: 1672,
    height: 941,
  },
  workshopInterior: {
    src: "/media/workshop-interior.jpg",
    alt: "Inside the GAS AUTO workshop, with vehicles raised on two-post lifts across several bays",
    width: 1600,
    height: 747,
  },
  workshopFront: {
    src: "/media/workshop-front.jpg",
    alt: "The GAS AUTO workshop entrance in Sharjah Industrial Area 12, with the Gheroub Al Shams signboard above the door",
    width: 901,
    height: 1600,
  },
  workshopFrontAlt: {
    src: "/media/workshop-front-alt.jpg",
    alt: "Street view of the GAS AUTO workshop entrance in Sharjah",
    width: 901,
    height: 1600,
  },
  pickupRecovery: {
    src: "/media/pickup-recovery.jpg",
    alt: "A Range Rover loaded on a recovery truck for collection, on its way to the GAS AUTO workshop",
    width: 654,
    height: 1400,
  },
  diagnosticsTablet: {
    src: "/media/diagnostics-tablet.jpg",
    alt: "A technician running a diagnostic scan from a tablet inside a Range Rover cabin",
    width: 809,
    height: 1400,
  },
  engineRemoved: {
    src: "/media/engine-removed.jpg",
    alt: "An engine lifted out of a vehicle on a hoist during an overhaul at the GAS AUTO workshop",
    width: 646,
    height: 1400,
  },
  engineStripped: {
    src: "/media/engine-stripped.jpg",
    alt: "A stripped V-configuration engine with cylinder heads removed, laid out on the bench for rebuild",
    width: 1600,
    height: 747,
  },
  underbodyInspection: {
    src: "/media/underbody-inspection.jpg",
    alt: "A technician inspecting a Range Rover air suspension strut under a raised vehicle with an inspection lamp",
    width: 1672,
    height: 941,
  },
  jaguarEngineBay: {
    src: "/media/jaguar-engine-bay.jpg",
    alt: "A car raised on a two-post lift with the bonnet open for engine bay work",
    width: 787,
    height: 1400,
  },
} as const satisfies Record<string, Media>;

/** Photo shown at the top of each service page, keyed by service slug. */
export const serviceMedia: Record<string, Media> = {
  "computer-diagnostics": media.diagnosticsTablet,
  "engine-repair": media.engineStripped,
  "transmission-gearbox-repair": media.engineRemoved,
  "brakes-and-suspension": media.underbodyInspection,
  "air-suspension-repair": media.underbodyInspection,
  "pre-purchase-inspection": media.underbodyInspection,
  "electrical-and-electronics": media.diagnosticsTablet,
  "oil-change-and-servicing": media.workshopInterior,
  "car-ac-repair": media.workshopBays,
};

/** Photo shown on each marque page. */
export const brandMedia: Record<string, Media> = {
  "range-rover-repair-sharjah": media.workshopBays,
  "land-rover-repair-sharjah": media.workshopBays,
  "mercedes-benz-repair-sharjah": media.workshopInterior,
  "bmw-repair-sharjah": media.engineStripped,
  "audi-repair-sharjah": media.engineRemoved,
  "porsche-repair-sharjah": media.workshopInterior,
  "volkswagen-repair-sharjah": media.underbodyInspection,
  "mini-cooper-repair-sharjah": media.jaguarEngineBay,
};

/** Short workshop clips. Each has a poster frame extracted from the video. */
export type Clip = { src: string; poster: string; alt: string };

export const clips = {
  workshopAction: {
    src: "/media/workshop-action.mp4",
    poster: "/media/workshop-action-poster.jpg",
    alt: "A technician working on an engine inside the GAS AUTO workshop",
  },
  oilChange: {
    src: "/media/oil-change.mp4",
    poster: "/media/oil-change-poster.jpg",
    alt: "Fresh oil being poured into an engine during a service",
  },
  engineBay: {
    src: "/media/engine-bay.mp4",
    poster: "/media/engine-bay-poster.jpg",
    alt: "Two technicians working together in an open engine bay",
  },
  engineLift: {
    src: "/media/engine-lift.mp4",
    poster: "/media/engine-lift-poster.jpg",
    alt: "An engine suspended on a hoist beside the vehicle it came out of",
  },
} as const satisfies Record<string, Clip>;
