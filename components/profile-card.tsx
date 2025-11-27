"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ProfileCardProps {
  name: string
  avatar: string
  points: number
  streak: number
  onNameChange?: (name: string) => void
  onAvatarChange?: (avatar: string) => void
}

export function ProfileCard({ name, avatar, points, streak, onNameChange, onAvatarChange }: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(name)
  const [editAvatar, setEditAvatar] = useState(avatar)

  const handleSave = () => {
    onNameChange?.(editName)
    onAvatarChange?.(editAvatar)
    setIsEditing(false)
  }

  const avatarEmojis = ["👤", "🧑", "👨", "👩", "🧔", "👨‍🦱", "👩‍🦱", "🧑‍🎓", "👨‍💼", "👩‍💼"]

  if (isEditing) {
    return (
      <Card className="p-6 border-2 border-accent/20">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-primary mb-2 block">Name</label>
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Enter your name"
              className="border-2 border-border"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-primary mb-2 block">Avatar</label>
            <div className="grid grid-cols-5 gap-2">
              {avatarEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setEditAvatar(emoji)}
                  className={`text-3xl p-2 rounded-lg transition-all ${
                    editAvatar === emoji ? "bg-accent text-accent-foreground scale-110" : "bg-border hover:scale-105"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1">
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-background">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-6xl">{avatar}</div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-primary">{name}</h3>
          <p className="text-sm text-muted-foreground">Level {Math.floor(points / 500) + 1}</p>
        </div>
        <Button onClick={() => setIsEditing(true)} variant="outline" className="text-xs">
          Edit
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Points</p>
          <p className="text-2xl font-bold text-accent">{points}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Streak</p>
          <p className="text-2xl font-bold text-orange-500">🔥 {streak}</p>
        </div>
      </div>
    </Card>
  )
}
