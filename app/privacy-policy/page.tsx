import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects the personal information you provide through this website.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const crumbs = [
  { name: "Home", url: "/" },
  { name: "Privacy Policy", url: "/privacy-policy" },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title={<span className="text-chrome">Privacy Policy</span>}
        crumbs={crumbs}
        intro="This policy explains what we collect when you contact us or book a collection, and what we do with it."
      />

      <Section>
        <Prose>
          {/* TODO_CLIENT: have this reviewed against your actual data handling
              and UAE Federal Decree-Law No. 45 of 2021 obligations. */}
          <p>
            <strong>Last updated:</strong> this policy applies to the {site.domain} website
            operated by {site.legalName}.
          </p>

          <h2>What we collect</h2>
          <p>
            When you submit the booking form or contact us, we collect the
            details you provide: your name, phone number, email address if you
            give one, your vehicle make, model and year, the service you need,
            your pickup area and any description of the fault.
          </p>

          <h2>Why we collect it</h2>
          <ul>
            <li>To contact you and arrange a collection or appointment</li>
            <li>To prepare a diagnosis and quotation for your vehicle</li>
            <li>To keep a service record for work we have carried out</li>
            <li>To respond to questions you send us</li>
          </ul>

          <h2>What we do not do</h2>
          <p>
            We do not sell your personal information, and we do not share it
            with third parties for marketing. We share it only where necessary
            to carry out the work you have asked for — for example with a parts
            supplier — or where we are required to by law.
          </p>

          <h2>How long we keep it</h2>
          <p>
            Enquiry details are kept only as long as needed to respond. Service
            and repair records are retained for as long as necessary to support
            any warranty on the work and to meet our legal and accounting
            obligations.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            This website does not set advertising or tracking cookies. If
            analytics are added in future, this policy will be updated to say
            what is collected and how to opt out.
          </p>

          <h2>Your rights</h2>
          <p>
            You may ask us what personal information we hold about you, ask us
            to correct it, or ask us to delete it where we are not required to
            keep it. Contact us at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> or on {site.phone}.
          </p>

          <h2>Contact</h2>
          <p>
            {site.legalName}
            <br />
            {site.street}, {site.city}, {site.countryName}
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a> · {site.phone}
          </p>
        </Prose>
      </Section>
    </>
  );
}
