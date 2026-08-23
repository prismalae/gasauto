"use client";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Phone, Truck } from "lucide-react";
import { site, telUrl, whatsappUrl } from "@/config/site";

/** Sticky call / WhatsApp / book bar below 768px. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-3 divide-x divide-line pb-[env(safe-area-inset-bottom)]">
        <a
          href={telUrl()}
          className="flex flex-col items-center gap-1 py-2.5 text-xs text-ink"
        >
          <Phone className="h-5 w-5 text-green" aria-hidden="true" />
          Call
        </a>
        <a
          href={whatsappUrl(`Hi ${site.name}, I'd like to ask about a repair for my car.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-2.5 text-xs text-ink"
        >
          <WhatsAppIcon className="h-5 w-5 text-green" />
          WhatsApp
        </a>
        <Link
          href="/book"
          className="flex flex-col items-center gap-1 bg-green py-2.5 text-xs font-medium text-paper"
        >
          <Truck className="h-5 w-5" aria-hidden="true" />
          Pickup
        </Link>
      </div>
    </div>
  );
}
