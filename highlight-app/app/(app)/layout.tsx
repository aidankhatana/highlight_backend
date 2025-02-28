import type React from "react"
import { IOSTabBar } from "@/components/ios-tab-bar"
import { IOSStatusBar } from "@/components/ios-status-bar"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F2F2F7]">
      <IOSStatusBar />
      <main className="flex-1 ios-safe-area">{children}</main>
      <IOSTabBar />
    </div>
  )
}

