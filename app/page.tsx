import Link from "next/link"
import { Suspense } from "react"
import type { IconType } from "react-icons"
import { LuCamera, LuEarth } from "react-icons/lu"
import {
  SiNextdotjs,
  SiReact,
  SiReacthookform,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"

import {
  TodayApod,
  TodayEpic,
  TodayPanelSkeleton,
} from "@/components/home/today-panels"
import { ImageSearchForm } from "@/components/images/image-search-form"
import { L1Diagram } from "@/components/svg/l1-diagram"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Separator } from "@/components/ui/separator"

const suggestions = [
  "Artemis II",
  "Apollo 11",
  "James Webb",
  "Perseverance",
  "Aurora",
  "Saturn",
]

const stack: { name: string; icon: IconType; detail: string }[] = [
  {
    name: "Next.js 16",
    icon: SiNextdotjs,
    detail:
      "App Router with Cache Components. Each page ships a prerendered shell, and NASA data streams in behind it.",
  },
  {
    name: "React 19",
    icon: SiReact,
    detail:
      "Server Components fetch from NASA directly; the React Compiler handles memoization in the interactive parts.",
  },
  {
    name: "TypeScript and Zod",
    icon: SiTypescript,
    detail:
      "Every NASA response is checked against a Zod schema before a page uses it, so a changed API fails loudly instead of rendering blanks.",
  },
  {
    name: "shadcn/ui",
    icon: SiShadcnui,
    detail:
      "Base UI primitives styled with the shadcn token system, in light and dark.",
  },
  {
    name: "Tailwind CSS 4",
    icon: SiTailwindcss,
    detail:
      "CSS-first theme tokens, plus the orbit and starfield animations on this page.",
  },
  {
    name: "React Hook Form",
    icon: SiReacthookform,
    detail: "The image search validates with the same Zod schema it submits.",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="relative isolate overflow-hidden border-b">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 md:px-8 lg:grid-cols-[1fr_1.1fr] lg:py-20">
          <div className="flex animate-rise flex-col items-start gap-6">
            <h1 className="text-4xl leading-[1.05] font-bold tracking-tight font-stretch-125% sm:text-5xl lg:text-6xl">
              See what NASA saw today.
            </h1>
            <p className="max-w-xl text-lg text-pretty text-muted-foreground">
              Today&apos;s Astronomy Picture of the Day, the whole sunlit Earth
              photographed from a million miles away, and decades of photos from
              NASA&apos;s image library. All of it comes live from NASA&apos;s
              public APIs.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href="/apod" />}
              >
                <LuCamera data-icon="inline-start" />
                See today&apos;s picture
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/epic" />}
              >
                <LuEarth data-icon="inline-start" />
                Watch Earth turn
              </Button>
            </div>
          </div>
          <figure className="flex flex-col gap-3">
            <L1Diagram className="animate-[rise_1s_0.15s_both]" />
            <figcaption className="text-sm text-muted-foreground">
              Not to scale. DSCOVR loops around the Sun–Earth L1 point, where
              its EPIC camera always faces the daytime side of Earth.
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        aria-labelledby="today-heading"
        className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 md:px-8"
      >
        <div className="flex flex-col gap-2">
          <h2
            id="today-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            Fresh from NASA
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            Both of these update on their own. APOD posts a new picture every
            day, and EPIC sends down a new set of Earth images within a day or
            two of taking them.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Suspense fallback={<TodayPanelSkeleton />}>
            <TodayApod />
          </Suspense>
          <Suspense fallback={<TodayPanelSkeleton />}>
            <TodayEpic />
          </Suspense>
        </div>
      </section>

      <section
        aria-labelledby="search-heading"
        className="border-y bg-muted/40"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 md:px-8 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-2">
            <h2
              id="search-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              Search the archive
            </h2>
            <p className="max-w-xl text-muted-foreground">
              The NASA Image and Video Library collects photos from every NASA
              center, from the first rocket tests to this year&apos;s launches.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <ImageSearchForm hideLabel />
            <div className="flex flex-wrap gap-2">
              {suggestions.map((query) => (
                <Badge
                  key={query}
                  variant="outline"
                  render={
                    <Link
                      href={`/images?${new URLSearchParams({ q: query })}`}
                    />
                  }
                >
                  {query}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="stack-heading"
        className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-14 md:px-8"
      >
        <div className="flex flex-col gap-2">
          <h2
            id="stack-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            How it&apos;s built
          </h2>
          <p className="max-w-2xl text-muted-foreground">
            This app started in 2021 on Next.js 12. In 2026 it was rebuilt from
            scratch on the current versions of the same tools.
          </p>
        </div>
        <ItemGroup className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map(({ name, icon: Icon, detail }) => (
            <Item key={name} className="items-start px-0">
              <ItemMedia variant="icon" className="text-primary">
                <Icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{name}</ItemTitle>
                <ItemDescription className="line-clamp-none">
                  {detail}
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
        <Separator />
        <p className="text-sm text-muted-foreground">
          Want the details? The{" "}
          <Link
            href="/about"
            className="font-medium text-foreground underline underline-offset-4"
          >
            about page
          </Link>{" "}
          explains each API and where its data comes from.
        </p>
      </section>
    </div>
  )
}
