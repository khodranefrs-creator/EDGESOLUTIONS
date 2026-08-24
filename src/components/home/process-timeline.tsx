import { Inview } from "@/components/inview";
import { SectionRule } from "@/components/ui";
import { flowSteps } from "@/lib/site";

/* 03 — ENGINEERING
   A continuous process drawing, not cards. One baseline,
   five stations, drawn once when it enters view. */

export function ProcessTimeline() {
  return (
    <section className="relative overflow-hidden bg-bg text-fg" aria-labelledby="process-heading">
      <div className="mx-auto max-w-[84rem] px-5 py-20 md:px-10 lg:py-28">
        <Inview>
          <SectionRule n="03" label="ENGINEERING — HOW CLEAREDGE WORKS" meta="FIG. 02 / SEQUENCE" />
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <h2 id="process-heading" className="type-display-m max-w-xl">
              One continuous sequence, from requirement to production.
            </h2>
            <p className="type-body measure max-w-md text-fg-muted lg:justify-self-end">
              Engineering and manufacturing operate as a single discipline —
              a complete build-to-print partner for low-to-high volume needs.
            </p>
          </div>
        </Inview>

        {/* desktop: horizontal process drawing */}
        <div className="mt-20 hidden md:block">
          <Inview variant="draw">
            <svg
              aria-hidden="true"
              viewBox="0 0 1200 24"
              preserveAspectRatio="none"
              fill="none"
              className="block h-6 w-full"
            >
              <line x1="0" y1="12" x2="1200" y2="12" stroke="currentColor" strokeWidth="1" className="text-fg-faint" pathLength={1} />
              {[0, 240, 480, 720, 960].map((x) => (
                <rect key={x} x={x} y="8" width="8" height="8" fill="var(--bg)" stroke="var(--fg-faint)" strokeWidth="1" pathLength={1} />
              ))}
              <circle cx="1196" cy="12" r="4" fill="var(--signal)" pathLength={1} />
            </svg>
          </Inview>
          <ol className="grid grid-cols-5">
            {flowSteps.map((step) => (
              <li key={step.id} className="pr-8 pt-6">
                <p className="label-mono !text-[0.62rem] text-accent">{step.step}</p>
                <h3 className="type-title mt-3 !text-[1.15rem]">{step.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{step.line}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* mobile: vertical sequence */}
        <ol className="mt-12 border-l border-line-strong md:hidden">
          {flowSteps.map((step) => (
            <li key={step.id} className="relative pb-9 pl-7 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[4.5px] top-1 h-2 w-2 border border-line-strong bg-bg"
              />
              <p className="label-mono !text-[0.62rem] text-accent">{step.step}</p>
              <h3 className="type-title mt-2 !text-[1.15rem]">{step.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
