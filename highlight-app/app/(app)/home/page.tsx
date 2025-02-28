"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { formatDate, formatTime, getTimeUntil9PM } from "@/lib/utils"
import { Heart, MessageCircle, SmilePlus, UserPlus } from "lucide-react"
import { IOSHeader } from "@/components/ios-header"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Mock data for highlights
const mockHighlights = [
  {
    id: 1,
    user: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "/placeholder.svg",
    },
    content: "Finally finished my painting today! It took me 3 weeks but I'm really proud of how it turned out.",
    image: "/placeholder.svg?height=400&width=600",
    comments: [
      {
        id: 1,
        user: {
          name: "Sam Wilson",
          username: "samw",
          avatar: "/placeholder.svg",
        },
        content: "This is absolutely stunning! You're so talented!",
      },
      {
        id: 2,
        user: {
          name: "Jamie Lee",
          username: "jamiel",
          avatar: "/placeholder.svg",
        },
        content: "I love the colors you used. What inspired you?",
      },
    ],
    reactions: {
      heart: 12,
      smile: 8,
      wow: 5,
    },
    timestamp: new Date(),
  },
  {
    id: 2,
    user: {
      name: "Taylor Swift",
      username: "tswift",
      avatar: "/placeholder.svg",
    },
    content: "Had an amazing hike today at Runyon Canyon. The views were breathtaking!",
    image: "/placeholder.svg?height=400&width=600",
    comments: [
      {
        id: 1,
        user: {
          name: "Chris Evans",
          username: "chrise",
          avatar: "/placeholder.svg",
        },
        content: "Looks incredible! I need to go there sometime.",
      },
    ],
    reactions: {
      heart: 24,
      smile: 15,
      wow: 10,
    },
    timestamp: new Date(),
  },
]

// Mock data for friend suggestions
const friendSuggestions = [
  {
    id: 1,
    name: "Jordan Smith",
    username: "jordans",
    avatar: "/placeholder.svg",
    mutualFriends: 3,
  },
  {
    id: 2,
    name: "Riley Johnson",
    username: "rileyj",
    avatar: "/placeholder.svg",
    mutualFriends: 5,
  },
  {
    id: 3,
    name: "Casey Williams",
    username: "caseyw",
    avatar: "/placeholder.svg",
    mutualFriends: 2,
  },
]

export default function HomePage() {
  const [newComment, setNewComment] = useState("")
  const timeUntil9PM = getTimeUntil9PM()

  const handleAddComment = (highlightId: number) => {
    console.log(`Adding comment to highlight ${highlightId}: ${newComment}`)
    setNewComment("")
  }

  return (
    <div className="pb-6">
      <IOSHeader title="Highlight" />

      <div className="px-4 pt-4 space-y-4">
        <Card className="border-primary/20 ios-card">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Today's Highlights</h2>
              <div className="text-sm text-muted-foreground">
                Next reveal in <span className="font-medium text-primary">{timeUntil9PM}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-1">
            <p className="text-muted-foreground">
              You've shared your highlight for today! Check back at 9 PM to see your friends' highlights.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/create" className="w-full">
              <Button variant="outline" className="w-full ios-button">
                Edit my highlight
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {mockHighlights.length > 0 ? (
          <div className="space-y-4">
            {mockHighlights.map((highlight) => (
              <Card key={highlight.id} className="ios-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={highlight.user.avatar} alt={highlight.user.name} />
                      <AvatarFallback>{highlight.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{highlight.user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(highlight.timestamp)} at {formatTime(highlight.timestamp)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {highlight.image && (
                    <div className="relative w-full h-[300px] mb-3">
                      <Image
                        src={highlight.image || "/placeholder.svg"}
                        alt="Highlight image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="px-6 py-2">
                    <p>{highlight.content}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start pt-0">
                  <div className="flex items-center justify-between w-full py-2">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-rose-500">
                        <Heart className="h-4 w-4 mr-1" />
                        {highlight.reactions.heart}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-amber-500">
                        <SmilePlus className="h-4 w-4 mr-1" />
                        {highlight.reactions.smile}
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">{highlight.comments.length} comments</div>
                  </div>

                  <div className="border-t w-full pt-3 space-y-3">
                    {highlight.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-muted rounded-lg px-3 py-2">
                            <div className="font-medium text-sm">{comment.user.name}</div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex space-x-3 pt-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" alt="Your avatar" />
                        <AvatarFallback>YA</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex">
                        <Textarea
                          placeholder="Add a comment..."
                          className="min-h-[40px] resize-none flex-1 py-2 rounded-2xl"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="ml-2 self-end"
                          onClick={() => handleAddComment(highlight.id)}
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed border-2 border-muted ios-card">
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <UserPlus className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No highlights yet</h3>
              <p className="text-muted-foreground mb-4">Follow friends to see their daily highlights</p>
              <Button variant="outline" className="ios-button">
                Find friends
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="ios-card">
          <CardHeader>
            <h3 className="text-lg font-medium">Your Streak</h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center flex-col">
              <div className="text-5xl font-bold text-primary mb-2">7</div>
              <p className="text-muted-foreground text-sm">days in a row</p>
              <div className="w-full mt-4 grid grid-cols-7 gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-full highlight-gradient flex items-center justify-center text-white text-xs"
                  >
                    ✓
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="ios-card">
          <CardHeader>
            <h3 className="text-lg font-medium">People to Follow</h3>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-4">
              {friendSuggestions.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{friend.name}</div>
                      <div className="text-sm text-muted-foreground">{friend.mutualFriends} mutual friends</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="ios-button">
                    Follow
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full">
              View more
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

