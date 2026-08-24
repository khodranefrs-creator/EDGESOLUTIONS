import { Inview } from "@/components/inview";
import { SectionRule } from "@/components/ui";
import { differentiators } from "@/lib/site";

/* 06 — CONFIDENCE
   A statement moment, then the differentiators revealed as a
   specification list. No icons, no cards. */

export function Confidence() {
  return (
    <section id="confidence" className="bg-bg-deep text-fg" aria-labelledby="confidence-heading">
      <div className="mx-auto max-w-[84rem] px-5 py-20 md:px-10 lg:py-28">
        <Inview>
          <SectionRule n="06" label="CONFIDENCE — WHY CLEAREDGE" meta="SPECIFICATION / 10 ENTRIES" />
          <h2 id="confidence-heading" className="type-display-l mt-10 max-w-4xl">
            Precision is not an&nbsp;extra.
            <span className="mt-1 block text-fg-muted">
              It is the expectation.
            </span>
          </h2>
          <p className="type-body measure mt-8 max-w-2xl text-fg-muted">
            ClearEdge Solutions is distinguished by its ability to deliver
            complex, customized builds with efficiency and precision —
            combining agility with technical excellence to provide unmatched
            value and reliability.
          </p>
        </Inview>

        <Inview delay={140}>
          <dl className="mt-16 grid gap-x-16 border-t border-line-strong sm:grid-cols-2">
            {differentiators.map((d, i) => (
              <div
                key={d.term}
                className="group flex items-baseline justify-between gap-6 border-b border-line py-4 transition-colors duration-200 hover:border-accent"
              >
                <dt className="flex min-w-0 items-baseline gap-4">
                  <span className="label-mono shrink-0 !text-[0.62rem] text-fg-faint transition-colors group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate text-sm font-medium">{d.term}</span>
                </dt>
                <dd className="hidden shrink-0 text-xs text-fg-faint transition-colors group-hover:text-fg-muted sm:block">
                  {d.note}
                </dd>
              </div>
            ))}
          </dl>
        </Inview>
      </div>
    </section>
  );
}
