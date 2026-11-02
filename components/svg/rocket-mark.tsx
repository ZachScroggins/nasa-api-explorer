import { cn } from "@/lib/utils"

/** The app mark: a rocket climbing out of a ring orbit. The flame flickers. */
export function RocketMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
    >
      <ellipse
        cx="16"
        cy="18"
        rx="13"
        ry="5.5"
        transform="rotate(-24 16 18)"
        className="fill-none stroke-primary/40"
        strokeWidth="1.5"
      />
      <g transform="rotate(40 16 16)">
        <path
          d="M14.6 22.5h2.8l-.4 3.2q-1 1.8-2 0Z"
          className="origin-[16px_22px] animate-flicker fill-chart-3"
        />
        <path
          d="M16 4c2.6 2.2 3.6 5.4 3.6 9.2v7.3h-7.2v-7.3C12.4 9.4 13.4 6.2 16 4Z"
          className="fill-primary"
        />
        <path
          d="M12.4 16.5 9.8 20v2.5l2.6-1.5Zm7.2 0 2.6 3.5v2.5l-2.6-1.5Z"
          className="fill-primary/70"
        />
        <circle cx="16" cy="12" r="1.8" className="fill-background" />
      </g>
    </svg>
  )
}
