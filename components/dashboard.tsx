"use client"

import { useState, useEffect } from "react"
import { Mascot } from "./mascot"
import { StreakBadge } from "./streak-badge"
import { ProfileCard } from "./profile-card"
import { AIsuggestion } from "./ai-suggestion"
import { AchievementBadges } from "./achievement-badges"
import { Card } from "@/components/ui/card"
import { StudyTimer } from "./study-timer"
import { MusicLearning } from "./music-learning"
import { GlowingEffect } from "@/components/ui/glowing-effect"

interface DashboardProps {
  onStartLesson: (id: number) => void
}

const lessons = [
  {
    id: 1,
    title: "Basics",
    subtitle: "Learn greetings",
    progress: 80,
    completed: 4,
    total: 6,
  },
  {
    id: 2,
    title: "Numbers",
    subtitle: "Count from 1-10",
    progress: 60,
    completed: 3,
    total: 6,
  },
  {
    id: 3,
    title: "Colors",
    subtitle: "Learn color names",
    progress: 0,
    completed: 0,
    total: 6,
  },
  {
    id: 4,
    title: "Animals",
    subtitle: "Animal vocabulary",
    progress: 40,
    completed: 2,
    total: 5,
  },
  {
    id: 5,
    title: "Food",
    subtitle: "Food & drinks",
    progress: 20,
    completed: 1,
    total: 5,
  },
  {
    id: 6,
    title: "Family",
    subtitle: "Family members",
    progress: 0,
    completed: 0,
    total: 5,
  },
]

export function Dashboard({ onStartLesson }: DashboardProps) {
  const [points, setPoints] = useState(1245)
  const [streak, setStreak] = useState(7)
  const [hearts, setHearts] = useState(5)
  const [userName, setUserName] = useState("Learning Master")
  const [userAvatar, setUserAvatar] = useState("👤")
  const [showMascotMessage, setShowMascotMessage] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowMascotMessage(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/5 via-background to-background">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <StreakBadge streak={streak} />
            <div className="flex items-center gap-1">
              {Array(hearts)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-2xl animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                    ❤️
                  </span>
                ))}
            </div>
          </div>
          <div className="bg-accent/20 dark:bg-accent-dark/30 px-4 py-2 rounded-full flex items-center gap-2 border border-accent">
            <span className="text-xl">⭐</span>
            <span className="font-bold text-accent">{points}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-32">
              <ProfileCard
                name={userName}
                avatar={userAvatar}
                points={points}
                streak={streak}
                onNameChange={setUserName}
                onAvatarChange={setUserAvatar}
              />
              <div className="mt-6">
                <Mascot message={showMascotMessage ? "Ready to learn today?" : ""} mood="happy" />
              </div>
              <div className="mt-6">
                <AchievementBadges />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-2">Welcome Back!</h2>
              <p className="text-muted-foreground">You're on a {streak}-day streak! Keep it up!</p>
            </div>

            {/* Study Timer and Music Learning */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StudyTimer />
              <MusicLearning />
            </div>

            {/* AI Suggestion */}
            <AIsuggestion />

            {/* Lessons */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Continue Learning</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lessons.map((lesson) => (
                  <Card
                    key={lesson.id}
                    className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-accent/50 relative overflow-hidden rounded-2xl"
                    onClick={() => onStartLesson(lesson.id)}
                  >
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.2}
                      borderWidth={2}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-dark/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                            {lesson.id === 1
                              ? "👋"
                              : lesson.id === 2
                                ? "🔢"
                                : lesson.id === 3
                                  ? "🎨"
                                  : lesson.id === 4
                                    ? "🦁"
                                    : lesson.id === 5
                                      ? "🍕"
                                      : "👨‍👩‍👧"}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-primary">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">{lesson.subtitle}</p>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold text-accent">
                            {lesson.completed}/{lesson.total}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-accent to-accent-dark rounded-full transition-all duration-500"
                            style={{ width: `${lesson.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="w-full mt-4 relative h-12 rounded-lg overflow-hidden">
                        <GlowingEffect
                          spread={35}
                          glow={true}
                          disabled={false}
                          proximity={50}
                          inactiveZone={0.15}
                          borderWidth={2}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onStartLesson(lesson.id)
                          }}
                          className="relative w-full h-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg transition-all duration-300"
                        >
                          Start Lesson
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
