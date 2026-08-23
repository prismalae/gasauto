"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { Magnetic } from "@/components/ui/Magnetic";

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

      <div className="mx-auto max-w-6xl px-5 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="max-w-2xl">
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
          <h1 className="mt-5 font-display text-[1.75rem] leading-[1.08] sm:text-[2.5rem] lg:text-[3rem]">
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
            className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base"
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
            className="mt-8 flex flex-wrap gap-3"
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
            className="mt-8 grid gap-x-6 gap-y-2 text-sm text-muted sm:grid-cols-2"
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
      </div>

      {/*
        The car drives in from off-screen left and parks with its tyres on the
        hero's bottom border — the border doubles as the road. Scroll keeps it
        rolling right. data-reveal ties it into the reduced-motion and no-JS
        CSS overrides, so it can never be stranded off-screen.
      */}
      <div className="mx-auto mt-8 max-w-6xl sm:mt-2 sm:px-6 lg:px-8">
        {/* Outer div: one-shot drive-in. Inner div: scroll-linked drift.
            Same property, two elements — they must not share one transform. */}
        <motion.div
          data-reveal=""
          initial={reduced ? false : { x: "-70vw", opacity: 0.001 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative -ml-[12%] -mr-[12%] w-[124%] sm:ml-auto sm:mr-0 sm:w-full sm:max-w-[880px]"
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
            sizes="(min-width: 1024px) 880px, 100vw"
            className="relative w-full"
          />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
