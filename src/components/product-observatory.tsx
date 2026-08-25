"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { productFamilies, industries } from "@/lib/site";
import mtpTrunkAssembly from "@/assets/mtp-trunk-assembly.webp";
import { CopperComposition, BoxComposition } from "@/components/glyphs";

/* 03 — THE PRODUCT CATALOG
    A technical register, not a marketing block. The selector reads as
    a catalog index (01/02/03); the active family opens as a catalog
    sheet — specimen left, documentation register right. The fiber
    photograph is the SAME approved source as the hero specimen but
    framed as a tight material study (detail crop), so the two plates
    never show the same image twice. Copper and electro-mechanical
    present original schematic geometry. Nothing invented. */

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
      {/* catalog index */}
      <div
        role="tablist"
        aria-label="Product families"
        onKeyDown={onKeyDown}
        className="mt-16 flex flex-wrap items-end gap-x-14 gap-y-6 border-b border-line-strong"
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
              className={`group relative pb-5 pt-1 text-left transition-colors duration-200 ${
                selected ? "text-fg" : "text-fg-muted hover:text-fg"
              }`}
            >
              <span
                className={`label-mono block transition-colors duration-200 ${
                  selected ? "!text-signal-deep" : "text-fg-faint group-hover:text-fg-muted"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-2.5 block font-display text-[clamp(1.55rem,1.25rem+2vw,2.6rem)] font-semibold leading-none tracking-[-0.02em]">
                {i === 0 ? "Fiber Optic" : i === 1 ? "Copper" : "Electro-Mechanical"}
              </span>
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
        <div className="mt-12 grid items-stretch gap-10 lg:grid-cols-[1.12fr_1fr] lg:gap-16">
          {/* specimen plate */}
          <figure className="plate reg-corners relative m-0 bg-white p-4 sm:p-5">
            <figcaption className="flex items-baseline justify-between px-1 pt-1">
              <span className="label-mono text-fg-faint">
                FIG. {String(activeIndex + 2).padStart(2, "0")}
              </span>
              <span className="label-mono hidden text-fg-faint sm:block">
                {active.id === "fiber-optic" ? "DETAIL — MATERIAL STUDY" : "SCHEMATIC REPRESENTATION"}
              </span>
            </figcaption>

            {active.id === "fiber-optic" ? (
              /* tight framing of the approved source — same asset as
                 FIG. 01, entirely different crop and purpose */
              <div className="relative mt-4 aspect-[16/11] overflow-hidden border border-line">
                <Image
                  src={mtpTrunkAssembly}
                  alt="Close view of the multi-fiber trunk cable assembly — jacket and connector detailing"
                  sizes="(max-width: 1024px) 100vw, 720px"
                  quality={90}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ) : (
              <div
                data-family={active.id}
                className="relative mt-4 flex aspect-[16/11] items-center justify-center overflow-hidden border border-line p-8 md:p-10"
                style={{ backgroundColor: stageGround[active.id], color: "#3d444d" }}
              >
                <div className="relative z-[1] flex h-full w-full items-center justify-center">
                  {active.id === "copper-cabling" ? (
                    <CopperComposition className="h-full w-auto max-w-full" />
                  ) : (
                    <BoxComposition className="h-full w-auto max-w-full" />
                  )}
                </div>
                <p className="meta-mono absolute bottom-3 left-4 z-[1]" aria-hidden="true">
                  {active.shortName.toUpperCase()}
                </p>
              </div>
            )}

            <p className="mt-4 flex items-baseline justify-between gap-4 border-t border-line px-1 pb-1 pt-3.5">
              <span className="text-sm font-medium text-fg">{active.name}</span>
              <span className="label-mono shrink-0 text-fg-faint">
                {active.id.toUpperCase()}
              </span>
            </p>
          </figure>

          {/* documentation register */}
          <dl className="flex flex-col justify-center border-t border-line-strong">
            <div className="grid grid-cols-[6.5rem_1fr] gap-x-6 py-5 sm:grid-cols-[7.5rem_1fr]">
              <dt className="label-mono pt-1.5 text-fg-faint">Family</dt>
              <dd>
                <h3 id={headingId} className="display-product">
                  {active.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-fg-muted">{active.tagline}.</p>
              </dd>
            </div>
            <div className="grid grid-cols-[6.5rem_1fr] gap-x-6 border-t border-line py-5 sm:grid-cols-[7.5rem_1fr]">
              <dt className="label-mono pt-1 text-fg-faint">Profile</dt>
              <dd className="type-body text-fg-muted">{active.description}</dd>
            </div>
            <div className="grid grid-cols-[6.5rem_1fr] gap-x-6 border-t border-line py-5 sm:grid-cols-[7.5rem_1fr]">
              <dt className="label-mono pt-1.5 text-fg-faint">Applications</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
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
              </dd>
            </div>
            <div className="grid grid-cols-[6.5rem_1fr] gap-x-6 border-t border-line py-5 sm:grid-cols-[7.5rem_1fr]">
              <dt className="label-mono pt-1 text-fg-faint">Engage</dt>
              <dd>
                <Link
                  href={`/contact?capability=${active.id}#quote-form`}
                  className="text-link"
                >
                  Discuss this family
                  <svg className="text-link-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M0 5h12M8 1l4 4-4 4" />
                  </svg>
                </Link>
              </dd>
            </div>
            <p className="meta-mono mt-auto hidden justify-end gap-3 pb-1 text-fg-faint lg:flex" aria-hidden="true">
              CATALOG SHEET {String(activeIndex + 1).padStart(2, "0")} / 03
            </p>
          </dl>
        </div>
      </div>
    </div>
  );
}
