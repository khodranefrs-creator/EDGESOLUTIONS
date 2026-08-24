import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for the ${company.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        meta="EFFECTIVE AUGUST 2026"
      />
      <section className="theme-light bg-bg text-fg">
        <div className="mx-auto max-w-3xl px-5 py-20 md:px-10">
          <div className="type-body space-y-10 text-fg-muted [&_h2]:mt-0 [&_h2]:text-fg">
            <section>
              <h2 className="type-title">Use of This Website</h2>
              <p className="mt-4">
                This website is provided by {company.name} for general
                information about our company, capabilities, and industries
                served. By using this website you agree to these terms.
              </p>
            </section>

            <section>
              <h2 className="type-title">Informational Purpose</h2>
              <p className="mt-4">
                Content on this website describes our capabilities in general
                terms and does not constitute a specification, quotation, or
                commitment to manufacture. All products and services are
                subject to individual agreement with ClearEdge.
              </p>
            </section>

            <section>
              <h2 className="type-title">Intellectual Property</h2>
              <p className="mt-4">
                The name ClearEdge Solutions, Inc., this website&rsquo;s design,
                text, and graphics are the property of ClearEdge unless
                otherwise noted, and may not be reproduced without permission.
              </p>
            </section>

            <section>
              <h2 className="type-title">Liability</h2>
              <p className="mt-4">
                This website is provided as-is. ClearEdge makes no warranties,
                express or implied, about the completeness or accuracy of the
                information presented, and is not liable for decisions made
                based on it. Technical and commercial details are established
                directly with our team.
              </p>
            </section>

            <section>
              <h2 className="type-title">Contact</h2>
              <p className="mt-4">
                Questions about these terms:{" "}
                <a href={`mailto:${company.email}`} className="link-quiet !text-accent">
                  {company.email}
                </a>{" "}
                · {company.phone}.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
