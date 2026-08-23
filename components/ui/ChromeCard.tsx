"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The site's card.
 *
 * `chrome` runs an animated conic-gradient ring around the border — a real
 * rotating highlight, not a static fake. `gradient` swaps the flat surface for
 * a green-to-black wash. Both are decorative and both stop under reduced
 * motion (see globals.css).
 */
export function ChromeCard({
  href,
  className,
  children,
  interactive = true,
  chrome = false,
  gradient = true,
  sheen = true,
}: {
  href?: string;
  className?: string;
  children: ReactNode;
  interactive?: boolean;
  chrome?: boolean;
  gradient?: boolean;
  sheen?: boolean;
}) {
  const reduced = useReducedMotion();

  const classes = cn(
    "group relative block overflow-hidden rounded-lg p-6",
    gradient ? "grad-card border border-line" : "card",
    chrome && "chrome-stroke",
    sheen && interactive && "sheen",
    interactive &&
      "transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-green/60 motion-reduce:hover:translate-y-0",
    className,
  );

  /** Feeds the .spotlight-layer radial with the pointer position. */
  const track = interactive
    ? (e: React.MouseEvent<HTMLElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    : undefined;

  const inner = (
    <>
      {interactive && <div className="spotlight-layer" aria-hidden="true" />}
      <div className="relative z-[3]">{children}</div>
    </>
  );

  const content = href ? (
    <Link href={href} className={classes} onMouseMove={track}>
      {inner}
    </Link>
  ) : (
    <div className={classes} onMouseMove={track}>
      {inner}
    </div>
  );

  return (
    <motion.div
      data-reveal=""
      variants={reduced ? undefined : fadeUp}
      className="h-full [&>*]:h-full"
    >
      {content}
    </motion.div>
  );
}
