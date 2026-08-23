/**
 * Service areas for the pickup & delivery page and the LocalBusiness
 * `areaServed` schema property.
 *
 * The workshop is in Sharjah — that stays the local SEO anchor — but pickup
 * and delivery covers the whole UAE, so `areaServed` lists every emirate.
 */

/** Sharjah districts. Named individually because that is where the workshop is
 *  and where the local search intent concentrates. */
export const sharjahAreas = [
  "Industrial Area 1–18",
  "Muwailih",
  "Al Nahda",
  "Al Majaz",
  "Al Khan",
  "Al Qasimia",
  "Al Taawun",
  "Al Zahia",
  "Al Sajaa Industrial",
  "SAIF Zone",
  "Al Layyah",
  "Al Rolla",
  "Al Ramtha",
  "Muweilah Commercial",
  "University City",
  "Al Yarmook",
] as const;

/** Every emirate — pickup and delivery is nationwide. */
export const emirates = [
  "Sharjah",
  "Dubai",
  "Ajman",
  "Abu Dhabi",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
] as const;

/** Emirates other than the one the workshop sits in. */
export const otherEmirates = emirates.filter((e) => e !== "Sharjah");

/** Flat list used for schema.org areaServed. */
export const areaServed = emirates;
