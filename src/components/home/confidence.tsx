import { Inview } from "@/components/inview";
import { differentiators } from "@/lib/site";

/* 06 — THE ENGINEERING STANDARD
   Warm off-white. One editorial statement at full scale, then the
   verified differentiators set as a technical specification list —
   terms and notes in a clean multi-column register. No cards,
   no icons, no numbering theatre. */

export function Confidence() {
  return (
    <section className="bg-bg-warm text-fg" aria-labelledby="confidence-heading">
      <div className="mx-auto max-w-[84rem] px-5 py-24 md:px-10 md:py-36">
        <Inview>
          <h2 id="confidence-heading" className="display-xl max-w-5xl">
            Precision is not an extra.
            <span className="mt-1 block text-fg-muted">It is the expectation.</span>
          </h2>
          <p className="type-body measure mt-10 max-w-2xl text-fg-muted">
            ClearEdge Solutions is distinguished by its ability to deliver
            complex, customized builds with efficiency and precision —
            combining agility with technical excellence to provide unmatched
            value and reliability.
          </p>
        </Inview>

        <Inview delay={160}>
          <dl className="mt-20 grid gap-x-16 gap-y-0 border-t border-line-strong sm:grid-cols-2 md:mt-28 lg:grid-cols-3">
            {differentiators.map((d) => (
              <div key={d.term} className="group border-b border-line py-5">
                <dt className="font-display text-[0.98rem] font-semibold tracking-[-0.01em] transition-colors duration-200 group-hover:text-accent">
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
