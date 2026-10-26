import type { Route } from "next"
import type { IconType } from "react-icons"
import { LuCamera, LuEarth, LuHouse, LuImages, LuInfo } from "react-icons/lu"

export type NavItem = {
  title: string
  /** Shorter label for the header on small screens. */
  short: string
  href: Route
  /** Pathname prefix that marks this item active. */
  match: string
  icon: IconType
}

export const mainNav = [
  { title: "Home", short: "Home", href: "/", match: "/", icon: LuHouse },
  {
    title: "About the APIs",
    short: "About",
    href: "/about",
    match: "/about",
    icon: LuInfo,
  },
] as const satisfies readonly NavItem[]

export const explorerNav = [
  {
    title: "Image Library",
    short: "Images",
    href: "/images",
    match: "/images",
    icon: LuImages,
  },
  {
    title: "Earth from EPIC",
    short: "EPIC",
    href: "/epic",
    match: "/epic",
    icon: LuEarth,
  },
  {
    title: "Picture of the Day",
    short: "APOD",
    href: "/apod",
    match: "/apod",
    icon: LuCamera,
  },
] as const satisfies readonly NavItem[]

export const allNav: readonly NavItem[] = [...mainNav, ...explorerNav]

export function isActive(item: NavItem, pathname: string) {
  return item.match === "/"
    ? pathname === "/"
    : pathname === item.match || pathname.startsWith(`${item.match}/`)
}

export const GITHUB_URL = "https://github.com/ZachScroggins/nasa-api-explorer"
export const PORTFOLIO_URL = "https://zachscroggins.com"
