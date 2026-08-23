import Link from "next/link";
import { brands } from "@/content/brands";
import { BrandLogo } from "@/components/ui/BrandLogo";

/**
 * Scrolling strip of the marques we service, straight under the hero. The
 * list renders twice for a seamless loop; the duplicate is aria-hidden so
 * screen readers hear each marque once. Pauses on hover, freezes entirely
 * under reduced motion.
 */
export function BrandMarquee() {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex w-max shrink-0 items-center"
    >
      {brands.map((b) => (
        <li key={b.slug} className="flex items-center">
          <Link
            href={`/${b.slug}`}
            tabIndex={hidden ? -1 : undefined}
            className="group flex items-center gap-3 px-7 py-4 text-muted transition-colors hover:text-ink"
          >
            <span className="h-6 w-6 shrink-0 text-steel transition-colors group-hover:text-green">
              <BrandLogo slug={b.slug} name={b.name} />
            </span>
            <span className="whitespace-nowrap text-sm font-medium tracking-wide">
              {b.name}
            </span>
          </Link>
          <span className="h-1 w-1 rounded-full bg-green/50" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      role="region"
      aria-label="Marques we service"
      className="overflow-hidden border-b border-line bg-paper-2/40 [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]"
    >
      <div className="flex w-max animate-marquee marquee-fast">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
