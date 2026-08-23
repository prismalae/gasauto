import { brands, FAMILY_ORDER, FAMILIES, type Brand, type Family } from "@/content/brands";
import { services } from "@/content/services";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/**
 * The ONLY way components should read the brand list.
 *
 * Returning brands pre-grouped by family means the header dropdown, the home
 * page grid, the service pages and the hub all render the marque lineup
 * identically — it cannot drift, because there is one implementation.
 */
export function brandsByFamily(subset?: Brand[]) {
  const list = subset ?? brands;
  return FAMILY_ORDER.map((id) => ({
    family: FAMILIES[id],
    brands: list.filter((b) => b.family === id),
  })).filter((g) => g.brands.length > 0);
}

export function brandsInFamily(family: Family) {
  return brands.filter((b) => b.family === family);
}

export function brandsBySlugs(slugs: string[]) {
  return slugs
    .map((s) => brands.find((b) => b.slug === s))
    .filter((b): b is Brand => Boolean(b));
}

export function servicesBySlugs(slugs: string[]) {
  return slugs
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
}

export function absoluteUrl(path: string, origin: string) {
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}
