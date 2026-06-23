'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const { user, login, loading: authLoading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

  // Clear demo sessions on mount (ensures fresh login on app restart)
  useEffect(() => {
    if (isDemoMode) {
      fetch('/api/auth/clear-demo-session', { method: 'POST' })
        .catch(() => {}) // Ignore errors
    }
  }, [isDemoMode])

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      router.push('/dashboard')
    }
  }, [user, authLoading, router])

  // Pre-fill demo credentials in demo mode
  useEffect(() => {
    if (isDemoMode) {
      setEmail(process.env.NEXT_PUBLIC_DEMO_USER_EMAIL || 'demo@nozle.dev')
      setPassword(process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD || 'demo1234')
    }
  }, [isDemoMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      // Router push handled in auth context
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold">
            Nozle Template
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account
          </p>
        </div>

        {/* Demo Mode Banner */}
        {isDemoMode && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div className="flex-1 text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  Demo Mode Enabled
                </p>
                <p className="mt-1 text-blue-700 dark:text-blue-300">
                  Try the app without setting up a database. Changes won't be saved.
                </p>
                <p className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                  Credentials are pre-filled below. Just click "Sign in".
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              ← Back to home
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        {isDemoMode && (
          <div className="text-center text-xs text-muted-foreground">
            <p>
              Demo credentials: {process.env.NEXT_PUBLIC_DEMO_USER_EMAIL || 'demo@nozle.dev'} /{' '}
              {process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD || 'demo1234'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
