"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * Word-by-word heading reveal. Each word rides up behind a clipping mask, so
 * the line assembles rather than simply fading.
 *
 * The full string stays in the DOM as real text — screen readers and crawlers
 * read it normally, and reduced-motion users get it rendered flat.
 */
export function TextReveal({
  text,
  as: Tag = "span",
  className,
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <Tag className={className}>{text}</Tag>;

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.span;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.045, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "105%", opacity: 0.001 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
