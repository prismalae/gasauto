import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-14 sm:py-20", className)}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/** Small caps label above a section heading. Quiet, not neon. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="block text-xs font-medium uppercase tracking-[0.14em] text-muted">
      {children}
    </span>
  );
}
