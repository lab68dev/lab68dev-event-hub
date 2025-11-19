"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

interface Session {
  id: string
  time: string
  title: string
  speaker: string
  track: string
  description: string
  day: string
}

const emptySession: Session = {
  id: "",
  time: "",
  title: "",
  speaker: "",
  track: "Main Stage",
  description: "",
  day: "day1",
}

export default function SchedulePage() {
  const router = useRouter()
  const [selectedDay, setSelectedDay] = useState("day1")
  const [sessions, setSessions] = useState<Session[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Session>(emptySession)

  const handleLogout = () => {
    router.push("/")
  }

  useEffect(() => {
    const stored = localStorage.getItem("lab68_sessions")
    if (stored) {
      setSessions(JSON.parse(stored))
    }
  }, [])

  const saveSessions = (newSessions: Session[]) => {
    setSessions(newSessions)
    localStorage.setItem("lab68_sessions", JSON.stringify(newSessions))
  }

  const handleAdd = () => {
    setIsAdding(true)
    setFormData({ ...emptySession, day: selectedDay, id: Date.now().toString() })
  }

  const handleEdit = (session: Session) => {
    setEditingId(session.id)
    setFormData(session)
  }

  const handleSave = () => {
    if (isAdding) {
      saveSessions([...sessions, formData])
      setIsAdding(false)
    } else if (editingId) {
      saveSessions(sessions.map(s => s.id === editingId ? formData : s))
      setEditingId(null)
    }
    setFormData(emptySession)
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData(emptySession)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this session?")) {
      saveSessions(sessions.filter(s => s.id !== id))
    }
  }

  const currentSessions = sessions.filter(s => s.day === selectedDay)

  const sampleSessions: Session[] = [
    {
      id: "1",
      time: "09:00",
      title: "Registration & Coffee",
      speaker: "Networking",
      track: "General",
      description: "Check in, grab your badge, and enjoy coffee while meeting fellow attendees.",
      day: "day1"
    },
    {
      id: "2",
      time: "10:00",
      title: "Keynote: The Future of Web Development",
      speaker: "Sarah Chen",
      track: "Main Stage",
      description: "Explore the cutting-edge trends shaping the future of web development.",
      day: "day1"
    },
    {
      id: "3",
      time: "11:00",
      title: "Building Scalable APIs with Next.js",
      speaker: "Marcus Rodriguez",
      track: "Track A",
      description: "Learn how to build production-ready APIs using Next.js App Router.",
      day: "day1"
    },
    {
      id: "4",
      time: "11:00",
      title: "AI-Powered Developer Tools",
      speaker: "Emma Watson",
      track: "Track B",
      description: "Discover how AI is revolutionizing the developer workflow.",
      day: "day1"
    },
    {
      id: "5",
      time: "12:30",
      title: "Lunch & Networking",
      speaker: "All Attendees",
      track: "General",
      description: "Enjoy lunch and connect with speakers and fellow developers.",
      day: "day1"
    },
    {
      id: "6",
      time: "14:00",
      title: "Workshop: Real-time Collaboration Apps",
      speaker: "David Park",
      track: "Workshop",
      description: "Hands-on workshop building real-time features with WebSockets.",
      day: "day1"
    }
  ]

  const currentSessions = sessions.filter(s => s.day === selectedDay)

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
                className="block px-4 py-3 border border-primary bg-primary text-background font-mono text-xs uppercase tracking-wide"
              >
                My Schedule
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/speakers"
                className="block px-4 py-3 border border-border hover:border-primary hover:text-primary font-mono text-xs uppercase tracking-wide transition-colors"
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
            <h1 className="font-sans text-4xl font-bold mb-2">Manage Schedule</h1>
            <p className="text-muted-foreground">Add and manage event sessions</p>
          </div>

          {/* Add Session Button */}
          <div className="mb-8">
            <button
              onClick={handleAdd}
              className="border-2 border-primary bg-primary text-background px-6 py-3 font-mono text-sm uppercase tracking-wide hover:bg-transparent hover:text-primary transition-all"
            >
              Add New Session
            </button>
          </div>

          {/* Form for Add/Edit */}
          {(isAdding || editingId) && (
            <div className="border-2 border-primary p-8 mb-8">
              <h3 className="font-sans text-2xl font-bold mb-6">
                {isAdding ? "Add Session" : "Edit Session"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wide mb-2">Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors"
                    placeholder="HH:MM"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wide mb-2">Track</label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors"
                  >
                    <option value="Main Stage">Main Stage</option>
                    <option value="Track A">Track A</option>
                    <option value="Track B">Track B</option>
                    <option value="Workshop">Workshop</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wide mb-2">Day</label>
                  <select
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors"
                  >
                    <option value="day1">Day 1</option>
                    <option value="day2">Day 2</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wide mb-2">Speaker</label>
                  <input
                    type="text"
                    value={formData.speaker}
                    onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-wide mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-wide mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors h-32 resize-none"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSave}
                  className="border-2 border-primary bg-primary text-background px-6 py-3 font-mono text-sm uppercase tracking-wide hover:bg-transparent hover:text-primary transition-all"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="border-2 border-border px-6 py-3 font-mono text-sm uppercase tracking-wide hover:border-primary hover:text-primary transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Day Selector */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setSelectedDay("day1")}
              className={`px-6 py-3 border-2 font-mono text-sm uppercase tracking-wide transition-all ${
                selectedDay === "day1"
                  ? "border-primary bg-primary text-background"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
            >
              Day 1 ({sessions.filter(s => s.day === "day1").length})
            </button>
            <button
              onClick={() => setSelectedDay("day2")}
              className={`px-6 py-3 border-2 font-mono text-sm uppercase tracking-wide transition-all ${
                selectedDay === "day2"
                  ? "border-primary bg-primary text-background"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
            >
              Day 2 ({sessions.filter(s => s.day === "day2").length})
            </button>
          </div>

          {/* Sessions List */}
          <div className="space-y-4">
            {currentSessions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No sessions scheduled for this day yet.</p>
              </div>
            ) : (
              currentSessions.map((session) => (
                <div key={session.id} className="border-2 border-border hover:border-primary transition-all">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-2">
                          <div className="font-mono text-primary text-2xl bg-secondary px-4 py-2 border border-border">
                            {session.time}
                          </div>
                          <div>
                            <h3 className="font-sans text-xl font-bold">{session.title}</h3>
                            <p className="text-muted-foreground text-sm">{session.speaker}</p>
                            <div className="flex gap-2 mt-1">
                              <div className="inline-block border border-primary px-3 py-1 font-mono text-xs uppercase text-primary">
                                {session.track}
                              </div>
                              <div className="inline-block border border-muted px-3 py-1 font-mono text-xs uppercase text-muted-foreground">
                                {session.day === "day1" ? "DAY 1" : "DAY 2"}
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{session.description}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleEdit(session)}
                          className="border border-primary px-4 py-2 font-mono text-xs uppercase text-primary hover:bg-primary hover:text-background transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(session.id)}
                          className="border border-destructive px-4 py-2 font-mono text-xs uppercase text-destructive hover:bg-destructive hover:text-background transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
