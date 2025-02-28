"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { getTimeUntil9PM } from "@/lib/utils"
import { ImagePlus, Loader2, X } from "lucide-react"
import { IOSHeader } from "@/components/ios-header"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateHighlightPage() {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const timeUntil9PM = getTimeUntil9PM()

  const handleImageUpload = () => {
    // In a real app, this would open a file picker and upload the image
    // For this demo, we'll just set a placeholder image
    setImage("/placeholder.svg?height=400&width=600")
  }

  const removeImage = () => {
    setImage(null)
  }

  const handleSubmit = () => {
    if (!content.trim()) return

    setIsSubmitting(true)

    // This would connect to your backend in a real app
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/home")
    }, 1500)
  }

  return (
    <div>
      <IOSHeader
        title="Share Highlight"
        backHref="/home"
        rightElement={
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            variant="ghost"
            className="text-primary font-semibold"
          >
            {isSubmitting ? "Sharing..." : "Share"}
          </Button>
        }
      />

      <div className="px-4 pt-4 space-y-4">
        <div className="text-sm text-muted-foreground mb-2">
          Share before 9 PM to maintain your streak. Time left:{" "}
          <span className="font-medium text-primary">{timeUntil9PM}</span>
        </div>

        <Card className="ios-card shadow-none border-0 bg-transparent">
          <CardContent className="space-y-4 p-0">
            <Textarea
              placeholder="What was the highlight of your day?"
              className="min-h-[120px] resize-none rounded-2xl border-0 bg-white shadow-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {image ? (
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt="Highlight image"
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full h-8 w-8"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="outline" className="w-full py-8 border-dashed rounded-2xl" onClick={handleImageUpload}>
                <ImagePlus className="h-6 w-6 mr-2" />
                Add a photo (optional)
              </Button>
            )}
          </CardContent>
          <CardFooter className="p-0 mt-4">
            {isSubmitting && (
              <div className="w-full flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

