import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { company } from "@/lib/evara-data";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms on which EvaraTech makes this website available.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage kicker="Legal" title="Terms of Use" updated="19 September 2026">
      <h2>About these terms</h2>
      <p>
        This website is operated by {company.legalName} (&ldquo;EvaraTech&rdquo;). By using it you agree
        to these terms. They cover the website only. Use of the EvaraOne platform and EvaraTech hardware
        is governed by the service agreement your organisation signs with us, which takes precedence over
        anything here.
      </p>

      <h2>Information on this site</h2>
      <p>
        Product specifications, performance figures and deployment details are published in good faith
        and reflect our products as documented at the time of writing. Specifications may change as
        products are improved, and a figure on a page is not a contractual commitment. For a binding
        specification, ask us for the current datasheet.
      </p>

      <h2>Intellectual property</h2>
      <p>
        EvaraTech, EvaraOne, EvaraTank, EvaraDeep, EvaraFlow, EvaraValve, EvaraAMP, EvaraTDS and EvaraRain
        are names and marks of {company.legalName}. The site&rsquo;s text, images, product renders and
        design belong to us or our licensors. The borewell and tank monitoring method is protected by
        Indian Patent No. 202241055442 and the product designs by registered industrial designs. You may
        view and print pages for your own reference; any other use needs our written permission.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not attempt to gain unauthorised access to the site, the EvaraOne platform, or any device; do
        not scrape the site at scale; and do not use the demo request form to send anything other than a
        genuine enquiry.
      </p>

      <h2>Third-party services</h2>
      <p>
        The site is hosted on Vercel and the contact form is processed by Web3Forms. Their availability is
        outside our control. Links to other websites are provided for convenience and do not mean we
        endorse them.
      </p>

      <h2>Liability</h2>
      <p>
        The website is provided as is. To the extent permitted by law, EvaraTech is not liable for any
        loss arising from reliance on information on the site or from the site being unavailable. Nothing
        in these terms limits liability that cannot be limited under Indian law.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India. Any dispute will be subject to the courts of
        Hyderabad, Telangana.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
    </LegalPage>
  );
}
