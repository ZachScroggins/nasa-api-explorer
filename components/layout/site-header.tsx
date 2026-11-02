"use client"

import { usePathname } from "next/navigation"
import { Suspense } from "react"

import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { allNav, isActive } from "@/lib/nav"

function CurrentPageTitle() {
  const pathname = usePathname()
  const current = allNav.find((item) => isActive(item, pathname))
  return current?.title ?? "NASA API Explorer"
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-md md:rounded-t-xl">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mr-1 data-vertical:h-4 data-vertical:self-center"
      />
      <p className="truncate text-sm font-medium">
        <Suspense fallback="NASA API Explorer">
          <CurrentPageTitle />
        </Suspense>
      </p>
      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
      </div>
    </header>
  )
}
