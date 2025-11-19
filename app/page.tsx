"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Speaker {
  id: string
  name: string
  role: string
  company: string
  category: string
  bio: string
  twitter: string
  linkedin: string
}

interface Session {
  id: string
  time: string
  title: string
  speaker: string
  track: string
  description: string
  day: string
}

function SpeakerList() {
  const [speakers, setSpeakers] = useState<Speaker[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("lab68_speakers")
    if (stored) {
      setSpeakers(JSON.parse(stored))
    }
  }, [])

  if (speakers.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground text-lg">No speakers announced yet. Stay tuned!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {speakers.map((speaker, index) => (
        <div key={speaker.id} className="border border-border hover:border-primary transition-colors p-8">
          <div className="bg-secondary aspect-square mb-6 flex items-center justify-center">
            <div className="font-mono text-6xl text-primary">{speaker.name.charAt(0)}</div>
          </div>
          <h3 className="font-sans text-xl font-bold mb-2">{speaker.name}</h3>
          <p className="text-muted-foreground text-sm mb-1">{speaker.role}</p>
          <p className="font-mono text-xs text-primary">{speaker.company}</p>
        </div>
      ))}
    </div>
  )
}

function ScheduleList() {
  const [sessions, setSessions] = useState<Session[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("lab68_sessions")
    if (stored) {
      setSessions(JSON.parse(stored))
    }
  }, [])

  if (sessions.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground text-lg">No sessions scheduled yet. Check back later!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div key={session.id} className="border border-border hover:border-primary transition-colors">
          <div className="p-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="font-mono text-primary text-lg min-w-20">{session.time}</div>
            <div className="flex-1">
              <h3 className="font-sans text-xl font-bold mb-1">{session.title}</h3>
              <p className="text-muted-foreground text-sm">{session.speaker}</p>
            </div>
            <div className="border border-muted px-4 py-2 font-mono text-xs uppercase text-muted-foreground">
              {session.track}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-5xl">
          <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Experience Innovation.
            <br />
            <span className="text-primary">Connect with Visionaries.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
            Join us at Lab68 Events for tech talks, workshops, and networking with the best minds in technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#tickets"
              className="border-2 border-primary bg-primary text-background px-8 py-4 font-mono text-sm uppercase tracking-wide hover:bg-transparent hover:text-primary transition-all text-center"
            >
              Register Now
            </Link>
            <Link
              href="#schedule"
              className="border-2 border-foreground text-foreground px-8 py-4 font-mono text-sm uppercase tracking-wide hover:bg-foreground hover:text-background transition-all text-center"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-sans text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Lab68 Events brings together developers, innovators, and thought leaders to learn, share, and grow. We
                create spaces where technology meets creativity, and ideas become reality.
              </p>
            </div>
            <div className="border border-border p-8 bg-secondary">
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-sm text-primary mb-2">[ 01 ]</div>
                  <h3 className="font-sans text-xl font-bold mb-2">Think</h3>
                  <p className="text-muted-foreground text-sm">Explore cutting-edge ideas and emerging technologies</p>
                </div>
                <div>
                  <div className="font-mono text-sm text-primary mb-2">[ 02 ]</div>
                  <h3 className="font-sans text-xl font-bold mb-2">Code</h3>
                  <p className="text-muted-foreground text-sm">Hands-on workshops and live coding sessions</p>
                </div>
                <div>
                  <div className="font-mono text-sm text-primary mb-2">[ 03 ]</div>
                  <h3 className="font-sans text-xl font-bold mb-2">Test</h3>
                  <p className="text-muted-foreground text-sm">Learn best practices and testing strategies</p>
                </div>
                <div>
                  <div className="font-mono text-sm text-primary mb-2">[ 04 ]</div>
                  <h3 className="font-sans text-xl font-bold mb-2">Ship</h3>
                  <p className="text-muted-foreground text-sm">Deploy real-world applications with confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="border-t border-border">
        <div className="container mx-auto px-4 py-24">
          <h2 className="font-sans text-4xl md:text-5xl font-bold mb-12">Schedule</h2>
          <ScheduleList />
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="border-t border-border">
        <div className="container mx-auto px-4 py-24">
          <h2 className="font-sans text-4xl md:text-5xl font-bold mb-12">Meet the Speakers</h2>
          <SpeakerList />
        </div>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="border-t border-border">
        <div className="container mx-auto px-4 py-24">
          <h2 className="font-sans text-4xl md:text-5xl font-bold mb-12">Get Your Tickets</h2>
          <div className="text-center">
            <p className="text-muted-foreground text-lg">Ticket sales coming soon. Follow us for updates!</p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-sans text-4xl md:text-5xl font-bold mb-6">Join the Community</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Stay connected with fellow developers and get updates on future events, workshops, and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com"
                className="border-2 border-foreground px-8 py-4 font-mono text-sm uppercase tracking-wide hover:bg-foreground hover:text-background transition-all"
              >
                Visit our GitHub
              </a>
              <a
                href="#"
                className="border-2 border-foreground px-8 py-4 font-mono text-sm uppercase tracking-wide hover:bg-foreground hover:text-background transition-all"
              >
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
