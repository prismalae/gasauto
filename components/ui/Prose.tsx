import type { ReactNode } from "react";

/** Typographic wrapper for long-form legal and blog content. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-2xl space-y-5 text-[0.9375rem] leading-relaxed text-muted [&_a]:text-green [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-lg [&_h3]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:space-y-2">
      {children}
    </div>
  );
}
