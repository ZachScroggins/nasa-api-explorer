import type { Metadata } from "next"
import { Suspense } from "react"

import { EpicExplorer } from "@/components/epic/epic-explorer"
import { PageHeader } from "@/components/page-header"
import { Skeleton } from "@/components/ui/skeleton"
import { getEpicDates, getEpicFrames } from "@/lib/nasa/epic"
import { epicParamsSchema } from "@/lib/schemas"

export const metadata: Metadata = {
  title: "Earth from EPIC",
  description:
    "Full-disc images of Earth from the EPIC camera on NOAA's DSCOVR spacecraft at the Sun–Earth L1 point.",
}

export default function EpicPage({ searchParams }: PageProps<"/epic">) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-8">
      <PageHeader
        title="Earth from EPIC"
        description="NASA's EPIC camera rides on NOAA's DSCOVR spacecraft, parked where the pull of the Sun and Earth balance. From there it sees the whole daytime side of the planet and photographs it many times a day."
      />
      <Suspense fallback={<EpicSkeleton />}>
        <EpicView searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

async function EpicView({
  searchParams,
}: Pick<PageProps<"/epic">, "searchParams">) {
  const { type, date } = epicParamsSchema.parse(await searchParams)
  const [dates, frames] = await Promise.all([
    getEpicDates(type),
    getEpicFrames(type, date),
  ])

  return (
    <EpicExplorer
      type={type}
      date={date}
      frames={frames}
      dates={dates.ok ? dates.data : []}
    />
  )
}

function EpicSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Skeleton className="aspect-square w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    </div>
  )
}
