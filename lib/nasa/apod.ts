import "server-only"

import { cacheLife, cacheTag } from "next/cache"
import { z } from "zod"

import { APOD_FIRST_DATE, isIsoDate } from "@/lib/dates"
import { fail, getJson, ok, type Result } from "@/lib/nasa/result"
import { decodeEntities, sanitizeHtml, stripHtml } from "@/lib/sanitize"

// APOD moved to science.nasa.gov on 2026-09-10. The legacy
// api.nasa.gov/planetary/apod endpoint now returns a placeholder.
const APOD_API = "https://science.nasa.gov/wp-json/wp/v2/apod-basic"

export type ApodMedia =
  | { kind: "image"; src: string }
  | { kind: "embed"; src: string; poster: string | null }
  | { kind: "video"; src: string; poster: string | null }
  | { kind: "link"; poster: string | null }

export type Apod = {
  date: string
  title: string
  permalink: string
  alt: string
  media: ApodMedia
  /** Sanitized HTML: links and emphasis only. */
  explanationHtml: string
  /** Sanitized HTML, or null when the picture has no listed credit. */
  creditHtml: string | null
  /** Plain-text explanation for metadata and previews. */
  summary: string
}

const apodEntry = z.object({
  date: z.string(),
  title: z.string(),
  permalink: z.url(),
  media_type: z.string(),
  explanation: z.string().nullish(),
  credit: z.string().nullish(),
  copyright: z.string().nullish(),
  alt: z.string().nullish(),
  hdurl: z.string().nullish(),
  basic_html: z.string().nullish(),
})

type ApodResponse = z.infer<typeof apodEntry>

// The latest picture comes back as a one-item list; a dated one as an object.
const apodResponse = z.union([
  apodEntry,
  z
    .array(apodEntry)
    .nonempty()
    .transform(([first]) => first),
])

/** YYYY-MM-DD → YYMMDD, the id the new endpoint uses for a date. */
function toApodId(date: string) {
  return date.slice(2).replaceAll("-", "")
}

function cleanExplanation(html: string) {
  return sanitizeHtml(
    html
      .replace(/^\s*<strong>\s*Explanation:?\s*<\/strong>\s*/i, "")
      // The archive appends a teaser for the next day; it is stale here.
      .replace(/(<br\s*\/?>\s*)*<strong>\s*Tomorrow['’]s picture:[\s\S]*$/i, "")
  )
}

function cleanCredit(html: string | null | undefined) {
  if (!html) return null
  const credit = sanitizeHtml(
    html.replace(/^\s*<(b|em|strong)>[^<]*Credit[^<]*<\/\1>:?\s*/i, "")
  )
  return stripHtml(credit) ? credit : null
}

function https(url: string) {
  return url.replace(/^\/\//, "https://").replace(/^http:\/\//, "https://")
}

function findMedia(entry: ApodResponse): ApodMedia {
  const poster = entry.hdurl ? https(entry.hdurl) : null
  if (entry.media_type === "image" && poster) {
    return { kind: "image", src: poster }
  }

  const html = entry.basic_html ?? ""
  const iframe = /<iframe[^>]+src=["']([^"']+)["']/i.exec(html)?.[1]
  if (iframe)
    return { kind: "embed", src: https(decodeEntities(iframe)), poster }

  const file =
    /<source[^>]+src=["']([^"']+)["']/i.exec(html)?.[1] ??
    /<video[^>]+src=["']([^"']+)["']/i.exec(html)?.[1]
  if (file) return { kind: "video", src: https(decodeEntities(file)), poster }

  return { kind: "link", poster }
}

function toApod(entry: ApodResponse): Apod {
  const explanationHtml = cleanExplanation(entry.explanation ?? "")
  return {
    date: entry.date,
    title: decodeEntities(entry.title),
    permalink: entry.permalink,
    alt: entry.alt ? decodeEntities(entry.alt) : decodeEntities(entry.title),
    media: findMedia(entry),
    explanationHtml,
    creditHtml: cleanCredit(entry.copyright ?? entry.credit),
    summary: stripHtml(explanationHtml),
  }
}

/** Today's picture, or the picture for `date` (YYYY-MM-DD). */
export async function getApod(date?: string): Promise<Result<Apod>> {
  "use cache"
  cacheLife("hours")
  cacheTag("apod")

  if (date !== undefined && !isIsoDate(date)) {
    return fail(400, "Dates look like 2026-10-26.")
  }
  if (date && date < APOD_FIRST_DATE) {
    return fail(404, "APOD started on June 16, 1995. Pick a later date.")
  }

  const url = date ? `${APOD_API}/${toApodId(date)}` : `${APOD_API}?per_page=1`
  const result = await getJson(url, apodResponse)

  if (!result.ok) {
    return result.status === 404
      ? fail(404, "There's no picture for that date yet.")
      : result
  }

  return ok(toApod(result.data))
}
