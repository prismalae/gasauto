"use client";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site, whatsappUrl } from "@/config/site";
import { brands } from "@/content/brands";

/**
 * Desktop WhatsApp button. The prefilled message names the marque of the page
 * the visitor is on, so the enquiry arrives with context attached.
 */
export function WhatsAppFab() {
  const pathname = usePathname();
  const brand = brands.find((b) => pathname === `/${b.slug}`);

  const message = brand
    ? `Hi ${site.name}, I have a ${brand.name} and I'd like to ask about a repair.`
    : `Hi ${site.name}, I'd like to ask about a repair for my car.`;

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      // Visible at every viewport. On mobile it sits above the sticky action
      // bar rather than hiding behind the md: breakpoint — the WhatsApp button
      // should never be the thing that disappears on a phone-sized screen.
      className="fab-ping fixed bottom-24 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_rgba(0,0,0,0.45)] transition-colors hover:bg-[#1fb355] md:bottom-6 md:right-6"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
