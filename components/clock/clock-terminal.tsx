'use client'

import { Coffee, Play, Square } from 'lucide-react'
import { cn } from '@/lib/utils'
import { currentUser, shiftHistory, shiftTypes } from '@/lib/mock-data'
import { formatDuration, useClock, type ShiftType } from '@/components/hq/clock-provider'
import { NeonButton, Panel, PanelHeader, ProgressBar, Tag } from '@/components/hq/primitives'

export function ClockTerminal() {
  const { status, shift, setShift, workedMs, startedAt, clockIn, clockOut, toggleBreak, sessions } = useClock()
  const hoursThisSession = workedMs / 3_600_000
  const weekTotal = currentUser.hoursThisWeek + hoursThisSession + sessions.reduce((s, x) => s + x.workedMs / 3_600_000, 0)

  return (
    <div className="grid gap-4 md:gap-6 lg:grid-cols-5">
      <Panel className="overflow-hidden lg:col-span-3">
        <div className="absolute inset-0 scanlines" aria-hidden="true" />
        <div className="relative flex flex-col items-center px-4 py-10 text-center md:py-14">
          <Tag tone={status === 'in' ? 'primary' : status === 'break' ? 'warning' : 'default'}>
            {status === 'in' ? 'Shift active' : status === 'break' ? 'On break' : 'Off duty'}
          </Tag>

          <div
            className={cn(
              'mt-8 flex size-56 items-center justify-center rounded-full border-2 sm:size-64',
              status === 'in' && 'border-primary glow animate-pulse-ring',
              status === 'break' && 'border-warning/70',
              status === 'out' && 'border-border',
            )}
          >
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Time on shift</span>
              <span
                className={cn(
                  'mt-2 font-mono text-4xl font-bold tabular-nums sm:text-5xl',
                  status === 'in' ? 'text-primary text-glow' : 'text-foreground',
                )}
                aria-live="polite"
              >
                {formatDuration(workedMs)}
              </span>
              {startedAt && (
                <span className="mt-2 text-xs text-muted-foreground" suppressHydrationWarning>
                  Started {new Date(startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
          </div>

          <fieldset className="mt-8 w-full max-w-md" disabled={status !== 'out'}>
            <legend className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Shift type</legend>
            <div className="grid grid-cols-2 gap-2">
              {shiftTypes.map((t) => (
                <label
                  key={t}
                  className={cn(
                    'cursor-pointer rounded-md border px-3 py-2 text-sm transition-colors has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60',
                    shift === t ? 'border-primary bg-primary/15 text-foreground' : 'border-border text-muted-foreground hover:border-primary/50',
                  )}
                >
                  <input
                    type="radio"
                    name="shift"
                    value={t}
                    checked={shift === t}
                    onChange={() => setShift(t as ShiftType)}
                    className="sr-only"
                  />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 flex w-full max-w-md flex-col gap-2 sm:flex-row">
            {status === 'out' ? (
              <NeonButton onClick={clockIn} className="h-14 flex-1 font-display text-base">
                <Play className="size-5" aria-hidden="true" /> Clock in
              </NeonButton>
            ) : (
              <>
                <NeonButton variant="outline" onClick={toggleBreak} className="h-14 flex-1 font-display">
                  <Coffee className="size-5" aria-hidden="true" /> {status === 'break' ? 'Resume' : 'Take break'}
                </NeonButton>
                <NeonButton variant="danger" onClick={clockOut} className="h-14 flex-1 font-display">
                  <Square className="size-5" aria-hidden="true" /> Clock out
                </NeonButton>
              </>
            )}
          </div>
        </div>
      </Panel>

      <div className="space-y-4 md:space-y-6 lg:col-span-2">
        <Panel>
          <PanelHeader eyebrow="Goal" title="Weekly target" />
          <div className="space-y-3 p-4 md:p-5">
            <div className="flex items-end justify-between">
              <p className="font-display text-3xl font-bold tabular-nums">
                {weekTotal.toFixed(1)}
                <span className="text-base text-muted-foreground">h</span>
              </p>
              <p className="text-sm text-muted-foreground">of {currentUser.weeklyGoal}h</p>
            </div>
            <ProgressBar value={(weekTotal / currentUser.weeklyGoal) * 100} label="Weekly hours goal" />
            <p className="text-xs text-muted-foreground">Each full hour on shift earns 100 XP. Breaks are not counted.</p>
          </div>
        </Panel>

        <Panel>
          <PanelHeader eyebrow="Log" title="Shift history" />
          <ul className="divide-y divide-border">
            {sessions.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-3 md:px-5">
                <div>
                  <p className="text-sm font-medium">{s.shift}</p>
                  <p className="text-xs text-primary">Just now · this session</p>
                </div>
                <span className="font-mono text-sm tabular-nums">{formatDuration(s.workedMs)}</span>
              </li>
            ))}
            {shiftHistory.map((h) => (
              <li key={h.id} className="flex items-center justify-between gap-3 px-4 py-3 md:px-5">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{h.shift}</p>
                  <p className="text-xs text-muted-foreground">
                    {h.date} · {h.start}–{h.end}
                    {h.breaks > 0 && ` · ${h.breaks}m break`}
                  </p>
                </div>
                <span className="font-display text-sm font-bold tabular-nums">{h.hours}h</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}
