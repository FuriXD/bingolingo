"use client"

import { Card } from "@/components/ui/card"

interface Badge {
  id: string
  name: string
  emoji: string
  description: string
  unlocked: boolean
}

export function AchievementBadges() {
  const badges: Badge[] = [
    {
      id: "first-lesson",
      name: "First Steps",
      emoji: "🚀",
      description: "Complete your first lesson",
      unlocked: true,
    },
    {
      id: "week-streak",
      name: "Week Warrior",
      emoji: "⚔️",
      description: "Maintain a 7-day streak",
      unlocked: true,
    },
    {
      id: "thousand-points",
      name: "Point Master",
      emoji: "💎",
      description: "Earn 1,000 points",
      unlocked: true,
    },
    {
      id: "leaderboard-top",
      name: "Top Ranked",
      emoji: "👑",
      description: "Reach top 10 on leaderboard",
      unlocked: false,
    },
    {
      id: "community-helper",
      name: "Community Helper",
      emoji: "🤝",
      description: "Get 50 likes on community posts",
      unlocked: false,
    },
    {
      id: "perfect-lesson",
      name: "Perfect Score",
      emoji: "💯",
      description: "Complete a lesson with 100%",
      unlocked: false,
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-primary">Achievements</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {badges.map((badge) => (
          <Card
            key={badge.id}
            className={`p-4 text-center border-2 transition-all ${
              badge.unlocked
                ? "border-accent/30 bg-gradient-to-br from-accent/10 to-transparent"
                : "border-border/50 bg-muted/30 opacity-60"
            }`}
          >
            <div className="text-3xl mb-2 filter">{badge.emoji}</div>
            <p className="text-sm font-semibold text-primary mb-1">{badge.name}</p>
            <p className="text-xs text-muted-foreground">{badge.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
