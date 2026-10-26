import Link from "next/link"
import { LuArrowRight } from "react-icons/lu"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate, formatUtcTime } from "@/lib/dates"
import { getApod } from "@/lib/nasa/apod"
import { getEpicFrames } from "@/lib/nasa/epic"

function PanelLink({
  href,
  children,
}: {
  href: "/apod" | "/epic"
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
    >
      {children}
      <LuArrowRight aria-hidden="true" />
    </Link>
  )
}

export async function TodayApod() {
  const result = await getApod()

  if (!result.ok) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Astronomy Picture of the Day</CardTitle>
          <CardDescription>{result.message}</CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto">
          <PanelLink href="/apod">Open APOD</PanelLink>
        </CardFooter>
      </Card>
    )
  }

  const apod = result.data
  const poster =
    apod.media.kind === "image" ? apod.media.src : apod.media.poster

  return (
    <Card className="h-full overflow-hidden pt-0">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {poster && (
          <img
            src={poster}
            alt={apod.alt}
            className="size-full object-cover transition-transform duration-700 hover:scale-105"
          />
        )}
        {apod.media.kind !== "image" && (
          <Badge className="absolute top-3 left-3">Video</Badge>
        )}
      </div>
      <CardHeader>
        <CardDescription>
          Picture of the Day, {formatDate(apod.date, "medium")}
        </CardDescription>
        <CardTitle className="text-xl">{apod.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {apod.summary}
        </p>
      </CardContent>
      <CardFooter className="mt-auto">
        <PanelLink href="/apod">Read the full explanation</PanelLink>
      </CardFooter>
    </Card>
  )
}

export async function TodayEpic() {
  const result = await getEpicFrames("natural")

  if (!result.ok) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Earth from EPIC</CardTitle>
          <CardDescription>{result.message}</CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto">
          <PanelLink href="/epic">Open EPIC</PanelLink>
        </CardFooter>
      </Card>
    )
  }

  const frames = result.data
  const latest = frames[frames.length - 1]

  return (
    <Card className="h-full overflow-hidden pt-0">
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <img
          src={latest.jpg}
          alt={`Earth photographed by EPIC at ${formatUtcTime(latest.timestamp)}`}
          className="mx-auto h-full object-contain"
        />
      </div>
      <CardHeader>
        <CardDescription>
          Latest EPIC images,{" "}
          {formatDate(latest.timestamp.slice(0, 10), "medium")}
        </CardDescription>
        <CardTitle className="text-xl">
          {frames.length} views of the whole sunlit Earth
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Taken through the day from a million miles away, as the planet turns
          beneath the camera.
        </p>
      </CardContent>
      <CardFooter className="mt-auto">
        <PanelLink href="/epic">Watch the day go by</PanelLink>
      </CardFooter>
    </Card>
  )
}

export function TodayPanelSkeleton() {
  return (
    <Card className="h-full overflow-hidden pt-0">
      <Skeleton className="aspect-[16/10] rounded-none" />
      <CardHeader>
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  )
}
