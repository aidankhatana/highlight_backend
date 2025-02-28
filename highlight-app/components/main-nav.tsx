"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, User, Users, Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

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
    <>
      <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
        {routes.map((route) => {
          const Icon = route.icon
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5 mr-2" />
              {route.label}
            </Link>
          )
        })}
      </div>

      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col space-y-4 mt-8">
              {routes.map((route) => {
                const Icon = route.icon
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center py-2 text-base font-medium transition-colors hover:text-primary",
                      route.active ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {route.label}
                  </Link>
                )
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

