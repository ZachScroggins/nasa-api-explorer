import { z } from "zod"

/**
 * NASA requests return a result instead of throwing, so pages can show a
 * helpful message. Thrown errors lose their message in production builds.
 * Callers run under "use cache", which stores failures too, so they give a
 * failed result the short "seconds" lifetime to keep an outage from sticking.
 */
export type Result<T> =
  { ok: true; data: T } | { ok: false; status: number; message: string }

export function ok<T>(data: T): Result<T> {
  return { ok: true, data }
}

export function fail(status: number, message: string): Result<never> {
  return { ok: false, status, message }
}

const errorBody = z
  .object({
    message: z.string().optional(),
    reason: z.string().optional(),
    error: z.object({ message: z.string().optional() }).optional(),
  })
  .loose()

const REQUEST_TIMEOUT_MS = 10_000

/** Fetches JSON and validates it against `schema` before returning it. */
export async function getJson<T>(
  url: string,
  schema: z.ZodType<T>
): Promise<Result<T>> {
  let response: Response
  try {
    response = await fetch(url, {
      headers: { accept: "application/json" },
      // A stalled request would hold the page's loading state (or a build) open.
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
  } catch (error) {
    console.error(`NASA request failed: ${url}`, error)
    return error instanceof DOMException && error.name === "TimeoutError"
      ? fail(504, "NASA took too long to respond. Try again in a minute.")
      : fail(503, "NASA's servers didn't respond. Try again in a minute.")
  }

  const body: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    // 4xx are often expected (a day with no picture), so they only warn.
    const log = response.status >= 500 ? console.error : console.warn
    log(`NASA returned ${response.status} for ${url}`, body)
    const parsed = errorBody.safeParse(body)
    const reason = parsed.success
      ? (parsed.data.message ??
        parsed.data.reason ??
        parsed.data.error?.message)
      : undefined
    return fail(response.status, reason ?? response.statusText)
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    console.error(`Unexpected response from ${url}`, parsed.error)
    return fail(502, "NASA sent data in a format this app doesn't recognize.")
  }

  return ok(parsed.data)
}
