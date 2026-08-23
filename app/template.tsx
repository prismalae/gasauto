"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Route transition — templates remount on navigation, so every page enters
 * with a short rise-and-fade. Enter-only by design: App Router cannot hold
 * unmounted pages for exit animations without fighting the router.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
