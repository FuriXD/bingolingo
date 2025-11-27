"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AIsuggestion() {
  const suggestions = [
    {
      title: "Perfect Time to Practice!",
      description: "You've been learning consistently. Try the Colors lesson to expand your vocabulary.",
      icon: "💡",
    },
    {
      title: "Boost Your Streak",
      description: "Complete one more lesson today to maintain your 7-day streak!",
      icon: "🔥",
    },
    {
      title: "Master Review",
      description: "Time to review: 'Numbers' lesson. Reinforcing past lessons improves retention.",
      icon: "📚",
    },
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-primary">AI Suggestions</h3>
      {suggestions.map((suggestion, idx) => (
        <Card
          key={idx}
          className="p-4 border-2 border-accent/20 bg-gradient-to-r from-accent/10 to-transparent hover:shadow-md transition-all"
        >
          <div className="flex items-start gap-4">
            <span className="text-2xl">{suggestion.icon}</span>
            <div className="flex-1">
              <h4 className="font-semibold text-primary mb-1">{suggestion.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground text-xs">
                Take Action
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
