"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ContentStats {
  speakers: number
  sessions: number
  tickets: number
  attendees: number
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<ContentStats>({ speakers: 0, sessions: 0, tickets: 0, attendees: 0 })

  useEffect(() => {
    // Check if user is admin
    const role = localStorage.getItem("user_role")
    if (role !== "admin") {
      router.push("/dashboard")
      return
    }

    // Load stats
    const speakers = JSON.parse(localStorage.getItem("lab68_speakers") || "[]")
    const sessions = JSON.parse(localStorage.getItem("lab68_sessions") || "[]")
    const tickets = JSON.parse(localStorage.getItem("lab68_tickets") || "[]")

    setStats({
      speakers: speakers.length,
      sessions: sessions.length,
      tickets: tickets.length,
      attendees: 0 // Would be from actual attendees in real app
    })
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user_role")
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
                href="/dashboard/admin"
                className="block px-4 py-3 border border-primary bg-primary text-background font-mono text-xs uppercase tracking-wide"
              >
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/speakers"
                className="block px-4 py-3 border border-border hover:border-primary hover:text-primary font-mono text-xs uppercase tracking-wide transition-colors"
              >
                Manage Speakers
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/schedule"
                className="block px-4 py-3 border border-border hover:border-primary hover:text-primary font-mono text-xs uppercase tracking-wide transition-colors"
              >
                Manage Schedule
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/tickets"
                className="block px-4 py-3 border border-border hover:border-primary hover:text-primary font-mono text-xs uppercase tracking-wide transition-colors"
              >
                Manage Tickets
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/organizations"
                className="block px-4 py-3 border border-border hover:border-primary hover:text-primary font-mono text-xs uppercase tracking-wide transition-colors"
              >
                Organizations
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
            <h1 className="font-sans text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage all event content</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-2">[ SPEAKERS ]</div>
              <div className="font-sans text-4xl font-bold">{stats.speakers}</div>
            </div>
            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-2">[ SESSIONS ]</div>
              <div className="font-sans text-4xl font-bold">{stats.sessions}</div>
            </div>
            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-2">[ TICKET TYPES ]</div>
              <div className="font-sans text-4xl font-bold">{stats.tickets}</div>
            </div>
            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-2">[ REGISTERED ATTENDEES ]</div>
              <div className="font-sans text-4xl font-bold">{stats.attendees}</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/dashboard/admin/speakers"
              className="border border-border p-6 hover:border-primary transition-colors group"
            >
              <div className="font-mono text-xs text-primary mb-2 group-hover:text-primary">[ 01 ]</div>
              <h3 className="font-sans text-lg font-bold">Manage Speakers</h3>
              <p className="text-sm text-muted-foreground mt-2">Add, edit, and organize event speakers</p>
            </Link>
            <Link
              href="/dashboard/admin/schedule"
              className="border border-border p-6 hover:border-primary transition-colors group"
            >
              <div className="font-mono text-xs text-primary mb-2 group-hover:text-primary">[ 02 ]</div>
              <h3 className="font-sans text-lg font-bold">Manage Schedule</h3>
              <p className="text-sm text-muted-foreground mt-2">Create and modify event sessions</p>
            </Link>
            <Link
              href="/dashboard/admin/tickets"
              className="border border-border p-6 hover:border-primary transition-colors group"
            >
              <div className="font-mono text-xs text-primary mb-2 group-hover:text-primary">[ 03 ]</div>
              <h3 className="font-sans text-lg font-bold">Manage Tickets</h3>
              <p className="text-sm text-muted-foreground mt-2">Configure ticket types and pricing</p>
            </Link>
            <Link
              href="/dashboard/admin/organizations"
              className="border border-border p-6 hover:border-primary transition-colors group"
            >
              <div className="font-mono text-xs text-primary mb-2 group-hover:text-primary">[ 04 ]</div>
              <h3 className="font-sans text-lg font-bold">Organizations</h3>
              <p className="text-sm text-muted-foreground mt-2">Manage organization accounts</p>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="font-sans text-2xl font-bold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-border">
                <div className="font-mono text-primary text-sm">14:30</div>
                <div>
                  <p className="font-mono text-xs text-primary">SPEAKER ADDED</p>
                  <p className="text-sm">New speaker "Sarah Chen" was added to the keynote category</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-border">
                <div className="font-mono text-primary text-sm">12:15</div>
                <div>
                  <p className="font-mono text-xs text-primary">SESSION UPDATED</p>
                  <p className="text-sm">Workshop session time changed from 14:00 to 15:00</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-border">
                <div className="font-mono text-primary text-sm">09:45</div>
                <div>
                  <p className="font-mono text-xs text-primary">ORGANIZATION APPROVED</p>
                  <p className="text-sm">TechForward Inc organization account was approved</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
