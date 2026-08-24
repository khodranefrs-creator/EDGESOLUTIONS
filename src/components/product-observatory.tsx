"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { productFamilies, industries } from "@/lib/site";
import mtpTrunkAssembly from "@/assets/mtp-trunk-assembly.webp";
import { CopperComposition, BoxComposition } from "@/components/glyphs";

/* 03 — THE PRODUCT CATALOG
   The three verified families in one documentation environment.
   Selecting a family changes the plate around it — like turning to
   the next sheet of an engineering catalog. Fiber presents the
   approved photography; copper and electro-mechanical present
   original schematic geometry (no invented specifications, no
   invented photography). Full tab semantics preserved. */

const stageGround: Record<string, string> = {
  "fiber-optic": "#f2f3f4",
  "copper-cabling": "#f4f1ea",
  "electro-mechanical": "#f1f0ec",
};

export function ProductObservatory({ headingId }: { headingId?: string }) {
  const [activeId, setActiveId] = useState(productFamilies[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = productFamilies.find((f) => f.id === activeId)!;
  const activeIndex = productFamilies.indexOf(active);

  function onKeyDown(e: React.KeyboardEvent) {
    const idx = productFamilies.findIndex((f) => f.id === activeId);
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % productFamilies.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + productFamilies.length) % productFamilies.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = productFamilies.length - 1;
    if (next >= 0) {
      e.preventDefault();
      setActiveId(productFamilies[next].id);
      tabRefs.current[next]?.focus();
    }
  }

  return (
    <div>
      {/* family selector */}
      <div
        role="tablist"
        aria-label="Product families"
        onKeyDown={onKeyDown}
        className="mt-14 flex flex-wrap items-end gap-x-12 gap-y-5 border-b border-line-strong"
      >
        {productFamilies.map((family, i) => {
          const selected = family.id === activeId;
          return (
            <button
              key={family.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`obs-tab-${family.id}`}
              aria-selected={selected}
              aria-controls={`obs-panel-${family.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(family.id)}
              className={`relative pb-5 pt-2 text-left font-display text-[clamp(1.55rem,1.25rem+2vw,2.6rem)] font-semibold leading-none tracking-[-0.02em] transition-colors duration-200 ${
                selected ? "text-fg" : "text-fg-muted hover:text-fg"
              }`}
            >
              {i === 0 ? "Fiber Optic" : i === 1 ? "Copper" : "Electro-Mechanical"}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-signal transition-transform duration-300 ${
                  selected ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* catalog sheet */}
      <div
        key={active.id}
        role="tabpanel"
        id={`obs-panel-${active.id}`}
        aria-labelledby={`obs-tab-${active.id}`}
        className="env-in"
      >
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* specimen plate */}
          <div className="plate reg-corners relative bg-white p-4 sm:p-6">
            <div className="flex items-baseline justify-between px-2 pt-1">
              <span className="label-mono !text-[0.62rem] text-fg-faint">
                FIG. {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="label-mono hidden !text-[0.56rem] text-fg-faint sm:block">
                {active.id === "fiber-optic" ? "REPRESENTATIVE ASSEMBLY" : "SCHEMATIC REPRESENTATION"}
              </span>
            </div>
            <div
              data-family={active.id}
              className="relative mt-4 flex min-h-[260px] items-center justify-center overflow-hidden border border-line p-6 sm:min-h-[340px] md:p-10"
              style={{ backgroundColor: stageGround[active.id], color: "#3d444d" }}
            >
              {active.id === "fiber-optic" ? (
                <Image
                  src={mtpTrunkAssembly}
                  alt="Multi-fiber trunk cable assembly with an aqua jacket and MPO-style connectors"
                  sizes="(max-width: 1024px) 100vw, 680px"
                  className="relative z-[1] h-auto max-h-[340px] w-full object-contain"
                />
              ) : (
                <div className="relative z-[1] flex h-full w-full items-center justify-center py-4">
                  {active.id === "copper-cabling" ? (
                    <CopperComposition className="h-auto max-h-[320px] w-full max-w-lg" />
                  ) : (
                    <BoxComposition className="h-auto max-h-[320px] w-full max-w-lg" />
                  )}
                </div>
              )}
              <p className="meta-mono absolute bottom-4 left-5 z-[1] !text-[0.56rem]" aria-hidden="true">
                {active.name}
              </p>
            </div>
          </div>

          {/* documentation column */}
          <div className="flex flex-col justify-center">
            <p className="label-mono !text-[0.62rem] text-signal-deep">
              Family {String(activeIndex + 1).padStart(2, "0")} / 03
            </p>
            <h3 id={headingId} className="display-m mt-5">
              {active.name}
            </h3>
            <p className="type-body measure mt-5 text-fg-muted">{active.description}</p>

            <div className="mt-9 border-t border-line pt-7">
              <p className="label-mono !text-[0.6rem] text-fg-faint">Where it applies</p>
              <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-2">
                {active.applications.map((appId) => {
                  const ind = industries.find((x) => x.id === appId);
                  if (!ind) return null;
                  return (
                    <li key={appId}>
                      <Link href={`/industries#${ind.id}`} className="link-quiet text-sm font-medium">
                        {ind.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
              <Link href={`/contact?capability=${active.id}#quote-form`} className="text-link">
                Discuss this family
                <svg className="text-link-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M0 5h12M8 1l4 4-4 4" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
