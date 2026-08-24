"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { company, navItems, productFamilies } from "@/lib/site";
import mainlogo from "@/assets/mainlogo.png";

/* ------------------------------------------------------------------ */
/* Navigation of The Connection Infrastructure.                        */
/* Desktop: a quiet bar; Products opens the Product World — a bright   */
/* environment where the three families stand at full scale.           */
/* Mobile: an independently designed full-screen company directory     */
/* with generous typography, product discovery and direct lines.       */
/* ------------------------------------------------------------------ */

function Logo() {
  return (
    <span className="nameplate">
      <Image
        src={mainlogo}
        alt="ClearEdge Solutions"
        sizes="110px"
        className="h-8 w-auto md:h-9"
        priority
      />
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [worldOpen, setWorldOpen] = useState(false);
  const [disclosed, setDisclosed] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const worldTriggerRef = useRef<HTMLButtonElement>(null);
  const worldWrapRef = useRef<HTMLDivElement>(null);
  /* Escape closes and refocuses the trigger; without this guard the
     resulting focus event would instantly re-open the panel. */
  const suppressFocusOpen = useRef(false);

  const productsActive = pathname.startsWith("/products");

  useEffect(() => {
    setOpen(false);
    setWorldOpen(false);
  }, [pathname]);

  /* mobile directory: scroll lock + initial focus + Escape + tab trap */
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>("a[href], button"),
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* product world: Escape closes; focus leaving the wrap closes it */
  useEffect(() => {
    if (!worldOpen) return;
    const wrap = worldWrapRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setWorldOpen(false);
        suppressFocusOpen.current = true;
        worldTriggerRef.current?.focus();
        setTimeout(() => {
          suppressFocusOpen.current = false;
        }, 50);
      }
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!wrap || !wrap.contains(e.relatedTarget as Node)) {
        setWorldOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    wrap?.addEventListener("focusout", onFocusOut);
    return () => {
      window.removeEventListener("keydown", onKey);
      wrap?.removeEventListener("focusout", onFocusOut);
    };
  }, [worldOpen]);

  const closeAndReturnFocus = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <a
        href="#main"
        className="btn btn-primary sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
      >
        Skip to content
      </a>

      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg text-fg"
        onMouseLeave={() => setWorldOpen(false)}
      >
        <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-5 md:h-[4.5rem] md:px-10">
          <Link
            href="/"
            className="flex shrink-0 items-center transition-opacity duration-200 hover:opacity-85"
            aria-label="ClearEdge Solutions — home"
          >
            <Logo />
          </Link>

          {/* desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              <li className="relative">
                <button
                  ref={worldTriggerRef}
                  type="button"
                  onClick={() => setWorldOpen(true)}
                  onFocus={() => {
                    if (suppressFocusOpen.current) return;
                    setWorldOpen(true);
                  }}
                  onMouseEnter={() => setWorldOpen(true)}
                  aria-expanded={worldOpen}
                  aria-controls="products-world"
                  data-open={worldOpen}
                  className={`nav-link py-2 font-medium transition-colors duration-150 ${
                    productsActive || worldOpen
                      ? "text-accent"
                      : "text-fg-muted hover:text-accent"
                  }`}
                >
                  Products
                </button>
              </li>
              {navItems.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`nav-link py-2 font-medium transition-colors duration-150 hover:text-accent ${
                        active ? "text-accent" : "text-fg-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact#quote-form"
              className="btn btn-primary hidden !px-5 !py-3 !text-sm md:inline-flex"
            >
              Request a quote
            </Link>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-directory"
              className="flex h-11 w-11 items-center justify-center border border-line-strong text-fg transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M0 1h20M0 7h20M0 13h13" />
              </svg>
            </button>
          </div>
        </div>

        {/* ------------------------------ the product world (desktop) */}
        <div id="products-world" data-open={worldOpen} ref={worldWrapRef} className="world-wrap absolute inset-x-0 top-full hidden lg:block">
          <div className="world-panel theme-light border-b border-line-strong bg-bg text-fg shadow-[0_30px_60px_rgba(7,8,10,0.35)]">
            <div className="mx-auto max-w-[88rem] px-10 pb-10 pt-9">
              <p className="label-mono !text-[0.62rem] text-fg-faint">Product World</p>
              <ul className="mt-6">
                {productFamilies.map((family) => (
                  <li key={family.id} className="border-t border-line first:border-t-0">
                    <Link
                      href={`/products#${family.id}`}
                      onClick={() => setWorldOpen(false)}
                      className="world-item group flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2 py-6"
                    >
                      <span className="font-display text-[clamp(2rem,3.4vw,3.6rem)] font-semibold leading-none tracking-tight transition-colors duration-200 group-hover:text-accent">
                        {family.name}
                      </span>
                      <span className="flex items-center gap-8">
                        <span className="max-w-xs text-right text-sm leading-relaxed text-fg-muted">
                          {family.tagline}.
                        </span>
                        <svg
                          className="world-arrow shrink-0 text-accent"
                          width="26"
                          height="16"
                          viewBox="0 0 26 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          aria-hidden="true"
                        >
                          <path d="M0 8h23M17 1l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex items-center justify-between border-t border-line pt-5">
                <p className="max-w-md text-sm leading-relaxed text-fg-muted">
                  Engineered around your requirements — not a fixed catalogue.
                </p>
                <Link href="/products" onClick={() => setWorldOpen(false)} className="text-link">
                  Open the observatory
                  <svg className="text-link-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M0 5h12M8 1l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ------------------------------ mobile company directory */}
      <div
        id="mobile-directory"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="theme-light fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-bg text-fg"
      >
        <div className="sticky top-0 z-[1] flex h-16 items-center justify-between border-b border-line bg-bg px-5 md:px-10">
          <Link
            href="/"
            onClick={closeAndReturnFocus}
            className="flex shrink-0 items-center"
            aria-label="ClearEdge Solutions — home"
          >
            <Logo />
          </Link>
          <button
            type="button"
            onClick={closeAndReturnFocus}
            className="flex h-12 w-12 items-center justify-center border border-line-strong text-fg transition-colors hover:border-accent hover:text-accent"
          >
            <span className="sr-only">Close menu</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M1 1l14 14M15 1L1 15" />
            </svg>
          </button>
        </div>

        <nav
          aria-label="Mobile"
          className="menu-enter flex flex-1 flex-col px-5 pt-4 md:px-10 [padding-bottom:max(2.5rem,env(safe-area-inset-bottom))]"
        >
          <ul>
            {[{ href: "/", label: "Home" }, ...navItems].map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              const isProducts = item.href === "/products";
              return (
                <li key={item.href} className={`border-b border-line ${active ? "dir-row-active" : ""}`}>
                  {isProducts ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setDisclosed((v) => !v)}
                        aria-expanded={disclosed}
                        aria-controls="directory-products"
                        className={`flex min-h-[3.75rem] w-full items-center justify-between gap-6 py-4 pr-2 ${
                          active ? "text-accent" : ""
                        }`}
                      >
                        <span className="font-display text-[1.85rem] font-semibold leading-tight tracking-tight">
                          Products
                        </span>
                        <svg
                          width="16"
                          height="10"
                          viewBox="0 0 16 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          aria-hidden="true"
                          className={`shrink-0 transition-transform duration-300 ${disclosed ? "rotate-180" : ""}`}
                        >
                          <path d="M1 1l7 7 7-7" />
                        </svg>
                      </button>
                      <div id="directory-products" className="directory-disclosure" data-open={disclosed}>
                        <div>
                          <ul className="pb-5 pl-1">
                            {productFamilies.map((family) => (
                              <li key={family.id}>
                                <Link
                                  href={`/products#${family.id}`}
                                  onClick={() => setOpen(false)}
                                  className="flex min-h-[2.9rem] items-center gap-3 py-2 text-[1.05rem] font-medium text-fg-muted transition-colors hover:text-accent"
                                >
                                  <span aria-hidden="true" className="h-[6px] w-[6px] shrink-0 bg-accent" />
                                  {family.name}
                                </Link>
                              </li>
                            ))}
                            <li>
                              <Link
                                href="/products"
                                onClick={() => setOpen(false)}
                                className="flex min-h-[2.9rem] items-center py-2 text-sm text-fg-faint underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
                              >
                                Open the full observatory
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-[3.75rem] items-center justify-between gap-6 py-4 pr-2 transition-colors hover:text-accent ${
                        active ? "text-accent" : ""
                      }`}
                    >
                      <span className="font-display text-[1.85rem] font-semibold leading-tight tracking-tight">
                        {item.label}
                      </span>
                      {active ? (
                        <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 bg-accent" />
                      ) : null}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact#quote-form"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-9 w-full"
          >
            Request a quote
          </Link>

          {/* direct lines */}
          <div className="mt-9">
            <p className="label-mono !text-[0.62rem] text-fg-faint">Direct lines</p>
            <ul className="mt-3">
              <li className="border-b border-line">
                <a href={`tel:${company.phoneHref}`} className="flex min-h-[3.25rem] items-center justify-between gap-6 py-3 transition-colors hover:text-accent">
                  <span className="label-mono shrink-0 !text-[0.6rem] text-fg-faint">Call</span>
                  <span className="text-right text-base font-semibold">{company.phone}</span>
                </a>
              </li>
              <li className="border-b border-line">
                <a href={`mailto:${company.email}`} className="flex min-h-[3.25rem] items-center justify-between gap-6 py-3 transition-colors hover:text-accent">
                  <span className="label-mono shrink-0 !text-[0.6rem] text-fg-faint">Email</span>
                  <span className="break-all text-right text-base font-semibold">{company.email}</span>
                </a>
              </li>
              <li className="border-b border-line">
                <div className="flex min-h-[3.25rem] items-center justify-between gap-6 py-3">
                  <span className="label-mono shrink-0 !text-[0.6rem] text-fg-faint">Visit</span>
                  <span className="text-right text-base font-semibold">
                    {company.address.street}, {company.address.city}, {company.address.state} {company.address.zip}
                  </span>
                </div>
              </li>
            </ul>
            <p className="mt-7 pb-2 text-sm font-medium text-fg-muted">{company.slogan}.</p>
          </div>
        </nav>
      </div>
    </>
  );
}
