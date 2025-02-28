"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, User, Users, Bell, PlusCircle } from "lucide-react"

export function IOSTabBar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/home",
      label: "Home",
      icon: Home,
      active: pathname === "/home",
    },
    {
      href: "/friends",
      label: "Friends",
      icon: Users,
      active: pathname === "/friends",
    },
    {
      href: "/create",
      label: "Share",
      icon: PlusCircle,
      active: pathname === "/create",
      primary: true,
    },
    {
      href: "/notifications",
      label: "Notifications",
      icon: Bell,
      active: pathname === "/notifications",
    },
    {
      href: "/profile",
      label: "Profile",
      icon: User,
      active: pathname === "/profile",
    },
  ]

  return (
    <div className="ios-tab-bar flex items-end justify-around">
      {routes.map((route) => {
        const Icon = route.icon
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full pt-2",
              route.active ? "text-primary" : "text-muted-foreground",
            )}
          >
            {route.primary ? (
              <div className="rounded-full highlight-gradient p-3 mb-1">
                <Icon className="h-6 w-6 text-white" />
              </div>
            ) : (
              <Icon className={cn("h-6 w-6 mb-1", route.active ? "text-primary" : "text-muted-foreground")} />
            )}
            <span className="text-xs font-medium">{route.label}</span>
          </Link>
        )
      })}
    </div>
  )
}

