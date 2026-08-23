import type { Metadata } from "next";
import { site } from "@/config/site";
import { homeFaqs } from "@/content/faqs";
import { Hero } from "@/components/sections/Hero";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { BrandGrid } from "@/components/sections/BrandGrid";
import { PickupBand } from "@/components/sections/PickupBand";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { WhyUs } from "@/components/sections/WhyUs";
import { WorkshopFilm } from "@/components/sections/WorkshopFilm";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/schema/JsonLd";
import { faqSchema } from "@/components/schema/schemas";

export const metadata: Metadata = {
  title: { absolute: "Car Repair Sharjah | Range Rover, Defender & Jaguar — GAS AUTO" },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <BrandMarquee />
      <BrandGrid />
      <PickupBand />
      <ServiceGrid />
      <WhyUs />
      <WorkshopFilm />
      <Process />
      <Testimonials />
      <ServiceAreas />
      <Faq items={homeFaqs} />
      <Cta />
    </>
  );
}
