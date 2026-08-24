"use client";

import Link from "next/link";
import { Phone, Truck } from "lucide-react";
import { telUrl } from "@/config/site";
import { gtagEvent } from "@/lib/gtag";

/**
 * Sticky call / book bar below 768px.
 *
 * Deliberately no WhatsApp entry: the floating WhatsApp button is visible on
 * every viewport and sits directly above this bar — one channel, one button.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 divide-x divide-line pb-[env(safe-area-inset-bottom)]">
        <a
          href={telUrl()}
          onClick={() => gtagEvent("call_click", { placement: "action_bar" })}
          className="flex flex-col items-center gap-1 py-2.5 text-xs text-ink"
        >
          <Phone className="h-5 w-5 text-green" aria-hidden="true" />
          Call
        </a>
        <Link
          href="/book"
          className="flex flex-col items-center gap-1 bg-green py-2.5 text-xs font-medium text-paper"
        >
          <Truck className="h-5 w-5" aria-hidden="true" />
          Book Pickup
        </Link>
      </div>
    </div>
  );
}
