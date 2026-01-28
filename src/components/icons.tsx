import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M16 8a4 4 0 1 0-8 0c0 2.5.4 4.5 2 6 .6.5 1.2 1 2 1.5.8-.5 1.4-1 2-1.5 1.6-1.5 2-3.5 2-6z" />
      <path d="M12 18c-1.6 0-3-1-4-2.5" />
    </svg>
  );
}
