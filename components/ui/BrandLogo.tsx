import { cn } from "@/lib/utils";

/**
 * Marks for the four JLR marques we service.
 *
 * All four badges are typographic in real life — letter-spaced caps in an
 * oval — so they are rendered as wordmark lockups rather than copied artwork:
 * monochrome, inheriting `currentColor`, sized by the parent.
 *
 * These identify the vehicles this workshop services (nominative use);
 * the workshop is independent and unaffiliated with Jaguar Land Rover.
 */

const BRAND_MARK: Record<string, string[]> = {
  "range-rover-repair-sharjah": ["RANGE", "ROVER"],
  "land-rover-repair-sharjah": ["LAND", "ROVER"],
  "defender-repair-sharjah": ["DEFENDER"],
  "jaguar-repair-sharjah": ["JAGUAR"],
};

export function BrandLogo({
  slug,
  name,
  className,
}: {
  slug: string;
  name: string;
  className?: string;
}) {
  const lines = BRAND_MARK[slug];
  if (!lines) return null;

  return (
    <span
      role="img"
      aria-label={name}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center rounded-full border border-current px-1.5 leading-none",
        className,
      )}
    >
      {lines.map((line) => (
        <span
          key={line}
          className={cn(
            "font-semibold uppercase",
            // Single-word marks run longer — tighter tracking keeps them inside
            // the oval at small sizes.
            lines.length === 1
              ? "text-[0.36em] tracking-[0.08em]"
              : "text-[0.5em] tracking-[0.14em]",
          )}
        >
          {line}
        </span>
      ))}
    </span>
  );
}
