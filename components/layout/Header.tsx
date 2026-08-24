"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { site, telUrl } from "@/config/site";
import { gtagEvent } from "@/lib/gtag";
import { services } from "@/content/services";
import { brandsByFamily, cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { OriginBadge } from "@/components/ui/OriginBadge";
import { BrandLogo } from "@/components/ui/BrandLogo";

const groups = brandsByFamily();

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"brands" | "services" | null>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close every menu on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Lock scroll behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-green focus:px-5 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-line bg-paper/90 backdrop-blur-md"
            : "border-b border-transparent bg-paper",
        )}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${site.name} home`}>
            <Image
              src="/logo.png"
              alt=""
              width={48}
              height={48}
              priority
              className="h-10 w-10"
            />
            <span className="hidden font-display text-xl leading-none sm:block">
              GAS <span className="text-green">AUTO</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main" className="ml-auto hidden items-center gap-5 lg:flex">
            <NavLink href="/">Home</NavLink>

            <DropdownTrigger
              label="Brands"
              open={openMenu === "brands"}
              onToggle={() => setOpenMenu(openMenu === "brands" ? null : "brands")}
            />

            <DropdownTrigger
              label="Services"
              open={openMenu === "services"}
              onToggle={() => setOpenMenu(openMenu === "services" ? null : "services")}
            />

            <NavLink href="/pickup-and-delivery">Pickup &amp; Delivery</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-2">
            <a
              href={telUrl()}
              onClick={() => gtagEvent("call_click", { placement: "header" })}
              className="hidden items-center gap-2 text-sm text-muted transition-colors hover:text-green xl:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone}
            </a>

            <ButtonLink href="/book" size="sm" className="hidden sm:inline-flex">
              Book Pickup
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg border border-line p-2 text-ink lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Desktop mega-menus */}
        <AnimatePresence>
          {openMenu && (
            <>
              <motion.div
                key="mega"
                initial={reduced ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-[var(--header-h)] hidden border-b border-line bg-surface lg:block"
                onMouseLeave={() => setOpenMenu(null)}
              >
                <div className="mx-auto max-w-7xl px-8 py-8">
                  {openMenu === "brands" ? <BrandsMega /> : <ServicesMega />}
                </div>
              </motion.div>
              <button
                type="button"
                aria-hidden="true"
                tabIndex={-1}
                className="fixed inset-0 -z-10 hidden cursor-default lg:block"
                onClick={() => setOpenMenu(null)}
              />
            </>
          )}
        </AnimatePresence>
      </header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "link-underline rounded-md px-1 py-2 text-sm transition-colors",
        active ? "text-green" : "text-ink/75 hover:text-ink",
      )}
    >
      {children}
    </Link>
  );
}

function DropdownTrigger({
  label,
  open,
  onToggle,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseEnter={onToggle}
      aria-expanded={open}
      className={cn(
        "link-underline flex items-center gap-1 rounded-md px-1 py-2 text-sm transition-colors",
        open ? "text-green" : "text-ink/75 hover:text-ink",
      )}
    >
      {label}
      <ChevronDown
        className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        aria-hidden="true"
      />
    </button>
  );
}

/**
 * Two columns, one per family — the same split the home grid and every service
 * page uses, because all of them read from brandsByFamily().
 */
function BrandsMega() {
  return (
    <div className="grid gap-10">
      {groups.map(({ family, brands: list }) => (
        <div key={family.id}>
          <Link
            href={`/${family.hubSlug}`}
            className="group mb-4 flex items-center gap-3 border-b border-line pb-3"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-green">
              {family.label}
            </span>
            <span className="text-xs text-muted transition-colors group-hover:text-green">
              View all →
            </span>
          </Link>

          <ul className="grid gap-1 sm:grid-cols-2">
            {list.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/${b.slug}`}
                  className="group/item flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink transition-colors hover:bg-green-soft hover:text-green"
                >
                  <span className="h-5 w-5 shrink-0 text-muted transition-colors group-hover/item:text-green">
                    <BrandLogo slug={b.slug} name={b.name} />
                  </span>
                  <span className="mr-auto">{b.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ServicesMega() {
  return (
    <div>
      <Link
        href="/services"
        className="group mb-4 flex items-center gap-3 border-b border-line pb-3"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-green">
          All Services
        </span>
        <span className="text-xs text-muted transition-colors group-hover:text-green">
          View all →
        </span>
      </Link>
      <ul className="grid gap-1 sm:grid-cols-3">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="block rounded-lg px-3 py-2 text-sm text-ink transition-colors hover:bg-green-soft hover:text-green"
            >
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="drawer"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          className="fixed inset-0 z-[60] bg-paper lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex h-[var(--header-h)] items-center justify-between px-4">
            <span className="font-display text-xl">
              GAS <span className="text-green">AUTO</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-lg border border-line p-2"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="h-[calc(100dvh-var(--header-h))] overflow-y-auto px-4 pb-32 pt-2"
          >
            <MobileLink href="/" onClose={onClose}>
              Home
            </MobileLink>

            {groups.map(({ family, brands: list }) => (
              <div key={family.id} className="mt-6">
                <Link
                  href={`/${family.hubSlug}`}
                  onClick={onClose}
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-green"
                >
                  {family.label} →
                </Link>
                <ul className="space-y-1 border-l border-line pl-4">
                  {list.map((b) => (
                    <li key={b.slug}>
                      <Link
                        href={`/${b.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-2 py-2 text-ink"
                      >
                        {b.name}
                        <OriginBadge family={b.family} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mt-6">
              <Link
                href="/services"
                onClick={onClose}
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-green"
              >
                Services →
              </Link>
              <ul className="space-y-1 border-l border-line pl-4">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      onClick={onClose}
                      className="block py-2 text-ink"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 space-y-1 border-t border-line pt-4">
              <MobileLink href="/pickup-and-delivery" onClose={onClose}>
                Pickup &amp; Delivery
              </MobileLink>
              <MobileLink href="/about" onClose={onClose}>
                About
              </MobileLink>
              <MobileLink href="/blog" onClose={onClose}>
                Blog
              </MobileLink>
              <MobileLink href="/contact" onClose={onClose}>
                Contact
              </MobileLink>
            </div>

            <ButtonLink href="/book" size="lg" className="mt-8 w-full">
              Book Pickup &amp; Delivery
            </ButtonLink>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileLink({
  href,
  children,
  onClose,
}: {
  href: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="block py-3 text-base font-medium text-ink"
    >
      {children}
    </Link>
  );
}
