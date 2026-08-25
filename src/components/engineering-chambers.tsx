import Link from "next/link";
import { Inview } from "@/components/inview";

/* ENGINEERING DISCIPLINES — three chambers, one system.
    Each discipline occupies its own spatial composition inside a
    shared grammar of hairlines, indexes and hover response:
      01 fiber optic   — declaration left, reference right
      02 copper        — mirrored: reference left, declaration right
      03 electro-mech  — full-width declaration, reference set low
    Ghost numerals index the chambers at architectural scale. No
    cards, no repeated rows — moving through the section feels like
    walking through different rooms of one facility. */

const disciplines = [
  {
    id: "fiber-optic",
    name: "Fiber Optic",
    line: "High performance fiber optic cabling systems, engineered to meet exact performance requirements for technology-driven applications.",
    href: "/capabilities#fiber-optic",
    cls: "chamber-fiber",
    variant: "a" as const,
  },
  {
    id: "copper-cabling",
    name: "Copper Cabling",
    line: "Copper cabling systems designed and manufactured for reliability, built around each customer's configuration and design requirements.",
    href: "/capabilities#copper-cabling",
    cls: "chamber-copper",
    variant: "b" as const,
  },
  {
    id: "electro-mechanical",
    name: "Electro-Mechanical Assemblies",
    line: "Box build assemblies that integrate connectivity into complete systems — assembled and finished to the standards critical applications demand.",
    href: "/capabilities#electro-mechanical",
    cls: "chamber-electro",
    variant: "c" as const,
  },
];

function Title({
  id,
  name,
  className = "",
}: {
  id?: string;
  name: string;
  className?: string;
}) {
  return (
    <h3
      id={id}
      className={`font-display text-[clamp(1.85rem,1.5rem+2.6vw,3.3rem)] font-semibold leading-[1.02] tracking-[-0.025em] ${className}`}
    >
      <span className="relative inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
        {name}
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100"
        />
      </span>
    </h3>
  );
}

function Arrow() {
  return (
    <svg
      width="30"
      height="16"
      viewBox="0 0 30 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className="shrink-0 text-fg-faint transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-signal"
    >
      <path d="M0 8h27M21 1l7 7-7 7" />
    </svg>
  );
}

function Idx({ n, className = "" }: { n: string; className?: string }) {
  return (
    <span
      className={`label-mono !text-[0.66rem] text-fg-faint transition-colors duration-200 group-hover:text-signal ${className}`}
    >
      {n}
    </span>
  );
}

function GhostIndex({ n, pos }: { n: string; pos: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute hidden select-none font-mono text-[9rem] font-semibold leading-none xl:block ${pos}`}
      style={{ WebkitTextStroke: "1px rgb(237 240 242 / 0.13)", color: "transparent" }}
    >
      {n}
    </span>
  );
}

export function EngineeringChambers({ withIds = false }: { withIds?: boolean }) {
  return (
    <div>
      {disciplines.map((d, i) => {
        const idx = String(i + 1).padStart(2, "0");
        const headingId = withIds ? `${d.id}-chamber-heading` : undefined;
        return (
          <Inview key={d.id}>
            <section
              {...(withIds ? { id: d.id } : {})}
              aria-labelledby={headingId ? headingId : undefined}
              className={`chamber ${d.cls} scroll-mt-28 border-t border-line text-fg last:border-b ${
                i === 0 ? "border-t-0" : ""
              }`}
            >
              <Link
                href={d.href}
                className="group relative mx-auto block max-w-[84rem] px-5 py-14 md:px-10 md:py-20"
                aria-label={`${d.name} — view capability`}
              >
                {d.variant === "a" && (
                  <>
                    <GhostIndex n={idx} pos="right-10 top-1/2 -translate-y-1/2" />
                    <div className="relative grid gap-6 lg:grid-cols-[3rem_1fr_auto] lg:items-center lg:gap-14">
                      <Idx n={idx} />
                      <Title id={headingId} name={d.name} />
                      <div className="flex items-end gap-10">
                        <p className="max-w-xs shrink-0 text-sm leading-relaxed text-fg-muted md:text-right">
                          {d.line}
                        </p>
                        <span className="hidden lg:block">
                          <Arrow />
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {d.variant === "b" && (
                  <>
                    <GhostIndex n={idx} pos="left-10 top-1/2 -translate-y-1/2" />
                    <div className="relative grid gap-6 lg:grid-cols-[minmax(0,20rem)_1fr_3rem] lg:items-center lg:gap-14">
                      <Idx n={idx} className="lg:order-3 lg:self-start lg:text-right" />
                      <Title
                        id={headingId}
                        name={d.name}
                        className="lg:order-2 lg:text-right"
                      />
                      <div className="flex items-end gap-10 max-lg:max-w-md lg:order-1">
                        <p className="shrink-0 text-sm leading-relaxed text-fg-muted">
                          {d.line}
                        </p>
                        <span className="hidden lg:block">
                          <Arrow />
                        </span>
                      </div>
                    </div>
                  </>
                )}

                {d.variant === "c" && (
                  <>
                    <GhostIndex n={idx} pos="bottom-4 right-[24%]" />
                    <div className="relative">
                      <Idx n={idx} />
                      <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                        <Title id={headingId} name={d.name} />
                        <div className="flex items-end gap-10 lg:pb-2">
                          <p className="max-w-md text-sm leading-relaxed text-fg-muted">{d.line}</p>
                          <Arrow />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Link>
            </section>
          </Inview>
        );
      })}
    </div>
  );
}
