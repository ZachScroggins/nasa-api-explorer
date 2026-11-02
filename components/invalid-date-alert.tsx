import { LuCircleAlert } from "react-icons/lu"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

/** Says a bad `?date=` was ignored, so the page doesn't change without a reason. */
export function InvalidDateAlert({ value }: { value: string }) {
  return (
    <Alert>
      <LuCircleAlert />
      <AlertTitle>“{value.slice(0, 40)}” isn&apos;t a date</AlertTitle>
      <AlertDescription>
        Dates look like 2026-10-26, so this shows the latest day instead.
      </AlertDescription>
    </Alert>
  )
}
