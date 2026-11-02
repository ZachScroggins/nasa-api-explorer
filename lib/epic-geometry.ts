// J2000 positions are Earth-centered, in kilometers.
type Vector = { x: number; y: number; z: number }

const KM_PER_MILE = 1.609344

function magnitude({ x, y, z }: Vector) {
  return Math.hypot(x, y, z)
}

/** Angle at Earth between two bodies, in degrees. */
function angleBetween(a: Vector, b: Vector) {
  const dot = a.x * b.x + a.y * b.y + a.z * b.z
  const cos = dot / (magnitude(a) * magnitude(b))
  return (Math.acos(Math.min(1, Math.max(-1, cos))) * 180) / Math.PI
}

/** Law of cosines: the third side of the triangle Earth–A–B. */
function distanceBetween(a: Vector, b: Vector) {
  const angle = (angleBetween(a, b) * Math.PI) / 180
  const da = magnitude(a)
  const db = magnitude(b)
  return Math.sqrt(da ** 2 + db ** 2 - 2 * da * db * Math.cos(angle))
}

export type EpicGeometry = {
  earthToSun: number
  earthToMoon: number
  earthToDscovr: number
  dscovrToSun: number
  dscovrToMoon: number
  /** Sun–Earth–Vehicle angle in degrees. */
  sev: number
}

export function getEpicGeometry(positions: {
  dscovr: Vector
  moon: Vector
  sun: Vector
}): EpicGeometry {
  const { dscovr, moon, sun } = positions
  return {
    earthToSun: magnitude(sun),
    earthToMoon: magnitude(moon),
    earthToDscovr: magnitude(dscovr),
    dscovrToSun: distanceBetween(sun, dscovr),
    dscovrToMoon: distanceBetween(moon, dscovr),
    sev: angleBetween(sun, dscovr),
  }
}

export type DistanceUnit = "km" | "mi"

export function formatDistance(km: number, unit: DistanceUnit) {
  const value = unit === "km" ? km : km / KM_PER_MILE
  return `${Math.round(value).toLocaleString("en-US")} ${unit}`
}
