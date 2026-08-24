"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { productFamilies, industries } from "@/lib/site";
import mtpTrunkAssembly from "@/assets/mtp-trunk-assembly.webp";
import { CopperComposition, BoxComposition } from "@/components/glyphs";

/* 03 — THE PRODUCT OBSERVATORY
   The three verified families exist in one visual environment.
   Selecting a family changes the environment — like stepping between
   physical systems in a facility. Fiber presents the approved
   photography; copper and electro-mechanical present original abstract
   geometry (no invented specifications, no invented photography).
   Full tab semantics: arrow keys move between families, focus follows,
   and reduced-motion users receive instant environment changes. */

const stageGround: Record<string, string> = {
  "fiber-optic": "#eef0f2",
  "copper-cabling": "#f0ece2",
  "electro-mechanical": "#ecebe6",
};

const chamberClass: Record<string, string> = {
  "fiber-optic": "chamber-fiber",
  "copper-cabling": "chamber-copper",
  "electro-mechanical": "chamber-electro",
};

export function ProductObservatory({ headingId }: { headingId?: string }) {
  const [activeId, setActiveId] = useState(productFamilies[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = productFamilies.find((f) => f.id === activeId)!;

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
      {/* spatial product selector */}
      <div
        role="tablist"
        aria-label="Product families"
        onKeyDown={onKeyDown}
        className="mt-14 flex flex-wrap items-end gap-x-10 gap-y-4 border-b border-line-strong"
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
              className={`relative pb-5 pt-2 text-left transition-colors duration-200 ${
                selected ? "text-fg" : "text-fg-faint hover:text-fg-muted"
              }`}
            >
              <span className="block font-display text-[clamp(1.7rem,1.2rem+2.6vw,3.4rem)] font-semibold leading-none tracking-tight">
                {family.shortName}
              </span>
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-[-1px] h-[3px] origin-left bg-accent transition-transform duration-300 ${
                  selected ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* environment */}
      <div
        key={active.id}
        role="tabpanel"
        id={`obs-panel-${active.id}`}
        aria-labelledby={`obs-tab-${active.id}`}
        className="env-in"
      >
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          {/* the stage */}
          <div
            data-family={active.id}
            className={`chamber ${chamberClass[active.id]} relative flex min-h-[300px] items-center justify-center overflow-hidden p-8 text-fg-muted sm:min-h-[400px] lg:min-h-[500px]`}
            style={{ backgroundColor: stageGround[active.id], color: "#3d444d" }}
          >
            {active.id === "fiber-optic" ? (
              <Image
                src={mtpTrunkAssembly}
                alt="Multi-fiber trunk cable assembly with an aqua jacket and MPO-style connectors"
                sizes="(max-width: 1024px) 100vw, 720px"
                className="relative z-[1] h-auto max-h-[420px] w-full object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.16)]"
              />
            ) : (
              <div className="relative z-[1] flex h-full w-full items-center justify-center py-6">
                {active.id === "copper-cabling" ? (
                  <CopperComposition className="h-auto max-h-[420px] w-full max-w-xl" />
                ) : (
                  <BoxComposition className="h-auto max-h-[420px] w-full max-w-xl" />
                )}
              </div>
            )}
            <p className="meta-mono absolute bottom-5 left-6 z-[1] !text-[0.58rem]" aria-hidden="true">
              {active.name}
            </p>
          </div>

          {/* what it is / where it applies / engage */}
          <div className="flex flex-col justify-center">
            <div>
              <h3 id={headingId} className="display-m">
                {active.name}
              </h3>
              <p className="type-body mt-5 max-w-md text-fg-muted">{active.description}</p>
            </div>

            <div className="mt-9">
              <p className="meta-mono !text-[0.6rem] text-fg-faint">Where it applies</p>
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
              <Link
                href={`/products#${active.id}`}
                className="text-link"
              >
                View this family
                <svg className="text-link-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M0 5h12M8 1l4 4-4 4" />
                </svg>
              </Link>
              <Link href={`/contact?capability=${active.id}#quote-form`} className="text-link">
                Start an RFQ
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
