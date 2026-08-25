import Link from "next/link";
import { Inview } from "@/components/inview";

/* ENGINEERING DISCIPLINES — one register, three rows.
    Each discipline occupies a clearly bounded row box with a fixed
    internal architecture:

      [ engraved index ]  [ discipline title ]  [ description ]  [ → ]

    The oversized numeral is a GRID CELL, not an overlay: it lives in
    its own column, can never intersect text, and reads like an
    engraving in the row's margin. Rows share one baseline system and
    are separated by hairlines — the section reads as a single
    engineered register. On mobile the engraving steps aside entirely:
    a compact mono index leads a stacked title/description row. */

const disciplines = [
  {
    id: "fiber-optic",
    name: "Fiber Optic",
    line: "High performance fiber optic cabling systems, engineered to meet exact performance requirements for technology-driven applications.",
    href: "/capabilities#fiber-optic",
  },
  {
    id: "copper-cabling",
    name: "Copper Cabling",
    line: "Copper cabling systems designed and manufactured for reliability, built around each customer's configuration and design requirements.",
    href: "/capabilities#copper-cabling",
  },
  {
    id: "electro-mechanical",
    name: "Electro-Mechanical Assemblies",
    line: "Box build assemblies that integrate connectivity into complete systems — assembled and finished to the standards critical applications demand.",
    href: "/capabilities#electro-mechanical",
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
      className={`font-display text-[clamp(1.85rem,1.5rem+2.6vw,3.3rem)] font-semibold leading-[1.04] tracking-[-0.025em] ${className}`}
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

/* The engraving: outlined numeral confined to its own column.
   Bounded width, leading-none, pointer-events none — it cannot
   escape its cell, so it can never collide with readable content. */
function EngravedIndex({ n }: { n: string }) {
  return (
    <span
      aria-hidden="true"
      data-probe="engraving"
      className="hidden w-[clamp(4.75rem,8.5vw,8rem)] shrink-0 select-none items-center justify-start font-mono text-[clamp(3.4rem,6vw,6.2rem)] font-semibold leading-none tracking-[-0.02em] lg:flex"
      style={{ WebkitTextStroke: "1px rgb(237 240 242 / 0.16)", color: "transparent" }}
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
              className="chamber scroll-mt-28 border-t border-line text-fg last:border-b"
            >
              <Link
                href={d.href}
                data-probe="chamber-row"
                className="group relative mx-auto block max-w-[84rem] px-5 py-12 md:px-10 md:py-16 lg:py-20"
                aria-label={`${d.name} — view capability`}
              >
                {/* row architecture: index | title | description | indicator */}
                <div className="grid items-center gap-x-10 gap-y-5 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,22rem)_2rem] lg:gap-x-14">
                  <EngravedIndex n={idx} />

                  {/* compact index — mobile/tablet only */}
                  <span
                    aria-hidden="true"
                    className="label-mono text-fg-faint transition-colors duration-200 group-hover:text-signal lg:hidden"
                  >
                    {idx}
                  </span>

                  <Title id={headingId} name={d.name} />

                  <p className="text-sm leading-relaxed text-fg-muted lg:max-w-[22rem]">
                    {d.line}
                  </p>

                  <span className="hidden justify-self-end lg:block">
                    <Arrow />
                  </span>
                </div>
              </Link>
            </section>
          </Inview>
        );
      })}
    </div>
  );
}
