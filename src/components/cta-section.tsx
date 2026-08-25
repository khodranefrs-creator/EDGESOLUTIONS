import Link from "next/link";
import { Inview } from "@/components/inview";
import { company } from "@/lib/site";

/* 07 — CONNECTION RESOLUTION
   Graphite, left-aligned. The signal that entered at the hero
   returns here, passes through several nodes across the upper
   field, and terminates beside the CTA — the whole homepage
   narrative resolving into a single action. */

export function CTASection({ id = "cta" }: { id?: string }) {
  return (
    <section
      id={id}
      className="theme-dark relative overflow-hidden bg-bg-deeper text-fg"
      aria-labelledby="cta-heading"
    >
      {/* the resolve drawing: nodes along the path, terminating at the CTA */}
      <Inview variant="draw" className="pointer-events-none absolute inset-x-5 top-0 text-fg-faint md:inset-x-10">
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          fill="none"
          className="block h-[170px] w-full md:h-[210px]"
        >
          <path
            d="M1210 -10 C 980 26 820 12 660 44 C 500 76 420 40 300 78 C 210 106 150 140 96 178"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
          />
          {/* nodes the signal passes through — standardized ring nodes */}
          <circle cx="980" cy="22" r="3.25" fill="var(--bg-deeper)" stroke="currentColor" strokeWidth="1.25" pathLength={1} />
          <circle cx="660" cy="44" r="3.25" fill="var(--bg-deeper)" stroke="currentColor" strokeWidth="1.25" pathLength={1} />
          <circle cx="300" cy="78" r="3.25" fill="var(--bg-deeper)" stroke="currentColor" strokeWidth="1.25" pathLength={1} />
          {/* termination — the live endpoint where the system resolves */}
          <circle cx="92" cy="179" r="4" fill="#0092fc" stroke="none" pathLength={1} className="signal-dot" />
        </svg>
      </Inview>

      <div className="relative mx-auto max-w-[84rem] px-5 pb-24 pt-28 md:px-10 md:pb-36 md:pt-48">
        <div className="relative pt-16 md:pt-24">
          <Inview>
            <p className="label-mono text-fg-faint">Contact</p>
            <h2 id="cta-heading" className="display-statement max-w-4xl">
              Tell us what needs to&nbsp;connect.
            </h2>
            <p className="type-body measure mt-8 max-w-xl text-fg-muted">
              Share your requirement — drawings, volumes, timelines, or just
              the problem — and the right people at ClearEdge will respond,
              engineers included.
            </p>
          </Inview>

          <Inview delay={140}>
            <div className="mt-12 flex flex-col gap-7 sm:flex-row sm:items-center sm:gap-11">
              <Link href="/contact#quote-form" className="btn btn-primary !px-9 !py-[1.15rem] !text-base">
                Request a Quote
              </Link>
              <Link href="/contact" className="text-link !text-fg">
                Contact Us
                <svg className="text-link-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M0 5h12M8 1l4 4-4 4" />
                </svg>
              </Link>
            </div>
            <p className="mt-9 text-sm leading-relaxed text-fg-muted">
              or reach us directly —{" "}
              <a href={`tel:${company.phoneHref}`} className="link-quiet !text-fg">
                {company.phone}
              </a>{" "}
              ·{" "}
              <a href={`mailto:${company.email}`} className="link-quiet !text-fg">
                {company.email}
              </a>
            </p>
          </Inview>
        </div>

        <div
          aria-hidden="true"
          className="mt-24 hidden items-center justify-between text-fg-faint md:flex"
        >
          <span className="label-mono !text-[0.58rem]">{company.shortName} Solutions, Inc.</span>
          <span className="label-mono !text-[0.58rem]">SAN JOSE · CALIFORNIA · USA</span>
        </div>
      </div>
    </section>
  );
}
