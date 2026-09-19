import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { company } from "@/lib/evara-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How EvaraTech collects, uses and protects information on this website and in the EvaraOne platform.",
  alternates: { canonical: "/privacy" },
  openGraph: { type: "website", url: "/privacy", title: "Privacy Policy | EvaraTech", description: "How EvaraTech collects, uses and protects information on this website and in the EvaraOne platform.", images: ["/images/og.jpg"] },
  twitter: { card: "summary_large_image", title: "Privacy Policy | EvaraTech", description: "How EvaraTech collects, uses and protects information on this website and in the EvaraOne platform.", images: ["/images/og.jpg"] },
};

export default function PrivacyPage() {
  return (
    <LegalPage kicker="Legal" title="Privacy Policy" updated="19 September 2026">
      <h2>Who we are</h2>
      <p>
        {company.legalName} (&ldquo;EvaraTech&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is a company
        registered in India with its office in {company.hq}. This policy explains what information we
        collect when you use this website and the EvaraOne platform, why we collect it, and the choices you
        have. You can reach us at <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>

      <h2>Information you give us</h2>
      <p>
        When you request a demo or contact us, we collect the details you enter: your name, email address,
        phone number and any message you write. We use them to respond to you and to follow up on your
        enquiry. Form submissions are delivered to us through Web3Forms, a form-processing service that
        handles the message in transit and does not use it for any other purpose.
      </p>

      <h2>Information from the platform</h2>
      <p>
        If your organisation uses EvaraOne, our devices transmit operational readings such as water level,
        flow, consumption, water quality, rainfall and pump electrical data, along with device identifiers
        and timestamps. This is infrastructure data about tanks, borewells, meters and pumps. It is not
        personal data about individuals, and we do not combine it with personal data except for the account
        details needed to give you access to your own sites.
      </p>
      <p>
        Access to platform data is role-based. Customers see only the devices associated with their own
        premises; distributors see only the customers and sites they manage; EvaraTech operations staff
        access data to run, support and improve the service.
      </p>

      <h2>Information collected automatically</h2>
      <p>
        This website is hosted on Vercel, which records standard server logs (IP address, browser type,
        pages requested, timestamps) for security and reliability. We do not run advertising trackers and
        we do not sell data to anyone. If we introduce analytics, we will use a privacy-respecting tool and
        update this policy.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Enquiry details are kept for as long as needed to respond and follow up, and then deleted. Platform
        data is retained for the life of your service agreement, because long-term trends are the point of
        the product, and is deleted or returned on request when the agreement ends.
      </p>

      <h2>Your choices</h2>
      <p>
        You may ask us at any time to see, correct or delete the personal information we hold about you, or
        to stop contacting you. Write to <a href={`mailto:${company.email}`}>{company.email}</a> and we
        will act on it promptly. Under the Digital Personal Data Protection Act, 2023, you also have the
        right to grievance redressal; the same address reaches the person responsible.
      </p>

      <h2>Security</h2>
      <p>
        Device communication to EvaraOne is encrypted end to end. Platform access is protected by
        authentication and role-scoped permissions. No system is perfectly secure, and we will inform
        affected users if a breach affects their data.
      </p>

      <h2>Changes</h2>
      <p>
        We will post any changes to this policy on this page with a new date. Continued use of the website
        or platform after a change means you accept the updated policy.
      </p>
    </LegalPage>
  );
}
