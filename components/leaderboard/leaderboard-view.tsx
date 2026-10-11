'use client'

import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, Crown, Flame, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { currentUser, members, type Member } from '@/lib/mock-data'
import { Avatar, Panel, StatusBadge, Tag } from '@/components/hq/primitives'

type Period = 'weekly' | 'monthly' | 'allTime'
const periods: { id: Period; label: string }[] = [
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'allTime', label: 'All-time' },
]

function Trend({ value }: { value: number }) {
  if (value === 0)
    return (
      <span className="inline-flex items-center text-xs text-muted-foreground">
        <Minus className="size-3" aria-hidden="true" />
        <span className="sr-only">No change</span>
      </span>
    )
  const up = value > 0
  return (
    <span className={cn('inline-flex items-center gap-0.5 text-xs tabular-nums', up ? 'text-success' : 'text-destructive')}>
      {up ? <ArrowUp className="size-3" aria-hidden="true" /> : <ArrowDown className="size-3" aria-hidden="true" />}
      {Math.abs(value)}
      <span className="sr-only">{up ? 'places up' : 'places down'}</span>
    </span>
  )
}

function PodiumCard({ member, place, period }: { member: Member; place: number; period: Period }) {
  const first = place === 1
  return (
    <Panel
      as="div"
      className={cn(
        'flex flex-col items-center p-4 text-center',
        first ? 'order-2 glow sm:-mt-4 sm:pb-8' : place === 2 ? 'order-1' : 'order-3',
      )}
    >
      <div className="relative">
        {first && (
          <Crown className="absolute -top-5 left-1/2 size-5 -translate-x-1/2 text-primary drop-shadow-[0_0_8px_var(--primary)]" aria-hidden="true" />
        )}
        <Avatar callsign={member.callsign} size={first ? 'xl' : 'lg'} highlight={first} />
      </div>
      <p className={cn('mt-3 font-display font-black', first ? 'text-3xl text-primary text-glow' : 'text-xl text-muted-foreground')}>
        #{place}
      </p>
      <p className="mt-1 max-w-full truncate font-display text-xs font-bold tracking-wider sm:text-sm">{member.callsign}</p>
      <p className="mt-1 text-sm tabular-nums text-muted-foreground">{member.xp[period].toLocaleString()} XP</p>
    </Panel>
  )
}

export function LeaderboardView() {
  const [period, setPeriod] = useState<Period>('weekly')
  const ranked = useMemo(
    () => members.filter((m) => m.status !== 'suspended').sort((a, b) => b.xp[period] - a.xp[period]),
    [period],
  )
  const [first, second, third, ...rest] = ranked

  return (
    <div className="space-y-6">
      <div role="tablist" aria-label="Leaderboard period" className="inline-flex rounded-md border border-border bg-card p-1">
        {periods.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={period === p.id}
            onClick={() => setPeriod(p.id)}
            className={cn(
              'rounded px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors sm:px-4',
              period === p.id ? 'bg-primary text-primary-foreground glow-sm' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 items-end gap-2 pt-4 sm:gap-4">
        <PodiumCard member={first} place={1} period={period} />
        <PodiumCard member={second} place={2} period={period} />
        <PodiumCard member={third} place={3} period={period} />
      </div>

      <Panel>
        <div className="hidden grid-cols-[3rem_1fr_7rem_6rem_5rem_6rem] gap-4 border-b border-border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:grid">
          <span>Rank</span>
          <span>Operator</span>
          <span>Status</span>
          <span className="text-right">Hours</span>
          <span className="text-right">Streak</span>
          <span className="text-right">XP</span>
        </div>
        <ol className="divide-y divide-border" start={4}>
          {rest.map((m, i) => {
            const me = m.id === currentUser.id
            return (
              <li
                key={m.id}
                className={cn(
                  'grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 px-4 py-3 md:grid-cols-[3rem_1fr_7rem_6rem_5rem_6rem] md:gap-4 md:px-5',
                  me && 'bg-primary/10',
                )}
              >
                <div className="flex flex-col">
                  <span className="font-display text-sm font-bold tabular-nums text-muted-foreground">{i + 4}</span>
                  <Trend value={m.trend} />
                </div>
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar callsign={m.callsign} size="sm" highlight={me} />
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 truncate font-display text-xs font-bold tracking-wider">
                      {m.callsign} {me && <Tag tone="primary">You</Tag>}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <StatusBadge status={m.status} />
                </div>
                <span className="hidden text-right text-sm tabular-nums text-muted-foreground md:block">{m.hoursThisWeek}h</span>
                <span className="hidden items-center justify-end gap-1 text-sm tabular-nums text-muted-foreground md:flex">
                  <Flame className="size-3.5 text-primary" aria-hidden="true" />
                  {m.streak}
                </span>
                <span className="text-right font-display text-sm font-bold tabular-nums">{m.xp[period].toLocaleString()}</span>
              </li>
            )
          })}
        </ol>
      </Panel>
    </div>
  )
}
