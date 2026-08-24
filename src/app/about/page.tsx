import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Inview } from "@/components/inview";
import { TechnicalLabel, ArrowLink, SectionIndex } from "@/components/ui";
import { CTASection } from "@/components/cta-section";
import { company, productFamilies, differentiators } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "ClearEdge Solutions designs and manufactures advanced connectivity and assembly solutions in the heart of Silicon Valley — fiber optic, copper cable assembly, and electro-mechanical box build products.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    index: "01",
    name: "Engineering Excellence",
    body: "Driven by engineering excellence, we deliver products that meet the most demanding performance and quality standards — from concept to production.",
  },
  {
    index: "02",
    name: "Customer-First Mindset",
    body: "Our mission is to enable technology driven industries with the connectivity and integration they need to thrive in a connected world. Every engagement starts with your requirements.",
  },
  {
    index: "03",
    name: "Agility With Precision",
    body: "Our approach combines agility with technical excellence — responsive service without compromising the exactness your build demands.",
  },
];

const complexTraits = [
  {
    term: "Complex Customized Builds",
    body: "We specialize where requirements don't fit a catalogue — builds engineered around your design, not the other way around.",
  },
  {
    term: "Diverse Product Configurations",
    body: "Wide variation across products and configurations is not an exception here. It is how we work, managed with discipline.",
  },
  {
    term: "Smaller Production Volumes",
    body: "Each solution is engineered to meet exact performance and design requirements — at volumes larger operations overlook.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About ClearEdge"
        title={
          <>
            The engineering partner behind precise&nbsp;connections.
          </>
        }
        lede="Located in the heart of Silicon Valley, ClearEdge Solutions designs and manufactures advanced connectivity and assembly solutions that keep technology moving."
        meta="COMPANY DOSSIER"
      />

      {/* position */}
      <section className="theme-light bg-bg text-fg" aria-labelledby="position-heading">
        <div className="mx-auto grid max-w-[84rem] gap-12 px-5 py-20 md:px-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:py-28">
          <Inview>
            <TechnicalLabel>Position</TechnicalLabel>
          </Inview>
          <div>
            <Inview>
              <h2 id="position-heading" className="type-display-m max-w-2xl">
                Designer and manufacturer of the connections technology
                depends&nbsp;on.
              </h2>
              <p className="type-body measure mt-8 text-fg-muted">
                Our mission is to enable technology driven industries with
                the connectivity and integration they need to thrive in a
                connected world. From concept to production, ClearEdge
                partners with clients to design innovative, scalable
                solutions that support their most critical applications.
              </p>
            </Inview>
            <Inview delay={120}>
              {/* disciplines */}
              <ol className="mt-12 border-t border-line-strong">
                {productFamilies.map((family) => (
                  <li key={family.id}>
                    <Link
                      href={`/products#${family.id}`}
                      aria-label={`${family.name} — view product family`}
                      className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-6 border-b border-line py-6 transition-colors duration-200 hover:bg-surface sm:gap-x-10"
                    >
                      <span className="label-mono !text-[0.72rem] text-fg-faint transition-colors group-hover:text-accent">
                        {family.index}
                      </span>
                      <span>
                        <span className="type-title block transition-colors duration-200 group-hover:text-accent">
                          {family.name}
                        </span>
                        <span className="mt-1 block text-sm text-fg-muted">{family.tagline}</span>
                      </span>
                      <svg
                        width="18"
                        height="14"
                        viewBox="0 0 14 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                        className="text-fg-faint transition-all duration-200 group-hover:translate-x-1.5 group-hover:text-accent"
                      >
                        <path d="M0 5h12M8 1l4 4-4 4" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ol>
            </Inview>
          </div>
        </div>
      </section>

      {/* principles */}
      <section className="bg-bg-deep text-fg" aria-labelledby="principles-heading">
        <div className="mx-auto grid max-w-[84rem] gap-12 px-5 py-20 md:px-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20 lg:py-32">
          <div>
            <Inview>
              <SectionIndex n="P" />
              <TechnicalLabel className="mt-6">How we think</TechnicalLabel>
              <h2 id="principles-heading" className="type-display-l mt-6">
                Principles we engineer&nbsp;by.
              </h2>
            </Inview>
          </div>
          <ol>
            {principles.map((p, i) => (
              <li key={p.index}>
                <Inview delay={i * 90}>
                  <div className="hairline-t grid gap-3 py-8 sm:grid-cols-[4rem_1fr] sm:gap-8 first:border-t first:border-line-strong">
                    <span className="label-mono !text-[0.72rem] text-accent">{p.index}</span>
                    <div>
                      <h3 className="type-title">{p.name}</h3>
                      <p className="type-body mt-3 text-fg-muted">{p.body}</p>
                    </div>
                  </div>
                </Inview>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* built for the complex */}
      <section className="theme-light bg-bg text-fg" aria-labelledby="complex-heading">
        <div className="mx-auto max-w-[84rem] px-5 py-20 md:px-10 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
            <Inview className="lg:order-2">
              <TechnicalLabel>Built for the complex</TechnicalLabel>
              <h2 id="complex-heading" className="type-display-m mt-6">
                Distinguished by complexity, delivered with&nbsp;efficiency.
              </h2>
              <p className="type-body measure mt-6 text-fg-muted">
                ClearEdge Solutions is distinguished by its ability to deliver
                complex, customized builds with efficiency and precision —
                combining agility with technical excellence to provide unmatched
                value and reliability.
              </p>
            </Inview>
            <dl className="lg:order-1">
              {complexTraits.map((t, i) => (
                <Inview key={t.term} delay={i * 90}>
                  <div className="hairline-t py-7 first:border-t first:border-line-strong">
                    <dt className="type-title">{t.term}</dt>
                    <dd className="type-body mt-2 text-fg-muted">{t.body}</dd>
                  </div>
                </Inview>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* specification of trust */}
      <section className="bg-bg text-fg" aria-labelledby="trust-heading">
        <div className="mx-auto max-w-[84rem] px-5 py-20 md:px-10 lg:py-28">
          <Inview>
            <TechnicalLabel>Specification of trust</TechnicalLabel>
            <h2 id="trust-heading" className="type-display-m mt-6 max-w-2xl">
              What a buyer can hold us&nbsp;to.
            </h2>
          </Inview>
          <Inview delay={120}>
            <dl className="mt-12 grid gap-x-16 border-t border-line-strong sm:grid-cols-2">
              {differentiators.map((d, i) => (
                <div key={d.term} className="flex items-baseline justify-between gap-6 border-b border-line py-3.5">
                  <dt className="flex min-w-0 items-baseline gap-4">
                    <span className="label-mono shrink-0 !text-[0.62rem] text-fg-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate text-sm font-medium">{d.term}</span>
                  </dt>
                  <dd className="hidden shrink-0 text-xs text-fg-faint lg:block">{d.note}</dd>
                </div>
              ))}
            </dl>
          </Inview>
        </div>
      </section>

      {/* partnership statement */}
      <section className="theme-light bg-bg text-fg" aria-label="Partnership philosophy">
        <div className="mx-auto max-w-4xl px-5 py-24 text-center md:px-10 lg:py-36">
          <Inview>
            <blockquote>
              <p className="type-display-m leading-snug">
                &ldquo;We partner with our customers to transform ideas into
                reality.&rdquo;
              </p>
            </blockquote>
            <p className="label-mono mt-8 !tracking-[0.18em] text-fg-muted">
              Trusted quality · Responsive service · Scalable solutions
            </p>
          </Inview>
          <Inview delay={150}>
            <ArrowLink href="/capabilities" className="mt-10">
              See what we build
            </ArrowLink>
          </Inview>
        </div>
      </section>

      {/* company details */}
      <section className="bg-bg-deep text-fg" aria-labelledby="details-heading">
        <div className="mx-auto grid max-w-[84rem] gap-10 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Inview>
            <TechnicalLabel>Company details</TechnicalLabel>
            <h2 id="details-heading" className="type-display-m mt-6">
              {company.name}
            </h2>
          </Inview>
          <Inview delay={100}>
            <dl className="border-t border-line-strong">
              {[
                {
                  k: "Location",
                  v: `${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}, ${company.address.country}`,
                },
                { k: "Phone", v: company.phone, href: `tel:${company.phoneHref}` },
                { k: "Email", v: company.email, href: `mailto:${company.email}` },
                { k: "Website", v: "www.ClearEdgeSolutions.com", href: company.url },
              ].map((row) => (
                <div key={row.k} className="flex flex-col justify-between gap-1 border-b border-line py-4 sm:flex-row sm:items-baseline sm:gap-8">
                  <dt className="label-mono shrink-0 !text-[0.62rem] text-fg-faint">{row.k}</dt>
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
      </section>

      <CTASection />
    </>
  );
}
