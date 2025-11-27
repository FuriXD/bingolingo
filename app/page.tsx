"use client"

import { useState } from "react"
import { Dashboard } from "@/components/dashboard"
import { LessonFlow } from "@/components/lesson-flow"
import { Leaderboard } from "@/components/leaderboard"
import { Community } from "@/components/community"
import { WritingHub } from "@/components/writing-hub"
import { NavigationBar } from "@/components/navigation-bar"
import { Onboarding } from "@/components/onboarding"
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background"

type Screen = "dashboard" | "lesson" | "leaderboard" | "community" | "writing"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard")
  const [lessonId, setLessonId] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(true)

  const handleStartLesson = (id: number) => {
    setLessonId(id)
    setCurrentScreen("lesson")
  }

  const handleBackToDashboard = () => {
    setCurrentScreen("dashboard")
  }

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen)
  }

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />
  }

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[linear-gradient(40deg,rgb(20,30,60),rgb(10,15,40))]">
      <AnimatedGradientBackground
        startingGap={120}
        Breathing={true}
        gradientColors={["#0A0A0A", "#D9F99D", "#FCD34D", "#F59E0B", "#EC4899", "#8B5CF6", "#3B82F6"]}
        gradientStops={[35, 50, 60, 70, 80, 90, 100]}
        animationSpeed={0.015}
        breathingRange={8}
        containerClassName="fixed inset-0 z-0 pointer-events-none"
        topOffset={0}
      />

      <div className="relative z-10 w-screen h-screen flex flex-col overflow-hidden">
        <NavigationBar currentScreen={currentScreen} onNavigate={handleNavigate} />

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {currentScreen === "dashboard" && <Dashboard onStartLesson={handleStartLesson} />}
          {currentScreen === "lesson" && <LessonFlow lessonId={lessonId} onBack={handleBackToDashboard} />}
          {currentScreen === "leaderboard" && <Leaderboard />}
          {currentScreen === "community" && <Community />}
          {currentScreen === "writing" && <WritingHub />}
        </div>
      </div>
    </div>
  )
}
