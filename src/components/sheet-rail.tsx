"use client";

import { useEffect, useState } from "react";

/* CONDUCTOR SYSTEM v2 — document sheet rail.
   On very wide screens, the homepage reads as a seven-sheet
   dossier; this fixed margin rail tracks which sheet is under
   the reader's eye. Purely a wayfinding aid: aria-hidden,
   hidden until measured, absent below 1600px. */

export type RailSheet = { id: string; n: string; label: string };

export function SheetRail({ items }: { items: RailSheet[] }) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let raf = 0;
    const update = () => {
      raf = 0;
      const probe = window.innerHeight * 0.38;
      let current = 0;
      for (let i = 0; i < items.length; i++) {
        const el = document.getElementById(items[i].id);
        if (el && el.getBoundingClientRect().top <= probe) current = i;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [items]);

  return (
    <div
      aria-hidden="true"
      className={`fixed left-7 top-1/2 z-30 hidden -translate-y-1/2 items-center gap-3 min-[1600px]:flex ${
        mounted ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      {/* rotated position readout */}
      <div className="relative h-44 w-3">
        <span
          className="sheet-rail-label label-mono absolute left-1/2 top-1/2 !text-[0.56rem] !tracking-[0.32em] whitespace-nowrap text-fg-muted"
          style={{ transform: "translate(-50%, -50%) rotate(180deg)" }}
        >
          {items[active].n} · {items[active].label}
        </span>
      </div>

      {/* tick column — one per sheet */}
      <ol>
        {items.map((item, i) => (
          <li key={item.id} className="flex h-[9px] items-center">
            <span
              className={`block transition-all duration-300 ${
                i === active
                  ? "h-[2px] w-7 bg-accent"
                  : "h-px w-4 bg-line-strong"
              }`}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
