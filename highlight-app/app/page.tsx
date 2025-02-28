import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full highlight-gradient"></div>
            <span className="font-bold text-xl">Highlight</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-6">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Share your daily <span className="text-primary">highlight</span> with friends
              </h1>
              <p className="text-lg text-muted-foreground">
                Connect with friends in a meaningful way by sharing one highlight from your day, every day at 9pm.
              </p>
              <div className="flex gap-4">
                <Link href="/register">
                  <Button size="lg" className="rounded-full">
                    Get Started
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="rounded-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=500&width=400"
                alt="Highlight App Preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-muted">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Share Your Highlight</h3>
                  <p className="text-muted-foreground">Post your daily highlight before 9pm to maintain your streak.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Connect With Friends</h3>
                  <p className="text-muted-foreground">
                    View and react to your friends' highlights when they're released at 9pm.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Build Meaningful Connections</h3>
                  <p className="text-muted-foreground">
                    Create deeper relationships through daily sharing without the noise of traditional social media.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-6">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Highlight. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

