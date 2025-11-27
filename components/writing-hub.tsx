"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: string
  avatar: string
  readTime: number
  likes: number
  claps: number
  date: string
  category: string
  image?: string
}

const SAMPLE_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "The Science Behind Language Acquisition: Why Spaced Repetition Works",
    excerpt:
      "Discover how neuroscience proves that spaced repetition is the most effective method for learning languages. A deep dive into memory, retention, and learning efficiency.",
    author: "Dr. Sarah Chen",
    avatar: "👩‍🔬",
    readTime: 8,
    likes: 2400,
    claps: 1200,
    date: "2 days ago",
    category: "Learning Science",
    image: "https://images.unsplash.com/photo-1516321318423-f06f70504a61?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "From Zero to Hero: My 100-Day Language Challenge",
    excerpt:
      "I challenged myself to learn conversational Spanish in 100 days. Here's what worked, what didn't, and lessons that will transform your learning journey.",
    author: "Alex Thompson",
    avatar: "🌍",
    readTime: 12,
    likes: 3200,
    claps: 1800,
    date: "5 days ago",
    category: "Personal Journey",
    image: "https://images.unsplash.com/photo-1434030216411-0b793bcdc4f3?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Gamification in Education: How Games Make Learning Stick",
    excerpt:
      "Why do games make learning so engaging? Explore the psychology of gamification and how reward systems boost motivation and retention in language learning.",
    author: "Prof. Marcus Rodriguez",
    avatar: "🎮",
    readTime: 10,
    likes: 1900,
    claps: 950,
    date: "1 week ago",
    category: "Gamification",
    image: "https://images.unsplash.com/photo-1535631066927-ab7c9ab60908?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Cultural Immersion Without Leaving Home",
    excerpt:
      "Learn the secrets of cultural immersion in language learning. From virtual exchanges to authentic media, here's how to train your ear and expand your perspective.",
    author: "Elena Rossi",
    avatar: "🌏",
    readTime: 9,
    likes: 2100,
    claps: 1100,
    date: "1 week ago",
    category: "Cultural Learning",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&h=400&fit=crop",
  },
]

export function WritingHub() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [posts] = useState<BlogPost[]>(SAMPLE_POSTS)

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Button
            onClick={() => setSelectedPost(null)}
            variant="ghost"
            className="mb-8 text-primary hover:bg-accent/10"
          >
            ← Back to posts
          </Button>

          {/* Article Header */}
          <article className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-accent/20 rounded-full border border-accent text-sm font-semibold text-accent">
                {selectedPost.category}
              </div>
              <h1 className="text-5xl font-bold text-primary leading-tight">{selectedPost.title}</h1>
              <p className="text-xl text-muted-foreground">{selectedPost.excerpt}</p>
            </div>

            {/* Article Meta */}
            <div className="flex items-center justify-between py-6 border-y border-border">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{selectedPost.avatar}</div>
                <div>
                  <p className="font-bold text-primary">{selectedPost.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedPost.date} · {selectedPost.readTime} min read
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                  👏 {selectedPost.claps}
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                  ❤️ {selectedPost.likes}
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            {selectedPost.image && (
              <div className="w-full h-96 rounded-2xl overflow-hidden bg-accent/10">
                <img
                  src={selectedPost.image || "/placeholder.svg"}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-invert max-w-none space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {selectedPost.excerpt} This comprehensive exploration dives deep into the topic, providing insights and
                practical strategies you can implement immediately.
              </p>

              <h2 className="text-3xl font-bold text-primary mt-8 mb-4">Key Takeaways</h2>
              <ul className="space-y-3">
                {[
                  "Understanding the core principles behind language acquisition",
                  "Practical techniques to accelerate your learning progress",
                  "Common mistakes to avoid on your learning journey",
                  "Tools and resources recommended by experts",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-accent mt-1">✓</span>
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>

              <p className="text-lg text-muted-foreground leading-relaxed">
                The journey of language learning is unique for every person, but the principles of effective learning
                remain constant. By applying these insights and maintaining consistent effort, you'll find yourself
                making remarkable progress.
              </p>
            </div>

            {/* Author Bio */}
            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-8 mt-12">
              <div className="flex items-start gap-4">
                <div className="text-6xl">{selectedPost.avatar}</div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">{selectedPost.author}</h3>
                  <p className="text-muted-foreground">
                    Passionate educator and language learning enthusiast with over a decade of experience helping
                    learners achieve their goals.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 border-accent text-accent hover:bg-accent/10 bg-transparent"
                  >
                    Follow
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Learning Stories</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover insights, tips, and inspiring stories from language learners and educators around the world.
          </p>
        </div>

        {/* Featured Post */}
        {posts.length > 0 && (
          <Card
            onClick={() => setSelectedPost(posts[0])}
            className="mb-12 overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/50 group"
          >
            <div className="grid md:grid-cols-2">
              {posts[0].image && (
                <div className="h-80 md:h-96 overflow-hidden">
                  <img
                    src={posts[0].image || "/placeholder.svg"}
                    alt={posts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-8 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-accent/20 rounded-full border border-accent text-sm font-semibold text-accent mb-4 w-fit">
                  Featured
                </div>
                <h2 className="text-3xl font-bold text-primary mb-3">{posts[0].title}</h2>
                <p className="text-muted-foreground mb-6">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    {posts[0].avatar} {posts[0].author}
                  </span>
                  <span>•</span>
                  <span>{posts[0].readTime} min read</span>
                  <span>•</span>
                  <span>{posts[0].date}</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Posts Grid */}
        <div>
          <h3 className="text-2xl font-bold text-primary mb-6">Latest Stories</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {posts.slice(1).map((post) => (
              <Card
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/50 flex flex-col group"
              >
                {post.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="inline-block px-3 py-1 bg-accent/20 rounded-full border border-accent text-xs font-semibold text-accent mb-3 w-fit">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{post.avatar}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-primary text-sm">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.date}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{post.readTime} min</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        className="text-muted-foreground hover:text-accent gap-1"
                      >
                        👏 {post.claps}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        className="text-muted-foreground hover:text-accent gap-1"
                      >
                        ❤️ {post.likes}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
