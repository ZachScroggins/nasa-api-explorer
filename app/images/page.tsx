import type { Metadata } from "next"
import { Suspense } from "react"

import {
  ImageResults,
  ImageResultsSkeleton,
} from "@/components/images/image-results"
import { ImageSearchForm } from "@/components/images/image-search-form"
import { PageHeader } from "@/components/page-header"
import { Skeleton } from "@/components/ui/skeleton"
import { imagesParamsSchema } from "@/lib/schemas"

export const metadata: Metadata = {
  title: "Image Library",
  description: "Search the NASA Image and Video Library.",
}

export default function ImagesPage({ searchParams }: PageProps<"/images">) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-8">
      <PageHeader
        title="NASA Image Library"
        description="Photos from every NASA center: missions, telescopes, test stands and the people behind them. Pick any result for its full-size file and story."
      />
      <Suspense
        fallback={
          <>
            <Skeleton className="h-11 w-full max-w-2xl" />
            <ImageResultsSkeleton />
          </>
        }
      >
        <ImagesView searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

async function ImagesView({
  searchParams,
}: Pick<PageProps<"/images">, "searchParams">) {
  const { q, page } = imagesParamsSchema.parse(await searchParams)

  return (
    <>
      <ImageSearchForm
        key={q}
        defaultQuery={q}
        hideLabel
        className="max-w-2xl"
      />
      <Suspense key={`${q}:${page}`} fallback={<ImageResultsSkeleton />}>
        <ImageResults query={q} page={page} />
      </Suspense>
    </>
  )
}
