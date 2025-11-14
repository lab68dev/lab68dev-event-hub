"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")

  const handleLogout = () => {
    router.push("/")
  }

  // Form states
  const [profileData, setProfileData] = useState({
    firstName: "Developer",
    lastName: "User",
    email: "developer@lab68events.com",
    phone: "+1 (555) 123-4567",
    company: "Lab68 Dev",
    jobTitle: "Software Engineer",
    bio: "Passionate developer interested in web technologies and AI.",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    scheduleUpdates: true,
    speakerAnnouncements: false,
    eventReminders: true,
    marketingEmails: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    showEmail: false,
    showCompany: true,
    allowNetworking: true,
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }))
  }

  const handlePrivacyToggle = (setting: string) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }))
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
                className="block px-4 py-3 border border-primary bg-primary text-background font-mono text-xs uppercase tracking-wide"
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
            <h1 className="font-sans text-4xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and settings</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-3 font-mono text-xs uppercase tracking-wide transition-all whitespace-nowrap ${
                activeTab === "profile"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`px-6 py-3 font-mono text-xs uppercase tracking-wide transition-all whitespace-nowrap ${
                activeTab === "notifications"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("privacy")}
              className={`px-6 py-3 font-mono text-xs uppercase tracking-wide transition-all whitespace-nowrap ${
                activeTab === "privacy"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Privacy
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`px-6 py-3 font-mono text-xs uppercase tracking-wide transition-all whitespace-nowrap ${
                activeTab === "security"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Security
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="border border-border p-6">
                <h2 className="font-sans text-2xl font-bold mb-6">Profile Information</h2>
                
                {/* Avatar */}
                <div className="mb-6">
                  <div className="font-mono text-xs text-primary mb-3">[ PROFILE PICTURE ]</div>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-secondary border-2 border-border flex items-center justify-center">
                      <span className="font-mono text-4xl text-primary">D</span>
                    </div>
                    <div className="flex gap-4">
                      <button className="border-2 border-primary px-6 py-2 font-mono text-xs uppercase tracking-wide hover:bg-primary hover:text-background transition-all">
                        Upload New
                      </button>
                      <button className="border-2 border-border px-6 py-2 font-mono text-xs uppercase tracking-wide hover:border-destructive hover:text-destructive transition-all">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-xs text-primary mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleProfileChange("firstName", e.target.value)}
                      className="w-full border-2 border-border px-4 py-3 bg-background focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-primary mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleProfileChange("lastName", e.target.value)}
                      className="w-full border-2 border-border px-4 py-3 bg-background focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-primary mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                      className="w-full border-2 border-border px-4 py-3 bg-background focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-primary mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                      className="w-full border-2 border-border px-4 py-3 bg-background focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-primary mb-2">Company</label>
                    <input
                      type="text"
                      value={profileData.company}
                      onChange={(e) => handleProfileChange("company", e.target.value)}
                      className="w-full border-2 border-border px-4 py-3 bg-background focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-primary mb-2">Job Title</label>
                    <input
                      type="text"
                      value={profileData.jobTitle}
                      onChange={(e) => handleProfileChange("jobTitle", e.target.value)}
                      className="w-full border-2 border-border px-4 py-3 bg-background focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-mono text-xs text-primary mb-2">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => handleProfileChange("bio", e.target.value)}
                      rows={4}
                      className="w-full border-2 border-border px-4 py-3 bg-background focus:border-primary outline-none transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <button className="border-2 border-primary bg-primary text-background px-8 py-3 font-mono text-xs uppercase tracking-wide hover:bg-transparent hover:text-primary transition-all">
                    Save Changes
                  </button>
                  <button className="border-2 border-border px-8 py-3 font-mono text-xs uppercase tracking-wide hover:border-primary hover:text-primary transition-all">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="border border-border p-6">
                <h2 className="font-sans text-2xl font-bold mb-6">Notification Preferences</h2>
                <p className="text-muted-foreground mb-6">
                  Choose how you want to receive updates about the event
                </p>

                <div className="space-y-4">
                  {[
                    { key: "emailNotifications", label: "Email Notifications", desc: "Receive important updates via email" },
                    { key: "scheduleUpdates", label: "Schedule Updates", desc: "Get notified when sessions are added or changed" },
                    { key: "speakerAnnouncements", label: "Speaker Announcements", desc: "Receive updates about speaker additions" },
                    { key: "eventReminders", label: "Event Reminders", desc: "Get reminders before your registered sessions" },
                    { key: "marketingEmails", label: "Marketing Emails", desc: "Receive information about future events" },
                  ].map((notification) => (
                    <div
                      key={notification.key}
                      className="flex items-center justify-between border border-border p-4 hover:border-primary transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-sans font-bold mb-1">{notification.label}</h3>
                        <p className="text-sm text-muted-foreground">{notification.desc}</p>
                      </div>
                      <button
                        onClick={() => handleNotificationToggle(notification.key)}
                        className={`w-14 h-8 border-2 rounded-full transition-all relative ${
                          notificationSettings[notification.key as keyof typeof notificationSettings]
                            ? "border-primary bg-primary"
                            : "border-border"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 bg-background rounded-full absolute top-0.5 transition-all ${
                            notificationSettings[notification.key as keyof typeof notificationSettings]
                              ? "right-0.5"
                              : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <button className="border-2 border-primary bg-primary text-background px-8 py-3 font-mono text-xs uppercase tracking-wide hover:bg-transparent hover:text-primary transition-all">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <div className="border border-border p-6">
                <h2 className="font-sans text-2xl font-bold mb-6">Privacy Settings</h2>
                <p className="text-muted-foreground mb-6">
                  Control what information is visible to other attendees
                </p>

                <div className="space-y-4">
                  {[
                    { key: "profileVisible", label: "Public Profile", desc: "Allow other attendees to view your profile" },
                    { key: "showEmail", label: "Show Email", desc: "Display your email address on your profile" },
                    { key: "showCompany", label: "Show Company", desc: "Display your company information" },
                    { key: "allowNetworking", label: "Allow Networking", desc: "Let other attendees send you connection requests" },
                  ].map((privacy) => (
                    <div
                      key={privacy.key}
                      className="flex items-center justify-between border border-border p-4 hover:border-primary transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-sans font-bold mb-1">{privacy.label}</h3>
                        <p className="text-sm text-muted-foreground">{privacy.desc}</p>
                      </div>
                      <button
                        onClick={() => handlePrivacyToggle(privacy.key)}
                        className={`w-14 h-8 border-2 rounded-full transition-all relative ${
                          privacySettings[privacy.key as keyof typeof privacySettings]
                            ? "border-primary bg-primary"
                            : "border-border"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 bg-background rounded-full absolute top-0.5 transition-all ${
                            privacySettings[privacy.key as keyof typeof privacySettings]
                              ? "right-0.5"
                              : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <button className="border-2 border-primary bg-primary text-background px-8 py-3 font-mono text-xs uppercase tracking-wide hover:bg-transparent hover:text-primary transition-all">
                    Save Settings
                  </button>
                </div>
              </div>

              <div className="border border-destructive p-6">
                <h3 className="font-sans text-xl font-bold mb-4 text-destructive">Data Management</h3>
                <p className="text-muted-foreground mb-6">
                  Download or delete your personal data
                </p>
                <div className="flex gap-4">
                  <button className="border-2 border-border px-6 py-3 font-mono text-xs uppercase tracking-wide hover:border-primary hover:text-primary transition-all">
                    Download My Data
                  </button>
                  <button className="border-2 border-destructive text-destructive px-6 py-3 font-mono text-xs uppercase tracking-wide hover:bg-destructive hover:text-background transition-all">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="border border-border p-6">
                <h2 className="font-sans text-2xl font-bold mb-6">Security Settings</h2>
                
                <div className="mb-8">
                  <h3 className="font-mono text-xs text-primary mb-4">[ CHANGE PASSWORD ]</h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block font-mono text-xs text-muted-foreground mb-2">Current Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full border-2 border-border px-4 py-3 bg-background focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-muted-foreground mb-2">New Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full border-2 border-border px-4 py-3 bg-background focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-muted-foreground mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full border-2 border-border px-4 py-3 bg-background focus:border-primary outline-none transition-colors"
                      />
                    </div>
                    <button className="border-2 border-primary bg-primary text-background px-8 py-3 font-mono text-xs uppercase tracking-wide hover:bg-transparent hover:text-primary transition-all">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-mono text-xs text-primary mb-4">[ TWO-FACTOR AUTHENTICATION ]</h3>
                  <p className="text-muted-foreground mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <button className="border-2 border-border px-6 py-3 font-mono text-xs uppercase tracking-wide hover:border-primary hover:text-primary transition-all">
                    Enable 2FA
                  </button>
                </div>

                <div>
                  <h3 className="font-mono text-xs text-primary mb-4">[ ACTIVE SESSIONS ]</h3>
                  <div className="space-y-4">
                    <div className="border border-border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-sans font-bold mb-1">Windows • Chrome</h4>
                          <p className="text-sm text-muted-foreground">San Francisco, CA • Current session</p>
                        </div>
                        <div className="border border-primary px-3 py-1 font-mono text-xs uppercase text-primary">
                          Active
                        </div>
                      </div>
                    </div>
                    <div className="border border-border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-sans font-bold mb-1">iPhone • Safari</h4>
                          <p className="text-sm text-muted-foreground">San Francisco, CA • 2 hours ago</p>
                        </div>
                        <button className="border border-border px-3 py-1 font-mono text-xs uppercase hover:border-destructive hover:text-destructive transition-colors">
                          Revoke
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
