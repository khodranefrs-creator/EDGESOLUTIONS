import Link from "next/link";
import { Inview } from "@/components/inview";

/* ENGINEERING DISCIPLINES — technical rows.
   Each discipline is one full-width entry in an engineering register:
   large title, short description, structural texture behind, arrow.
   Hover answers with movement, a signal point and a drawn underline.
   No cards, no rounded surfaces, no background floods. */

const disciplines = [
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
      {disciplines.map((d, i) => (
        <Inview key={d.id}>
          <section
            {...(withIds ? { id: d.id } : {})}
            aria-labelledby={withIds ? `${d.id}-chamber-heading` : undefined}
            className={`chamber ${d.cls} scroll-mt-28 border-t border-line text-fg last:border-b ${
              i === 0 ? "border-t-0" : ""
            }`}
          >
            <Link
              href={d.href}
              className="group relative mx-auto flex max-w-[84rem] flex-col gap-6 px-5 py-12 md:flex-row md:items-center md:gap-14 md:px-10 md:py-16"
              aria-label={`${d.name} — view capability`}
            >
              <span className="label-mono w-10 shrink-0 !text-[0.66rem] text-fg-faint transition-colors duration-200 group-hover:text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3
                id={withIds ? `${d.id}-chamber-heading` : undefined}
                className="min-w-0 flex-1 font-display text-[clamp(1.85rem,1.5rem+2.6vw,3.3rem)] font-semibold leading-[1.02] tracking-[-0.025em]"
              >
                <span className="relative inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
                  {d.name}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100"
                  />
                </span>
              </h3>

              <p className="max-w-md shrink-0 text-sm leading-relaxed text-fg-muted md:text-right">
                {d.line}
              </p>

              <svg
                width="30"
                height="16"
                viewBox="0 0 30 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className="hidden shrink-0 text-fg-faint transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-signal lg:block"
              >
                <path d="M0 8h27M21 1l7 7-7 7" />
              </svg>
            </Link>
          </section>
        </Inview>
      ))}
    </div>
  );
}
