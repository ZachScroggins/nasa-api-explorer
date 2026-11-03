import { z } from 'zod';

import { isIsoDate, type IsoDate } from '@/lib/dates';

export const imageSearchSchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, 'Type a word or two to search for.')
    .max(100, 'Keep searches under 100 characters.'),
});

export type ImageSearchValues = z.infer<typeof imageSearchSchema>;

/** A YYYY-MM-DD date in an API response. */
export const isoDate = z.custom<IsoDate>(isIsoDate, 'Expected YYYY-MM-DD');

export const DEFAULT_QUERY = 'Supernova';
export const PAGE_SIZE = 24;
// images-api.nasa.gov returns a 400 for any page reaching past result 10,000.
export const MAX_PAGE = Math.floor(10_000 / PAGE_SIZE);

/** URL params arrive as string | string[] | undefined; use the first value. */
const firstValue = (value: unknown) => (Array.isArray(value) ? value[0] : value);

export const imagesParamsSchema = z.object({
  q: z.preprocess(
    firstValue,
    z
      .string()
      .trim()
      .min(1)
      .transform((q) => q.slice(0, 100))
      .catch(DEFAULT_QUERY)
  ),
  page: z.preprocess(firstValue, z.coerce.number().int().min(1).max(MAX_PAGE).catch(1)),
});

const dateParam = z.preprocess(firstValue, z.string().min(1).optional().catch(undefined));

/** Moves a date that isn't YYYY-MM-DD to `invalidDate`, so pages can say so. */
function splitDate<T extends { date?: string }>(params: T) {
  return params.date === undefined || isIsoDate(params.date)
    ? { ...params, date: params.date, invalidDate: undefined }
    : { ...params, date: undefined, invalidDate: params.date };
}

export const epicParamsSchema = z
  .object({
    type: z.preprocess(firstValue, z.enum(['natural', 'enhanced']).catch('natural')),
    date: dateParam,
  })
  .transform(splitDate);

export const apodParamsSchema = z.object({ date: dateParam }).transform(splitDate);
