"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function SpeakersPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("all")

  const handleLogout = () => {
    router.push("/")
  }

  const speakers = [
    { 
      name: "Sarah Chen", 
      role: "CTO", 
      company: "TechForward Inc",
      category: "keynote",
      bio: "Sarah is a visionary leader with over 15 years of experience in web development and cloud architecture. She's passionate about mentoring the next generation of developers.",
      twitter: "@sarahchen",
      linkedin: "linkedin.com/in/sarahchen",
      sessions: ["Keynote: The Future of Web Development", "Frontend Performance Optimization"]
    },
    { 
      name: "Marcus Rodriguez", 
      role: "Lead Engineer", 
      company: "CloudScale",
      category: "speaker",
      bio: "Marcus specializes in building scalable backend systems and APIs. He's contributed to several open-source projects and loves sharing his knowledge through workshops.",
      twitter: "@marcusdev",
      linkedin: "linkedin.com/in/marcusrodriguez",
      sessions: ["Building Scalable APIs with Next.js", "Workshop: Testing Strategies"]
    },
    { 
      name: "Emma Watson", 
      role: "AI Researcher", 
      company: "DeepMind Labs",
      category: "keynote",
      bio: "Emma is at the forefront of AI research, focusing on how artificial intelligence can enhance developer productivity and create better software tools.",
      twitter: "@emmawatsonai",
      linkedin: "linkedin.com/in/emmawatson",
      sessions: ["AI-Powered Developer Tools", "Closing Keynote: Building the Future"]
    },
    { 
      name: "David Park", 
      role: "Full Stack Developer", 
      company: "Vercel",
      category: "workshop",
      bio: "David is known for his expertise in real-time web applications. He's built collaboration tools used by millions of developers worldwide.",
      twitter: "@davidpark",
      linkedin: "linkedin.com/in/davidpark",
      sessions: ["Workshop: Real-time Collaboration Apps"]
    },
    { 
      name: "Lisa Anderson", 
      role: "DevRel Lead", 
      company: "GitHub",
      category: "speaker",
      bio: "Lisa is a developer advocate who believes in the power of community. She's been involved in open source for over a decade and loves helping teams collaborate better.",
      twitter: "@lisaanderson",
      linkedin: "linkedin.com/in/lisaanderson",
      sessions: ["Panel: Open Source in 2025", "Serverless Architecture Patterns"]
    },
    { 
      name: "James Kim", 
      role: "Product Manager", 
      company: "Microsoft",
      category: "speaker",
      bio: "James bridges the gap between development and product, bringing insights from managing large-scale developer tools at Microsoft.",
      twitter: "@jameskim",
      linkedin: "linkedin.com/in/jameskim",
      sessions: ["The State of Modern DevOps", "Panel: Open Source in 2025"]
    },
  ]

  const filteredSpeakers = selectedCategory === "all" 
    ? speakers 
    : speakers.filter(s => s.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/">
            <Image src="/lab68dev-logo.png" alt="Lab68dev Logo" width={120} height={40} className="h-10 w-auto" />
          </Link>
        </div>

        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="block px-4 py-3 border border-border hover:border-primary hover:text-primary font-mono text-xs uppercase tracking-wide transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/schedule"
                className="block px-4 py-3 border border-border hover:border-primary hover:text-primary font-mono text-xs uppercase tracking-wide transition-colors"
              >
                My Schedule
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/speakers"
                className="block px-4 py-3 border border-primary bg-primary text-background font-mono text-xs uppercase tracking-wide"
              >
                Speakers
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/tickets"
                className="block px-4 py-3 border border-border hover:border-primary hover:text-primary font-mono text-xs uppercase tracking-wide transition-colors"
              >
                Tickets
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className="block px-4 py-3 border border-border hover:border-primary hover:text-primary font-mono text-xs uppercase tracking-wide transition-colors"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-6 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 border border-border hover:border-destructive hover:text-destructive font-mono text-xs uppercase tracking-wide transition-colors"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <h1 className="font-sans text-4xl font-bold mb-2">Event Speakers</h1>
            <p className="text-muted-foreground">Meet the experts sharing their knowledge at Lab68 Events</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 border-2 font-mono text-xs uppercase tracking-wide transition-all ${
                selectedCategory === "all"
                  ? "border-primary bg-primary text-background"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
            >
              All Speakers
            </button>
            <button
              onClick={() => setSelectedCategory("keynote")}
              className={`px-6 py-3 border-2 font-mono text-xs uppercase tracking-wide transition-all ${
                selectedCategory === "keynote"
                  ? "border-primary bg-primary text-background"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
            >
              Keynote
            </button>
            <button
              onClick={() => setSelectedCategory("speaker")}
              className={`px-6 py-3 border-2 font-mono text-xs uppercase tracking-wide transition-all ${
                selectedCategory === "speaker"
                  ? "border-primary bg-primary text-background"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
            >
              Speakers
            </button>
            <button
              onClick={() => setSelectedCategory("workshop")}
              className={`px-6 py-3 border-2 font-mono text-xs uppercase tracking-wide transition-all ${
                selectedCategory === "workshop"
                  ? "border-primary bg-primary text-background"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
            >
              Workshop Leaders
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-2">[ TOTAL SPEAKERS ]</div>
              <div className="font-sans text-4xl font-bold">{speakers.length}</div>
            </div>
            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-2">[ KEYNOTE ]</div>
              <div className="font-sans text-4xl font-bold">
                {speakers.filter(s => s.category === "keynote").length}
              </div>
            </div>
            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-2">[ SPEAKERS ]</div>
              <div className="font-sans text-4xl font-bold">
                {speakers.filter(s => s.category === "speaker").length}
              </div>
            </div>
            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-2">[ WORKSHOPS ]</div>
              <div className="font-sans text-4xl font-bold">
                {speakers.filter(s => s.category === "workshop").length}
              </div>
            </div>
          </div>

          {/* Speakers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpeakers.map((speaker, index) => (
              <div key={index} className="border-2 border-border hover:border-primary transition-all group">
                <div className="p-6">
                  {/* Avatar */}
                  <div className="bg-secondary aspect-square mb-6 flex items-center justify-center border border-border group-hover:border-primary transition-colors">
                    <div className="font-mono text-6xl text-primary">{speaker.name.charAt(0)}</div>
                  </div>

                  {/* Info */}
                  <div className="mb-4">
                    <h3 className="font-sans text-xl font-bold mb-2">{speaker.name}</h3>
                    <p className="text-muted-foreground text-sm mb-1">{speaker.role}</p>
                    <p className="font-mono text-xs text-primary mb-3">{speaker.company}</p>
                    <div className="inline-block border border-primary px-3 py-1 font-mono text-xs uppercase text-primary">
                      {speaker.category}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {speaker.bio}
                  </p>

                  {/* Sessions */}
                  <div className="mb-4">
                    <div className="font-mono text-xs text-primary mb-2">[ SESSIONS ]</div>
                    <ul className="space-y-1">
                      {speaker.sessions.map((session, sessionIndex) => (
                        <li key={sessionIndex} className="text-xs flex items-start gap-2">
                          <span className="text-primary mt-1">▸</span>
                          <span>{session}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <a 
                      href={`https://twitter.com/${speaker.twitter.slice(1)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-border px-3 py-2 font-mono text-xs text-center hover:border-primary hover:text-primary transition-colors"
                    >
                      Twitter
                    </a>
                    <a 
                      href={`https://${speaker.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-border px-3 py-2 font-mono text-xs text-center hover:border-primary hover:text-primary transition-colors"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8 border border-border p-8 text-center">
            <h3 className="font-sans text-2xl font-bold mb-4">Want to Connect?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              VIP ticket holders get exclusive meet & greet opportunities with our speakers. Upgrade your ticket to get face-to-face time with the experts.
            </p>
            <Link
              href="/dashboard/tickets"
              className="inline-block border-2 border-primary bg-primary text-background px-8 py-3 font-mono text-sm uppercase tracking-wide hover:bg-transparent hover:text-primary transition-all"
            >
              View Tickets
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
