"use client"
import { useTheme } from "@/components/theme-provider"
import { GlowingEffect } from "@/components/ui/glowing-effect"

type Screen = "dashboard" | "lesson" | "leaderboard" | "community" | "writing"

interface NavigationBarProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

export function NavigationBar({ currentScreen, onNavigate }: NavigationBarProps) {
  const { theme, setTheme } = useTheme()

  const navItems: { label: string; screen: Screen; icon: string }[] = [
    { label: "Dashboard", screen: "dashboard", icon: "🏠" },
    { label: "Leaderboard", screen: "leaderboard", icon: "🏆" },
    { label: "Community", screen: "community", icon: "👥" },
    { label: "Stories", screen: "writing", icon: "✍️" },
  ]

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
            🎯
          </div>
          <h1 className="text-2xl font-bold text-primary">Bingolingo</h1>
        </div>

        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <div key={item.screen} className="relative h-10 rounded-lg overflow-hidden">
              <div className="relative h-full rounded-lg">
                <GlowingEffect
                  spread={40}
                  glow={currentScreen === item.screen}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                />
                <button
                  onClick={() => onNavigate(item.screen)}
                  className={`relative h-full px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    currentScreen === item.screen
                      ? "bg-accent text-accent-foreground"
                      : "bg-background text-primary hover:bg-accent/10"
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              </div>
            </div>
          ))}

          <div className="relative h-10 w-10 rounded-lg overflow-hidden ml-2">
            <div className="relative h-full rounded-lg">
              <GlowingEffect
                spread={30}
                glow={false}
                disabled={false}
                proximity={50}
                inactiveZone={0.2}
                borderWidth={1.5}
              />
              <button
                onClick={toggleTheme}
                className="relative h-full w-full px-2 py-2 rounded-lg bg-background text-primary hover:bg-accent/10 transition-all duration-300 flex items-center justify-center"
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
