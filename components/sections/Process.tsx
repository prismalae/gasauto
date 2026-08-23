"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";

const steps = [
  {
    title: "Tell us the symptom",
    text: "Call, WhatsApp or book online. Describe what the car is doing — a warning message, a noise, a smell. It tells us a great deal before we even see it.",
  },
  {
    title: "Collection",
    text: "We collect from anywhere in the UAE at a time that suits you, including vehicles that cannot be driven. The collection charge is confirmed with you before we set off.",
  },
  {
    title: "Full diagnosis",
    text: "Every module scanned, live data reviewed, physical inspection on the ramp. We establish the actual fault rather than the first code.",
  },
  {
    title: "Written quote",
    text: "Parts and labour, itemised, sent to you. You approve it — or you do not, and there is no pressure either way.",
  },
  {
    title: "The repair",
    text: "Correct parts, correct fluids, correct procedure. Coding and adaptation carried out where the vehicle requires it.",
  },
  {
    title: "Delivered back",
    text: "Road tested, washed and returned to your door, with the work documented and under warranty.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <Section id="process">
      <Reveal className="max-w-3xl">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
          <span className="text-chrome">Six steps.</span>{" "}
          <span className="text-green">No surprises.</span>
        </h2>
      </Reveal>

      <div ref={ref} className="relative mt-12 pl-10 sm:pl-14">
        {/* Track */}
        <div
          className="absolute left-3 top-2 h-[calc(100%-1rem)] w-px bg-line sm:left-5"
          aria-hidden="true"
        />
        {/* Scroll-driven progress fill */}
        <motion.div
          style={reduced ? { scaleY: 1 } : { scaleY }}
          className="absolute left-3 top-2 h-[calc(100%-1rem)] w-px origin-top bg-green sm:left-5"
          aria-hidden="true"
        />

        <ol className="space-y-10">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <span
                className="absolute -left-[1.9rem] top-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-surface text-[0.6875rem] font-semibold text-green sm:-left-[2.4rem]"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <Reveal>
                <h3 className="font-display text-lg text-ink sm:text-xl">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  {s.text}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
