"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserCheck, UserPlus } from "lucide-react"
import { IOSHeader } from "@/components/ios-header"
import Link from "next/link"

// Mock data for friends
const followers = [
  {
    id: 1,
    name: "Jamie Lee",
    username: "jamiel",
    avatar: "/placeholder.svg",
    isFollowing: true,
  },
  {
    id: 2,
    name: "Sam Wilson",
    username: "samw",
    avatar: "/placeholder.svg",
    isFollowing: true,
  },
  {
    id: 3,
    name: "Chris Evans",
    username: "chrise",
    avatar: "/placeholder.svg",
    isFollowing: false,
  },
]

const following = [
  {
    id: 1,
    name: "Jamie Lee",
    username: "jamiel",
    avatar: "/placeholder.svg",
    isFollowing: true,
  },
  {
    id: 2,
    name: "Sam Wilson",
    username: "samw",
    avatar: "/placeholder.svg",
    isFollowing: true,
  },
  {
    id: 4,
    name: "Taylor Swift",
    username: "tswift",
    avatar: "/placeholder.svg",
    isFollowing: true,
  },
]

const suggestions = [
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
  {
    id: 4,
    name: "Morgan Taylor",
    username: "morgant",
    avatar: "/placeholder.svg",
    mutualFriends: 1,
  },
  {
    id: 5,
    name: "Alex Rodriguez",
    username: "alexr",
    avatar: "/placeholder.svg",
    mutualFriends: 4,
  },
]

export default function FriendsPage() {
  return (
    <div>
      <IOSHeader title="Friends" />

      <div className="px-4 pt-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search by name or username" className="pl-9 rounded-full h-10" />
        </div>

        <Card className="ios-card">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Suggested Friends</h2>
            <div className="space-y-4">
              {suggestions.slice(0, 3).map((friend) => (
                <div key={friend.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Link href={`/profile/${friend.username}`} className="font-medium hover:underline">
                        {friend.name}
                      </Link>
                      <div className="text-sm text-muted-foreground">{friend.mutualFriends} mutual friends</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="ios-button">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-primary">
                View all suggestions
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="ios-card">
          <CardContent className="p-4">
            <Tabs defaultValue="following" className="w-full">
              <TabsList className="w-full mb-4 rounded-full">
                <TabsTrigger value="following" className="flex-1 rounded-full">
                  Following ({following.length})
                </TabsTrigger>
                <TabsTrigger value="followers" className="flex-1 rounded-full">
                  Followers ({followers.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="following" className="space-y-4">
                {following.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Link href={`/profile/${friend.username}`} className="font-medium hover:underline">
                        {friend.name}
                      </Link>
                    </div>
                    <Button variant="outline" size="sm" className="ios-button">
                      <UserCheck className="h-4 w-4 mr-2" />
                      Following
                    </Button>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="followers" className="space-y-4">
                {followers.map((friend) => (
                  <div key={friend.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Link href={`/profile/${friend.username}`} className="font-medium hover:underline">
                        {friend.name}
                      </Link>
                    </div>
                    {friend.isFollowing ? (
                      <Button variant="outline" size="sm" className="ios-button">
                        <UserCheck className="h-4 w-4 mr-2" />
                        Following
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="ios-button">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Follow
                      </Button>
                    )}
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

