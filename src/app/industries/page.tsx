import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Inview } from "@/components/inview";
import { CTASection } from "@/components/cta-section";
import { industries, familiesForIndustry } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "ClearEdge Solutions serves technology-driven industries including data centers, semiconductor equipment, automotive, and clean energy with engineered connectivity and assembly solutions.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title={
          <>
            Connectivity for the industries that can&rsquo;t afford
            unreliable.
          </>
        }
        lede="We serve technology-driven industries — where performance requirements are exacting and dependability is the baseline, not the goal."
        meta="APPLICATION MAP / 04 DESTINATIONS"
      />

      <section className="theme-light bg-bg text-fg" aria-label="Industry application map">
        <div className="mx-auto max-w-[84rem] px-5 py-16 md:px-10 lg:py-24">
          <Inview>
            <p className="label-mono mb-12 flex items-center gap-4 text-fg-faint" aria-hidden="true">
              <span>INDUSTRY</span>
              <span className="text-accent">↓</span>
              <span>APPLICATION</span>
              <span className="h-[1px] flex-1 bg-line" />
              <span>PRODUCT FAMILY</span>
            </p>
          </Inview>

          {industries.map((industry, i) => {
            const related = familiesForIndustry(industry.id);
            return (
              <Inview key={industry.id}>
                <article
                  id={industry.id}
                  aria-labelledby={`${industry.id}-heading`}
                  className={`group scroll-mt-28 border-b border-line py-10 md:py-14 ${
                    i === 0 ? "border-t border-line-strong" : ""
                  }`}
                >
                  <div className="grid gap-8 lg:grid-cols-[7rem_1fr_auto] lg:items-start lg:gap-x-14">
                    <span
                      aria-hidden="true"
                      className="type-index !text-[clamp(1.8rem,1.5rem+2vw,3rem)] text-fg-faint transition-colors duration-200 group-hover:text-accent"
                    >
                      {industry.index}
                    </span>

                    <div>
                      <h2
                        id={`${industry.id}-heading`}
                        className="type-display-m !text-[clamp(1.7rem,1.45rem+1.6vw,2.75rem)] leading-[1.04]"
                      >
                        {industry.name}
                      </h2>
                      <p className="type-lede mt-4 max-w-xl !text-[1.05rem] text-fg-muted">
                        {industry.line}
                      </p>

                      {/* chain: application → family → discipline */}
                      <div className="mt-8 grid gap-x-14 gap-y-8 md:grid-cols-[auto_1fr]">
                        <div>
                          <p className="label-mono !text-[0.6rem] text-fg-faint">Connected product families</p>
                          <ul className="mt-3 space-y-2">
                            {related.map((family) => (
                              <li key={family.id}>
                                <Link
                                  href={`/products#${family.id}`}
                                  className="link-quiet inline-flex items-center gap-3 text-sm"
                                >
                                  <span className="label-mono !text-[0.58rem] text-accent">{family.index}</span>
                                  {family.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="label-mono !text-[0.6rem] text-fg-faint">Disciplines applied</p>
                          <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-muted">
                            Engineering collaboration from design through
                            documentation to manufacturing — delivered as a
                            build-to-print partner with strict quality
                            standards throughout.
                          </p>
                          <Link
                            href="/capabilities#engineering"
                            className="link-quiet mt-3 inline-block text-sm"
                          >
                            See how we engage
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* destination marker */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="hidden h-14 w-14 shrink-0 text-fg-faint lg:block"
                    >
                      <rect x="6" y="6" width="36" height="36" opacity="0.5" />
                      <path d="M24 6v18M24 24l12 12" />
                      <circle cx="24" cy="24" r="2.4" fill="#0092fc" stroke="none" />
                    </svg>
                  </div>
                </article>
              </Inview>
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}
