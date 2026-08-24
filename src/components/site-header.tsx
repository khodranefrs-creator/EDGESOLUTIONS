"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { company, navItems, productFamilies } from "@/lib/site";
import mainlogo from "@/assets/mainlogo.png";

/* ------------------------------------------------------------------ */
/* Minimal fixed header. Desktop: technical mega-directory under       */
/* Products (hover/focus opens, click toggles, Escape closes and       */
/* returns focus). Mobile: full-screen indexed directory with          */
/* staggered entrance, focus trap and direct-lines block.              */
/* ------------------------------------------------------------------ */

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`nameplate ${className}`}>
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
  const [megaOpen, setMegaOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);
  const megaWrapRef = useRef<HTMLLIElement>(null);
  /* Escape closes and refocuses the trigger; without this guard the
     resulting focus event would instantly re-open the panel. */
  const suppressFocusOpen = useRef(false);

  const productsActive = pathname.startsWith("/products");

  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  /* mobile menu: scroll lock + initial focus + Escape + tab trap */
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

  /* mega panel: Escape closes; focus leaving the wrap closes it */
  useEffect(() => {
    if (!megaOpen) return;
    const wrap = megaWrapRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        suppressFocusOpen.current = true;
        megaTriggerRef.current?.focus();
        setTimeout(() => {
          suppressFocusOpen.current = false;
        }, 50);
      }
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!wrap || !wrap.contains(e.relatedTarget as Node)) {
        setMegaOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    wrap?.addEventListener("focusout", onFocusOut);
    return () => {
      window.removeEventListener("keydown", onKey);
      wrap?.removeEventListener("focusout", onFocusOut);
    };
  }, [megaOpen]);

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

      <header className="site-header fixed inset-x-0 top-0 z-50 bg-bg text-fg">
        <div className="mx-auto flex h-16 max-w-[84rem] items-center justify-between px-5 md:h-[4.5rem] md:px-10">
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
              {/* Products — mega-directory trigger; the panel is a DOM
                  sibling of the button so keyboard order enters it first */}
              <li
                ref={megaWrapRef}
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  ref={megaTriggerRef}
                  type="button"
                  onClick={() => setMegaOpen((v) => !v)}
                  onFocus={() => {
                    if (suppressFocusOpen.current) return;
                    setMegaOpen(true);
                  }}
                  aria-expanded={megaOpen}
                  aria-controls="products-mega"
                  className={`nav-link label-mono flex items-center gap-2 py-2 transition-colors duration-150 hover:text-accent ${
                    productsActive ? "text-accent" : "text-fg-muted"
                  }`}
                >
                  Products
                  <svg
                    width="9"
                    height="6"
                    viewBox="0 0 9 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    aria-hidden="true"
                    className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M1 1l3.5 3.5L8 1" />
                  </svg>
                </button>

                <div
                  id="products-mega"
                  data-open={megaOpen}
                  className="mega-wrap relative hidden lg:block"
                >
                  <div
                    className="mega-panel fixed inset-x-0 top-16 border-b border-line bg-surface text-fg md:top-[4.5rem]"
                    role="group"
                    aria-label="Product directory"
                  >
                    <div className="mx-auto flex max-w-[84rem] items-center justify-between px-5 pb-4 pt-6 md:px-10">
                      <p className="label-mono !text-[0.6rem] text-fg-faint">Product directory</p>
                      <p className="label-mono !text-[0.6rem] text-fg-faint">03 families</p>
                    </div>
                    <ol className="mx-auto grid max-w-[84rem] gap-px bg-line pb-px md:grid-cols-[1fr_1fr_1fr_0.9fr]">
                      {productFamilies.map((family) => (
                        <li key={family.id}>
                          <Link
                            href={`/products#${family.id}`}
                            onClick={() => setMegaOpen(false)}
                            className="mega-item group flex h-full flex-col gap-3 border-b border-line bg-surface p-8 transition-colors duration-200 hover:bg-bg md:border-b-0 md:p-9"
                          >
                            <span className="label-mono !text-[0.62rem] text-accent">
                              {family.index}
                            </span>
                            <span className="flex items-start justify-between gap-4">
                              <span className="type-title">{family.name}</span>
                              <svg
                                className="mega-arrow mt-1 shrink-0 text-accent"
                                width="18"
                                height="14"
                                viewBox="0 0 14 10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                aria-hidden="true"
                              >
                                <path d="M0 5h12M8 1l4 4-4 4" />
                              </svg>
                            </span>
                            <span className="text-sm leading-relaxed text-fg-muted">
                              {family.tagline}.
                            </span>
                          </Link>
                        </li>
                      ))}
                      <li className="flex flex-col justify-between gap-8 border-t border-line bg-bg p-8 md:border-l md:border-t-0 md:p-9">
                        <p className="label-mono !text-[0.62rem] leading-relaxed text-fg-faint">
                          Engineered around your requirements — not a fixed catalogue.
                        </p>
                        <Link href="/products" onClick={() => setMegaOpen(false)} className="text-link w-fit">
                          All products
                          <svg className="text-link-arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            <path d="M0 5h12M8 1l4 4-4 4" />
                          </svg>
                        </Link>
                      </li>
                    </ol>
                  </div>
                </div>
              </li>
              {navItems.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`nav-link label-mono py-2 transition-colors duration-150 hover:text-accent ${
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
              className="btn btn-primary hidden md:inline-flex !py-3 !text-[0.7rem]"
            >
              Request a Quote
            </Link>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center border border-line-strong text-fg transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M0 1h20M0 7h20M0 13h13" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* mobile navigation */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-0 z-[60] flex flex-col bg-bg text-fg"
      >
        <div className="flex h-16 items-center justify-between px-5 hairline-b md:px-10">
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
          className="menu-enter flex flex-1 flex-col overflow-y-auto px-5 pt-2 md:px-10 [padding-bottom:max(2.5rem,env(safe-area-inset-bottom))]"
        >
          <ul className="flex flex-col">
            {[{ href: "/", label: "Home", n: "00" }, ...navItems.map((item, i) => ({ ...item, n: String(i + 1).padStart(2, "0") }))].map(
              (item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const isProducts = item.href === "/products";
                return (
                  <li key={item.href} className="hairline-b">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex min-h-[3.75rem] items-center justify-between gap-6 py-4 pl-5 ${
                        active ? "menu-row-active" : ""
                      }`}
                    >
                      <span className="flex items-baseline gap-4">
                        <span
                          className={`label-mono !text-[0.58rem] ${
                            active ? "text-accent" : "text-fg-faint"
                          }`}
                          aria-hidden="true"
                        >
                          {item.n}
                        </span>
                        <span
                          className={`font-display text-[1.65rem] font-semibold leading-none tracking-tight transition-colors group-focus-visible:text-accent group-hover:text-accent ${
                            active ? "text-accent" : ""
                          }`}
                        >
                          {item.label}
                        </span>
                      </span>
                      <span className="label-mono !text-[0.56rem] text-fg-faint" aria-hidden="true">
                        {isProducts ? "03 FAMILIES" : ""}
                      </span>
                    </Link>

                    {/* v2: the product directory travels inside the menu */}
                    {isProducts ? (
                      <div className="pb-4 pl-5">
                        <p className="label-mono !text-[0.54rem] text-fg-faint">
                          Product directory
                        </p>
                        <ul className="mt-1 border-l border-line">
                          {productFamilies.map((family) => (
                            <li key={family.id}>
                              <Link
                                href={`/products#${family.id}`}
                                onClick={() => setOpen(false)}
                                className="flex min-h-[2.75rem] items-baseline gap-3 py-2 pl-4 text-sm text-fg-muted transition-colors hover:text-accent focus-visible:text-accent"
                              >
                                <span className="label-mono !text-[0.54rem] text-accent">
                                  {family.index}
                                </span>
                                {family.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              },
            )}
          </ul>

          <Link
            href="/contact#quote-form"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-8 w-full"
          >
            Request a Quote
          </Link>

          {/* direct lines */}
          <div className="mt-8">
            <p className="label-mono !text-[0.62rem] text-fg-faint">Direct lines</p>
            <ul className="mt-3 border-t border-line">
              <li className="border-b border-line">
                <a href={`tel:${company.phoneHref}`} className="group flex min-h-[3.5rem] items-center justify-between gap-6 py-3">
                  <span className="label-mono shrink-0 !text-[0.62rem] text-fg-faint transition-colors group-hover:text-accent">Call</span>
                  <span className="text-right text-sm font-medium">{company.phone}</span>
                </a>
              </li>
              <li className="border-b border-line">
                <a href={`mailto:${company.email}`} className="group flex min-h-[3.5rem] items-center justify-between gap-6 py-3">
                  <span className="label-mono shrink-0 !text-[0.62rem] text-fg-faint transition-colors group-hover:text-accent">Email</span>
                  <span className="text-right text-sm font-medium">{company.email}</span>
                </a>
              </li>
              <li className="border-b border-line">
                <div className="flex min-h-[3.5rem] items-center justify-between gap-6 py-3">
                  <span className="label-mono shrink-0 !text-[0.62rem] text-fg-faint">Visit</span>
                  <span className="text-right text-sm font-medium">
                    {company.address.street}, {company.address.city}, {company.address.state} {company.address.zip}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
