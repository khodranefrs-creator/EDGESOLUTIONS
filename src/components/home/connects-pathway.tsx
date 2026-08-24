"use client";

import { useState } from "react";
import { Inview } from "@/components/inview";
import { SectionRule } from "@/components/ui";
import {
  SourceGlyph,
  FiberGlyph,
  CopperGlyph,
  ElectroGlyph,
  ApplicationGlyph,
} from "@/components/glyphs";

/* 02 — CONNECTION
   The engineering pathway: what moves between source and
   application. Nodes expand in place — no cards. */

const nodes = [
  {
    id: "source",
    n: "01",
    title: "Your Requirement",
    Glyph: SourceGlyph,
    body: "Builds begin with your configuration and design requirements — not a fixed catalogue.",
  },
  {
    id: "fiber",
    n: "02",
    title: "Fiber",
    Glyph: FiberGlyph,
    body: "High performance fiber optic cabling systems, engineered to meet exact performance requirements.",
  },
  {
    id: "copper",
    n: "03",
    title: "Copper",
    Glyph: CopperGlyph,
    body: "Copper cabling systems designed and manufactured for reliability around each customer’s configuration.",
  },
  {
    id: "electro-mechanical",
    n: "04",
    title: "Electro-Mechanical",
    Glyph: ElectroGlyph,
    body: "Box build assemblies that integrate connectivity into complete systems.",
  },
  {
    id: "application",
    n: "05",
    title: "Application",
    Glyph: ApplicationGlyph,
    body: "Delivered into data centers, semiconductor equipment, automotive, and clean energy.",
  },
] as const;

export function ConnectsPathway() {
  const [active, setActive] = useState<string | null>("fiber");

  return (
    <section className="theme-light bg-bg text-fg" aria-labelledby="connects-heading">
      <div className="mx-auto max-w-[84rem] px-5 py-20 md:px-10 lg:py-28">
        <Inview>
          <SectionRule n="02" label="CONNECTION — WHAT CLEAREDGE CONNECTS" meta="SIGNAL PATHWAY / 05 NODES" />
          <h2 id="connects-heading" className="type-display-m mt-8 max-w-3xl">
            Every build crosses the same pathway.
          </h2>
          <p className="type-body measure mt-5 max-w-2xl text-fg-muted">
            From first requirement to working application, ClearEdge sits
            between the signal, the component, the assembly, and the system
            it powers.
          </p>
        </Inview>

        {/* horizontal rail (desktop) */}
        <Inview delay={120} className="mt-16 hidden md:block">
          <div className="tick-rule border-t border-line-strong" aria-hidden="true">
            <span className="relative -top-[4px] left-0 block h-[7px] w-[7px] bg-accent" />
          </div>
          <ol className="grid grid-cols-5">
            {nodes.map(({ id, n, title, Glyph, body }) => {
              const isActive = active === id;
              return (
                <li
                  key={id}
                  data-active={isActive}
                  className="path-node group relative"
                  onMouseEnter={() => setActive(id)}
                >
                  <button
                    type="button"
                    onClick={() => setActive(isActive ? null : id)}
                    onFocus={() => setActive(id)}
                    onBlur={() => setActive(null)}
                    aria-expanded={isActive}
                    className="w-full pt-6 pr-6 text-left"
                  >
                    <span className={`label-mono !text-[0.62rem] transition-colors ${isActive ? "text-accent" : "text-fg-faint"}`}>
                      {n}
                    </span>
                    <span className="mt-5 block h-10 w-10">
                      <Glyph className={`h-full w-full transition-colors duration-200 ${isActive ? "text-accent" : "text-fg-faint"}`} />
                    </span>
                    <span className={`type-title mt-5 block !text-[1.05rem] transition-colors duration-200 ${isActive ? "text-accent" : ""}`}>
                      {title}
                    </span>
                    <span className="path-detail">
                      <div>
                        <span className="block pr-2 pt-3 text-sm leading-relaxed text-fg-muted">
                          {body}
                        </span>
                      </div>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="label-mono mt-12 !text-[0.62rem] text-fg-faint" aria-hidden="true">
            ▸ HOVER OR FOCUS A NODE TO INSPECT THE STAGE
          </p>
        </Inview>

        {/* vertical rail (mobile / tablet-down) */}
        <Inview delay={120} className="mt-12 md:hidden">
          <ol className="relative space-y-2 border-l border-line-strong">
            {nodes.map(({ id, n, title, Glyph, body }) => {
              const isActive = active === id;
              return (
                <li key={id} data-active={isActive} className="path-node relative -left-[1px]">
                  <button
                    type="button"
                    onClick={() => setActive(isActive ? null : id)}
                    aria-expanded={isActive}
                    className="flex w-full items-start gap-5 py-4 pl-6 pr-2 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-1 h-2 w-2 shrink-0 border transition-colors ${
                        isActive ? "border-accent bg-accent" : "border-line-strong bg-bg"
                      }`}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-4">
                        <span className={`type-title !text-[1.15rem] transition-colors ${isActive ? "text-accent" : ""}`}>
                          {title}
                        </span>
                        <span className="flex items-center gap-3">
                          <Glyph className={`h-7 w-7 shrink-0 transition-colors ${isActive ? "text-accent" : "text-fg-faint"}`} />
                          <span className={`label-mono !text-[0.62rem] ${isActive ? "text-accent" : "text-fg-faint"}`}>{n}</span>
                        </span>
                      </span>
                      <span className="path-detail">
                        <div>
                          <span className="block pt-2 text-sm leading-relaxed text-fg-muted">
                            {body}
                          </span>
                        </div>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </Inview>
      </div>
    </section>
  );
}
