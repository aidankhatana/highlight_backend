"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState(true)

  const handleComplete = () => {
    setIsLoading(true)

    // This would connect to your backend in a real app
    setTimeout(() => {
      setIsLoading(false)
      router.push("/home")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F2F2F7]">
      <Card className="w-full max-w-md ios-card border-0 shadow-lg">
        <CardHeader className="space-y-1">
          <Link href="/register" className="ios-back-button absolute left-4 top-4">
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>
          <CardTitle className="text-2xl text-center pt-6">Complete your profile</CardTitle>
          <CardDescription className="text-center">Let's get you set up to share your first highlight</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="ios-button">
              Upload photo
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Enable notifications</Label>
                <p className="text-sm text-muted-foreground">Get reminded at 8pm to share your highlight</p>
              </div>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full h-12 rounded-lg ios-button" onClick={handleComplete} disabled={isLoading}>
            {isLoading ? "Completing setup..." : "Complete setup"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

