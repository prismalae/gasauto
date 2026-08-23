import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply to work carried out by ${site.name} and to the use of this website.`,
  alternates: { canonical: "/terms" },
};

const crumbs = [
  { name: "Home", url: "/" },
  { name: "Terms", url: "/terms" },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        title={<span className="text-chrome">Terms of Service</span>}
        crumbs={crumbs}
        intro="The terms that apply to repairs and servicing we carry out, and to your use of this website."
      />

      <Section>
        <Prose>
          {/* TODO_CLIENT: have a legal advisor review these against your actual
              trading terms, warranty period and storage policy before launch. */}
          <h2>Quotations and approval</h2>
          <p>
            We provide a written quotation after diagnosis. No chargeable repair
            work is carried out until you approve that quotation. If additional
            work becomes necessary once a job is underway, we will stop and
            obtain your approval before continuing.
          </p>

          <h2>Diagnostic charges</h2>
          <p>
            Diagnosis takes time and specialist equipment and may be chargeable.
            Where a charge applies, we will tell you before we begin, along with
            how it is treated if you go ahead with the repair.
          </p>

          <h2>Parts</h2>
          <p>
            We fit genuine or OEM-equivalent parts as standard and will tell you
            which is being used. Where a quality aftermarket alternative is
            offered, it is presented as your choice and noted on the invoice.
          </p>

          <h2>Warranty</h2>
          <p>
            Repairs are covered by a workshop warranty on parts and labour. The
            applicable period depends on the work carried out and the parts
            fitted, and is stated on your invoice. The warranty does not cover
            wear items, damage caused by misuse or accident, or faults arising
            from work carried out elsewhere.
          </p>

          <h2>Pickup and delivery</h2>
          <p>
            Pickup and delivery is a chargeable service available across the
            United Arab Emirates. The charge depends on your location, the
            distance from our workshop and whether the vehicle requires recovery
            equipment, and it is quoted and agreed with you before a driver is
            dispatched. Vehicles are covered while in our care. We ask that you
            remove valuables from the vehicle before collection.
          </p>

          <h2>Vehicle collection after work</h2>
          <p>
            Please collect your vehicle, or accept delivery of it, promptly once
            we notify you that work is complete. Storage charges may apply to
            vehicles left for an extended period after completion.
          </p>

          <h2>Website content</h2>
          <p>
            Information on this website — including descriptions of common
            faults and maintenance intervals — is general guidance for vehicle
            owners in the UAE. It is not a diagnosis of your specific vehicle.
            Always have a fault inspected before acting on it.
          </p>

          <h2>Contact</h2>
          <p>
            {site.legalName} · {site.street}, {site.city}
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a> · {site.phone}
          </p>
        </Prose>
      </Section>
    </>
  );
}
