import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { LuExternalLink, LuImageOff } from "react-icons/lu"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/dates"
import { getImage, type ImageDetail } from "@/lib/nasa/images"

export async function generateMetadata({
  params,
}: PageProps<"/images/[id]">): Promise<Metadata> {
  const { id } = await params
  const result = await getImage(decodeURIComponent(id))
  if (!result.ok) return { title: "Image not found" }
  return { title: result.data.title, description: result.data.summary }
}

export default function ImagePage({ params }: PageProps<"/images/[id]">) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 md:px-8">
      <Suspense fallback={<ImageDetailSkeleton />}>
        {params.then(({ id }) => (
          <ImageView nasaId={decodeURIComponent(id)} />
        ))}
      </Suspense>
    </div>
  )
}

async function ImageView({ nasaId }: { nasaId: string }) {
  const result = await getImage(nasaId)

  if (!result.ok) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <LuImageOff />
          </EmptyMedia>
          <EmptyTitle>This image isn&apos;t available</EmptyTitle>
          <EmptyDescription>{result.message}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button nativeButton={false} render={<Link href="/images" />}>
            Search the library
          </Button>
        </EmptyContent>
      </Empty>
    )
  }

  return <ImageDetailView image={result.data} />
}

function MetaRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null
  return (
    <div className="grid grid-cols-[8rem_1fr] gap-3 py-2 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-words">{value}</dd>
    </div>
  )
}

function ImageDetailView({ image }: { image: ImageDetail }) {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/images" />}>
              Image Library
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="min-w-0">
            <BreadcrumbPage className="truncate">{image.nasaId}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="lg:sticky lg:top-20 lg:self-start">
          <a
            href={image.original}
            target="_blank"
            rel="noreferrer"
            className="block cursor-zoom-in overflow-hidden rounded-xl bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <img
              src={image.preview}
              alt={image.summary || image.title}
              className="mx-auto max-h-[75vh] w-full animate-rise object-contain"
            />
          </a>
        </div>

        <article className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-col gap-2">
            <time
              dateTime={image.date}
              className="text-sm text-muted-foreground"
            >
              {formatDate(image.date)}
            </time>
            <h1 className="text-3xl font-bold tracking-tight [font-stretch:110%]">
              {image.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              nativeButton={false}
              render={
                <a href={image.original} target="_blank" rel="noreferrer" />
              }
            >
              <LuExternalLink data-icon="inline-start" />
              Open full resolution
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a
                  href={`https://images.nasa.gov/details/${encodeURIComponent(image.nasaId)}`}
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              View on images.nasa.gov
            </Button>
          </div>

          <dl className="divide-y">
            <MetaRow label="NASA ID" value={image.nasaId} />
            <MetaRow label="Center" value={image.center} />
            <MetaRow label="Credit" value={image.creator} />
            <MetaRow label="Location" value={image.location} />
          </dl>

          {image.keywords.length > 0 && (
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-medium">Keywords</h2>
              <div className="flex flex-wrap gap-2">
                {image.keywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    variant="outline"
                    render={
                      <Link
                        href={`/images?${new URLSearchParams({ q: keyword })}`}
                      />
                    }
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div
            className="flex flex-col gap-4 leading-relaxed text-pretty break-words text-foreground/90 [&_a[href]]:font-medium [&_a[href]]:text-primary [&_a[href]]:underline [&_a[href]]:underline-offset-4"
            dangerouslySetInnerHTML={{ __html: image.descriptionHtml }}
          />
        </article>
      </div>
    </>
  )
}

function ImageDetailSkeleton() {
  return (
    <>
      <Skeleton className="h-5 w-48" />
      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton className="aspect-[4/3] w-full rounded-xl" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-9 w-4/5" />
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </>
  )
}
