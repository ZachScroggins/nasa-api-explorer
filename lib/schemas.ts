import { z } from "zod"

export const imageSearchSchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, "Type a word or two to search for.")
    .max(100, "Keep searches under 100 characters."),
})

export type ImageSearchValues = z.infer<typeof imageSearchSchema>

export const PAGE_SIZE = 24
// images-api.nasa.gov returns a 400 for any page reaching past result 10,000.
export const MAX_PAGE = Math.floor(10_000 / PAGE_SIZE)

/** URL params arrive as string | string[] | undefined; use the first value. */
const firstValue = (value: unknown) => (Array.isArray(value) ? value[0] : value)

export const imagesParamsSchema = z.object({
  q: z.preprocess(
    firstValue,
    z.string().trim().min(1).max(100).catch("Supernova")
  ),
  page: z.preprocess(
    firstValue,
    z.coerce.number().int().min(1).max(MAX_PAGE).catch(1)
  ),
})

export const epicParamsSchema = z.object({
  type: z.preprocess(
    firstValue,
    z.enum(["natural", "enhanced"]).catch("natural")
  ),
  date: z.preprocess(firstValue, z.iso.date().optional().catch(undefined)),
})

export const apodParamsSchema = z.object({
  date: z.preprocess(firstValue, z.iso.date().optional().catch(undefined)),
})
