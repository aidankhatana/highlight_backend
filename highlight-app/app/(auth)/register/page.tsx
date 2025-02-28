"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // This would connect to your auth backend in a real app
    setTimeout(() => {
      setIsLoading(false)
      router.push("/onboarding")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F2F2F7]">
      <Card className="w-full max-w-md ios-card border-0 shadow-lg">
        <CardHeader className="space-y-1">
          <Link href="/login" className="ios-back-button absolute left-4 top-4">
            <ChevronLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>
          <div className="flex justify-center mb-4 pt-6">
            <div className="h-16 w-16 rounded-full highlight-gradient flex items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-card"></div>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Enter your information to get started</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-lg h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg h-12"
              />
              <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full h-12 rounded-lg ios-button" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

