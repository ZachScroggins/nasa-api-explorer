"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useId, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { LuSearch } from "react-icons/lu"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { imageSearchSchema, type ImageSearchValues } from "@/lib/schemas"
import { cn } from "@/lib/utils"

export function ImageSearchForm({
  defaultQuery = "",
  label = "Search the NASA Image Library",
  hideLabel = false,
  className,
}: {
  defaultQuery?: string
  label?: string
  hideLabel?: boolean
  className?: string
}) {
  const router = useRouter()
  const inputId = useId()
  const [isPending, startTransition] = useTransition()
  const form = useForm<ImageSearchValues>({
    resolver: zodResolver(imageSearchSchema),
    defaultValues: { q: defaultQuery },
  })

  function onSubmit({ q }: ImageSearchValues) {
    const params = new URLSearchParams({ q })
    startTransition(() => router.push(`/images?${params}`))
  }

  return (
    <form
      role="search"
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("w-full", className)}
    >
      <Controller
        name="q"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor={inputId}
              className={cn(hideLabel && "sr-only")}
            >
              {label}
            </FieldLabel>
            <InputGroup className="h-11">
              <InputGroupAddon>
                <LuSearch />
              </InputGroupAddon>
              <InputGroupInput
                {...field}
                id={inputId}
                type="search"
                enterKeyHint="search"
                autoComplete="off"
                placeholder="Nebula, Apollo 11, Artemis…"
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="submit"
                  variant="default"
                  size="sm"
                  disabled={isPending}
                >
                  {isPending && <Spinner data-icon="inline-start" />}
                  Search
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  )
}
