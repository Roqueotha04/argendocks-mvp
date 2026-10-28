interface WaveDividerProps {
  className?: string;
}

export function WaveDivider({ className = "fill-background" }: WaveDividerProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -translate-y-[calc(100%-1px)] overflow-hidden leading-[0]"
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className={`h-9 w-full md:h-14 ${className}`}
      >
        <path d="M0,60 L0,30 C220,2 420,2 640,28 C840,52 1010,54 1200,18 L1200,60 Z" />
      </svg>
    </div>
  );
}
