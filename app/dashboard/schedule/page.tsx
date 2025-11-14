"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function SchedulePage() {
  const router = useRouter()
  const [selectedDay, setSelectedDay] = useState("day1")

  const handleLogout = () => {
    router.push("/")
  }

  const scheduleData = {
    day1: [
      { 
        time: "09:00", 
        title: "Registration & Coffee", 
        speaker: "Networking", 
        track: "General",
        registered: false,
        description: "Check in, grab your badge, and enjoy coffee while meeting fellow attendees."
      },
      {
        time: "10:00",
        title: "Keynote: The Future of Web Development",
        speaker: "Sarah Chen",
        track: "Main Stage",
        registered: true,
        description: "Explore the cutting-edge trends shaping the future of web development."
      },
      {
        time: "11:00",
        title: "Building Scalable APIs with Next.js",
        speaker: "Marcus Rodriguez",
        track: "Track A",
        registered: true,
        description: "Learn how to build production-ready APIs using Next.js App Router."
      },
      { 
        time: "11:00", 
        title: "AI-Powered Developer Tools", 
        speaker: "Emma Watson", 
        track: "Track B",
        registered: false,
        description: "Discover how AI is revolutionizing the developer workflow."
      },
      { 
        time: "12:30", 
        title: "Lunch & Networking", 
        speaker: "All Attendees", 
        track: "General",
        registered: false,
        description: "Enjoy lunch and connect with speakers and fellow developers."
      },
      {
        time: "14:00",
        title: "Workshop: Real-time Collaboration Apps",
        speaker: "David Park",
        track: "Workshop",
        registered: true,
        description: "Hands-on workshop building real-time features with WebSockets."
      },
      { 
        time: "15:30", 
        title: "Panel: Open Source in 2025", 
        speaker: "Multiple Speakers", 
        track: "Main Stage",
        registered: false,
        description: "Expert panel discussion on the state of open source software."
      },
      { 
        time: "17:00", 
        title: "Closing & After Party", 
        speaker: "Everyone", 
        track: "General",
        registered: false,
        description: "Wrap up the day and celebrate with drinks and music."
      },
    ],
    day2: [
      { 
        time: "09:00", 
        title: "Morning Coffee & Networking", 
        speaker: "All Attendees", 
        track: "General",
        registered: false,
        description: "Start your day with coffee and conversations."
      },
      {
        time: "10:00",
        title: "The State of Modern DevOps",
        speaker: "James Kim",
        track: "Main Stage",
        registered: false,
        description: "Deep dive into modern DevOps practices and tools."
      },
      {
        time: "11:00",
        title: "Serverless Architecture Patterns",
        speaker: "Lisa Anderson",
        track: "Track A",
        registered: false,
        description: "Learn architectural patterns for serverless applications."
      },
      { 
        time: "11:00", 
        title: "Frontend Performance Optimization", 
        speaker: "Sarah Chen", 
        track: "Track B",
        registered: false,
        description: "Master techniques for blazing-fast web applications."
      },
      { 
        time: "12:30", 
        title: "Lunch Break", 
        speaker: "All Attendees", 
        track: "General",
        registered: false,
        description: "Lunch and networking opportunities."
      },
      {
        time: "14:00",
        title: "Workshop: Testing Strategies",
        speaker: "Marcus Rodriguez",
        track: "Workshop",
        registered: false,
        description: "Comprehensive guide to testing modern web applications."
      },
      { 
        time: "15:30", 
        title: "Closing Keynote: Building the Future", 
        speaker: "Emma Watson", 
        track: "Main Stage",
        registered: false,
        description: "Inspiring talk about the future of technology and innovation."
      },
      { 
        time: "17:00", 
        title: "Final Networking & Goodbye", 
        speaker: "Everyone", 
        track: "General",
        registered: false,
        description: "Last chance to connect before we wrap up the event."
      },
    ]
  }

  const [sessions, setSessions] = useState(scheduleData)

  const toggleRegistration = (day: string, index: number) => {
    setSessions(prev => ({
      ...prev,
      [day]: prev[day as keyof typeof prev].map((session, i) => 
        i === index ? { ...session, registered: !session.registered } : session
      )
    }))
  }

  const currentSchedule = sessions[selectedDay as keyof typeof sessions]

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
            <h1 className="font-sans text-4xl font-bold mb-2">Event Schedule</h1>
            <p className="text-muted-foreground">Browse sessions and build your personalized schedule</p>
          </div>

          {/* Day Selector */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setSelectedDay("day1")}
              className={`px-6 py-3 border-2 font-mono text-sm uppercase tracking-wide transition-all ${
                selectedDay === "day1"
                  ? "border-primary bg-primary text-background"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
            >
              Day 1
            </button>
            <button
              onClick={() => setSelectedDay("day2")}
              className={`px-6 py-3 border-2 font-mono text-sm uppercase tracking-wide transition-all ${
                selectedDay === "day2"
                  ? "border-primary bg-primary text-background"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
            >
              Day 2
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-2">[ TOTAL SESSIONS ]</div>
              <div className="font-sans text-4xl font-bold">{currentSchedule.length}</div>
            </div>
            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-2">[ YOUR SCHEDULE ]</div>
              <div className="font-sans text-4xl font-bold">
                {currentSchedule.filter(s => s.registered).length}
              </div>
            </div>
            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-2">[ AVAILABLE SPOTS ]</div>
              <div className="font-sans text-4xl font-bold">
                {currentSchedule.filter(s => !s.registered).length}
              </div>
            </div>
          </div>

          {/* Schedule List */}
          <div className="space-y-4">
            {currentSchedule.map((session, index) => (
              <div 
                key={index} 
                className={`border-2 transition-all ${
                  session.registered 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary"
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    <div className="font-mono text-primary text-lg min-w-[80px]">{session.time}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-sans text-xl font-bold">{session.title}</h3>
                        <div className="border border-muted px-3 py-1 font-mono text-xs uppercase text-muted-foreground whitespace-nowrap">
                          {session.track}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">{session.speaker}</p>
                      <p className="text-sm mb-4">{session.description}</p>
                      <button
                        onClick={() => toggleRegistration(selectedDay, index)}
                        className={`px-6 py-2 border-2 font-mono text-xs uppercase tracking-wide transition-all ${
                          session.registered
                            ? "border-destructive text-destructive hover:bg-destructive hover:text-background"
                            : "border-primary text-primary hover:bg-primary hover:text-background"
                        }`}
                      >
                        {session.registered ? "Remove from Schedule" : "Add to Schedule"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Export Schedule */}
          <div className="mt-8 border border-border p-6">
            <h3 className="font-sans text-xl font-bold mb-4">Export Your Schedule</h3>
            <p className="text-muted-foreground mb-4">Download your personalized schedule to keep track of your sessions</p>
            <div className="flex gap-4">
              <button className="border-2 border-primary px-6 py-3 font-mono text-xs uppercase tracking-wide hover:bg-primary hover:text-background transition-all">
                Download PDF
              </button>
              <button className="border-2 border-border px-6 py-3 font-mono text-xs uppercase tracking-wide hover:border-primary hover:text-primary transition-all">
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
