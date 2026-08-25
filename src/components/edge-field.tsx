"use client";

import Link from "next/link";
import { useState } from "react";
import { industries, productFamilies } from "@/lib/site";

/* THE SYSTEM MAP — where the connections go.
    A living drawing of the relations that actually exist in the
    company's data: each industry connects to the product families
    that verifiably serve it. The architecture reads without any
    interaction — solid terminals, family terminals, and dotted
    circuit traces carry the relations in a static screenshot.
    Hovering or focusing an industry traces its real connections in
    signal blue; everything else recedes. Touch pins a selection.
    On mobile the same verified relations stack as a designed
    register — the desktop drawing is never forced onto a small
    screen. */

const INDUSTRY_Y: Record<string, number> = {
  "data-centers": 80,
  "semiconductor-equipment": 225,
  automotive: 370,
  "clean-energy": 515,
};
const FAMILY_XY: Record<string, { x: number; y: number }> = {
  "fiber-optic": { x: 790, y: 130 },
  "copper-cabling": { x: 790, y: 310 },
  "electro-mechanical": { x: 790, y: 490 },
};

/* verified relations only */
const EDGES: { industry: string; family: string }[] = [
  { industry: "data-centers", family: "fiber-optic" },
  { industry: "data-centers", family: "copper-cabling" },
  { industry: "semiconductor-equipment", family: "fiber-optic" },
  { industry: "semiconductor-equipment", family: "electro-mechanical" },
  { industry: "automotive", family: "electro-mechanical" },
  { industry: "clean-energy", family: "electro-mechanical" },
];

export function EdgeField() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const active = hovered ?? pinned;

  return (
    <div>
      {/* -------------------------------------------- desktop system map */}
      <div className="relative hidden select-none lg:block">
        {/* register headers — the two poles of the diagram */}
        <div aria-hidden="true" className="relative mb-2 h-4">
          <p className="label-mono absolute right-[81%] whitespace-nowrap text-fg-faint">
            Industry sectors
          </p>
          <p className="label-mono absolute left-[81%] pl-10 text-fg-faint">
            Product families
          </p>
        </div>

        <div className="relative h-[600px]">
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 620"
            preserveAspectRatio="none"
            fill="none"
            className="absolute inset-0 h-full w-full text-fg-muted"
          >
            {/* faint column rails */}
            <line x1="218" y1="24" x2="218" y2="596" stroke="currentColor" strokeWidth="1" opacity="0.28" />
            <line x1="782" y1="24" x2="782" y2="596" stroke="currentColor" strokeWidth="1" opacity="0.28" />

            {EDGES.map(({ industry, family }) => {
              const iy = INDUSTRY_Y[industry];
              const fx = FAMILY_XY[family].x;
              const fy = FAMILY_XY[family].y;
              const live = active === industry;
              const dim = !!active && !live;
              return (
                <path
                  key={`${industry}-${family}`}
                  d={`M225 ${iy}C460 ${iy} 520 ${fy} ${fx - 8} ${fy}`}
                  stroke={live ? "#0092fc" : "currentColor"}
                  strokeWidth={live ? 2 : 1.5}
                  strokeLinecap="round"
                  strokeDasharray={live ? "none" : "0.1 6.5"}
                  opacity={live ? 1 : dim ? 0.15 : 0.75}
                  vectorEffect="non-scaling-stroke"
                  className="transition-all duration-300"
                />
              );
            })}
            {industries.map((ind) => {
              const y = INDUSTRY_Y[ind.id];
              const live = active === ind.id;
              const dim = !!active && !live;
              return (
                <rect
                  key={ind.id}
                  x="211"
                  y={y - 7}
                  width="14"
                  height="14"
                  stroke={live ? "#0092fc" : "currentColor"}
                  strokeWidth={live ? 2 : 1.75}
                  fill={live ? "#0092fc" : "var(--bg)"}
                  opacity={dim ? 0.28 : 1}
                  vectorEffect="non-scaling-stroke"
                  className="transition-all duration-300"
                />
              );
            })}
            {productFamilies.map((fam) => {
              const { x, y } = FAMILY_XY[fam.id];
              const live =
                active !== null &&
                EDGES.some((e) => e.family === fam.id && e.industry === active);
              const dim = !!active && !live;
              return (
                <circle
                  key={fam.id}
                  cx={x}
                  cy={y}
                  r={live ? 7.5 : 6.5}
                  fill={live ? "#0092fc" : "var(--bg)"}
                  stroke={live ? "#0092fc" : "currentColor"}
                  strokeWidth="1.75"
                  opacity={dim ? 0.25 : 1}
                  vectorEffect="non-scaling-stroke"
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* industry controls */}
          {industries.map((ind, i) => {
            const live = active === ind.id;
            const dim = !!active && !live;
            return (
              <button
                key={ind.id}
                type="button"
                onMouseEnter={() => setHovered(ind.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(ind.id)}
                onBlur={() => setHovered(null)}
                onClick={() => setPinned((p) => (p === ind.id ? null : ind.id))}
                aria-pressed={pinned === ind.id}
                className={`absolute right-[81%] -translate-y-1/2 whitespace-nowrap py-3 pr-10 text-right transition-opacity duration-300 ${
                  dim ? "opacity-40" : "opacity-100"
                }`}
                style={{ top: `${(INDUSTRY_Y[ind.id] / 620) * 100}%` }}
              >
                <span className="label-mono block text-fg-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`mt-1 block font-display text-xl font-semibold leading-tight tracking-tight transition-colors duration-200 xl:text-2xl ${
                    live ? "text-accent" : "text-fg"
                  }`}
                >
                  {ind.name}
                </span>
              </button>
            );
          })}

          {/* family terminals */}
          {productFamilies.map((fam, i) => {
            const live =
              active !== null &&
              EDGES.some((e) => e.family === fam.id && e.industry === active);
            const dim = !!active && !live;
            const servedBy = EDGES.filter((e) => e.family === fam.id).length;
            return (
              <div
                key={fam.id}
                aria-hidden="true"
                className={`pointer-events-none absolute left-[81%] max-w-[17rem] -translate-y-1/2 pl-10 transition-opacity duration-300 ${
                  dim ? "opacity-35" : "opacity-100"
                }`}
                style={{ top: `${(FAMILY_XY[fam.id].y / 620) * 100}%` }}
              >
                <p className="label-mono block text-fg-faint">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  className={`mt-1 font-display text-xl font-semibold tracking-tight transition-colors duration-200 xl:text-2xl ${
                    live ? "text-accent" : "text-fg"
                  }`}
                >
                  {fam.shortName}
                </p>
                <p
                  className={`label-mono mt-1.5 block transition-colors duration-300 ${
                    live ? "!text-signal-deep" : "text-fg-faint"
                  }`}
                >
                  Serves {String(servedBy).padStart(2, "0")} industries
                </p>
              </div>
            );
          })}
        </div>

        {/* diagram legend — how to read this drawing */}
        <div
          aria-hidden="true"
          className="mt-8 flex flex-wrap items-center gap-x-9 gap-y-3 border-t border-line pt-5"
        >
          <span className="flex items-center gap-2.5">
            <span className="inline-block h-[11px] w-[11px] border-[1.5px] border-current bg-bg" />
            <span className="label-mono text-fg-faint">Industry sector</span>
          </span>
          <span className="flex items-center gap-2.5">
            <span className="node-signal !h-[11px] !w-[11px] !bg-transparent ring-[1.5px] ring-inset ring-current" />
            <span className="label-mono text-fg-faint">Product family</span>
          </span>
          <span className="flex items-center gap-2.5">
            <span className="inline-block h-px w-7 bg-signal" />
            <span className="label-mono text-fg-faint">Traced relation</span>
          </span>
          <span className="flex items-center gap-2.5">
            <span className="inline-block h-px w-7 border-t border-dotted border-current [border-top-width:2px]" />
            <span className="label-mono text-fg-faint">Verified relation</span>
          </span>
        </div>
      </div>

      {/* ------------------------------------- stacked register (mobile) */}
      <div className="lg:hidden">
        <ul className="border-t border-line-strong">
          {industries.map((ind, i) => {
            const related = EDGES.filter((e) => e.industry === ind.id).map(
              (e) => productFamilies.find((f) => f.id === e.family)!,
            );
            return (
              <li key={ind.id} className="border-b border-line py-8">
                <div className="flex items-baseline gap-4">
                  <span className="label-mono text-signal-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[clamp(1.5rem,1.3rem+1.8vw,2rem)] font-semibold tracking-tight">
                    {ind.name}
                  </h3>
                </div>
                <p className="mt-2.5 max-w-md pl-10 text-sm leading-relaxed text-fg-muted">{ind.line}</p>
                <ul className="mt-5 space-y-1 border-l border-line-strong pl-10">
                  {related.map((family) => (
                    <li key={family.id} className="relative">
                      <span
                        aria-hidden="true"
                        className="node-signal absolute -left-[43px] top-1/2 -translate-y-1/2"
                      />
                      <Link
                        href={`/products#${family.id}`}
                        className="block py-1.5 font-display text-base font-semibold transition-colors hover:text-accent"
                      >
                        {family.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>

      {/* accessible description of the visual network */}
      <ul className="sr-only">
        {EDGES.map(({ industry, family }) => (
          <li key={`${industry}-${family}`}>
            {industries.find((i) => i.id === industry)?.name} is served by{" "}
            {productFamilies.find((f) => f.id === family)?.name}.
          </li>
        ))}
      </ul>
    </div>
  );
}
