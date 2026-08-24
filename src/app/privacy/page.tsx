import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${company.name}.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        meta="EFFECTIVE AUGUST 2026"
      />
      <section className="theme-light bg-bg text-fg">
        <div className="mx-auto max-w-3xl px-5 py-20 md:px-10">
          <div className="type-body space-y-10 text-fg-muted [&_h2]:mt-0 [&_h2]:text-fg [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-6">
            <section>
              <h2 className="type-title">Overview</h2>
              <p className="mt-4">
                This website is operated by {company.name} (&ldquo;ClearEdge&rdquo;).
                We respect your privacy and have designed this website to work
                without collecting or storing personal information on our
                servers.
              </p>
            </section>

            <section>
              <h2 className="type-title">Contact &amp; Quote Inquiries</h2>
              <p className="mt-4">
                When you use the inquiry form on this website, the details you
                enter are used to prepare an email draft in your own email
                application, addressed to us. The information is transmitted by
                your email provider under their privacy practices, and is not
                stored or tracked by this website itself.
              </p>
              <p className="mt-3">
                If you contact us by phone, email, or mail, we use your
                information solely to respond to your inquiry and to discuss
                potential business.
              </p>
            </section>

            <section>
              <h2 className="type-title">What We Do Not Do</h2>
              <ul className="mt-4">
                <li>We do not sell or share your personal information.</li>
                <li>We do not run advertising trackers on this website.</li>
                <li>
                  We do not create accounts or maintain user profiles through
                  this website.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="type-title">Questions</h2>
              <p className="mt-4">
                For any privacy questions or requests, contact us at{" "}
                <a href={`mailto:${company.email}`} className="link-quiet !text-accent">
                  {company.email}
                </a>{" "}
                or write to {company.address.street}, {company.address.city},{" "}
                {company.address.state} {company.address.zip},{" "}
                {company.address.country}.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
