import { Inview } from "@/components/inview";

/* 02 — THE CONNECTION
   A short editorial beat on the night ground: what ClearEdge actually
   does is stated plainly, and the engineering pathway appears once,
   quietly, as genuine notation. No devices — typography and space. */

export function ConnectionStatement() {
  return (
    <section className="relative bg-bg-deep text-fg" aria-labelledby="connection-heading">
      <div className="mx-auto max-w-[84rem] px-5 py-24 md:px-10 md:py-36">
        <Inview>
          <h2 id="connection-heading" className="display-xl max-w-5xl">
            Every system depends on what happens{" "}
            <span className="text-signal">between</span> its components.
          </h2>
        </Inview>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Inview delay={120}>
            <p className="type-body measure text-fg-muted">
              Connectors are never the product everyone sees, and they are
              never allowed to be the reason a system stops. ClearEdge
              Solutions designs and manufactures the cabling systems and
              assemblies that carry signals, power, and integration between
              the parts of technology that must work as one.
            </p>
          </Inview>
          <Inview delay={200}>
            <p className="type-body measure text-fg-muted">
              That position — between requirement and application, between
              engineering and production — is the whole company. It is why
              builds start from your requirements rather than a catalogue,
              and why engineering and manufacturing operate as one
              discipline.
            </p>
          </Inview>
        </div>

        <Inview delay={260}>
          {/* the pathway, stated once as notation */}
          <p className="label-mono mt-16 flex flex-wrap items-center gap-x-3 gap-y-2 !text-[0.66rem] text-fg-faint" aria-label="How we work: design, documentation, engineering, assembly, manufacturing">
            {["Design", "Documentation", "Engineering", "Assembly", "Manufacturing"].map(
              (step, i) => (
                <span key={step} className="flex items-center gap-3">
                  {i > 0 ? (
                    <svg width="18" height="8" viewBox="0 0 18 8" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className="-translate-y-px">
                      <path d="M0 4h15M13 1l3 3-3 3" />
                    </svg>
                  ) : null}
                  <span>{step}</span>
                </span>
              ),
            )}
          </p>
        </Inview>
      </div>
    </section>
  );
}
