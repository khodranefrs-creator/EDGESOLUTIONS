"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { productFamilies, industries } from "@/lib/site";
import mtpTrunkAssembly from "@/assets/mtp-trunk-assembly.webp";
import { CopperComposition, BoxComposition } from "@/components/glyphs";

/* THE PRODUCT CATALOG — full page instrument.
   One documentation environment holds all three families; selecting
   one changes the plate around it. Deep links (/products#id) resolve
   to the matching sheet on arrival and every change is mirrored into
   the URL so a selection can be shared. Fiber shows the approved
   photography; copper and electro-mechanical show original schematic
   geometry — nothing invented. */

const stageGround: Record<string, string> = {
  "fiber-optic": "#f2f3f4",
  "copper-cabling": "#f4f1ea",
  "electro-mechanical": "#f1f0ec",
};

export function ProductWorld() {
  const [activeId, setActiveId] = useState(productFamilies[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /* resolve deep links on arrival and whenever the hash changes later */
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.slice(1);
      if (productFamilies.some((f) => f.id === hash)) {
        setActiveId(hash);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  function select(id: string) {
    setActiveId(id);
    if (typeof window !== "undefined" && window.location.hash !== `#${id}`) {
      window.history.replaceState(null, "", `#${id}`);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const idx = productFamilies.findIndex((f) => f.id === activeId);
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % productFamilies.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + productFamilies.length) % productFamilies.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = productFamilies.length - 1;
    if (next >= 0) {
      e.preventDefault();
      select(productFamilies[next].id);
      tabRefs.current[next]?.focus();
    }
  }

  const active = productFamilies.find((f) => f.id === activeId)!;
  const activeIndex = productFamilies.indexOf(active);

  return (
    <div>
      {/* stable jump targets for /products#<family> */}
      {productFamilies.map((f) => (
        <div key={f.id} id={f.id} aria-hidden="true" className="h-0 scroll-mt-28" />
      ))}

      {/* selector */}
      <div
        role="tablist"
        aria-label="Product families"
        onKeyDown={onKeyDown}
        className="mt-16 flex flex-wrap items-end gap-x-12 gap-y-5 border-b border-line-strong"
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
              id={`world-tab-${family.id}`}
              aria-selected={selected}
              aria-controls={`world-panel-${family.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(family.id)}
              className={`relative pb-5 pt-2 text-left transition-colors duration-200 ${
                selected ? "text-fg" : "text-fg-muted hover:text-fg"
              }`}
            >
              <span className="block font-display text-[clamp(1.9rem,1.4rem+2.6vw,3.6rem)] font-semibold leading-none tracking-[-0.025em]">
                {i === 0 ? "Fiber Optic" : i === 1 ? "Copper" : "Electro-Mechanical"}
              </span>
              <span className="label-mono mt-3 block !text-[0.58rem] text-fg-faint">
                {String(i + 1).padStart(2, "0")} — {family.tagline}
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
        id={`world-panel-${active.id}`}
        aria-labelledby={`world-tab-${active.id}`}
        className="env-in"
      >
        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
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
              className="relative mt-4 flex min-h-[280px] items-center justify-center overflow-hidden border border-line p-6 sm:min-h-[400px] md:p-10 lg:min-h-[520px]"
              style={{ backgroundColor: stageGround[active.id], color: "#3d444d" }}
            >
              {active.id === "fiber-optic" ? (
                <Image
                  src={mtpTrunkAssembly}
                  alt="Multi-fiber trunk cable assembly with an aqua jacket and MPO-style connectors"
                  sizes="(max-width: 1024px) 100vw, 820px"
                  className="relative z-[1] h-auto max-h-[440px] w-full object-contain"
                />
              ) : (
                <div className="relative z-[1] flex h-full w-full items-center justify-center py-6">
                  {active.id === "copper-cabling" ? (
                    <CopperComposition className="h-auto max-h-[420px] w-full max-w-2xl" />
                  ) : (
                    <BoxComposition className="h-auto max-h-[420px] w-full max-w-2xl" />
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
            <h3 className="display-m mt-5">{active.name}</h3>
            <p className="type-lede mt-5 !text-[1.08rem] text-fg-muted">{active.tagline}.</p>
            <p className="type-body measure mt-6 text-fg-muted">{active.description}</p>

            <div className="mt-10 border-t border-line pt-7">
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

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href={`/contact?capability=${active.id}#quote-form`} className="btn btn-primary !py-3.5 !text-[0.9rem]">
                Discuss this family
              </Link>
              <Link href="/capabilities#contract-manufacturing" className="text-link">
                How we build
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
