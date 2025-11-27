"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface MusicalNote {
  id: number
  name: string
  symbol: string
  emoji: string
  frequency: number
}

const musicalNotes: MusicalNote[] = [
  { id: 1, name: "Do", symbol: "C", emoji: "🎵", frequency: 261.63 },
  { id: 2, name: "Re", symbol: "D", emoji: "🎶", frequency: 293.66 },
  { id: 3, name: "Mi", symbol: "E", emoji: "🎼", frequency: 329.63 },
  { id: 4, name: "Fa", symbol: "F", emoji: "🎹", frequency: 349.23 },
  { id: 5, name: "Sol", symbol: "G", emoji: "🎸", frequency: 392.0 },
  { id: 6, name: "La", symbol: "A", emoji: "🎤", frequency: 440.0 },
  { id: 7, name: "Si", symbol: "B", emoji: "🎧", frequency: 493.88 },
]

export function MusicLearning() {
  const [currentNote, setCurrentNote] = useState<MusicalNote | null>(null)
  const [completedNotes, setCompletedNotes] = useState<number[]>([])
  const [selectedNote, setSelectedNote] = useState<MusicalNote | null>(null)

  const playSound = (frequency: number) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = frequency
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  const selectRandomNote = () => {
    const randomNote = musicalNotes[Math.floor(Math.random() * musicalNotes.length)]
    setCurrentNote(randomNote)
    setSelectedNote(null)
    playSound(randomNote.frequency)
  }

  const handleNoteGuess = (note: MusicalNote) => {
    setSelectedNote(note)
    playSound(note.frequency)

    if (note.id === currentNote?.id) {
      setCompletedNotes([...completedNotes, note.id])
      setTimeout(() => selectRandomNote(), 500)
    }
  }

  const progress = (completedNotes.length / musicalNotes.length) * 100

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 border-2 border-purple-400/30">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎵</span>
            <h3 className="text-xl font-bold text-primary">Music Learning</h3>
          </div>
          <div className="text-sm font-semibold text-accent">{completedNotes.length}/7</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Current Note Display */}
        {currentNote ? (
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Listen to the note and identify it:</p>
            <div className="text-5xl mb-3 animate-bounce-scale">{currentNote.emoji}</div>
            <Button
              onClick={() => playSound(currentNote.frequency)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              🔊 Play Again
            </Button>
          </div>
        ) : (
          <Button
            onClick={selectRandomNote}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-6 rounded-lg"
          >
            🎵 Start Music Lesson
          </Button>
        )}

        {/* Note Buttons */}
        <div className="grid grid-cols-7 gap-2">
          {musicalNotes.map((note) => (
            <Button
              key={note.id}
              onClick={() => handleNoteGuess(note)}
              disabled={completedNotes.includes(note.id)}
              className={`h-16 rounded-lg font-bold transition-all ${
                completedNotes.includes(note.id)
                  ? "bg-green-500/30 text-green-600 dark:text-green-400 border-2 border-green-500/50 cursor-not-allowed"
                  : selectedNote?.id === note.id
                    ? "bg-yellow-500 text-white border-2 border-yellow-600"
                    : currentNote
                      ? "bg-white/50 dark:bg-slate-800/50 hover:bg-accent/20 border-2 border-border"
                      : "bg-white/50 dark:bg-slate-800/50 border-2 border-border"
              }`}
            >
              <div className="text-center">
                <div className="text-xl">{note.emoji}</div>
                <div className="text-xs">{note.name}</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Completion */}
        {completedNotes.length === musicalNotes.length && (
          <div className="p-4 bg-gradient-to-r from-accent/20 to-accent-dark/20 border border-accent/50 rounded-lg text-center animate-pulse-glow">
            <p className="font-bold text-accent">Perfect! You've mastered all 7 notes!</p>
            <p className="text-sm text-muted-foreground mt-1">You earned 100 XP</p>
          </div>
        )}
      </div>
    </Card>
  )
}
