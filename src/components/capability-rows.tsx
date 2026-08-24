"use client";

import { useState } from "react";
import Link from "next/link";
import type { Capability } from "@/lib/site";
import { productFamilies } from "@/lib/site";

/* Expanding technical rows — the capability inventory reads like a
   specification sheet: collapsed to one line each, expanding in place
   to reveal detail, related product families, and an engagement link. */

export function CapabilityRows({
  capabilities,
}: {
  capabilities: Capability[];
}) {
  const [openId, setOpenId] = useState<string | null>(capabilities[0]?.id ?? null);

  return (
    <div className="border-t border-line-strong">
      {capabilities.map((cap) => {
        const open = openId === cap.id;
        const related = productFamilies.filter(
          (f) => cap.familyIds?.includes(f.id),
        );
        return (
          <div key={cap.id} id={cap.id} className="scroll-mt-28 border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`cap-panel-${cap.id}`}
                onClick={() => setOpenId(open ? null : cap.id)}
                className="group flex min-h-[4rem] w-full items-center gap-x-6 py-6 text-left"
              >
                <span className={`label-mono shrink-0 !text-[0.66rem] transition-colors ${open ? "text-accent" : "text-fg-faint group-hover:text-accent"}`}>
                  {cap.index}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`type-title block transition-colors duration-200 md:!text-[1.5rem] ${open ? "text-accent" : "group-hover:text-accent"}`}>
                    {cap.name}
                  </span>
                  <span className="mt-1 block text-sm text-fg-muted sm:hidden">{cap.tagline}</span>
                </span>
                <span className="label-mono hidden shrink-0 !text-[0.62rem] !tracking-[0.14em] text-fg-muted lg:block">
                  {cap.tagline}
                </span>
                <svg
                  aria-hidden="true"
                  className="xrow-plus h-3.5 w-3.5 shrink-0 text-fg-faint transition-colors group-hover:text-accent"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M7 0v14M0 7h14" />
                </svg>
              </button>
            </h3>

            <div
              id={`cap-panel-${cap.id}`}
              role="region"
              aria-label={`${cap.name} details`}
              className="xrow-panel"
              {...{ "data-open": open }}
            >
              <div>
                <div className="grid gap-8 pb-9 pl-[calc(0.66rem+1.5rem)] pr-2 md:grid-cols-[1.3fr_1fr_auto] md:items-start md:gap-x-14 lg:pl-14">
                  <p className="type-body max-w-xl text-fg-muted">{cap.description}</p>

                  <div>
                    <p className="label-mono !text-[0.6rem] text-fg-faint">Related products</p>
                    <ul className="mt-3 space-y-2">
                      {related.map((f) => (
                        <li key={f.id}>
                          <Link
                            href={`/products#${f.id}`}
                            className="link-quiet inline-flex items-center gap-3 text-sm"
                          >
                            <span className="label-mono !text-[0.58rem] text-accent">{f.index}</span>
                            {f.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/contact?capability=${cap.id}#quote-form`}
                    className="text-link w-fit md:self-end"
                  >
                    Explore
                    <svg className="text-link-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M0 5h12M8 1l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
