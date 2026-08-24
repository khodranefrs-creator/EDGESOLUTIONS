"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { productFamilies, industries } from "@/lib/site";
import mtpTrunkAssembly from "@/assets/mtp-trunk-assembly.webp";
import { CopperComposition, BoxComposition } from "@/components/glyphs";

/* THE PRODUCT OBSERVATORY — full page instrument.
   One visual environment holds all three families; selecting one
   changes the environment around it. Deep links (/products#id)
   resolve to the matching environment on arrival, and every change
   is mirrored into the URL so a selection can be shared. Fiber shows
   the approved photography; copper and electro-mechanical show
   original abstract geometry — nothing invented. */

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

  return (
    <div>
      {/* stable jump targets for /products#<family> */}
      {productFamilies.map((f) => (
        <div key={f.id} id={f.id} aria-hidden="true" className="h-0 scroll-mt-24" />
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
              className={`relative pb-6 pt-2 text-left transition-colors duration-200 ${
                selected ? "text-fg" : "text-fg-faint hover:text-fg-muted"
              }`}
            >
              <span className="block font-display text-[clamp(2rem,1.4rem+3vw,4rem)] font-semibold leading-none tracking-tight">
                {family.shortName}
              </span>
              <span className="meta-mono mt-3 block !text-[0.6rem] text-fg-faint">
                {String(i + 1).padStart(2, "0")} — {family.tagline}
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
        id={`world-panel-${active.id}`}
        aria-labelledby={`world-tab-${active.id}`}
        className="env-in"
      >
        <div className="mt-14 grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          {/* stage */}
          <div
            data-family={active.id}
            className={`chamber ${chamberClass[active.id]} relative flex min-h-[320px] items-center justify-center overflow-hidden p-8 sm:min-h-[440px] lg:min-h-[600px]`}
            style={{ backgroundColor: stageGround[active.id], color: "#3d444d" }}
          >
            {active.id === "fiber-optic" ? (
              <Image
                src={mtpTrunkAssembly}
                alt="Multi-fiber trunk cable assembly with an aqua jacket and MPO-style connectors"
                sizes="(max-width: 1024px) 100vw, 860px"
                className="relative z-[1] h-auto max-h-[500px] w-full object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.18)]"
              />
            ) : (
              <div className="relative z-[1] flex h-full w-full items-center justify-center py-8">
                {active.id === "copper-cabling" ? (
                  <CopperComposition className="h-auto max-h-[500px] w-full max-w-2xl" />
                ) : (
                  <BoxComposition className="h-auto max-h-[500px] w-full max-w-2xl" />
                )}
              </div>
            )}
            <p className="meta-mono absolute bottom-5 left-6 z-[1] !text-[0.58rem]" aria-hidden="true">
              {active.name}
            </p>
          </div>

          {/* dossier */}
          <div className="flex flex-col justify-center">
            <p className="label-mono !text-[0.62rem] text-accent">
              Family {String(productFamilies.indexOf(active) + 1).padStart(2, "0")} / 03
            </p>
            <h3 className="display-m mt-5">{active.name}</h3>
            <p className="type-lede mt-5 text-fg-muted">{active.tagline}.</p>
            <p className="type-body measure mt-6 text-fg-muted">{active.description}</p>

            <div className="mt-10">
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

            <div className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-4 border-t border-line pt-7">
              <Link href={`/contact?capability=${active.id}#quote-form`} className="btn btn-primary !py-3.5">
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
