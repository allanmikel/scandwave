import { cn } from "@/lib/utils";

export default function BrandMark({
  className,
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 leading-none", className)}>
      <svg
        aria-hidden
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        className="shrink-0"
      >
        <circle cx="11" cy="11" r="10.25" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.7" />
        <path
          d="M1 11 Q 4 7, 7 11 T 13 11 T 19 11 T 21 11"
          stroke="currentColor"
          strokeWidth="0.9"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M1 13.5 Q 4.5 10.5, 8 13.5 T 14.5 13.5 T 21 13.5"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeOpacity="0.55"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="11" cy="11" r="1.2" fill="currentColor" />
      </svg>
      {withWordmark && (
        <span className="font-sans text-[13px] tracking-[0.18em] uppercase">
          Scand<span className="text-cyan">Wave</span>
        </span>
      )}
    </span>
  );
}
