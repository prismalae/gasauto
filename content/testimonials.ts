/**
 * Customer reviews.
 *
 * Every entry below is a REAL review from the Google Business Profile, quoted
 * verbatim. Nothing here is written by us. `en` and `ar` hold the two language
 * versions Google serves; `original` records which one the customer actually
 * wrote, so a translation is never passed off as their own words.
 *
 * Only wholly positive reviews are shown — which is normal for a testimonials
 * section. Reviews that mix praise with criticism are left out entirely rather
 * than trimmed, because cutting the criticism out would misrepresent them.
 *
 * TODO_CLIENT: add new reviews here as they come in, keeping them verbatim.
 */

export type Testimonial = {
  name: string;
  /** 1–5, as left by the customer. */
  rating: number;
  /** Relative age, as Google displays it. */
  when: string;
  en: string;
  ar: string;
  /** The language the customer actually wrote in. */
  original: "en" | "ar";
};

export const testimonials: Testimonial[] = [
  {
    name: "Mohamed Keghida",
    rating: 5,
    when: "2 years ago",
    original: "en",
    en: "Best Range Rover Garage in UAE. My car was in a garage for two weeks, they never found the problem. After that I took my Range Rover to Gheroub Alshams garage — they repaired my car the same day.",
    ar: "أفضل كراج رينج روفر في الإمارات. بقيت سيارتي في الكراج لمدة أسبوعين، ولم يجدوا أي مشكلة. بعد ذلك، أخذت سيارتي إلى كراج غروب الشمس، حيث أصلحوها في نفس اليوم.",
  },
  {
    name: "Mohamed Alali",
    rating: 5,
    when: "a year ago",
    original: "ar",
    ar: "قراج جيد شغله ممتاز وسريع ❤️",
    en: "Good garage, excellent and fast work ❤️",
  },
  {
    name: "Noyon Chowdhary",
    rating: 5,
    when: "8 months ago",
    original: "en",
    en: "Very professionals in range rovers.",
    ar: "محترفون للغاية في سيارات رينج روفر.",
  },
  {
    name: "Faisal Nathoka",
    rating: 4,
    when: "a year ago",
    original: "en",
    en: "A workshop — mostly vehicles are Range Rovers for maintenance.",
    ar: "ورشة عمل، معظمها مخصصة لصيانة سيارات رينج روفر.",
  },
  {
    name: "allbd mamun",
    rating: 5,
    when: "3 years ago",
    original: "en",
    en: "Good work.",
    ar: "عمل جيد.",
  },
];
