"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
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

const emptySpeaker: Speaker = {
  id: "",
  name: "",
  role: "",
  company: "",
  category: "speaker",
  bio: "",
  twitter: "",
  linkedin: "",
}

export default function AdminSpeakersPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Speaker>(emptySpeaker)

  useEffect(() => {
    // Check if user is admin
    const role = localStorage.getItem("user_role")
    if (role !== "admin") {
      router.push("/dashboard")
      return
    }

    const stored = localStorage.getItem("lab68_speakers")
    if (stored) {
      setSpeakers(JSON.parse(stored))
    }
  }, [])

  const saveSpeakers = (newSpeakers: Speaker[]) => {
    setSpeakers(newSpeakers)
    localStorage.setItem("lab68_speakers", JSON.stringify(newSpeakers))
  }

  const handleAdd = () => {
    setIsAdding(true)
    setFormData({ ...emptySpeaker, id: Date.now().toString() })
  }

  const handleEdit = (speaker: Speaker) => {
    setEditingId(speaker.id)
    setFormData(speaker)
  }

  const handleSave = () => {
    if (isAdding) {
      saveSpeakers([...speakers, formData])
      setIsAdding(false)
    } else if (editingId) {
      saveSpeakers(speakers.map(s => s.id === editingId ? formData : s))
      setEditingId(null)
    }
    setFormData(emptySpeaker)
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData(emptySpeaker)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this speaker?")) {
      saveSpeakers(speakers.filter(s => s.id !== id))
    }
  }

  const filteredSpeakers = selectedCategory === "all"
    ? speakers
    : speakers.filter(s => s.category === selectedCategory)

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
                className="block px-4 py-3 border border-border hover:border-primary hover:text-primary font-mono text-xs uppercase tracking-wide transition-colors"
              >
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/admin/speakers"
                className="block px-4 py-3 border border-primary bg-primary text-background font-mono text-xs uppercase tracking-wide"
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
            <h1 className="font-sans text-4xl font-bold mb-2">Manage Speakers</h1>
            <p className="text-muted-foreground">Add and manage event speakers</p>
          </div>

          {/* Add Speaker Button */}
          <div className="mb-8">
            <button
              onClick={handleAdd}
              className="border-2 border-primary bg-primary text-background px-6 py-3 font-mono text-sm uppercase tracking-wide hover:bg-transparent hover:text-primary transition-all"
            >
              Add New Speaker
            </button>
          </div>

          {/* Form for Add/Edit */}
          {(isAdding || editingId) && (
            <div className="border-2 border-primary p-8 mb-8">
              <h3 className="font-sans text-2xl font-bold mb-6">
                {isAdding ? "Add Speaker" : "Edit Speaker"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wide mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wide mb-2">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wide mb-2">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wide mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors"
                  >
                    <option value="speaker">Speaker</option>
                    <option value="keynote">Keynote</option>
                    <option value="workshop">Workshop Leader</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-wide mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors h-32 resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wide mb-2">Twitter</label>
                  <input
                    type="text"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors"
                    placeholder="@username"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wide mb-2">LinkedIn</label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors"
                    placeholder="linkedin.com/in/username"
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

          {/* Categories */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 border-2 font-mono text-xs uppercase tracking-wide transition-all ${
                selectedCategory === "all"
                  ? "border-primary bg-primary text-background"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
            >
              All ({speakers.length})
            </button>
            <button
              onClick={() => setSelectedCategory("keynote")}
              className={`px-6 py-3 border-2 font-mono text-xs uppercase tracking-wide transition-all ${
                selectedCategory === "keynote"
                  ? "border-primary bg-primary text-background"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
            >
              Keynote ({speakers.filter(s => s.category === "keynote").length})
            </button>
            <button
              onClick={() => setSelectedCategory("speaker")}
              className={`px-6 py-3 border-2 font-mono text-xs uppercase tracking-wide transition-all ${
                selectedCategory === "speaker"
                  ? "border-primary bg-primary text-background"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
            >
              Speaker ({speakers.filter(s => s.category === "speaker").length})
            </button>
            <button
              onClick={() => setSelectedCategory("workshop")}
              className={`px-6 py-3 border-2 font-mono text-xs uppercase tracking-wide transition-all ${
                selectedCategory === "workshop"
                  ? "border-primary bg-primary text-background"
                  : "border-border hover:border-primary hover:text-primary"
              }`}
            >
              Workshop ({speakers.filter(s => s.category === "workshop").length})
            </button>
          </div>

          {/* Speakers List */}
          <div className="space-y-4">
            {filteredSpeakers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No speakers in this category yet.</p>
              </div>
            ) : (
              filteredSpeakers.map((speaker) => (
                <div key={speaker.id} className="border border-border hover:border-primary transition-colors">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-2">
                          <div className="bg-secondary w-16 h-16 flex items-center justify-center border border-border">
                            <div className="font-mono text-2xl text-primary">{speaker.name.charAt(0)}</div>
                          </div>
                          <div>
                            <h3 className="font-sans text-xl font-bold">{speaker.name}</h3>
                            <p className="text-muted-foreground text-sm">{speaker.role} at {speaker.company}</p>
                            <div className="inline-block border border-primary px-3 py-1 font-mono text-xs uppercase text-primary mt-1">
                              {speaker.category}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{speaker.bio}</p>
                        {(speaker.twitter || speaker.linkedin) && (
                          <div className="flex gap-2">
                            {speaker.twitter && (
                              <a href={`https://twitter.com/${speaker.twitter.slice(1)}`} className="text-primary hover:underline text-sm">
                                {speaker.twitter}
                              </a>
                            )}
                            {speaker.linkedin && (
                              <a href={`https://${speaker.linkedin}`} className="text-primary hover:underline text-sm">
                                {speaker.linkedin}
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleEdit(speaker)}
                          className="border border-primary px-4 py-2 font-mono text-xs uppercase text-primary hover:bg-primary hover:text-background transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(speaker.id)}
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
