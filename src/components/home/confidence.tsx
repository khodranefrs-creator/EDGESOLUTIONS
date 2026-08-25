import { Inview } from "@/components/inview";
import { differentiators } from "@/lib/site";

/* 06 — THE ENGINEERING STANDARD
    Warm off-white. One editorial statement at full scale, then the
    verified differentiators set as a SPECIFICATION REGISTER — a
    dense technical document with column headers, indexes and rules.
    Not a feature grid: a register you might find in the back of an
    engineering dossier. */

export function Confidence() {
  return (
    <section className="bg-bg-warm text-fg" aria-labelledby="confidence-heading">
      <div className="mx-auto max-w-[84rem] px-5 py-24 md:px-10 md:py-36">
        <Inview>
          <h2 id="confidence-heading" className="display-statement max-w-4xl">
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
          <div className="mt-20 md:mt-28">
            {/* register header */}
            <div
              aria-hidden="true"
              className="hidden grid-cols-[3.5rem_minmax(0,17rem)_1fr] gap-x-8 border-b border-line-strong pb-3 sm:grid"
            >
              <p className="label-mono !text-[0.56rem] text-fg-faint">No.</p>
              <p className="label-mono !text-[0.56rem] text-fg-faint">Specification</p>
              <p className="label-mono !text-[0.56rem] text-fg-faint">Note</p>
            </div>

            <dl>
              {differentiators.map((d, i) => (
                <div
                  key={d.term}
                  className={`group grid gap-x-8 border-b border-line py-4 sm:grid-cols-[3.5rem_minmax(0,17rem)_1fr] sm:py-5 ${
                    i === 0 ? "border-t border-t-line sm:border-t-0" : ""
                  }`}
                >
                  <dt className="flex items-baseline gap-x-4 sm:block">
                    <span className="label-mono shrink-0 pt-[0.15rem] !text-[0.58rem] text-signal-deep sm:pt-[0.2rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.02rem] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-200 group-hover:text-accent sm:text-[1.08rem]">
                      {d.term}
                    </span>
                  </dt>
                  <dd className="col-start-2 col-end-4 mt-1.5 text-sm leading-relaxed text-fg-muted sm:col-start-3 sm:mt-0">
                    {d.note}
                  </dd>
                </div>
              ))}
            </dl>

            <p
              className="meta-mono mt-6 flex items-baseline justify-between !text-[0.54rem] text-fg-faint"
              aria-hidden="true"
            >
              <span>Specification register — company standard</span>
              <span>{String(differentiators.length).padStart(2, "0")} entries</span>
            </p>
          </div>
        </Inview>
      </div>
    </section>
  );
}
