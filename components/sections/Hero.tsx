"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { site } from "@/config/site";
import { media } from "@/content/media";
import { ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { TextReveal } from "@/components/ui/TextReveal";

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
            <h1 className="mt-5 font-display text-[1.875rem] leading-[1.12] [text-wrap:balance] sm:text-[2.25rem] lg:text-[2.625rem]">
              <TextReveal text="Range Rover Specialists" className="text-chrome" />
              <TextReveal
                as="span"
                text="& German Car Experts"
                delay={0.18}
                className="block text-green"
              />
              <motion.span
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-2 block font-sans text-base font-medium tracking-normal text-muted sm:text-lg"
              >
                in Sharjah
              </motion.span>
            </h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-muted sm:text-base"
            >
              Independent specialists in{" "}
              <strong className="font-semibold text-ink">Range Rover and Land Rover</strong>{" "}
              — the British 4×4s we know best — and expert servicing for{" "}
              <strong className="font-semibold text-ink">
                Mercedes-Benz, BMW, Audi, Porsche and Volkswagen
              </strong>
              . Dealer-level diagnostics, genuine parts, and a written quote
              before any work starts — at our own workshop in Sharjah
              Industrial Area 12.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <ButtonLink href="/book" size="lg">
                Book a pickup
              </ButtonLink>
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

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 lg:grid-cols-4">
          {site.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-3xl text-chrome sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span className="mt-1 block text-xs uppercase tracking-[0.1em] text-muted">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
