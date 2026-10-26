import Link from "next/link"

import { LostSatellite } from "@/components/svg/lost-satellite"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <Empty>
        <LostSatellite />
        <EmptyHeader>
          <EmptyTitle>This page drifted out of range</EmptyTitle>
          <EmptyDescription>
            The link may be old, or the address has a typo.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button nativeButton={false} render={<Link href="/" />}>
            Go to the home page
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
