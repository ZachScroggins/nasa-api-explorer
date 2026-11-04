import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { z } from 'zod';

import { isIsoDate, type IsoDate } from '@/lib/dates';
import { fail, getJson, ok, type Result } from '@/lib/nasa/result';
import { isoDate } from '@/lib/schemas';

// EPIC's own API needs no key and has no rate limit, unlike the api.nasa.gov proxy.
const EPIC_API = 'https://epic.gsfc.nasa.gov/api';
const EPIC_ARCHIVE = 'https://epic.gsfc.nasa.gov/archive';

export const EPIC_TYPES = ['natural', 'enhanced'] as const;
export type EpicType = (typeof EPIC_TYPES)[number];

export function isEpicType(value: unknown): value is EpicType {
  return EPIC_TYPES.some((type) => type === value);
}

const vector = z.object({ x: z.number(), y: z.number(), z: z.number() });
export type Vector = z.infer<typeof vector>;

const epicImage = z.object({
  identifier: z.string(),
  caption: z.string(),
  image: z.string(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
    .refine((value) => isIsoDate(value.slice(0, 10))),
  centroid_coordinates: z.object({ lat: z.number(), lon: z.number() }),
  dscovr_j2000_position: vector,
  lunar_j2000_position: vector,
  sun_j2000_position: vector,
});

const epicImages = z.array(epicImage);
type EpicImage = z.infer<typeof epicImage>;
const epicDates = z.array(z.object({ date: isoDate }));

export type EpicFrame = {
  id: string;
  /** UTC timestamp, "YYYY-MM-DD HH:MM:SS". */
  timestamp: string;
  /** The UTC day of `timestamp`. */
  day: IsoDate;
  caption: string;
  centroid: { lat: number; lon: number };
  /** About 200 KB; used in the viewer. */
  jpg: string;
  /** About 3 MB at 2048 × 2048; opened by "Full resolution". */
  png: string;
  thumb: string;
  positions: { dscovr: Vector; moon: Vector; sun: Vector };
};

/** A day's frames; a day with none is a failed Result instead. */
export type EpicFrames = [EpicFrame, ...EpicFrame[]];

function archiveUrl(
  type: EpicType,
  date: IsoDate,
  format: 'jpg' | 'png' | 'thumbs',
  image: string
) {
  const [year, month, day] = date.split('-');
  const extension = format === 'png' ? 'png' : 'jpg';
  return `${EPIC_ARCHIVE}/${type}/${year}/${month}/${day}/${format}/${image}.${extension}`;
}

function toEpicFrame(type: EpicType, frame: EpicImage): EpicFrame {
  // The schema checked that the first 10 characters are a real date.
  const day = frame.date.slice(0, 10) as IsoDate;
  return {
    id: frame.identifier,
    timestamp: frame.date,
    day,
    caption: frame.caption,
    centroid: frame.centroid_coordinates,
    jpg: archiveUrl(type, day, 'jpg', frame.image),
    png: archiveUrl(type, day, 'png', frame.image),
    thumb: archiveUrl(type, day, 'thumbs', frame.image),
    positions: {
      dscovr: frame.dscovr_j2000_position,
      moon: frame.lunar_j2000_position,
      sun: frame.sun_j2000_position,
    },
  };
}

/** Every date that has imagery of `type`, newest first. */
export async function getEpicDates(type: EpicType): Promise<Result<IsoDate[]>> {
  'use cache';
  cacheTag('epic');

  const result = await getJson(`${EPIC_API}/${type}/all`, epicDates);
  if (!result.ok) {
    cacheLife('seconds');
    return result;
  }
  cacheLife('hours');
  return ok(result.data.map(({ date }) => date));
}

/** The frames for `date`, or the most recent day when `date` is omitted. */
export async function getEpicFrames(type: EpicType, date?: IsoDate): Promise<Result<EpicFrames>> {
  'use cache';
  cacheTag('epic');

  // IsoDate is only checked at compile time, and this goes into a URL path.
  if (date !== undefined && !isIsoDate(date)) {
    return fail(400, 'Dates look like 2026-10-26.');
  }

  const url = date ? `${EPIC_API}/${type}/date/${date}` : `${EPIC_API}/${type}`;
  const result = await getJson(url, epicImages);
  if (!result.ok) {
    cacheLife('seconds');
    return result;
  }

  const [first, ...rest] = result.data.map((frame) => toEpicFrame(type, frame));
  if (!first) {
    // Today's frames may still be processing, so check again soon.
    cacheLife('seconds');
    return fail(404, `EPIC has no ${type} images for that day.`);
  }

  cacheLife('hours');
  return ok([first, ...rest]);
}
