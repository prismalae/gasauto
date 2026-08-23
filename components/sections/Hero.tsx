"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { media } from "@/content/media";
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
  const badgeY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <div ref={ref} className="relative isolate overflow-hidden border-b border-line">
      <motion.div
        style={reduced ? undefined : { y: bgY }}
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="aurora" />
      </motion.div>

      <div className="mx-auto max-w-6xl px-5 pb-14 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted"
            >
              <span className="h-px w-6 bg-green" />
              Sharjah, UAE · Pickup &amp; delivery UAE-wide
            </motion.p>

            {/*
              Two families, two lines. The specialty leads; the coverage
              follows. Never merged into one list.
            */}
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

          {/* Real workshop photography — Range Rovers on our own ramps. */}
          <motion.div
            style={reduced ? undefined : { y: badgeY }}
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="chrome-stroke chrome-stroke-slow relative hidden aspect-[4/5] overflow-hidden rounded-xl lg:block"
          >
            <Image
              src={media.underbodyInspection.src}
              alt={media.underbodyInspection.alt}
              fill
              sizes="(min-width: 1024px) 460px, 0px"
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
