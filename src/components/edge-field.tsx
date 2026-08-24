"use client";

import Link from "next/link";
import { useState } from "react";
import { industries, productFamilies } from "@/lib/site";

/* THE SYSTEM MAP — where the connections go.
   A living drawing of the relations that actually exist in the
   company's data: each industry connects to the product families
   that verifiably serve it. Hovering or focusing an industry traces
   its real connections in signal blue; everything else recedes.
   Touch pins a selection. On mobile the same verified relations
   stack as a readable register — the desktop drawing is never
   forced onto a small screen. */

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
      <div className="relative hidden h-[620px] select-none lg:block">
        <svg
          aria-hidden="true"
          viewBox="0 0 1000 620"
          preserveAspectRatio="none"
          fill="none"
          className="absolute inset-0 h-full w-full text-fg-faint"
        >
          {/* faint column rails */}
          <line x1="218" y1="24" x2="218" y2="596" stroke="currentColor" strokeWidth="1" opacity="0.18" />
          <line x1="782" y1="24" x2="782" y2="596" stroke="currentColor" strokeWidth="1" opacity="0.18" />

          {EDGES.map(({ industry, family }) => {
            const iy = INDUSTRY_Y[industry];
            const fx = FAMILY_XY[family].x;
            const fy = FAMILY_XY[family].y;
            const live = active === industry;
            const dim = !!active && !live;
            return (
              <path
                key={`${industry}-${family}`}
                d={`M224 ${iy}C460 ${iy} 520 ${fy} ${fx - 12} ${fy}`}
                stroke={live ? "#0092fc" : "currentColor"}
                strokeWidth={live ? 1.75 : 1}
                strokeDasharray={live ? "none" : "3 6"}
                opacity={live ? 1 : dim ? 0.16 : 0.42}
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
                x="212"
                y={y - 6}
                width="12"
                height="12"
                stroke={live ? "#0092fc" : "currentColor"}
                strokeWidth={live ? 2 : 1.25}
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
                r={live ? 7 : 5}
                fill={live ? "#0092fc" : "var(--bg)"}
                stroke={live ? "#0092fc" : "currentColor"}
                strokeWidth="1.5"
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
              <span className="label-mono block !text-[0.58rem] text-fg-faint">
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
          return (
            <div
              key={fam.id}
              aria-hidden="true"
              className={`pointer-events-none absolute left-[81%] max-w-[17rem] -translate-y-1/2 pl-10 transition-opacity duration-300 ${
                dim ? "opacity-35" : "opacity-100"
              }`}
              style={{ top: `${(FAMILY_XY[fam.id].y / 620) * 100}%` }}
            >
              <p className="label-mono block !text-[0.58rem] text-fg-faint">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p
                className={`mt-1 font-display text-xl font-semibold tracking-tight transition-colors duration-200 xl:text-2xl ${
                  live ? "text-accent" : "text-fg-muted"
                }`}
              >
                {fam.shortName}
              </p>
              <p className={`mt-1 text-xs leading-relaxed text-fg-muted transition-opacity duration-300 ${live ? "opacity-100" : "opacity-0"}`}>
                Serves this industry
              </p>
            </div>
          );
        })}
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
                  <span className="label-mono !text-[0.62rem] text-signal-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[clamp(1.5rem,1.3rem+1.8vw,2rem)] font-semibold tracking-tight">
                    {ind.name}
                  </h3>
                </div>
                <p className="mt-2.5 max-w-md pl-10 text-sm leading-relaxed text-fg-muted">{ind.line}</p>
                <ul className="mt-5 space-y-1 border-l border-line-strong pl-10">
                  {related.map((family) => (
                    <li key={family.id} className="flex items-center gap-3">
                      <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 bg-signal" />
                      <Link
                        href={`/products#${family.id}`}
                        className="py-1.5 font-display text-base font-semibold transition-colors hover:text-accent"
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
