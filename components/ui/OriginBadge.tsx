import { FAMILIES, type Family } from "@/content/brands";
import { cn } from "@/lib/utils";

/**
 * BRITISH / GERMAN label on every brand card and marque page — the family split
 * made visible at a glance, not only in headings.
 */
export function OriginBadge({
  family,
  className,
}: {
  family: Family;
  className?: string;
}) {
  const meta = FAMILIES[family];
  const british = family === "british-4x4";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em]",
        british ? "bg-green text-paper" : "bg-green-soft text-green",
        className,
      )}
    >
      {meta.badge}
    </span>
  );
}
