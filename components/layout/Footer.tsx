import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { fullAddress, site, telUrl } from "@/config/site";
import { services } from "@/content/services";
import { brandsByFamily } from "@/lib/utils";

const groups = brandsByFamily();

export function Footer() {
  const year = 2026;

  return (
    <footer className="relative border-t border-line bg-paper-2">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          {/* NAP block — must stay byte-identical to the Google Business Profile */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="" width={52} height={52} className="h-12 w-12" />
              <span className="font-display text-xl leading-none">
                <span className="text-chrome">GAS</span>{" "}
                <span className="text-green">AUTO</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Range Rover and Land Rover specialists, and German car experts, in
              Sharjah — with car pickup and delivery across the UAE.
            </p>

            <address className="mt-5 space-y-3 text-sm not-italic text-muted">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
                <span>{fullAddress}</span>
              </p>
              <p className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
                <a href={telUrl()} className="transition-colors hover:text-green">
                  {site.phone}
                </a>
              </p>
              <p className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-green"
                >
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          {/* Brands — grouped by family, same as everywhere else */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Brands
            </h2>
            {groups.map(({ family, brands: list }) => (
              <div key={family.id} className="mt-4">
                <Link
                  href={`/${family.hubSlug}`}
                  className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-green transition-opacity hover:opacity-80"
                >
                  {family.label}
                </Link>
                <ul className="mt-2 space-y-1.5">
                  {list.map((b) => (
                    <li key={b.slug}>
                      <Link
                        href={`/${b.slug}`}
                        className="text-sm text-muted transition-colors hover:text-green"
                      >
                        {b.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Services
            </h2>
            <ul className="mt-4 space-y-1.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-muted transition-colors hover:text-green"
                  >
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Opening Hours
            </h2>
            <ul className="mt-4 space-y-2">
              {site.hoursHuman.map((h) => (
                <li key={h.label} className="flex justify-between gap-4 text-sm">
                  <span className="text-muted">{h.label}</span>
                  <span className="text-ink">{h.value}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 flex items-start gap-3 rounded-xl border border-green/30 bg-green-soft p-3 text-sm text-muted">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
              Pickup &amp; delivery across all seven emirates. We quote the
              collection charge up front, before you commit.
            </p>

            <ul className="mt-5 space-y-1.5">
              <li>
                <Link
                  href="/pickup-and-delivery"
                  className="text-sm text-muted transition-colors hover:text-green"
                >
                  Pickup &amp; Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-sm text-muted transition-colors hover:text-green"
                >
                  Book a Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted transition-colors hover:text-green"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted transition-colors hover:text-green"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5 text-xs text-muted">
            <Link href="/privacy-policy" className="transition-colors hover:text-green">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-green">
              Terms
            </Link>
            <a
              href="https://prismal.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-green"
            >
              Site by Prismal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
