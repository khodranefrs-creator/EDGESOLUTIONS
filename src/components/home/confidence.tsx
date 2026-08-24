import { Inview } from "@/components/inview";
import { differentiators } from "@/lib/site";

/* 06 — CONFIDENCE
   One strong statement, then the verified differentiators held in a
   quiet architecture of space — no specification list, no rows with
   rules. The words carry it. */

export function Confidence() {
  return (
    <section className="theme-light bg-bg text-fg" aria-labelledby="confidence-heading">
      <div className="mx-auto max-w-[84rem] px-5 py-24 md:px-10 md:py-36">
        <Inview>
          <h2 id="confidence-heading" className="display-xl max-w-5xl">
            Precision is not an extra.
            <span className="mt-1 block text-fg-muted">It is the expectation.</span>
          </h2>
          <p className="type-lede measure mt-10 max-w-2xl text-fg-muted">
            ClearEdge Solutions is distinguished by its ability to deliver
            complex, customized builds with efficiency and precision —
            combining agility with technical excellence to provide unmatched
            value and reliability.
          </p>
        </Inview>

        <Inview delay={160}>
          <dl className="mt-20 grid gap-x-20 gap-y-9 sm:grid-cols-2 lg:grid-cols-2">
            {differentiators.map((d) => (
              <div key={d.term} className="group">
                <dt className="text-[1.05rem] font-semibold transition-colors duration-200 group-hover:text-accent">
                  {d.term}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-fg-muted">{d.note}</dd>
              </div>
            ))}
          </dl>
        </Inview>
      </div>
    </section>
  );
}
