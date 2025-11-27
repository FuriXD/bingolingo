"use client"

import type React from "react"

import { useState } from "react"

interface OnboardingProps {
  onComplete: () => void
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [scroll, setScroll] = useState(0)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScroll((e.target as HTMLDivElement).scrollLeft)
  }

  const communityPosts = [
    {
      id: 1,
      author: "Sarah M.",
      avatar: "👩",
      image: "/language-learning-success.jpg",
      content: "Just completed French Level 3! 🎉",
      likes: 234,
      comments: 12,
    },
    {
      id: 2,
      author: "Alex K.",
      avatar: "👨",
      image: "/spanish-learning-journey.jpg",
      content: "Day 45 streak in Spanish! 🔥",
      likes: 567,
      comments: 28,
    },
    {
      id: 3,
      author: "Emma L.",
      avatar: "👩‍🦱",
      image: "/german-language-learning.jpg",
      content: "Reached 1000 points today!",
      likes: 892,
      comments: 45,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100 relative overflow-hidden">
      {/* Animated clouds background */}
      <div className="absolute top-10 left-10 w-24 h-12 bg-white rounded-full opacity-70 animate-float blur-sm" />
      <div
        className="absolute top-32 right-20 w-32 h-16 bg-white rounded-full opacity-60 animate-float blur-md"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/4 left-1/3 w-28 h-14 bg-white rounded-full opacity-50 animate-float blur-sm"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-4">
        {/* Header section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2 drop-shadow-lg">Bingolingo</h1>
          <p className="text-xl text-gray-700 drop-shadow">Learn. Share. Connect.</p>
        </div>

        {/* Mascot */}
        <div className="mb-8 animate-bounce-scale">
          <div className="text-8xl">🦜</div>
        </div>

        {/* Main content section */}
        <div className="w-full max-w-2xl">
          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-2">📚</div>
              <p className="text-sm font-semibold text-gray-800">Learn</p>
              <p className="text-xs text-gray-600">Fun lessons</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-2">🏆</div>
              <p className="text-sm font-semibold text-gray-800">Compete</p>
              <p className="text-xs text-gray-600">Leaderboards</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-2">👥</div>
              <p className="text-sm font-semibold text-gray-800">Connect</p>
              <p className="text-xs text-gray-600">Share wins</p>
            </div>
          </div>

          {/* Instagram-style social feed */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4 drop-shadow">Community Highlights</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" onScroll={handleScroll}>
              {communityPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex-shrink-0 w-56 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow snap-center"
                >
                  {/* Post image */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-blue-300 to-blue-100 overflow-hidden group">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.author}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Post content */}
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{post.avatar}</span>
                      <p className="font-semibold text-sm text-gray-800">{post.author}</p>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{post.content}</p>

                    {/* Engagement metrics */}
                    <div className="flex gap-4 text-xs text-gray-600 border-t border-gray-200 pt-2">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex gap-4">
            <button
              onClick={onComplete}
              className="flex-1 bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-lg"
            >
              Start Learning
            </button>
            <button
              onClick={onComplete}
              className="flex-1 bg-white/80 hover:bg-white text-gray-800 font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-lg"
            >
              Explore
            </button>
          </div>

          {/* Bottom info */}
          <p className="text-center text-sm text-gray-700 mt-6 drop-shadow">
            Join millions learning languages together 🌍
          </p>
        </div>
      </div>
    </div>
  )
}
