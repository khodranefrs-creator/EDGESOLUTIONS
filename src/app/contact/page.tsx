import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Inview } from "@/components/inview";
import { ContactForm } from "@/components/contact-form";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact / Request a Quote",
  description:
    "Request a quote or contact ClearEdge Solutions — 1020 Rock Ave, San Jose, CA 95131. Phone (408) 649-3435 · info@ClearEdgeSolutions.com.",
  alternates: { canonical: "/contact" },
};

const contactRows = [
  {
    k: "Address",
    v: `${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}, ${company.address.country}`,
    href: undefined,
  },
  { k: "Phone", v: company.phone, href: `tel:${company.phoneHref}` },
  { k: "Email", v: company.email, href: `mailto:${company.email}` },
  { k: "Website", v: "www.ClearEdgeSolutions.com", href: company.url },
];

/* CONTACT — where the connection resolves.
   The narrative ends in a physical action: direct lines on one side,
   the inquiry form on the other. */

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Tell us what needs to&nbsp;connect.
          </>
        }
        lede="Share your requirement and the right people at ClearEdge will respond — engineers included."
      />

      <section className="theme-light bg-bg text-fg">
        <div className="mx-auto grid max-w-[84rem] gap-14 px-5 py-20 md:px-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:py-28">
          <div>
            <Inview>
              <p className="label-mono !text-[0.62rem] text-fg-faint">Direct lines</p>
              <h2 className="display-m mt-6 !text-[clamp(1.9rem,1.4rem+2.2vw,3rem)]">
                ClearEdge Solutions,&nbsp;Inc.
              </h2>
              <p className="type-body mt-6 max-w-md text-fg-muted">
                Located in the heart of Silicon Valley. Reach out for quotes,
                engineering questions, or build-to-print manufacturing
                inquiries.
              </p>
            </Inview>

            <Inview delay={140}>
              <dl className="mt-10 border-t border-line-strong">
                {contactRows.map((row) => (
                  <div
                    key={row.k}
                    className="flex flex-col justify-between gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <dt className="meta-mono shrink-0 !text-[0.62rem] text-fg-faint">{row.k}</dt>
                    <dd className="text-sm font-medium sm:text-right">
                      {row.href ? (
                        <a href={row.href} className="transition-colors hover:text-accent">
                          {row.v}
                        </a>
                      ) : (
                        row.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Inview>
          </div>

          <Inview delay={100}>
            <div id="quote-form" className="scroll-mt-28">
              <ContactForm />
            </div>
          </Inview>
        </div>
      </section>
    </>
  );
}
