import { cn } from "@/lib/utils"

/** A satellite tumbling slowly past a small planet. */
export function LostSatellite({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 160"
      aria-hidden="true"
      className={cn("h-auto w-full max-w-xs", className)}
    >
      {[
        [20, 30, 0],
        [210, 24, 1.2],
        [180, 130, 2.4],
        [40, 120, 0.8],
        [120, 14, 3.1],
      ].map(([x, y, delay]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="1.2"
          className="animate-twinkle fill-foreground"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      <circle cx="60" cy="110" r="34" className="fill-chart-2/25" />
      <ellipse
        cx="60"
        cy="110"
        rx="52"
        ry="10"
        transform="rotate(-12 60 110)"
        className="fill-none stroke-chart-2/40"
        strokeWidth="1.5"
      />
      <g className="animate-drift">
        <g className="origin-center animate-orbit [--orbit-duration:40s] [transform-box:fill-box]">
          <rect
            x="146"
            y="52"
            width="20"
            height="20"
            rx="3"
            className="fill-primary"
          />
          <rect
            x="118"
            y="57"
            width="24"
            height="10"
            rx="1"
            className="fill-primary/50"
          />
          <rect
            x="170"
            y="57"
            width="24"
            height="10"
            rx="1"
            className="fill-primary/50"
          />
          <line
            x1="156"
            y1="52"
            x2="156"
            y2="42"
            className="stroke-primary"
            strokeWidth="2"
          />
          <circle cx="156" cy="40" r="3" className="fill-chart-3" />
        </g>
      </g>
    </svg>
  )
}
