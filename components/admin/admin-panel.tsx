'use client'

import { useMemo, useState } from 'react'
import { Ban, Check, Lock, Megaphone, RotateCcw, Search, Users, UserCheck, Timer, AlertTriangle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  announcements as initialAnnouncements,
  currentUser,
  members as initialMembers,
  pendingApprovals as initialApprovals,
  type Member,
} from '@/lib/mock-data'
import { Avatar, NeonButton, Panel, PanelHeader, StatusBadge, Tag } from '@/components/hq/primitives'

function Overview({ members, pending }: { members: Member[]; pending: number }) {
  const stats = [
    { label: 'Total members', value: members.length, icon: Users },
    { label: 'On shift now', value: members.filter((m) => m.status === 'on-shift').length, icon: Timer },
    { label: 'Pending requests', value: pending, icon: UserCheck },
    { label: 'Suspended', value: members.filter((m) => m.status === 'suspended').length, icon: AlertTriangle },
  ]
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((s) => {
        const Icon = s.icon
        return (
          <li key={s.label}>
            <Panel as="div" className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
                <Icon className="size-4 text-primary" aria-hidden="true" />
              </div>
              <p className="mt-2 font-display text-2xl font-bold tabular-nums">{s.value}</p>
            </Panel>
          </li>
        )
      })}
    </ul>
  )
}

function MemberManager({
  members,
  onToggleSuspend,
}: {
  members: Member[]
  onToggleSuspend: (id: string) => void
}) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? members.filter((m) => m.callsign.toLowerCase().includes(q) || m.name.toLowerCase().includes(q)) : members
  }, [members, query])

  return (
    <Panel>
      <PanelHeader eyebrow="Roster" title="Member management" />
      <div className="border-b border-border p-4 md:px-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary" aria-hidden="true" />
          <label htmlFor="member-search" className="sr-only">
            Search members
          </label>
          <input
            id="member-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by callsign or name..."
            className="h-10 w-full rounded-md border border-input bg-secondary/60 pl-10 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      <div className="hidden grid-cols-[1fr_8rem_8rem_6rem_7rem] gap-4 border-b border-border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:grid">
        <span>Operator</span>
        <span>Role</span>
        <span>Status</span>
        <span className="text-right">XP (all)</span>
        <span className="text-right">Actions</span>
      </div>
      <ul className="divide-y divide-border">
        {filtered.map((m) => {
          const suspended = m.status === 'suspended'
          const isSelf = m.id === currentUser.id
          return (
            <li
              key={m.id}
              className={cn(
                'grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 md:grid-cols-[1fr_8rem_8rem_6rem_7rem] md:gap-4 md:px-5',
                suspended && 'opacity-60',
              )}
            >
              <div className="flex min-w-0 items-center gap-3">
                <Avatar callsign={m.callsign} size="sm" />
                <div className="min-w-0">
                  <p className="truncate font-display text-xs font-bold tracking-wider">{m.callsign}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {m.name} · joined {m.joined}
                  </p>
                  <div className="mt-1 md:hidden">
                    <StatusBadge status={m.status} />
                  </div>
                </div>
              </div>
              <div className="col-start-1 row-start-2 flex items-center gap-1.5 md:col-start-auto md:row-start-auto">
                {isSelf ? (
                  <Tag tone="primary">
                    <Lock className="size-3" aria-hidden="true" /> Admin
                  </Tag>
                ) : (
                  <Tag>Member</Tag>
                )}
              </div>
              <div className="hidden md:block">
                <StatusBadge status={m.status} />
              </div>
              <span className="hidden text-right text-sm tabular-nums text-muted-foreground md:block">
                {m.xp.allTime.toLocaleString()}
              </span>
              <div className="col-start-2 row-span-2 row-start-1 flex justify-end md:col-start-auto md:row-span-1 md:row-start-auto">
                {isSelf ? (
                  <span className="text-xs text-muted-foreground">You</span>
                ) : (
                <NeonButton
                  variant={suspended ? 'outline' : 'danger'}
                  className="h-9 px-3 text-xs"
                  onClick={() => onToggleSuspend(m.id)}
                >
                  {suspended ? (
                    <>
                      <RotateCcw className="size-3.5" aria-hidden="true" /> Restore
                    </>
                  ) : (
                    <>
                      <Ban className="size-3.5" aria-hidden="true" /> Suspend
                    </>
                  )}
                  <span className="sr-only"> {m.callsign}</span>
                </NeonButton>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}

export function AdminPanel() {
  const [members, setMembers] = useState(initialMembers)
  const [approvals, setApprovals] = useState(initialApprovals)
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [resolved, setResolved] = useState<string | null>(null)

  function resolveApproval(id: string, approved: boolean) {
    const item = approvals.find((a) => a.id === id)
    setApprovals((list) => list.filter((a) => a.id !== id))
    if (item) setResolved(`${item.request} for ${item.callsign} ${approved ? 'approved' : 'denied'}.`)
  }

  function postAnnouncement(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const title = String(data.get('title') ?? '').trim()
    const body = String(data.get('body') ?? '').trim()
    if (!title || !body) return
    setAnnouncements((list) => [{ id: String(Date.now()), title, body, author: 'NEONWRAITH', time: 'Just now' }, ...list])
    form.reset()
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <Overview members={members} pending={approvals.length} />

      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MemberManager
            members={members}
            onToggleSuspend={(id) =>
              setMembers((list) =>
                list.map((m) =>
                  m.id === id ? { ...m, status: m.status === 'suspended' ? 'offline' : 'suspended' } : m,
                ),
              )
            }
          />
        </div>

        <div className="space-y-4 md:space-y-6">
          <Panel>
            <PanelHeader eyebrow="Queue" title="Pending approvals" action={<Tag tone="primary">{approvals.length}</Tag>} />
            {resolved && (
              <p role="status" className="border-b border-border bg-primary/10 px-4 py-2 text-xs text-primary md:px-5">
                {resolved}
              </p>
            )}
            <ul className="divide-y divide-border">
              {approvals.map((a) => (
                <li key={a.id} className="space-y-3 px-4 py-4 md:px-5">
                  <div className="flex items-start gap-3">
                    <Avatar callsign={a.callsign} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{a.request}</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-display font-bold tracking-wider text-foreground">{a.callsign}</span> · {a.note}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground/80">{a.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <NeonButton className="h-9 flex-1 text-xs" onClick={() => resolveApproval(a.id, true)}>
                      <Check className="size-3.5" aria-hidden="true" /> Approve
                    </NeonButton>
                    <NeonButton variant="ghost" className="h-9 flex-1 border border-border text-xs" onClick={() => resolveApproval(a.id, false)}>
                      <X className="size-3.5" aria-hidden="true" /> Deny
                    </NeonButton>
                  </div>
                </li>
              ))}
              {!approvals.length && (
                <li className="px-4 py-8 text-center text-sm text-muted-foreground md:px-5">Queue clear. Nice work.</li>
              )}
            </ul>
          </Panel>

          <Panel>
            <PanelHeader eyebrow="Broadcast" title="Announcements" />
            <form onSubmit={postAnnouncement} className="space-y-3 border-b border-border p-4 md:p-5">
              <div>
                <label htmlFor="ann-title" className="sr-only">
                  Announcement title
                </label>
                <input
                  id="ann-title"
                  name="title"
                  required
                  placeholder="Headline"
                  className="h-10 w-full rounded-md border border-input bg-secondary/60 px-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label htmlFor="ann-body" className="sr-only">
                  Announcement message
                </label>
                <textarea
                  id="ann-body"
                  name="body"
                  required
                  rows={3}
                  placeholder="Message to all operators..."
                  className="w-full resize-none rounded-md border border-input bg-secondary/60 px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <NeonButton type="submit" className="w-full">
                <Megaphone className="size-4" aria-hidden="true" /> Broadcast
              </NeonButton>
            </form>
            <ul className="divide-y divide-border">
              {announcements.map((n) => (
                <li key={n.id} className="px-4 py-3 md:px-5">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground/80">
                    {n.author} · {n.time}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  )
}
