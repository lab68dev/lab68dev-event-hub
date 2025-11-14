"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function TicketsPage() {
  const router = useRouter()
  const [selectedTicket, setSelectedTicket] = useState("vip")

  const handleLogout = () => {
    router.push("/")
  }

  const ticketData = {
    general: {
      name: "General Admission",
      price: "$299",
      purchaseDate: "October 15, 2025",
      features: ["Access to all talks", "Lunch included", "Networking sessions", "Conference swag"],
    },
    vip: {
      name: "VIP Pass",
      price: "$599",
      purchaseDate: "October 15, 2025",
      features: [
        "Everything in General",
        "VIP lounge access",
        "Meet & greet speakers",
        "Priority seating",
        "Exclusive workshops",
      ],
    },
    online: {
      name: "Online Access",
      price: "$99",
      purchaseDate: "October 15, 2025",
      features: ["Live stream access", "Recording access", "Digital resources", "Online chat"],
    },
  }

  const currentTicket = ticketData[selectedTicket as keyof typeof ticketData]

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
                className="block px-4 py-3 border border-primary bg-primary text-background font-mono text-xs uppercase tracking-wide"
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
            <h1 className="font-sans text-4xl font-bold mb-2">My Ticket</h1>
            <p className="text-muted-foreground">Manage your event ticket and access information</p>
          </div>

          {/* Current Ticket Display */}
          <div className="border-2 border-primary p-8 mb-8 bg-primary/5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Ticket Info */}
              <div className="lg:col-span-2">
                <div className="font-mono text-xs text-primary mb-2">[ YOUR TICKET ]</div>
                <h2 className="font-sans text-3xl font-bold mb-4">{currentTicket.name}</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground mb-1">Ticket ID</div>
                    <div className="font-mono text-sm">LAB68-2025-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground mb-1">Purchase Date</div>
                    <div className="font-mono text-sm">{currentTicket.purchaseDate}</div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground mb-1">Event Date</div>
                    <div className="font-mono text-sm">November 28-29, 2025</div>
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground mb-1">Amount Paid</div>
                    <div className="font-mono text-sm">{currentTicket.price}</div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="font-mono text-xs text-primary mb-3">[ INCLUDED FEATURES ]</div>
                  <ul className="space-y-2">
                    {currentTicket.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">▸</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4">
                  <button className="border-2 border-primary bg-primary text-background px-6 py-3 font-mono text-xs uppercase tracking-wide hover:bg-transparent hover:text-primary transition-all">
                    Download PDF
                  </button>
                  <button className="border-2 border-border px-6 py-3 font-mono text-xs uppercase tracking-wide hover:border-primary hover:text-primary transition-all">
                    Add to Wallet
                  </button>
                  <button className="border-2 border-border px-6 py-3 font-mono text-xs uppercase tracking-wide hover:border-primary hover:text-primary transition-all">
                    Share
                  </button>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white p-6 border-2 border-foreground mb-4">
                  <div className="w-48 h-48 bg-secondary flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-mono text-6xl mb-2">⚡</div>
                      <div className="font-mono text-xs text-muted-foreground">QR CODE</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Scan this code at the event entrance
                </p>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-3">[ EVENT LOCATION ]</div>
              <h3 className="font-sans text-xl font-bold mb-2">Lab68 Tech Center</h3>
              <p className="text-sm text-muted-foreground mb-4">
                123 Innovation Drive<br />
                San Francisco, CA 94103<br />
                United States
              </p>
              <button className="border-2 border-border px-4 py-2 font-mono text-xs uppercase tracking-wide hover:border-primary hover:text-primary transition-all">
                Get Directions
              </button>
            </div>

            <div className="border border-border p-6">
              <div className="font-mono text-xs text-primary mb-3">[ CHECK-IN INFO ]</div>
              <h3 className="font-sans text-xl font-bold mb-2">Registration Opens</h3>
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Day 1:</strong> November 28, 8:00 AM<br />
                <strong>Day 2:</strong> November 29, 8:00 AM<br />
                <br />
                Please arrive 30 minutes early for check-in
              </p>
              <button className="border-2 border-border px-4 py-2 font-mono text-xs uppercase tracking-wide hover:border-primary hover:text-primary transition-all">
                View Schedule
              </button>
            </div>
          </div>

          {/* Upgrade Options */}
          <div className="mb-8">
            <h2 className="font-sans text-2xl font-bold mb-6">Compare Ticket Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(ticketData).map(([key, ticket]) => (
                <div
                  key={key}
                  className={`border-2 p-6 transition-all ${
                    selectedTicket === key
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <h3 className="font-sans text-xl font-bold mb-3">{ticket.name}</h3>
                  <div className="mb-4">
                    <span className="font-mono text-3xl font-bold text-primary">{ticket.price}</span>
                    <span className="text-muted-foreground ml-2">/ person</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {ticket.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">▸</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {selectedTicket === key ? (
                    <div className="border-2 border-primary px-4 py-3 font-mono text-xs uppercase tracking-wide text-primary text-center">
                      Current Ticket
                    </div>
                  ) : (
                    <button className="w-full border-2 border-border px-4 py-3 font-mono text-xs uppercase tracking-wide hover:border-primary hover:text-primary transition-all">
                      View Details
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Important Information */}
          <div className="border border-border p-6">
            <h3 className="font-sans text-xl font-bold mb-4">Important Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-mono text-xs text-primary mb-2">[ REFUND POLICY ]</h4>
                <p className="text-muted-foreground">
                  Full refunds available until November 1, 2025. After this date, tickets are non-refundable but transferable.
                </p>
              </div>
              <div>
                <h4 className="font-mono text-xs text-primary mb-2">[ TRANSFER TICKET ]</h4>
                <p className="text-muted-foreground">
                  Need to transfer your ticket? Contact our support team at tickets@lab68events.com with your ticket ID.
                </p>
              </div>
              <div>
                <h4 className="font-mono text-xs text-primary mb-2">[ ACCESSIBILITY ]</h4>
                <p className="text-muted-foreground">
                  The venue is fully accessible. Please contact us if you have specific accessibility requirements.
                </p>
              </div>
              <div>
                <h4 className="font-mono text-xs text-primary mb-2">[ HEALTH & SAFETY ]</h4>
                <p className="text-muted-foreground">
                  We follow all local health guidelines. Please check our website for the latest COVID-19 policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
