"use client"

import { useEffect, useState } from "react"
import { LuDownload, LuPause, LuPlay } from "react-icons/lu"

import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { formatUtcTime } from "@/lib/dates"
import type { EpicFrame } from "@/lib/nasa/epic"
import { cn } from "@/lib/utils"

const PLAY_INTERVAL_MS = 900

export function EpicCarousel({
  frames,
  index,
  onIndexChange,
}: {
  frames: EpicFrame[]
  index: number
  onIndexChange: (index: number) => void
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [playing, setPlaying] = useState(false)
  const current = frames[index]

  useEffect(() => {
    if (!api) return
    const onSelect = () => onIndexChange(api.selectedScrollSnap())
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api, onIndexChange])

  // Stepping through a day's frames plays like a time-lapse of Earth turning.
  useEffect(() => {
    if (!api || !playing) return
    const timer = window.setInterval(() => api.scrollNext(), PLAY_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [api, playing])

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, duration: 18 }}
        className="overflow-hidden rounded-xl bg-black"
        aria-label="EPIC images for this day"
      >
        <CarouselContent>
          {frames.map((frame, i) => (
            <CarouselItem key={frame.id}>
              <a
                href={frame.png}
                target="_blank"
                rel="noreferrer"
                className="block cursor-zoom-in"
                tabIndex={i === index ? 0 : -1}
              >
                <img
                  src={frame.jpg}
                  alt={`Earth at ${formatUtcTime(frame.timestamp)}, centered on longitude ${frame.centroid.lon.toFixed(0)}°`}
                  width={1024}
                  height={1024}
                  loading={Math.abs(i - index) <= 1 ? "eager" : "lazy"}
                  className="aspect-square w-full object-contain"
                />
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </Carousel>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPlaying((value) => !value)}
            aria-pressed={playing}
          >
            {playing ? (
              <LuPause data-icon="inline-start" />
            ) : (
              <LuPlay data-icon="inline-start" />
            )}
            {playing ? "Pause" : "Play the day"}
          </Button>
          <p
            className="text-sm text-muted-foreground tabular-nums"
            aria-live="polite"
          >
            {formatUtcTime(current.timestamp)}, image {index + 1} of{" "}
            {frames.length}
          </p>
        </div>
        <Button
          variant="ghost"
          nativeButton={false}
          render={<a href={current.png} target="_blank" rel="noreferrer" />}
        >
          <LuDownload data-icon="inline-start" />
          Full-resolution PNG
        </Button>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-3">
          {frames.map((frame, i) => (
            <button
              key={frame.id}
              type="button"
              onClick={() => {
                setPlaying(false)
                api?.scrollTo(i)
              }}
              aria-label={`Show image ${i + 1}, ${formatUtcTime(frame.timestamp)}`}
              aria-current={i === index}
              className={cn(
                "size-14 shrink-0 overflow-hidden rounded-md bg-black ring-offset-2 ring-offset-background transition-opacity focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                i === index
                  ? "opacity-100 ring-2 ring-primary"
                  : "opacity-50 hover:opacity-100"
              )}
            >
              <img
                src={frame.thumb}
                alt=""
                loading="lazy"
                className="size-full"
              />
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
