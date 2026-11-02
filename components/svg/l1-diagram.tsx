import { cn } from "@/lib/utils"

// Fixed star positions so server and client render the same SVG.
const stars = [
  [42, 38, 1.2, 0],
  [118, 302, 0.9, 1.4],
  [210, 54, 1, 2.1],
  [268, 344, 1.3, 0.6],
  [334, 24, 0.8, 3],
  [402, 330, 1, 1.9],
  [462, 66, 1.4, 0.3],
  [530, 300, 0.9, 2.6],
  [568, 120, 1.1, 1.1],
  [150, 120, 0.7, 3.4],
  [500, 190, 0.6, 0.9],
  [300, 120, 0.7, 2.8],
] as const

/**
 * Not to scale: the Sun–Earth L1 point, where DSCOVR's EPIC camera keeps the
 * whole sunlit side of Earth in view, about 1.5 million km from Earth.
 */
export function L1Diagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 380"
      role="img"
      aria-labelledby="l1-title l1-desc"
      className={cn(
        "h-auto w-full mask-[linear-gradient(to_right,transparent,black_22%)]",
        className
      )}
    >
      <title id="l1-title">DSCOVR at the Sun–Earth L1 point</title>
      <desc id="l1-desc">
        A diagram, not to scale. The Sun is on the left. Earth is on the right
        with the Moon circling it. Between them, at the L1 point, the DSCOVR
        spacecraft loops in a halo orbit and points its EPIC camera back at
        Earth.
      </desc>
      <defs>
        <radialGradient id="l1-sun" cx="0" cy="0.5" r="1">
          <stop offset="0" stopColor="var(--chart-3)" stopOpacity="1" />
          <stop offset="0.45" stopColor="var(--chart-3)" stopOpacity="0.5" />
          <stop offset="1" stopColor="var(--chart-3)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="l1-earth" cx="0.35" cy="0.35" r="0.75">
          <stop offset="0" stopColor="var(--chart-5)" />
          <stop offset="0.55" stopColor="var(--chart-2)" />
          <stop offset="1" stopColor="var(--chart-2)" stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id="l1-terminator" x1="0" x2="1">
          <stop offset="0.5" stopColor="black" stopOpacity="0" />
          <stop offset="1" stopColor="black" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {stars.map(([x, y, r, delay]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={r}
          className="animate-twinkle fill-foreground"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {/* Sun, half off the left edge */}
      <circle cx="-30" cy="190" r="190" fill="url(#l1-sun)" />
      <circle cx="-30" cy="190" r="96" className="fill-chart-3" />
      <text x="90" y="300" className="fill-muted-foreground text-[13px]">
        Sun
      </text>

      {/* Sun–Earth line */}
      <line
        x1="66"
        y1="190"
        x2="470"
        y2="190"
        className="stroke-border"
        strokeWidth="1"
        strokeDasharray="2 6"
      />

      {/* L1 halo orbit and DSCOVR */}
      <g transform="translate(330 190)">
        <ellipse
          rx="34"
          ry="58"
          className="fill-none stroke-primary/50"
          strokeWidth="1.25"
          strokeDasharray="4 4"
        />
        {/* SVG motion keeps DSCOVR on the true ellipse; CSS rotation can't. */}
        <g className="motion-reduce:hidden">
          <animateMotion
            dur="12s"
            repeatCount="indefinite"
            path="M0-58a34 58 0 1 1 0 116a34 58 0 1 1 0-116Z"
          />
          <rect
            x="-5"
            y="-5"
            width="10"
            height="10"
            rx="2"
            className="fill-primary"
          />
          <rect
            x="-17"
            y="-2"
            width="10"
            height="4"
            className="fill-primary/60"
          />
          <rect
            x="7"
            y="-2"
            width="10"
            height="4"
            className="fill-primary/60"
          />
        </g>
        <g className="hidden motion-reduce:inline" transform="translate(0 -58)">
          <rect
            x="-5"
            y="-5"
            width="10"
            height="10"
            rx="2"
            className="fill-primary"
          />
          <rect
            x="-17"
            y="-2"
            width="10"
            height="4"
            className="fill-primary/60"
          />
          <rect
            x="7"
            y="-2"
            width="10"
            height="4"
            className="fill-primary/60"
          />
        </g>
        <circle r="2.5" className="fill-foreground" />
        <text
          y="88"
          textAnchor="middle"
          className="fill-muted-foreground text-[13px]"
        >
          L1, 1.5 million km from Earth
        </text>
      </g>

      {/* EPIC's line of sight */}
      <line
        x1="336"
        y1="190"
        x2="440"
        y2="190"
        className="animate-dash stroke-primary"
        strokeWidth="2"
        strokeDasharray="6 6"
        strokeLinecap="round"
      />

      {/* Earth and the Moon's orbit */}
      <g transform="translate(486 190)">
        <circle
          r="96"
          className="fill-none stroke-border"
          strokeWidth="1"
          strokeDasharray="1 5"
        />
        {/* The transparent circle centers the box the rotation pivots on. */}
        <g className="origin-center animate-orbit [--orbit-duration:27s] transform-fill">
          <circle r="103" className="fill-transparent" />
          <circle cx="96" r="7" className="fill-chart-4" />
        </g>
        <circle r="40" fill="url(#l1-earth)" />
        <circle r="40" fill="url(#l1-terminator)" />
        <path
          d="M-22-18c8-6 18-4 22 2s-4 12 2 18-10 10-16 4-14-14-8-24Z"
          className="fill-chart-5/70"
        />
        <text
          y="64"
          textAnchor="middle"
          className="fill-muted-foreground text-[13px]"
        >
          Earth
        </text>
      </g>
    </svg>
  )
}
