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
      className="btn-cta relative inline-flex h-auto items-center rounded-[4rem] bg-base-100/75 p-[0.15rem] backdrop-blur-[10px]"
      style={{ width: "12rem" }}
    >
      <span
        className="btn-circle block h-12 w-12 rounded-full bg-base-450 overflow-hidden"
      />
      <span className="btn-icon absolute top-[0.775rem] left-[0.95rem] text-base-100 text-2xl">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
        >
          <path d="M85 277.375h259.704L225.002 397.077 256 427l171-171L256 85l-29.922 29.924 118.626 119.701H85v42.75z" />
        </svg>
      </span>
      <span className="btn-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ml-5 whitespace-nowrap text-center text-[0.9rem] font-semibold leading-none text-base-500">
        {label}
      </span>
    </Link>
  );
}
