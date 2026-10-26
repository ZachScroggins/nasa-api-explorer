import Link from "next/link"
import { LuSearchX } from "react-icons/lu"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/dates"
import { PAGE_SIZE, searchImages, type ImageSummary } from "@/lib/nasa/images"

function ImageCard({ image }: { image: ImageSummary }) {
  return (
    <li>
      <Link
        href={`/images/${encodeURIComponent(image.nasaId)}`}
        className="group block h-full rounded-xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <Card className="h-full overflow-hidden pt-0 transition-colors group-hover:bg-accent/50">
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            {image.thumb && (
              <img
                src={image.thumb}
                alt=""
                loading="lazy"
                width={image.width ?? undefined}
                height={image.height ?? undefined}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </div>
          <CardHeader>
            <CardDescription className="flex items-center justify-between gap-2">
              <time dateTime={image.date}>
                {formatDate(image.date, "medium")}
              </time>
              {image.center && (
                <Badge variant="secondary">{image.center}</Badge>
              )}
            </CardDescription>
            <CardTitle className="line-clamp-2 leading-snug">
              {image.title}
            </CardTitle>
          </CardHeader>
        </Card>
      </Link>
    </li>
  )
}

/** Page numbers around the current page, with null marking a gap. */
function pageWindow(page: number, pageCount: number): (number | null)[] {
  const pages = new Set([1, pageCount, page - 1, page, page + 1])
  const sorted = [...pages]
    .filter((n) => n >= 1 && n <= pageCount)
    .sort((a, b) => a - b)
  return sorted.flatMap((n, i) =>
    i > 0 && n - sorted[i - 1] > 1 ? [null, n] : [n]
  )
}

function ResultsPagination({
  query,
  page,
  pageCount,
}: {
  query: string
  page: number
  pageCount: number
}) {
  if (pageCount <= 1) return null
  const href = (n: number) =>
    `/images?${new URLSearchParams({ q: query, page: String(n) })}` as const

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={href(page - 1)} />
          </PaginationItem>
        )}
        {pageWindow(page, pageCount).map((n, i) =>
          n === null ? (
            <PaginationItem key={`gap-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={n}>
              <PaginationLink href={href(n)} isActive={n === page}>
                {n}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        {page < pageCount && (
          <PaginationItem>
            <PaginationNext href={href(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export async function ImageResults({
  query,
  page,
}: {
  query: string
  page: number
}) {
  const result = await searchImages(query, page)

  if (!result.ok) {
    return (
      <Alert variant="destructive">
        <AlertTitle>The search didn&apos;t go through</AlertTitle>
        <AlertDescription>{result.message}</AlertDescription>
      </Alert>
    )
  }

  const { items, totalHits, pageCount } = result.data

  if (items.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <LuSearchX />
          </EmptyMedia>
          <EmptyTitle>No images match “{query}”</EmptyTitle>
          <EmptyDescription>
            {page > 1
              ? "There are no more results. Go back a page or try a new search."
              : "Check the spelling, or try a broader word like “Mars” or “Hubble.”"}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  const first = (page - 1) * PAGE_SIZE + 1
  const last = first + items.length - 1

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing {first.toLocaleString("en-US")}–{last.toLocaleString("en-US")}{" "}
        of {totalHits.toLocaleString("en-US")} images for “{query}”
      </p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {items.map((image) => (
          <ImageCard key={image.nasaId} image={image} />
        ))}
      </ul>
      <ResultsPagination query={query} page={page} pageCount={pageCount} />
    </div>
  )
}

export function ImageResultsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-4 w-64" />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <li key={i}>
            <Card className="overflow-hidden pt-0">
              <Skeleton className="aspect-[4/3] rounded-none" />
              <CardHeader>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-4/5" />
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
