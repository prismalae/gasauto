"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Thin green progress bar across the very top, driven by scroll position. */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30 });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-green-deep via-green to-green"
    />
  );
}
