"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication - redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="border-2 border-border p-8">
            <h1 className="font-sans text-3xl font-bold mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h1>
            <p className="text-muted-foreground mb-8">
              {isLogin ? "Sign in to access your dashboard" : "Join Lab68 Events community"}
            </p>

            <form onSubmit={handleAuth} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wide mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block font-mono text-xs uppercase tracking-wide mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wide mb-2">Password</label>
                <input
                  type="password"
                  required
                  className="w-full border border-border bg-background px-4 py-3 focus:border-primary outline-none transition-colors"
                />
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="border border-border" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full border-2 border-primary bg-primary text-background py-3 font-mono text-sm uppercase tracking-wide hover:bg-transparent hover:text-primary transition-all"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            <div className="my-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground font-mono">Or continue with</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full border border-border py-3 font-mono text-sm uppercase tracking-wide hover:border-primary hover:text-primary transition-all">
                GitHub
              </button>
              <button className="w-full border border-border py-3 font-mono text-sm uppercase tracking-wide hover:border-primary hover:text-primary transition-all">
                Google
              </button>
            </div>

            <div className="mt-8 text-center text-sm">
              <span className="text-muted-foreground">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Back to homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
