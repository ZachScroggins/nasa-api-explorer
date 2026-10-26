"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState, useTransition } from "react"
import { LuChevronLeft, LuChevronRight, LuCircleAlert } from "react-icons/lu"

import { DatePicker } from "@/components/date-picker"
import { EpicCarousel } from "@/components/epic/epic-carousel"
import { EpicDataPanel } from "@/components/epic/epic-data-panel"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { formatDate } from "@/lib/dates"
import { epicEvents } from "@/lib/epic-events"
import type { EpicFrame, EpicType } from "@/lib/nasa/epic"
import type { Result } from "@/lib/nasa/result"

function epicHref(type: EpicType, date?: string) {
  const params = new URLSearchParams({ type })
  if (date) params.set("date", date)
  return `/epic?${params}` as const
}

export function EpicExplorer({
  type,
  date,
  frames,
  dates,
}: {
  type: EpicType
  /** The requested day, or undefined for the latest. */
  date: string | undefined
  frames: Result<EpicFrame[]>
  /** Days with imagery of this type, newest first. */
  dates: string[]
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const available = useMemo(() => new Set(dates), [dates])

  const shownDate = frames.ok ? frames.data[0].timestamp.slice(0, 10) : date
  const position = shownDate ? dates.indexOf(shownDate) : -1
  // `dates` is newest first, so the previous day is further along the list.
  const previousDay = position >= 0 ? dates[position + 1] : undefined
  const nextDay = position > 0 ? dates[position - 1] : undefined

  function go(nextType: EpicType, nextDate?: string) {
    startTransition(() => router.push(epicHref(nextType, nextDate)))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <ToggleGroup
          variant="outline"
          value={[type]}
          onValueChange={([next]) => {
            // Each collection has its own dates, so switching starts at the latest day.
            if ((next === "natural" || next === "enhanced") && next !== type)
              go(next)
          }}
          aria-label="Image type"
        >
          <ToggleGroupItem value="natural">Natural color</ToggleGroupItem>
          <ToggleGroupItem value="enhanced">Enhanced color</ToggleGroupItem>
        </ToggleGroup>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            disabled={!previousDay || isPending}
            onClick={() => previousDay && go(type, previousDay)}
            aria-label="Previous day with images"
          >
            <LuChevronLeft />
          </Button>
          {dates.length > 0 && (
            <DatePicker
              value={shownDate ?? dates[0]}
              min={dates[dates.length - 1]}
              max={dates[0]}
              isAvailable={(day) => available.has(day)}
              onChange={(day) => go(type, day)}
              disabled={isPending}
              label="Choose a day with EPIC images"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            disabled={!nextDay || isPending}
            onClick={() => nextDay && go(type, nextDay)}
            aria-label="Next day with images"
          >
            <LuChevronRight />
          </Button>
        </div>

        {isPending && (
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner />
            Loading images
          </span>
        )}
      </div>

      {frames.ok ? (
        <div
          className="grid gap-6 transition-opacity data-[pending=true]:opacity-60 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
          data-pending={isPending}
        >
          <FrameViewer key={`${type}:${shownDate}`} frames={frames.data}>
            <EventsCard type={type} shownDate={shownDate} />
          </FrameViewer>
        </div>
      ) : (
        <Alert variant="destructive">
          <LuCircleAlert />
          <AlertTitle>No images to show</AlertTitle>
          <AlertDescription>
            {frames.message}{" "}
            <Link
              href={epicHref(type)}
              className="font-medium underline underline-offset-4"
            >
              Go to the latest {type} images
            </Link>
            .
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

/** Keyed by day, so the selected frame resets when the day changes. */
function FrameViewer({
  frames,
  children,
}: {
  frames: EpicFrame[]
  children: React.ReactNode
}) {
  const [index, setIndex] = useState(0)

  return (
    <>
      <EpicCarousel frames={frames} index={index} onIndexChange={setIndex} />
      <div className="flex min-w-0 flex-col gap-6">
        <EpicDataPanel frame={frames[index]} />
        {children}
      </div>
    </>
  )
}

function EventsCard({
  type,
  shownDate,
}: {
  type: EpicType
  shownDate: string | undefined
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Days worth a look</CardTitle>
        <CardDescription>
          Eclipse shadows and dust storms, seen from a million miles out.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {epicEvents.map((event) => (
            <Item
              key={event.date}
              size="sm"
              variant={event.date === shownDate ? "muted" : "default"}
              render={<Link href={epicHref("natural", event.date)} />}
            >
              <ItemContent>
                <ItemTitle>{event.title}</ItemTitle>
                <ItemDescription>
                  {formatDate(event.date, "medium")}. {event.detail}
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
        {type === "enhanced" && (
          <p className="mt-3 text-sm text-muted-foreground">
            These open the natural-color collection.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
