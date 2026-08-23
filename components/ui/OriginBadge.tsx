import { FAMILIES, type Family } from "@/content/brands";
import { cn } from "@/lib/utils";

/** BRITISH provenance chip shown beside every marque. */
export function OriginBadge({
  family,
  className,
}: {
  family: Family;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full bg-green px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-paper",
        className,
      )}
    >
      {FAMILIES[family].badge}
    </span>
  );
}
