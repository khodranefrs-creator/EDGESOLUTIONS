import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Inview } from "@/components/inview";
import { TechnicalLabel } from "@/components/ui";
import { ConductorSeam } from "@/components/conductor";
import { CTASection } from "@/components/cta-section";
import { industries, familiesForIndustry } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "ClearEdge Solutions serves technology-driven industries including data centers, semiconductor equipment, automotive, and clean energy with engineered connectivity and assembly solutions.",
  alternates: { canonical: "/industries" },
};

/* CONDUCTOR SYSTEM v2 — fan-out map.
   The three product families sit on one source bus; every verified
   relation to an industry is drawn as one continuous curve landing
   on that industry's terminal. Relations come straight from the
   site's single-source data layer — nothing invented. */

const familyBusY = [65, 215, 365];
const industryY = [55, 175, 295, 415];

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

      {/* fan-out system map */}
      <section className="bg-bg text-fg" aria-labelledby="fanout-heading">
        <div className="mx-auto max-w-[84rem] px-5 pb-20 pt-16 md:px-10 lg:pb-24">
          <Inview>
            <TechnicalLabel>System map</TechnicalLabel>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
              <h2 id="fanout-heading" className="type-display-m max-w-xl">
                Three families. Four destinations.
              </h2>
              <p className="label-mono hidden !text-[0.6rem] text-fg-faint sm:block" aria-hidden="true">
                SIX VERIFIED PATHWAYS
              </p>
            </div>
          </Inview>

          <p className="sr-only">
            Diagram of verified relations between product families and
            industries: Fiber Optic cable assemblies serve Data Centers and
            Semiconductor Equipment; Copper cable assemblies serve Data
            Centers and Automotive; Electro-Mechanical box builds serve
            Semiconductor Equipment and Clean Energy.
          </p>

          <Inview variant="draw" delay={120} className="mt-12 hidden text-line-strong md:block">
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 430"
              fill="none"
              className="block h-auto w-full"
            >
              {/* source bus joining the three families */}
              <line x1="150" y1="65" x2="150" y2="365" stroke="currentColor" strokeWidth="1" opacity="0.4" pathLength={1} />

              {/* verified relation curves */}
              <path d="M155 65C420 65 560 55 842 55" strokeWidth="1.25" pathLength={1} />
              <path d="M155 65C420 65 560 175 842 175" strokeWidth="1.25" pathLength={1} />
              <path d="M155 215C420 215 560 55 842 55" strokeWidth="1.25" pathLength={1} />
              <path d="M155 215C420 215 560 295 842 295" strokeWidth="1.25" pathLength={1} />
              <path d="M155 365C420 365 560 175 842 175" strokeWidth="1.25" pathLength={1} />
              <path d="M155 365C420 365 560 415 842 415" strokeWidth="1.25" pathLength={1} />

              {/* family terminals */}
              {familyBusY.map((y) => (
                <rect key={y} x="145" y={y - 5} width="10" height="10" fill="var(--bg)" pathLength={1} />
              ))}

              {/* industry terminals */}
              {industryY.map((y) => (
                <g key={y}>
                  <circle cx="850" cy={y} r="8" stroke="currentColor" strokeWidth="1" pathLength={1} />
                  <circle cx="850" cy={y} r="3" fill="var(--signal)" stroke="none" pathLength={1} />
                </g>
              ))}

              {/* labels */}
              <g fill="var(--fg-muted)" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.18em" }} fontSize="11">
                <text x="128" y={familyBusY[0] + 4} textAnchor="end">01 · FIBER OPTIC</text>
                <text x="128" y={familyBusY[1] + 4} textAnchor="end">02 · COPPER</text>
                <text x="128" y={familyBusY[2] + 4} textAnchor="end">03 · ELECTRO-MECH</text>
                {industries.map((ind, i) => (
                  <text key={ind.id} x="838" y={industryY[i] - 14} textAnchor="end">
                    {ind.name.toUpperCase()}
                  </text>
                ))}
              </g>
            </svg>
          </Inview>

          <p className="type-caption mt-6 hidden md:block" aria-hidden="true">
            Schematic — relations as verified per product applications
          </p>
        </div>
      </section>

      <ConductorSeam to="Industry ledger" theme="dark" />

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
