"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { fadeUp, inView, staggerContainer, staticVariants } from "@/lib/motion";

/**
 * Scroll reveal. When the user prefers reduced motion we swap in static
 * variants so content appears instantly — no transform, no fade, no delay.
 */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  as = "div",
  delay,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  as?: ElementType;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      data-reveal=""
      variants={reduced ? staticVariants : variants}
      transition={delay && !reduced ? { delay } : undefined}
      {...inView}
    >
      {children}
    </MotionTag>
  );
}

/** Parent for staggered grids — children should use <Reveal> or motion items. */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      data-reveal=""
      variants={reduced ? staticVariants : staggerContainer}
      {...inView}
    >
      {children}
    </MotionTag>
  );
}
