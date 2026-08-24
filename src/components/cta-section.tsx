import Link from "next/link";
import { Inview } from "@/components/inview";
import { company } from "@/lib/site";

/* 07 — CONTACT · Signature closing moment.
   The three product families arrive as separate conductors,
   cross the sheet, and resolve into one connection terminal —
   the point where the reader becomes the next link in the path.
   Drawn once on entry; a static schematic without JS or motion. */

export function CTASection({ id = "cta" }: { id?: string }) {
  return (
    <section
      id={id}
      className="relative overflow-hidden border-t border-line bg-bg-deep text-fg"
      aria-labelledby="cta-heading"
    >
      <div className="relative mx-auto max-w-[84rem] px-5 py-28 md:px-10 lg:py-40">
        {/* convergence drawing — FIBER / COPPER / ELECTRO-MECH → one terminal */}
        <Inview variant="draw" className="hidden text-fg-faint sm:block">
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 150"
            fill="none"
            className="block h-auto w-full max-w-3xl"
          >
            <g style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.18em" }} fontSize="10" fill="currentColor" opacity="0.6">
              <text x="8" y="18">FIBER OPTIC</text>
              <text x="8" y="68">COPPER</text>
              <text x="8" y="118">ELECTRO-MECHANICAL</text>
            </g>
            <path d="M8 25H350" stroke="currentColor" strokeWidth="1" pathLength={1} />
            <path d="M8 75H350" stroke="currentColor" strokeWidth="1" pathLength={1} />
            <path d="M8 125H350" stroke="currentColor" strokeWidth="1" pathLength={1} />
            <path d="M350 25C500 25 545 75 688 75" stroke="currentColor" strokeWidth="1.5" pathLength={1} />
            <path d="M350 75H688" stroke="currentColor" strokeWidth="1.5" pathLength={1} />
            <path d="M350 125C500 125 545 75 688 75" stroke="currentColor" strokeWidth="1.5" pathLength={1} />
            {/* registration ticks around the terminal */}
            <path d="M700 56v10M700 84v10M681 75h10M709 75h10" stroke="currentColor" strokeWidth="1" pathLength={1} opacity="0.7" />
            {/* exit toward the reader */}
            <path d="M711 75H1146M1138 67l10 8-10 8" stroke="currentColor" strokeWidth="1" pathLength={1} />
            <circle cx="700" cy="75" r="9" stroke="var(--line-strong)" strokeWidth="1" pathLength={1} />
            <circle cx="700" cy="75" r="3.5" fill="var(--signal)" className="conductor-dot" />
          </svg>
        </Inview>

        <Inview delay={100}>
          <p className="label-mono mt-12 text-accent sm:mt-14">Ready to connect?</p>
          <h2 id="cta-heading" className="type-hero mt-8">
            <span className="block">Let&rsquo;s engineer</span>
            <span className="mt-1 block">
              what comes next<span className="text-signal">.</span>
            </span>
          </h2>
        </Inview>

        <Inview delay={200}>
          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <Link href="/contact#quote-form" className="btn btn-primary">
              Request a Quote
            </Link>
            <Link href="/contact" className="text-link">
              Contact Us
              <svg className="text-link-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M0 5h12M8 1l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </Inview>

        <div
          aria-hidden="true"
          className="pointer-events-none mt-16 hidden items-center justify-between text-fg-faint md:flex"
        >
          <span className="label-mono !text-[0.6rem]">{company.shortName} Solutions, Inc.</span>
          <span className="rule-ticks-y h-8 w-[1px]" />
          <span className="label-mono !text-[0.6rem]">SAN JOSE · CALIFORNIA</span>
        </div>
      </div>
    </section>
  );
}
