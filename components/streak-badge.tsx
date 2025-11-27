"use client"

interface StreakBadgeProps {
  streak: number
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full hover:scale-110 transition-transform duration-300 cursor-pointer">
      <span className="text-xl animate-float">🔥</span>
      <span className="font-bold text-sm text-orange-600 dark:text-orange-400">{streak} day streak</span>
    </div>
  )
}
