/**
 * Primary keyword per route. Every route owns exactly one primary keyword so
 * pages do not cannibalise each other in search — the family hubs take the head
 * terms, the marque pages take marque + service long-tail.
 *
 * `npm run check:seo` asserts uniqueness of every primary keyword.
 */

export type SeoEntry = {
  route: string;
  primary: string;
  secondary: string[];
};

export const seoMap: SeoEntry[] = [
  {
    route: "/",
    primary: "car repair sharjah",
    secondary: ["auto repair sharjah", "car garage sharjah", "car workshop sharjah"],
  },

  // Family hub — the head term
  {
    route: "/range-rover-specialist-sharjah",
    primary: "range rover specialist sharjah",
    secondary: [
      "land rover garage sharjah",
      "jaguar land rover garage sharjah",
      "range rover mechanic sharjah",
    ],
  },

  // Marque pages
  {
    route: "/range-rover-repair-sharjah",
    primary: "range rover repair sharjah",
    secondary: ["range rover service sharjah", "range rover air suspension sharjah"],
  },
  {
    route: "/land-rover-repair-sharjah",
    primary: "land rover repair sharjah",
    secondary: ["discovery repair sharjah", "discovery sport repair sharjah"],
  },
  {
    route: "/defender-repair-sharjah",
    primary: "defender repair sharjah",
    secondary: ["defender service sharjah", "classic defender repair uae"],
  },
  {
    route: "/jaguar-repair-sharjah",
    primary: "jaguar repair sharjah",
    secondary: ["jaguar service sharjah", "f-pace repair sharjah"],
  },

  // Services
  {
    route: "/services",
    primary: "car service sharjah",
    secondary: ["auto services sharjah", "car maintenance sharjah"],
  },
  {
    route: "/services/air-suspension-repair",
    primary: "air suspension repair sharjah",
    secondary: ["airmatic repair sharjah", "air suspension compressor sharjah"],
  },
  {
    route: "/services/car-ac-repair",
    primary: "car ac repair sharjah",
    secondary: ["car aircon service sharjah", "car ac gas refill sharjah"],
  },
  {
    route: "/services/engine-repair",
    primary: "engine repair sharjah",
    secondary: ["engine overhaul sharjah", "engine rebuild sharjah"],
  },
  {
    route: "/services/transmission-gearbox-repair",
    primary: "gearbox repair sharjah",
    secondary: ["transmission repair sharjah", "zf gearbox service sharjah"],
  },
  {
    route: "/services/computer-diagnostics",
    primary: "car diagnostics sharjah",
    secondary: ["computer diagnostics sharjah", "car scanning sharjah"],
  },
  {
    route: "/services/electrical-and-electronics",
    primary: "auto electrical repair sharjah",
    secondary: ["car electrician sharjah", "battery drain diagnosis sharjah"],
  },
  {
    route: "/services/brakes-and-suspension",
    primary: "brake repair sharjah",
    secondary: ["suspension repair sharjah", "brake pads sharjah"],
  },
  {
    route: "/services/oil-change-and-servicing",
    primary: "car oil change sharjah",
    secondary: ["car servicing sharjah", "oil change near me sharjah"],
  },
  {
    route: "/services/pre-purchase-inspection",
    primary: "pre purchase car inspection sharjah",
    secondary: ["used car inspection sharjah", "car check before buying sharjah"],
  },

  // Core
  {
    route: "/pickup-and-delivery",
    primary: "car pickup and delivery sharjah",
    secondary: ["car collection service sharjah", "car pickup and delivery uae"],
  },
  {
    route: "/book",
    primary: "book car service sharjah",
    secondary: ["car service booking sharjah"],
  },
  {
    route: "/about",
    primary: "independent car garage sharjah",
    secondary: ["trusted car workshop sharjah"],
  },
  {
    route: "/contact",
    primary: "gas auto garage sharjah",
    secondary: ["car workshop number sharjah"],
  },
  {
    route: "/blog",
    primary: "car maintenance tips uae",
    secondary: ["car care advice sharjah"],
  },
];

export function seoFor(route: string) {
  return seoMap.find((e) => e.route === route);
}
