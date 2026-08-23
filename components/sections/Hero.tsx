"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { media } from "@/content/media";

const proof = [
  "Genuine & OEM parts",
  "Dealer-level diagnostics",
  "Written quote before any work",
  "Warranty on repairs",
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax the decorative layers only — never the LCP text.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  // The car keeps rolling gently to the right as the page scrolls away.
  const carX = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <div ref={ref} className="relative isolate overflow-hidden border-b border-line">
      <motion.div
        style={reduced ? undefined : { y: bgY }}
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="aurora" />
      </motion.div>

      {/*
        One viewport-height scene on desktop: text column left, car anchored
        to the bottom-right of the SAME frame — nothing important below the
        fold. Below lg it flows: tightened text stack, then the car, sized to
        land inside the first mobile viewport.
      */}
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6 lg:flex lg:min-h-[min(calc(100svh-var(--header-h)),50rem)] lg:flex-col lg:justify-center lg:px-8">
        <div className="max-w-2xl pt-8 sm:pt-12 lg:max-w-[32rem] lg:pb-20 lg:pt-0">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted"
          >
            <span className="h-px w-6 bg-green" />
            <span>
              Sharjah, UAE
              <span className="hidden min-[420px]:inline">
                {" "}· Pickup &amp; delivery UAE-wide
              </span>
            </span>
          </motion.p>

          {/*
            Two short, deliberate lines that never re-wrap — the full
            four-marque list belongs to the paragraph and the marquee, not
            the headline. Sharjah already lives in the eyebrow above.
          */}
          <h1 className="mt-4 font-display text-[1.75rem] leading-[1.08] sm:text-[2.5rem] lg:text-[2.625rem]">
            <TextReveal text="Range Rover, Defender" className="block text-chrome" />
            <TextReveal
              as="span"
              text="& Jaguar Specialists"
              delay={0.18}
              className="block text-green"
            />
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base"
          >
            Independent specialists in the{" "}
            <strong className="font-semibold text-ink">Jaguar Land Rover</strong>{" "}
            family — every Range Rover, Land Rover, Defender and Jaguar — and
            nothing else. Dealer-level diagnostics, genuine parts, and a
            written quote before any work starts, at our workshop in Sharjah
            Industrial Area 12.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Magnetic>
              <ButtonLink href="/book" size="lg">
                Book a pickup
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="/services" size="lg" variant="outline">
              Our services
            </ButtonLink>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07, delayChildren: 0.75 } },
            }}
            className="mt-6 grid grid-cols-1 gap-x-5 gap-y-2 text-sm text-muted min-[420px]:grid-cols-2"
          >
            {proof.map((item) => (
              <motion.li
                key={item}
                variants={
                  reduced
                    ? undefined
                    : { hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }
                }
                className="flex items-center gap-2"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-green" aria-hidden="true" />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/*
          A real technician from the workshop floor, cropped into a circular
          chip with the animated chrome ring — hung in the top-right of the
          scene, desktop only, where that corner would otherwise sit empty.
        */}
        <motion.div
          data-reveal=""
          initial={reduced ? false : { opacity: 0.001, scale: 0.88, y: -12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute right-8 top-10 hidden lg:block xl:right-12"
        >
          <div className="animate-float">
            <div className="chrome-stroke relative h-44 w-44 overflow-hidden rounded-full shadow-[0_18px_50px_rgba(0,0,0,0.55)] xl:h-48 xl:w-48">
              <Image
                src={media.underbodyInspection.src}
                alt="GAS AUTO technician inspecting a vehicle on the ramp"
                fill
                sizes="192px"
                className="object-cover"
                style={{ objectPosition: "18% 88%" }}
              />
            </div>
          </div>
        </motion.div>

      {/*
        The car drives in from off-screen left and parks with its tyres on the
        hero's bottom border — the border doubles as the road. Scroll keeps it
        rolling right. data-reveal ties it into the reduced-motion and no-JS
        CSS overrides, so it can never be stranded off-screen.
      */}
        <div className="mt-8 sm:mt-4 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[57%] lg:pr-0">
          {/* Outer div: one-shot drive-in. Inner div: scroll-linked drift.
              Same property, two elements — they must not share one transform. */}
          <motion.div
            data-reveal=""
            initial={reduced ? false : { x: "-70vw", opacity: 0.001 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full sm:ml-auto sm:max-w-[820px]"
          >
          <motion.div style={reduced ? undefined : { x: carX }} className="relative">
            {/* Ground shadow so the cutout sits on the road, not floating. */}
            <div
              aria-hidden="true"
              className="absolute bottom-[2px] left-1/2 h-6 w-[82%] -translate-x-1/2 rounded-[100%] bg-black/60 blur-md"
            />
          <Image
            src="/media/range-rover-velar.webp"
            alt="Range Rover Velar side profile"
            width={1800}
            height={664}
            priority
            sizes="(min-width: 1024px) 640px, (min-width: 640px) 820px, 100vw"
            className="relative w-full"
          />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
