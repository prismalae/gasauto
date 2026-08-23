import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/schema/JsonLd";
import { breadcrumbSchema } from "@/components/schema/schemas";

const description =
  "Car repair and servicing in Sharjah: air suspension, engine, gearbox, AC, diagnostics, electrical, brakes and periodic servicing for Range Rover and German cars. UAE-wide pickup and delivery.";

export const metadata: Metadata = {
  title: { absolute: "Car Service & Repair in Sharjah | All Services — GAS AUTO" },
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Car Service & Repair in Sharjah | All Services — GAS AUTO",
    description,
    url: `${site.domain}/services`,
    type: "website",
  },
};

const crumbs = [
  { name: "Home", url: "/" },
  { name: "Services", url: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow="What we do"
        title={
          <>
            <span className="text-chrome">Car Service &amp; Repair</span>{" "}
            <span className="text-green">in Sharjah</span>
          </>
        }
        intro="Nine core services covering everything from a periodic oil change to a full engine rebuild. Every one of them starts with a proper diagnosis and a written quote — and every one of them can be booked with pickup and delivery anywhere in the UAE."
        crumbs={crumbs}
      />

      <ServiceGrid heading={false} />
      <Cta />
    </>
  );
}
