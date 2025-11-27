"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface UserProfile {
  id: string
  name: string
  avatar: string
  points: number
  streak: number
  level: number
  totalLessons: number
}

interface UserContextType {
  user: UserProfile
  setUserName: (name: string) => void
  setUserAvatar: (avatar: string) => void
  updatePoints: (points: number) => void
  updateStreak: (streak: number) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>({
    id: "user-1",
    name: "Learning Master",
    avatar: "👤",
    points: 1245,
    streak: 7,
    level: 5,
    totalLessons: 23,
  })

  const setUserName = (name: string) => {
    setUser((prev) => ({ ...prev, name }))
  }

  const setUserAvatar = (avatar: string) => {
    setUser((prev) => ({ ...prev, avatar }))
  }

  const updatePoints = (points: number) => {
    setUser((prev) => ({ ...prev, points: prev.points + points }))
  }

  const updateStreak = (streak: number) => {
    setUser((prev) => ({ ...prev, streak }))
  }

  return (
    <UserContext.Provider value={{ user, setUserName, setUserAvatar, updatePoints, updateStreak }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within UserProvider")
  }
  return context
}
