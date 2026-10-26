import "server-only"

import { cacheLife, cacheTag } from "next/cache"
import { z } from "zod"

import { fail, getJson, ok, type Result } from "@/lib/nasa/result"
import { decodeEntities, sanitizeHtml, stripHtml } from "@/lib/sanitize"

const IMAGES_API = "https://images-api.nasa.gov"

export const DEFAULT_QUERY = "Supernova"
export const PAGE_SIZE = 24
// The API stops paging after 10,000 results.
const MAX_RESULTS = 10_000

const itemData = z.object({
  nasa_id: z.string(),
  title: z.string(),
  date_created: z.string(),
  description: z.string().nullish(),
  description_508: z.string().nullish(),
  keywords: z.array(z.string()).nullish(),
  center: z.string().nullish(),
  photographer: z.string().nullish(),
  secondary_creator: z.string().nullish(),
  location: z.string().nullish(),
  media_type: z.string(),
})

const itemLink = z.object({
  href: z.string(),
  rel: z.string(),
  render: z.string().nullish(),
  width: z.number().nullish(),
  height: z.number().nullish(),
})

const searchResponse = z.object({
  collection: z.object({
    items: z.array(
      z.object({
        data: z.array(itemData).nonempty(),
        links: z.array(itemLink).nullish(),
      })
    ),
    metadata: z.object({ total_hits: z.number() }),
  }),
})

const assetResponse = z.object({
  collection: z.object({ items: z.array(z.object({ href: z.string() })) }),
})

export type ImageSummary = {
  nasaId: string
  title: string
  date: string
  center: string | null
  thumb: string | null
  width: number | null
  height: number | null
}

export type ImageSearch = {
  query: string
  page: number
  totalHits: number
  pageCount: number
  items: ImageSummary[]
}

export type ImageDetail = {
  nasaId: string
  title: string
  date: string
  center: string | null
  creator: string | null
  location: string | null
  keywords: string[]
  descriptionHtml: string
  summary: string
  preview: string
  original: string
}

function https(url: string) {
  return url.replace(/^http:\/\//, "https://").replaceAll(" ", "%20")
}

/** Searches NASA's image library for still images. */
export async function searchImages(
  query: string,
  page: number
): Promise<Result<ImageSearch>> {
  "use cache"
  cacheLife("days")
  cacheTag("images")

  const params = new URLSearchParams({
    q: query,
    media_type: "image",
    page: String(page),
    page_size: String(PAGE_SIZE),
  })
  const result = await getJson(`${IMAGES_API}/search?${params}`, searchResponse)
  if (!result.ok) return result

  const { items, metadata } = result.data.collection
  const totalHits = metadata.total_hits

  return ok({
    query,
    page,
    totalHits,
    pageCount: Math.ceil(Math.min(totalHits, MAX_RESULTS) / PAGE_SIZE),
    items: items.map(({ data: [data], links }) => {
      const preview =
        links?.find((link) => link.href.includes("~medium")) ??
        links?.find((link) => link.rel === "preview")
      return {
        nasaId: data.nasa_id,
        title: decodeEntities(data.title),
        date: data.date_created.slice(0, 10),
        center: data.center ?? null,
        thumb: preview ? https(preview.href) : null,
        width: preview?.width ?? null,
        height: preview?.height ?? null,
      }
    }),
  })
}

/** One image with its full metadata and the largest available file. */
export async function getImage(nasaId: string): Promise<Result<ImageDetail>> {
  "use cache"
  cacheLife("weeks")
  cacheTag("images", `image-${nasaId}`)

  const id = encodeURIComponent(nasaId)
  const [search, assets] = await Promise.all([
    getJson(`${IMAGES_API}/search?nasa_id=${id}`, searchResponse),
    getJson(`${IMAGES_API}/asset/${id}`, assetResponse),
  ])

  if (!search.ok) return search
  const item = search.data.collection.items[0]
  if (!item) return fail(404, `No image has the NASA ID “${nasaId}”.`)

  const [data] = item.data
  const files = assets.ok
    ? assets.data.collection.items.map(({ href }) => https(href))
    : []
  const pick = (size: string) =>
    files.find((href) => href.includes(`~${size}.`))
  const fallback = item.links?.[0]?.href ? https(item.links[0].href) : ""

  const description = data.description ?? data.description_508 ?? ""
  const descriptionHtml = sanitizeHtml(
    // Plain-text descriptions use newlines for paragraphs.
    /<[a-z][\s\S]*>/i.test(description)
      ? description
      : description.replace(/\n{2,}/g, "<br><br>")
  )

  return ok({
    nasaId: data.nasa_id,
    title: decodeEntities(data.title),
    date: data.date_created.slice(0, 10),
    center: data.center ?? null,
    creator: data.photographer ?? data.secondary_creator ?? null,
    location: data.location ?? null,
    keywords: [...new Set(data.keywords ?? [])].slice(0, 24),
    descriptionHtml,
    summary: stripHtml(descriptionHtml).slice(0, 300),
    preview: pick("large") ?? pick("medium") ?? fallback,
    original: pick("orig") ?? pick("large") ?? fallback,
  })
}
