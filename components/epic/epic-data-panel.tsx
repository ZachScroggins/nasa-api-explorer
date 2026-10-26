"use client"

import { useState } from "react"
import type { IconType } from "react-icons"
import { GiEarthAmerica } from "react-icons/gi"
import { LuArrowRight, LuMoon, LuSatellite, LuSun } from "react-icons/lu"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  formatDistance,
  getEpicGeometry,
  type DistanceUnit,
} from "@/lib/epic-geometry"
import type { EpicFrame } from "@/lib/nasa/epic"

function TravelIcons({ from, to }: { from: IconType; to: IconType }) {
  const From = from
  const To = to
  return (
    <span className="flex items-center gap-1.5 text-primary" aria-hidden="true">
      <From className="size-4" />
      <LuArrowRight className="size-3 text-muted-foreground" />
      <To className="size-4" />
    </span>
  )
}

function formatCoordinate(value: number, positive: string, negative: string) {
  return `${Math.abs(value).toFixed(2)}° ${value >= 0 ? positive : negative}`
}

export function EpicDataPanel({ frame }: { frame: EpicFrame }) {
  const [unit, setUnit] = useState<DistanceUnit>("km")
  const geometry = getEpicGeometry(frame.positions)

  const stats = [
    {
      label: "Earth to Sun",
      from: GiEarthAmerica,
      to: LuSun,
      km: geometry.earthToSun,
    },
    {
      label: "Earth to Moon",
      from: GiEarthAmerica,
      to: LuMoon,
      km: geometry.earthToMoon,
    },
    {
      label: "Earth to DSCOVR",
      from: GiEarthAmerica,
      to: LuSatellite,
      km: geometry.earthToDscovr,
    },
    {
      label: "DSCOVR to Sun",
      from: LuSatellite,
      to: LuSun,
      km: geometry.dscovrToSun,
    },
    {
      label: "DSCOVR to Moon",
      from: LuSatellite,
      to: LuMoon,
      km: geometry.dscovrToMoon,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Where everything was</CardTitle>
        <CardDescription>
          Worked out from the J2000 positions NASA publishes with each image.
        </CardDescription>
        <CardAction>
          <ToggleGroup
            variant="outline"
            size="sm"
            value={[unit]}
            onValueChange={([next]) => {
              if (next === "km" || next === "mi") setUnit(next)
            }}
            aria-label="Distance unit"
          >
            <ToggleGroupItem value="km">km</ToggleGroupItem>
            <ToggleGroupItem value="mi">mi</ToggleGroupItem>
          </ToggleGroup>
        </CardAction>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="flex flex-col gap-1 text-sm text-muted-foreground">
                <TravelIcons from={stat.from} to={stat.to} />
                {stat.label}
              </dt>
              <dd className="text-lg font-semibold tabular-nums">
                {formatDistance(stat.km, unit)}
              </dd>
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <dt className="flex flex-col gap-1 text-sm text-muted-foreground">
              <span
                className="flex items-center gap-1.5 text-primary"
                aria-hidden="true"
              >
                <LuSun className="size-4" />
                <GiEarthAmerica className="size-4" />
                <LuSatellite className="size-4" />
              </span>
              Sun–Earth–DSCOVR angle
            </dt>
            <dd className="text-lg font-semibold tabular-nums">
              {geometry.sev.toFixed(2)}°
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-sm text-muted-foreground">
          The camera was pointed at{" "}
          {formatCoordinate(frame.centroid.lat, "N", "S")},{" "}
          {formatCoordinate(frame.centroid.lon, "E", "W")}.
        </p>
      </CardContent>
    </Card>
  )
}
