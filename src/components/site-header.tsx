"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { company, navItems, productFamilies } from "@/lib/site";
import mainlogo from "@/assets/mainlogo.png";

/* ------------------------------------------------------------------ */
/* The global header: white paper, one hairline, no decoration.        */
/* Desktop — Products opens the PRODUCT DIRECTORY: three families      */
/* documented at full scale, not a SaaS dropdown.                      */
/* Mobile — an independently designed full-screen directory with       */
/* numbered rows and generous touch targets.                           */
/* ------------------------------------------------------------------ */

function Logo({ className = "h-11 w-auto md:h-14" }: { className?: string }) {
  return (
    <Image
      src={mainlogo}
      alt="ClearEdge Solutions"
      sizes="140px"
      className={className}
      priority
    />
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [disclosed, setDisclosed] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const worldTriggerRef = useRef<HTMLButtonElement>(null);
  const suppressFocusOpen = useRef(false);

  const productsActive = pathname.startsWith("/products");
  const navLinks = navItems.filter((item) => item.href !== "/products");
  const mobileLinks = navLinks.filter((item) => item.href !== "/resources");

  useEffect(() => {
    setOpen(false);
    setDirectoryOpen(false);
  }, [pathname]);

  /* viewport crossing must close the mode-mismatched menu: the full-
     screen phone directory can never be left stranded over the desktop
     layout, and the hover directory cannot survive below the lg break */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
      else setDirectoryOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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

  /* product directory: Escape closes; focus leaving the wrap closes it */
  useEffect(() => {
    if (!directoryOpen) return;
    const wrap = document.getElementById("products-directory");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDirectoryOpen(false);
        suppressFocusOpen.current = true;
        worldTriggerRef.current?.focus();
        setTimeout(() => {
          suppressFocusOpen.current = false;
        }, 50);
      }
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!wrap || !wrap.contains(e.relatedTarget as Node)) {
        setDirectoryOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    wrap?.addEventListener("focusout", onFocusOut);
    return () => {
      window.removeEventListener("keydown", onKey);
      wrap?.removeEventListener("focusout", onFocusOut);
    };
  }, [directoryOpen]);

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

      {/* ---------------------------------------------- white global bar */}
      <header
        className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white"
        onMouseLeave={() => setDirectoryOpen(false)}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-[88rem] items-center justify-between px-5 md:h-[4.75rem] md:px-10">
          <Link
            href="/"
            className="flex shrink-0 items-center transition-opacity duration-200 hover:opacity-80"
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
                  onClick={() => setDirectoryOpen(true)}
                  onFocus={() => {
                    if (suppressFocusOpen.current) return;
                    setDirectoryOpen(true);
                  }}
                  onMouseEnter={() => setDirectoryOpen(true)}
                  aria-expanded={directoryOpen}
                  aria-controls="products-directory"
                  data-open={directoryOpen}
                  className={`nav-link py-2 font-display text-[0.93rem] font-medium tracking-[-0.005em] transition-colors duration-150 ${
                    productsActive || directoryOpen
                      ? "text-accent"
                      : "text-fg-muted hover:text-fg"
                  }`}
                >
                  Products
                </button>
              </li>
              {navLinks.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`nav-link py-2 font-display text-[0.93rem] font-medium tracking-[-0.005em] transition-colors duration-150 ${
                        active ? "text-accent" : "text-fg-muted hover:text-fg"
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
              className="btn btn-primary hidden !px-5 !py-3 !text-[0.85rem] md:inline-flex"
            >
              Request a Quote
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

        {/* ------------------------------------- product directory panel */}
        <div id="products-directory" data-open={directoryOpen} className="world-wrap absolute inset-x-0 top-full hidden lg:block">
          <div className="world-panel border-b border-line-strong bg-white">
            <div className="mx-auto max-w-[88rem] px-10 pb-11 pt-9">
              <div className="flex items-baseline justify-between">
                <p className="label-mono text-fg-faint">Product Directory</p>
                <p className="label-mono hidden text-fg-faint xl:block" aria-hidden="true">
                  THREE FAMILIES — ONE CONNECTION INFRASTRUCTURE
                </p>
              </div>

              <ul className="mt-7 grid grid-cols-3">
                {productFamilies.map((family, i) => (
                  <li
                    key={family.id}
                    className={`group relative px-8 py-2 first:pl-0 ${
                      i > 0 ? "border-l border-line" : ""
                    }`}
                  >
                    <Link
                      href={`/products#${family.id}`}
                      onClick={() => setDirectoryOpen(false)}
                      className="world-item block"
                    >
                      <span className="label-mono block text-signal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-4 block font-display text-[1.42rem] font-semibold leading-snug tracking-[-0.02em] transition-colors duration-150 group-hover:text-accent">
                        {family.shortName}
                      </span>
                      <span className="mt-3 block min-h-[3.6rem] text-[0.86rem] leading-relaxed text-fg-muted">
                        {family.tagline}.
                      </span>
                      <svg
                        className="world-arrow mt-2 text-accent"
                        width="26"
                        height="14"
                        viewBox="0 0 26 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path d="M0 7h23M17 1l7 6-7 6" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                <p className="max-w-lg text-sm leading-relaxed text-fg-muted">
                  Every family is engineered around your requirements — not a
                  fixed catalogue.
                </p>
                <Link href="/products" onClick={() => setDirectoryOpen(false)} className="text-link !text-[0.88rem]">
                  Open the full catalog
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
        className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-white text-fg"
      >
        <div className="sticky top-0 z-[1] flex h-[4.25rem] items-center justify-between border-b border-line bg-white px-5 md:px-10">
          <Link
            href="/"
            onClick={closeAndReturnFocus}
            className="flex shrink-0 items-center"
            aria-label="ClearEdge Solutions — home"
          >
            <Logo className="h-9 w-auto" />
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
          className="menu-enter flex flex-1 flex-col px-5 pt-2 md:px-10 [padding-bottom:max(2.5rem,env(safe-area-inset-bottom))]"
        >
          <ul>
            {/* 00 — Home */}
            <li className={`border-b border-line ${pathname === "/" ? "dir-row-active" : ""}`}>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                aria-current={pathname === "/" ? "page" : undefined}
                className={`flex min-h-[4rem] items-center gap-6 py-4 pr-2 transition-colors hover:text-accent ${
                  pathname === "/" ? "text-accent" : ""
                }`}
              >
                <span className="label-mono w-7 shrink-0 text-fg-faint">00</span>
                <span className="font-display text-[1.9rem] font-semibold leading-tight tracking-tight">
                  Home
                </span>
              </Link>
            </li>
            {/* 01 — Products, expanding into the three families */}
            <li className={`border-b border-line ${productsActive ? "dir-row-active" : ""}`}>
              <button
                type="button"
                onClick={() => setDisclosed((v) => !v)}
                aria-expanded={disclosed}
                aria-controls="directory-products"
                className={`flex min-h-[4rem] w-full items-center gap-6 py-4 pr-2 ${
                  productsActive ? "text-accent" : ""
                }`}
              >
                <span className="label-mono w-7 shrink-0 text-fg-faint">01</span>
                <span className="font-display text-[1.9rem] font-semibold leading-tight tracking-tight">
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
                  className={`ml-auto shrink-0 transition-transform duration-300 ${disclosed ? "rotate-180" : ""}`}
                >
                  <path d="M1 1l7 7 7-7" />
                </svg>
              </button>
              <div id="directory-products" className="directory-disclosure" data-open={disclosed}>
                <div>
                  <ul className="pb-4 pl-[3.4rem] pr-2">
                    {productFamilies.map((family, fi) => (
                      <li key={family.id} className="border-t first:border-t-0 border-line">
                        <Link
                          href={`/products#${family.id}`}
                          onClick={() => setOpen(false)}
                          className="flex min-h-[3.25rem] items-center gap-4 py-2.5 transition-colors hover:text-accent"
                        >
                          <span className="label-mono shrink-0 text-signal-deep">
                            {String(fi + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[1.05rem] font-medium">{family.name}</span>
                        </Link>
                      </li>
                    ))}
                    <li className="border-t border-line">
                      <Link
                        href="/products"
                        onClick={() => setOpen(false)}
                        className="flex min-h-[3rem] items-center py-2 text-sm text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
                      >
                        Open the full catalog
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            {/* 02–05 — the remaining primary destinations */}
            {mobileLinks.map((item, i) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href} className={`border-b border-line ${active ? "dir-row-active" : ""}`}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-[4rem] items-center gap-6 py-4 pr-2 transition-colors hover:text-accent ${
                      active ? "text-accent" : ""
                    }`}
                  >
                    <span className="label-mono w-7 shrink-0 text-fg-faint">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.9rem] font-semibold leading-tight tracking-tight">
                      {item.label}
                    </span>
                    {active ? (
                      <span aria-hidden="true" className="ml-auto h-[7px] w-[7px] shrink-0 bg-signal" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact#quote-form"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-9 w-full"
          >
            Request a Quote
          </Link>

          {/* direct lines */}
          <div className="mt-10">
            <p className="label-mono text-fg-faint">Direct lines</p>
            <ul className="mt-3">
              <li className="border-b border-line">
                <a href={`tel:${company.phoneHref}`} className="flex min-h-[3.5rem] items-center justify-between gap-6 py-3 transition-colors hover:text-accent">
                  <span className="label-mono shrink-0 text-fg-faint">Call</span>
                  <span className="text-right font-display text-base font-semibold">{company.phone}</span>
                </a>
              </li>
              <li className="border-b border-line">
                <a href={`mailto:${company.email}`} className="flex min-h-[3.5rem] items-center justify-between gap-6 py-3 transition-colors hover:text-accent">
                  <span className="label-mono shrink-0 text-fg-faint">Email</span>
                  <span className="break-all text-right font-display text-base font-semibold">{company.email}</span>
                </a>
              </li>
              <li className="border-b border-line">
                <div className="flex min-h-[3.5rem] items-center justify-between gap-6 py-3">
                  <span className="label-mono shrink-0 text-fg-faint">Visit</span>
                  <span className="text-right font-display text-base font-semibold">
                    {company.address.street}, {company.address.city}, {company.address.state} {company.address.zip}
                  </span>
                </div>
              </li>
            </ul>
            <p className="mt-8 pb-2 text-sm font-medium text-fg-muted">{company.slogan}.</p>
          </div>
        </nav>
      </div>
    </>
  );
}
