'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { activities, members, type ActivityType } from '@/lib/mock-data'
import { ActivityItem } from '@/components/hq/activity-item'
import { Avatar, Panel, PanelHeader, StatusBadge } from '@/components/hq/primitives'

const filters: { id: 'all' | ActivityType; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'clock', label: 'Shifts' },
  { id: 'system', label: 'Systems' },
  { id: 'rank', label: 'Ranks' },
  { id: 'achievement', label: 'Achievements' },
  { id: 'admin', label: 'Admin' },
]

export function ActivityFeed() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')
  const items = filter === 'all' ? activities : activities.filter((a) => a.type === filter)
  const live = members.filter((m) => m.status === 'on-shift' || m.status === 'online')

  return (
    <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
      <Panel className="lg:col-span-2">
        <div className="-mb-px flex gap-1 overflow-x-auto border-b border-border px-2" role="tablist" aria-label="Filter activity">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'shrink-0 border-b-2 px-3 py-3 text-xs font-semibold uppercase tracking-wider transition-colors',
                filter === f.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <ul className="divide-y divide-border px-4 md:px-5" aria-live="polite">
          {items.map((a) => (
            <ActivityItem key={a.id} activity={a} />
          ))}
          {!items.length && <li className="py-10 text-center text-sm text-muted-foreground">No activity yet.</li>}
        </ul>
      </Panel>

      <Panel as="aside" className="h-fit">
        <PanelHeader eyebrow="Presence" title={`Online now · ${live.length}`} />
        <ul className="divide-y divide-border">
          {live.map((m) => (
            <li key={m.id} className="flex items-center gap-3 px-4 py-3 md:px-5">
              <Avatar callsign={m.callsign} size="sm" highlight={m.status === 'on-shift'} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-xs font-bold tracking-wider">{m.callsign}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </div>
              <StatusBadge status={m.status} />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}
