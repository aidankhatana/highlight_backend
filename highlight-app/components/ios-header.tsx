import type React from "react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

interface IOSHeaderProps {
  title: string
  backHref?: string
  rightElement?: React.ReactNode
}

export function IOSHeader({ title, backHref, rightElement }: IOSHeaderProps) {
  return (
    <div className="ios-header px-4">
      <div className="absolute left-4">
        {backHref && (
          <Link href={backHref} className="ios-back-button">
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>
        )}
      </div>
      <h1 className="text-lg font-semibold">{title}</h1>
      {rightElement && <div className="absolute right-4">{rightElement}</div>}
    </div>
  )
}

