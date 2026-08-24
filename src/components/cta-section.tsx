import Link from "next/link";
import { Inview } from "@/components/inview";
import { company } from "@/lib/site";

/* Signature closing moment — the last sheet of the dossier.
   No card, no container: a statement, two actions, a stamp. */
export function CTASection() {
  return (
    <section
      className="relative overflow-hidden border-t border-line bg-bg-deep text-fg"
      aria-labelledby="cta-heading"
    >
      <div className="relative mx-auto max-w-[84rem] px-5 py-28 md:px-10 lg:py-40">
        <Inview>
          <p className="label-mono text-accent">Ready to connect?</p>
          <h2 id="cta-heading" className="type-hero mt-8">
            <span className="block">Let&rsquo;s engineer</span>
            <span className="mt-1 block">
              what comes next<span className="text-signal">.</span>
            </span>
          </h2>
        </Inview>

        <Inview delay={160}>
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
