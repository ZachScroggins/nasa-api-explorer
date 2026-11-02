"use client"

import { useEffect } from "react"
import { LuRefreshCw } from "react-icons/lu"

import { LostSatellite } from "@/components/svg/lost-satellite"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { errorDigest } from "@/lib/errors"

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const digest = errorDigest(error)

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <Empty>
        <LostSatellite />
        <EmptyHeader>
          <EmptyTitle>This page lost its signal</EmptyTitle>
          <EmptyDescription>
            Something failed while loading it. Try again; if it keeps happening,
            the reference below helps track it down.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={() => retry()}>
            <LuRefreshCw data-icon="inline-start" />
            Try again
          </Button>
          {digest && (
            <p className="font-mono text-xs text-muted-foreground">
              Reference: {digest}
            </p>
          )}
        </EmptyContent>
      </Empty>
    </div>
  )
}
