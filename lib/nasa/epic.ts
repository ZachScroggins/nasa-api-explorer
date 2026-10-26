import "server-only"

import { cacheLife, cacheTag } from "next/cache"
import { z } from "zod"

import { isIsoDate } from "@/lib/dates"
import { fail, getJson, ok, type Result } from "@/lib/nasa/result"

// EPIC's own API needs no key and has no rate limit, unlike the api.nasa.gov proxy.
const EPIC_API = "https://epic.gsfc.nasa.gov/api"
const EPIC_ARCHIVE = "https://epic.gsfc.nasa.gov/archive"

export const EPIC_TYPES = ["natural", "enhanced"] as const
export type EpicType = (typeof EPIC_TYPES)[number]

export function isEpicType(value: unknown): value is EpicType {
  return EPIC_TYPES.some((type) => type === value)
}

const vector = z.object({ x: z.number(), y: z.number(), z: z.number() })
export type Vector = z.infer<typeof vector>

const epicImage = z.object({
  identifier: z.string(),
  caption: z.string(),
  image: z.string(),
  date: z.string(),
  centroid_coordinates: z.object({ lat: z.number(), lon: z.number() }),
  dscovr_j2000_position: vector,
  lunar_j2000_position: vector,
  sun_j2000_position: vector,
})

const epicImages = z.array(epicImage)
const epicDates = z.array(z.object({ date: z.string() }))

export type EpicFrame = {
  id: string
  /** UTC timestamp, "YYYY-MM-DD HH:MM:SS". */
  timestamp: string
  caption: string
  centroid: { lat: number; lon: number }
  /** About 200 KB; used in the viewer. */
  jpg: string
  /** About 3 MB at 2048 × 2048; opened by "Full resolution". */
  png: string
  thumb: string
  positions: { dscovr: Vector; moon: Vector; sun: Vector }
}

function archiveUrl(
  type: EpicType,
  timestamp: string,
  format: "jpg" | "png" | "thumbs",
  image: string
) {
  const [year, month, day] = timestamp.slice(0, 10).split("-")
  const extension = format === "png" ? "png" : "jpg"
  return `${EPIC_ARCHIVE}/${type}/${year}/${month}/${day}/${format}/${image}.${extension}`
}

/** Every date that has imagery of `type`, newest first. */
export async function getEpicDates(type: EpicType): Promise<Result<string[]>> {
  "use cache"
  cacheLife("hours")
  cacheTag("epic")

  const result = await getJson(`${EPIC_API}/${type}/all`, epicDates)
  if (!result.ok) return result
  return ok(result.data.map(({ date }) => date))
}

/** The frames for `date`, or the most recent day when `date` is omitted. */
export async function getEpicFrames(
  type: EpicType,
  date?: string
): Promise<Result<EpicFrame[]>> {
  "use cache"
  cacheLife("hours")
  cacheTag("epic")

  if (date !== undefined && !isIsoDate(date)) {
    return fail(400, "Dates look like 2026-10-26.")
  }

  const url = date ? `${EPIC_API}/${type}/date/${date}` : `${EPIC_API}/${type}`
  const result = await getJson(url, epicImages)
  if (!result.ok) return result
  if (result.data.length === 0) {
    return fail(404, `EPIC has no ${type} images for that day.`)
  }

  return ok(
    result.data.map((frame) => ({
      id: frame.identifier,
      timestamp: frame.date,
      caption: frame.caption,
      centroid: frame.centroid_coordinates,
      jpg: archiveUrl(type, frame.date, "jpg", frame.image),
      png: archiveUrl(type, frame.date, "png", frame.image),
      thumb: archiveUrl(type, frame.date, "thumbs", frame.image),
      positions: {
        dscovr: frame.dscovr_j2000_position,
        moon: frame.lunar_j2000_position,
        sun: frame.sun_j2000_position,
      },
    }))
  )
}
