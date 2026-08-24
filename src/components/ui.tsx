import Link from "next/link";
import type { ReactNode } from "react";

/* Shared primitives of The Connection Infrastructure.
   Deliberately few: one link voice, one annotation voice. */

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`text-link ${className}`}>
      {children}
      <svg
        className="text-link-arrow"
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M0 5h12M8 1l4 4-4 4" />
      </svg>
    </Link>
  );
}
