import { Inview } from "@/components/inview";

/* 02 — WHAT HAPPENS BETWEEN
   Graphite statement level. One claim set in Tier-2 type owns the
   chapter. The four working principles are not cards and not
   features — they are indexed annotations, set as a marginal
   register against a single structural rail, like the legend of an
   engineering drawing. */

const principles = [
  {
    name: "Engineered Precision",
    line: "Exactness as a default, not an option.",
  },
  {
    name: "Built for Reliability",
    line: "Trusted quality, consistently delivered.",
  },
  {
    name: "System Integration",
    line: "Connectivity integrated into complete systems.",
  },
  {
    name: "Responsive Partnership",
    line: "A partner that answers — engineers included.",
  },
];

export function ConnectionStatement() {
  return (
    <section className="theme-dark bg-bg-deep text-fg" aria-labelledby="connection-heading">
      <div className="env-immersive mx-auto max-w-[84rem] px-5 md:px-10">
        <div className="grid gap-y-16 lg:grid-cols-[1.42fr_1fr] lg:gap-x-28">
          <div>
            <Inview>
              <h2 id="connection-heading" className="display-statement max-w-3xl">
                Every system depends on what happens{" "}
                <span className="text-signal">between</span> its components.
              </h2>
            </Inview>
            <Inview delay={140}>
              <p className="type-body measure-tight mt-10 text-fg-muted md:mt-14">
                Connectors are never the product everyone sees, and they are
                never allowed to be the reason a system stops. ClearEdge
                Solutions designs and manufactures the cabling systems and
                assemblies that carry signals, power, and integration between
                the parts of technology that must work as one.
              </p>
            </Inview>
          </div>

          {/* the principles register */}
          <Inview delay={220} className="lg:self-end">
            <div className="border-l border-line-strong pl-8 md:pl-10">
              <p className="flex items-baseline justify-between gap-4">
                <span className="label-mono text-fg-faint">Operating principles</span>
                <span className="label-mono text-signal" aria-hidden="true">
                  04
                </span>
              </p>
              <ul className="mt-2">
                {principles.map((p, i) => (
                  <li
                    key={p.name}
                    className={`grid grid-cols-[2.4rem_1fr] gap-x-3 py-5 ${
                      i > 0 ? "border-t border-line" : ""
                    }`}
                  >
                    <span className="label-mono pt-[0.2rem] text-fg-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="type-title">{p.name}</p>
                      <p className="mt-1 text-sm leading-relaxed text-fg-muted">{p.line}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Inview>
        </div>
      </div>
    </section>
  );
}
