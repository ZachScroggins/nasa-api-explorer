const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** A real calendar date written as YYYY-MM-DD. Get one from `isIsoDate`. */
export type IsoDate = string & { readonly __brand: 'IsoDate' };

/** True for a real calendar date written as YYYY-MM-DD. */
export function isIsoDate(value: unknown): value is IsoDate {
  if (typeof value !== 'string' || !ISO_DATE.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && toIsoDate(date) === value;
}

export function toIsoDate(date: Date): IsoDate {
  return date.toISOString().slice(0, 10) as IsoDate;
}

/** Parses YYYY-MM-DD as midnight UTC, so the day never shifts with time zones. */
export function fromIsoDate(value: string): Date {
  return new Date(`${value}T00:00:00Z`);
}

export function clampDate(value: IsoDate, min: IsoDate, max: IsoDate): IsoDate {
  if (value < min) return min;
  return value > max ? max : value;
}

export function addDays(value: IsoDate, days: number): IsoDate {
  const date = fromIsoDate(value);
  date.setUTCDate(date.getUTCDate() + days);
  return toIsoDate(date);
}

/** Calendar components work in local time; this keeps the same Y/M/D. */
export function isoToLocalDate(value: IsoDate): Date {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function localDateToIso(date: Date): IsoDate {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}` as IsoDate;
}

/** Formats YYYY-MM-DD for display; anything else is shown as given. */
export function formatDate(value: string, style: 'long' | 'medium' | 'short' = 'long'): string {
  const date = fromIsoDate(value);
  // Intl throws on an invalid date, which would take down the whole page.
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: style === 'long' ? 'full' : style,
    timeZone: 'UTC',
  }).format(date);
}

/** EPIC timestamps look like "2026-10-23 00:22:24" and are UTC. */
export function formatUtcTime(timestamp: string): string {
  return `${timestamp.slice(11, 16)} UTC`;
}

/** The first Astronomy Picture of the Day. */
export const APOD_FIRST_DATE = '1995-06-16' as IsoDate;
