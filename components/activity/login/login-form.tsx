'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, Lock, User } from 'lucide-react'
import { NeonButton } from '@/components/hq/primitives'

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const id = String(data.get('identity') ?? '').trim()
    const pw = String(data.get('password') ?? '')
    if (!id || pw.length < 4) {
      setError('Enter your callsign or email and a password of at least 4 characters.')
      return
    }
    setError(null)
    setLoading(true)
    setTimeout(() => router.push('/dashboard'), 900)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="identity" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Callsign or email
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary" aria-hidden="true" />
          <input
            id="identity"
            name="identity"
            type="text"
            autoComplete="username"
            defaultValue="NEONWRAITH"
            className="h-12 w-full rounded-md border border-input bg-secondary/60 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="NEONWRAITH"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Access key
          </label>
          <a href="#" className="text-xs text-primary hover:underline">
            Forgot key?
          </a>
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary" aria-hidden="true" />
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            defaultValue="cyberpurple"
            className="h-12 w-full rounded-md border border-input bg-secondary/60 pl-10 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <input type="checkbox" name="remember" defaultChecked className="size-4 rounded accent-primary" />
        Keep me jacked in on this device
      </label>

      {error && (
        <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <NeonButton type="submit" disabled={loading} className="h-12 w-full font-display">
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Authenticating
          </>
        ) : (
          'Jack In'
        )}
      </NeonButton>

      <p className="text-center text-xs text-muted-foreground">
        Preview mode — any credentials will sign you in with mock data.
      </p>
    </form>
  )
}
