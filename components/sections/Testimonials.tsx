"use client";

import { useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { site } from "@/config/site";
import { testimonials } from "@/content/testimonials";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

/**
 * Real Google reviews, quoted verbatim, in both languages.
 *
 * The toggle switches between English and Arabic. A review shown in a language
 * the customer did not write in is labelled as a Google translation — their
 * actual words are never misattributed.
 */
export function Testimonials() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  if (testimonials.length === 0) return null;

  const isAr = lang === "ar";
  // Duplicated once so the marquee loops seamlessly.
  const rail = [...testimonials, ...testimonials];

  return (
    <Section id="testimonials">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <Eyebrow>What customers say</Eyebrow>
          <h2 className="mt-4 font-display text-[1.75rem] sm:text-4xl">
            <span className="text-chrome">Real reviews,</span>{" "}
            <span className="text-green">word for word</span>
          </h2>
          <p className="mt-4 text-muted">
            Every review below is quoted word for word from our Google Business
            Profile — {site.google.rating.toFixed(1)} stars across{" "}
            {site.google.reviewCount} reviews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            role="group"
            aria-label="Review language"
            className="flex rounded-md border border-line p-0.5"
          >
            {(["en", "ar"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={cn(
                  "rounded px-3 py-1.5 text-sm transition-colors",
                  lang === code ? "bg-green text-paper" : "text-muted hover:text-ink",
                )}
              >
                {code === "en" ? "English" : "العربية"}
              </button>
            ))}
          </div>

          {site.googleBusinessUrl && (
            <a
              href={site.googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-green"
            >
              See on Google
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </Reveal>

      <div
        className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
        role="region"
        aria-label="Customer reviews"
      >
        <ul className="flex w-max animate-marquee gap-5">
          {rail.map((t, i) => {
            const translated = t.original !== lang;
            const text = isAr ? t.ar : t.en;

            return (
              <li
                key={`${t.name}-${i}`}
                className="grad-card flex w-[22rem] shrink-0 flex-col rounded-lg border border-line p-6"
                aria-hidden={i >= testimonials.length ? "true" : undefined}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="flex gap-0.5"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star
                        key={s}
                        className={cn(
                          "h-4 w-4",
                          s < t.rating ? "fill-green text-green" : "text-line",
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                  <span className="text-xs text-muted">{t.when}</span>
                </div>

                <blockquote
                  lang={lang}
                  dir={isAr ? "rtl" : "ltr"}
                  className={cn(
                    "mt-4 flex-1 text-sm leading-relaxed text-muted",
                    isAr && "text-right font-arabic",
                  )}
                >
                  {text}
                </blockquote>

                <footer
                  className={cn(
                    "mt-4 border-t border-line pt-3",
                    isAr && "text-right",
                  )}
                >
                  <p className="text-sm font-medium text-ink">{t.name}</p>
                  <p className="text-xs text-muted">
                    {translated ? "Translated by Google" : "Google review"}
                  </p>
                </footer>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
