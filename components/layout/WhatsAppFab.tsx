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
      className="fixed bottom-6 right-6 z-40 hidden h-12 w-12 items-center justify-center rounded-full bg-green text-paper transition-colors hover:bg-green-deep md:flex"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
