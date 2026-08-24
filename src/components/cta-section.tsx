import Link from "next/link";
import { Inview } from "@/components/inview";
import { company } from "@/lib/site";

/* 07 — CONTACT
   The connection resolves. The signal that entered at the hero
   returns here on the night ground, draws down the page and
   terminates in a single action. requirement → engineering →
   connection — the button is where the line ends. */

export function CTASection({ id = "cta" }: { id?: string }) {
  return (
    <section
      id={id}
      className="relative overflow-hidden bg-bg-deep text-fg"
      aria-labelledby="cta-heading"
    >
      <div className="relative mx-auto max-w-[84rem] px-5 pb-24 pt-24 md:px-10 md:pb-32 md:pt-36">
        {/* resolve drawing: the site's line arrives and terminates */}
        <Inview variant="draw" className="pointer-events-none absolute inset-x-5 top-0 text-fg-faint md:inset-x-10">
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 190"
            preserveAspectRatio="none"
            fill="none"
            className="block h-[170px] w-full md:h-[210px]"
          >
            <path
              d="M1210 -10 C 900 40 620 10 430 70 C 260 122 180 150 96 178"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
            />
            <circle cx="92" cy="179" r="3" fill="#0092fc" className="signal-dot" />
          </svg>
        </Inview>

        <div className="relative pt-24 md:pt-32">
          <Inview>
            <p className="label-mono text-fg-faint">Contact</p>
            <h2 id="cta-heading" className="display-l mt-7 max-w-4xl">
              Tell us what needs to connect.
            </h2>
            <p className="type-lede measure mt-8 max-w-xl text-fg-muted">
              Share your requirement — drawings, volumes, timelines, or just
              the problem — and the right people at ClearEdge will respond,
              engineers included.
            </p>
          </Inview>

          <Inview delay={140}>
            <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12">
              <Link href="/contact#quote-form" id="cta-terminal" className="btn btn-primary !px-9 !py-5 !text-base">
                Request a quote
              </Link>
              <p className="text-sm leading-relaxed text-fg-muted">
                or reach us directly —{" "}
                <a href={`tel:${company.phoneHref}`} className="link-quiet !text-fg">
                  {company.phone}
                </a>{" "}
                ·{" "}
                <a href={`mailto:${company.email}`} className="link-quiet !text-fg">
                  {company.email}
                </a>
              </p>
            </div>
          </Inview>
        </div>

        <div
          aria-hidden="true"
          className="mt-20 hidden items-center justify-between text-fg-faint md:flex"
        >
          <span className="label-mono !text-[0.6rem]">{company.shortName} Solutions, Inc.</span>
          <span className="label-mono !text-[0.6rem]">SAN JOSE · CALIFORNIA</span>
        </div>
      </div>
    </section>
  );
}
