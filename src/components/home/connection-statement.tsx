import { Inview } from "@/components/inview";

/* 02 — WHAT HAPPENS BETWEEN
   Graphite statement level. One claim set in architectural type,
   a plain explanation of ClearEdge's position, then four working
   principles drawn as thin technical icons — not feature cards. */

function PrecisionIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <circle cx="17" cy="17" r="9" />
      <path d="M17 2v7M17 25v7M2 17h7M25 17h7" />
      <circle cx="17" cy="17" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ReliabilityIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <rect x="4" y="4" width="26" height="26" />
      <rect x="10" y="10" width="14" height="14" />
      <circle cx="17" cy="17" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IntegrationIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <path d="M3 8h12M3 17h12M3 26h12" />
      <path d="M15 8c6 0 4 9 10 9M15 17h10M15 26c6 0 4-9 10-9" opacity="0.55" />
      <circle cx="29" cy="17" r="3" />
    </svg>
  );
}

function PartnershipIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
      <rect x="3" y="12" width="8" height="10" />
      <rect x="23" y="12" width="8" height="10" />
      <path d="M11 17h12" />
      <circle cx="17" cy="17" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

const principles = [
  {
    name: "Engineered Precision",
    line: "Exactness as a default, not an option.",
    Icon: PrecisionIcon,
  },
  {
    name: "Built for Reliability",
    line: "Trusted quality, consistently delivered.",
    Icon: ReliabilityIcon,
  },
  {
    name: "System Integration",
    line: "Connectivity integrated into complete systems.",
    Icon: IntegrationIcon,
  },
  {
    name: "Responsive Partnership",
    line: "A partner that answers — engineers included.",
    Icon: PartnershipIcon,
  },
];

export function ConnectionStatement() {
  return (
    <section className="theme-dark bg-bg-deep text-fg" aria-labelledby="connection-heading">
      <div className="mx-auto max-w-[84rem] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
          <Inview>
            <h2 id="connection-heading" className="display-xl max-w-3xl">
              Every system depends on what happens{" "}
              <span className="text-signal">between</span> its components.
            </h2>
          </Inview>
          <Inview delay={140} className="flex flex-col justify-end">
            <p className="type-body measure-tight text-fg-muted">
              Connectors are never the product everyone sees, and they are
              never allowed to be the reason a system stops. ClearEdge
              Solutions designs and manufactures the cabling systems and
              assemblies that carry signals, power, and integration between
              the parts of technology that must work as one.
            </p>
          </Inview>
        </div>

        {/* four working principles */}
        <Inview delay={180}>
          <dl className="mt-20 grid gap-x-12 gap-y-12 sm:grid-cols-2 md:mt-28 lg:grid-cols-4">
            {principles.map((p) => (
              <div key={p.name} className="border-t border-line-strong pt-8">
                <dt className="flex min-h-[3.25rem] items-center">
                  <p.Icon />
                </dt>
                <dd>
                  <p className="type-title mt-5">{p.name}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{p.line}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Inview>
      </div>
    </section>
  );
}
