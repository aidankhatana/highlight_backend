import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date)
}

export function getTimeUntil9PM(): string {
  const now = new Date()
  const ninePM = new Date(now)
  ninePM.setHours(21, 0, 0, 0)

  if (now > ninePM) {
    ninePM.setDate(ninePM.getDate() + 1)
  }

  const diffMs = ninePM.getTime() - now.getTime()
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

  if (diffHrs > 0) {
    return `${diffHrs}h ${diffMins}m`
  } else {
    return `${diffMins}m`
  }
}

