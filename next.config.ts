import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The DEV server writes to its own directory (`npm run dev` sets
   * NEXT_DIST_DIR=.next-dev); builds keep the default `.next`.
   *
   * `next dev` and `next build` both default to `.next`, so running a build
   * while the dev server is up leaves it serving half-replaced chunks and
   * throwing `MODULE_NOT_FOUND` errors. The build side must be the one on
   * the default, though: deploy platforms (Vercel) resolve the output at
   * `.next` and do not see env vars set inside the npm script.
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",

  images: {
    // Long-lived cache for optimised images; the sources are content-addressed
    // by filename and change rarely.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
