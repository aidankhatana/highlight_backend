"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"
import { Pin, Settings } from "lucide-react"
import { IOSHeader } from "@/components/ios-header"
import Image from "next/image"

// Mock data for user profile
const userProfile = {
  name: "Alex Johnson",
  username: "alexj",
  avatar: "/placeholder.svg",
  bio: "Digital artist and coffee enthusiast. Sharing my daily adventures and creative process.",
  followers: 248,
  following: 186,
  streak: 32,
  highlights: [
    {
      id: 1,
      content: "Finally finished my painting today! It took me 3 weeks but I'm really proud of how it turned out.",
      image: "/placeholder.svg?height=400&width=600",
      date: new Date(2023, 5, 15),
      pinned: true,
    },
    {
      id: 2,
      content: "Had an amazing hike today at Runyon Canyon. The views were breathtaking!",
      image: "/placeholder.svg?height=400&width=600",
      date: new Date(2023, 5, 14),
      pinned: true,
    },
    {
      id: 3,
      content: "Tried that new coffee shop downtown. Their cold brew is incredible!",
      image: null,
      date: new Date(2023, 5, 13),
      pinned: false,
    },
    {
      id: 4,
      content: "Movie night with friends. We watched Everything Everywhere All at Once and it blew our minds.",
      image: "/placeholder.svg?height=400&width=600",
      date: new Date(2023, 5, 12),
      pinned: false,
    },
    {
      id: 5,
      content: "Found this amazing vintage record store today. Picked up some classics!",
      image: "/placeholder.svg?height=400&width=600",
      date: new Date(2023, 5, 11),
      pinned: false,
    },
  ],
}

export default function ProfilePage() {
  const pinnedHighlights = userProfile.highlights.filter((h) => h.pinned)
  const allHighlights = userProfile.highlights

  return (
    <div>
      <IOSHeader
        title="Profile"
        rightElement={
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        }
      />

      <div className="px-4 pt-4 space-y-4">
        <Card className="ios-card">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="text-center">
                <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                <p className="text-muted-foreground mb-2">@{userProfile.username}</p>
                <p className="mb-4">{userProfile.bio}</p>

                <div className="flex justify-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="font-bold">{userProfile.followers}</div>
                    <div className="text-sm text-muted-foreground">followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{userProfile.following}</div>
                    <div className="text-sm text-muted-foreground">following</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{userProfile.streak}</div>
                    <div className="text-sm text-muted-foreground">day streak</div>
                  </div>
                </div>

                <Button variant="outline" className="ios-button">
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="pinned" className="w-full">
          <TabsList className="w-full mb-4 rounded-full">
            <TabsTrigger value="pinned" className="flex-1 rounded-full">
              Pinned Highlights
            </TabsTrigger>
            <TabsTrigger value="all" className="flex-1 rounded-full">
              All Highlights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pinned">
            {pinnedHighlights.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pinnedHighlights.map((highlight) => (
                  <Card key={highlight.id} className="ios-card overflow-hidden">
                    <CardContent className="p-0">
                      {highlight.image && (
                        <div className="relative w-full h-[200px]">
                          <Image
                            src={highlight.image || "/placeholder.svg"}
                            alt="Highlight image"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1">
                            <Pin className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                      )}
                      <div className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">{formatDate(highlight.date)}</div>
                        <p className="line-clamp-3">{highlight.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-dashed border-2 border-muted ios-card">
                <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                  <Pin className="h-6 w-6 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No pinned highlights</h3>
                  <p className="text-muted-foreground mb-4">
                    Pin your favorite highlights to showcase them on your profile
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="all">
            <div className="space-y-4">
              {allHighlights.map((highlight) => (
                <Card key={highlight.id} className="ios-card overflow-hidden">
                  <CardContent className="p-0">
                    {highlight.image && (
                      <div className="relative w-full h-[200px]">
                        <Image
                          src={highlight.image || "/placeholder.svg"}
                          alt="Highlight image"
                          fill
                          className="object-cover"
                        />
                        {highlight.pinned && (
                          <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1">
                            <Pin className="h-4 w-4 text-primary" />
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-4">
                      <div className="text-sm text-muted-foreground mb-1">{formatDate(highlight.date)}</div>
                      <p>{highlight.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

