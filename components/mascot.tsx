"use client"

import { useEffect, useState } from "react"

interface MascotProps {
  message?: string
  mood?: "happy" | "sad" | "excited" | "thinking"
}

export function Mascot({ message = "", mood = "happy" }: MascotProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 600)
    return () => clearTimeout(timer)
  }, [mood])

  const moodEmojis = {
    happy: "😊",
    sad: "😢",
    excited: "🤩",
    thinking: "🤔",
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`text-9xl transition-all duration-300 ${isAnimating ? "animate-bounce-scale" : ""}`}>
        {moodEmojis[mood]}
      </div>

      {message && (
        <div className="bg-accent text-accent-foreground rounded-3xl px-6 py-4 text-center max-w-xs shadow-lg animate-slide-in">
          <p className="font-semibold text-sm leading-relaxed">{message}</p>
        </div>
      )}
    </div>
  )
}
