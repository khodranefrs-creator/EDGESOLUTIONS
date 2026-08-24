import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Inview } from "@/components/inview";
import { ArrowLink } from "@/components/ui";
import { CTASection } from "@/components/cta-section";
import { company, productFamilies } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "ClearEdge Solutions designs and manufactures advanced connectivity and assembly solutions in the heart of Silicon Valley — fiber optic, copper cable assembly, and electro-mechanical box build products.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    name: "Engineering excellence.",
    body: "Driven by engineering excellence, we deliver products that meet the most demanding performance and quality standards — from concept to production.",
  },
  {
    name: "Customer-first mindset.",
    body: "Our mission is to enable technology driven industries with the connectivity and integration they need to thrive in a connected world. Every engagement starts with your requirements.",
  },
  {
    name: "Agility with precision.",
    body: "Our approach combines agility with technical excellence — responsive service without compromising the exactness your build demands.",
  },
];

const complexTraits = [
  {
    term: "Complex customized builds",
    body: "We specialize where requirements don't fit a catalogue — builds engineered around your design, not the other way around.",
  },
  {
    term: "Diverse product configurations",
    body: "Wide variation across products and configurations is not an exception here. It is how we work, managed with discipline.",
  },
  {
    term: "Smaller production volumes",
    body: "Each solution is engineered to meet exact performance and design requirements — at volumes larger operations overlook.",
  },
];

/* COMPANY DOSSIER — an editorial document, not a slide deck.
   Position stated once, work shown plainly, principles argued in
   prose. No value cards, no iconography — typography does the work. */

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
      />

      {/* the editorial sheet */}
      <section className="bg-bg text-fg" aria-labelledby="position-heading">
        <div className="mx-auto max-w-[84rem] px-5 py-20 md:px-10 md:py-32">
          <Inview>
            <h2 id="position-heading" className="display-l max-w-4xl">
              Designer and manufacturer of the connections technology depends&nbsp;on.
            </h2>
          </Inview>

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Inview delay={100}>
              <p className="type-body measure text-fg-muted">
                Our mission is to enable technology driven industries with
                the connectivity and integration they need to thrive in a
                connected world. From concept to production, ClearEdge
                partners with clients to design innovative, scalable
                solutions that support their most critical applications.
              </p>
              <p className="type-body measure mt-6 text-fg-muted">
                The company&rsquo;s position is deliberate: between the
                requirement and the running system. Connectors are never the
                part everyone sees — and never allowed to be the reason a
                system stops.
              </p>
            </Inview>
            <Inview delay={180}>
              <p className="type-body measure text-fg-muted">
                ClearEdge Solutions is distinguished by its ability to
                deliver complex, customized builds with efficiency and
                precision — combining agility with technical excellence to
                provide unmatched value and reliability.
              </p>
              <p className="type-body measure mt-6 text-fg-muted">
                Trusted quality, responsive service, and scalable solutions
                are the terms on which customers hold the company to its
                word.
              </p>
            </Inview>
          </div>

          {/* the work */}
          <Inview delay={120}>
            <div className="mt-24">
              <h3 className="label-mono !text-[0.62rem] text-fg-faint">The work</h3>
              <ul className="mt-7 border-t border-line-strong">
                {productFamilies.map((family) => (
                  <li key={family.id} className="border-b border-line">
                    <Link
                      href={`/products#${family.id}`}
                      aria-label={`${family.name} — view product family`}
                      className="group flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2 py-7"
                    >
                      <span className="font-display text-[clamp(1.5rem,1.2rem+1.8vw,2.4rem)] font-semibold leading-tight tracking-tight transition-colors duration-200 group-hover:text-accent">
                        {family.name}
                      </span>
                      <span className="flex items-center gap-6">
                        <span className="max-w-xs text-right text-sm text-fg-muted">{family.tagline}.</span>
                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-1.5">
                          <path d="M0 7h15M10 1l6 6-6 6" />
                        </svg>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Inview>

          {/* built for the complex */}
          <div className="mt-24 grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
            <Inview>
              <h3 className="display-m max-w-md !text-[clamp(1.8rem,1.4rem+2.2vw,3rem)]">
                Distinguished by complexity, delivered with&nbsp;efficiency.
              </h3>
            </Inview>
            <dl>
              {complexTraits.map((t, i) => (
                <Inview key={t.term} delay={i * 90}>
                  <div className="border-b border-line py-7 first:border-t first:border-line-strong">
                    <dt className="type-title">{t.term}</dt>
                    <dd className="type-body mt-2 max-w-lg text-fg-muted">{t.body}</dd>
                  </div>
                </Inview>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* principles — night reflection */}
      <section className="theme-dark bg-bg-deep text-fg" aria-labelledby="principles-heading">
        <div className="mx-auto max-w-[84rem] px-5 py-20 md:px-10 md:py-32">
          <Inview>
            <h2 id="principles-heading" className="display-l max-w-3xl">
              Principles we engineer&nbsp;by.
            </h2>
          </Inview>
          <div className="mt-16 grid gap-x-20 gap-y-14 md:grid-cols-3">
            {principles.map((p, i) => (
              <Inview key={p.name} delay={i * 110}>
                <h3 className="type-title !text-xl">{p.name}</h3>
                <p className="type-body mt-4 text-fg-muted">{p.body}</p>
              </Inview>
            ))}
          </div>

          <Inview delay={140}>
            <blockquote className="mt-24 border-t border-line pt-16 md:mt-32">
              <p className="display-m max-w-3xl !text-[clamp(1.9rem,1.5rem+2.6vw,3.4rem)] leading-[1.08]">
                &ldquo;We partner with our customers to transform ideas into
                reality.&rdquo;
              </p>
            </blockquote>
          </Inview>
        </div>
      </section>

      {/* company details */}
      <section className="bg-bg-warm text-fg" aria-labelledby="details-heading">
        <div className="mx-auto grid max-w-[84rem] gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Inview>
            <h2 id="details-heading" className="display-m">
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
            <ArrowLink href="/capabilities" className="mt-9">
              See what we build
            </ArrowLink>
          </Inview>
        </div>
      </section>

      <CTASection />
    </>
  );
}
