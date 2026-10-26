"use client"

import { useState } from "react"
import { LuCalendar } from "react-icons/lu"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formatDate, isoToLocalDate, localDateToIso } from "@/lib/dates"

export function DatePicker({
  value,
  min,
  max,
  isAvailable,
  onChange,
  disabled,
  label = "Choose a date",
}: {
  /** YYYY-MM-DD */
  value: string
  min: string
  max: string
  /** Extra filter, e.g. days that have imagery. */
  isAvailable?: (date: string) => boolean
  onChange: (date: string) => void
  disabled?: boolean
  label?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" disabled={disabled} aria-label={label} />
        }
      >
        <LuCalendar data-icon="inline-start" />
        {formatDate(value, "medium")}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={isoToLocalDate(value)}
          defaultMonth={isoToLocalDate(value)}
          startMonth={isoToLocalDate(min)}
          endMonth={isoToLocalDate(max)}
          disabled={(day) => {
            const iso = localDateToIso(day)
            return (
              iso < min ||
              iso > max ||
              (isAvailable ? !isAvailable(iso) : false)
            )
          }}
          onSelect={(day) => {
            if (!day) return
            setOpen(false)
            onChange(localDateToIso(day))
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
