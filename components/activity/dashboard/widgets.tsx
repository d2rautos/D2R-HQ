import Link from 'next/link'
import { ArrowRight, BookOpen, Clock, Flame, Trophy, Zap } from 'lucide-react'
import { activities, currentUser, members, systems, weeklyHours } from '@/lib/mock-data'
import { ActivityItem } from '@/components/hq/activity-item'
import { Avatar, Panel, PanelHeader, ProgressBar, Tag } from '@/components/hq/primitives'
import { cn } from '@/lib/utils'

export function OperatorCard() {
  const pct = (currentUser.xp / currentUser.nextLevelXp) * 100
  return (
    <Panel className="overflow-hidden p-5 md:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-primary/25 blur-3xl"
      />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
        <Avatar callsign={currentUser.callsign} size="xl" highlight />
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Welcome back, operator</p>
          <h1 className="mt-1 font-display text-2xl font-black uppercase tracking-wider md:text-3xl">
            <span className="text-glow">{currentUser.callsign}</span>
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Tag tone="primary">{currentUser.role}</Tag>
            <Tag>Level {currentUser.level}</Tag>
            <Tag tone="success">Rank #{currentUser.rank}</Tag>
          </div>
          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>XP to level {currentUser.level + 1}</span>
              <span className="tabular-nums text-foreground">
                {currentUser.xp.toLocaleString()} / {currentUser.nextLevelXp.toLocaleString()}
              </span>
            </div>
            <ProgressBar value={pct} label="Level progress" />
          </div>
        </div>
      </div>
    </Panel>
  )
}

export function StatGrid() {
  const stats = [
    { label: 'Weekly XP', value: '4,390', delta: '+12%', icon: Zap },
    { label: 'Hours this week', value: `${currentUser.hoursThisWeek}h`, delta: `of ${currentUser.weeklyGoal}h`, icon: Clock },
    { label: 'Day streak', value: String(currentUser.streak), delta: 'Personal best 19', icon: Flame },
    { label: 'Systems done', value: '47', delta: '3 in progress', icon: BookOpen },
  ]
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((s) => {
        const Icon = s.icon
        return (
          <li key={s.label}>
            <Panel as="div" className="h-full p-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
                <Icon className="size-4 text-primary" aria-hidden="true" />
              </div>
              <p className="mt-2 font-display text-2xl font-bold tabular-nums">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.delta}</p>
            </Panel>
          </li>
        )
      })}
    </ul>
  )
}

export function WeeklyHoursChart() {
  const max = Math.max(...weeklyHours.map((d) => d.hours), 8)
  const total = weeklyHours.reduce((sum, d) => sum + d.hours, 0)
  return (
    <Panel>
      <PanelHeader eyebrow="Telemetry" title="Hours this week" action={<Tag tone="primary">{total.toFixed(1)}h</Tag>} />
      <div className="p-4 md:p-5">
        <ul className="flex h-44 items-end gap-2 sm:gap-3" aria-label="Hours worked per day">
          {weeklyHours.map((d, i) => {
            const today = i === 3
            return (
              <li key={d.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-[10px] tabular-nums text-muted-foreground">{d.hours ? `${d.hours}h` : '—'}</span>
                <div
                  className={cn(
                    'w-full max-w-10 rounded-t-sm transition-all',
                    today ? 'bg-primary shadow-[0_0_16px_var(--primary)]' : 'bg-primary/35',
                  )}
                  style={{ height: `${(d.hours / max) * 100}%`, minHeight: d.hours ? 4 : 2 }}
                />
                <span className={cn('text-[11px] uppercase tracking-wider', today ? 'text-primary' : 'text-muted-foreground')}>
                  {d.day}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </Panel>
  )
}

export function MiniLeaderboard() {
  const top = [...members].filter((m) => m.status !== 'suspended').sort((a, b) => b.xp.weekly - a.xp.weekly).slice(0, 5)
  return (
    <Panel>
      <PanelHeader
        eyebrow="Weekly"
        title="Top operators"
        action={
          <Link href="/leaderboard" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
            View all <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        }
      />
      <ol className="divide-y divide-border">
        {top.map((m, i) => (
          <li
            key={m.id}
            className={cn('flex items-center gap-3 px-4 py-3 md:px-5', m.id === currentUser.id && 'bg-primary/10')}
          >
            <span
              className={cn(
                'w-5 font-display text-sm font-bold tabular-nums',
                i === 0 ? 'text-primary text-glow' : 'text-muted-foreground',
              )}
            >
              {i + 1}
            </span>
            <Avatar callsign={m.callsign} size="sm" highlight={i === 0} />
            <span className="min-w-0 flex-1 truncate font-display text-xs font-bold tracking-wider">{m.callsign}</span>
            <span className="text-sm tabular-nums text-muted-foreground">{m.xp.weekly.toLocaleString()}</span>
          </li>
        ))}
      </ol>
    </Panel>
  )
}

export function RecentActivity() {
  return (
    <Panel>
      <PanelHeader
        eyebrow="Live"
        title="Recent activity"
        action={
          <Link href="/activity" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
            Full feed <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        }
      />
      <ul className="divide-y divide-border px-4 md:px-5">
        {activities.slice(0, 5).map((a) => (
          <ActivityItem key={a.id} activity={a} compact />
        ))}
      </ul>
    </Panel>
  )
}

export function ContinueSystems() {
  const inProgress = systems.filter((s) => s.progress > 0 && s.progress < 100)
  return (
    <Panel>
      <PanelHeader
        eyebrow="Training"
        title="Continue learning"
        action={
          <Link href="/systems" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
            Library <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        }
      />
      <ul className="space-y-4 p-4 md:p-5">
        {inProgress.map((s) => (
          <li key={s.id} className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{s.title}</p>
                <p className="text-xs text-muted-foreground">
                  {s.category} · {s.minutes} min
                </p>
              </div>
              <span className="shrink-0 font-display text-xs font-bold text-primary">+{s.xp} XP</span>
            </div>
            <ProgressBar value={s.progress} label={`${s.title} progress`} />
          </li>
        ))}
        <li>
          <Link
            href="/leaderboard"
            className="flex items-center gap-3 rounded-md border border-dashed border-primary/40 p-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            <Trophy className="size-4 text-primary" aria-hidden="true" />
            Finish 2 more systems to pass HEXSTORM this week
          </Link>
        </li>
      </ul>
    </Panel>
  )
}
