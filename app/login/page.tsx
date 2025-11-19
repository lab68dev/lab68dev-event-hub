"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-sans text-4xl font-bold mb-4">Welcome to Lab68 Events</h1>
            <p className="text-muted-foreground text-lg">
              Choose your account type to get started
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Admin Card */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">Admin Portal</CardTitle>
                <CardDescription>
                  Manage the entire platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Full platform access</li>
                  <li>✓ Manage all events</li>
                  <li>✓ User management</li>
                  <li>✓ Analytics & reporting</li>
                </ul>
                <div className="flex flex-col gap-2 pt-4">
                  <Button
                    onClick={() => router.push("/login/admin")}
                    className="w-full"
                    variant="default"
                  >
                    Admin Login
                  </Button>
                  <Button
                    onClick={() => router.push("/login/admin/signup")}
                    className="w-full"
                    variant="outline"
                  >
                    Sign Up
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Organization Card */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">Organization Portal</CardTitle>
                <CardDescription>
                  Create and manage events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Create events</li>
                  <li>✓ Manage speakers</li>
                  <li>✓ Track attendees</li>
                  <li>✓ Event analytics</li>
                </ul>
                <div className="flex flex-col gap-2 pt-4">
                  <Button
                    onClick={() => router.push("/login/organization")}
                    className="w-full"
                    variant="default"
                  >
                    Organization Login
                  </Button>
                  <Button
                    onClick={() => router.push("/login/organization/signup")}
                    className="w-full"
                    variant="outline"
                  >
                    Sign Up
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Participant Card */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-xl">Participant Portal</CardTitle>
                <CardDescription>
                  Join events and hackathons
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Register for events</li>
                  <li>✓ Join hackathons</li>
                  <li>✓ Team collaboration</li>
                  <li>✓ Track participation</li>
                </ul>
                <div className="flex flex-col gap-2 pt-4">
                  <Button
                    onClick={() => router.push("/login/participant")}
                    className="w-full"
                    variant="default"
                  >
                    Participant Login
                  </Button>
                  <Button
                    onClick={() => router.push("/login/participant/signup")}
                    className="w-full"
                    variant="outline"
                  >
                    Sign Up
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Want to browse events first?{" "}
              <Link href="/" className="text-primary hover:underline">
                View upcoming events
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
