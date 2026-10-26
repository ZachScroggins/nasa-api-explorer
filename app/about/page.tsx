import type { Metadata, Route } from "next"
import Link from "next/link"
import type { IconType } from "react-icons"
import { LuCamera, LuEarth, LuImages, LuInfo } from "react-icons/lu"

import { PageHeader } from "@/components/page-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GITHUB_URL } from "@/lib/nav"

export const metadata: Metadata = {
  title: "About the APIs",
  description:
    "Where this app's data comes from: NASA's APOD, EPIC and Image and Video Library APIs.",
}

type Fact = { label: string; value: React.ReactNode }

type Section = {
  id: string
  title: string
  /** Label in the page's table of contents. */
  short: string
  icon: IconType
  href: Route
  cta: string
  body: React.ReactNode
  facts: Fact[]
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] break-all">
      {children}
    </code>
  )
}

const sections: Section[] = [
  {
    id: "apod",
    title: "Astronomy Picture of the Day",
    short: "Picture of the Day",
    icon: LuCamera,
    href: "/apod",
    cta: "Open today's picture",
    body: (
      <>
        <p>
          Every day since June 16, 1995, APOD has featured one image or video of
          the universe with a short explanation written by a professional
          astronomer. Robert Nemiroff and Jerry Bonnell started it, and it is
          still one of the most visited sites in the US government.
        </p>
        <Alert>
          <LuInfo />
          <AlertTitle>APOD moved in 2026</AlertTitle>
          <AlertDescription>
            On September 10, 2026, APOD moved from apod.nasa.gov to NASA
            Science, and its API moved with it. The old api.nasa.gov endpoint
            now returns the NASA logo for every date, and NASA plans to shut it
            off on December 1, 2026. This app reads the new endpoint, which
            needs no API key.
          </AlertDescription>
        </Alert>
        <p>
          Here you can open any day back to the first one, play that day&apos;s
          video when it has one, or jump to a random day.
        </p>
      </>
    ),
    facts: [
      { label: "Running since", value: "June 16, 1995" },
      { label: "Published by", value: "NASA Science, with Michigan Tech" },
      {
        label: "Endpoint",
        value: <Code>science.nasa.gov/wp-json/wp/v2/apod-basic</Code>,
      },
      { label: "API key", value: "Not needed" },
    ],
  },
  {
    id: "epic",
    title: "EPIC: Earth Polychromatic Imaging Camera",
    short: "EPIC",
    icon: LuEarth,
    href: "/epic",
    cta: "See the latest Earth images",
    body: (
      <>
        <p>
          EPIC is a 30-centimeter telescope with a 2048 × 2048 pixel camera
          aboard NOAA&apos;s Deep Space Climate Observatory (DSCOVR), launched
          in February 2015. DSCOVR loops around the Sun–Earth L1 point, about
          1.5 million kilometers from Earth, where gravity from the two bodies
          balances. From there the whole sunlit face of the planet is always in
          view.
        </p>
        <p>
          NASA publishes two versions of every image. Natural color is close to
          what your eye would see. Enhanced color is processed to bring out land
          and ocean detail through the atmosphere. Each image also comes with
          the positions of DSCOVR, the Moon and the Sun, which this app uses to
          work out the distances between them.
        </p>
        <p>
          Here you can pick any day back to June 2015, play a day&apos;s images
          as a time-lapse of Earth turning, and revisit eclipses and dust
          storms.
        </p>
      </>
    ),
    facts: [
      { label: "Images since", value: "June 2015" },
      {
        label: "Published by",
        value: "Laboratory for Atmospheres, NASA Goddard",
      },
      { label: "Endpoint", value: <Code>epic.gsfc.nasa.gov/api</Code> },
      { label: "API key", value: "Not needed" },
    ],
  },
  {
    id: "images",
    title: "NASA Image and Video Library",
    short: "Image Library",
    icon: LuImages,
    href: "/images",
    cta: "Search the library",
    body: (
      <>
        <p>
          The NASA Image and Video Library at images.nasa.gov gathers photos,
          video and audio from NASA&apos;s centers into one searchable archive:
          early rocket tests, Apollo, the shuttle years, Hubble and Webb, and
          the Artemis missions.
        </p>
        <p>
          Here you can search its still images, 24 results per page. Each result
          opens a page with the full description, keywords you can search again,
          and a link to the original file.
        </p>
      </>
    ),
    facts: [
      { label: "Covers", value: "Images, video and audio" },
      { label: "Published by", value: "NASA" },
      { label: "Endpoint", value: <Code>images-api.nasa.gov/search</Code> },
      { label: "API key", value: "Not needed" },
    ],
  },
]

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 md:px-8">
      <PageHeader
        title="About the APIs"
        description="Everything on this site comes from three free, public NASA services. Here's what each one is, where its data comes from and what changed recently."
      />

      <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <nav
          aria-label="On this page"
          className="lg:sticky lg:top-20 lg:self-start"
        >
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {[
              ...sections,
              { id: "project", short: "About this project", icon: LuInfo },
            ].map(({ id, short, icon: Icon }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{short}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex min-w-0 flex-col gap-12">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <section.icon className="size-5" aria-hidden="true" />
                </span>
                <h2
                  id={`${section.id}-heading`}
                  className="text-2xl font-semibold tracking-tight"
                >
                  {section.title}
                </h2>
              </div>
              <div className="flex max-w-prose flex-col gap-4 leading-relaxed text-foreground/90">
                {section.body}
              </div>
              <dl className="grid max-w-prose gap-x-6 gap-y-3 rounded-xl border p-4 text-sm sm:grid-cols-[9rem_1fr]">
                {section.facts.map((fact) => (
                  <div key={fact.label} className="contents">
                    <dt className="text-muted-foreground">{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <Button
                  nativeButton={false}
                  render={<Link href={section.href} />}
                >
                  <section.icon data-icon="inline-start" />
                  {section.cta}
                </Button>
              </div>
              <Separator className="mt-4" />
            </section>
          ))}

          <section
            id="project"
            aria-labelledby="project-heading"
            className="flex max-w-prose flex-col gap-4 leading-relaxed text-foreground/90"
          >
            <h2
              id="project-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              About this project
            </h2>
            <p>
              Zach Scroggins built the first version in 2021 with Next.js 12,
              React Query and Tailwind 2. In October 2026 it was rebuilt from
              scratch on Next.js 16 with Cache Components, React 19, Tailwind 4
              and shadcn/ui, and the APOD page was moved to NASA&apos;s new
              endpoint.
            </p>
            <p>
              Pages render on the server and fetch from NASA directly. Each
              response is checked against a Zod schema, then cached: APOD and
              EPIC for an hour, image searches for a day. This project
              isn&apos;t affiliated with or endorsed by NASA.
            </p>
            <div>
              <Button
                variant="outline"
                nativeButton={false}
                render={
                  <a href={GITHUB_URL} target="_blank" rel="noreferrer" />
                }
              >
                Read the source on GitHub
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
