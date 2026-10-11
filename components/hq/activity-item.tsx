import { Award, BookOpen, Shield, Timer, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Activity, ActivityType } from '@/lib/mock-data'

const typeMeta: Record<ActivityType, { icon: typeof Timer; className: string; label: string }> = {
  clock: { icon: Timer, className: 'text-primary border-primary/40 bg-primary/10', label: 'Clock' },
  system: { icon: BookOpen, className: 'text-accent-foreground border-border bg-accent', label: 'System' },
  rank: { icon: TrendingUp, className: 'text-success border-success/40 bg-success/10', label: 'Rank' },
  admin: { icon: Shield, className: 'text-warning border-warning/40 bg-warning/10', label: 'Admin' },
  achievement: { icon: Award, className: 'text-primary border-primary/60 bg-primary/20', label: 'Achievement' },
}

export function ActivityItem({ activity, compact = false }: { activity: Activity; compact?: boolean }) {
  const meta = typeMeta[activity.type]
  const Icon = meta.icon
  return (
    <li className={cn('flex items-start gap-3', compact ? 'py-3' : 'py-4')}>
      <span
        className={cn('mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md border', meta.className)}
      >
        <Icon className="size-4" aria-hidden="true" />
        <span className="sr-only">{meta.label}</span>
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-display text-xs font-bold tracking-wider text-foreground">{activity.actor}</span>{' '}
          {activity.action}{' '}
          {activity.target && <span className="font-medium text-foreground">{activity.target}</span>}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground/80">{activity.time}</p>
      </div>
      {activity.xp && (
        <span className="shrink-0 font-display text-xs font-bold text-primary">+{activity.xp} XP</span>
      )}
    </li>
  )
}
