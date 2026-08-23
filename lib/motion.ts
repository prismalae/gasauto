"use client";

import type { Variants } from "motion/react";

/**
 * Shared motion variants so timing is consistent across every section.
 *
 * Reveals animate opacity from 0.001 rather than 0 so text is never fully
 * hidden from a reader whose JS is slow — and every consumer pairs these with
 * `useReducedMotion()`, which collapses them to an instant, static state.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0.001, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0.001 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0.001, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export const staggerSlow: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/** Standard whileInView config — reveal once, slightly before fully on screen. */
export const inView = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "-80px" },
} as const;

/** Collapses any variant set to a static state for reduced-motion users. */
export const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  show: { opacity: 1, y: 0, scale: 1 },
};
