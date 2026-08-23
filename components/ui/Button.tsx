import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "quiet";
type Size = "sm" | "md" | "lg";

/**
 * Motion is baked into the base, so every button on the site animates without
 * call sites having to opt in:
 *   btn-press  — lift on hover, press down on click, and nudge any .btn-icon
 *   btn-shine  — chrome highlight sweeping across on hover
 * Variants add their own: primary pans a logo-green gradient continuously,
 * outline grows a green wash in from the left. All of it stops under
 * prefers-reduced-motion (see globals.css).
 */
const base =
  "btn-press btn-shine relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md font-medium disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "btn-gradient text-paper shadow-[0_1px_0_rgba(255,255,255,0.15)_inset]",
  outline: "btn-outline-fill border border-green/35 text-ink hover:border-green hover:text-green",
  quiet: "link-underline text-green hover:text-green-deep",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-[0.9375rem]",
};

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: Common & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <span className="relative z-[2] inline-flex items-center gap-2">{children}</span>
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: Common & ComponentProps<typeof Link>) {
  const external = typeof href === "string" && /^(https?:|tel:|mailto:)/.test(href);
  const inner = <span className="relative z-[2] inline-flex items-center gap-2">{children}</span>;

  if (external) {
    return (
      <a
        href={href as string}
        className={cn(base, variants[variant], sizes[size], className)}
        {...(href.toString().startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {inner}
    </Link>
  );
}
