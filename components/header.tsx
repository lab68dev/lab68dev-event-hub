"use client"

import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/lab68dev-logo.png" alt="Lab68dev Logo" width={120} height={40} className="h-10 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#schedule"
              className="font-mono text-sm uppercase tracking-wide hover:text-primary transition-colors"
            >
              Schedule
            </Link>
            <Link
              href="#speakers"
              className="font-mono text-sm uppercase tracking-wide hover:text-primary transition-colors"
            >
              Speakers
            </Link>
            <Link
              href="#tickets"
              className="font-mono text-sm uppercase tracking-wide hover:text-primary transition-colors"
            >
              Tickets
            </Link>
            <Link
              href="/login"
              className="border border-primary bg-primary text-background px-6 py-2 font-mono text-sm uppercase tracking-wide hover:bg-transparent hover:text-primary transition-all"
            >
              Login
            </Link>
          </nav>

          <button className="md:hidden border border-primary p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
