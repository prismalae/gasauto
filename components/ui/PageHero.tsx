import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Section";

export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  aside,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  crumbs: Crumb[];
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Breadcrumbs items={crumbs} />

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="mt-4 font-display text-[2rem] leading-[1.1] sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {intro && (
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
                {intro}
              </p>
            )}
            {children}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </div>
    </div>
  );
}
