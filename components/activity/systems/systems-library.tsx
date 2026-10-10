'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, ChevronDown, Clock, Search, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { systems, type SystemCategory, type SystemItem } from '@/lib/mock-data'
import { NeonButton, Panel, ProgressBar, Tag } from '@/components/hq/primitives'

const categories: ('All' | SystemCategory)[] = ['All', 'Operations', 'Combat', 'Economy', 'Recruiting', 'Tech']
const difficultyTone = { Basic: 'success', Advanced: 'warning', Elite: 'danger' } as const

function SystemCard({ system }: { system: SystemItem }) {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(system.progress)
  const done = progress >= 100
  const stepsDone = Math.round((progress / 100) * system.steps.length)

  return (
    <Panel as="article" className={cn('flex flex-col', done && 'border-primary/40')}>
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="primary">{system.category}</Tag>
          <Tag tone={difficultyTone[system.difficulty]}>{system.difficulty}</Tag>
          {done && (
            <span className="ml-auto inline-flex items-center gap-1 text-xs text-success">
              <CheckCircle2 className="size-3.5" aria-hidden="true" /> Completed
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-base font-bold uppercase tracking-wide">{system.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{system.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" /> {system.minutes} min
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="size-3.5" aria-hidden="true" /> {system.completedBy} completed
          </span>
          <span>by {system.author}</span>
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">
              {stepsDone}/{system.steps.length} steps
            </span>
            <span className="font-display font-bold text-primary">+{system.xp} XP</span>
          </div>
          <ProgressBar value={progress} label={`${system.title} progress`} />
        </div>
      </div>

      <div className="border-t border-border">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground md:px-5"
        >
          {open ? 'Hide steps' : 'View steps'}
          <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
        </button>
        {open && (
          <div className="space-y-4 px-4 pb-4 md:px-5">
            <ol className="space-y-2">
              {system.steps.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-sm">
                  <span
                    className={cn(
                      'mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded border font-display text-[10px] font-bold',
                      i < stepsDone ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground',
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className={cn(i < stepsDone ? 'text-muted-foreground line-through' : 'text-foreground')}>{step}</span>
                </li>
              ))}
            </ol>
            {!done && (
              <NeonButton
                className="w-full"
                onClick={() => setProgress(Math.min(100, ((stepsDone + 1) / system.steps.length) * 100))}
              >
                {stepsDone === 0 ? 'Start system' : 'Complete next step'}
              </NeonButton>
            )}
          </div>
        )}
      </div>
    </Panel>
  )
}

export function SystemsLibrary() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return systems.filter(
      (s) =>
        (category === 'All' || s.category === category) &&
        (!q || s.title.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q)),
    )
  }, [query, category])

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative md:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary" aria-hidden="true" />
          <label htmlFor="system-search" className="sr-only">
            Search systems
          </label>
          <input
            id="system-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search systems..."
            className="h-11 w-full rounded-md border border-input bg-card pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0 md:pb-0" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                'shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors',
                category === c
                  ? 'border-primary bg-primary/15 text-primary glow-sm'
                  : 'border-border text-muted-foreground hover:text-foreground',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'system' : 'systems'}
      </p>

      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((s) => (
            <SystemCard key={s.id} system={s} />
          ))}
        </div>
      ) : (
        <Panel className="p-10 text-center text-sm text-muted-foreground">No systems match that search.</Panel>
      )}
    </div>
  )
}
