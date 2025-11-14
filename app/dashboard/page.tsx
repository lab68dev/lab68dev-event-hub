"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

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
                className="block px-4 py-3 border border-primary bg-primary text-background font-mono text-xs uppercase tracking-wide"
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
            <h1 className="font-sans text-4xl font-bold mb-2">Welcome, Developer</h1>
            <p className="text-muted-foreground">Here's what's happening at Lab68 Events</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-2">[ REGISTERED SESSIONS ]</div>
              <div className="font-sans text-4xl font-bold">5</div>
            </div>
            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-2">[ NETWORKING CONNECTIONS ]</div>
              <div className="font-sans text-4xl font-bold">23</div>
            </div>
            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-2">[ DAYS UNTIL EVENT ]</div>
              <div className="font-sans text-4xl font-bold">12</div>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="mb-8">
            <h2 className="font-sans text-2xl font-bold mb-6">Your Upcoming Sessions</h2>
            <div className="space-y-4">
              {[
                { time: "10:00", title: "Keynote: The Future of Web Development", speaker: "Sarah Chen" },
                { time: "11:00", title: "Building Scalable APIs with Next.js", speaker: "Marcus Rodriguez" },
                { time: "14:00", title: "Workshop: Real-time Collaboration Apps", speaker: "David Park" },
              ].map((session, index) => (
                <div key={index} className="border border-border p-6 hover:border-primary transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="font-mono text-xs text-primary mb-2">{session.time}</div>
                      <h3 className="font-sans text-lg font-bold mb-1">{session.title}</h3>
                      <p className="text-sm text-muted-foreground">{session.speaker}</p>
                    </div>
                    <button className="border border-border px-4 py-2 font-mono text-xs uppercase hover:border-primary hover:text-primary transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="font-sans text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/dashboard/schedule"
                className="border border-border p-6 hover:border-primary transition-colors group"
              >
                <div className="font-mono text-xs text-primary mb-2 group-hover:text-primary">[ 01 ]</div>
                <h3 className="font-sans text-lg font-bold">Add Sessions</h3>
              </Link>
              <Link
                href="/dashboard/speakers"
                className="border border-border p-6 hover:border-primary transition-colors group"
              >
                <div className="font-mono text-xs text-primary mb-2">[ 02 ]</div>
                <h3 className="font-sans text-lg font-bold">View Speakers</h3>
              </Link>
              <Link
                href="/dashboard/tickets"
                className="border border-border p-6 hover:border-primary transition-colors group"
              >
                <div className="font-mono text-xs text-primary mb-2">[ 03 ]</div>
                <h3 className="font-sans text-lg font-bold">Download Ticket</h3>
              </Link>
              <Link
                href="/dashboard/settings"
                className="border border-border p-6 hover:border-primary transition-colors group"
              >
                <div className="font-mono text-xs text-primary mb-2">[ 04 ]</div>
                <h3 className="font-sans text-lg font-bold">Update Profile</h3>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
