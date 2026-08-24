import Link from "next/link";
import { Inview } from "@/components/inview";

/* 04 — ENGINEERING CHAMBERS
   Three disciplines, three distinct spatial behaviors. Each chamber is
   a full-width band whose ground behaves like the discipline it holds:
   fiber — fine drifting linear structures; copper — dense structured
   geometry; electro-mechanical — modular assembly grid. Abstract only:
   nothing here implies a specification ClearEdge has not verified. */

const chambers = [
  {
    id: "fiber-optic",
    name: "Fiber Optic",
    line: "High performance fiber optic cabling systems, engineered to meet exact performance requirements for technology-driven applications.",
    href: "/capabilities#fiber-optic",
    cls: "chamber-fiber",
  },
  {
    id: "copper-cabling",
    name: "Copper Cabling",
    line: "Copper cabling systems designed and manufactured for reliability, built around each customer's configuration and design requirements.",
    href: "/capabilities#copper-cabling",
    cls: "chamber-copper",
  },
  {
    id: "electro-mechanical",
    name: "Electro-Mechanical Assemblies",
    line: "Box build assemblies that integrate connectivity into complete systems — assembled and finished to the standards critical applications demand.",
    href: "/capabilities#electro-mechanical",
    cls: "chamber-electro",
  },
];

export function EngineeringChambers({ withIds = false }: { withIds?: boolean }) {
  return (
    <div>
      {chambers.map((c) => (
        <Inview key={c.id}>
          <section
            {...(withIds ? { id: c.id } : {})}
            aria-labelledby={withIds ? `${c.id}-chamber-heading` : undefined}
            className={`chamber ${c.cls} scroll-mt-24 border-t border-line first:border-t-0 text-fg`}
          >
            <div className="relative mx-auto max-w-[84rem] px-5 py-14 md:px-10 md:py-20">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
                <h3
                  id={withIds ? `${c.id}-chamber-heading` : undefined}
                  className="font-display text-[clamp(2rem,1.5rem+3vw,4rem)] font-semibold leading-[0.98] tracking-tight"
                >
                  <Link href={c.href} className="transition-colors duration-200 hover:text-accent">
                    {c.name}
                  </Link>
                </h3>
                <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
                  <p className="type-body max-w-md text-fg-muted">{c.line}</p>
                  <Link
                    href={c.href}
                    className="shrink-0 text-sm font-semibold text-accent transition-transform duration-200 hover:translate-x-1"
                    aria-label={`${c.name} — learn more`}
                  >
                    <svg width="26" height="16" viewBox="0 0 26 16" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <path d="M0 8h23M17 1l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </Inview>
      ))}
    </div>
  );
}
