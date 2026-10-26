"use client"

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

export default function ErrorPage({
  retry,
}: {
  error: Error
  retry: () => void
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <Empty>
        <LostSatellite />
        <EmptyHeader>
          <EmptyTitle>This page lost its signal</EmptyTitle>
          <EmptyDescription>
            Something failed while loading it. Trying again usually works.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={() => retry()}>
            <LuRefreshCw data-icon="inline-start" />
            Try again
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
