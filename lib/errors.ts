/** The ID Next attaches to server errors, for matching a report to the logs. */
export function errorDigest(error: unknown): string | null {
  return error instanceof Error &&
    "digest" in error &&
    typeof error.digest === "string"
    ? error.digest
    : null
}
