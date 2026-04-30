"use client";

import Link from "next/link";

interface CTAButtonProps {
  href: string;
  label: string;
}

export function CTAButton({ href, label }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className="btn-cta relative inline-flex h-[3.5rem] md:h-[5rem] items-center rounded-[4rem] bg-base-100/75 p-[0.25rem] md:p-[0.3rem] backdrop-blur-[10px]"
      style={{ width: label.length > 8 ? "min(12rem, 60vw)" : "min(9rem, 45vw)" }}
    >
      <span
        className="btn-circle block h-[3rem] w-[3rem] md:h-[4.4rem] md:w-[4.4rem] rounded-full bg-base-450 overflow-hidden flex-shrink-0"
      />
      <span className="btn-icon absolute top-[1.1rem] left-[1.1rem] md:top-[1.6rem] md:left-[1.6rem] text-base-100">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1.2em"
          width="1.2em"
          className="text-lg md:text-2xl"
        >
          <path d="M85 277.375h259.704L225.002 397.077 256 427l171-171L256 85l-29.922 29.924 118.626 119.701H85v42.75z" />
        </svg>
      </span>
      <span className="btn-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ml-5 md:ml-8 whitespace-nowrap text-center text-sm md:text-xl font-semibold leading-none text-base-500">
        {label}
      </span>
    </Link>
  );
}
