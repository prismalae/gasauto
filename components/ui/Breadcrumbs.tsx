import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; url: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.url} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.url} className="transition-colors hover:text-green">
                    {c.name}
                  </Link>
                  <ChevronRight className="h-3 w-3 text-muted" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
