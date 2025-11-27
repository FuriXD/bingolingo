"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CommunityPost {
  id: number
  author: string
  avatar: string
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: number
}

export function Community() {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 1,
      author: "Language Lover",
      avatar: "🧑",
      content: "Just completed the Colors lesson! The practice exercises were really helpful.",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 5,
    },
    {
      id: 2,
      author: "Word Wizard",
      avatar: "🧔",
      content: "Reached a 9-day streak! The consistency is paying off. Who else is on a long streak?",
      timestamp: "4 hours ago",
      likes: 67,
      comments: 12,
    },
    {
      id: 3,
      author: "Grammar Guru",
      avatar: "👩",
      content: "Loving the new leaderboard feature. Friendly competition makes learning more fun!",
      timestamp: "6 hours ago",
      likes: 45,
      comments: 8,
    },
  ])

  const [postText, setPostText] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePost = () => {
    if (postText.trim() || selectedImage) {
      const newPost: CommunityPost = {
        id: posts.length + 1,
        author: "You",
        avatar: "😊",
        content: postText,
        image: selectedImage || undefined,
        timestamp: "just now",
        likes: 0,
        comments: 0,
      }
      setPosts([newPost, ...posts])
      setPostText("")
      setSelectedImage(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Community Hub</h1>
          <p className="text-slate-400">Connect with fellow language learners and share your progress</p>
        </div>

        {/* Post Creator */}
        <Card className="p-6 mb-6 border border-slate-600 bg-slate-700/50">
          <div className="flex gap-4">
            <span className="text-3xl">👤</span>
            <div className="flex-1">
              <textarea
                placeholder="Share your learning journey..."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="w-full p-3 rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-slate-400 resize-none"
                rows={3}
              />

              {selectedImage && (
                <div className="mt-3 relative">
                  <img
                    src={selectedImage || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    ✕ Remove
                  </button>
                </div>
              )}

              <div className="flex justify-between items-center gap-2 mt-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    📸 Add Photo
                  </Button>
                </label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handlePost} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Community Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="p-6 border border-slate-600 hover:border-accent/30 bg-slate-700/50 transition-all"
            >
              <div className="flex gap-4">
                <span className="text-3xl">{post.avatar}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{post.author}</h3>
                    <span className="text-xs text-slate-400">{post.timestamp}</span>
                  </div>
                  <p className="text-slate-200 mb-4 leading-relaxed">{post.content}</p>

                  {post.image && (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}

                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors">
                      <span>👍</span>
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors">
                      <span>💬</span>
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-400 hover:text-accent transition-colors">
                      <span>↗️</span>
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
