"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface StudyTimerProps {
  onComplete?: () => void
}

export function StudyTimer({ onComplete }: StudyTimerProps) {
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes default
  const [isRunning, setIsRunning] = useState(false)
  const [selectedTime, setSelectedTime] = useState(10)
  const [sessionComplete, setSessionComplete] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            setSessionComplete(true)
            onComplete?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, onComplete])

  const toggleTimer = () => setIsRunning(!isRunning)

  const setDuration = (minutes: number) => {
    setTimeLeft(minutes * 60)
    setSelectedTime(minutes)
    setIsRunning(false)
    setSessionComplete(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((selectedTime * 60 - timeLeft) / (selectedTime * 60)) * 100

  return (
    <Card className="p-6 bg-gradient-to-br from-accent/10 via-transparent to-accent-dark/10 border-2 border-accent/30">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">⏱️</span>
          <h3 className="text-xl font-bold text-primary">Study Session</h3>
        </div>

        {/* Timer Display */}
        <div className="relative w-40 h-40 mx-auto">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent transition-all duration-1000"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">{formatTime(timeLeft)}</div>
              <div className="text-sm text-muted-foreground">{selectedTime} min session</div>
            </div>
          </div>
        </div>

        {/* Time Selection */}
        <div className="flex gap-2 justify-center">
          {[10, 15].map((mins) => (
            <Button
              key={mins}
              onClick={() => setDuration(mins)}
              variant={selectedTime === mins ? "default" : "outline"}
              className={`rounded-lg font-semibold transition-all ${
                selectedTime === mins
                  ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                  : "border-accent/30 hover:border-accent"
              }`}
            >
              {mins}m
            </Button>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-2 justify-center">
          <Button
            onClick={toggleTimer}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg"
          >
            {isRunning ? "⏸️ Pause" : timeLeft === selectedTime * 60 ? "▶️ Start" : "▶️ Resume"}
          </Button>
          <Button
            onClick={() => setDuration(selectedTime)}
            variant="outline"
            className="flex-1 rounded-lg border-accent/30"
          >
            🔄 Reset
          </Button>
        </div>

        {/* Completion Message */}
        {sessionComplete && (
          <div className="mt-4 p-3 bg-accent/20 border border-accent/50 rounded-lg animate-bounce-scale">
            <p className="text-accent font-bold">Great job! Session complete!</p>
            <p className="text-sm text-muted-foreground mt-1">You've earned 50 XP</p>
          </div>
        )}
      </div>
    </Card>
  )
}
