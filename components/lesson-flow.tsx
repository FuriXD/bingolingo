"use client"

import { useState } from "react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

interface LessonFlowProps {
  lessonId: number
  onBack: () => void
}

const lessonContent: Record<
  number,
  Array<{
    question: string
    type: "multiple-choice"
    options: string[]
    correct: number
    translations?: string[]
    emoji?: string[]
    hint?: string
  }>
> = {
  1: [
    {
      question: 'Which one of these is "the man"?',
      type: "multiple-choice",
      options: ["le garçon", "l'homme", "un"],
      correct: 1,
      translations: ["the boy", "the man", "a/one"],
      emoji: ["👦", "👨", "1️⃣"],
      hint: "Think of a male adult...",
    },
    {
      question: 'How do you say "Hello" in French?',
      type: "multiple-choice",
      options: ["Au revoir", "Bonjour", "S'il vous plaît", "Merci"],
      correct: 1,
      translations: ["Goodbye", "Hello", "Please", "Thank you"],
      emoji: ["👋", "👋👋", "🙏", "🙏🙏"],
      hint: "It means good day in French...",
    },
    {
      question: 'What is the greeting for "Good morning"?',
      type: "multiple-choice",
      options: ["Bonsoir", "Bon matin", "Bonjour", "Bonne nuit"],
      correct: 2,
      translations: ["Good evening", "Good morning", "Good day", "Good night"],
      emoji: ["🌙", "🌅", "☀️", "😴"],
      hint: "It starts with 'Bon'...",
    },
    {
      question: 'How do you say "Thank you"?',
      type: "multiple-choice",
      options: ["S'il vous plaît", "De rien", "Merci", "Excusez-moi"],
      correct: 2,
      translations: ["Please", "You're welcome", "Thank you", "Excuse me"],
      emoji: ["🙏", "👍", "🙌", "🤚"],
      hint: "It starts with an M sound...",
    },
    {
      question: 'What does "Au revoir" mean?',
      type: "multiple-choice",
      options: ["Hello", "Goodbye", "See you", "Thank you"],
      correct: 1,
      translations: ["Hello", "Goodbye", "See you", "Thank you"],
      emoji: ["👋", "👋👋", "👀", "🙌"],
      hint: "Say this when leaving...",
    },
    {
      question: 'How do you say "Please"?',
      type: "multiple-choice",
      options: ["Merci", "S'il vous plaît", "De rien", "Pardon"],
      correct: 1,
      translations: ["Thank you", "Please", "You're welcome", "Sorry"],
      emoji: ["🙌", "🙏", "👍", "😔"],
      hint: "It's a polite request phrase...",
    },
  ],
  2: [
    {
      question: "What is the number 5 in French?",
      type: "multiple-choice",
      options: ["Trois", "Cinq", "Sept", "Deux"],
      correct: 1,
      translations: ["Three", "Five", "Seven", "Two"],
      emoji: ["3️⃣", "5️⃣", "7️⃣", "2️⃣"],
      hint: "It comes after quatre...",
    },
    {
      question: "How do you say 8?",
      type: "multiple-choice",
      options: ["Neuf", "Huit", "Six", "Dix"],
      correct: 1,
      translations: ["Nine", "Eight", "Six", "Ten"],
      emoji: ["9️⃣", "8️⃣", "6️⃣", "🔟"],
      hint: "It sounds like 'wheat'...",
    },
    {
      question: "What is 3 in French?",
      type: "multiple-choice",
      options: ["Un", "Deux", "Trois", "Quatre"],
      correct: 2,
      translations: ["One", "Two", "Three", "Four"],
      emoji: ["1️⃣", "2️⃣", "3️⃣", "4️⃣"],
      hint: "It starts with a T...",
    },
    {
      question: "How do you count to 10?",
      type: "multiple-choice",
      options: [
        "Un, Deux, Trois, Dix",
        "Un, Deux, Trois, Quatre, Cinq, Six, Sept, Huit, Neuf, Dix",
        "Uno, Dos, Tres",
        "One, Two, Three",
      ],
      correct: 1,
      translations: ["Wrong", "Correct sequence", "Spanish", "English"],
      emoji: ["❌", "✅", "🇪🇸", "🇬🇧"],
      hint: "All numbers in French...",
    },
    {
      question: "What is 7 in French?",
      type: "multiple-choice",
      options: ["Sept", "Sex", "Set", "Seep"],
      correct: 0,
      translations: ["Seven", "Six", "Seven", "Seven"],
      emoji: ["7️⃣", "6️⃣", "7️⃣", "7️⃣"],
      hint: "It has a T sound...",
    },
    {
      question: "How do you say 1?",
      type: "multiple-choice",
      options: ["Un", "Uno", "Une", "Unus"],
      correct: 0,
      translations: ["One", "One (Spanish)", "One (fem)", "One (Latin)"],
      emoji: ["1️⃣", "1️⃣", "1️⃣", "1️⃣"],
      hint: "It's the French masculine form...",
    },
  ],
  3: [
    {
      question: 'What color is "Rojo"?',
      type: "multiple-choice",
      options: ["Azul", "Rojo", "Verde", "Amarillo"],
      correct: 1,
      translations: ["Blue", "Red", "Green", "Yellow"],
      emoji: ["🔵", "🔴", "🟢", "🟡"],
      hint: "Think of a fire truck...",
    },
    {
      question: 'How do you say "Blue"?',
      type: "multiple-choice",
      options: ["Verde", "Azul", "Negro", "Blanco"],
      correct: 1,
      translations: ["Green", "Blue", "Black", "White"],
      emoji: ["🟢", "🔵", "⚫", "⚪"],
      hint: "Like the ocean...",
    },
    {
      question: 'What is "Amarillo"?',
      type: "multiple-choice",
      options: ["Green", "Purple", "Yellow", "Orange"],
      correct: 2,
      translations: ["Green", "Purple", "Yellow", "Orange"],
      emoji: ["🟢", "🟣", "🟡", "🟠"],
      hint: "Bright like the sun...",
    },
    {
      question: 'How do you say "Black"?',
      type: "multiple-choice",
      options: ["Blanco", "Negro", "Gris", "Café"],
      correct: 1,
      translations: ["White", "Black", "Gray", "Brown"],
      emoji: ["⚪", "⚫", "⚫⚪", "🟤"],
      hint: "The darkest color...",
    },
    {
      question: 'What does "Blanco" mean?',
      type: "multiple-choice",
      options: ["Pink", "White", "Silver", "Clear"],
      correct: 1,
      translations: ["Pink", "White", "Silver", "Clear"],
      emoji: ["🩷", "⚪", "🟩", "❄️"],
      hint: "Like snow...",
    },
    {
      question: 'How do you say "Green"?',
      type: "multiple-choice",
      options: ["Gris", "Verde", "Violeta", "Naranja"],
      correct: 1,
      translations: ["Gray", "Green", "Purple", "Orange"],
      emoji: ["⚫⚪", "🟢", "🟣", "🟠"],
      hint: "Like a leaf or grass...",
    },
  ],
  4: [
    {
      question: 'What is "Gato" in English?',
      type: "multiple-choice",
      options: ["Dog", "Cat", "Bird", "Fish"],
      correct: 1,
      translations: ["Perro", "Gato", "Pájaro", "Pez"],
      emoji: ["🐶", "🐱", "🐦", "🐠"],
      hint: "A furry pet that meows...",
    },
    {
      question: 'How do you say "Dog"?',
      type: "multiple-choice",
      options: ["Gato", "Perro", "Pájaro", "Caballo"],
      correct: 1,
      translations: ["Cat", "Dog", "Bird", "Horse"],
      emoji: ["🐱", "🐶", "🐦", "🐴"],
      hint: "Man's best friend...",
    },
    {
      question: 'What animal is "Elefante"?',
      type: "multiple-choice",
      options: ["Lion", "Elephant", "Zebra", "Tiger"],
      correct: 1,
      translations: ["León", "Elefante", "Cebra", "Tigre"],
      emoji: ["🦁", "🐘", "🦓", "🐯"],
      hint: "A large gray animal with a trunk...",
    },
    {
      question: 'How do you say "Bird"?',
      type: "multiple-choice",
      options: ["Pez", "Pájaro", "Mariposa", "Abeja"],
      correct: 1,
      translations: ["Fish", "Bird", "Butterfly", "Bee"],
      emoji: ["🐠", "🐦", "🦋", "🐝"],
      hint: "An animal that flies and sings...",
    },
    {
      question: 'What is "León" in English?',
      type: "multiple-choice",
      options: ["Tiger", "Lion", "Bear", "Wolf"],
      correct: 1,
      translations: ["Tigre", "León", "Oso", "Lobo"],
      emoji: ["🐯", "🦁", "🐻", "🐺"],
      hint: "The king of the jungle...",
    },
    {
      question: 'How do you say "Fish"?',
      type: "multiple-choice",
      options: ["Pájaro", "Pez", "Serpiente", "Rana"],
      correct: 1,
      translations: ["Bird", "Fish", "Snake", "Frog"],
      emoji: ["🐦", "🐠", "🐍", "🐸"],
      hint: "An animal that lives in water...",
    },
  ],
  5: [
    {
      question: 'What is "Pan" in English?',
      type: "multiple-choice",
      options: ["Milk", "Bread", "Cheese", "Butter"],
      correct: 1,
      translations: ["Leche", "Pan", "Queso", "Mantequilla"],
      emoji: ["🥛", "🍞", "🧀", "🧈"],
      hint: "A staple carbohydrate made from flour...",
    },
    {
      question: 'How do you say "Water"?',
      type: "multiple-choice",
      options: ["Vino", "Agua", "Cerveza", "Jugo"],
      correct: 1,
      translations: ["Wine", "Water", "Beer", "Juice"],
      emoji: ["🍷", "💧", "🍺", "🧃"],
      hint: "A clear liquid essential for life...",
    },
    {
      question: 'What food is "Manzana"?',
      type: "multiple-choice",
      options: ["Banana", "Apple", "Orange", "Grape"],
      correct: 1,
      translations: ["Plátano", "Manzana", "Naranja", "Uva"],
      emoji: ["🍌", "🍎", "🍊", "🍇"],
      hint: "A round red or green fruit...",
    },
    {
      question: 'How do you say "Pizza"?',
      type: "multiple-choice",
      options: ["Hamburguesa", "Pizza", "Sándwich", "Tacos"],
      correct: 1,
      translations: ["Hamburger", "Pizza", "Sandwich", "Tacos"],
      emoji: ["🍔", "🍕", "🥪", "🌮"],
      hint: "Italian dish with cheese and toppings...",
    },
    {
      question: 'What is "Queso"?',
      type: "multiple-choice",
      options: ["Milk", "Cheese", "Yogurt", "Cream"],
      correct: 1,
      translations: ["Leche", "Queso", "Yogur", "Crema"],
      emoji: ["🥛", "🧀", "🍮", "🥄"],
      hint: "A dairy product that can be sharp or mild...",
    },
    {
      question: 'How do you say "Rice"?',
      type: "multiple-choice",
      options: ["Papa", "Arroz", "Pasta", "Maíz"],
      correct: 1,
      translations: ["Potato", "Rice", "Pasta", "Corn"],
      emoji: ["🥔", "🍚", "🍝", "🌽"],
      hint: "A grain staple in many cuisines...",
    },
  ],
  6: [
    {
      question: 'What is "Padre" in English?',
      type: "multiple-choice",
      options: ["Mother", "Father", "Brother", "Sister"],
      correct: 1,
      translations: ["Madre", "Padre", "Hermano", "Hermana"],
      emoji: ["👩", "👨", "👦", "👧"],
      hint: "Male parent...",
    },
    {
      question: 'How do you say "Mother"?',
      type: "multiple-choice",
      options: ["Padre", "Madre", "Abuelo", "Abuela"],
      correct: 1,
      translations: ["Father", "Mother", "Grandfather", "Grandmother"],
      emoji: ["👨", "👩", "👴", "👵"],
      hint: "Female parent...",
    },
    {
      question: 'What family member is "Hermano"?',
      type: "multiple-choice",
      options: ["Sister", "Brother", "Cousin", "Uncle"],
      correct: 1,
      translations: ["Hermana", "Hermano", "Primo", "Tío"],
      emoji: ["👧", "👦", "👦", "👨"],
      hint: "A male sibling...",
    },
    {
      question: 'How do you say "Grandmother"?',
      type: "multiple-choice",
      options: ["Abuelo", "Abuela", "Tía", "Prima"],
      correct: 1,
      translations: ["Grandfather", "Grandmother", "Aunt", "Cousin"],
      emoji: ["👴", "👵", "👩", "👧"],
      hint: "Female parent of your parent...",
    },
    {
      question: 'What is "Tío" in English?',
      type: "multiple-choice",
      options: ["Aunt", "Uncle", "Cousin", "Nephew"],
      correct: 1,
      translations: ["Tía", "Tío", "Primo", "Sobrino"],
      emoji: ["👩", "👨", "👦", "👶"],
      hint: "Brother or sister of your parent...",
    },
    {
      question: 'How do you say "Sister"?',
      type: "multiple-choice",
      options: ["Hermano", "Hermana", "Prima", "Tía"],
      correct: 1,
      translations: ["Brother", "Sister", "Cousin", "Aunt"],
      emoji: ["👦", "👧", "👧", "👩"],
      hint: "A female sibling...",
    },
  ],
}

export function LessonFlow({ lessonId, onBack }: LessonFlowProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [mascotMood, setMascotMood] = useState<"thinking" | "happy" | "excited">("thinking")
  const [showFeedback, setShowFeedback] = useState(false)
  const [animatingButtons, setAnimatingButtons] = useState<Set<number>>(new Set())
  const [revealedHints, setRevealedHints] = useState<Set<number>>(new Set())

  const questions = lessonContent[lessonId] || []
  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question?.correct
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const isLastQuestion = currentQuestion === questions.length - 1
  const hasRevealedHint = revealedHints.has(currentQuestion)

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return

    setSelectedAnswer(index)
    setIsAnswered(true)
    setShowFeedback(true)
    setAnimatingButtons((prev) => new Set([...prev, index]))

    if (index === question?.correct) {
      setMascotMood("excited")
      setScore(score + 10)
    } else {
      setMascotMood("thinking")
    }

    setTimeout(() => {
      if (isLastQuestion && index === question?.correct) {
        setTimeout(onBack, 1500)
      }
    }, 2000)
  }

  const handleRevealHint = () => {
    setRevealedHints((prev) => new Set([...prev, currentQuestion]))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setShowFeedback(false)
      setMascotMood("thinking")
      setAnimatingButtons(new Set())
      setRevealedHints(new Set())
    } else {
      onBack()
    }
  }

  if (!question) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900 flex flex-col pt-16">
      {/* Header with Progress Bar */}
      <div className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="relative h-10 w-10 rounded-lg overflow-hidden">
            <GlowingEffect
              spread={20}
              glow={false}
              disabled={false}
              proximity={40}
              inactiveZone={0.3}
              borderWidth={1}
            />
            <button
              onClick={onBack}
              className="relative h-full w-full flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-accent transition-all duration-300 rounded-lg"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-red-500 text-xl">❤️</span>
            <span className="text-slate-200 font-semibold">4</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-3xl w-full">
          {/* Question Label */}
          <div className="mb-8 text-center">
            <div className="inline-block bg-purple-600 text-accent px-4 py-2 rounded-full text-sm font-bold mb-4 animate-slide-in">
              NEW WORD
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white text-balance mb-4">{question.question}</h2>
          </div>

          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrectOption = index === question.correct
              let borderStyle = "border-2 border-slate-600 hover:border-accent/50"
              let bgStyle = "bg-slate-700/50"

              if (isAnswered) {
                if (isCorrectOption) {
                  borderStyle = `border-2 border-accent ${animatingButtons.has(index) ? "animate-pulse-glow" : ""}`
                  bgStyle = "bg-slate-700"
                } else if (isSelected && !isCorrectOption) {
                  borderStyle = `border-2 border-red-500 ${animatingButtons.has(index) ? "animate-shake" : ""}`
                  bgStyle = "bg-red-950/30"
                }
              } else if (isSelected) {
                borderStyle = "border-2 border-accent"
                bgStyle = "bg-slate-700"
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={isAnswered}
                  className={`
                    w-full p-6 rounded-2xl font-semibold text-lg transition-all duration-300
                    flex items-center gap-4 text-left
                    ${borderStyle}
                    ${bgStyle}
                    ${isAnswered ? "cursor-default" : "cursor-pointer hover:scale-105"}
                    ${!isAnswered && !isSelected ? "hover:bg-slate-700/80" : ""}
                  `}
                >
                  <div className="text-5xl flex-shrink-0">{question.emoji?.[index] || "🗣️"}</div>
                  <div className="flex-1">
                    <div className="text-white font-bold text-lg">{option}</div>
                    {question.translations?.[index] && (
                      <div className="text-slate-400 text-sm mt-1">{question.translations[index]}</div>
                    )}
                  </div>
                  <div className="text-slate-400 font-semibold text-lg">{index + 1}</div>
                  {isAnswered && isCorrectOption && <span className="text-2xl">✓</span>}
                </button>
              )
            })}
          </div>

          {!isAnswered && (
            <div className="mb-8 text-center">
              <div className="relative inline-block h-10 rounded-xl overflow-hidden">
                <GlowingEffect
                  spread={30}
                  glow={hasRevealedHint}
                  disabled={false}
                  proximity={50}
                  inactiveZone={0.2}
                  borderWidth={2}
                />
                <button
                  onClick={handleRevealHint}
                  className="relative px-6 py-2 bg-accent-dark hover:bg-accent/80 text-accent-foreground rounded-xl font-semibold transition-all duration-300"
                >
                  💡 Hint
                </button>
              </div>
              {hasRevealedHint && (
                <div className="mt-4 p-4 bg-slate-700/50 border border-accent rounded-xl animate-slide-in">
                  <p className="text-accent font-semibold text-lg">{question.hint}</p>
                </div>
              )}
            </div>
          )}

          {/* Feedback Section */}
          {isAnswered && (
            <div className="flex items-center justify-between p-6 bg-slate-700/50 rounded-2xl border border-slate-600 animate-slide-in">
              <div>
                {isCorrect ? (
                  <div>
                    <p className="text-accent font-bold text-lg flex items-center gap-2">
                      <span>✓</span> Correct!
                    </p>
                    <p className="text-slate-400 text-sm mt-1">REPORT</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-red-400 font-bold text-lg flex items-center gap-2">
                      <span>✗</span> Incorrect
                    </p>
                    <p className="text-slate-400 text-sm mt-1">Try again next time</p>
                  </div>
                )}
              </div>
              <div className="relative h-12 rounded-xl overflow-hidden">
                <GlowingEffect
                  spread={35}
                  glow={true}
                  disabled={false}
                  proximity={60}
                  inactiveZone={0.1}
                  borderWidth={2}
                />
                <button
                  onClick={handleNext}
                  className="relative px-8 py-3 text-lg font-bold rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
