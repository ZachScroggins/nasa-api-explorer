"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { LuChevronLeft, LuChevronRight, LuShuffle } from "react-icons/lu"

import { DatePicker } from "@/components/date-picker"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { addDays, APOD_FIRST_DATE, fromIsoDate, toIsoDate } from "@/lib/dates"

function apodHref(date: string, latest: string) {
  return date === latest ? ("/apod" as const) : (`/apod?date=${date}` as const)
}

export function ApodControls({
  date,
  latest,
}: {
  /** The day on screen. */
  date: string
  /** The newest published day. */
  latest: string
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const previous = date > APOD_FIRST_DATE ? addDays(date, -1) : null
  const next = date < latest ? addDays(date, 1) : null

  function go(day: string) {
    startTransition(() => router.push(apodHref(day, latest)))
  }

  function goRandom() {
    const start = fromIsoDate(APOD_FIRST_DATE).getTime()
    const end = fromIsoDate(latest).getTime()
    go(toIsoDate(new Date(start + Math.random() * (end - start))))
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          disabled={!previous || isPending}
          onClick={() => previous && go(previous)}
          aria-label="Previous day"
        >
          <LuChevronLeft />
        </Button>
        <DatePicker
          value={date}
          min={APOD_FIRST_DATE}
          max={latest}
          onChange={go}
          disabled={isPending}
          label="Choose a day"
        />
        <Button
          variant="ghost"
          size="icon"
          disabled={!next || isPending}
          onClick={() => next && go(next)}
          aria-label="Next day"
        >
          <LuChevronRight />
        </Button>
      </div>
      <Button variant="outline" onClick={goRandom} disabled={isPending}>
        {isPending ? (
          <Spinner data-icon="inline-start" />
        ) : (
          <LuShuffle data-icon="inline-start" />
        )}
        Random day
      </Button>
      {date !== latest && (
        <Button
          variant="ghost"
          nativeButton={false}
          render={<Link href="/apod" />}
        >
          Back to today
        </Button>
      )}
    </div>
  )
}
