"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Autoplaying workshop clip.
 *
 * Nothing downloads until the element is near the viewport — `preload="none"`
 * plus an IntersectionObserver — so four clips on one page cost nothing on
 * first load. The poster frame renders immediately either way.
 *
 * Note the explicit `load()`: with preload="none", attaching `src` after mount
 * does not start a fetch on its own, and `autoplay` only applies at initial
 * load. So the source is attached, then loaded, then played on `canplay`.
 *
 * Under reduced motion no video is created at all — the poster renders as a
 * plain image. Playback is muted and inline, which is what allows autoplay.
 */
export function LazyVideo({
  src,
  poster,
  alt,
  className,
}: {
  src: string;
  poster: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const visible = useRef(false);
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();

  // Attach the source once the clip comes near the viewport.
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (entry.isIntersecting) setActive(true);
        else el.pause();
      },
      { rootMargin: "250px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // Then load it and start playing as soon as it can.
  useEffect(() => {
    if (!active || reduced) return;
    const el = ref.current;
    if (!el) return;

    const play = () => {
      if (visible.current) {
        el.play().catch(() => {
          /* autoplay refused — the poster frame stays, which is fine */
        });
      }
    };

    el.addEventListener("canplay", play);
    el.load();
    return () => el.removeEventListener("canplay", play);
  }, [active, reduced]);

  if (reduced) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={poster} alt={alt} className={cn("h-full w-full object-cover", className)} />
    );
  }

  return (
    <video
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      poster={poster}
      src={active ? src : undefined}
      preload="none"
      muted
      loop
      playsInline
      aria-label={alt}
    />
  );
}
