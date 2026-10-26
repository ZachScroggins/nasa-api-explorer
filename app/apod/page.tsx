import type { Metadata } from "next"
import { Suspense } from "react"
import { LuCalendarX, LuExternalLink } from "react-icons/lu"

import { ApodControls } from "@/components/apod/apod-controls"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/dates"
import { getApod, type Apod } from "@/lib/nasa/apod"
import { apodParamsSchema } from "@/lib/schemas"

export const metadata: Metadata = {
  title: "Astronomy Picture of the Day",
  description:
    "A different image or video of the universe every day since 1995, explained by a professional astronomer.",
}

export default function ApodPage({ searchParams }: PageProps<"/apod">) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:px-8">
      <Suspense fallback={<ApodSkeleton />}>
        <ApodView searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

async function ApodView({
  searchParams,
}: Pick<PageProps<"/apod">, "searchParams">) {
  const { date } = apodParamsSchema.parse(await searchParams)
  const [latest, entry] = await Promise.all([
    getApod(),
    date ? getApod(date) : null,
  ])
  const result = entry ?? latest
  const latestDate = latest.ok ? latest.data.date : (date ?? "")

  if (!result.ok) {
    return (
      <>
        {latestDate && (
          <ApodControls
            date={date && date <= latestDate ? date : latestDate}
            latest={latestDate}
          />
        )}
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <LuCalendarX />
            </EmptyMedia>
            <EmptyTitle>No picture to show</EmptyTitle>
            <EmptyDescription>{result.message}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a
                  href="https://science.nasa.gov/apod/archive/"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              Browse the archive on NASA Science
            </Button>
          </EmptyContent>
        </Empty>
      </>
    )
  }

  return (
    <>
      <ApodControls
        date={result.data.date}
        latest={latestDate || result.data.date}
      />
      <ApodEntry apod={result.data} />
    </>
  )
}

function ApodMedia({ apod }: { apod: Apod }) {
  const { media } = apod

  switch (media.kind) {
    case "image":
      return (
        <a
          href={media.src}
          target="_blank"
          rel="noreferrer"
          className="block cursor-zoom-in overflow-hidden rounded-xl bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <img
            src={media.src}
            alt={apod.alt}
            className="mx-auto max-h-[80vh] w-full animate-rise object-contain"
          />
        </a>
      )
    case "embed":
      return (
        <div className="aspect-video overflow-hidden rounded-xl bg-black">
          <iframe
            src={media.src}
            title={apod.title}
            className="size-full"
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )
    case "video":
      return (
        <video
          controls
          playsInline
          preload="metadata"
          poster={media.poster ?? undefined}
          className="w-full rounded-xl bg-black"
        >
          <source src={media.src} type="video/mp4" />
        </video>
      )
    case "link":
      return (
        <a
          href={apod.permalink}
          target="_blank"
          rel="noreferrer"
          className="flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-muted text-sm font-medium"
        >
          {media.poster ? (
            <img
              src={media.poster}
              alt={apod.alt}
              className="size-full object-cover"
            />
          ) : (
            "This one plays on NASA Science"
          )}
        </a>
      )
  }
}

function ApodEntry({ apod }: { apod: Apod }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="lg:sticky lg:top-20 lg:self-start">
        <ApodMedia apod={apod} />
      </div>
      <article className="flex min-w-0 flex-col gap-5">
        <div className="flex flex-col gap-2">
          <time
            dateTime={apod.date}
            className="text-sm font-medium text-primary"
          >
            {formatDate(apod.date)}
          </time>
          <h1 className="text-3xl font-bold tracking-tight [font-stretch:115%] sm:text-4xl">
            {apod.title}
          </h1>
          {apod.creditHtml && (
            <p
              className="text-sm text-muted-foreground [&_a]:underline [&_a]:underline-offset-4"
              dangerouslySetInnerHTML={{ __html: `Credit: ${apod.creditHtml}` }}
            />
          )}
        </div>
        <div
          className="text-lg leading-relaxed text-pretty text-foreground/90 [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/40 [&_a]:underline-offset-4 [&_a:hover]:decoration-primary"
          dangerouslySetInnerHTML={{ __html: apod.explanationHtml }}
        />
        <div>
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <a href={apod.permalink} target="_blank" rel="noreferrer" />
            }
          >
            <LuExternalLink data-icon="inline-start" />
            Open on NASA Science
          </Button>
        </div>
      </article>
    </div>
  )
}

function ApodSkeleton() {
  return (
    <>
      <Skeleton className="h-8 w-80" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Skeleton className="aspect-[4/3] w-full rounded-xl" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-4/5" />
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </>
  )
}
