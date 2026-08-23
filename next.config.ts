import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Production builds write to their own directory.
   *
   * `next dev` and `next build` both default to `.next`, so running a build
   * while the dev server is up leaves it serving half-replaced chunks and
   * throwing `MODULE_NOT_FOUND` / `__webpack_modules__[moduleId] is not a
   * function`. Pointing the build elsewhere removes the conflict entirely —
   * see the `build`/`start` scripts in package.json.
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",

  images: {
    // Long-lived cache for optimised images; the sources are content-addressed
    // by filename and change rarely.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
