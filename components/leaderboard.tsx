"use client"

import { Card } from "@/components/ui/card"

export function Leaderboard() {
  const leaderboardData = [
    { rank: 1, name: "Learning Master", avatar: "👤", points: 1245, streak: 7, change: "↑" },
    { rank: 2, name: "Language Lover", avatar: "🧑", points: 1120, streak: 5, change: "↓" },
    { rank: 3, name: "Word Wizard", avatar: "🧔", points: 1050, streak: 9, change: "↑" },
    { rank: 4, name: "Grammar Guru", avatar: "👩", points: 980, streak: 3, change: "↓" },
    { rank: 5, name: "Speed Learner", avatar: "👨‍🎓", points: 920, streak: 4, change: "↑" },
    { rank: 6, name: "Diligent Scholar", avatar: "👩‍🎓", points: 850, streak: 2, change: "→" },
    { rank: 7, name: "Eager Student", avatar: "👨‍💼", points: 780, streak: 1, change: "↑" },
    { rank: 8, name: "Knowledge Seeker", avatar: "👩‍💼", points: 720, streak: 6, change: "↓" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/5 via-background to-background pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Global Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank against other language learners</p>
        </div>

        <div className="space-y-3">
          {leaderboardData.map((user) => (
            <Card
              key={user.rank}
              className={`p-4 border-2 transition-all ${
                user.rank === 1
                  ? "border-accent/50 bg-gradient-to-r from-accent/10 to-transparent shadow-lg"
                  : "border-border hover:border-accent/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                    {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : user.rank}
                  </div>
                  <span className="text-2xl">{user.avatar}</span>
                  <div>
                    <p className="font-semibold text-primary">{user.name}</p>
                    <p className="text-sm text-muted-foreground">🔥 {user.streak}-day streak</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">{user.points}</p>
                    <p className="text-xs text-muted-foreground">points</p>
                  </div>
                  <span
                    className={`text-xl ${user.change === "↑" ? "text-green-500" : user.change === "↓" ? "text-red-500" : "text-gray-400"}`}
                  >
                    {user.change}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
