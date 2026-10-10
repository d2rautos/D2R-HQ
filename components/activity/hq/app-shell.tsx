'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Activity,
  BookOpen,
  LayoutDashboard,
  LogOut,
  Shield,
  Timer,
  Trophy,
  Bell,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { currentUser } from '@/lib/mock-data'
import { Logo } from './logo'
import { Avatar } from './primitives'
import { formatDuration, useClock } from './clock-provider'

const nav = [
  { href: '/dashboard', label: 'Dashboard', short: 'Home', icon: LayoutDashboard },
  { href: '/leaderboard', label: 'Leaderboard', short: 'Ranks', icon: Trophy },
  { href: '/clock', label: 'Clock In / Out', short: 'Clock', icon: Timer },
  { href: '/systems', label: 'Systems Library', short: 'Systems', icon: BookOpen },
  { href: '/activity', label: 'Activity Feed', short: 'Feed', icon: Activity },
  { href: '/admin', label: 'Admin Panel', short: 'Admin', icon: Shield },
]

function ClockChip() {
  const { status, workedMs } = useClock()
  const label = status === 'out' ? 'Off duty' : status === 'break' ? 'On break' : 'On shift'
  return (
    <Link
      href="/clock"
      className={cn(
        'inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors',
        status === 'in' && 'border-primary/60 bg-primary/10 text-primary',
        status === 'break' && 'border-warning/50 bg-warning/10 text-warning',
        status === 'out' && 'border-border text-muted-foreground hover:text-foreground',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'size-2 rounded-full',
          status === 'in' && 'bg-primary animate-pulse',
          status === 'break' && 'bg-warning',
          status === 'out' && 'bg-muted-foreground/50',
        )}
      />
      <span>{label}</span>
      {status !== 'out' && <span className="font-mono tabular-nums">{formatDuration(workedMs)}</span>}
    </Link>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-dvh bg-background bg-grid">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur lg:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-5">
          <Link href="/dashboard" aria-label="D2R HQ dashboard">
            <Logo />
          </Link>
        </div>
        <nav aria-label="Main" className="flex-1 space-y-1 p-3">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-sidebar-accent text-foreground'
                    : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground',
                )}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]"
                  />
                )}
                <Icon className={cn('size-4', active && 'text-primary')} aria-hidden="true" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-md p-2">
            <Avatar callsign={currentUser.callsign} highlight />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-xs font-bold tracking-wider">{currentUser.callsign}</p>
              <p className="text-xs text-muted-foreground">
                {currentUser.role} · LVL {currentUser.level}
              </p>
            </div>
            <Link
              href="/"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="size-4" aria-hidden="true" />
              <span className="sr-only">Sign out</span>
            </Link>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
          <Link href="/dashboard" className="lg:hidden" aria-label="D2R HQ dashboard">
            <Logo compact />
          </Link>
          <p className="hidden font-display text-xs uppercase tracking-[0.3em] text-muted-foreground lg:block">
            {'// Command Center'}
          </p>
          <div className="flex items-center gap-2">
            <ClockChip />
            <button
              type="button"
              className="relative rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Bell className="size-4" aria-hidden="true" />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="sr-only">Notifications</span>
            </button>
            <Link href="/" className="lg:hidden" aria-label="Sign out">
              <Avatar callsign={currentUser.callsign} size="sm" highlight />
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 pb-28 pt-6 md:px-6 lg:pb-12">{children}</main>
      </div>

      <nav
        aria-label="Mobile"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-sidebar/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        <ul className="grid grid-cols-6">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href)
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium uppercase tracking-wider transition-colors',
                    active ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-4 top-0 h-0.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]"
                    />
                  )}
                  <Icon className="size-5" aria-hidden="true" />
                  {item.short}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
