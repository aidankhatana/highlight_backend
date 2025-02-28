"use client"

import { TabsContent } from "@/components/ui/tabs"

import { TabsTrigger } from "@/components/ui/tabs"

import { TabsList } from "@/components/ui/tabs"

import { Tabs } from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate, formatTime } from "@/lib/utils"
import { Bell, Heart, MessageCircle, UserPlus } from "lucide-react"
import { IOSHeader } from "@/components/ios-header"
import Link from "next/link"
import { useState } from "react"

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    type: "like",
    user: {
      name: "Jamie Lee",
      username: "jamiel",
      avatar: "/placeholder.svg",
    },
    content: "liked your highlight",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
  {
    id: 2,
    type: "comment",
    user: {
      name: "Sam Wilson",
      username: "samw",
      avatar: "/placeholder.svg",
    },
    content: 'commented on your highlight: "This is absolutely stunning! You\'re so talented!"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
  },
  {
    id: 3,
    type: "follow",
    user: {
      name: "Chris Evans",
      username: "chrise",
      avatar: "/placeholder.svg",
    },
    content: "started following you",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
  },
  {
    id: 4,
    type: "reminder",
    content: "Don't forget to share your highlight today to keep your streak going!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    read: true,
  },
  {
    id: 5,
    type: "like",
    user: {
      name: "Taylor Swift",
      username: "tswift",
      avatar: "/placeholder.svg",
    },
    content: "liked your highlight",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [notificationSettings, setNotificationSettings] = useState({
    dailyReminder: true,
    comments: true,
    likes: true,
    follows: true,
  })

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-rose-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />
      case "reminder":
        return <Bell className="h-4 w-4 text-amber-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div>
      <IOSHeader
        title="Notifications"
        rightElement={
          <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-primary font-medium">
            Mark all read
          </Button>
        }
      />

      <div className="px-4 pt-4 space-y-4">
        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="w-full mb-4 rounded-full">
            <TabsTrigger value="notifications" className="flex-1 rounded-full">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1 rounded-full">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications">
            {notifications.length > 0 ? (
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`ios-card ${notification.read ? "" : "border-l-4 border-l-primary"}`}
                  >
                    <CardContent className="p-3 flex items-start space-x-3">
                      {notification.type === "reminder" ? (
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                          <Bell className="h-5 w-5 text-amber-500" />
                        </div>
                      ) : (
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarImage src={notification.user?.avatar} alt={notification.user?.name} />
                          <AvatarFallback>{notification.user?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col">
                          <div className="line-clamp-2">
                            {notification.user && (
                              <Link href={`/profile/${notification.user.username}`} className="font-medium">
                                {notification.user.name}
                              </Link>
                            )}
                            <span className="text-muted-foreground"> {notification.content}</span>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1">
                            {formatDate(notification.timestamp)} at {formatTime(notification.timestamp)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="ios-card">
                <CardContent className="text-center py-8">
                  <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No notifications</h3>
                  <p className="text-muted-foreground">You're all caught up!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings">
            <Card className="ios-card">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Daily Reminder</div>
                    <div className="text-sm text-muted-foreground">Get reminded at 8pm to share your highlight</div>
                  </div>
                  <Switch
                    checked={notificationSettings.dailyReminder}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, dailyReminder: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Comments</div>
                    <div className="text-sm text-muted-foreground">When someone comments on your highlight</div>
                  </div>
                  <Switch
                    checked={notificationSettings.comments}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, comments: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Reactions</div>
                    <div className="text-sm text-muted-foreground">When someone reacts to your highlight</div>
                  </div>
                  <Switch
                    checked={notificationSettings.likes}
                    onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, likes: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">New Followers</div>
                    <div className="text-sm text-muted-foreground">When someone follows you</div>
                  </div>
                  <Switch
                    checked={notificationSettings.follows}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, follows: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

