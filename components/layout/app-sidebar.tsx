"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Suspense } from "react"
import { LuCode, LuGithub } from "react-icons/lu"

import { RocketMark } from "@/components/svg/rocket-mark"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  explorerNav,
  GITHUB_URL,
  isActive,
  mainNav,
  PORTFOLIO_URL,
  type NavItem,
} from "@/lib/nav"

function NavItems({
  items,
  pathname,
}: {
  items: readonly NavItem[]
  pathname: string | null
}) {
  const { setOpenMobile } = useSidebar()

  return items.map((item) => (
    <SidebarMenuItem key={item.href}>
      <SidebarMenuButton
        isActive={pathname !== null && isActive(item, pathname)}
        tooltip={item.title}
        render={<Link href={item.href} onClick={() => setOpenMobile(false)} />}
      >
        <item.icon />
        <span>{item.title}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))
}

function ActiveNavItems({ items }: { items: readonly NavItem[] }) {
  return <NavItems items={items} pathname={usePathname()} />
}

function NavGroup({
  label,
  items,
}: {
  label: string
  items: readonly NavItem[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* The pathname is URL data, so the highlight streams in after the shell. */}
          <Suspense fallback={<NavItems items={items} pathname={null} />}>
            <ActiveNavItems items={items} />
          </Suspense>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="NASA API Explorer"
              render={<Link href="/" />}
            >
              <RocketMark className="size-8!" />
              <span className="font-heading text-base font-semibold tracking-tight">
                NASA API Explorer
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavGroup label="Explore" items={explorerNav} />
        <NavGroup label="Project" items={mainNav} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Source on GitHub"
              render={<a href={GITHUB_URL} target="_blank" rel="noreferrer" />}
            >
              <LuGithub />
              <span>Source on GitHub</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="More of Zach's work"
              render={
                <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer" />
              }
            >
              <LuCode />
              <span>More of Zach&apos;s work</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
