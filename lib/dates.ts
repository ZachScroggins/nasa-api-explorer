const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

/** True for a real calendar date written as YYYY-MM-DD. */
export function isIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !ISO_DATE.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && toIsoDate(date) === value
}

export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

/** Parses YYYY-MM-DD as midnight UTC, so the day never shifts with time zones. */
export function fromIsoDate(value: string): Date {
  return new Date(`${value}T00:00:00Z`)
}

export function addDays(value: string, days: number): string {
  const date = fromIsoDate(value)
  date.setUTCDate(date.getUTCDate() + days)
  return toIsoDate(date)
}

/** Calendar components work in local time; this keeps the same Y/M/D. */
export function isoToLocalDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number)
  return new Date(year, month - 1, day)
}

export function localDateToIso(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${date.getFullYear()}-${month}-${day}`
}

export function formatDate(
  value: string,
  style: "long" | "medium" | "short" = "long"
): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: style === "long" ? "full" : style,
    timeZone: "UTC",
  }).format(fromIsoDate(value))
}

/** EPIC timestamps look like "2026-10-23 00:22:24" and are UTC. */
export function formatUtcTime(timestamp: string): string {
  return `${timestamp.slice(11, 16)} UTC`
}

/** The first Astronomy Picture of the Day. */
export const APOD_FIRST_DATE = "1995-06-16"
